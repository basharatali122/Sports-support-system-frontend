import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProfileForm() {
  const [profile, setProfile] = useState({
    sportsPreferences: [],
    pastParticipation: [],
    achievements: [],
    expertise: []
  });

  useEffect(() => {
    axios.get('/api/users/me')
      .then(res => setProfile(res.data))
      .catch(console.error);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/users/profile', profile);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Error updating profile');
    }
  };

  return (
    <div className="card bg-white shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Sports Preferences</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={profile.sportsPreferences.join(', ')}
            onChange={(e) => setProfile({
              ...profile,
              sportsPreferences: e.target.value.split(', ')
            })}
          />
        </div>
        
        {/* Add similar fields for other profile sections */}
        
        <button type="submit" className="btn btn-primary mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;