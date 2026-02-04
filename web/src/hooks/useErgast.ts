
import { useState, useEffect } from 'react';

// Hardcoded Team Colors (2025/2026 Anticipated)
const TEAM_COLORS: Record<string, string> = {
    "red_bull": "3671C6",
    "mercedes": "27F4D2",
    "ferrari": "E80020",
    "mclaren": "FF8000",
    "aston_martin": "229971",
    "alpine": "0093CC",
    "williams": "64C4FF",
    "rb": "6692FF", // Visa Cash App RB
    "sauber": "52E252", // Kick Sauber
    "haas": "B6BABD",
    "audi": "E80020" // Future proofing
};



export const useErgast = () => {
    const [latestResult, setLatestResult] = useState<{
        driverName: string;
        teamName: string;
        teamColor: string;
        circuitName: string;
        countryName: string;
        raceName: string;
        position: string;
        points: string;
        teamPoints: string;
    } | null>(null);
    const [nextRace, setNextRace] = useState<{
        raceName: string;
        circuitName: string;
        date: string;
        time: string;
        hasSprint: boolean;
        round: string;
    } | null>(null);
    const [randomDriver, setRandomDriver] = useState<{ name_acronym: string, driver_number: string, team_name: string } | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Latest Race Result (2025)
                const res = await fetch('https://api.jolpi.ca/ergast/f1/2025/last/results.json');
                const json = await res.json();
                const race = json.MRData.RaceTable.Races[0];

                if (race) {
                    const winner = race.Results[0];
                    const constructorId = winner.Constructor.constructorId;

                    // 2. Fetch Driver Standings (2025) to get current season stats
                    const driverStandingsRes = await fetch('https://api.jolpi.ca/ergast/f1/2025/driverStandings.json');
                    const driverStandingsJson = await driverStandingsRes.json();
                    const driverStanding = driverStandingsJson.MRData.StandingsTable.StandingsLists[0].DriverStandings.find((s: any) => s.Driver.driverId === winner.Driver.driverId);

                    // 3. Fetch Constructor Standings (2025)
                    const constStandingsRes = await fetch('https://api.jolpi.ca/ergast/f1/2025/constructorStandings.json');
                    const constStandingsJson = await constStandingsRes.json();
                    const teamStanding = constStandingsJson.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.find((s: any) => s.Constructor.constructorId === constructorId);

                    // 4. Set Random Driver (from Standings)
                    const allDrivers = driverStandingsJson.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                    if (allDrivers.length > 0) {
                        const random = allDrivers[Math.floor(Math.random() * allDrivers.length)];
                        setRandomDriver({
                            name_acronym: random.Driver.code,
                            driver_number: random.Driver.permanentNumber,
                            team_name: random.Constructors[0].name
                        });
                    }

                    setLatestResult({
                        driverName: `${winner.Driver.givenName} ${winner.Driver.familyName.toUpperCase()}`,
                        teamName: winner.Constructor.name,
                        teamColor: TEAM_COLORS[constructorId] || '000000',
                        circuitName: race.Circuit.circuitName,
                        countryName: race.Circuit.Location.country,
                        raceName: race.raceName.replace('Grand Prix', 'GP'),
                        position: driverStanding ? driverStanding.position : '1',
                        points: driverStanding ? driverStanding.points : '25',
                        teamPoints: teamStanding ? teamStanding.points : '0'
                    });

                    // 5. Fetch Full 2026 Schedule to find Next Race by Date
                    const scheduleRes = await fetch('https://api.jolpi.ca/ergast/f1/2026.json');
                    const scheduleJson = await scheduleRes.json();
                    const races = scheduleJson.MRData.RaceTable.Races;
                    const now = new Date();

                    const upcomingRace = races.find((r: any) => {
                        const raceDate = new Date(`${r.date}T${r.time}`);
                        return raceDate > now;
                    });

                    if (upcomingRace) {
                        // Date Range Logic (Adjusted for Puerto Rico)
                        const fpDate = upcomingRace.FirstPractice ? upcomingRace.FirstPractice.date : upcomingRace.date;
                        const fpTime = upcomingRace.FirstPractice ? upcomingRace.FirstPractice.time : '00:00:00Z';
                        const raceDateStr = upcomingRace.date;
                        const raceTimeStr = upcomingRace.time || '00:00:00Z';

                        // Create Date objects from UTC strings
                        const startObj = new Date(`${fpDate}T${fpTime}`);
                        const endObj = new Date(`${raceDateStr}T${raceTimeStr}`);

                        // Format to PR Timezone parts
                        const prStartMonth = startObj.toLocaleDateString('en-US', { timeZone: 'America/Puerto_Rico', month: 'short' }).toUpperCase();
                        const prStartDay = startObj.toLocaleDateString('en-US', { timeZone: 'America/Puerto_Rico', day: '2-digit' });

                        const prEndMonth = endObj.toLocaleDateString('en-US', { timeZone: 'America/Puerto_Rico', month: 'short' }).toUpperCase();
                        const prEndDay = endObj.toLocaleDateString('en-US', { timeZone: 'America/Puerto_Rico', day: '2-digit' });

                        // Handle date range format
                        let dateRange = '';
                        if (prStartMonth === prEndMonth) {
                            dateRange = `${prStartMonth} ${prStartDay}-${prEndDay}, ${endObj.getFullYear()}`;
                        } else {
                            dateRange = `${prStartMonth} ${prStartDay} - ${prEndMonth} ${prEndDay}, ${endObj.getFullYear()}`;
                        }

                        // Time Logic (GMT & PR)
                        let timeGMT = upcomingRace.time ? upcomingRace.time.slice(0, 5) : 'TBA';
                        let timePR = 'TBA';

                        if (upcomingRace.time) {
                            const raceDateUTC = new Date(`${upcomingRace.date}T${upcomingRace.time}`);
                            timePR = raceDateUTC.toLocaleTimeString('en-US', {
                                timeZone: 'America/Puerto_Rico',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                            });
                        }

                        setNextRace({
                            raceName: upcomingRace.raceName.replace('Grand Prix', 'GP'),
                            circuitName: upcomingRace.Circuit.circuitName,
                            date: dateRange,
                            time: `${timePR} PR | ${timeGMT} GMT`,
                            hasSprint: !!upcomingRace.Sprint,
                            round: upcomingRace.round
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching Ergast data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { latestResult, randomDriver, nextRace, loading };
};
