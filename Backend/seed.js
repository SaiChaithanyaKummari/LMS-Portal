const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const Course = require('./Models/Course');
const User = require('./Models/User');
const connectDB = require('./config/db');

const dbPath = path.join(__dirname, '../courses-management/db.json');

const seedDB = async () => {
    try {
        await connectDB();
        
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

        await Course.deleteMany();
        await User.deleteMany();

        await Course.insertMany(data.courses);
        await User.insertMany(data.users);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (err) {
        console.error('Error importing data:', err);
        process.exit(1);
    }
};

seedDB();
