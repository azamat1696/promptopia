"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({data,handleClickedTag}) => {
    return(
        <div className="mt-16 prompt_layout">
            {data && data.map(post => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleClickedTag={handleClickedTag}
                 />
            ))}
        </div>
    )
}

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [allPosts, setAllPosts] = useState([]);
    const [searchedResults, setSearchedResults] = useState([]);
    const [searchTimeout, setSearchTimeout] = useState(null);
    const fetchPosts = async () => {
        const response = await fetch("/api/prompt")
        const data = await response.json()
        setAllPosts(data)
        setSearchedResults(data)
    }
 const handleSearch = (e) => {
        clearTimeout(searchTimeout)
        setSearchText(e)
        setSearchTimeout(setTimeout(() => {
            const searchResult = filterPrompts(searchText)
            setSearchedResults(searchResult)
        }, 500))
  }
  const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    }


    useEffect(() => {
        fetchPosts()
    }, [])
    const handleClickedTag = (tag) => {
        setSearchText(tag)
        const searchResult = filterPrompts(tag)
        setSearchedResults(searchResult)
    }

    return (
         <section className="feed">
            <form
                className="relative w-full flex-center"
             >
                <input
                type="text"
                placeholder="Search for prompts"
                className="search_input peer"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                />

            </form>
             {searchText ? (
                 <PromptCardList
                     data={searchedResults}
                     handleClickedTag={handleClickedTag}
                 />
             ):(
                    <PromptCardList data={allPosts} handleClickedTag={handleClickedTag} />
             )}
         </section>
    )
}
export default Feed
