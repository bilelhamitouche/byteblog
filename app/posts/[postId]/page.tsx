import { getUserInfo } from "@/actions/auth";
import FollowButton from "@/components/FollowButton";
import LikeButton from "@/components/LikeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPost, hasUserFollowedAuthor, hasUserLikedPost } from "@/lib/queries";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: Promise<{ postId: string }> }) {
  const postId = (await params).postId;
  const [post, user] = await Promise.all([getPost(postId), getUserInfo()]);
  if (!post) notFound();
  const hasUserLiked = await hasUserLikedPost(postId, user?.id as string);
  const hasUserFollowed = await hasUserFollowedAuthor(post.authorId as string, user?.id as string);
  return (
    <div className="max-w-3xl h-full py-28 px-8 post mx-auto">
      <div className="p-4 flex flex-col items-start gap-4 w-full">
        <h1 className="text-3xl sm:text-4xl font-bold">{post.title}</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={post.authorImage as string} alt={`${post.author} image`} />
              <AvatarFallback>{post.author?.toUpperCase()[0]}</AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
          </div>
          {post.author === user?.name ? null : <FollowButton postId={post.id} followedId={post.authorId as string} hasUserFollowed={hasUserFollowed as boolean} loggedIn={!!user} />}
          <p className="text-gray-500 dark:text-gray-300">{post.createdAt?.toLocaleDateString()}</p>
        </div>
      </div>
      <hr />
      <div className="w-full flex gap-4 items-center p-2">
        <div className="flex items-center gap-1">
          <span>{post.likesCount}</span>
          <LikeButton postId={postId} hasUserLiked={hasUserLiked as boolean} loggedIn={!!user?.id} />
        </div>
        <p>{post.createdAt?.toLocaleDateString()}</p>
      </div>
      <hr />
      <p className="p-2 py-8 leading-7">{post.content}</p>
    </div>
  )
}
