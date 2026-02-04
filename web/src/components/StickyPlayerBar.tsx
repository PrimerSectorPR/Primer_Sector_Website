import React, { useState, useRef, useEffect } from 'react';
import { useAudio } from '../context/AudioContext';
import { FaPlay, FaPause, FaTimes, FaYoutube } from 'react-icons/fa';

// --- Video Modal Component ---
const VideoModal: React.FC<{ videoId: string; startTime: number; onClose: () => void }> = ({ videoId, startTime, onClose }) => {
    return (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 animate-fade-in backdrop-blur-md">
            <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl border-2 border-white/20">
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white hover:text-accent transition-colors flex items-center gap-2 font-mono uppercase tracking-widest text-sm"
                >
                    Close Video <FaTimes />
                </button>
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}?start=${Math.floor(startTime)}&autoplay=1&modestbranding=1&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export const StickyPlayerBar: React.FC = () => {
    const { currentEpisode, isPlaying, pauseEpisode, resumeEpisode, closePlayer } = useAudio();
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [videoDetails, setVideoDetails] = useState<{ id: string } | null>(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    // Reset state when episode changes
    useEffect(() => {
        setProgress(0);
        setCurrentTime(0);
        setDuration(0);
        setIsVideoOpen(false);

        // Parse YouTube Link from content (Robust Regex)
        if (currentEpisode?.content) {
            // Looks for youtube.com or youtu.be, and extracts the 11 char ID.
            // Matches: YT: https://youtu.be/ID, <a href="youtu.be/ID">, etc.
            const ytMatch = currentEpisode.content.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);

            if (ytMatch && ytMatch[1]) {
                setVideoDetails({ id: ytMatch[1] });
            } else {
                setVideoDetails(null);
            }
        }
    }, [currentEpisode?.title, currentEpisode?.content]);

    // Handle Play/Pause side effects securely
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Playback error:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    // Sync progress
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            setCurrentTime(current);
            setDuration(total);
            if (total > 0) {
                setProgress((current / total) * 100);
            }
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            const bar = e.currentTarget;
            const rect = bar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const pct = x / rect.width;
            audioRef.current.currentTime = pct * audioRef.current.duration;
        }
    };

    const formatTime = (time: number) => {
        if (!time || isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleOpenVideo = () => {
        if (videoDetails) {
            pauseEpisode(); // Pause audio when video starts
            setIsVideoOpen(true);
        }
    };

    const handleCloseVideo = () => {
        setIsVideoOpen(false);
    };

    if (!currentEpisode) return null;

    const togglePlayPause = () => {
        if (isPlaying) {
            pauseEpisode();
        } else {
            resumeEpisode();
        }
    };

    return (
        <>
            {isVideoOpen && videoDetails && (
                <VideoModal
                    videoId={videoDetails.id}
                    startTime={currentTime}
                    onClose={handleCloseVideo}
                />
            )}

            <div className="fixed bottom-0 left-0 right-0 h-20 md:h-20 bg-ink border-t-[6px] border-accent shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 flex items-center px-4 md:px-8 gap-6 animate-slide-up text-paper font-mono transition-all duration-300 overflow-hidden">

                {/* Background Texture */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>

                {/* Decorative Barcode Strip (Left) */}
                <div className="hidden md:flex flex-col gap-0.5 opacity-30 select-none pointer-events-none mr-2">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className={`h-[2px] bg-white ${Math.random() > 0.5 ? 'w-8' : 'w-4'}`}></div>
                    ))}
                    <span className="text-[8px] tracking-widest mt-1">NO.25</span>
                </div>

                {/* Artwork */}
                <div className={`relative w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full border-2 border-white/20 overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    <img src={currentEpisode.itunes?.image || currentEpisode.enclosure.url} alt="cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 m-auto w-3 h-3 bg-ink rounded-full border border-gray-700"></div>
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0 flex flex-col justify-center relative z-10">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="bg-accent text-black text-[10px] md:text-xs px-2 py-0.5 font-black uppercase shrink-0 -rotate-2 border border-black shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
                            Now Playing
                        </span>
                        <h3 className="text-xs md:text-sm font-bold truncate text-white uppercase tracking-wide">{currentEpisode.title}</h3>
                    </div>

                    <div className="flex items-center gap-3 w-full mt-1">
                        <span className="text-[10px] text-accent w-10 text-right font-mono tracking-tighter">{formatTime(currentTime)}</span>

                        <div
                            className="flex-1 h-3 bg-gray-800 border border-gray-600 relative cursor-pointer group"
                            onClick={handleSeek}
                        >
                            <div
                                className="h-full bg-accent relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_white]"></div>
                            </div>
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>

                        <span className="text-[10px] text-gray-500 w-10 font-mono tracking-tighter">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="flex items-center gap-4 md:gap-8 shrink-0 z-10 border-l border-gray-800 pl-4 md:pl-8 h-full">

                    {/* VIDEO BUTTON with Sync Logic */}
                    {videoDetails && (
                        <button
                            onClick={handleOpenVideo}
                            title="Watch Video at Current Time"
                            className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-center group"
                        >
                            <div className="flex flex-col items-center">
                                <span className="block w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_red] mb-1 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                <div className="flex items-center gap-1"><FaYoutube size={14} /> VIDEO</div>
                            </div>
                        </button>
                    )}

                    <button
                        onClick={togglePlayPause}
                        className="w-10 h-10 md:w-12 md:h-12 bg-white text-black border-2 border-gray-300 flex items-center justify-center hover:bg-accent hover:border-accent hover:scale-105 transition-all shadow-[4px_4px_0_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_rgba(0,0,0,1)]"
                    >
                        {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="pl-0.5" />}
                    </button>

                    <button
                        onClick={closePlayer}
                        className="text-gray-500 hover:text-red-500 transition-colors relative group p-2"
                    >
                        <FaTimes size={16} />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-1 py-0.5 uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-700">
                            Close Deck
                        </span>
                    </button>
                </div>

                <audio
                    ref={audioRef}
                    src={currentEpisode.enclosure.url}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleTimeUpdate}
                    onEnded={() => pauseEpisode()}
                />
            </div>
        </>
    );
};
