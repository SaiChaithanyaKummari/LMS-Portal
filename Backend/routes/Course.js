const express = require('express');
const router = express.Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findOne({ id: req.params.id });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new course
router.post('/', async (req, res) => {
    try {
        const count = await Course.countDocuments();
        const newId = String(count + 1);
        const course = new Course({ ...req.body, id: newId });
        const saved = await course.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a course
router.put('/:id', async (req, res) => {
    try {
        const updated = await Course.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Course not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a course
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Course.findOneAndDelete({ id: req.params.id });
        if (!deleted) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
