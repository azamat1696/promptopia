"use client";
import Profile from "@components/Profile";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfilePage = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
     useEffect( () => {
       const fetchPosts = async () => {
           const response = await fetch(`/api/users/${session?.user.id}/posts`, {
               method: "GET",
           })
           if (response.status === 200) {
               const json = await response.json()
               setPosts(json)
            }
       }
        if (session?.user.id) fetchPosts()

    }, [])
    const handleEdit =async (post) => {
       router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {
         const hasConfirmed = confirm("Are you sure you want to delete this post?")
        if (!hasConfirmed) return
         try {
            const response = await fetch(`/api/prompt/${post._id.toString()}`, {
                method: "DELETE",
            })
            if (response.status === 200) {
                 setPosts(posts.filter(item => post._id !== item._id))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Profile
            name="My"
            desc="Welcome to my profile"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
export default MyProfilePage;
