"use client";

import { useState, useEffect } from "react"; // use for hook
import { useRouter, useSearchParams } from "next/navigation"; // use for get back to home

import Profile from "@components/Profile";

const UserProfile = ({params}) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get("name")

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc= {`Welcome to ${userName}'s profile page.`}
      data={userPosts} // an array of the post

    />
  );
};

export default UserProfile;
