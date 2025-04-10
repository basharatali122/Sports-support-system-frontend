import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => setEvents(response.data))
      .catch(() => alert('Error fetching events'));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Sports Events</h1>
      {events.map(event => (
        <div key={event._id} className="card bg-white shadow-lg p-4 m-2">
          <h2 className="text-xl font-semibold">{event.name}</h2>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EventPage;
