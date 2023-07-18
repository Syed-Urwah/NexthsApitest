"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function page() {

    const param = useParams();
    const [update, setUpdate] = useState({})

    const UpdatePost = async () => {
        try {
            const res = await fetch(`/api/post/${param.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    title: "new ti",
                    description: "new desc",
                    tag: "new tag"
                })
            });
            const data = await res.json()
            console.log(data)
            setUpdate(res);
        } catch (error) {
            console.log(error);
        }

    }

    const deletePost = async () => {
        try {
            const res = await fetch(`/api/post/${param.id}`, {
                method: 'DELETE'
            })
            console.log(res);
        } catch (error) {
            console.log(error)
        }
       
    }

    useEffect(() => {

    }, [update])


    return (


        <>
            <h2>Update this post :id {param.id}</h2>
            <div className='flex flex-col'>
                <button onClick={UpdatePost}>Update</button>
                <button onClick={deletePost}>Delete</button>
            </div>

        </>
    )
}
