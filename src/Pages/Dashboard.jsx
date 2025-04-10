import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    axios.get('http://localhost:5000/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setUser(response.data))
    .catch(() => {
      localStorage.removeItem('token');
      navigate('/login');
    });
  }, [navigate]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => setEvents(response.data))
      .catch(() => alert('Error fetching events'));
    
    axios.get('http://localhost:5000/api/teams')
      .then(response => setTeams(response.data))
      .catch(() => alert('Error fetching teams'));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      {user ? (
        <div>
          <p>Welcome, <strong>{user.name}</strong>!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      
      <h2 className="text-2xl font-bold mt-6">Upcoming Events</h2>
      {events.length > 0 ? (
        events.map(event => (
          <div key={event._id} className="card bg-white shadow-lg p-4 m-2">
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <p>{event.description}</p>
          </div>
        ))
      ) : (
        <p>No events available</p>
      )}
      
      <h2 className="text-2xl font-bold mt-6">Teams</h2>
      {teams.length > 0 ? (
        teams.map(team => (
          <div key={team._id} className="card bg-white shadow-lg p-4 m-2">
            <h2 className="text-xl font-semibold">{team.name} - {team.sport}</h2>
            <p>Coach: {team.coach?.name}</p>
          </div>
        ))
      ) : (
        <p>No teams available</p>
      )}
    </div>
  );
}
export default Dashboard;