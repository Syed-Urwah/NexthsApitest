
// Create a new connection pool
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export const testConnection = async () => {
    try {
      const client = await pool.connect()
      console.log('Database connected successfully.')
      client.release()
    } catch (error) {
      console.error('Error connecting to the database:', error)
    }
  }
  

export default pool
