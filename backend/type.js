const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    repositories: [
        {
            repoId: Number,
            name: String,
            id: Number,
            url: String,
            description: String,
            stars: Number,
            forks: Number,
            language: String,
            labels: [String],
            avatar: String
        }
    ]
});

const User = mongoose.model('User', userSchema);
module.exports = { User: User };