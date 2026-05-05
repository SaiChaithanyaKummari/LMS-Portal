const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const mongoose = require('mongoose');

        // Try deleting by custom 'id' first, or by '_id' if it's a valid ObjectId
        const query = mongoose.Types.ObjectId.isValid(id)
            ? { $or: [{ id: id }, { _id: id }] }
            : { id: id };

        const deletedUser = await User.findOneAndDelete(query);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
