const axios = require('axios');

async function testRSS() {
    try {
        console.log("Testing http://localhost:3000/api/rss...");
        const response = await axios.get('http://localhost:3000/api/rss');

        if (response.status === 200) {
            console.log("SUCCESS: RSS Proxy verified.");
            const data = response.data;
            if (data.items && data.items.length > 0) {
                console.log(`Found ${data.items.length} episodes.`);
                console.log("First episode title:", data.items[0].title);
            } else {
                console.log("WARNING: No episodes found in feed.");
            }
        } else {
            console.log("FAILED: Status code", response.status);
        }
    } catch (error) {
        console.error("FAILED to connect:", error.message);
    }
}

testRSS();
