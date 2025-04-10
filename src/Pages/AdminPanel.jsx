import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [pendingCoaches, setPendingCoaches] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coachesRes, usersRes, eventsRes] = await Promise.all([
          axios.get('/api/users?role=coach&approved=false'),
          axios.get('/api/users?approved=true'),
          axios.get('/api/events?approved=false')
        ]);
        
        console.log("Coaches Response:", coachesRes.data);
        console.log("Approved Users Response:", usersRes.data);
        console.log("Pending Events Response:", eventsRes.data);

        setPendingCoaches(Array.isArray(coachesRes.data) ? coachesRes.data : []);
        setApprovedUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
        setPendingEvents(Array.isArray(eventsRes.data) ? eventsRes.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleApproval = async (userId) => {
    try {
      await axios.patch(`/api/users/${userId}/approve`);
      setPendingCoaches(prev => prev.filter(user => user._id !== userId));
      alert('Coach approved successfully');
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Approval failed');
    }
  };

  const approveEvent = async (eventId) => {
    try {
      await axios.patch(`/api/events/${eventId}/approve`);
      setPendingEvents(prev => prev.filter(e => e._id !== eventId));
      alert('Event approved successfully');
    } catch (error) {
      console.error('Event approval failed:', error);
      alert('Event approval failed');
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-white shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Pending Coach Approvals</h2>
          {Array.isArray(pendingCoaches) && pendingCoaches.length > 0 ? (
            pendingCoaches.map(user => (
              <div key={user._id} className="mb-4 p-3 border rounded">
                <p className="font-medium">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
                <button
                  className="btn btn-success btn-sm mt-2"
                  onClick={() => handleApproval(user._id)}
                >
                  Approve Coach
                </button>
              </div>
            ))
          ) : (
            <p>No pending approvals</p>
          )}
        </div>

        <div className="card bg-white shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Approved Users</h2>
          {Array.isArray(approvedUsers) && approvedUsers.length > 0 ? (
            approvedUsers.map(user => (
              <div key={user._id} className="mb-3 p-2 border-b">
                <p>{user.name} ({user.role})</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            ))
          ) : (
            <p>No approved users</p>
          )}
        </div>

        <div className="card bg-white shadow-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Pending Event Approvals</h2>
          {Array.isArray(pendingEvents) && pendingEvents.length > 0 ? (
            pendingEvents.map(event => (
              <div key={event._id} className="mb-4 p-3 border rounded">
                <p className="font-medium">{event.name}</p>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <button
                  className="btn btn-success btn-sm mt-2"
                  onClick={() => approveEvent(event._id)}
                >
                  Approve Event
                </button>
              </div>
            ))
          ) : (
            <p>No pending events</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
