const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./db'); 

const router = express.Router();

// Middleware to handle JSON request bodies
router.use(express.json());

// Endpoint to fetch all repositories for a user
router.get('/api/users/:username/repositories', async (req, res) => {
    const { username } = req.params;
    try {
        // Check if the user exists
        let user = await User.findOne({ username });

        // If the user does not exist, create a new user
        if (!user) {
            user = new User({ username, repositories: [] });
            await user.save();
        }

        // Return the user's repositories
        res.status(200).json(user.repositories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

//delete one starred repo from user
router.put('/api/users/:username/repositories/:id', async (req, res) => {
    const { username, id } = req.params;
    try {
        let user = await User.findOne({ username });

        console.log(id)

        if (!user) {
            res.status(409).json({ msg: "User not found!" })
        }
        
        const updatedUserRepos = user.repositories.filter((i) => i.repoId !== parseInt(id))

        await User.findOneAndUpdate({ username }, { repositories: updatedUserRepos})

        res.status(200).json(updatedUserRepos);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Endpoint to add a new repository for a user
router.post('/api/users/:username/repositories', async (req, res) => {
    const { username } = req.params;
    const { repoId, name, url, description, stars, forks, language, labels, avatar } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ username });

        // If the user does not exist, create a new user
        if (!user) {
            user = new User({ username, repositories: [] });
            await user.save();
        }

        // Create a new repository object
        console.log("repoId", repoId)
        const newRepository = {
            repoId,
            name,
            url,
            description,
            stars,
            forks,
            language,
            labels,
            avatar
        };

        // Add the new repository to the user's repository list
        console.log("newRepository", newRepository)
        user.repositories.push(newRepository);
        await user.save();

        res.status(201).json(newRepository);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Export the router to use in your main server file
module.exports = router;
