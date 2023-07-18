"use client"

import React, { useEffect, useState } from 'react'

export default function page() {

    const [posts, setPosts] = useState([]);

    const createPost = async (e) =>{
        e.preventDefault();
        try {
            const res = await fetch('/api/post/new',{
                method: "POST",
                body: JSON.stringify({
                    title: "mytitle",
                    description: "mydesc",
                    tag: "tags"
                })
            })
            // const data = await res.json();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        
    }

    const fethcPosts = async () =>{
        const res = await fetch('/api/post');
        const data = await res.json()
        console.log(data);
        setPosts(data);
    }

    useEffect(()=>{
        fethcPosts();
    },[])

  return (
    <>
        <button onClick={createPost}>Create post</button>
        {
            posts ? (
                posts.map((post)=>{
                    return <>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                    </>
                })
            ) : "loading"
        }
    </>

  )
}
