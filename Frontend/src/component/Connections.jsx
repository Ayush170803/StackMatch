import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {  useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { useNavigate } from 'react-router-dom';

const Connections = () => {
  const navigate = useNavigate();
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const allConnections = useSelector((store)=> store.Connections)


  const getconnections = async () =>
  {
    try
    {
      const res = await axios.get("http://localhost:3000/user/connections",{withCredentials:true});
     // console.log(res.data);
      dispatch(addConnections(res.data));
    }
    catch(er)
    {
      if(er.response && er.response.data && er.response.data.message)
        {
          setError(er?.response?.data);
        }
        else
        {
          setError("Not Able to get the connections");
        }
        console.log(er);
      }
    }

    useEffect(()=>{getconnections()},[]);
    if(!allConnections) return;
    if(allConnections.length==0) return <h1>No connections exist</h1>

  return (
    <div className="connections-container">
    {allConnections.map((connection) =>
    {
       if (!connection) return null;
      const {_id,firstName,lastName,photoUrl,gender,age,about,skills} = connection;
      return(
        <div key={_id} className="connection-card">
          <img src={photoUrl} alt={`${firstName}'s profile`} className="connection-img" />
          <div className="connection-info">
            <h2>{firstName} {lastName}</h2>
            <p><strong>Gender:</strong> {gender}</p>
            <p><strong>Age:</strong> {age}</p>
            <p className="connection-about">{about}</p>
            <div className="edit-profile-skills">
            {skills.map((skill, _id) => (
            <span key={_id} className="edit-profile-skill-badge">
              {skill.toUpperCase()}
            </span>
          ))}
        </div>
        <button onClick={() => navigate(`/chat/${_id}`)}>Chat</button>
          </div>
        </div>
      );
    })}
  </div>  
  )
}

export default Connections
