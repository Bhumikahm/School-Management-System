const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_management'
  };

  console.log('📋 Configuration:');
  console.log(`   Host: ${config.host}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Database: ${config.database}`);
  console.log(`   Password: ${config.password ? '***' : '(empty)'}\n`);

  try {
    // Test connection without database first
    const connectionWithoutDB = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password
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
    
    console.log('\n🎉 Database connection test completed successfully!');
    console.log('🚀 You can now run: npm run dev');
    
  } catch (error) {
    console.error('\n❌ Database connection failed:');
    console.error(error.message);
    
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure MySQL service is running');
    console.log('2. Check your credentials in .env.local');
    console.log('3. Ensure the database user has proper permissions');
    console.log('4. Try connecting manually: mysql -u root -p');
    
    process.exit(1);
  }
}

// Run the test
testConnection();
