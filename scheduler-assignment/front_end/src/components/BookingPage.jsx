import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAvailability, bookSlot } from '../api';

function BookingPage() {
    const { url } = useParams();
    const [slots, setSlots] = useState([]);
    const [selected, setSelected] = useState(null);
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const res = await getAvailability(url);
                const start = new Date(res.data.availability.start_time);
                const end = new Date(res.data.availability.end_time);

                const timeSlots = [];
                for (let t = new Date(start); t < end; t.setMinutes(t.getMinutes() + 30)) {
                    const slot = new Date(t);
                    timeSlots.push(slot.toISOString().slice(0, 16));
                }

                const booked = res.data.bookedSlots.map(b => b.start_time.slice(0, 16));
                setSlots(timeSlots.filter(ts => !booked.includes(ts)));
            } catch (err) {
                setError('Invalid or expired link');
            }
        };

        fetchSlots();
    }, [url]);

    const handleBook = async () => {
        const date = selected.split('T')[0];
        const start_time = selected.split('T')[1];
        const end_time = new Date(new Date(selected).getTime() + 30 * 60000).toISOString().split('T')[1];

        try {
            await bookSlot({ url, user_id: userId, date, start_time, end_time });
            alert('Booking Confirmed');
        } catch {
            alert('Booking Failed or Slot Already Taken');
        }
    };

    if (error) return <div>{error}</div>;
    return (
        <div className="container mt-5">
            <h3>Book a Slot</h3>
            <input className="form-control mb-2" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <div className="d-flex flex-wrap">
                {slots.map(slot => (
                    <button key={slot} className={`btn m-2 ${slot === selected ? 'btn-success' : 'btn-outline-primary'}`} onClick={() => setSelected(slot)}>
                        {slot.split('T')[1]}
                    </button>
                ))}
            </div>
            <button className="btn btn-primary mt-3" onClick={handleBook} disabled={!selected || !userId}>
                Book Selected Slot
            </button>
        </div>
    );
}

export default BookingPage;
