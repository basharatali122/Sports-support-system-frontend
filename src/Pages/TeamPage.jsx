import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TeamPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/teams')
      .then(response => setTeams(response.data))
      .catch(() => alert('Error fetching teams'));
  }, []);

  const joinTeam = (teamId) => {
    axios.post(`http://localhost:5000/api/teams/${teamId}/join`, { userId: localStorage.getItem('userId') })
      .then(() => alert('Joined successfully'))
      .catch(() => alert('Error joining team'));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Teams</h1>
      {teams.map(team => (
        <div key={team._id} className="card bg-white shadow-lg p-4 m-2">
          <h2 className="text-xl font-semibold">{team.name} - {team.sport}</h2>
          <p>Coach: {team.coach?.name}</p>
          <button className="btn btn-primary mt-2" onClick={() => joinTeam(team._id)}>Join Team</button>
        </div>
      ))}
    </div>
  );
}

export default TeamPage;
