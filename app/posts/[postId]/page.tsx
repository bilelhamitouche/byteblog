import { getUserInfo } from "@/actions/auth";
import CommentsSection from "@/components/CommentsSection";
import FollowButton from "@/components/FollowButton";
import PostActionsDropdown from "@/components/PostActionsDropdown";
import PostContent from "@/components/PostContent";
import PostLikeButton from "@/components/PostLikeButton";
import SavePostButton from "@/components/SavePostButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  getPost,
  getPostTopics,
  hasUserFollowedAuthor,
  hasUserLikedPost,
  hasUserSavedPost,
} from "@/lib/queries";
import { extractAllText, getContentReadTime } from "@/lib/utils";
import { JSONContent } from "@tiptap/react";
import { Dot } from "lucide-react";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const postId = (await params).postId;
  const [post, user] = await Promise.all([getPost(postId), getUserInfo()]);
  if (!post) notFound();
  const [hasUserLiked, hasUserSaved, hasUserFollowed, topics] =
    await Promise.all([
      hasUserLikedPost(postId, user?.id as string),
      hasUserSavedPost(postId, user?.id as string),
      hasUserFollowedAuthor(post.authorId as string, user?.id as string),
      getPostTopics(postId),
    ]);
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
          <div className="flex gap-1 items-center text-gray-500 dark:text-gray-400">
            <p>
              {getContentReadTime(extractAllText(JSON.parse(post.content)))} min
              read
            </p>
            <Dot />
            <p>{post.createdAt?.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex gap-4 justify-between items-center p-2 w-full">
        <div className="flex gap-1 items-center">
          <span>{post.likesCount}</span>
          <PostLikeButton
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
      <PostContent content={JSON.parse(post.content) as JSONContent} />
      <ul className="flex gap-4 items-center">
        {topics ? (
          topics?.map((topic) => (
            <Badge
              key={topic.id}
              variant="secondary"
              className="py-2 px-3 text-base rounded-full"
            >
              {topic.name}
            </Badge>
          ))
        ) : (
          <div className="text-red-600">Error fetching topics</div>
        )}
      </ul>
      <hr className="mb-12" />
      <CommentsSection />
    </div>
  );
}
