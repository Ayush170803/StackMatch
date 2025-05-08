import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {  useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../utils/requestSlice';

const Requests = () => {
  const [error,setError] = useState("");
  const dispatch = useDispatch();
  const allRequests = useSelector((store)=> store.Requests)

  const reviewRequests = async (status,id) =>
    {
      try
      {
       const res = await axios.post("http://localhost:3000/request/review/"+status+"/"+id,{},{withCredentials:true});
       dispatch(removeRequests(id));
      }
      catch(er)
      {
        if(er.response && er.response.data && er.response.data.message)
          {
            setError(er?.response?.data);
          }
          else
          {
            setError("Not Able to review the rrequests");
          }
          console.log(er);
        }
    }

  const getRequests = async () =>
  {
    try
    {
      const res = await axios.get("http://localhost:3000/user/requests",{withCredentials:true});
      //console.log(res.data[0]);
      
      dispatch(addRequests(res.data.map((r) => ({
        requestId: r._id,
        fromUser: r.fromUserId
      }))));

    }
    catch(er)
    {
      if(er.response && er.response.data && er.response.data.message)
        {
          setError(er?.response?.data);
        }
        else
        {
          setError("Not Able to get the Requests");
        }
        console.log(er);
      }
    }

    useEffect(()=>{getRequests()},[]);
    if(!allRequests) return;
    if(allRequests.length==0) return <h1>No requests exist</h1>

  return (
    <div className="request-container">
    {allRequests.map((request) => {
       const { requestId, fromUser } = request;
       const { _id, firstName, lastName, photoUrl, gender, age, about, skills } = fromUser;
      return (
        <div key={_id} className="request-card">
          <img src={photoUrl} alt={`${firstName}'s profile`} className="request-avatar" />
          
          <div className="request-info">
            <h2 className="request-name">{firstName} {lastName}</h2>
            <p className="request-meta"><strong>Gender:</strong> {gender}</p>
            <p className="request-meta"><strong>Age:</strong> {age}</p>
            <p className="request-about">{about}</p>
  
            <div className="request-skills">
              {skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">
                  {skill.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
  
          <div className="request-actions">
            <button className="btn-accept" onClick={()=>reviewRequests("accepted",requestId)}>Accept</button>
            <button className="btn-reject" onClick={()=>reviewRequests("rejected",requestId)}>Reject</button>
          </div>
        </div>
      );
    })}
  </div>
  )  
}

export default Requests
