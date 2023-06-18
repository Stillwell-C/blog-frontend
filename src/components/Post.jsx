import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const POST_URL = "/posts";

const Post = () => {
  const { postID } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [postContent, setPostContent] = useState({});
  const [parsedDate, setParsedDate] = useState("");

  const parseDate = (createdDate, updatedDate) => {
    if (createdDate === updatedDate) {
      setParsedDate(new Date(createdDate).toUTCString());
    } else {
      setParsedDate(`Last Updated: ${new Date(createdDate).toUTCString()}`);
    }
  };

  useEffect(() => {
    const axiosGet = async () => {
      try {
        const response = await axios.get(`${POST_URL}/${postID}`);
        parseDate(response?.data?.createdAt, response?.data?.updatedDate);
        setPostContent(response?.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        //maybe navigate to 404
      }
    };
    axiosGet();
  }, []);

  const LoadingPage = <p>Loading...</p>;

  const LoadedPage = (
    <article className='single-post-content'>
      <h2>{postContent?.title}</h2>
      <div className='single-post-author'>
        <span>By: {postContent?.author?.username}</span>
      </div>
      <div className='single-post-date'>
        <span>{parsedDate}</span>
      </div>
      <div className='single-post-epigraph-content'>
        <p className='epigraph-text'>{postContent?.epigraph}</p>
        <p className='epigraph-author'>{`  - ${postContent?.epigraphAuthor}`}</p>
      </div>
      <div className='single-post-text'>
        <p>{postContent?.text}</p>
      </div>
    </article>
  );

  const content = isLoading ? LoadingPage : LoadedPage;

  return (
    <section className='fill-screen single-post-container'>{content}</section>
  );
};

export default Post;
