import React, { useState, useMemo } from 'react';
import { usePodcastRss } from '../hooks/usePodcastRss';
import { EpisodePeelCard } from '../components/EpisodePeelCard';

export const EpisodesGrid: React.FC = () => {
    const { episodes, seasons, loading, error } = usePodcastRss();
    const [selectedYear, setSelectedYear] = useState<string>('Todas');

    const filteredEpisodes = useMemo(() => {
        if (selectedYear === 'Todas') return episodes;
        return episodes.filter(ep => ep.season === selectedYear);
    }, [episodes, selectedYear]);


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 3;

    // Reset page when season changes
    useMemo(() => {
        setCurrentPage(1);
    }, [selectedYear]);

    const featuredEpisode = filteredEpisodes[0];
    const remainingEpisodes = filteredEpisodes.slice(1);

    // Calculate pagination
    const totalPages = Math.ceil(remainingEpisodes.length / ITEMS_PER_PAGE);
    const currentGridEpisodes = remainingEpisodes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    if (loading) return (
        <div className="min-h-screen bg-paper flex items-center justify-center overflow-hidden">
            <div className="text-6xl animate-drive">🏎️</div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-paper flex items-center justify-center text-red-600 font-bold">
            Error: {error}
        </div>
    );

    return (
        <div id="latest-episodes" className="min-h-screen bg-paper pb-32 pt-16">
            <main className="max-w-7xl mx-auto px-4">
                {/* Section Header with Season Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b-4 border-ink pb-6">
                    <h2 className="text-3xl md:text-5xl font-black uppercase text-ink">
                        Últimos <span className="text-primary">Episodios</span>
                    </h2>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-ink transform translate-x-1 translate-y-1"></div>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="relative bg-accent border-2 border-ink px-4 py-2 font-bold uppercase cursor-pointer outline-none hover:-translate-y-0.5 hover:-translate-x-0.5 transition-transform active:translate-x-0 active:translate-y-0"
                        >
                            <option value="Todas">TEMPORADAS: TODAS</option>
                            {seasons.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Featured Section */}
                {featuredEpisode && (
                    <section className="mb-16">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-1 flex-1 bg-ink"></div>
                            <h2 className="text-xl font-bold bg-ink text-paper px-2 py-1 transform -rotate-1">
                                {selectedYear === 'Todas' ? 'ÚLTIMO EPISODIO' : `DESTACADO ${selectedYear}`}
                            </h2>
                            <div className="h-1 flex-1 bg-ink"></div>
                        </div>
                        <EpisodePeelCard episode={featuredEpisode} shape="rect-1" featured={true} />
                    </section>
                )}

                {/* Grid Section */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {currentGridEpisodes.map((episode, index) => {
                            // Alternate shapes for variety
                            const shapes: ('rect-1' | 'rect-2' | 'rect-3' | 'rect-4' | 'rect-5')[] = ['rect-1', 'rect-2', 'rect-3', 'rect-4', 'rect-5'];
                            const shape = shapes[index % shapes.length];

                            return (
                                <div key={episode.id} className="h-full">
                                    <EpisodePeelCard episode={episode} shape={shape} />
                                </div>
                            );
                        })}
                    </div>

                    {currentGridEpisodes.length === 0 && remainingEpisodes.length === 0 && (
                        <div className="text-center py-12 font-mono text-gray-500">
                            No hay más episodios.
                        </div>
                    )}

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-16 gap-2">
                            {(() => {
                                const getVisiblePages = () => {
                                    // Show all if few pages
                                    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

                                    // Beginning
                                    if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];

                                    // End
                                    if (currentPage >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

                                    // Middle
                                    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                                };

                                return getVisiblePages().map((page, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            if (typeof page === 'number') {
                                                setCurrentPage(page);
                                                document.getElementById('latest-episodes')?.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }}
                                        disabled={page === '...'}
                                        className={`w-10 h-10 flex items-center justify-center font-bold border-2 border-ink transition-transform ${page === currentPage
                                            ? 'bg-ink text-paper'
                                            : page === '...'
                                                ? 'bg-transparent border-none cursor-default'
                                                : 'bg-paper text-ink hover:bg-accent hover:-translate-y-1'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ));
                            })()}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};
