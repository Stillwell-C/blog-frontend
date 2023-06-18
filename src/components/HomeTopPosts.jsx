import PostDisplaySmall from "./PostDisplaySmall";
import PostDisplaySmallLoading from "./PostDisplaySmallLoading";

const HomeTopPosts = ({ topPosts, isLoading }) => {
  const loadingContent = (
    <>
      <PostDisplaySmallLoading />
      <PostDisplaySmallLoading />
      <PostDisplaySmallLoading />
    </>
  );

  const topPostsRender = topPosts?.map((post) => (
    <PostDisplaySmall key={post._id} post={post} />
  ));

  const content = isLoading ? loadingContent : topPostsRender;

  return <div className='top-posts-list'>{content}</div>;
};

export default HomeTopPosts;
