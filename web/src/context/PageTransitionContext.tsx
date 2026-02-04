import React, { createContext, useContext, useState, useCallback } from 'react';

interface PageTransitionContextType {
    isClosing: boolean;
    triggerClose: (callback: () => void) => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const PageTransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isClosing, setIsClosing] = useState(false);

    const triggerClose = useCallback((callback: () => void) => {
        setIsClosing(true);
        // Wait for animation to complete before executing callback
        setTimeout(() => {
            callback();
            // Reset after navigation
            setTimeout(() => setIsClosing(false), 100);
        }, 800); // Match the animation duration
    }, []);

    return (
        <PageTransitionContext.Provider value={{ isClosing, triggerClose }}>
            {children}
        </PageTransitionContext.Provider>
    );
};

export const usePageTransition = () => {
    const context = useContext(PageTransitionContext);
    if (!context) {
        throw new Error('usePageTransition must be used within PageTransitionProvider');
    }
    return context;
};
