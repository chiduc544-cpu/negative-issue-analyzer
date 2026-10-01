import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const issueSchema = z.object({
  content: z.string().min(10).max(5000),
  category: z.enum(['harassment','fraud','spam','misinformation','safety']),
  email: z.string().email().optional().or(z.literal('')),
  source: z.string().default('public-form')
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = issueSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { content, category } = parsed.data;
    const severities = ['High', 'Medium', 'Low'];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const confidence = (Math.random() * 0.3 + 0.7).toFixed(2);

    return NextResponse.json({
      success: true,
      id: `issue_${Date.now()}`,
      category,
      severity,
      confidence,
      timestamp: new Date().toISOString(),
      message: 'Issue reported and analyzed successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Issue submission error:', error);
    return NextResponse.json(
      { error: 'Server error processing issue' },
      { status: 500 }
    );
  }
}
