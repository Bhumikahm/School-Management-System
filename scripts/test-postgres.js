const { Pool } = require('pg');
require('dotenv').config();

async function testPostgreSQLConnection() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'containers-us-west-123.railway.app',
    port: parseInt(process.env.DB_PORT || '6543'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'yourpassword123',
    database: process.env.DB_NAME || 'school_system',
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log('🔌 Testing PostgreSQL connection to Railway...');
    console.log(`Host: ${process.env.DB_HOST || 'containers-us-west-123.railway.app'}`);
    console.log(`Port: ${process.env.DB_PORT || '6543'}`);
    console.log(`Database: ${process.env.DB_NAME || 'school_system'}`);
    console.log(`User: ${process.env.DB_USER || 'root'}`);
    
    // Test connection
    const client = await pool.connect();
    console.log('✅ Successfully connected to PostgreSQL on Railway!');
    
    // Test query
    const result = await client.query('SELECT version()');
    console.log('📊 PostgreSQL version:', result.rows[0].version);
    
    // Check if tables exist
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Existing tables:', tablesResult.rows.map(row => row.table_name));
    
    // Create tables if they don't exist
    console.log('🔨 Creating tables if they don\'t exist...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        fullName VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        contact VARCHAR(20),
        password VARCHAR(255) NOT NULL,
        isVerified BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS otps (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expiresAt TIMESTAMP NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        address TEXT,
        contact VARCHAR(20),
        email VARCHAR(100),
        principal VARCHAR(100),
        establishedYear INTEGER,
        imageUrl TEXT,
        description TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Tables created successfully!');
    
    // Check tables again
    const finalTablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📋 Final tables:', finalTablesResult.rows.map(row => row.table_name));
    
    client.release();
    await pool.end();
    
    console.log('🎉 PostgreSQL connection test completed successfully!');
    console.log('🚀 Your School Management System is ready for Railway deployment!');
    
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
    console.error('🔍 Error details:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure your Railway database is running and accessible');
    } else if (error.code === '28P01') {
      console.log('💡 Check your database username and password');
    } else if (error.code === '3D000') {
      console.log('💡 Check your database name');
    }
    
    process.exit(1);
  }
}

testPostgreSQLConnection();
