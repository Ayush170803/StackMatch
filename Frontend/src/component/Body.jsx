import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addUser } from '../utils/userSlice'
const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userData = useSelector(store => store.user);
  const fetchuser = async()=>
  {
    if(userData) return;
    try
    {
    const res = await axios.get("http://localhost:3000/profile/view",{withCredentials:true});
    console.log(res);
    dispatch(addUser(res.data));
    }
    catch(er)
    {
      if(er.status === 401)
      {
        Navigate('/login');
      }
      console.log(er.message);
    }
  }

  useEffect(()=>{
      fetchuser();
  },[]);
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
