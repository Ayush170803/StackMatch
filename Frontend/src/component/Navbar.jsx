import React from 'react'
import logotext from '../assets/logotext.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
const Navbar = () => {

  const user = useSelector((store) => store.user); 
  const dispatch = useDispatch();
  // console.log(user);

  const handlelogout = async ()=>
  {
    try
    {
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      window.location.href = '/login';
    }
    catch(er)
    {
      console.log("Can't able to Logout "+er.message);
    }
  }
  return (
    <div id="navcontainer">
      {user && <>
        <div id="left">
       <Link to="/"><img src={logotext} alt="Logo" height={50} width={200}/></Link>
        </div>
        <div id="nav-items">
            <Link to="/profile"><p>Profile</p></Link>
            <Link to="/connections"><p>Connections</p></Link>
            <Link to="/requests"><p>Requests</p></Link>
            <button onClick={handlelogout} id='signoutbtn'>Logout</button>
            <h4>Welcome, {user.firstName}</h4>
            <img src={user.photoUrl}/>
        </div>
        </>
        }
    </div>
  )
}

export default Navbar
