import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CoachDashboard() {
  const [pendingParticipants, setPendingParticipants] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [participantsRes, teamRes] = await Promise.all([
          axios.get('/api/users?role=participant&approved=false'),
          axios.get('/api/teams/myteam')
        ]);

        console.log('Participants Response:', participantsRes.data);
        console.log('Team Response:', teamRes.data);

        // Ensure we always set arrays
        setPendingParticipants(Array.isArray(participantsRes.data) ? participantsRes.data : []);
        setTeamMembers(Array.isArray(teamRes.data?.members) ? teamRes.data.members : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const approveParticipant = async (userId) => {
    try {
      await axios.patch(`/api/users/${userId}/approve`);
      setPendingParticipants(prev => prev.filter(user => user._id !== userId));
      alert('Participant approved');
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Approval failed');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Coach Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-white shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Pending Participants</h2>
          {pendingParticipants.length > 0 ? (
            pendingParticipants.map(user => (
              <div key={user._id} className="mb-4 p-3 border rounded">
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                  onClick={() => approveParticipant(user._id)}
                >
                  Approve Participant
                </button>
              </div>
            ))
          ) : (
            <p>No pending approvals</p>
          )}
        </div>

        <div className="card bg-white shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          {teamMembers.length > 0 ? (
            teamMembers.map(member => (
              <div key={member._id} className="mb-3 p-2 border-b">
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            ))
          ) : (
            <p>No team members yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoachDashboard;
