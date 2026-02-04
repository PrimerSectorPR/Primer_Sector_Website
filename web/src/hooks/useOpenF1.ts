import { useState, useEffect } from 'react';

interface Session {
    session_key: number;
    location: string;
    country_name: string;
    circuit_short_name: string;
    date_start: string;
    year: number;
    session_name: string;
}

interface Driver {
    driver_number: number;
    full_name: string;
    name_acronym: string;
    team_name: string;
    headshot_url: string;
    team_colour: string;
}

export const useOpenF1 = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [randomDriver, setRandomDriver] = useState<Driver | null>(null);
    const [raceWinner, setRaceWinner] = useState<{ driver: Driver, session: Session, standing?: any, teamStanding?: any } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch latest sessions (Race only)
                // We fetch 2025 races.
                let sessionRes = await fetch('https://api.openf1.org/v1/sessions?year=2025&session_name=Race');
                let sessions: Session[] = await sessionRes.json();

                // Fallback to 2024 if NO sessions found
                if (sessions.length === 0) {
                    sessionRes = await fetch('https://api.openf1.org/v1/sessions?year=2024&session_name=Race');
                    sessions = await sessionRes.json();
                }

                if (sessions.length > 0) {
                    const latestSession = sessions[sessions.length - 1]; // Latest race
                    setSession(latestSession);

                    // 2. Fetch drivers for this session
                    const driversRes = await fetch(`https://api.openf1.org/v1/drivers?session_key=${latestSession.session_key}`);
                    const drivers: Driver[] = await driversRes.json();

                    if (drivers.length > 0) {
                        // Pick a random driver (Teaser 3)
                        const random = drivers[Math.floor(Math.random() * drivers.length)];
                        setRandomDriver(random);

                        // 3. Find the Winner (Position 1)
                        console.log('Fetching position for session:', latestSession.session_key);
                        const posRes = await fetch(`https://api.openf1.org/v1/position?session_key=${latestSession.session_key}&position=1`);
                        const positions = await posRes.json();
                        console.log('Positions found:', positions.length);

                        if (positions.length > 0) {
                            // The last entry usually represents the end of the race
                            const lastPos = positions[positions.length - 1];
                            console.log('Winner Driver Number:', lastPos.driver_number);
                            const winnerDriver = drivers.find(d => d.driver_number == lastPos.driver_number);
                            console.log('Winner Driver Object:', winnerDriver);

                            if (winnerDriver) {
                                let standing = null;
                                let teamStanding = null;

                                try {
                                    // 4. Fetch Driver Standing
                                    const standRes = await fetch(`https://api.openf1.org/v1/championship_drivers?driver_number=${winnerDriver.driver_number}&session_key=${latestSession.session_key}`);
                                    const standings = await standRes.json();
                                    standing = standings.length > 0 ? standings[standings.length - 1] : null;
                                } catch (e) { console.warn('Driver standing fetch failed', e); }

                                try {
                                    // 5. Fetch Team Standing
                                    const teamRes = await fetch(`https://api.openf1.org/v1/championship_teams?session_key=${latestSession.session_key}&team_name=${encodeURIComponent(winnerDriver.team_name)}`);
                                    const teamStandings = await teamRes.json();
                                    teamStanding = teamStandings.length > 0 ? teamStandings[teamStandings.length - 1] : null;
                                } catch (e) { console.warn('Team standing fetch failed', e); }

                                setRaceWinner({
                                    driver: winnerDriver,
                                    session: latestSession,
                                    standing: standing,
                                    teamStanding: teamStanding
                                });
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching OpenF1 data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { session, randomDriver, raceWinner, loading };
};
