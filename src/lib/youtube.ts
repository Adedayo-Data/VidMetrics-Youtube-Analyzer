export interface VideoAudit { 
  id: string; 
  title: string; 
  thumbnail: string; 
  publishedAt: string; 
  viewCount: number; 
  likeCount: number; 
  commentCount: number; 
  performanceRatio: number; // (Views / ChannelSubscribers) * 100 
  engagementRate: number;   // ((Likes + Comments) / Views) * 100 
  isShort: boolean;         // Duration < 60s 
  isOutlier: boolean;       // Views > (AverageChannelViews * 2) 
  tags?: string[];
} 

export interface ChannelAuditReport { 
  channelId: string;
  channelName: string;
  subscribers: number;
  thumbnail: string;
  kpis: { 
    totalViewsLast30Days: number; 
    viewGrowthPercent: number; // (CurrentPeriod - PreviousPeriod) / PreviousPeriod 
    avgEngagementRate: number; 
    status: 'Steady' | 'Growth' | 'Spiking' | 'Decline'; 
  }; 
  videos: VideoAudit[]; 
} 

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function resolveChannelId(input: string): Promise<string | null> {
  if (!API_KEY) throw new Error("API_KEY_MISSING");

  let handle = input.trim();
  
  // Extract handle from URL if present
  if (handle.includes("youtube.com/")) {
    const parts = handle.split("/");
    const handlePart = parts.find(p => p.startsWith("@"));
    if (handlePart) {
      handle = handlePart;
    } else {
      // Try to find /c/ or /channel/ or /user/
      const channelIdx = parts.indexOf("channel");
      if (channelIdx !== -1 && parts[channelIdx + 1]) return parts[channelIdx + 1];
      
      const userIdx = parts.indexOf("user");
      if (userIdx !== -1 && parts[userIdx + 1]) handle = parts[userIdx + 1];
    }
  }

  // Search by handle or username
  const searchUrl = `${BASE_URL}/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&key=${API_KEY}&maxResults=1`;
  const response = await fetch(searchUrl);
  if (!response.ok) {
    if (response.status === 403) throw new Error("QUOTA_EXCEEDED");
    return null;
  }
  
  const data = await response.json();
  return data.items?.[0]?.id?.channelId || null;
}

export async function getAuditData(channelId: string): Promise<ChannelAuditReport | null> {
  if (!API_KEY) throw new Error("API_KEY_MISSING");

  // 1. Get Channel Info
  const channelUrl = `${BASE_URL}/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`;
  const channelRes = await fetch(channelUrl);
  if (!channelRes.ok) return null;
  const channelData = await channelRes.json();
  const channel = channelData.items?.[0];
  if (!channel) return null;

  const subscribers = parseInt(channel.statistics.subscriberCount) || 0;
  const channelName = channel.snippet.title;
  const channelThumbnail = channel.snippet.thumbnails.default.url;

  // 2. Get Latest Videos
  const videosUrl = `${BASE_URL}/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${API_KEY}`;
  const videosRes = await fetch(videosUrl);
  if (!videosRes.ok) return null;
  const videosData = await videosRes.json();
  const videoIds = videosData.items.map((item: any) => item.id.videoId).join(",");

  // 3. Get Video Statistics
  const statsUrl = `${BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_KEY}`;
  const statsRes = await fetch(statsUrl);
  if (!statsRes.ok) return null;
  const statsData = await statsRes.json();

  const videos: VideoAudit[] = statsData.items.map((v: any) => {
    const views = parseInt(v.statistics.viewCount) || 0;
    const likes = parseInt(v.statistics.likeCount) || 0;
    const comments = parseInt(v.statistics.commentCount) || 0;
    
    // Duration logic for Shorts
    const duration = v.contentDetails.duration; // PT1M2S format
    const isShort = duration.includes("PT") && !duration.includes("H") && !duration.includes("M") && parseInt(duration.match(/\d+/)?.[0] || "0") < 60;

    return {
      id: v.id,
      title: v.snippet.title,
      thumbnail: v.snippet.thumbnails.high?.url || v.snippet.thumbnails.default?.url,
      publishedAt: v.snippet.publishedAt,
      viewCount: views,
      likeCount: likes,
      commentCount: comments,
      performanceRatio: calculatePerformanceRatio(views, subscribers),
      engagementRate: calculateEngagementRate(likes, comments, views),
      isShort,
      isOutlier: false, // Will be calculated below
      tags: v.snippet.tags || []
    };
  });

  const processedVideos = detectOutliers(videos);

  // 4. Calculate KPIs
  const last30DaysViews = processedVideos.reduce((acc, v) => acc + v.viewCount, 0); // Simplified for now
  const avgER = processedVideos.reduce((acc, v) => acc + v.engagementRate, 0) / processedVideos.length;

  return {
    channelId,
    channelName,
    subscribers,
    thumbnail: channelThumbnail,
    kpis: {
      totalViewsLast30Days: last30DaysViews,
      viewGrowthPercent: 12.4, // Placeholder for growth calculation logic
      avgEngagementRate: avgER,
      status: getChannelStatus(12.4)
    },
    videos: processedVideos
  };
}

export function calculatePerformanceRatio(views: number, subscribers: number): number {
  if (subscribers === 0) return 0;
  return (views / subscribers) * 100;
}

export function calculateEngagementRate(likes: number, comments: number, views: number): number {
  if (views === 0) return 0;
  return ((likes + comments) / views) * 100;
}

export function detectOutliers(videos: VideoAudit[]): VideoAudit[] {
  if (videos.length === 0) return [];
  const views = videos.map(v => v.viewCount);
  const mean = views.reduce((a, b) => a + b, 0) / views.length;
  const squareDiffs = views.map(v => Math.pow(v - mean, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
  const stdDev = Math.sqrt(avgSquareDiff);
  return videos.map(video => ({
    ...video,
    isOutlier: video.viewCount > (mean + (2 * stdDev))
  }));
}

export function calculateEngagementVelocity(last5Videos: VideoAudit[], avgEngagementRate: number): number {
  if (last5Videos.length === 0) return 0;
  const recentAvg = last5Videos.reduce((acc, v) => acc + v.engagementRate, 0) / last5Videos.length;
  return recentAvg - avgEngagementRate;
}

export function getChannelStatus(growthPercent: number): ChannelAuditReport['kpis']['status'] {
  if (growthPercent > 15) return 'Spiking';
  if (growthPercent > 5) return 'Growth';
  if (growthPercent < -5) return 'Decline';
  return 'Steady';
}
