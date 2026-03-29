import { NextResponse } from "next/server";
import { resolveChannelId, getAuditData } from "@/lib/youtube";

// Simple in-memory cache for demo purposes
// In production, use Redis or a similar store
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ success: false, error: "Query is required" }, { status: 400 });
    }

    // Check Cache
    const cached = cache.get(query);
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
      return NextResponse.json({
        success: true,
        data: cached.data,
        cached: true
      });
    }

    const channelId = await resolveChannelId(query);
    if (!channelId) {
      return NextResponse.json({ success: false, error: "Channel not found" }, { status: 404 });
    }

    const report = await getAuditData(channelId);
    if (!report) {
      return NextResponse.json({ success: false, error: "Failed to fetch audit data" }, { status: 500 });
    }

    // Set Cache
    cache.set(query, { data: report, timestamp: Date.now() });

    return NextResponse.json({
      success: true,
      data: report
    });
  } catch (error: any) {
    console.error("Audit API Error:", error);
    
    if (error.message === "API_KEY_MISSING") {
      return NextResponse.json({ success: false, error: "Intelligence Engine Offline: API Key missing" }, { status: 500 });
    }
    
    if (error.message === "QUOTA_EXCEEDED") {
      return NextResponse.json({ success: false, error: "Intelligence Engine Offline: Quota exceeded" }, { status: 403 });
    }

    return NextResponse.json({ success: false, error: "Intelligence Engine Offline" }, { status: 500 });
  }
}
