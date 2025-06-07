import React, { useState } from 'react';
import AvailabilityForm from '../components/AvailabilityForm';
import AvailabilityList from '../components/AvailabilityList';

function HomePage() {
    const [slots, setSlots] = useState([]);

    return (
        <div className="container mt-5">
            <h3>Scheduler Dashboard</h3>
            <AvailabilityForm onSave={(data) => setSlots([...slots, data])} />
            <AvailabilityList slots={slots} />
        </div>
    );
}

export default HomePage;
