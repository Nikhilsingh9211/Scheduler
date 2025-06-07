import React from 'react';

function AvailabilityList({ slots }) {
    if (!slots.length) return null;
    return (
        <div className="mt-3">
            <h5>Saved Slots:</h5>
            <ul className="list-group">
                {slots.map((slot, index) => (
                    <li key={index} className="list-group-item">
                        {slot.date} | {slot.start_time} to {slot.end_time} <br />
                        <strong>Link:</strong> <code>{window.location.origin}/book/{slot.booking_url}</code>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AvailabilityList;
