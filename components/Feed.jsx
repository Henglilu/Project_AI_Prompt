"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState(""); // user type
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]); // to hold the filtered results

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data); // take every post
      setFilteredPosts(data); // take filtered posts
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
    filterPosts(newSearchText);
  };

  const filterPosts = (searchText) => {
    const filtered = posts.filter((post) => {
      const promptMatch = post.prompt
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const tagMatch = post.tag
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const usernameMatch = post.creator.username
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return promptMatch || tagMatch || usernameMatch;
    });
    setFilteredPosts(filtered);
  };

  return (
    <section className="feed">
      {/* use form for search */}
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
