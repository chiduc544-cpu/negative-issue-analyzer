import { NextResponse } from 'next/server';
import { summaryMetrics } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    summary: summaryMetrics,
    generatedAt: new Date().toISOString()
  });
}
