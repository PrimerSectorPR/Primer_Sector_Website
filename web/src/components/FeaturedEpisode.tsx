import React from 'react';
import { useAudio, type Episode } from '../context/AudioContext';

interface FeaturedEpisodeProps {
    episode: Episode;
}

export const FeaturedEpisode: React.FC<FeaturedEpisodeProps> = ({ episode }) => {
    const { playEpisode, currentEpisode, isPlaying, pauseEpisode } = useAudio();
    const isCurrent = currentEpisode?.enclosure.url === episode.enclosure.url;
    const isActive = isCurrent && isPlaying;

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 shadow-2xl mb-12 border border-blue-700/50">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>

            <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center">
                {episode.itunes?.image && (
                    <img
                        src={episode.itunes.image}
                        alt={episode.title}
                        className="w-full md:w-64 h-64 object-cover rounded-xl shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-500"
                    />
                )}

                <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-200 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                        Latest Episode
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        {episode.title}
                    </h1>
                    <p className="text-blue-100 text-lg mb-8 line-clamp-3 max-w-2xl">
                        {episode.contentSnippet}
                    </p>

                    <button
                        onClick={() => isActive ? pauseEpisode() : playEpisode(episode)}
                        className="group flex items-center gap-3 bg-white text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20"
                    >
                        <div className={`w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center transition-transform group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`}>
                            {isActive ? (
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                            ) : (
                                <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </div>
                        <span className="text-lg">{isActive ? 'Pause Episode' : 'Play Featured Episode'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
