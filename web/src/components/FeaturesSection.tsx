import React from 'react';

export const FeaturesSection: React.FC = () => {
    const features = [
        {
            title: "ANÁLISIS DE CARRERAS",
            description: "Análisis profundo de F1, MotoGP y todo el mundo del automovilismo.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            rotation: "-rotate-1"
        },
        {
            title: "INVITADOS EXPERTOS",
            description: "Conversaciones con pilotos, ingenieros y conocedores de la industria.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            rotation: "rotate-2"
        },
        {
            title: "EPISODIOS SEMANALES",
            description: "Contenido fresco cada semana, análisis de carreras y opiniones calientes.",
            icon: (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
            ),
            rotation: "-rotate-1"
        }
    ];

    return (
        <section className="bg-paper py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black uppercase transform skew-x-12 inline-block bg-accent px-4 py-2 text-ink clip-rect-2">
                        ACELERA <span className="text-white drop-shadow-md">TU CONOCIMIENTO</span>
                    </h2>
                    <p className="text-gray-600 font-mono max-w-2xl mx-auto">
                        Desde el pitlane hasta el podio, lo cubrimos todo con pasión boricua, conocimiento y diversión.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className={`group relative transform ${feature.rotation} hover:rotate-0 transition-transform duration-300`}>
                            {/* Card Shadow/Border */}
                            <div className="absolute inset-0 bg-ink transform translate-x-2 translate-y-2 clip-rect-4"></div>

                            {/* Card Content */}
                            <div className="relative bg-white p-8 h-full border-2 border-ink clip-rect-4 flex flex-col items-start hover:bg-gray-50 transition-colors">
                                <div className="text-primary mb-6 p-3 bg-gray-100 rounded-full border border-gray-200">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-black uppercase mb-3">{feature.title}</h3>
                                <p className="text-gray-600 font-mono text-sm leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Corner Tape */}
                                <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 opacity-50 transform rotate-45 mix-blend-multiply"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
