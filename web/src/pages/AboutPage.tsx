import React from 'react';

export const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-paper pt-24 pb-32 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-64 h-64 bg-accent rounded-full opacity-20 blur-3xl"></div>
                    <h1 className="relative text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-ink mb-4 transform -rotate-2">
                        SOBRE <span className="text-primary block md:inline">NOSTROS</span>
                    </h1>
                    <div className="h-2 w-32 bg-ink mx-auto mb-8 clip-rect-1"></div>
                </div>

                {/* Content Block */}
                <div className="bg-white border-4 border-ink p-8 md:p-12 shadow-[1rem_1rem_0_#000] rotate-1">
                    <p className="text-xl md:text-2xl font-black leading-tight mb-8 text-gray-800">
                        "NO ES SOLO CARRERAS. ES LA PASIÓN, LA ESTRATEGIA, Y EL RUIDO DE LOS MOTORES LO QUE NOS MUEVE."
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-gray-600 leading-relaxed">
                        <div>
                            <p className="mb-4">
                                <strong className="text-primary text-lg">BIENVENIDOS A PRIMER SECTOR.</strong> El podcast de Fórmula 1 y automovilismo más emocionante de Puerto Rico y el Caribe. Nacimos de la necesidad de hablar de carreras sin filtros, con el sabor local y el análisis experto que los fanáticos merecen.
                            </p>
                            <p>
                                Desde análisis técnicos de aerodinámica hasta los chismes más calientes del paddock, aquí cubrimos todo.
                            </p>
                        </div>
                        <div>
                            <p className="mb-4">
                                Nuestro equipo está compuesto por fanáticos die-hard, ingenieros de sofá y pilotos frustrarlos que viven y respiran gasolina.
                            </p>
                            <div className="mt-8 bg-gray-100 p-4 border-l-4 border-accent">
                                <h4 className="font-bold text-ink uppercase mb-2">Nuestra Misión</h4>
                                <p className="text-sm">Traer la cultura del motorsport a las masas, un episodio a la vez.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="mt-24">
                    <h2 className="text-4xl font-black uppercase text-center mb-12">EL EQUIPO</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {['Axel', 'Carlos', 'Sofia'].map((name, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="w-48 h-48 mx-auto bg-gray-300 rounded-full border-4 border-ink mb-4 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all">
                                    <div className="absolute inset-0 opacity-50"></div>
                                    <div className="flex items-center justify-center h-full text-4xl">🏎️</div>
                                </div>
                                <h3 className="text-2xl font-black uppercase">{name}</h3>
                                <p className="font-mono text-accent text-sm">CO-HOST</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
