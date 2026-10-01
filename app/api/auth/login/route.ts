import { NextResponse } from 'next/server';
import { z } from 'zod';
import { signAdminToken, verifyAdminCredentials } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email or password format.' }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const isValid = await verifyAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const token = signAdminToken(email);
    const response = NextResponse.json({
      success: true,
      message: 'Login successful.',
      user: { email, role: 'admin' }
    });

    response.cookies.set('negativescope_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
