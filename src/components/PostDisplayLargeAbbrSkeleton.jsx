const PostDisplayLargeAbbrSkeleton = () => {
  return (
    <div className='post-display-wrapper flex-container flex-column flex-justify-between post-display-abbr-wrapper post-display-wrapper-skeleton padding-1'>
      <div className='post-display-wrapper-skeleton-title gap-5p flex-container flex-column flex-align-center'>
        <div className='skeleton skeleton-title-md skeleton-width-80'></div>
        <div className='skeleton skeleton-title-md skeleton-width-100'></div>
      </div>
      <div className='skeleton skeleton-text skeleton-width-50'></div>
    </div>
  );
};

export default PostDisplayLargeAbbrSkeleton;
