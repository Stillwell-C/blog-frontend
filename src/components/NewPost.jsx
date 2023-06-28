import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "../features/posts/postsApiSlice";
import useAuth from "../hooks/useAuth";
import { BeatLoader } from "react-spinners";

const NewPost = () => {
  const { id } = useAuth();

  const navigate = useNavigate();

  const titleRef = useRef();
  const errRef = useRef();

  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [epigraph, setEpigraph] = useState("");
  const [epigraphErr, setEpigraphErr] = useState(false);
  const [epigraphAuthor, setEpigraphAuthor] = useState("");
  const [epigraphAuthorErr, setEpigraphAuthorErr] = useState(false);
  const [text, setText] = useState("");
  const [textErr, setTextErr] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  const [addNewPost, { isLoading, isSuccess, isError, error }] =
    useAddNewPostMutation();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMsg("");
    setTitleErr(false);
    setEpigraphErr(false);
    setTextErr(false);
    setEpigraphAuthorErr(false);
  }, [title, epigraph, text, epigraphAuthor]);

  const wordCheck = (strInput) => {
    return strInput.trim().split(" ").length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
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
    if (epigraphAuthor.length > 70) {
      setEpigraphAuthorErr(true);
      setErrorMsg("Epigraph author must not exceeed 70 characters");
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
    const trimmedTitle = title.trim();
    const trimmedEpigraph = epigraph.trim();
    const trimmedEpigraphAuthor = epigraphAuthor.trim();
    const trimmedText = text.trim();
    addNewPost({
      title: trimmedTitle,
      epigraph: trimmedEpigraph,
      epigraphAuthor: trimmedEpigraphAuthor,
      text: trimmedText,
      author: id,
    });

    // try {
    //   const response = await axios.post(
    //     ADD_POST_URL,
    //     JSON.stringify({
    //       title: trimmedTitle,
    //       epigraph: trimmedEpigraph,
    //       epigraphAuthor: trimmedEpigraphAuthor,
    //       text: trimmedText,
    //       author,
    //     }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       withCredentials: true,
    //     }
    //   );
    //   //Potentially remove once author is automatically input
    //   if (!response.data.isError) {
    //     navigate("/");
    //   } else {
    //     setErrorMsg(response.data.message);
    //   }
    // } catch (err) {
    //   console.log(err.response.status);
    //   if (!err.response) {
    //     setErrorMsg("No server reponse");
    //   } else if (err.response.status === 400) {
    //     setErrorMsg(err.response.message);
    //   } else {
    //     setErrorMsg("Add post failed");
    //   }
    //   errRef.current.focus();
    // }
  };

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  useEffect(() => {
    if (!errorMsg.length) return;
    if (isError) errRef.current.focus();
  }, [isError, errorMsg]);

  const buttonContent = !isLoading ? (
    "Submit"
  ) : (
    <BeatLoader color='#333' size={8} />
  );

  return (
    <section className='fill-screen new-post-container flex-align-center'>
      <div className='new-post-wrapper'>
        <h2>New Post</h2>
        <form onSubmit={handleSubmit}>
          <div
            className={
              errorMsg || isError ? "form-error-div" : "error-offscreen"
            }
            ref={errRef}
          >
            {errorMsg}
            {error?.data?.message}
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
              maxLength='850'
            ></textarea>
          </div>
          <div className={`form-line ${epigraphAuthorErr ? "error" : ""}`}>
            <label htmlFor='epigraphAuthor' className='form-label'>
              epigraph author:
            </label>
            <input
              type='text'
              id='epigraphAuthor'
              className='form-input post-input'
              placeholder='epigraph author'
              value={epigraphAuthor}
              onChange={(e) => setEpigraphAuthor(e.target.value)}
              autoComplete='off'
              spellCheck='true'
              maxLength='70'
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
          <div className='post-form-button-div'>
            <button
              disabled={!title || !text ? true : false}
              className='basic-button flex-container flex-align-center flex-justify-center'
              style={{ minWidth: "75px" }}
              type='submit'
            >
              {buttonContent}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewPost;
