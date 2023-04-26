import React, {useState, useEffect} from 'react'
import Topbar from '../../components/topbar/Topbar'
import "./profile.css"
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import axios from "axios"

export default function  () {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users?username=john");
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <>
    <Topbar/>
    <div className='profile'>
      <Sidebar/>
      <div className="profileRight">
        <div className="profileRightTop">
            <img className='profileCoverImg' src={`${PF}/post/3.jpeg`} alt=""></img>
            <img className='profileUserImg' src={`${PF}/person/7.jpeg`} alt=""></img>
        </div>
        <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
        </div>
        <div className="profileRightBottom">
            <Feed username="john"/>
            <Rightbar user={user}/>
        </div>
      </div>
    </div>
    </>
  )
}
