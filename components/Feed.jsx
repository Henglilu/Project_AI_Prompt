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
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      // Add a cache-busting query parameter
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/prompt?t=${timestamp}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    } catch (error) {
      console.error("Fetching posts failed:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);
    filterPosts(newSearchText);
  };

  const filterPosts = (searchText) => {
    const filtered = posts.filter((post) => {
      const promptMatch = post.prompt.toLowerCase().includes(searchText.toLowerCase());
      const tagMatch = post.tag.toLowerCase().includes(searchText.toLowerCase());
      const usernameMatch = post.creator.username.toLowerCase().includes(searchText.toLowerCase());
      return promptMatch || tagMatch || usernameMatch;
    });
    setFilteredPosts(filtered);
  };

  const handleRefresh = () => {
    fetchPosts();
  };

  return (
    <section className="feed">
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