import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";

function Feed({ username }) {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/642000c599423252cb6a14aa");
      setPost(res.data);
    };
    fetchPost();
  }, [username]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {post.map((p) => (
          <Post key={p._id} post={p}></Post>
        ))}
      </div>
    </div>
  );
}

export default Feed;
