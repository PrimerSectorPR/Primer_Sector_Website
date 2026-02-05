import React from 'react';
import { Helmet } from 'react-helmet-async';
import { usePodcastRss } from '../hooks/usePodcastRss';
import { useErgast } from '../hooks/useErgast';
import { FaApple, FaSpotify, FaYoutube, FaLink, FaBolt, FaHome } from 'react-icons/fa';
import { usePageTransition } from '../context/PageTransitionContext';
import { useNavigation } from '../context/NavigationContext';

interface HeroSectionProps {
    index: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ index }) => {
    const { episodes, loading: rssLoading } = usePodcastRss();
    const { latestResult, nextRace, loading: f1Loading } = useErgast();
    const { triggerClose } = usePageTransition();
    const { navigateToPage, activePageIndex } = useNavigation();
    const isActive = activePageIndex === index;
    const latestEpisode = episodes[0];

    // Helper to cut title at first punctuation
    const formatTitle = (title: string) => {
        const match = title.match(/^[^!.?]+[!.?]/);
        return match ? match[0] : title;
    };

    // Helper to cut description at second punctuation
    const formatDescription = (desc: string) => {
        const clean = desc.replace(/<[^>]*>?/gm, ''); // Remove HTML
        // Match one or two sentences ending in punctuation
        const match = clean.match(/^(?:[^!.?]+[!.?]\s*){1,2}/);
        return match ? match[0].trim() : clean;
    };

    return (
        <section className="relative min-h-screen bg-[#F7F2E8] text-black overflow-hidden bg-grain bg-vignette font-sans selection:bg-accent selection:text-black">
            {isActive && (
                <Helmet>
                    <title>Primer Sector | Home</title>
                    <meta name="description" content="Bienvenido a Primer Sector, tu revista digital de Fórmula 1 en español." />
                </Helmet>
            )}

            {/* --- MASTHEAD STRIP --- */}
            <div className="absolute top-0 left-0 right-0 h-10 md:h-12 bg-black text-[#F7F2E8] flex items-center justify-between px-4 md:px-8 font-mono text-xs md:text-sm uppercase tracking-widest z-50 border-b-2 border-accent animate-ink anim-delay-100">
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-accent rounded-full inline-block animate-pulse"></span>
                    Primer Sector Magazine
                </span>
                <span className="hidden md:inline">Vol. 25 &bull; Edición Febrero 2026</span>
                <button
                    onClick={() => triggerClose(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
                    className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer group"
                >
                    <FaHome className="text-lg group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Home</span>
                </button>
            </div>

            <div className="min-h-screen w-full flex flex-col pt-16 md:pt-20 pb-8 px-4 md:px-12 relative z-10">
                {/* Grid Container */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

                    {/* --- LEFT TEASERS --- */}
                    <div className="hidden md:flex col-span-4 lg:col-span-3 flex-col justify-center space-y-12 lg:space-y-16 pb-16 z-30">

                        {/* Teaser 1 (Dynamic RSS) */}
                        <div className="animate-slide-right anim-delay-500">
                            <div
                                onClick={() => navigateToPage(2)}
                                className="transform -rotate-2 group cursor-pointer origin-left transition-transform hover:scale-105"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="bg-accent text-black px-2 py-1 font-black uppercase text-xs inline-block shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                        {rssLoading ? '...' : 'ÚLTIMO EPISODIO'}
                                    </div>
                                    {latestEpisode?.episodeNumber && (
                                        <div className="bg-black text-white px-2 py-1 font-mono text-xs font-bold inline-block shadow-[2px_2px_0_rgba(255,255,255,0.5)]">
                                            EP {latestEpisode.episodeNumber}
                                        </div>
                                    )}
                                </div>

                                <h3 className="font-black text-2xl md:text-3xl lg:text-4xl uppercase leading-[0.9] line-clamp-3">
                                    {latestEpisode ? formatTitle(latestEpisode.title) : 'Dentro del Paddock'}
                                </h3>
                                <p className="font-mono text-xs mt-2 border-l-4 border-black pl-2 leading-tight opacity-80 line-clamp-3">
                                    {latestEpisode ? formatDescription(latestEpisode.description) : 'Secretos que los equipos no quieren que sepas.'}
                                </p>
                            </div>
                        </div>

                        {/* Teaser 2 (Race Winner) */}
                        <div className="animate-slide-right anim-delay-700">
                            <div className="transform -rotate-2 group cursor-pointer origin-left transition-transform hover:scale-105">
                                <h3 className="font-black text-4xl uppercase leading-[0.9] text-black group-hover:text-black transition-colors">
                                    {f1Loading ? 'Cargando...' : (latestResult ? (
                                        <>
                                            <span style={{ color: `#${latestResult.teamColor} ` }}>{latestResult.driverName}</span> gana el {latestResult.raceName}
                                        </>
                                    ) : (
                                        <>
                                            Resultados <br />
                                            <span className="text-2xl">No Disponibles</span>
                                        </>
                                    ))}
                                </h3>
                                <div className="flex gap-2 mt-2">
                                    {latestResult && (
                                        <>
                                            <p className="text-sm font-bold italic uppercase bg-black text-white px-2 py-0.5 inline-block shadow-[2px_2px_0_rgba(255,255,0,1)]">
                                                RANK: P{latestResult.position}
                                            </p>
                                            <p className="text-sm font-bold italic uppercase bg-accent text-black px-2 py-0.5 inline-block shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                                DRIVER: {latestResult.points} PTS
                                            </p>
                                            <p
                                                className="text-sm font-bold italic uppercase text-white px-2 py-0.5 inline-block shadow-[2px_2px_0_rgba(0,0,0,1)] text-shadow-sm"
                                                style={{ backgroundColor: `#${latestResult.teamColor}` }}
                                            >
                                                {latestResult.teamName}: {latestResult.teamPoints} PTS
                                            </p>
                                        </>
                                    )}
                                    {!latestResult && (
                                        <p className="text-sm font-bold italic uppercase bg-accent text-black px-2 py-0.5 inline-block shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                            LIVE TIMING
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Teaser 3 (Next Race) */}
                        <div className="animate-slide-right anim-delay-1000">
                            <div className="transform -rotate-2 group cursor-pointer origin-left transition-transform hover:scale-105">
                                <div className="border-t-4 border-black w-12 mb-2 animate-draw"></div>
                                <h3 className="font-black text-3xl uppercase leading-[0.9] decoration-4">
                                    PROXIMA CARRERA <br />
                                    <span className="text-blue-600">
                                        {f1Loading ? '...' : (nextRace ? nextRace.raceName : 'TBA')}
                                    </span>
                                </h3>
                                <div className="flex items-center gap-2 mt-2 flex-wrap">
                                    <p className="text-sm font-bold italic uppercase bg-black text-white px-2 py-0.5 inline-block shadow-[2px_2px_0_rgba(255,255,0,0.5)]">
                                        {nextRace ? nextRace.date : 'Date TBA'}
                                    </p>
                                    <p className="text-sm font-bold italic uppercase bg-accent text-black px-2 py-0.5 inline-block shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                        {nextRace ? nextRace.time : 'Time TBA'}
                                    </p>
                                    {nextRace?.hasSprint && (
                                        <div className="bg-black text-white px-1 rounded-sm shadow-[2px_2px_0_rgba(255,255,0,1)]" title="Sprint Qualifying">
                                            <FaBolt />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- MAIN COVER TITLE --- */}
                    <div className="col-span-1 md:col-span-8 lg:col-span-9 flex flex-col items-center justify-center relative">

                        {/* Giant Title */}
                        <div className="relative z-20 mix-blend-multiply text-center">
                            <h1 className="text-[18vw] md:text-[8rem] lg:text-[10rem] xl:text-[13rem] leading-[0.8] font-black uppercase italic tracking-tighter transform -skew-x-12 cursor-default"
                                aria-label="Primer Sector">
                                <span className="block text-misregistration relative left-[-2vw] md:left-[-1rem] lg:left-[-2rem] animate-ink anim-delay-200" data-text="PRIMER">PRIMER</span>
                                <span className="block text-primary text-misregistration relative left-[2vw] md:left-[2rem] lg:left-[4rem] animate-ink anim-delay-500" data-text="SECTOR">SECTOR</span>
                            </h1>
                        </div>

                        {/* Tagline Sticker */}
                        <div className="bg-black text-[#F7F2E8] px-6 md:px-12 py-3 transform rotate-2 mt-8 md:mt-4 z-30 shadow-[8px_8px_0_var(--color-accent)] border-2 border-white animate-reveal anim-delay-1200 hover:rotate-0 transition-transform duration-300">
                            <p className="font-mono text-lg md:text-2xl uppercase tracking-[0.2em] font-bold">
                                Tu podcast de PR! 🇵🇷
                            </p>
                        </div>

                        {/* Mobile Only Teaser */}
                        <div
                            onClick={() => navigateToPage(2)}
                            className="md:hidden mt-24 text-center transform -rotate-1 animate-reveal anim-delay-1200 group cursor-pointer transition-transform hover:scale-105"
                        >
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="bg-accent text-black px-2 py-1 font-black uppercase text-xs inline-block shadow-[2px_2px_0_rgba(0,0,0,1)]">
                                    {rssLoading ? '...' : 'ÚLTIMO EPISODIO'}
                                </div>
                                {latestEpisode?.episodeNumber && (
                                    <div className="bg-black text-white px-2 py-1 font-mono text-xs font-bold inline-block shadow-[2px_2px_0_rgba(255,255,255,0.5)]">
                                        EP {latestEpisode.episodeNumber}
                                    </div>
                                )}
                            </div>
                            <h3 className="font-black text-4xl uppercase leading-[0.9] line-clamp-3">
                                {latestEpisode ? formatTitle(latestEpisode.title) : 'Temporada 2026'}
                            </h3>
                            <p className="font-mono text-xs mt-2 leading-tight opacity-80 line-clamp-3 px-4">
                                {latestEpisode ? formatDescription(latestEpisode.description) : 'Secretos que los equipos no quieren que sepas.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER / BARCODE --- */}
                <div className="flex justify-between items-end border-t-4 border-black pt-4 mt-8 md:mt-0 relative z-40 bg-transparent animate-reveal-flat anim-delay-1200">
                    {/* Barcode SVG */}
                    <div className="flex flex-col opacity-90 mix-blend-multiply">
                        <svg className="h-10 md:h-14 w-40 md:w-56" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <g fill="black">
                                <rect x="0" y="0" width="2" height="30" />
                                <rect x="3" y="0" width="1" height="30" />
                                <rect x="5" y="0" width="3" height="30" />
                                <rect x="9" y="0" width="1" height="30" />
                                <rect x="12" y="0" width="4" height="30" />
                                <rect x="17" y="0" width="1" height="30" />
                                <rect x="19" y="0" width="2" height="30" />
                                <rect x="23" y="0" width="1" height="30" />
                                <rect x="25" y="0" width="5" height="30" />
                                <rect x="32" y="0" width="1" height="30" />
                                <rect x="34" y="0" width="2" height="30" />
                                <rect x="37" y="0" width="3" height="30" />
                                <rect x="42" y="0" width="1" height="30" />
                                <rect x="44" y="0" width="4" height="30" />
                                <rect x="49" y="0" width="2" height="30" />
                                <rect x="52" y="0" width="1" height="30" />
                                <rect x="55" y="0" width="3" height="30" />
                                <rect x="59" y="0" width="1" height="30" />
                                <rect x="62" y="0" width="2" height="30" />
                                <rect x="65" y="0" width="4" height="30" />
                                <rect x="70" y="0" width="1" height="30" />
                                <rect x="73" y="0" width="2" height="30" />
                                <rect x="77" y="0" width="3" height="30" />
                                <rect x="82" y="0" width="2" height="30" />
                                <rect x="86" y="0" width="1" height="30" />
                                <rect x="88" y="0" width="4" height="30" />
                                <rect x="94" y="0" width="1" height="30" />
                                <rect x="96" y="0" width="2" height="30" />
                                <rect x="99" y="0" width="1" height="30" />
                            </g>
                        </svg>
                        <div className="flex justify-between items-center font-mono text-[9px] md:text-[10px] mt-1 tracking-[0.2em] w-full px-1">
                            <span>ISSN 1234-5678</span>
                            <span>022026</span>
                        </div>
                    </div>

                    {/* --- CENTER SOCIAL ICONS --- */}
                    <div className="flex items-center gap-6 md:gap-8 pb-2">
                        <a href="https://podcasts.apple.com/us/podcast/primer-sector/id1566129090" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary hover:scale-110 active:scale-90 transition-all duration-100 ease-out">
                            <FaApple className="text-2xl md:text-3xl" />
                        </a>
                        <a href="https://open.spotify.com/show/1QRPSsPIXAEdpSxBWJqE6K" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary hover:scale-110 active:scale-90 transition-all duration-100 ease-out">
                            <FaSpotify className="text-2xl md:text-3xl" />
                        </a>
                        <a href="https://www.youtube.com/channel/UCTgxJET2nw-G042C7p6Qyaw" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary hover:scale-110 active:scale-90 transition-all duration-100 ease-out">
                            <FaYoutube className="text-2xl md:text-3xl" />
                        </a>
                        <a href="https://linktr.ee/primersector" target="_blank" rel="noopener noreferrer" className="text-black hover:text-primary hover:scale-110 active:scale-90 transition-all duration-100 ease-out">
                            <FaLink className="text-2xl md:text-3xl" />
                        </a>
                    </div>

                    <div className="text-right">
                        <span className="font-black text-5xl md:text-7xl block leading-[0.8] tracking-tighter">
                            {nextRace && !isNaN(parseInt(nextRace.round))
                                ? String(Math.max(0, parseInt(nextRace.round) - 1)).padStart(2, '0')
                                : '00'}
                        </span>
                        <span className="font-mono text-[10px] md:text-xs uppercase font-bold tracking-widest bg-accent px-1">Cover Story</span>
                    </div>
                </div>

                {/* Decorative Side Elements */}
                <div className="fixed top-1/2 right-0 transform rotate-90 origin-right translate-x-8 md:translate-x-6 z-50">
                    <span className="text-[10px] font-mono tracking-[0.5em] text-gray-500 uppercase">
                        Official Podcast of the Racing World
                    </span>
                </div>
            </div>
        </section>
    );
};
