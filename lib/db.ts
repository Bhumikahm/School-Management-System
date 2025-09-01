import mysql from 'mysql2/promise';
import { Pool } from 'pg';

// Detect database type based on environment variables
const isPostgreSQL = process.env.DATABASE_URL?.includes('postgres') || 
                     process.env.DB_HOST?.includes('railway.app') || 
                     process.env.DB_HOST?.includes('render.com') ||
                     process.env.DB_PORT === '5432';

let mysqlPool: mysql.Pool | null = null;
let pgPool: Pool | null = null;

// Initialize database connection
const initializeDatabase = () => {
  if (isPostgreSQL) {
    // PostgreSQL connection (Railway, Render, Supabase, etc.)
    const connectionConfig = process.env.DATABASE_URL ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    } : {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    };

    pgPool = new Pool(connectionConfig);
    console.log('✅ PostgreSQL connection initialized');
  } else {
    // MySQL connection (PlanetScale, AWS RDS, etc.)
    const connectionConfig = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    };

    mysqlPool = mysql.createPool(connectionConfig);
    console.log('✅ MySQL connection initialized');
  }
};

// Initialize on module load
initializeDatabase();

// Unified database interface
export const db = {
  async execute(query: string, params: any[] = []): Promise<any> {
    try {
      if (isPostgreSQL && pgPool) {
        // Convert MySQL-style queries to PostgreSQL
        let pgQuery = query;
        let pgParams = params;

        // Convert AUTO_INCREMENT to SERIAL
        pgQuery = pgQuery.replace(/INT AUTO_INCREMENT PRIMARY KEY/g, 'SERIAL PRIMARY KEY');
        
        // Convert MySQL table creation syntax
        pgQuery = pgQuery.replace(/CREATE TABLE IF NOT EXISTS users \(/g, 'CREATE TABLE IF NOT EXISTS users (');
        pgQuery = pgQuery.replace(/CREATE TABLE IF NOT EXISTS otps \(/g, 'CREATE TABLE IF NOT EXISTS otps (');
        pgQuery = pgQuery.replace(/CREATE TABLE IF NOT EXISTS schools \(/g, 'CREATE TABLE IF NOT EXISTS schools (');
        
        // Convert BOOLEAN DEFAULT FALSE to BOOLEAN DEFAULT false
        pgQuery = pgQuery.replace(/BOOLEAN DEFAULT FALSE/g, 'BOOLEAN DEFAULT false');
        pgQuery = pgQuery.replace(/BOOLEAN DEFAULT TRUE/g, 'BOOLEAN DEFAULT true');
        
        // Convert TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        pgQuery = pgQuery.replace(/TIMESTAMP DEFAULT CURRENT_TIMESTAMP/g, 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
        
        // Convert MySQL parameter placeholders (?) to PostgreSQL ($1, $2, etc.)
        let paramIndex = 1;
        pgQuery = pgQuery.replace(/\?/g, () => `$${paramIndex++}`);

        const result = await pgPool.query(pgQuery, pgParams);
        
        // Return consistent format
        if (result.command === 'INSERT') {
          return [{ insertId: result.rows[0]?.id || null, affectedRows: result.rowCount }];
        }
        return [result.rows];
      } else if (mysqlPool) {
        const [rows, fields] = await mysqlPool.execute(query, params);
        return [rows, fields];
      } else {
        throw new Error('No database connection available. Please check your environment variables.');
      }
    } catch (error) {
      console.error('Database query error:', error);
      console.error('Query:', query);
      console.error('Params:', params);
      throw error;
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