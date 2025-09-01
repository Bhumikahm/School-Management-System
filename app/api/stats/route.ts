import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Get user count
    const [userRows]: any = await db.execute('SELECT COUNT(*) as count FROM users');
    const userCount = userRows[0]?.count || 0;

    // Get school count
    const [schoolRows]: any = await db.execute('SELECT COUNT(*) as count FROM schools');
    const schoolCount = schoolRows[0]?.count || 0;

    // Calculate active percentage (users who are verified)
    const [verifiedRows]: any = await db.execute('SELECT COUNT(*) as count FROM users WHERE is_verified = TRUE');
    const verifiedCount = verifiedRows[0]?.count || 0;
    const activePercentage = userCount > 0 ? Math.round((verifiedCount / userCount) * 100) : 0;

    return NextResponse.json({
      stats: {
        totalUsers: userCount,
        totalSchools: schoolCount,
        activePercentage: activePercentage,
        verifiedUsers: verifiedCount
      }
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
