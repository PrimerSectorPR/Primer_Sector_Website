
const https = require('https');

// Test 1: Latest Race Results
const urlResults = 'https://ergast.com/api/f1/current/last/results.json';
// Test 2: Driver Standings
const urlDrivers = 'https://ergast.com/api/f1/current/driverStandings.json?limit=1';

function fetchData(url, label) {
    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                console.log(`=== ${label} ===`);
                console.log(JSON.stringify(json, null, 2).substring(0, 500) + '...'); // Truncate
            } catch (e) {
                console.log(`Error parsing ${label}:`, e);
            }
        });
    }).on('error', (err) => {
        console.error(`Error fetching ${label}:`, err.message);
    });
}

fetchData(urlResults, 'Latest Results');
fetchData(urlDrivers, 'Driver Standings');
