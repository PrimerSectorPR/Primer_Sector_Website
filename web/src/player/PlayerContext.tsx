import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import type { Episode } from '../hooks/usePodcastRss';

interface PlayerContextType {
    currentEpisode: Episode | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isVideoMode: boolean;
    playEpisode: (episode: Episode) => void;
    togglePlayPause: () => void;
    seek: (time: number) => void;
    setVolume: (vol: number) => void;
    toggleVideoMode: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolumeState] = useState(1);
    const [isVideoMode, setIsVideoMode] = useState(false);

    // Initialize audio element once
    useEffect(() => {
        const audio = new Audio();
        audioRef.current = audio;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
            audio.pause();
        };
    }, []);

    // Handle Volume Changes
    const setVolume = (vol: number) => {
        const newVol = Math.max(0, Math.min(1, vol));
        setVolumeState(newVol);
        if (audioRef.current) {
            audioRef.current.volume = newVol;
        }
    };

    const playEpisode = (episode: Episode) => {
        if (!audioRef.current) return;

        if (currentEpisode?.id === episode.id) {
            togglePlayPause();
            return;
        }

        // New episode
        audioRef.current.src = episode.audioUrl;
        audioRef.current.load();
        audioRef.current.play()
            .then(() => setIsPlaying(true))
            .catch(e => console.error("Playback failed:", e));

        setCurrentEpisode(episode);
    };

    const togglePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.error("Playback failed:", e));
        }
    };

    const seek = (time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    // When video mode creates a detached video player, we might pause the audio
    // But for this simple implementation, if we are in video mode, we can relying on the audio
    // OR we can pause audio and let the video modal handle playback.
    // Let's go with: VideoModal handles playback when active.
    const toggleVideoMode = () => {
        setIsVideoMode(prev => !prev);
    };

    return (
        <PlayerContext.Provider value={{
            currentEpisode,
            isPlaying,
            currentTime,
            duration,
            volume,
            isVideoMode,
            playEpisode,
            togglePlayPause,
            seek,
            setVolume,
            toggleVideoMode
        }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};
