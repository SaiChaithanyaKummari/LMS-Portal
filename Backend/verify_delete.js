const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const verifyDelete = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        // 1. Find a user that is NOT an admin to delete
        const userToDelete = await User.findOne({ role: { $ne: 'admin' } });
        if (!userToDelete) {
            console.log('No eligible user found to delete.');
            process.exit();
        }

        console.log(`Attempting to delete user: ${userToDelete.name} (${userToDelete.email})`);
        console.log(`Using _id for deletion: ${userToDelete._id}`);

        // Simulate the logic in the router
        const idParam = userToDelete._id.toString();
        const query = mongoose.Types.ObjectId.isValid(idParam)
            ? { $or: [{ id: idParam }, { _id: idParam }] }
            : { id: idParam };

        console.log('Query constructed:', JSON.stringify(query));

        const deletedUser = await User.findOneAndDelete(query);
        if (deletedUser) {
            console.log('User deleted successfully!');
        } else {
            console.error('Failed to delete user.');
        }

        process.exit();
    } catch (err) {
        console.error('Error during verification:', err);
        process.exit(1);
    }
};

verifyDelete();
