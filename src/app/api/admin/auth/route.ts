import { NextResponse } from 'next/server';

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY;

export async function POST(request: Request) {
  const { secret } = await request.json();

  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  // Set an httpOnly cookie valid for 8 hours
  response.cookies.set('stigma_admin_token', ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8,
    path: '/',
  });

  return response;
}
