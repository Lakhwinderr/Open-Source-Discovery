const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 5000;
require('dotenv').config();
const {User }= require('./db.js');
const{createRepo, createUser} = require('./type.js')
const cors = require('cors')

const userRoutes =require('./user.js')
// Middleware
app.use(express.json());
app.use(cors());
// Simple GET Route for testing
app.get('/', (req, res) => {
    res.send('Lakhwinder is awesome hacker');
});

// Route to fetch repositories based on search parameters
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
app.get('/api/search', async (req, res) => {
    const { q, language, sort, label, minStars, minForks, page = 1  } = req.query; // Get search params

    let searchQuery = `${q}&language:${language}`; // Base search query

    // Add optional filters to the search query
    if (label) {
        searchQuery += `&label:${label}`; // Filter by label (e.g., good-first-issue)
    }
    if (minStars) {
        searchQuery += `&stars:>=${minStars}`; // Filter by minimum stars
    }
    if (minForks) {
        searchQuery += `&forks:>=${minForks}`; // Filter by minimum forks
    }

    const githubApiUrl = `https://api.github.com/search/repositories?q=${searchQuery}&sort=${sort || 'stars'}&order=desc&per_page=12&page=${page}`;
    try {
        const response = await axios.get(githubApiUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                // Add your GitHub token here for higher rate limit if needed
                // 'Authorization': `token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`
                'Authorization': `token ${GITHUB_TOKEN}`,
            }
        });

        // Send the list of repositories to the frontend
        res.json(response.data.items);
    } catch (error) {
        console.error('Error fetching repositories from GitHub:', error);
        res.status(500).json({ error: 'Failed to fetch repositories' });
    }
});

// Use the user routes
app.use(userRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
