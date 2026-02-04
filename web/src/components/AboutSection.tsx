import React from 'react';

export const AboutSection: React.FC = () => {
    return (
        <section className="min-h-screen bg-[#F7F2E8] text-black p-6 md:p-12 flex flex-col justify-center relative overflow-hidden select-none">

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
            <div className="absolute top-0 right-10 bottom-0 w-px bg-red-600/30 z-10"></div>
            <div className="absolute top-10 left-0 right-0 h-px bg-red-600/30 z-10"></div>

            <div className="relative z-20 max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 border-b-4 border-black pb-4">
                    <h2 className="font-black text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter transform -rotate-1 origin-bottom-left">
                        El <br />
                        <span className="text-red-600 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">Crew</span>
                    </h2>
                    <div className="max-w-md text-right mt-4 md:mt-0">
                        <p className="font-serif italic text-xl">
                            "Como hablar mierda con tus panas, pero con datos."
                        </p>
                        <p className="text-xs font-mono uppercase tracking-widest mt-1">Est. College Days</p>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-12 items-start">

                    {/* AXEL */}
                    <div className="group relative">
                        <div className="relative aspect-[4/5] bg-black mb-4 overflow-hidden shadow-xl rotate-1 group-hover:rotate-0 transition-transform duration-300 border-2 border-black">
                            <img src="/team/axel.png" alt="Axel" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500" />
                            <div className="absolute bottom-0 left-0 bg-yellow-400 px-2 py-1 border-t-2 border-r-2 border-black">
                                <span className="font-black text-xs uppercase">The Host / New Fan</span>
                            </div>
                        </div>
                        <h3 className="font-black text-4xl uppercase mb-1 transform -skew-x-12">Axel</h3>
                        <p className="font-serif text-sm leading-tight pr-4">
                            El pegamento del grupo. Gelatiniza las locuras de los otros dos con la perspectiva fresca del fan nuevo. Hace las preguntas que tú harías.
                        </p>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-black text-xs transform rotate-12 shadow-lg">
                            HOST
                        </div>
                    </div>

                    {/* XANDEL */}
                    <div className="group relative md:mt-12">
                        <div className="relative aspect-[4/5] bg-black mb-4 overflow-hidden shadow-xl -rotate-2 group-hover:rotate-0 transition-transform duration-300 border-2 border-black">
                            <img src="/team/xandel.png" alt="Xandel" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500" />
                            <div className="absolute bottom-0 left-0 bg-cyan-400 px-2 py-1 border-t-2 border-r-2 border-black">
                                <span className="font-black text-xs uppercase">The Historian</span>
                            </div>
                        </div>
                        <h3 className="font-black text-4xl uppercase mb-1 transform -skew-x-12">Xandel</h3>
                        <p className="font-serif text-sm leading-tight pr-4">
                            La enciclopedia viviente. Te dirá quién ganó el GP de Bélgica en 1982 y por qué importa hoy. Trae el contexto histórico que nade pidió pero todos necesitan.
                        </p>
                    </div>

                    {/* ANGEL */}
                    <div className="group relative">
                        <div className="relative aspect-[4/5] bg-black mb-4 overflow-hidden shadow-xl rotate-2 group-hover:rotate-0 transition-transform duration-300 border-2 border-black">
                            <img src="/team/angel.png" alt="Angel" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500" />
                            <div className="absolute bottom-0 left-0 bg-green-400 px-2 py-1 border-t-2 border-r-2 border-black">
                                <span className="font-black text-xs uppercase">The Tech / Aero</span>
                            </div>
                        </div>
                        <h3 className="font-black text-4xl uppercase mb-1 transform -skew-x-12">Angel</h3>
                        <p className="font-serif text-sm leading-tight pr-4">
                            Susurrador de túneles de viento. Entiende por qué el sidepod de Red Bull funciona y te lo explica con manzanas. Si tiene alas, Ángel sabe cómo vuela.
                        </p>
                    </div>

                </div>

                {/* Footer Note */}
                <div className="mt-16 border-t-2 border-black pt-4 flex justify-between items-start opacity-60">
                    <p className="font-mono text-xs max-w-lg">
                        AMIGOS DE LA UNIVIERSIDAD. UNIDOS POR LA VELOCIDAD. DIVIDIDOS POR PILOTOS FAVORITOS.
                    </p>
                    <div className="font-black text-4xl">02</div>
                </div>

            </div>
        </section>
    );
};
