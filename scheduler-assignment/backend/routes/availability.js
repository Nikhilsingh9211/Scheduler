// backend/routes/availability.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { v4: uuidv4 } = require('uuid');

// Add availability
router.post('/', async (req, res) => {
    const { user_id, date, start_time, end_time } = req.body;
    try {
        const [room] = await pool.query('INSERT INTO room (name, user_limit) VALUES (?, ?)', [`Room-${Date.now()}`, 1]);
        const room_id = room.insertId;

        const startDateTime = `${date} ${start_time}`;
        const endDateTime = `${date} ${end_time}`;

        const [booking] = await pool.query(
            'INSERT INTO booking (room_id, start_time, end_time) VALUES (?, ?, ?)',
            [room_id, startDateTime, endDateTime]
        );
        const booking_id = booking.insertId;

        const booking_url = uuidv4();
        await pool.query(
            'INSERT INTO map_booking_users (booking_id, user_id, url) VALUES (?, ?, ?)',
            [booking_id, user_id, booking_url]
        );

        res.status(201).json({ date, start_time, end_time, booking_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add availability' });
    }
});

module.exports = router;
