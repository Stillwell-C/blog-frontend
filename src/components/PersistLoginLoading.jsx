import birdImg from "../assets/Tundra_bean_goose_bw.svg";

const PersistLoginLoading = () => {
  return (
    <div className='fill-screen flex-container flex-justify-center flex-align-center img-color-fix skeleton-img layout'>
      <img src={birdImg} alt='' className='main-img' />
    </div>
  );
};

export default PersistLoginLoading;
