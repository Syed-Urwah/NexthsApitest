import { NextResponse } from "next/server";

const { default: pool } = require("@/lib/db");

//update post
async function updatePost(title, description, tag, id) {
    const client = await pool.connect();

    try {
        const query = `
        UPDATE post
        SET title=$1, description=$2, tag=$3
        WHERE id=$4
        RETURNING *
        `

        const values = [title, description, tag, id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating post:', error);
    }



}



export const PATCH = async (req, { params }) => {

    try {
        const { title, description, tag } = await req.json();
        const result = await updatePost(title, description, tag, params.id);
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (error) {
        return new NextResponse(error, { status: 500 });
    }


}

export const DELETE = async (req , { params }) => {
    const cleint = await pool.connect();

    try {
        const query = `
    DELETE FROM post
    WHERE id = $1
    `

        const result = await cleint.query(query, [params.id]);
        const data = (await result).rows;

        return new NextResponse(JSON.stringify(data), { status: 200 })
    } catch (error) {
        return new NextResponse(error , {status: 500});
    }


}