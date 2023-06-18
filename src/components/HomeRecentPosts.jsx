import PostDisplaySmall from "./PostDisplaySmall";
import PostDisplaySmallLoading from "./PostDisplaySmallLoading";

const HomeRecentPosts = ({ posts, isLoading }) => {
  let loadingContent = [];
  for (let i = 0; i < 12; i++) {
    loadingContent.push(<PostDisplaySmallLoading key={i} />);
  }

  const postsRender = posts?.map((post) => (
    <PostDisplaySmall key={post._id} post={post} />
  ));

  const content = isLoading ? loadingContent : postsRender;

  return <>{content}</>;
};

export default HomeRecentPosts;
