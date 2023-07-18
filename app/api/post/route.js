import pool from "@/lib/db"
import { NextResponse } from "next/server";



//get all the posts
export const GET = async () =>{

    const client = pool.connect();

    try {
        const query = `
        SELECT * FROM post
        `
        const result = (await client).query(query);
        const data = (await result).rows
        return new NextResponse(JSON.stringify(data), {status: 200})
    } catch (error) {
        return new NextResponse(error, {status: 500})
    }

   
}



