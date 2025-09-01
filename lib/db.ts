import mysql from 'mysql2/promise';
import { Pool } from 'pg';

// Check if we're using PostgreSQL (Railway) or MySQL
const isPostgreSQL = process.env.DB_HOST?.includes('railway.app') || process.env.DB_PORT === '6543';

let mysqlPool: mysql.Pool | null = null;
let pgPool: Pool | null = null;

if (isPostgreSQL) {
  // PostgreSQL connection for Railway
  pgPool = new Pool({
    host: process.env.DB_HOST || 'containers-us-west-123.railway.app',
    port: parseInt(process.env.DB_PORT || '6543'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'yourpassword123',
    database: process.env.DB_NAME || 'school_system',
    ssl: {
      rejectUnauthorized: false
    }
  });

  console.log('✅ Connected to PostgreSQL (Railway)');
} else {
  // MySQL connection for local development
  mysqlPool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  console.log('✅ Connected to MySQL (Local)');
}

// Unified database interface
export const db = {
  async execute(query: string, params: any[] = []): Promise<any> {
    if (isPostgreSQL && pgPool) {
      try {
        const result = await pgPool.query(query, params);
        return result.rows;
      } catch (error) {
        console.error('PostgreSQL query error:', error);
        throw error;
      }
    } else if (mysqlPool) {
      try {
        const [rows] = await mysqlPool.execute(query, params);
        return rows;
      } catch (error) {
        console.error('MySQL query error:', error);
        throw error;
      }
    } else {
      throw new Error('No database connection available');
    }
  },

  async query(query: string, params: any[] = []): Promise<any> {
    return this.execute(query, params);
  },

  async close(): Promise<void> {
    if (pgPool) {
      await pgPool.end();
    }
    if (mysqlPool) {
      await mysqlPool.end();
    }
  }
};

export default db;