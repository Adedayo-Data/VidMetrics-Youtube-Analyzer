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
    viewGrowthPercent: number; 
    avgEngagementRate: number; 
    status: 'Steady' | 'Growth' | 'Spiking' | 'Decline' | 'Viral' | 'Stable'; 
  }; 
  longForm: {
    avgViews: number;
    avgER: number;
    topVideoId: string;
  };
  shorts: {
    avgViews: number;
    avgER: number;
    topVideoId: string;
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

  // 2. Get Latest Videos (Combining search for reliability)
  const videosUrl = `${BASE_URL}/search?part=snippet&channelId=${channelId}&maxResults=50&order=date&type=video&key=${API_KEY}`;
  const videosRes = await fetch(videosUrl);
  if (!videosRes.ok) return null;
  const videosData = await videosRes.json();
  
  // Also check for uploads playlist to ensure we don't miss anything
  const channelDetailsUrl = `${BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${API_KEY}`;
  const channelDetailsRes = await fetch(channelDetailsUrl);
  let playlistVideoIds: string[] = [];
  if (channelDetailsRes.ok) {
    const channelDetailsData = await channelDetailsRes.json();
    const uploadsPlaylistId = channelDetailsData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (uploadsPlaylistId) {
      const playlistUrl = `${BASE_URL}/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`;
      const playlistRes = await fetch(playlistUrl);
      if (playlistRes.ok) {
        const playlistData = await playlistRes.json();
        playlistVideoIds = playlistData.items.map((item: any) => item.contentDetails.videoId);
      }
    }
  }

  const searchVideoIds = videosData.items.map((item: any) => item.id.videoId);
  const combinedVideoIds = Array.from(new Set([...searchVideoIds, ...playlistVideoIds])).slice(0, 50).join(",");

  // 3. Get Video Statistics
  const statsUrl = `${BASE_URL}/videos?part=snippet,statistics,contentDetails&id=${combinedVideoIds}&key=${API_KEY}`;
  const statsRes = await fetch(statsUrl);
  if (!statsRes.ok) return null;
  const statsData = await statsRes.json();

  const videos: VideoAudit[] = statsData.items.map((v: any) => {
    const views = parseInt(v.statistics.viewCount) || 0;
    const likes = parseInt(v.statistics.likeCount) || 0;
    const comments = parseInt(v.statistics.commentCount) || 0;
    
    // Improved Duration logic for Shorts (Under 60s)
    const duration = v.contentDetails.duration; // e.g. PT1M2S, PT45S
    const hasHours = duration.includes("H");
    const hasMinutes = duration.includes("M");
    const secondsMatch = duration.match(/(\d+)S/);
    const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0;
    
    // A Short is defined as under 60 seconds total
    const isShort = !hasHours && !hasMinutes && seconds < 60;

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
      isOutlier: false, 
      tags: v.snippet.tags || []
    };
  });

  const processedVideos = detectOutliers(videos);

  // 4. Calculate Segmented KPIs
  const longFormVideos = processedVideos.filter(v => !v.isShort);
  const shortsVideos = processedVideos.filter(v => v.isShort);

  const getAvg = (arr: VideoAudit[], key: 'viewCount' | 'engagementRate') => 
    arr.length ? arr.reduce((acc, v) => acc + (v[key] as number), 0) / arr.length : 0;

  const getTop = (arr: VideoAudit[]) => 
    arr.length ? [...arr].sort((a, b) => b.viewCount - a.viewCount)[0].id : "";

  // Calculate real growth percentage by comparing recent vs older videos
  const calculateGrowthPercent = (): number => {
    if (processedVideos.length < 4) return 0; // Need at least 4 videos to compare
    
    // Sort by date (newest first)
    const sortedVideos = [...processedVideos].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Split into two halves: recent half vs older half
    const halfPoint = Math.ceil(sortedVideos.length / 2);
    const recentVideos = sortedVideos.slice(0, halfPoint);
    const olderVideos = sortedVideos.slice(halfPoint);
    
    if (olderVideos.length === 0) return 0;
    
    const recentAvgViews = recentVideos.reduce((acc, v) => acc + v.viewCount, 0) / recentVideos.length;
    const olderAvgViews = olderVideos.reduce((acc, v) => acc + v.viewCount, 0) / olderVideos.length;
    
    if (olderAvgViews === 0) return 0;
    
    return ((recentAvgViews - olderAvgViews) / olderAvgViews) * 100;
  };

  const last30DaysViews = processedVideos.reduce((acc, v) => acc + v.viewCount, 0); 
  const avgER = processedVideos.reduce((acc, v) => acc + v.engagementRate, 0) / processedVideos.length;
  const growthPercent = calculateGrowthPercent();

  return {
    channelId,
    channelName,
    subscribers,
    thumbnail: channelThumbnail,
    kpis: {
      totalViewsLast30Days: last30DaysViews,
      viewGrowthPercent: parseFloat(growthPercent.toFixed(1)),
      avgEngagementRate: avgER,
      status: getChannelStatus(growthPercent)
    },
    longForm: {
      avgViews: getAvg(longFormVideos, 'viewCount'),
      avgER: getAvg(longFormVideos, 'engagementRate'),
      topVideoId: getTop(longFormVideos)
    },
    shorts: {
      avgViews: getAvg(shortsVideos, 'viewCount'),
      avgER: getAvg(shortsVideos, 'engagementRate'),
      topVideoId: getTop(shortsVideos)
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
