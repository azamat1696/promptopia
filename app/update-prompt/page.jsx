"use client";
import Form from "@components/Form";
import {useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";


const UpdatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });
    const { data: session } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()
            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }
        if (promptId) getPromptDetails()
    }, [promptId])
     const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const res = await fetch(`/api/prompt/${promptId}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    ...post,
                    userId:session?.user.id
                })
            })
            const json = await res.json()
            if(!res.ok){
                throw Error(json.message)
            }
            router.push("/")

        }catch (error) {
            console.log(error)
        }finally {
            setSubmitting(false)
        }

    }
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            handleSubmit={updatePrompt}
            submitting={submitting}
        />
    )
}
export default UpdatePrompt
