import PostDisplaySmall from "./PostDisplaySmall";
import PostDisplaySmallSkeleton from "./PostDisplaySmallSkeleton";

const HomeTopPosts = ({ topPosts, isLoading }) => {
  const loadingContent = (
    <>
      <PostDisplaySmallSkeleton />
      <PostDisplaySmallSkeleton />
      <PostDisplaySmallSkeleton />
    </>
  );

  const topPostsRender = topPosts?.map((post) => (
    <PostDisplaySmall key={post._id} post={post} />
  ));

  const content = isLoading ? loadingContent : topPostsRender;

  return (
    <div className='top-posts-list flex-container flex-column'>{content}</div>
  );
};

export default HomeTopPosts;
