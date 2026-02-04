import React, { useState } from 'react';
import type { Episode } from '../hooks/usePodcastRss';
import { usePlayer } from '../player/PlayerContext';

interface EpisodePeelCardProps {
    episode: Episode;
    shape?: 'rect-1' | 'rect-2' | 'rect-3' | 'rect-4' | 'rect-5';
    featured?: boolean;
}

export const EpisodePeelCard: React.FC<EpisodePeelCardProps> = ({ episode, shape = 'rect-1', featured = false }) => {
    const { playEpisode, currentEpisode, isPlaying } = usePlayer();
    const isActive = currentEpisode?.id === episode.id;
    const isPlayingThis = isActive && isPlaying;
    const [isPeeled, setIsPeeled] = useState(false);

    const handlePlayClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        playEpisode(episode);
    };

    const togglePeel = () => {
        setIsPeeled(!isPeeled);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: '2-digit' });
    };

    return (
        <div
            className={`relative group perspective-1000 ${featured ? 'md:col-span-2' : ''} cursor-pointer transition-all duration-300 ${isPeeled || isActive ? 'z-50' : 'z-auto'}`}
            onClick={togglePeel}
            onMouseEnter={() => setIsPeeled(true)}
            onMouseLeave={() => setIsPeeled(false)}
        >
            <div className={`peel-container w-full aspect-[4/3] ${featured ? 'aspect-[2/1]' : ''} ${isPeeled || isActive ? 'peel-active' : ''}`}>

                {/* BOTTOM LAYER (Controls) */}
                <div className={`peel-under bg-black border-4 border-gray-800 flex flex-col justify-center items-center p-6 text-[#F7F2E8] shadow-inner clip-${shape}`}>
                    <div className="absolute top-2 left-2 font-mono text-xs text-gray-500 rotate-90 origin-top-left">
                        RES: {episode.duration}
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-center mb-4 uppercase leading-none text-gray-700">
                        {featured ? 'EPISODIO DESTACADO' : 'EPISODIO'}
                    </h3>

                    <button
                        onClick={handlePlayClick}
                        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${isPlayingThis ? 'bg-accent border-[#F7F2E8] text-black' : 'bg-transparent border-accent text-accent'
                            }`}
                    >
                        {isPlayingThis ? (
                            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                        ) : (
                            <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        )}
                    </button>

                    <div className="mt-4 font-bold text-accent tracking-widest text-sm">
                        {isPlayingThis ? 'REPRODUCIENDO' : 'ESCUCHAR AHORA'}
                    </div>
                </div>

                {/* TOP LAYER (Image & Stickers) */}
                <div className={`peel-top absolute inset-0 bg-black shadow-xl overflow-hidden clip-${shape}`}>
                    {/* Image */}
                    <img
                        src={episode.image}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Gradient only for text readability, no grunge/white filters */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

                    {/* Stickers */}
                    <div className="absolute top-4 left-0">
                        <div className="bg-accent text-ink font-bold text-xs px-2 py-1 transform -rotate-3 shadow-md inline-block">
                            EPISODIO
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="bg-paper text-ink font-mono text-xs px-1 py-0.5 inline-block mb-1 transform rotate-1">
                                    {formatDate(episode.pubDate)}
                                </div>
                                <h3 className="text-white font-black text-lg md:text-2xl leading-none uppercase drop-shadow-md line-clamp-2 md:line-clamp-3">
                                    {episode.title}
                                </h3>
                            </div>

                            {/* Mono Telemetry Chip */}
                            <div className="hidden md:block bg-black/50 backdrop-blur border border-white/20 p-1">
                                <div className="grid grid-cols-3 gap-0.5 w-4 h-4">
                                    <div className="bg-accent/50 w-full h-full"></div>
                                    <div className="bg-primary/50 w-full h-full"></div>
                                    <div className="bg-white/50 w-full h-full"></div>
                                    <div className="bg-white/50 w-full h-full"></div>
                                    <div className="bg-accent/50 w-full h-full"></div>
                                    <div className="bg-primary/50 w-full h-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tape Sticker */}
                    <div className="absolute -top-3 right-8 w-8 h-12 bg-yellow-400/80 transform rotate-3 mix-blend-multiply opacity-80" style={{ clipPath: 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)' }}></div>

                </div>
            </div>
        </div>
    );
};
