import { NextResponse } from 'next/server';
import { summaryMetrics, recentReports, riskTrends } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    summary: summaryMetrics,
    trends: riskTrends,
    reports: recentReports
  });
}
