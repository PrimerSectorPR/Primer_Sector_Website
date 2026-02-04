import React, { useState, useMemo } from 'react';
import { usePodcastRss } from '../hooks/usePodcastRss';
import { useAudio } from '../context/AudioContext';
import { FaPlay, FaCalendar, FaClock, FaSpotify, FaApple, FaBarcode, FaQuoteRight, FaHome } from 'react-icons/fa';
import { usePageTransition } from '../context/PageTransitionContext';

export const EpisodesPage: React.FC = () => {
    const { episodes, seasons, loading } = usePodcastRss();
    const { playEpisode } = useAudio();
    const { triggerClose } = usePageTransition();
    const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
    const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);
    const [isFeaturedHovered, setIsFeaturedHovered] = useState(false);

    // Default to latest season if not selected
    const activeSeason = selectedSeason || seasons[0];

    const listRef = React.useRef<HTMLDivElement>(null);

    const scrollList = (direction: 'left' | 'right') => {
        if (listRef.current) {
            const scrollAmount = 300;
            listRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Filter episodes by season
    const seasonEpisodes = useMemo(() => {
        if (!activeSeason) return [];
        return episodes.filter(ep => ep.season === activeSeason);
    }, [episodes, activeSeason]);

    // Derived featured episode - independent of season filter unless clicked
    const featuredEpisode = useMemo(() => {
        if (selectedEpisodeId) {
            return episodes.find(ep => ep.id === selectedEpisodeId) || episodes[0];
        }
        return episodes[0];
    }, [episodes, selectedEpisodeId]);

    const listEpisodes = seasonEpisodes;

    if (loading) {
        return (
            <section className="h-screen w-full bg-[#F7F2E8] flex items-center justify-center font-black text-4xl uppercase animate-pulse">
                Cargando Edición...
            </section>
        );
    }

    return (
        <section className="h-screen w-full bg-[#F7F2E8] text-black relative overflow-hidden select-none bg-grain bg-vignette font-sans flex flex-col">

            {/* --- MASTHEAD STRIP --- */}
            <div className="absolute top-0 left-0 right-0 h-10 md:h-12 bg-black text-[#F7F2E8] flex items-center justify-between px-4 md:px-8 font-mono text-xs md:text-sm uppercase tracking-widest z-50 border-b-4 border-primary">
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-primary rounded-full inline-block animate-pulse"></span>
                    Primer Sector Magazine
                </span>
                <span className="hidden md:flex items-center gap-4">
                    <span className="opacity-50">EST. 2021</span>
                    <span>Vol. 25 &bull; ARCHIVES</span>
                </span>
                <button
                    onClick={() => triggerClose(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
                    className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer group"
                >
                    <FaHome className="text-lg group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Home</span>
                </button>
            </div>

            {/* --- PS LOGO STAMP --- */}
            <div className="absolute top-16 right-8 z-40 w-24 md:w-32 opacity-90 mix-blend-multiply transform rotate-3 pointer-events-none">
                <img src="/ps_logo_v2.png" alt="PS Logo" />
            </div>

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col pt-16 md:pt-4 lg:pt-16 px-4 md:px-12 pb-8 lg:pb-4 overflow-y-auto lg:overflow-hidden relative z-20 scrollbar-hide min-h-0">

                {/* Header & Season Filter */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-4 lg:mb-3 border-b-4 border-black pb-2 shrink-0 relative mt-4 md:mt-8 lg:mt-4">
                    <span className="absolute -top-6 left-0 font-mono text-[10px] uppercase tracking-[0.5em] text-gray-400">Issue No. {activeSeason?.replace(/\D/g, '') || '01'}</span>

                    <div>
                        <h5 className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-2 flex items-center gap-2">
                            <span className="w-4 h-[2px] bg-primary block"></span>
                            The Archive
                        </h5>
                        <h2 className="font-black text-6xl md:text-6xl lg:text-7xl xl:text-8xl uppercase leading-[0.8] transform origin-left tracking-tighter flex gap-4">
                            <span className="block text-misregistration animate-ink anim-delay-200" data-text="Los">Los</span>
                            <span className="block text-primary text-misregistration animate-ink anim-delay-500" data-text="Archivos">Archivos</span>
                        </h2>
                    </div>

                    {/* Season Tabs (Desktop only) */}
                    <div className="hidden lg:flex gap-1 mt-6 md:mt-0 items-end">
                        <span className="font-mono text-[10px] vertical-rl rotate-180 text-gray-400 mr-2 uppercase tracking-widest hidden md:block">Select Volume</span>
                        {seasons.map((season) => (
                            <button
                                key={season}
                                onClick={() => setSelectedSeason(season)}
                                className={`px-3 py-1 font-mono text-xs md:text-sm font-bold uppercase border-t-2 border-x-2 border-black transition-all rounded-t-lg ${activeSeason === season
                                    ? 'bg-accent text-black h-10 translate-y-[2px] z-10'
                                    : 'bg-gray-200 text-gray-500 h-8 hover:bg-white hover:h-9'
                                    }`}
                            >
                                {season}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 flex-1 lg:flex-grow border-b border-black min-h-0 lg:overflow-hidden">

                    {/* --- FEATURED EPISODE (TOP / LEFT) --- */}
                    <div className="col-span-1 lg:col-span-8 flex flex-col h-full lg:border-r-2 lg:border-black lg:pr-12 relative md:items-center lg:items-stretch">

                        <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 -z-10">
                            {[...Array(3)].map((_, i) => <div key={i} className="w-px h-full bg-black"></div>)}
                        </div>

                        {featuredEpisode ? (
                            <div className="relative group cursor-pointer flex-1 flex flex-col gap-6 items-start text-left pt-4">

                                {/* Badge */}
                                <div className="inline-block bg-black text-white px-3 py-1 font-mono text-xs uppercase tracking-widest mb-4 transform -rotate-1 shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
                                    Cover Story
                                </div>

                                <div className="w-full flex flex-col md:flex-row gap-8 items-center md:justify-center lg:justify-start lg:items-start">

                                    {/* MAG COVER PRESENTATION: Portrait, Masthead Overlay, Barcode */}
                                    <div
                                        className="relative w-full max-w-[280px] md:w-[220px] md:max-w-none 2xl:w-[380px] aspect-[3/4] shrink-0 z-10 group transition-all duration-300 shadow-[10px_10px_0_rgba(0,0,0,1)] border-4 border-white bg-black transform rotate-1 hover:rotate-0 hover:scale-[1.02] hover:shadow-[15px_15px_0_rgba(244,208,0,1)]"
                                        onMouseEnter={() => setIsFeaturedHovered(true)}
                                        onMouseLeave={() => setIsFeaturedHovered(false)}
                                    >
                                        {/* IMAGE */}
                                        <img src={featuredEpisode.image} alt={featuredEpisode.title} className="w-full h-full object-cover filter contrast-125 brightness-110" />

                                        {/* MAGAZINE OVERLAYS */}

                                        {/* 1. Mini Masthead */}
                                        <div className="absolute top-4 left-0 w-full text-center pointer-events-none">
                                            <h1 className="font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mix-blend-overlay opacity-80 leading-none">
                                                PRIMER<br />SECTOR
                                            </h1>
                                        </div>

                                        {/* 2. Cover Lines / Issue Details */}
                                        <div className="absolute top-4 right-4 text-white font-mono text-[10px] uppercase text-right leading-tight drop-shadow-md">
                                            Vol. {activeSeason?.replace(/\D/g, '')}<br />
                                            {new Date(featuredEpisode.pubDate).toLocaleDateString()}
                                        </div>

                                        {/* 3. Barcode on Cover */}
                                        <div className="absolute bottom-4 left-4 bg-white p-1 shadow-sm">
                                            <FaBarcode size={24} className="text-black" />
                                        </div>

                                        {/* 4. "EXCLUSIVE" Banner */}
                                        <div className="absolute bottom-12 -right-2 bg-accent text-black font-black text-xs px-3 py-1 uppercase tracking-widest transform -rotate-3 border border-black shadow-sm">
                                            Exclusive Interview
                                        </div>

                                        {/* 5. "NEW ISSUE" Sticker (Conditional) */}
                                        {episodes.length > 0 && featuredEpisode.id === episodes[0].id && (
                                            <div className="absolute -top-4 -right-4 z-50">
                                                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce-slow">
                                                    <span className="font-black text-white text-[10px] uppercase -rotate-12 text-center leading-none">
                                                        New<br />Issue
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Dark Gradient from bottom for readability if we placed text (but we won't place main title here, keeps it clean) */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

                                        {/* Play Button Overlay (Show on Hover) */}
                                        <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-all duration-300 ${isFeaturedHovered ? 'opacity-100 backdrop-blur-[2px] bg-black/30' : 'opacity-0'}`}>
                                            <button
                                                onClick={() => {
                                                    playEpisode({
                                                        title: featuredEpisode.title,
                                                        content: featuredEpisode.contentEncoded || featuredEpisode.description,
                                                        contentSnippet: featuredEpisode.description,
                                                        enclosure: {
                                                            url: featuredEpisode.audioUrl,
                                                            type: 'audio/mpeg'
                                                        },
                                                        pubDate: featuredEpisode.pubDate.toString(),
                                                        itunes: {
                                                            image: featuredEpisode.image,
                                                            duration: featuredEpisode.duration,
                                                            season: featuredEpisode.season,
                                                            episode: featuredEpisode.episodeNumber
                                                        }
                                                    });
                                                }}
                                                className="bg-white text-black px-6 py-3 font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-accent transition-colors shadow-lg border-2 border-black pointer-events-auto transform hover:scale-110"
                                            >
                                                <FaPlay size={12} /> Play
                                            </button>
                                        </div>
                                    </div>

                                    {/* Featured Details */}
                                    <div className="flex-1 space-y-4 pt-2">
                                        <h3 className="font-serif italic font-black text-5xl md:text-3xl lg:text-5xl xl:text-6xl uppercase leading-[0.85] text-balance tracking-tighter">
                                            {featuredEpisode.title}
                                        </h3>

                                        <div className="flex items-center gap-4 font-mono text-xs text-gray-500 border-y-2 border-black py-2 mt-4">
                                            <span className="bg-black text-white px-1">ISSUE No.{featuredEpisode.episodeNumber || '00'}</span>
                                            <span className="flex items-center gap-1 uppercase"><FaCalendar size={10} /> {new Date(featuredEpisode.pubDate).toLocaleDateString()}</span>
                                            <span className="flex items-center gap-1 uppercase"><FaClock size={10} /> {featuredEpisode.duration}</span>
                                        </div>

                                        <p className="font-serif text-xl md:text-sm lg:text-2xl text-gray-900 leading-tight md:leading-normal lg:leading-snug line-clamp-6 text-balance relative">
                                            <FaQuoteRight className="absolute -top-4 -left-4 text-gray-200 text-6xl -z-10 transform scale-x-[-1]" />
                                            <span className="font-black text-primary text-4xl float-left mr-2 leading-[0.8]">"</span>
                                            {featuredEpisode.description.replace(/(<([^>]+)>)/gi, "")}
                                        </p>

                                        {/* Social Links Row */}
                                        <div className="flex gap-3 mt-6">
                                            <a href="https://open.spotify.com/show/1QRPSsPIXAEdpSxBWJqE6K" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white hover:bg-[#1DB954] hover:text-white transition-all shadow-[4px_4px_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_black]"><FaSpotify size={20} /></a>
                                            <a href="https://podcasts.apple.com/us/podcast/primer-sector/id1566129090" target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white hover:bg-black hover:text-white transition-all shadow-[4px_4px_0_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_black]"><FaApple size={20} /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full border-4 border-dashed border-gray-300 m-8">
                                <span className="font-mono uppercase text-gray-400">No episodes found</span>
                            </div>
                        )}

                        {/* Barcode Footer in Col 1 */}
                        <div className="hidden md:flex absolute bottom-0 left-0 w-full justify-between items-end pb-2 opacity-50">
                            <div className="flex flex-col">
                                <span className="font-mono text-[9px] uppercase tracking-widest">Printed in Puerto Rico</span>
                                <FaBarcode size={48} />
                            </div>
                            <span className="font-mono text-[10px] uppercase">Primer Sector Archives &copy; 2026</span>
                        </div>
                    </div>

                    {/* --- RECENT LIST (BOTTOM BAR / RIGHT COL) --- */}
                    <div className="col-span-1 lg:col-span-4 flex flex-col h-auto lg:h-full lg:max-h-full border-t-4 border-black lg:border-t-0 lg:pl-8 pb-8 lg:pb-0 relative bg-[#F7F2E8] md:mt-4 lg:mt-0">

                        {/* HEADER ROW: Title + Filters */}
                        <div className="flex justify-between items-end border-b-2 border-black mb-4 mx-4 lg:mx-0 pt-4 lg:pt-0 pb-1 sticky top-0 bg-[#F7F2E8] z-20 lg:flex-shrink-0">
                            <h4 className="font-mono text-sm uppercase tracking-widest text-primary font-bold whitespace-nowrap">
                                Index / Recent
                            </h4>

                            <div className="flex items-center gap-4">
                                {/* Arrows (Visible on Mobile & Tablet) */}
                                <div className="flex lg:hidden gap-1">
                                    <button onClick={() => scrollList('left')} className="w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">&lt;</button>
                                    <button onClick={() => scrollList('right')} className="w-6 h-6 border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">&gt;</button>
                                </div>

                                {/* Year Filters (Visible on Mobile & Tablet, Hidden on Desktop) */}
                                <div className="flex lg:hidden gap-1">
                                    {seasons.map((season) => (
                                        <button
                                            key={`tab-${season}`}
                                            onClick={() => setSelectedSeason(season)}
                                            className={`px-2 py-[2px] font-mono text-[10px] font-bold uppercase border border-black transition-all ${activeSeason === season
                                                ? 'bg-accent text-black'
                                                : 'bg-white text-gray-500 hover:bg-gray-100'
                                                }`}
                                        >
                                            {season}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SCROLLABLE LIST WRAPPER */}
                        <div className="relative flex-1 md:flex-none lg:flex-1 lg:min-h-0 overflow-hidden">
                            <div ref={listRef} className="md:relative lg:absolute lg:inset-0 overflow-x-auto md:overflow-x-auto lg:overflow-x-hidden lg:overflow-y-scroll flex md:flex-row lg:flex-col gap-4 px-4 lg:px-0 scrollbar-hide snap-x snap-mandatory scroll-smooth md:pb-4 lg:pb-0">

                                {listEpisodes.map((ep) => {
                                    const isSelected = featuredEpisode?.id === ep.id;
                                    return (
                                        <div
                                            key={ep.id}
                                            onClick={() => setSelectedEpisodeId(ep.id)}
                                            className={`group cursor-pointer border border-gray-300 md:border-black lg:border-gray-300 lg:border-b transition-all flex flex-col lg:flex-row gap-3 md:min-w-[200px] md:max-w-[200px] lg:min-w-0 lg:w-full lg:max-w-none snap-start bg-white lg:bg-transparent lg:py-3 box-border
                                            ${isSelected ? 'border-accent shadow-md lg:bg-white lg:-mx-4 lg:px-4 lg:border-l-4 lg:border-l-accent lg:shadow-sm' : 'hover:border-black lg:hover:bg-white/40 lg:hover:pl-2'}
                                        `}
                                        >
                                            {/* THUMBNAIL AREA (Card Style on MD) */}
                                            <div className="relative aspect-video md:aspect-video lg:w-12 lg:h-12 lg:aspect-square shrink-0 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                                <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" />

                                                {/* Badge Over Image on MD */}
                                                <div className="absolute top-0 right-0 bg-black text-accent font-mono text-[10px] px-1 lg:hidden">
                                                    #{ep.episodeNumber || '??'}
                                                </div>
                                            </div>

                                            {/* TEXT CONTENT */}
                                            <div className="flex-1 flex flex-col justify-between p-2 lg:p-0 min-w-0">
                                                {/* Badge on Desktop (Left) */}
                                                <div className="hidden lg:flex w-8 h-8 shrink-0 bg-black text-accent items-center justify-center font-mono text-xs font-bold border border-accent shadow-sm mb-2">
                                                    {ep.episodeNumber || '??'}
                                                </div>

                                                <h5 className={`font-bold text-xs md:text-xs lg:text-sm uppercase leading-tight line-clamp-2 mb-1 transition-colors ${isSelected ? 'text-black' : 'text-gray-600 group-hover:text-black'}`}>
                                                    {ep.title}
                                                </h5>

                                                <div className="flex justify-between items-center text-[9px] font-mono text-gray-500 mt-auto">
                                                    <span>{ep.pubDate.toLocaleDateString()}</span>
                                                    <span className="bg-gray-200 px-1 rounded flex items-center gap-1">
                                                        <FaClock size={8} /> {ep.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Desktop Vertical Carousel Controls */}
                            <div className="hidden lg:flex flex-col gap-2 absolute right-0 top-1/3 -translate-y-1/2 z-30">
                                {/* Scroll Up */}
                                <button
                                    onClick={() => {
                                        if (listRef.current) {
                                            listRef.current.scrollBy({ top: -300, behavior: 'smooth' });
                                        }
                                    }}
                                    className="w-8 h-8 bg-black text-accent border-2 border-accent flex items-center justify-center hover:bg-accent hover:text-black transition-all shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] font-bold text-lg"
                                    aria-label="Scroll up"
                                >
                                    ↑
                                </button>

                                {/* Scroll Down */}
                                <button
                                    onClick={() => {
                                        if (listRef.current) {
                                            listRef.current.scrollBy({ top: 300, behavior: 'smooth' });
                                        }
                                    }}
                                    className="w-8 h-8 bg-black text-accent border-2 border-accent flex items-center justify-center hover:bg-accent hover:text-black transition-all shadow-[4px_4px_0_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] font-bold text-lg"
                                    aria-label="Scroll down"
                                >
                                    ↓
                                </button>
                            </div>
                        </div>

                        <div className="mt-4 md:mt-4 lg:mt-3 text-center opacity-30 lg:flex-shrink-0">
                            <div className="inline-block w-2 h-2 rounded-full bg-black mb-2"></div>
                            <p className="font-mono text-[9px] uppercase">End of Transmission</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
                <span className="font-black text-6xl opacity-10">03</span>
            </div>

        </section>
    );
};
