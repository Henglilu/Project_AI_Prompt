"use client";

import { useState, useEffect } from "react"; // use for hook
import { useSession } from "next-auth/react"; // to know that we login or not
import { useRouter } from "next/navigation"; // use for get back to home

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };
    console.log(posts);

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })
        const filteredPosts = posts.filter((p) => p._id !== post._id)

        setMyPosts(filteredPosts)
      }catch(error) {
        console.log(error)
      }
    }

  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts} // an array of the post
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
