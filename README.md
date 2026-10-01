# NegativeScope project setup

## Overview
NegativeScope is a security-first admin dashboard for collecting, classifying, and monitoring negative issues reported by website visitors.

## Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- JWT-based admin auth
- Recharts dashboard charts

## Quick start
1. Install dependencies: `npm install`
2. Copy environment variables: `cp .env.example .env.local`
3. Update `.env.local` values
4. Start development server: `npm run dev`
5. Open `http://localhost:3000`

## Admin login
- Email: `admin@negativescope.ai`
- Password: `admin123!`

Important: change the default credentials before production deployment.

## Security notes
- Use a strong `JWT_SECRET`
- Replace the default admin password in production
- Set up PostgreSQL and connect via `DATABASE_URL`
- Restrict admin access with role checks and network controls
