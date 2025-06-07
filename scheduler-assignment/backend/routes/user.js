const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create user
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

module.exports = router;