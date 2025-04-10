import React, { useState } from 'react';
import axios from 'axios';

function CreateEventForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    sportType: '',
    venue: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/events', formData);
      alert('Event created successfully!');
    } catch (error) {
      alert('Error creating event');
    }
  };

  return (
    <div className="card bg-white shadow-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          className="input input-bordered w-full mb-2"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full mb-2"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
        <input
          type="datetime-local"
          className="input input-bordered w-full mb-2"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
        />
        <select
          className="select select-bordered w-full mb-2"
          value={formData.sportType}
          onChange={(e) => setFormData({...formData, sportType: e.target.value})}
        >
          <option value="">Select Sport</option>
          <option value="football">Football</option>
          <option value="cricket">Cricket</option>
          <option value="badminton">Badminton</option>
        </select>
        <input
          type="text"
          placeholder="Venue"
          className="input input-bordered w-full mb-2"
          value={formData.venue}
          onChange={(e) => setFormData({...formData, venue: e.target.value})}
        />
        <button type="submit" className="btn btn-primary w-full">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventForm;