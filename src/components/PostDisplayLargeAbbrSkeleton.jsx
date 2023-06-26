const PostDisplayLargeAbbrSkeleton = () => {
  return (
    <div className='post-display-wrapper post-display-abbr-wrapper post-display-wrapper-skeleton'>
      <div className='post-display-wrapper-skeleton-title'>
        <div className='skeleton skeleton-title-md skeleton-width-80'></div>
        <div className='skeleton skeleton-title-md skeleton-width-100'></div>
      </div>
      <div className='skeleton skeleton-text skeleton-width-50'></div>
    </div>
  );
};

export default PostDisplayLargeAbbrSkeleton;
