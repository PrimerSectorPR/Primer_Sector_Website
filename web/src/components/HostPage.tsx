import React from 'react';
import { FaPlay } from 'react-icons/fa';

interface HostPageProps {
    name: string;
    role: string;
    description: string;
    image: string;
    color: string;
    index: number;
}

export const HostPage: React.FC<HostPageProps> = ({ name, role, image, color, index }) => {

    const getHostContent = () => {
        if (name === "Axel") {
            return {
                favoriteTeam: "Mercedes",
                ruleChange: "Deberían cambiar la regla de las penalizaciones por motor. No hay nada más estúpido que mandar para atrás a un piloto por cambiar partes del motor cuando ya existe un cost cap.",
                overrated: "Charles Leclerc. Un corredor que no tiene el \"dog in him\" y ha tenido más oportunidades que la inmensa mayoría de los pilotos.",
                worstDecision: "¡Red Bull! Traer a Hadjar fue muy apresurado y ya han gastado la mitad del cost cap sin que haya comenzado siquiera la primera carrera.",
                champion2026: "Lewis Hamilton",
                teamChampion2026: "Mercedes",
                hotTake: "McLaren no va a estar en el top 3 de la temporada 2026."
            };
        }
        if (name === "Xandel") {
            return {
                favoriteTeam: "Racing Bulls",
                ruleChange: "Yo cambiaría la regla de que todo el mundo use las mismas gomas o el mismo fuel. Formula 1 no es un spec series, no tiene por q tratar de estandarizar en esos aspectos.",
                overrated: "Sobrevalorado es Zak Brown. Lleva un millon de años en el grid y sus win han sido bn pocos",
                worstDecision: "Renault/Alpine. Estan buscando traer a Horner, contrataron a un criminal, el motor no matchea con su aero y el driver lineup es un experimento y una sombra",
                champion2026: "Fernando Alonso",
                teamChampion2026: "Ferrari",
                hotTake: "Las regulaciones nuevas van a expose a muchos equipos (2026: Ferrari wins it all)"
            };
        }
        return {
            favoriteTeam: "Por definir",
            ruleChange: "Contenido próximamente...",
            overrated: "Contenido próximamente...",
            worstDecision: "Contenido próximamente...",
            champion2026: "Por definir",
            teamChampion2026: "Por definir",
            hotTake: "Contenido próximamente..."
        };
    };

    const content = getHostContent();

    return (
        <section className="min-h-screen w-full bg-paper text-black relative select-none md:h-screen md:overflow-hidden font-sans bg-grain bg-vignette flex flex-col md:block">

            {/* --- MASTHEAD STRIP --- */}
            <div className="absolute top-0 left-0 right-0 h-10 md:h-12 bg-black text-paper flex items-center justify-between px-4 md:px-8 font-mono text-xs md:text-sm uppercase tracking-widest z-50 border-b-2 border-accent">
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-accent rounded-full inline-block"></span>
                    Primer Sector Magazine
                </span>
                <span className="hidden md:inline">Vol. 25 &bull; Perfil del Equipo</span>
            </div>

            {/* --- PS LOGO STAMP --- */}
            <div className="absolute top-16 right-8 z-40 w-32 md:w-40 opacity-90 mix-blend-multiply transform rotate-3 pointer-events-none">
                <img src="/ps_logo_v2.png" alt="PS Logo" />
            </div>

            {/* Main Content Grid - 50/50 Split on Desktop, Stacked on Mobile */}
            <div className="w-full h-full md:grid md:grid-cols-2 relative md:overflow-hidden pt-12 md:pt-12">

                {/* ========== LEFT HALF: PERSONAL INFO (Page 1) ========== */}
                <div className="relative bg-paper border-b-2 md:border-b-0 md:border-r-2 border-black p-8 md:p-12 flex flex-col justify-center min-h-[calc(100vh-3rem)] md:h-full md:min-h-0 md:overflow-y-auto w-full snap-start md:snap-align-none">

                    {/* Photo with Paperclip */}
                    <div className="relative mb-8 group md:max-w-[280px] md:mx-auto md:mb-6">
                        {/* Paperclip SVG - Interactive */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 cursor-pointer">
                            <svg width="60" height="100" viewBox="0 0 50 80" className="opacity-90 drop-shadow-md">
                                <path
                                    d="M35 15 C 35 5, 15 5, 15 15 L 15 65 C 15 75, 45 75, 45 65 L 45 25"
                                    fill="none"
                                    stroke="#333"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>

                        {/* Polaroid Frame */}
                        <div className="bg-white p-3 shadow-[8px_8px_0px_rgba(0,0,0,0.2)] transform -rotate-2 relative z-10 transition-transform duration-500 group-hover:rotate-0">
                            <div className="relative aspect-[4/5] overflow-hidden filter grayscale contrast-125 sepia-[0.3]">
                                <img
                                    src={image || "https://placehold.co/400x500/png"}
                                    alt={name}
                                    className="w-full h-full object-cover mix-blend-multiply"
                                />
                                {/* Texture Overlay */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-40 mix-blend-overlay"></div>
                            </div>
                            <div className="pt-4 pb-2 text-center font-handwriting text-2xl text-gray-800 opacity-90 rotate-1">
                                {name} - {role}
                            </div>
                        </div>

                        {/* Tape Element */}
                        <div className="absolute -top-4 -right-4 w-24 h-8 bg-yellow-200 opacity-80 rotate-[35deg] shadow-sm z-20 mix-blend-multiply"></div>
                    </div>

                    {/* Stats Card - Typewriter Style */}
                    <div className="bg-paper border-2 border-black p-6 relative shadow-[4px_4px_0px_rgba(0,0,0,1)] transform rotate-1 mt-4">
                        <div className="absolute -top-3 left-4 bg-accent px-2 py-1 border border-black text-xs font-bold uppercase tracking-widest shadow-sm">
                            Datos del Host
                        </div>

                        <div className="space-y-3 font-mono text-sm leading-relaxed">
                            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
                                <span className="uppercase text-gray-500">Nombre:</span>
                                <span>{name}</span>
                            </div>
                            <div className="flex justify-between border-b border-dotted border-gray-400 pb-1">
                                <span className="uppercase text-gray-500">Rol:</span>
                                <span>{role}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-dotted border-gray-400 pb-1">
                                <span className="uppercase text-gray-500">Equipo Fav.:</span>
                                <span className={`${color === 'bg-white' ? 'text-black border border-black' : 'text-white'} ${color} px-2 py-0.5 text-xs font-bold uppercase`}>
                                    {content.favoriteTeam}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="uppercase text-gray-500">Estado:</span>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-xs bg-green-100 px-1 border border-green-300 text-green-800">ACTIVO</span>
                                </div>
                            </div>
                        </div>

                        {/* Circular Stamp */}
                        <div className="absolute -bottom-6 -right-6 w-20 h-20 border-4 border-primary rounded-full flex items-center justify-center rotate-[-15deg] opacity-80 mix-blend-multiply z-20 bg-paper">
                            <div className="text-primary font-black text-xs text-center leading-none">
                                OFFICIAL<br /><span className="text-xl block">#{index.toString().padStart(3, '0')}</span>MEMBER
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========== RIGHT HALF: INTERVIEW Q&A (Page 2) ========== */}
                <div className="relative bg-paper p-8 md:p-6 lg:p-12 flex flex-col min-h-[calc(100vh-3rem)] md:h-full md:min-h-0 md:overflow-hidden w-full pt-16 md:pt-4 lg:pt-12 pb-32 md:pb-2 lg:pb-8 snap-start md:snap-align-none">

                    <div className="flex flex-col md:h-full md:justify-between">
                        {/* Header - Balanced on Desktop */}
                        <div className="relative border-b-4 border-black pb-4 mb-8 md:mb-1 lg:mb-4 md:pb-1 lg:pb-4 md:border-b-4 md:flex-shrink-0">
                            <h2 className="font-black text-6xl md:text-2xl lg:text-5xl xl:text-6xl uppercase leading-none tracking-tighter text-black">
                                ENTREVISTA
                            </h2>
                            <div className="h-1 w-32 bg-primary mt-2 md:mt-1 lg:mt-2 md:h-1"></div>
                        </div>

                        {/* Questions - Expanded Grid on Desktop */}
                        <div className="space-y-8 md:space-y-6 lg:space-y-6 relative z-10 font-serif text-base md:text-xs lg:text-base leading-relaxed md:flex-grow md:flex md:flex-col md:justify-center">

                            {/* Q1 */}
                            <div className="border-b-4 md:border-b-2 border-primary pb-8 md:pb-5 lg:pb-6 mb-8 md:mb-5 lg:mb-6">
                                <h4 className="font-mono text-xl md:text-base lg:text-lg uppercase tracking-widest text-primary mb-4 md:mb-2 lg:mb-3 font-bold">
                                    ¿Un cambio de regla?
                                </h4>
                                <p className="italic pl-8 md:pl-5 lg:pl-6 border-l-8 md:border-l-4 border-primary text-black text-2xl md:text-lg lg:text-xl font-bold leading-tight">
                                    "{content.ruleChange}"
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-10 lg:gap-x-12 md:gap-y-6 lg:gap-y-6">
                                {/* Q2 */}
                                <div className="border-b-2 md:border-b border-black pb-4 md:pb-2 lg:pb-4">
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-red-600 mb-2 md:mb-1 lg:mb-2 font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                        ¿Sobrevalorado?
                                    </h4>
                                    <p className="italic pl-4 border-l-2 border-red-200 text-gray-800 leading-tight text-base md:text-sm lg:text-lg">
                                        {content.overrated}
                                    </p>
                                </div>

                                {/* Q3 */}
                                <div className="border-b-2 md:border-b border-black pb-4 md:pb-2 lg:pb-4">
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-2 md:mb-1 lg:mb-2 font-bold">
                                        ¿Peor decisión 2026?
                                    </h4>
                                    <p className="italic pl-4 border-l-2 border-gray-300 text-gray-800 leading-tight text-base md:text-sm lg:text-lg">
                                        {content.worstDecision}
                                    </p>
                                </div>
                            </div>

                            {/* Predictions Box - Expanded */}
                            <div className="bg-gray-100 p-6 md:p-3 lg:p-5 border-l-4 border-accent relative mb-8 md:mb-2 lg:mb-4 mt-4 md:mt-2 lg:mt-4">
                                <div className="absolute -top-3 left-0 bg-accent px-3 py-1 font-bold text-xs border border-black shadow-sm uppercase md:scale-75 lg:scale-90 md:origin-left">
                                    Predicciones 2026
                                </div>
                                <div className="mt-4 md:mt-3 lg:mt-3 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 lg:gap-6">
                                    <div>
                                        <span className="block font-mono text-[10px] uppercase text-gray-500 mb-1">Campeón:</span>
                                        <span className="text-3xl md:text-xl lg:text-2xl font-black text-accent bg-black px-4 md:px-3 lg:px-3 py-2 md:py-2 lg:py-2 inline-block transform -rotate-1 shadow-sm">
                                            {content.champion2026}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block font-mono text-[10px] uppercase text-gray-500 mb-1">Equipo:</span>
                                        <span className="text-xl md:text-lg lg:text-xl font-bold bg-black text-accent px-3 py-1 inline-block transform rotate-1">
                                            {content.teamChampion2026}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Hot Take */}
                            <div className="mt-8 md:mt-4 lg:mt-4 border-l-4 border-red-600 pl-6 md:pl-5 lg:pl-6 py-2 md:py-1">
                                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase mb-2 md:mb-2 lg:mb-2 inline-block md:scale-90 lg:scale-100 md:origin-left z-10 relative">Hot Take</span>
                                <p className="font-serif italic text-lg md:text-base lg:text-lg font-bold leading-tight">
                                    {content.hotTake}
                                </p>
                            </div>

                        </div>

                        {/* Footer Button - Balanced Margin */}
                        <div className="mt-12 md:mt-0 lg:mt-0 group relative inline-block cursor-pointer self-center md:flex-shrink-0 pt-4 lg:pt-4">
                            {/* Video Tooltip */}
                            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                                <div className="bg-black border-4 border-accent p-3 shadow-2xl">
                                    <div className="w-[480px] h-[270px] md:w-[320px] md:h-[180px] lg:w-[480px] lg:h-[270px] bg-gray-900 flex items-center justify-center">
                                        <div className="text-white text-xs">Video Placeholder</div>
                                    </div>
                                    <div className="bg-accent text-black text-center text-sm font-bold uppercase tracking-widest py-1 mt-2">
                                        Preview
                                    </div>
                                </div>
                                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-accent absolute left-1/2 -translate-x-1/2 -bottom-2"></div>
                            </div>

                            <div className="relative z-10 bg-black text-accent border-2 border-accent px-8 md:px-8 lg:px-8 py-3 md:py-2 lg:py-3 font-mono uppercase tracking-widest font-bold hover:bg-accent hover:text-black transition-colors duration-300 flex items-center gap-3 text-sm md:text-xs lg:text-base">
                                <FaPlay size={12} />
                                Ver Clip
                            </div>
                            <div className="absolute top-1 left-1 w-full h-full bg-accent -z-0 opacity-50 group-hover:top-2 group-hover:left-2 transition-all duration-300"></div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
