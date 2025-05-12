import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error,setError] = useState("");
    const [isSignInForm , setIsSignInForm] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handlelogin = async () =>
    {
    try
    {
      const res = await axios.post(
        "http://localhost:3000/login",
        { emailId, password },
        { withCredentials: true } // send cookies across domains
      );
      if(res.data && res.data.user)
      {
        dispatch(addUser(res.data.user));
        navigate('/');
      }
      else
      {
        setError("Invalid login response. Please try again.");
      }
    }
    catch (er) {
      if(er.response && er.response.data && er.response.data.message)
      {
        setError(er?.response?.data);
      }
      else
      {
        setError("Login failed. Please try again.");
      }
      console.log(er);
    }
    }
    
    const handlesignup = async () =>
    {
      try
      {
        const res = await axios.post("http://localhost:3000/signup",{firstName,lastName,emailId,password},{withCredentials:true});
        dispatch(addUser(res.data.data));
        return navigate('/profile');
      }
      catch(er)
      {
        if(er.response && er.response.data && er.response.data.message)
          {
            setError(er?.response?.data);
          }
          else
          {
            setError("Signup failed. Please try again.");
          }
          console.log(er);
      }
    }
      const toggleform = ()=>
      {
        setIsSignInForm(!isSignInForm);
      }
  return (
    <div>
    <div id='formdiv'>
    <form id='form' onSubmit={(e)=>{e.preventDefault()}}>
    <h1>{isSignInForm?"Sign In":"Sign Up"}</h1>
    {isSignInForm?"":<input type='text' placeholder='First Name' required className='inputauth' onChange={(e)=>{setFirstName(e.target.value)}}></input>}
    {isSignInForm?"":<input type='text' placeholder='Last Name' required className='inputauth' onChange={(e)=>{setLastName(e.target.value)}}></input>}
     <input type='email' placeholder='Email Address' id='email' value={emailId} onChange={(e)=>{setEmailId(e.target.value)}} className='inputauth'/>
     <input type='password' placeholder='Password' id='pwd' value={password} onChange={(e)=>{setPassword(e.target.value)}} className='inputauth'/>
     <p>{error}</p>
     <button id='authbutton' onClick={isSignInForm?handlelogin:handlesignup}>{isSignInForm?"Sign in":"sign up"}</button>

     <div id='signupdiv'>
          <h3 onClick={toggleform}>{isSignInForm?"New to StackMatch? Sign Up Now":"Already Registered? Login Now"}</h3>
      </div>
     </form>
     </div>
     </div>
  )
}

export default Login
