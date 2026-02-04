import React, { useEffect, useRef, useState } from 'react';
import { useAudio } from '../context/AudioContext';

export const AudioPlayer: React.FC = () => {
    const { currentEpisode, isPlaying, pauseEpisode, resumeEpisode } = useAudio();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Play error:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentEpisode]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            setProgress((current / total) * 100);
        }
    };

    if (!currentEpisode) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 shadow-lg z-50 animate-slide-up">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    {currentEpisode.itunes?.image && (
                        <img src={currentEpisode.itunes.image} alt={currentEpisode.title} className="w-12 h-12 rounded object-cover bg-gray-800" />
                    )}
                    <div className="min-w-0">
                        <h3 className="text-white font-medium truncate">{currentEpisode.title}</h3>
                        <p className="text-gray-400 text-sm truncate">Now Playing</p>
                    </div>
                </div>

                <div className="flex flex-col items-center flex-1 max-w-xl">
                    <div className="flex items-center gap-4 mb-2">
                        <button
                            onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)}
                            className="text-gray-400 hover:text-white"
                        >
                            -10s
                        </button>
                        <button
                            onClick={() => isPlaying ? pauseEpisode() : resumeEpisode()}
                            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            {isPlaying ? (
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                            ) : (
                                <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </button>
                        <button
                            onClick={() => audioRef.current && (audioRef.current.currentTime += 10)}
                            className="text-gray-400 hover:text-white"
                        >
                            +10s
                        </button>
                    </div>
                    <div className="w-full bg-gray-700 h-1 rounded-full cursor-pointer relative group">
                        <div
                            className="bg-white h-full rounded-full relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress || 0}
                            onChange={(e) => {
                                if (audioRef.current && audioRef.current.duration) {
                                    const newTime = (Number(e.target.value) / 100) * audioRef.current.duration;
                                    audioRef.current.currentTime = newTime;
                                    setProgress(Number(e.target.value));
                                }
                            }}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                <div className="flex-1 flex justify-end">
                    {/* Volume control could go here */}
                </div>
            </div>

            <audio
                ref={audioRef}
                src={currentEpisode.enclosure.url}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => pauseEpisode()}
            />
        </div>
    );
};
