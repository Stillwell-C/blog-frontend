const PostDisplaySmallSkeleton = () => {
  return (
    <div className='post-display-wrapper flex-container flex-column flex-justify-between post-display-small-wrapper padding-1 post-display-wrapper-skeleton'>
      <div className='post-display-wrapper-skeleton-title gap-5p flex-container flex-column flex-align-center'>
        <div className='skeleton skeleton-title-sm skeleton-width-80'></div>
        <div className='skeleton skeleton-title-sm skeleton-width-100'></div>
      </div>
      <div className='skeleton skeleton-text skeleton-width-20'></div>
      <div className='skeleton skeleton-text skeleton-width-100'></div>
      <div className='skeleton skeleton-text skeleton-width-100'></div>
      <div className='skeleton skeleton-text skeleton-width-80'></div>
      <div className='skeleton skeleton-text skeleton-width-50'></div>
    </div>
  );
};

export default PostDisplaySmallSkeleton;
