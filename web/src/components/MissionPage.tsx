import React from 'react';
import { FaHome } from 'react-icons/fa';
import { usePageTransition } from '../context/PageTransitionContext';

export const MissionPage: React.FC = () => {
    const { triggerClose } = usePageTransition();

    return (
        <section className="h-screen w-full bg-white text-black flex flex-col justify-center relative overflow-hidden select-none bg-grain bg-vignette font-sans">

            {/* --- MASTHEAD STRIP --- */}
            <div className="absolute top-0 left-0 right-0 h-10 md:h-12 bg-black text-[#F7F2E8] flex items-center justify-between px-4 md:px-8 font-mono text-xs md:text-sm uppercase tracking-widest z-50 border-b-2 border-accent">
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-accent rounded-full inline-block"></span>
                    Primer Sector Magazine
                </span>
                <span className="hidden md:inline">Vol. 25 &bull; Editorial</span>
                <button
                    onClick={() => triggerClose(() => window.scrollTo({ top: 0, behavior: 'smooth' }))}
                    className="flex items-center gap-2 hover:text-accent transition-colors cursor-pointer group"
                >
                    <FaHome className="text-lg group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">Home</span>
                </button>
            </div>

            {/* --- PS LOGO STAMP --- */}
            <div className="absolute top-16 right-8 z-40 w-32 md:w-40 opacity-90 mix-blend-multiply transform rotate-3 pointer-events-none">
                <img src="/ps_logo_v2.png" alt="PS Logo" />
            </div>

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[#F7F2E8] opacity-100 z-0"></div>

            {/* Grid Line Decoration (Simplified) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Horizontal Lines Only */}
                <div className="absolute top-[18%] left-0 right-0 h-px bg-black opacity-10"></div>
                <div className="absolute top-[82%] left-0 right-0 h-px bg-black opacity-10"></div>

                {/* Vertical Lines (Sides Only) */}
                <div className="absolute top-0 bottom-0 left-[8%] w-px bg-black opacity-05"></div>
                <div className="absolute top-0 bottom-0 right-[8%] w-px bg-black opacity-05"></div>
            </div>

            {/* --- PUERTO RICO ISLAND STAMP --- */}
            <div className="absolute top-28 left-6 md:left-20 z-30 transform -rotate-12 opacity-80 mix-blend-multiply pointer-events-none hidden md:block">
                <div className="relative w-40 h-24 flex items-center justify-center p-1">

                    {/* Island Shape Outline */}
                    <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-md text-primary stroke-current stroke-2 fill-none filter drop-shadow-sm">
                        {/* Stylized PR Map Path */}
                        <path d="M 20,45 Q 35,30 60,32 T 110,32 T 160,30 L 180,45 Q 170,70 140,65 T 90,68 T 40,65 Z" strokeLinejoin="round" />
                    </svg>

                    {/* Inner Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-2 transform -rotate-2">
                        <span className="font-mono text-[8px] tracking-[0.3em] font-black text-primary uppercase bg-[#F7F2E8]/80 px-1 backdrop-blur-sm">Hecho En</span>
                        <span className="font-black text-4xl text-primary opacity-90 leading-none mt-1">PR</span>
                    </div>

                    {/* Outer Box (Optional Ghost Border) */}
                    <div className="absolute inset-0 border-2 border-primary opacity-20 rounded-lg transform rotate-2 scale-110 pointer-events-none"></div>
                </div>
            </div>

            <div className="relative z-20 max-w-5xl md:max-w-2xl lg:max-w-5xl mx-auto px-8 md:px-0">
                <h5 className="font-mono text-sm uppercase tracking-widest text-primary mb-6 border-b-2 border-primary pb-2 inline-block md:hidden lg:inline-block">
                    Editorial &mdash; Vol. 25
                </h5>

                <div className="md:text-center lg:text-left">
                    <h2 className="font-black text-7xl md:text-6xl lg:text-7xl xl:text-9xl uppercase leading-[0.8] mb-6 md:mb-8 transform -rotate-1 origin-left md:origin-center lg:origin-left inline-block">
                        <span className="block text-misregistration animate-ink anim-delay-200" data-text="Sobre">Sobre</span>
                        <span className="block text-primary text-misregistration animate-ink anim-delay-500" data-text="Nosotros">Nosotros</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 font-serif text-xl md:text-lg lg:text-3xl leading-relaxed mix-blend-multiply relative">

                    {/* Column 1 */}
                    <div className="relative flex flex-col justify-center">
                        <p className="first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px] first-letter:text-primary relative z-10">
                            <span className="font-bold italic relative inline-block">
                                Primer Sector
                                {/* Hand-drawn Circle Annotation */}
                                <svg className="absolute -top-2 -left-2 w-[120%] h-[150%] pointer-events-none text-red-600 opacity-80" viewBox="0 0 100 40" preserveAspectRatio="none">
                                    <path d="M5,20 C5,10 20,5 50,5 C80,5 95,15 95,25 C95,35 80,38 50,38 C20,38 5,30 5,20 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,2" transform="rotate(-2 50 20)" />
                                </svg>
                            </span>
                            nace de la visión de tres entusiastas del deporte para traer el tema de Fórmula 1 a Puerto Rico de una manera casual.
                        </p>
                        <p className="mt-4 md:mt-3 lg:mt-6">
                            Nuestra misión es conectar a la comunidad y a los fanáticos a través de nuestras plataformas digitales, proveyendo contenido semanal e interactuando con los mismos.
                        </p>

                        {/* Decor: Coffee Stain */}
                        <div className="absolute -bottom-20 -left-20 w-48 h-48 border-4 border-[#5c4033] rounded-full opacity-10 blur-sm mix-blend-multiply pointer-events-none transform scale-y-90 mask-image-grunge"></div>
                    </div>

                    {/* Column 2 (Yellow Note) */}
                    <div className="relative bg-[#fdf6b6] p-6 md:p-5 lg:p-8 shadow-lg transform rotate-1 flex flex-col justify-center">
                        {/* Scotch Tape Effects */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 border-l border-r border-white/60 shadow-sm transform -rotate-2 backdrop-blur-sm opacity-60"></div>
                        <div className="absolute -bottom-3 right-8 w-16 h-8 bg-white/40 border-l border-r border-white/60 shadow-sm transform rotate-45 backdrop-blur-sm opacity-60"></div>

                        <p className="mb-4 md:mb-3 lg:mb-6 z-10 relative text-gray-800">
                            Cada semana lanzamos episodios nuevos en donde tocamos noticias, eventos y la historia del deporte a través del dialogo y el debate. Además hablamos de temas técnicos con el fin de aprender más sobre el deporte.
                        </p>
                        <p className="font-black italic text-lg md:text-base lg:text-xl opacity-60 text-center">
                            "Dialogue, Debate, y Datos Técnicos."
                        </p>

                        {/* Stamp */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-red-700 rounded-full flex items-center justify-center transform -rotate-12 opacity-40 mix-blend-multiply pointer-events-none">
                            <span className="font-black text-red-700 text-xs uppercase text-center leading-none">
                                APPROVED<br />BY<br />FIA
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FOOTER / BARCODE --- */}
            <div className="absolute bottom-8 left-8 z-40 opacity-80 mix-blend-multiply hidden md:block">
                <svg className="h-10 w-40" viewBox="0 0 100 30" preserveAspectRatio="none">
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
                    </g>
                </svg>
                <div className="flex justify-between font-mono text-[9px] mt-1 tracking-[0.2em]">
                    <span>ISSN 1234</span>
                    <span>PRINTED IN PUERTO RICO</span>
                </div>
            </div>

            {/* Decorative Side Elements */}
            <div className="fixed top-1/2 right-0 transform rotate-90 origin-right translate-x-8 md:translate-x-6 z-50">
                <span className="text-[10px] font-mono tracking-[0.5em] text-gray-500 uppercase">
                    Official Podcast of the Racing World
                </span>
            </div>

            {/* Pagination */}
            <div className="absolute bottom-8 right-8 font-black text-6xl opacity-10 z-20">
                02
            </div>
        </section>
    );
};
