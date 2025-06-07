import React, { useState } from 'react';
import { createAvailability } from '../api';

function AvailabilityForm({ onSave }) {
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createAvailability({ user_id: userId, date, start_time: startTime, end_time: endTime });
        onSave(res.data);
        setDate(''); setStartTime(''); setEndTime('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 border rounded">
            <div className="mb-2">
                <input className="form-control" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            </div>
            <div className="mb-2">
                <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="mb-2">
                <input type="time" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
            </div>
            <div className="mb-2">
                <input type="time" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
            </div>
            <button className="btn btn-primary">Save</button>
        </form>
    );
}

export default AvailabilityForm;
