import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UniverseForAmisha from './pages/UniverseForAmisha';

// Components
import CursorEffects from './components/CursorEffects';
import SakuraPetals from './components/SakuraPetals';
import DarkModeToggle from './components/DarkModeToggle';
import AmbientMusic from './components/AmbientMusic';
import CinematicIntro from './components/CinematicIntro';

// Pages
import LandingPage from './pages/LandingPage';
import PasscodePage from './pages/PasscodePage';
import LoadingPage from './pages/LoadingPage';
import MainMenu from './pages/MainMenu';
import LoveLetter from './pages/LoveLetter';
import MemoryGallery from './pages/MemoryGallery';
import Playlist from './pages/Playlist';
import Timeline from './pages/Timeline';
import ChatMemories from './pages/ChatMemories';
import TimeCapsule from './pages/TimeCapsule';
import HeartBreakout from './pages/HeartBreakout';
import BirthdaySurprise from './pages/BirthdaySurprise';

type Page =
  | 'landing'
  | 'passcode'
  | 'loading'
  | 'menu'
  | 'letter'
  | 'memories'
  | 'playlist'
  | 'timeline'
  | 'chat'
  | 'capsule'
  | 'game'
  | 'birthday';

// Check if today is the birthday (June 10 as example - change as needed)
function isBirthday() {
  const now = new Date();
  return now.getMonth() === 5 && now.getDate() === 10; // June 10
}

// Easter egg: click heart logo 5 times to unlock birthday
let easterEggCount = 0;

export default function App() {
  const [page, setPage] = useState<Page>('landing');
  const [dark, setDark] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showBirthday, setShowBirthday] = useState(false);
  const [eggCount, setEggCount] = useState(0);

  useEffect(() => {
    // Check birthday
    if (isBirthday()) {
      setShowBirthday(true);
    }
  }, []);

  const navigate = (p: Page) => setPage(p);

  // Easter egg handler — expose globally for secret trigger
  const handleEasterEgg = () => {
    easterEggCount++;
    setEggCount(easterEggCount);
    if (easterEggCount >= 5) {
      easterEggCount = 0;
      setEggCount(0);
      setShowBirthday(true);
    }
  };

  return (
    <div className="relative min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Cinematic intro */}
      <AnimatePresence>
        {showIntro && (
          <CinematicIntro key="intro" onDone={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Birthday surprise overlay */}
      <AnimatePresence>
        {showBirthday && (
          <BirthdaySurprise
            key="birthday"
            dark={dark}
            onContinue={() => setShowBirthday(false)}
          />
        )}
      </AnimatePresence>

      {/* Global overlay effects */}
      <CursorEffects />
      <SakuraPetals count={12} />
      <DarkModeToggle dark={dark} onToggle={() => setDark(d => !d)} />
      <AmbientMusic />

      {/* Easter egg counter indicator */}
      <AnimatePresence>
        {eggCount > 0 && eggCount < 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-20 left-6 z-50 glass rounded-full px-3 py-1 flex items-center gap-1"
            style={{ border: '1px solid rgba(255,107,157,0.3)' }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-sm" style={{ opacity: i < eggCount ? 1 : 0.2 }}>
                💖
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page transitions */}
      <AnimatePresence mode="wait">
        {page === 'landing' && (
          <LandingPage
            key="landing"
            onEnter={() => navigate('passcode')}
            dark={dark}
            onEasterEgg={handleEasterEgg}
          />
        )}
        {page === 'passcode' && (
          <PasscodePage
            key="passcode"
            onSuccess={() => navigate('loading')}
            dark={dark}
          />
        )}
        {page === 'loading' && (
          <LoadingPage
            key="loading"
            onDone={() => navigate('menu')}
            dark={dark}
          />
        )}
        {page === 'menu' && (
          <MainMenu
            key="menu"
            onNavigate={(s) => navigate(s as Page)}
            dark={dark}
          />
        )}
        {page === 'letter' && (
          <LoveLetter
            key="letter"
            onBack={() => navigate('menu')}
            dark={dark}
          />
        )}
        {page === 'memories' && (
          <MemoryGallery
            key="memories"
            onBack={() => navigate('menu')}
            dark={dark}
          />
        )}
        {page === 'playlist' && (
          <Playlist
            key="playlist"
            onBack={() => navigate('menu')}
            dark={dark}
          />
        )}
        {page === 'timeline' && (
          <Timeline
            key="timeline"
            onBack={() => navigate('menu')}
            dark={dark}
          />
        )}
        {page === 'chat' && (
          <ChatMemories
            key="chat"
            onBack={() => navigate('menu')}
            dark={dark}
          />
        )}
        {page === 'capsule' && (
          <TimeCapsule
            key="capsule"
            onBack={() => navigate('menu')}
            dark={dark}
          />
        )}
        {page === 'game' && (
          <HeartBreakout
            key="game"
            onBack={() => navigate('menu')}
            dark={dark}
          />
        )}
        {page === 'birthday' && (
  <UniverseForAmisha
    key="universe-amisha"
    onFinish={() => navigate('menu')}   // or whatever you want after
  />
)}
{page === 'birthday' && (
  <UniverseForAmisha
    onFinish={() => navigate('menu')}  // or whatever your home/menu page is
  />
)}
      </AnimatePresence>
    </div>
  );
}
