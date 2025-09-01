import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import db from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email = formData.get('email') as string;
    const image = formData.get('image') as File;

    if (!image) {
      return NextResponse.json({ message: 'Image is required' }, { status: 400 });
    }

    // Handle image upload
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const imageName = `${Date.now()}-${image.name}`;
    const imagePath = path.join(process.cwd(), 'public', 'schoolImages', imageName);
    
    // Create directory if it doesn't exist
    await mkdir(path.dirname(imagePath), { recursive: true });
    await writeFile(imagePath, buffer);

    // Create schools table if not exists
    await db.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        contact VARCHAR(15) NOT NULL,
        image TEXT NOT NULL,
        email_id VARCHAR(100) NOT NULL
      )
    `);

    // Insert school
    await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageName, email]
    );

    return NextResponse.json({ message: 'School added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Add school error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

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

    const [rows]: any = await db.execute('SELECT * FROM schools ORDER BY id DESC');

    return NextResponse.json({ schools: rows });
  } catch (error) {
    console.error('Fetch schools error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}