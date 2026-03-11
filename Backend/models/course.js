const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    id: String,
    title: String,
    duration: String,
    url: String,
    thumbnail: String
}, { _id: false });

const courseSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    instructor: String,
    duration: String,
    level: String,
    thumbnail: String,
    description: String,
    lessons: [String],
    videos: [videoSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
