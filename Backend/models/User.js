const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    courseId: String,
    completedLessons: [Number]
}, { _id: false });

const userSchema = new mongoose.Schema({
    // Use a generated string id so the frontend
    // only needs to send name, email, password.
    id: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    enrolledCourses: [String],
    courseProgress: [progressSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
