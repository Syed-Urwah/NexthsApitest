import pool, { testConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

async function getUsers() {
    const client = await pool.connect();

    try {
        const result = await client.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw error;
    } finally {
        client.release();
    }
}

async function createUserTable() {
    const client = await pool.connect();

    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100)
      )
    `;

    try {
        await client.query(query);
        console.log('User table created successfully.');
    } catch (error) {
        console.error('Error creating user table:', error);
        throw error;
    } finally {
        client.release();
    }
}

export const GET = async () => {

    await createUserTable();
    await testConnection();

    return new NextResponse("adsa", { status: 200 })
}
