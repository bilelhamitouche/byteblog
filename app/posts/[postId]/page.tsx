import { getUserInfo } from "@/actions/auth";
import FollowButton from "@/components/FollowButton";
import LikeButton from "@/components/LikeButton";
import PostActionsDropdown from "@/components/PostActionsDropdown";
import SavePostButton from "@/components/SavePostButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  getPost,
  hasUserFollowedAuthor,
  hasUserLikedPost,
  hasUserSavedPost,
} from "@/lib/queries";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const postId = (await params).postId;
  const [post, user] = await Promise.all([getPost(postId), getUserInfo()]);
  if (!post) notFound();
  const hasUserLiked = await hasUserLikedPost(postId, user?.id as string);
  const hasUserSaved = await hasUserSavedPost(postId, user?.id as string);
  const hasUserFollowed = await hasUserFollowedAuthor(
    post.authorId as string,
    user?.id as string,
  );
  return (
    <div className="py-28 px-8 mx-auto max-w-3xl h-full post">
      <div className="flex flex-col gap-4 items-start p-4 w-full">
        <h1 className="text-3xl font-bold sm:text-4xl">{post.title}</h1>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage
                src={post.authorImage as string}
                alt={`${post.author} image`}
              />
              <AvatarFallback>{post.author?.toUpperCase()[0]}</AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
          </div>
          {post.author === user?.name ? null : (
            <FollowButton
              postId={post.id}
              followedId={post.authorId as string}
              hasUserFollowed={hasUserFollowed as boolean}
              loggedIn={!!user}
            />
          )}
          <p className="text-gray-500 dark:text-gray-300">
            {post.createdAt?.toLocaleDateString()}
          </p>
        </div>
      </div>
      <hr />
      <div className="flex gap-4 justify-between items-center p-2 w-full">
        <div className="flex gap-1 items-center">
          <span>{post.likesCount}</span>
          <LikeButton
            postId={postId}
            hasUserLiked={hasUserLiked as boolean}
            loggedIn={!!user?.id}
            isDisabled={post.authorId === user?.id}
          />
        </div>
        <div className="flex gap-2 items-center">
          <SavePostButton
            postId={postId}
            hasUserSaved={hasUserSaved as boolean}
            loggedIn={!!user?.id}
            isDisabled={post.authorId === user?.id}
          />
          {post.authorId === user?.id ? (
            <PostActionsDropdown postId={postId} />
          ) : null}
        </div>
      </div>
      <hr />
      <p className="p-2 py-8 leading-7">{post.content}</p>
    </div>
  );
}
