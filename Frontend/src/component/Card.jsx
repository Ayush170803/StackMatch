import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const Card = ({ user }) => {
    const dispatch = useDispatch();
    const { _id, firstName, lastName, about, skills, photoUrl, age, gender } = user;

    const handleSendRequest = async (status,_id) =>
    {
      try
      {
        const res = await axios.post('http://localhost:3000/request/send/'+status+"/"+_id,{},{withCredentials:true});
        dispatch(removeFeed(_id));
      }
      catch(er)
      {
        console.log(er);
      }
    }

  return (
    <div id="card-wrapper">
      <div className="card">
        <img src={photoUrl} alt="Profile" className="card-image" />
        <h2 className="card-name">{firstName} {lastName}</h2>

        <div className="card-meta">
        <span className="meta-badge">{age}</span>
        <span className="meta-badge">{gender}</span>
        </div>
        <p className="card-about">{about}</p>
        <div className="card-skills">
          {skills.map((skill, index) => (
            <span key={index} className="skill-badge">{skill.toUpperCase()}</span>
          ))}
        </div>
        <div className="card-actions">
          <button className="btn interested" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
          <button className="btn ignored" onClick={()=>handleSendRequest("ignored",_id)}>Ignored</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
