"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000); // when press copied will show a copied icon for 3 sec than back to copydable icon
  };

  const isOwner = session?.user.id === post.creator._id;

  return (
    <div className="prompt_card">
      <div className="flex justify-between item-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">

          <Link
            href={`/profile/${post.creator._id}?name=${post.creator.username}`}
          >
            <Image
              src={post.creator?.image || "/default-avatar.png"}
              alt={`${post.creator?.username || "User"}'s profile picture`}
              width={40}
              height={40}
              className="rounded-full object-contain cursor-pointer"
            />
          </Link>

          <div className="flex flex-col ">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="icontick"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700 ">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)} // ensure than we have the tag and this will show all the relavent tag
      >
        #{post.tag}
      </p>
      {/* check if the current login user are the creator of the post if there are on the profile page  run the comand below*/}
      {isOwner && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
