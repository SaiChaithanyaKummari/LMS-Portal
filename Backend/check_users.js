const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        const users = await User.find({}, 'name email id _id');
        console.log('Users in DB:');
        console.log(JSON.stringify(users, null, 2));
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

checkUsers();
