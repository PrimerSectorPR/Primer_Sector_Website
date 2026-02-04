import React, { useState, useEffect } from 'react';

interface NavigationProps {
    currentView: string;
    setView: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Inicio' },
        { id: 'about', label: 'Sobre Nosotros' },
        { id: 'contact', label: 'Contacto' }
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-black/95 py-3 border-b-2 border-accent' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                {/* Logo Area */}
                <div
                    onClick={() => setView('home')}
                    className="cursor-pointer group flex items-center gap-2"
                >
                    {/* Simplified Logo for Nav */}
                    <div className="font-black italic uppercase text-2xl tracking-tighter text-paper">
                        P<span className="text-primary">S</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="flex items-center gap-8">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`font-bold uppercase tracking-wider text-sm transition-colors relative group ${currentView === item.id ? 'text-accent' : 'text-white hover:text-primary'
                                }`}
                        >
                            {item.label}
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform ${currentView === item.id ? 'scale-x-100' : ''}`}></span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};
