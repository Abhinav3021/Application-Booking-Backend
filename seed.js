// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Slot = require('./models/Slot');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Seed Admin User
        const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            await User.create({
                name: 'Admin User',
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                role: 'admin',
            });
            console.log('Admin user seeded successfully');
        } else {
            console.log('Admin user already exists');
        }

        // Generate and seed slots for the next 7 days
        await Slot.deleteMany({}); // Clear existing slots
        const slots = [];
        const now = new Date();
        now.setHours(0, 0, 0, 0); 
        
        for (let i = 0; i < 7; i++) {
            const day = new Date(now);
            day.setDate(now.getDate() + i);
            
            for (let hour = 9; hour < 17; hour++) {
                const startAt = new Date(day);
                startAt.setHours(hour, 0, 0, 0);
                const endAt = new Date(startAt);
                endAt.setMinutes(startAt.getMinutes() + 30);
                slots.push({ startAt, endAt });

                const startAt2 = new Date(day);
                startAt2.setHours(hour, 30, 0, 0);
                const endAt2 = new Date(startAt2);
                endAt2.setMinutes(startAt2.getMinutes() + 30);
                slots.push({ startAt: startAt2, endAt: endAt2 });
            }
        }
        await Slot.insertMany(slots);
        console.log('Slots seeded successfully');
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedData();