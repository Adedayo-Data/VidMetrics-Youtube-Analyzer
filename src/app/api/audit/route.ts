import { NextResponse } from "next/server";
import { resolveChannelId, getAuditData } from "@/lib/youtube";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json({ success: false, error: "Query is required" }, { status: 400 });
    }

    const channelId = await resolveChannelId(query);
    if (!channelId) {
      return NextResponse.json({ success: false, error: "Channel not found" }, { status: 404 });
    }

    const report = await getAuditData(channelId);
    if (!report) {
      return NextResponse.json({ success: false, error: "Failed to fetch audit data" }, { status: 500 });
    }

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
