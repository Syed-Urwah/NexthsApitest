import { NextResponse } from "next/server";

const { default: pool } = require("@/lib/db");


async function createTable() {
    const client = await pool.connect();

    const query = `
      CREATE TABLE IF NOT EXISTS post (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100),
        description VARCHAR(100),
        tag VARCHAR(100)
      )
    `;

    try {
        await client.query(query);
        console.log('post table created successfully.');
    } catch (error) {
        console.error('Error creating user table:', error);
        throw error;
    } finally {
        client.release();
    }
}


async function insertPost(title, description, tag) {
    const client = await pool.connect();

    const query = `
      INSERT INTO post (title, description, tag)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [title, description, tag];

    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    } finally {
        client.release();
    }
}

//create new post
export const POST = async (req, res) => {
    const { title, description, tag } = await req.json();

    try {
        await createTable();
        const post = await insertPost(title, description, tag);
        return new NextResponse("created",{status: 200})
    } catch (error) {
        console.error('Error creating post:', error);
        return new NextResponse(error,{status: 500})
    }
}