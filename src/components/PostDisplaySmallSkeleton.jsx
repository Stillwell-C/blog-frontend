const PostDisplaySmallSkeleton = () => {
  return (
    <div className='post-display-small-wrapper loading'>
      <div className='pds-title-loading-wrapper'>
        <div className='pds-title-loading short'></div>
        <div className='pds-title-loading'></div>
      </div>
      <div className='pds-text-loading-wrapper'>
        <div className='pds-text-loading short'></div>
        <div className='pds-text-loading'></div>
        <div className='pds-text-loading'></div>
        <div className='pds-text-loading'></div>
        <div className='pds-text-loading short'></div>
      </div>
    </div>
  );
};

export default PostDisplaySmallSkeleton;
