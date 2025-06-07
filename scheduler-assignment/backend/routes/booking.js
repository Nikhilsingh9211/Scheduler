// backend/routes/booking.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get available slots for booking link
router.get('/:url', async (req, res) => {
    const { url } = req.params;
    try {
        const [[map]] = await pool.query(
            'SELECT * FROM map_booking_users WHERE url = ?',
            [url]
        );

        if (!map) return res.status(404).json({ error: 'Invalid booking link' });

        const [[booking]] = await pool.query(
            'SELECT * FROM booking WHERE id = ?',
            [map.booking_id]
        );

        const [bookedSlots] = await pool.query(
            'SELECT * FROM booking WHERE room_id = ? AND id != ?',
            [booking.room_id, booking.id]
        );

        res.json({ availability: booking, bookedSlots });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch slots' });
    }
});

// Book a slot
router.post('/', async (req, res) => {
    const { url, user_id, date, start_time, end_time } = req.body;
    try {
        console.log("Inside the request");
        const [[map]] = await pool.query('SELECT * FROM map_booking_users WHERE url = ?', [url]);
        if (!map) return res.status(404).json({ error: 'Invalid booking link' });

        const cleanStartTime = start_time.split('.')[0];
        const startDateTime = `${date} ${cleanStartTime}`;
        const cleanEndTime = end_time.split('.')[0];
        const endDateTime = `${date} ${cleanEndTime}`;

        // Check conflicts
        const [conflicts] = await pool.query(
            'SELECT * FROM booking WHERE room_id = ? AND NOT (end_time <= ? OR start_time >= ?)',
            [map.booking_id, startDateTime, endDateTime]
        );

        if (conflicts.length > 0) {
            return res.status(409).json({ error: 'Time slot already booked' });
        }

        const [booking] = await pool.query(
            'INSERT INTO booking (room_id, start_time, end_time) VALUES (?, ?, ?)',
            [map.room_id, startDateTime, endDateTime]
        );

        await pool.query(
            'INSERT INTO map_booking_users (booking_id, user_id, url) VALUES (?, ?, ?)',
            [booking.insertId, user_id, url]
        );

        res.status(201).json({ message: 'Booking confirmed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to book slot' });
    }
});

module.exports = router;
