"use client";
import Form from "@components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreatePrompt = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: "",
    });
    const { data: session } = useSession();
    const router = useRouter();
     const createPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const res = await fetch("/api/prompt/new",{
                method:"POST",
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
          type="Create"
          post={post}
          setPost={setPost}
          handleSubmit={createPrompt}
          submitting={submitting}
        />
    )
}
export default CreatePrompt
