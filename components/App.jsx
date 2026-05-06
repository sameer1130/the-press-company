'use client';

import { useEffect, useState } from 'react';
import Opening from './Opening';
import { Header, SideMenu } from './Header';
import { Hero, Ticker } from './Hero';
import WhoWeAre from './WhoWeAre';
import Reel from './Reel';
import PressCubes from './PressCubes';
import Projects from './Projects';
import People from './People';
import InteractiveCubes from './InteractiveCubes';
import FinalCTA from './FinalCTA';
import Tweaks from './Tweaks';

export default function App() {
  const [opening, setOpening] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tweaksVisible, setTweaksVisible] = useState(false);

  useEffect(() => {
    if (opening) {
      document.body.classList.add('locked');
    } else {
      document.body.classList.remove('locked');
    }
  }, [opening]);

  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || !e.data.type) return;
      if (e.data.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  useEffect(() => {
    let t = 'default';
    try {
      const saved = localStorage.getItem('tpc-theme');
      if (saved) t = saved;
    } catch (e) { /* ignore */ }
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  return (
    <>
      {opening && <Opening onDone={() => setOpening(false)} />}

      <Header onOpenMenu={() => setMenuOpen((v) => !v)} menuOpen={menuOpen} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Hero />
      <Ticker />
      <WhoWeAre />
      <Reel />
      <PressCubes />
      <Projects />
      <People />
      <InteractiveCubes />
      <FinalCTA />

      <Tweaks visible={tweaksVisible} />
    </>
  );
}
