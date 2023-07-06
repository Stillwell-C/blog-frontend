import { useEffect } from "react";
import FocusTrap from "focus-trap-react";

const ConfirmModal = ({ text, modalOpen, setModalOpen, setConfirmTask }) => {
  useEffect(() => {
    //This will close modal with escape key
    function keyListener(e) {
      if (e.keyCode === 27) {
        setModalOpen(false);
      }
    }

    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const handleConfirmTask = () => {
    setConfirmTask(true);
    setModalOpen(false);
  };

  return (
    <>
      <FocusTrap focusTrapOptions={{ initialFocus: "#modal-close" }}>
        <div
          className={`modal-container flex-container flex-column ${
            modalOpen && "modal-active"
          }`}
          aria-modal='true'
        >
          <header className='modal-header flex-container'>
            <button
              type='button'
              className='modal-close-button'
              aria-label='close'
              onClick={() => setModalOpen(false)}
            >
              &#10005;
            </button>
          </header>
          <section className='modal-body fill-screen flex-container flex-column flex-align-center flex-justify-center'>
            <p className='margin-btm-2'>Are you sure you want to {text}?</p>
            <div className='modal-buttons flex-container flex-align-center flex-justify-center'>
              <button
                type='button'
                className='basic-button delete-button margin-r-1'
                onClick={() => setModalOpen(false)}
                id='modal-close'
              >
                Close
              </button>
              <button
                type='button'
                className='basic-button'
                onClick={handleConfirmTask}
              >
                Confirm
              </button>
            </div>
          </section>
        </div>
      </FocusTrap>
      <div
        className={`modal-overlay ${modalOpen && "modal-active"}`}
        onClick={() => setModalOpen(false)}
      ></div>
    </>
  );
};

export default ConfirmModal;
