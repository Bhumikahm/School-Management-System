const mysql = require('mysql2/promise');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  // Detect database type
  const isPostgreSQL = process.env.DATABASE_URL?.includes('postgres') || 
                       process.env.DB_HOST?.includes('railway.app') || 
                       process.env.DB_HOST?.includes('render.com') ||
                       process.env.DB_PORT === '5432';

  console.log(`🗄️  Database Type: ${isPostgreSQL ? 'PostgreSQL' : 'MySQL'}`);
  
  if (isPostgreSQL) {
    await testPostgreSQL();
  } else {
    await testMySQL();
  }
}

async function testPostgreSQL() {
  const config = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  } : {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false }
  };

  console.log('📋 PostgreSQL Configuration:');
  if (process.env.DATABASE_URL) {
    console.log(`   Connection String: ${process.env.DATABASE_URL.substring(0, 30)}...`);
  } else {
    console.log(`   Host: ${config.host}`);
    console.log(`   Port: ${config.port}`);
    console.log(`   User: ${config.user}`);
    console.log(`   Database: ${config.database}`);
    console.log(`   Password: ${config.password ? '***' : '(empty)'}`);
  }
  console.log('');

  try {
    const pool = new Pool(config);
    const client = await pool.connect();
    
    console.log('✅ Connected to PostgreSQL successfully!');
    
    // Test query
    const result = await client.query('SELECT version()');
    console.log('📊 PostgreSQL version:', result.rows[0].version.substring(0, 50) + '...');
    
    // Check existing tables
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log(`📋 Existing tables (${tablesResult.rows.length}):`);
    tablesResult.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });
    
    client.release();
    await pool.end();
    
    console.log('\n🎉 PostgreSQL connection test completed successfully!');
    console.log('🚀 You can now run: npm run dev');
    
  } catch (error) {
    console.error('\n❌ PostgreSQL connection failed:');
    console.error(error.message);
    
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your DATABASE_URL or connection details');
    console.log('2. Ensure the database service is running');
    console.log('3. Verify SSL settings for production databases');
    console.log('4. Check firewall and network connectivity');
    
    process.exit(1);
  }
}

async function testMySQL() {
  const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  };

  console.log('📋 MySQL Configuration:');
  console.log(`   Host: ${config.host}`);
  console.log(`   Port: ${config.port}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Database: ${config.database}`);
  console.log(`   Password: ${config.password ? '***' : '(empty)'}`);
  console.log(`   SSL: ${config.ssl ? 'enabled' : 'disabled'}`);
  console.log('');

  try {
    // Test connection without database first
    const connectionWithoutDB = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      ssl: config.ssl
    });

    console.log('✅ Connected to MySQL server successfully!');

    // Check if database exists
    const [databases] = await connectionWithoutDB.execute('SHOW DATABASES');
    const dbExists = databases.some(db => db.Database === config.database);

    if (dbExists) {
      console.log(`✅ Database '${config.database}' exists`);
      
      // Connect to the specific database
      const connection = await mysql.createConnection(config);
      console.log(`✅ Connected to database '${config.database}' successfully!`);

      // Check tables
      const [tables] = await connection.execute('SHOW TABLES');
      console.log(`📊 Found ${tables.length} tables:`);
      
      tables.forEach(table => {
        const tableName = Object.values(table)[0];
        console.log(`   - ${tableName}`);
      });

      await connection.end();
    } else {
      console.log(`⚠️  Database '${config.database}' does not exist`);
      console.log('💡 The application will create it automatically on first run');
    }

    await connectionWithoutDB.end();
    
    console.log('\n🎉 MySQL connection test completed successfully!');
    console.log('🚀 You can now run: npm run dev');
    
  } catch (error) {
    console.error('\n❌ MySQL connection failed:');
    console.error(error.message);
    
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check your database credentials in .env.local');
    console.log('2. Ensure the database service is running and accessible');
    console.log('3. Verify SSL settings for production databases');
    console.log('4. Check if your IP is whitelisted (for cloud databases)');
    
    process.exit(1);
  }
}

// Run the test
testConnection();