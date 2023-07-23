"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname,useRouter } from "next/navigation";
import Link from "next/link";

const PromptCard = ({ post, handleClickedTag, handleEdit, handleDelete }) => {
    const [copied, setCopied] = useState("");
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();
    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(false), 3000);
    }
    return (
        <div className="prompt_card">
            <div className="flex justify-between items-start gap-5">
                <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
                    <Link href={`/profile`}>
                    <Image
                        src={post.creator.image}
                        alt="user_image"
                        width={40}
                        height={40}
                        className="rounded-full object-contain"
                    />
                    </Link>
                    <div className="flex flex-col">
                        <Link href={`/profile/${post.creator._id}`}>
                           <h3 className="font-satoshi font-semibold text-gray-900">
                               {post.creator.username}
                           </h3>
                       </Link>
                        <Link href={`/profile/${post.creator._id}`}>
                        <p className="font-inter text-sm text-gray-500">
                            {post.creator.email}
                        </p>
                        </Link>
                    </div>
                </div>
                <div className="copy_btn">
                    <Image
                        src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
                        alt="copy"
                        width={20}
                        height={20}
                        onClick={handleCopy}
                    />
                </div>
            </div>
            <div className="prompt_content">
                <p className="font-inter text-gray-900 text-lg">{post.prompt}</p>
            </div>
            <div className="prompt_tags">
                    <span
                        className="font-inter text-sm text-gray-500 cursor-pointer"
                        onClick={() => handleClickedTag(post.tag)}
                    >
                        {post.tag}
                    </span>

            </div>
            <div className="prompt_actions">
                <div className="flex justify-between items-center gap-5">
                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/icons/heart.svg"
                                alt="heart"
                                width={20}
                                height={20}
                            />
                            <span className="font-inter text-sm text-gray-500">
                                3
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/icons/comment.svg"
                                alt="comment"
                                width={20}
                                height={20}
                            />
                            <span className="font-inter text-sm text-gray-500">
                                4
                            </span>
                        </div>
                    </div>
                    {session?.user.id === post?.creator?._id && pathName === "/profile" && (
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/icons/edit.svg"
                                alt="edit"
                                width={20}
                                height={20}
                                onClick={() =>handleEdit && handleEdit(post)}
                            />
                            <Image
                                src="/assets/icons/delete.svg"
                                alt="delete"
                                width={20}
                                height={20}
                                onClick={() =>handleDelete && handleDelete(post._id)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default PromptCard
