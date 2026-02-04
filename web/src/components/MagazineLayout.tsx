import React, { useEffect, useRef, useState } from 'react';

interface MagazineLayoutProps {
    children: React.ReactNode[];
}

export const MagazineLayout: React.FC<MagazineLayoutProps> = ({ children }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const pages = React.Children.toArray(children);
    const totalPages = pages.length;
    // How much height per page turn? 150vh gives a nice weight.
    const scrollPerPage = 1.5;
    const totalScrollHeight = (totalPages - 1) * scrollPerPage * 100 + 100; // in vh units roughly

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const viewportHeight = container.clientHeight;
            const scrollHeight = container.scrollHeight;
            const scrollY = container.scrollTop;
            const maxScroll = scrollHeight - viewportHeight;

            // Map scroll to global progress (0 to totalPages-1)
            const rawProgress = Math.min(totalPages - 1, Math.max(0, (scrollY / maxScroll) * (totalPages - 1)));

            setScrollProgress(rawProgress);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [totalPages]);

    return (
        // MAIN CONTAINER
        <div
            className="h-screen w-full bg-black relative md:overflow-hidden font-sans"
        >
            {/* MOBILE: Simple Vertical Snap Scroll */}
            <div className="md:hidden h-full w-full overflow-y-auto snap-y snap-mandatory scroll-smooth">
                {pages.map((page, index) => (
                    <div key={index} className="w-full snap-start min-h-screen">
                        {page}
                    </div>
                ))}
            </div>

            {/* DESKTOP: 3D Scroll Effect */}
            <div
                ref={containerRef}
                className="hidden md:block h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
            >
                {/* TRACK */}
                <div className="relative w-full" style={{ height: `${totalScrollHeight}vh` }}>

                    {/* STICKY VIEWPORT */}
                    <div className="sticky top-0 h-screen w-full overflow-hidden perspective-1000">
                        <div className="relative w-full h-full preserve-3d">

                            {/* RENDER PAGES IN REVERSE ORDER (Bottom first) */}
                            {pages.map((page, index) => {
                                // Logic: 
                                // If progress is 0, Page 0 is visible.
                                // If progress is 0.5, Page 0 is half turned (-55deg).
                                // If progress is 1.0, Page 0 is fully turned (-110deg), Page 1 is visible.

                                // Calculate rotation for THIS page
                                // It rotates when progress is between index and index+1
                                const pageProgress = Math.min(1, Math.max(0, scrollProgress - index));

                                // Deadzone / Snap Logic per page
                                let visualPageProgress = pageProgress;
                                if (pageProgress < 0.05) visualPageProgress = 0;
                                if (pageProgress > 0.95) visualPageProgress = 1;

                                const rotation = visualPageProgress * -110;

                                // Z-Index: Page 0 is Highest. Page N is Lowest.
                                const zIndex = (totalPages - index) * 10;

                                return (
                                    <div
                                        key={index}
                                        className="absolute inset-0 w-full h-full origin-left bg-white shadow-2xl"
                                        style={{
                                            zIndex: zIndex,
                                            transform: `rotateY(${rotation}deg)`,
                                            transition: 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)',
                                            backfaceVisibility: 'hidden',
                                        }}
                                    >
                                        <div className="h-full w-full pointer-events-auto">
                                            {page}
                                        </div>

                                        {/* Shadow Overlay */}
                                        <div
                                            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent to-black mix-blend-multiply transition-opacity duration-300"
                                            style={{ opacity: visualPageProgress * 0.4 }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* SNAP TARGETS (In the Track) */}
                    {/* We place a snap target every 150vh (scrollPerPage) */}
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-screen snap-start pointer-events-none"
                            style={{
                                top: `${i * scrollPerPage * 100}vh`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
