import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EventRegistration({ eventId }) {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    axios.get(`/api/events/${eventId}`)
      .then(res => {
        const participants = res.data.participants || [];
        setIsRegistered(participants.includes(localStorage.getItem('userId')));
      });
  }, [eventId]);

  const handleRegistration = async () => {
    try {
      await axios.post(`/api/events/${eventId}/register`);
      setIsRegistered(true);
      alert('Successfully registered!');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <button 
      className={`btn ${isRegistered ? 'btn-disabled' : 'btn-primary'}`}
      onClick={handleRegistration}
      disabled={isRegistered}
    >
      {isRegistered ? 'Registered' : 'Register Now'}
    </button>
  );
}

export default EventRegistration;