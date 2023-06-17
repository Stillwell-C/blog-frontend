import { useState, useEffect, useRef } from "react";

const NewPost = () => {
  const titleRef = useRef();
  const errRef = useRef();

  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [epigraph, setEpigraph] = useState("");
  const [epigraphErr, setEpigraphErr] = useState(false);
  const [text, setText] = useState("");
  const [textErr, setTextErr] = useState(false);
  //Later use auth and get this with useEffect
  const [author, setAuthor] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
    setTitleErr(false);
    setEpigraphErr(false);
    setTextErr(false);
  }, [title, epigraph, text]);

  const wordCheck = (strInput) => {
    return strInput.trim().split(" ").length;
  };

  const handleSubmit = async () => {
    if (!title.length) {
      setTitleErr(true);
      setErrorMsg("Must include title");
      errRef.current.focus();
      return;
    }
    if (title.length > 150) {
      setTitleErr(true);
      setErrorMsg("Title must be less than 150 characters");
      errRef.current.focus();
      return;
    }
    if (epigraph.length > 850) {
      setEpigraphErr(true);
      setErrorMsg("Epigraph must be less than 850 characters");
      errRef.current.focus();
      return;
    }
    const textLength = wordCheck(text);
    if (textLength > 4000) {
      setTextErr(true);
      setErrorMsg("Post text should not exceeed 4,000 words");
      errRef.current.focus();
      return;
    }
  };

  return (
    <section className='fill-screen new-post-container flex-align-center'>
      <div className='new-post-wrapper'>
        <h2>New Post</h2>
        <form onSubmit={handleSubmit}>
          <div
            className={errorMsg ? "form-error-div" : "error-offscreen"}
            ref={errRef}
          >
            {errorMsg}
          </div>
          <div className={`form-line ${titleErr ? "error" : ""}`}>
            <label htmlFor='title' className='form-label'>
              title:
            </label>
            <input
              type='text'
              id='title'
              className='form-input post-input'
              placeholder='title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete='off'
              spellCheck='true'
              required
              ref={titleRef}
              maxLength='150'
            />
          </div>
          <div className={`form-line ${epigraphErr ? "error" : ""}`}>
            <label htmlFor='epigraph' className='form-label'>
              epigraph:
            </label>
            <textarea
              type='text'
              id='epigraph'
              className='form-textarea post-input'
              placeholder='epigraph'
              value={epigraph}
              onChange={(e) => setEpigraph(e.target.value)}
              autoComplete='off'
              spellCheck='true'
              required
              maxLength='850'
            ></textarea>
          </div>
          <div className='form-line'>
            <label htmlFor='author' className='form-label'>
              author:
            </label>
            <input
              type='text'
              id='author'
              className='form-input post-input'
              placeholder='author'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              autoComplete='off'
              spellCheck='true'
              required
            />
          </div>
          <div className={`form-line ${textErr ? "error" : ""}`}>
            <label htmlFor='text' className='form-label'>
              text:
            </label>
            <textarea
              id='text'
              className='form-textarea post-input textarea-long'
              placeholder='post text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoComplete='off'
              spellCheck='true'
              required
            ></textarea>
          </div>
          <div className='button-div'>
            <button
              disabled={!title || !text ? true : false}
              className='basic-button'
              type='submit'
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewPost;
