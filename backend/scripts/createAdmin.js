
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config(); // Load environment variables from .env file (make sure .env is in the root backend folder)

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        const userId = "admin"; // Replace with your desired username
        const password = (process.env.password); // Replace with your desired password

        // Check if user already exists
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            console.log("Admin user already exists");
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            userId,
            password: hashedPassword,
        });

        await newUser.save();
        console.log("Admin user created successfully");
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
