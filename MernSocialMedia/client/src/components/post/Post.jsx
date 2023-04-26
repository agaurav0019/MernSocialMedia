import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import {format} from "timeago.js"
import {Link} from "react-router-dom"

export default function Post({post}) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setISLiked] = useState(false);
  const [users, setUsers] = useState({})

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const likeHandler = () =>{
    setLike(isLiked ? like-1 : like+1);
    setISLiked(!isLiked);
  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUsers(res.data);
    };
    fetchUser();
  }, [post.userId]);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${users.username}`}>

            <img
              className="postProfileImg"
              src={users.profilePicture || PF+"person/noAvatar.png"}
              alt="profilePicture"
            />
            </Link>
            <span className="postUsername">
              {users.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}/like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}/heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}