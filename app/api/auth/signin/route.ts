import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken } from '@/lib/auth';
import db from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Find user
    const [rows]: any = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const user = rows[0];

    // Check if user is verified
    if (!user.is_verified) {
      return NextResponse.json({ message: 'Please verify your email first' }, { status: 401 });
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Generate token
    const token = generateToken(user.id.toString());

    return NextResponse.json({
      message: 'Sign in successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.full_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}