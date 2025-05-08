import React from 'react'
import errorimg from "../assets/errorimg.jpg"
import { useNavigate } from 'react-router-dom'
const Error = () => {
    const navigate = useNavigate();

  return (
    <div id="errorpage">
      <img src={errorimg} alt="404" className="error-image" />
      <button className="redirect-button" onClick={() => navigate("/profile")}>
        Go to Profile
      </button>
    </div>
  )
}

export default Error
