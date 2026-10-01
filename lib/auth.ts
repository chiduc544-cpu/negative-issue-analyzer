import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'development-secret-change-me';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@negativescope.ai';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123!';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$Q7s8I4Z26tAB1k7WJ2sRz.rMC3X7uu6QW7WqvzH0o7Gjp9AlbnzP.';

export async function verifyAdminCredentials(email: string, password: string) {
  if (email !== ADMIN_EMAIL) {
    return false;
  }

  return bcrypt.compare(password, ADMIN_PASSWORD_HASH).catch(() => password === ADMIN_PASSWORD);
}

export function signAdminToken(email: string) {
  return jwt.sign({ sub: email, role: 'admin', exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8 }, JWT_SECRET);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { sub: string; role: string };
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('negativescope_session')?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);

  if (!payload || payload.role !== 'admin') {
    return null;
  }

  return {
    email: payload.sub,
    role: payload.role
  };
}
