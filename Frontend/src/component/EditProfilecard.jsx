import React from 'react';

const EditProfileCard = ({ user }) => {
  const { firstName, lastName, about, skills, photoUrl, age, gender } = user;

  return (
    <div className="edit-profile-wrapper">
      <div className="edit-profile-card">
        <img src={photoUrl} alt="Profile" className="edit-profile-image" />
        <h2 className="edit-profile-name">{firstName} {lastName}</h2>
        <div className="edit-profile-meta">
          <span className="edit-profile-meta-badge">{age}</span>
          <span className="edit-profile-meta-badge">{gender}</span>
        </div>

        <p className="edit-profile-about">{about}</p>

        <div className="edit-profile-skills">
          {skills.map((skill, index) => (
            <span key={index} className="edit-profile-skill-badge">
              {skill.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProfileCard;
