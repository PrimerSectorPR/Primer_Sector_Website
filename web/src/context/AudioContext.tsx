import React, { createContext, useContext, useState, useRef } from 'react';

export interface Episode {
    title: string;
    content: string; // HTML description
    contentSnippet: string;
    enclosure: {
        url: string;
        type: string;
    };
    pubDate: string;
    itunes?: {
        image?: string;
        duration?: string;
        season?: string;
        episode?: string;
    };
}

interface AudioContextType {
    currentEpisode: Episode | null;
    isPlaying: boolean;
    playEpisode: (episode: Episode) => void;
    pauseEpisode: () => void;
    resumeEpisode: () => void;
    closePlayer: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playEpisode = (episode: Episode) => {
        if (currentEpisode?.enclosure.url === episode.enclosure.url) {
            setIsPlaying(true);
        } else {
            setCurrentEpisode(episode);
            setIsPlaying(true);
        }
    };

    const pauseEpisode = () => {
        setIsPlaying(false);
    };

    const resumeEpisode = () => {
        setIsPlaying(true);
    };

    const closePlayer = () => {
        setIsPlaying(false);
        setCurrentEpisode(null);
    };

    return (
        <AudioContext.Provider value={{ currentEpisode, isPlaying, playEpisode, pauseEpisode, resumeEpisode, closePlayer }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
