import React from 'react';

export const ContactPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-ink pt-24 pb-32 px-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-black uppercase text-paper mb-2">CONTÁCTANOS</h1>
                    <p className="text-accent font-mono text-lg">¿Tienes preguntas? ¿Sugerencias? ¿Quieres patrocinar?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-paper p-8 shadow-[8px_8px_0_#F4D000] clip-rect-5">
                        <form className="space-y-6">
                            <div>
                                <label className="block font-black uppercase text-sm mb-2">Nombre</label>
                                <input type="text" className="w-full bg-gray-100 border-2 border-black p-3 font-mono focus:bg-white focus:outline-none focus:border-primary transition-colors" placeholder="Tu nombre" />
                            </div>
                            <div>
                                <label className="block font-black uppercase text-sm mb-2">Email</label>
                                <input type="email" className="w-full bg-gray-100 border-2 border-black p-3 font-mono focus:bg-white focus:outline-none focus:border-primary transition-colors" placeholder="tu@email.com" />
                            </div>
                            <div>
                                <label className="block font-black uppercase text-sm mb-2">Mensaje</label>
                                <textarea rows={4} className="w-full bg-gray-100 border-2 border-black p-3 font-mono focus:bg-white focus:outline-none focus:border-primary transition-colors" placeholder="Escribe tu mensaje..."></textarea>
                            </div>
                            <button className="w-full bg-black text-white font-black uppercase py-4 hover:bg-primary hover:text-black transition-colors border-2 border-black">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="text-paper flex flex-col justify-center space-y-8">
                        <div>
                            <h3 className="text-2xl font-black uppercase text-accent mb-4">Redes Sociales</h3>
                            <div className="space-y-4 font-mono">
                                <a href="#" className="block hover:text-primary transition-colors">→ Instagram @primersector</a>
                                <a href="#" className="block hover:text-primary transition-colors">→ Twitter @primersector</a>
                                <a href="#" className="block hover:text-primary transition-colors">→ YouTube /PrimerSector</a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-black uppercase text-accent mb-4">Email Directo</h3>
                            <p className="font-mono text-xl">
                                hola@primersector.com
                            </p>
                        </div>

                        <div className="pt-8 border-t border-gray-800">
                            <p className="text-sm text-gray-500">
                                Estamos ubicados en San Juan, Puerto Rico.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
