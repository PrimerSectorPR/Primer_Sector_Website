import React, { useState } from 'react';
import './styles/magazine.css';
import { AudioProvider } from './context/AudioContext';
import { StickyPlayerBar } from './components/StickyPlayerBar';

import { HeroSection } from "./components/HeroSection";
import { MagazineLayout } from "./components/MagazineLayout";
import { MissionPage } from "./components/MissionPage";
import { HostPage } from "./components/HostPage";

import { EpisodesPage } from "./components/EpisodesPage";

function App() {
  return (
    <AudioProvider>
      <div className="bg-paper min-h-screen">
        <MagazineLayout>
          <HeroSection />

          <MissionPage />

          <EpisodesPage />

          <HostPage
            name="Xandel"
            role="El Historiador"
            description="Cuestiona las reglas y la moral de los competidores. Eso sí, no hablen de Yuki Tsunoda porque hasta ahí llega su tolerancia."
            image="/team/xandel.png"
            color="bg-primary"
            index={4}
          />

          <HostPage
            name="Angel"
            role="El Ingeniero"
            description="Te traerá datos, información y análisis del aspecto técnico... pero de vez en cuando va a defender a Red Bull."
            image="/team/angel.png"
            color="bg-black text-white"
            index={5}
          />

          <HostPage
            name="Axel"
            role="El Fan Nuevo"
            description="Productor y Director. A menudo está en desacuerdo solo por llevar la contraria, mientras aporta su perspectiva fresca de fan nuevo."
            image="/team/axel.png"
            color="bg-accent"
            index={6}
          />

        </MagazineLayout>

        <StickyPlayerBar />
      </div>
    </AudioProvider>
  );
}

export default App;
