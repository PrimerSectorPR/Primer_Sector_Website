import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaEnvelope, FaPhone, FaInstagram, FaYoutube, FaHome } from 'react-icons/fa';
import { usePageTransition } from '../context/PageTransitionContext';
import { useNavigation } from '../context/NavigationContext';

interface ContactPageProps {
    index: number;
}

export const ContactPage: React.FC<ContactPageProps> = ({ index }) => {
    const { triggerClose } = usePageTransition();
    const { activePageIndex } = useNavigation();
    const isActive = activePageIndex === index;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <section className="min-h-screen w-full bg-paper text-black relative overflow-hidden font-sans bg-grain bg-vignette">
            {isActive && (
                <Helmet>
                    <title>Contacto | Primer Sector</title>
                    <meta name="description" content="Contáctanos para preguntas, sugerencias o colaboraciones. ¡Queremos saber de ti!" />
                </Helmet>
            )}

            {/* --- MASTHEAD STRIP --- */}
            <div className="absolute top-0 left-0 right-0 h-10 md:h-12 bg-black text-[#F7F2E8] flex items-center justify-between px-4 md:px-8 font-mono text-xs md:text-sm uppercase tracking-widest z-50 border-b-2 border-accent">
                <span className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-accent rounded-full inline-block animate-pulse"></span>
                    Primer Sector Magazine
                </span>
                <span className="hidden md:inline">Vol. 25 &bull; Contacto</span>
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

            {/* Main Content */}
            <div className="min-h-screen w-full pt-12 md:pt-14 pb-6 md:pb-8 px-4 md:px-6 lg:px-8 relative z-10">

                {/* Page Title */}
                <div className="max-w-6xl mx-auto mb-4 md:mb-6">
                    <div className="inline-block">
                        <h1 className="font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-[0.9] transform -rotate-1">
                            <span className="text-misregistration animate-ink anim-delay-200" data-text="CONTACTANOS">CONTACTANOS</span>
                        </h1>
                        {/* Underline decoration */}
                        <div className="h-2 bg-accent mt-2 transform -rotate-1 shadow-[4px_4px_0_rgba(0,0,0,0.3)]"></div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-12">

                    {/* LEFT COLUMN - Contact Info (Desktop Only) */}
                    <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

                        {/* Contact Card - LEFT (Rectangle) */}
                        <div className="bg-white border-4 border-black p-4 lg:p-6 relative shadow-[8px_8px_0_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 flex flex-col">
                            {/* Corner Stamp */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 border-4 border-red-600 rounded-full flex items-center justify-center transform rotate-12 bg-white opacity-90 mix-blend-multiply">
                                <span className="font-black text-red-600 text-xs uppercase text-center leading-none">
                                    Urgent<br />Contact
                                </span>
                            </div>

                            <h2 className="font-black text-xl lg:text-2xl uppercase mb-4 border-b-2 border-black pb-2">
                                Información de Contacto
                            </h2>

                            {/* All Contact Info in One Line on Desktop */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start flex-1">
                                {/* Email */}
                                <div className="group cursor-pointer">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-10 h-10 bg-accent flex items-center justify-center border-2 border-black shadow-[3px_3px_0_rgba(0,0,0,1)] group-hover:shadow-[5px_5px_0_rgba(0,0,0,1)] transition-all">
                                            <FaEnvelope className="text-black text-base" />
                                        </div>
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">Email</span>
                                    </div>
                                    <a
                                        href="mailto:info@primersector.com"
                                        className="font-mono text-sm lg:text-base text-primary hover:text-black transition-colors block break-all"
                                    >
                                        info@primersector.com
                                    </a>
                                </div>

                                {/* Phone */}
                                <div className="group cursor-pointer">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-10 h-10 bg-black flex items-center justify-center border-2 border-black shadow-[3px_3px_0_rgba(244,208,0,1)] group-hover:shadow-[5px_5px_0_rgba(244,208,0,1)] transition-all">
                                            <FaPhone className="text-accent text-base" />
                                        </div>
                                        <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500">Teléfono</span>
                                    </div>
                                    <a
                                        href="tel:813-831-7541"
                                        className="font-mono text-sm lg:text-base text-black hover:text-primary transition-colors block"
                                    >
                                        813-831-7541
                                    </a>
                                </div>

                                {/* Social Media */}
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Síguenos</p>
                                    <div className="flex gap-2">
                                        <a href="https://www.instagram.com/primersectorpod" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[3px_3px_0_rgba(0,0,0,1)]">
                                            <FaInstagram className="text-lg" />
                                        </a>
                                        <a href="https://www.youtube.com/channel/UCTgxJET2nw-G042C7p6Qyaw" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[3px_3px_0_rgba(0,0,0,1)]">
                                            <FaYoutube className="text-lg" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Box - RIGHT (Rectangle) */}
                        <div className="bg-[#fdf6b6] border-2 border-black p-4 lg:p-6 relative transform rotate-1 shadow-[6px_6px_0_rgba(0,0,0,0.2)] flex flex-col justify-center">
                            {/* Tape Effect */}
                            <div className="absolute -top-3 left-1/4 w-20 h-6 bg-white/60 border-l border-r border-white/80 shadow-sm transform -rotate-6 backdrop-blur-sm"></div>

                            <p className="font-serif text-sm lg:text-base leading-relaxed text-gray-800">
                                <span className="font-black text-2xl lg:text-3xl float-left mr-2 lg:mr-3 mt-1 text-primary">¿</span>
                                Tienes alguna pregunta, sugerencia o simplemente quieres saludar? ¡Nos encantaría saber de ti! Estamos aquí para conectar con nuestra comunidad de fanáticos de F1.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Contact Form */}
                    <div className="relative">
                        {/* Form Container */}
                        <div className="bg-white border-4 border-black p-4 lg:p-6 shadow-[8px_8px_0_rgba(0,0,0,1)] relative">
                            {/* Corner Label */}
                            <div className="absolute -top-3 left-8 bg-accent px-3 py-1 border-2 border-black text-xs font-bold uppercase tracking-widest shadow-sm">
                                Mensaje Directo
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 mt-3">
                                {/* Name and Email - Side by Side */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block font-mono text-xs uppercase tracking-wider text-gray-600 mb-2">
                                            Tu Nombre
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:border-primary focus:shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-all"
                                            placeholder="Ej: Juan Pérez"
                                            required
                                        />
                                    </div>

                                    {/* Email Field */}
                                    <div>
                                        <label className="block font-mono text-xs uppercase tracking-wider text-gray-600 mb-2">
                                            Tu Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:border-primary focus:shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-all"
                                            placeholder="tu@email.com"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Subject Field */}
                                <div>
                                    <label className="block font-mono text-xs uppercase tracking-wider text-gray-600 mb-2">
                                        Asunto
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:border-primary focus:shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-all"
                                        placeholder="Ej: Pregunta sobre el podcast"
                                        required
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label className="block font-mono text-xs uppercase tracking-wider text-gray-600 mb-2">
                                        Tu Mensaje
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={4}
                                        className="w-full px-3 py-2 border-2 border-black font-mono text-sm focus:outline-none focus:border-primary focus:shadow-[4px_4px_0_rgba(0,0,0,0.2)] transition-all resize-none"
                                        placeholder="Escribe tu mensaje aquí..."
                                        required
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-black text-accent border-4 border-accent px-6 py-3 font-black uppercase text-base md:text-lg tracking-wider shadow-[6px_6px_0_rgba(244,208,0,1)] hover:shadow-[3px_3px_0_rgba(244,208,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
                                >
                                    Enviar Mensaje →
                                </button>
                            </form>

                            {/* Decorative Corner Fold */}
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gray-200 border-2 border-black transform rotate-45 origin-top-left shadow-inner"></div>
                        </div>

                        {/* Decorative Sticker */}
                        <div className="hidden lg:block absolute -bottom-8 -left-8 bg-primary text-black px-6 py-3 transform -rotate-12 shadow-[6px_6px_0_rgba(0,0,0,1)] border-2 border-black z-20">
                            <p className="font-black text-sm uppercase">¡Respuesta en 24h!</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Decoration */}
                <div className="max-w-6xl mx-auto mt-6 md:mt-8 flex items-center justify-between border-t-4 border-black pt-4">
                    {/* Barcode */}
                    <div className="opacity-80 mix-blend-multiply">
                        <svg className="h-10 md:h-12 w-32 md:w-40" viewBox="0 0 100 30" preserveAspectRatio="none">
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
                            </g>
                        </svg>
                        <div className="font-mono text-[9px] mt-1 tracking-[0.2em]">
                            ISSN 1234-5678
                        </div>
                    </div>

                    {/* Page Number */}
                    <div className="text-right">
                        <span className="font-black text-5xl md:text-6xl opacity-20">07</span>
                        <p className="font-mono text-[10px] uppercase tracking-widest bg-accent px-2 inline-block">Contact Page</p>
                    </div>
                </div>
            </div>

            {/* Decorative Side Element */}
            <div className="fixed top-1/2 right-0 transform rotate-90 origin-right translate-x-8 md:translate-x-6 z-50">
                <span className="text-[10px] font-mono tracking-[0.5em] text-gray-500 uppercase">
                    Get In Touch With Us
                </span>
            </div>
        </section>
    );
};
