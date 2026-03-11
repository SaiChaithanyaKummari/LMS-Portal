const express = require('express');
const router = express.Router();
const Enrollment = require('../Models/Enrollment');

router.post('/', async (req, res) => {
    try {
        const newEnrollment = new Enrollment(req.body);
        const savedEnrollment = await newEnrollment.save();
        res.status(201).json(savedEnrollment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
