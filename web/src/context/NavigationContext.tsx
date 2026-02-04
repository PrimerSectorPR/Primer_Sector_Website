import React, { createContext, useContext, useRef, useCallback } from 'react';

interface NavigationContextType {
    navigateToPage: (pageIndex: number) => void;
    registerContainer: (desktop: HTMLDivElement | null, mobile: HTMLDivElement | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const desktopContainerRef = useRef<HTMLDivElement | null>(null);
    const mobileContainerRef = useRef<HTMLDivElement | null>(null);

    const registerContainer = useCallback((desktop: HTMLDivElement | null, mobile: HTMLDivElement | null) => {
        desktopContainerRef.current = desktop;
        mobileContainerRef.current = mobile;
    }, []);

    const navigateToPage = useCallback((pageIndex: number) => {
        const scrollPerPage = 1.5; // Match MagazineLayout's scrollPerPage
        const isMobile = window.innerWidth < 768; // md breakpoint

        if (isMobile && mobileContainerRef.current) {
            // Mobile: scroll to page index * viewport height
            const mobileTargetScroll = pageIndex * window.innerHeight;
            mobileContainerRef.current.scrollTo({ top: mobileTargetScroll, behavior: 'smooth' });
        } else if (!isMobile && desktopContainerRef.current) {
            // Desktop: scroll with 1.5x multiplier
            const targetScroll = pageIndex * scrollPerPage * window.innerHeight;
            desktopContainerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
    }, []);

    return (
        <NavigationContext.Provider value={{ navigateToPage, registerContainer }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within NavigationProvider');
    }
    return context;
};
