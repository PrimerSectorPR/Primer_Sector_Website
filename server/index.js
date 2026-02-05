const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3001;
const DEFAULT_RSS_URL = 'https://anchor.fm/s/59923dcc/podcast/rss';

// Simple in-memory cache
const cache = {
    data: null,
    timestamp: 0,
    CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
};

// Security: Set secure HTTP headers
app.use(helmet());

// Security: Rate limiting - max 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable X-RateLimit-* headers
});
app.use(limiter);

app.use(cors());

const ALLOWED_HOSTS = ['anchor.fm', 'podcasters.spotify.com', 'spotify.com'];

app.get('/api/rss', async (req, res) => {
    try {
        const urlToFetch = req.query.url || DEFAULT_RSS_URL;

        // Basic host validation
        try {
            const urlObj = new URL(urlToFetch);
            if (!ALLOWED_HOSTS.some(host => urlObj.hostname.endsWith(host))) {
                return res.status(403).send('Host not allowed');
            }
        } catch (e) {
            return res.status(400).send('Invalid URL');
        }

        // Check cache (only for the default URL to keep it simple, or map cache by URL)
        // Since we primarily use one feed, simple cache is fine. 
        // If query url varies, we should key by URL.
        const cacheKey = urlToFetch;
        // For now, let's just cache the response if it matches the default or just use a Map for simple caching.

        // Let's assume we want to cache properly.
        const now = Date.now();
        if (cache.data && cache.url === urlToFetch && (now - cache.timestamp < cache.CACHE_DURATION)) {
            console.log('Serving from cache');
            res.set('Content-Type', 'application/xml');
            return res.send(cache.data);
        }

        console.log('Fetching RSS from:', urlToFetch);
        const response = await axios.get(urlToFetch, {
            responseType: 'text', // Get raw text (XML)
            headers: {
                'User-Agent': 'PodcastProxy/1.0'
            }
        });

        // Update cache
        cache.data = response.data;
        cache.url = urlToFetch;
        cache.timestamp = now;

        res.set('Content-Type', 'application/xml');
        res.send(response.data);

    } catch (error) {
        console.error('Error fetching RSS:', error.message);
        res.status(500).send('Failed to fetch RSS feed');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
