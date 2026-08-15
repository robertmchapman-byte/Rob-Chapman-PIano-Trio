/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, ReactNode, ChangeEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Music, Home, Info, Menu, X, Video, Volume2, ExternalLink, Upload, RefreshCw } from 'lucide-react';
import { saveTrackAudio, getAllStoredTracks, removeTrackAudio } from './utils/audioStorage';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Listen', path: '/audio' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[#0a0a0a]/40 backdrop-blur-sm border-b border-stone-900/30 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="group flex flex-col">
              <span className="font-serif font-light text-base md:text-lg tracking-[0.15em] text-stone-100 group-hover:text-[#c5a880] transition-colors duration-500 uppercase">
                Rob Chapman
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-stone-400 uppercase mt-0.5 group-hover:text-stone-300 transition-colors duration-500">
                Pianist & Composer
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-mono text-[10px] tracking-[0.3em] uppercase transition-colors duration-300 relative py-2 ${
                  location.pathname === link.path 
                    ? 'text-[#c5a880]' 
                    : 'text-stone-400 hover:text-stone-100'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="activeIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#c5a880]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-300 hover:text-[#c5a880] transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} className="stroke-[1.5]" /> : <Menu size={20} className="stroke-[1.5]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0a0a0a]/95 border-b border-stone-900/60 overflow-hidden backdrop-blur-md"
          >
            <div className="px-6 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 font-mono text-xs tracking-[0.25em] uppercase border-b border-stone-900/40 ${
                    location.pathname === link.path
                      ? 'text-[#c5a880] pl-2'
                      : 'text-stone-400 hover:text-stone-100'
                  } transition-all duration-300`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PageWrapper = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="pt-32 pb-24 px-6 sm:px-10 lg:px-16 max-w-5xl mx-auto"
  >
    {children}
  </motion.div>
);

// --- Data ---

const mediaItems = [
  {
    id: 'a4',
    type: 'audio',
    title: "Inside a Silent Tear",
    artist: 'Rob Chapman Trio',
    url: '/audio/InsideASilentTear.mp3',
    duration: '6:45',
    category: 'Blossom Dearie',
    fileName: 'InsideASilentTear.mp3'
  },
  {
    id: 'a3',
    type: 'audio',
    title: 'Interlude 1',
    artist: 'Rob Chapman Trio',
    url: '/audio/Interlude1.mp3',
    duration: '5:42',
    category: 'Rob Chapman',
    fileName: 'Interlude1.mp3'
  },
  {
    id: 'a1',
    type: 'audio',
    title: 'Erikesque',
    artist: 'Rob Chapman Trio',
    url: '/audio/Erikesque.mp3',
    duration: '6:12',
    category: 'Rob Chapman',
    fileName: 'Erikesque.mp3'
  },
  {
    id: 'a2',
    type: 'audio',
    title: 'Late',
    artist: 'Rob Chapman Trio',
    url: '/audio/Late.mp3',
    duration: '7:05',
    category: 'Rob Chapman',
    fileName: 'Late.mp3'
  },
  {
    id: 'a5',
    type: 'audio',
    title: 'Lover',
    artist: 'Rob Chapman Trio',
    url: '/audio/Lover.mp3',
    duration: '5:18',
    category: 'Richard Rogers',
    fileName: 'Lover.mp3'
  },
  {
    id: 'a6',
    type: 'audio',
    title: 'A nightingale sang in Berkeley Square',
    artist: 'Rob Chapman Trio',
    url: '/audio/ANightingaleSangInBerkeleySquare.mp3',
    duration: '4:32',
    category: 'manning Sherwin',
    fileName: 'ANightingaleSangInBerkeleySquare.mp3'
  },
  {
    id: 'a7',
    type: 'audio',
    title: 'Elsa',
    artist: 'Rob Chapman Trio',
    url: '/audio/Elsa.mp3',
    duration: '5:54',
    category: 'Earl Zindars',
    fileName: 'Elsa.mp3'
  },
  {
    id: 'a8',
    type: 'audio',
    title: 'Sometime Ago',
    artist: 'Rob Chapman Trio',
    url: '/audio/SometimeAgo.mp3',
    duration: '6:20',
    category: 'Rob Chapman',
    fileName: 'SometimeAgo.mp3'
  },
  {
    id: 'a9',
    type: 'audio',
    title: 'Interlude 2',
    artist: 'Rob Chapman Trio',
    url: '/audio/Interlude2.mp3',
    duration: '3:45',
    category: 'Rob Chapman',
    fileName: 'Interlude2.mp3'
  },
  {
    id: 'a10',
    type: 'audio',
    title: 'New Autumn',
    artist: 'Rob Chapman Trio',
    url: '/audio/NewAutumn.mp3',
    duration: '6:05',
    category: 'Rob Chapman',
    fileName: 'NewAutumn.mp3'
  },
  {
    id: 'a11',
    type: 'audio',
    title: 'Nardis',
    artist: 'Rob Chapman Trio',
    url: '/audio/Nardis.mp3',
    duration: '5:12',
    category: 'Bill Evans/Miles Davis',
    fileName: 'Nardis.mp3'
  },
  {
    id: 'a12',
    type: 'audio',
    title: 'High Time',
    artist: 'Rob Chapman Trio',
    url: '/audio/HighTime.mp3',
    duration: '4:47',
    category: 'Rob Chapman',
    fileName: 'HighTime.mp3'
  },
  {
    id: 'a13',
    type: 'audio',
    title: 'Quiet corner waltz',
    artist: 'Rob Chapman Trio',
    url: '/audio/QuietCornerWaltz.mp3',
    duration: '5:23',
    category: 'Rob Chapman',
    fileName: 'QuietCornerWaltz.mp3'
  },
  {
    id: 'a14',
    type: 'audio',
    title: 'Soul eyes',
    artist: 'Rob Chapman Trio',
    url: '/audio/SoulEyes.mp3',
    duration: '6:10',
    category: 'Mal Waldron',
    fileName: 'SoulEyes.mp3'
  },
  {
    id: 'a15',
    type: 'audio',
    title: 'Tracked',
    artist: 'Rob Chapman Trio',
    url: '/audio/Tracked.mp3',
    duration: '5:48',
    category: 'Rob Chapman',
    fileName: 'Tracked.mp3'
  },
  {
    id: 'a16',
    type: 'audio',
    title: 'The shadow',
    artist: 'Rob Chapman Trio',
    url: '/audio/TheShadow.mp3',
    duration: '4:15',
    category: 'Rob Chapman',
    fileName: 'TheShadow.mp3'
  },
  {
    id: 'a17',
    type: 'audio',
    title: 'Between',
    artist: 'Rob Chapman Trio',
    url: '/audio/Between.mp3',
    duration: '5:30',
    category: 'Rob Chapman',
    fileName: 'Between.mp3'
  },
  {
    id: 'a18',
    type: 'audio',
    title: 'The nearness of you',
    artist: 'Rob Chapman Trio',
    url: '/audio/TheNearnessOfYou.mp3',
    duration: '6:15',
    category: 'Hoagy Carmichael/Ned Washington',
    fileName: 'TheNearnessOfYou.mp3'
  },
  {
    id: 'a19',
    type: 'audio',
    title: 'Lord of All Hopefulness',
    artist: 'Rob Chapman Trio',
    url: '/audio/LordOfAllHopefulness.mp3',
    duration: '5:10',
    category: 'Traditional',
    fileName: 'LordOfAllHopefulness.mp3'
  },
  {
    id: 'a20',
    type: 'audio',
    title: 'September in the Rain',
    artist: 'Rob Chapman Trio',
    url: '/audio/SeptemberInTheRain.mp3',
    duration: '6:30',
    category: 'Harry Warren/Al Dubin',
    fileName: 'SeptemberInTheRain.mp3'
  },
  {
    id: 'a21',
    type: 'audio',
    title: 'United Blues',
    artist: 'Rob Chapman Trio',
    url: '/audio/UnitedBlues.mp3',
    duration: '5:25',
    category: 'Ron Carter',
    fileName: 'UnitedBlues.mp3'
  }
];

// --- Pages ---

const HomePage = () => {
  const location = useLocation();
  const [items, setItems] = useState(mediaItems);
  const [spotifyThumbnail, setSpotifyThumbnail] = useState<string>('/src/assets/images/static_shock_cover_1783285464767.jpg');

  // Load saved audio defaults on app initialization
  useEffect(() => {
    getAllStoredTracks().then(storedMap => {
      if (Object.keys(storedMap).length > 0) {
        setItems(prev => prev.map(item => {
          if (storedMap[item.id]) {
            return {
              ...item,
              url: storedMap[item.id].blobUrl,
              fileName: storedMap[item.id].fileName,
              isLocal: true
            };
          }
          return item;
        }));
      }
    });
  }, []);

  useEffect(() => {
    fetch('https://open.spotify.com/oembed?url=https://open.spotify.com/album/3czF7L3NNAfOouBcjgCmYn')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch oEmbed metadata');
        return res.json();
      })
      .then(data => {
        if (data && data.thumbnail_url) {
          setSpotifyThumbnail(data.thumbnail_url);
        }
      })
      .catch(err => {
        console.warn('Could not load Spotify thumbnail dynamically:', err);
      });
  }, []);

  const handleAudioUpload = async (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileNameLower = file.name.toLowerCase();
    const isInsideSilentTear = fileNameLower.includes('inside') || fileNameLower.includes('silent') || fileNameLower.includes('tear') || fileNameLower.includes('ä');
    const isInterlude1 = fileNameLower.includes('interlude1') || fileNameLower.includes('interlude 1') || fileNameLower.includes('interlude_1');
    const targetId = isInsideSilentTear ? 'a4' : (isInterlude1 ? 'a3' : id);

    // Save audio persistently in IndexedDB so it becomes the default track for this browser
    const persistentUrl = await saveTrackAudio(targetId, file);

    setItems(prev => prev.map(item => {
      if (item.id === targetId) {
        return {
          ...item,
          url: persistentUrl,
          isLocal: true,
          fileName: file.name
        };
      }
      return item;
    }));
  };

  const handleResetAudio = async (id: string) => {
    await removeTrackAudio(id);
    const original = mediaItems.find(m => m.id === id);
    if (original) {
      setItems(prev => prev.map(item => {
        if (item.id === id) {
          return {
            ...original
          };
        }
        return item;
      }));
    }
  };

  const handleVideoUpload = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          url: fileUrl,
          isLocal: true,
          fileName: file.name
        };
      }
      return item;
    }));
  };

  useEffect(() => {
    if (location.pathname === '/audio') {
      const element = document.getElementById('media-section');
      if (element) {
        // Delay slightly to ensure layout and AnimatePresence completes
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else if (location.pathname === '/about') {
      const element = document.getElementById('about-section');
      if (element) {
        // Delay slightly to ensure layout and AnimatePresence completes
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else if (location.pathname === '/reviews') {
      const element = document.getElementById('reviews-section');
      if (element) {
        // Delay slightly to ensure layout and AnimatePresence completes
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else if (location.pathname === '/contact') {
      const element = document.getElementById('contact-section');
      if (element) {
        // Delay slightly to ensure layout and AnimatePresence completes
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col pt-20">
      {/* Top Section with Spacer and the Right Hand Third Box */}
      <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-end flex-grow min-h-[95vh]">
        {/* Generous spacer to push content down to the visual mid-point of the background (aligning below the hand) */}
        <div className="h-[47vh] md:h-[55vh]" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 w-full items-center pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-7 lg:col-span-8 relative z-20"
          >
            <p className="text-stone-200 font-serif font-light text-[16px] md:text-[18px] lg:text-[22px] leading-relaxed italic">
              "Together with double bassist Damien Varaillon and drummer Guilhem Flouzat, the trio constructs a spacious soundscape where interplay is key. This performance, captured in the warmth of the studio, highlights an organic yet structured approach to improvisation and creates a living, breathing dialogue where varying moods intersect and take unexpected turns."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-1 md:col-span-5 lg:col-span-4 p-6 md:p-8 md:pb-12 relative z-20 md:border-l md:border-stone-800/40"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#c5a880] block mb-2">
              New Album - Piano Trio
            </span>
            <h3 className="font-serif italic text-[22px] text-stone-100 font-light mb-4 tracking-wide leading-snug">
              Three's Company
            </h3>
            <p className="text-stone-300 font-light text-[13px] leading-relaxed">
              In his latest project, Rob Chapman explores the intimacy of the piano trio. Check out extracts from this recording{' '}
              <button
                onClick={() => {
                  document.getElementById('media-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#c5a880] hover:text-[#e2cbb0] underline cursor-pointer inline transition-colors"
              >
                here
              </button>
              .
            </p>
          </motion.div>
        </div>
      </div>

      {/* Proposed Different Background for the Media Section */}
      <div 
        id="media-section" 
        className="w-full bg-gradient-to-b from-[#0f0e0c] via-[#141210] to-[#0a0908] border-t border-stone-900/60 py-24 relative overflow-hidden z-10"
      >
        {/* Decorative ambient radial golden aura to add depth and separate visual layers */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#c5a880]/3 blur-[160px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 relative z-20">
          <div className="space-y-24">
            {/* Audio Section */}
            <div className="space-y-12">
              <div className="border-b border-stone-800/40 pb-4">
                <h3 className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#c5a880]/80">Recordings</h3>
                <p className="text-stone-300 font-serif font-light italic text-lg mt-1 tracking-wide">New Release - Three's Company</p>
              </div>

              <div className="space-y-1">
                {items.filter(item => item.type === 'audio').map((item) => (
                  <div 
                    key={item.id} 
                    className="group py-6 border-b border-stone-900/40 hover:border-stone-800 transition-colors duration-300 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                  >
                    <div className="md:col-span-1 hidden md:block">
                      <Play className="text-stone-600 group-hover:text-[#c5a880] transition-colors duration-300" size={16} />
                    </div>
                    <div className="md:col-span-5">
                      <h4 className="text-lg font-serif font-light text-stone-200 group-hover:text-stone-100 tracking-wide transition-colors duration-300">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-500">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-mono text-[10px] tracking-wider text-stone-400">{item.artist}</span>
                    </div>
                    <div className="md:col-span-4 flex items-center justify-between gap-4">
                      <span className="font-mono text-[10px] tracking-wider text-stone-500">
                        {item.duration}
                      </span>
                      <div className="flex items-center flex-grow justify-end">
                        <audio 
                          key={item.url}
                          src={item.url} 
                          controls 
                          preload="metadata"
                          onError={(e) => {
                            const target = e.currentTarget;
                            const currentSrc = target.src;
                            const lowerSrc = currentSrc.toLowerCase();
                            if (currentSrc !== lowerSrc) {
                              target.src = lowerSrc;
                            }
                          }}
                          className="h-8 accent-[#c5a880] opacity-50 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300 filter invert brightness-95 max-w-[160px] md:max-w-[220px]"
                        >
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Previous recordings Section */}
              <div className="mt-12 pt-8 border-t border-stone-900/40">
                <h4 className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#c5a880]/80 mb-6">
                  Previous recordings
                </h4>
                <div className="p-6 bg-stone-950/20 border border-stone-900/60 transition-all duration-500 hover:border-stone-800/80 relative group/recording">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="flex items-start gap-5">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-stone-900 overflow-hidden border border-stone-800/80 group-hover/recording:border-stone-700/80 transition-all duration-500 mt-1">
                        <img 
                          src={spotifyThumbnail} 
                          alt="Static Shock Album Cover" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/recording:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-serif italic text-xl text-stone-200 tracking-wide">
                          Static Shock
                        </h5>
                        <p className="text-stone-400 font-light text-xs mt-1.5 leading-relaxed">
                          An album by Sam Coombes and Rob Chapman.
                        </p>
                      </div>
                    </div>
                    <a 
                      href="https://open.spotify.com/album/3czF7L3NNAfOouBcjgCmYn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase border border-stone-800 hover:border-stone-500 text-stone-400 hover:text-stone-100 px-5 py-3 transition-all duration-300 self-start sm:self-auto"
                    >
                      <ExternalLink size={12} className="text-[#c5a880]" />
                      Listen on Spotify
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div 
        id="reviews-section" 
        className="w-full bg-[#070707] border-t border-stone-900/50 py-24 relative overflow-hidden z-10"
      >
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#c5a880]/2 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 relative z-20">
          <div className="space-y-16">
            <div className="max-w-2xl">
              <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c5a880]/80">Previous Reviews & Press for "Static Shock"</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Review 1 */}
              <div className="p-5 bg-stone-950/40 border border-stone-900/60 rounded-sm hover:border-stone-800/80 transition-all duration-500 flex flex-col justify-between h-full group">
                <div className="space-y-3">
                  <span className="text-[#c5a880] text-2xl font-serif leading-none block">“</span>
                  <p className="text-stone-200 font-light text-[13px] leading-relaxed italic">
                    "Sam Coombes and Rob Chapman can certainly play their instruments. From the opening track their is never a doubt regarding their technical command. They are also obviously well versed in the modern jazz vernacular, having absorbed the innovations promulgated by the bands of Miles Davis and John Coltrane, with seasoning from the Art Blakey/Horace Silver axis as well."
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-stone-900/40 flex justify-between items-center">
                  <div>
                    <span className="font-serif italic text-xs text-stone-300 block">Bob Blumenthal</span>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="p-5 bg-stone-950/40 border border-stone-900/60 rounded-sm hover:border-stone-800/80 transition-all duration-500 flex flex-col justify-between h-full group">
                <div className="space-y-3">
                  <span className="text-[#c5a880] text-2xl font-serif leading-none block">“</span>
                  <p className="text-stone-200 font-light text-[13px] leading-relaxed italic">
                    "This is the hard edge of hard-bop...Coombes and Chapman are obviously well-versed in the New York school of modern jazz..."
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-stone-900/40 flex justify-between items-center">
                  <div>
                    <span className="font-serif italic text-xs text-stone-300 block">Jazz World</span>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="p-5 bg-stone-950/40 border border-stone-900/60 rounded-sm hover:border-stone-800/80 transition-all duration-500 flex flex-col justify-between h-full group">
                <div className="space-y-3">
                  <span className="text-[#c5a880] text-2xl font-serif leading-none block">“</span>
                  <p className="text-stone-200 font-light text-[13px] leading-relaxed italic">
                    "L'aisance lyrique de Coombes est heuresement rehausée par le swing Hancockien et souple de Chapman. (Coombes's lyrical style is supported by Chapman's supple assured swing, somewhat reminiscent of Herbie Hancock.)"
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-stone-900/40 flex justify-between items-center">
                  <div>
                    <span className="font-serif italic text-xs text-stone-300 block">Jazz Hot</span>
                  </div>
                </div>
              </div>

              {/* Review 4 */}
              <div className="p-5 bg-stone-950/40 border border-stone-900/60 rounded-sm hover:border-stone-800/80 transition-all duration-500 flex flex-col justify-between h-full group">
                <div className="space-y-3">
                  <span className="text-[#c5a880] text-2xl font-serif leading-none block">“</span>
                  <p className="text-stone-200 font-light text-[13px] leading-relaxed italic">
                    "...cracking new CD Static Shock"
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-stone-900/40 flex justify-between items-center">
                  <div>
                    <span className="font-serif italic text-xs text-stone-300 block">Time Out</span>
                  </div>
                </div>
              </div>

              {/* Review 5 */}
              <div className="p-5 bg-stone-950/40 border border-stone-900/60 rounded-sm hover:border-stone-800/80 transition-all duration-500 flex flex-col justify-between h-full group">
                <div className="space-y-3">
                  <span className="text-[#c5a880] text-2xl font-serif leading-none block">“</span>
                  <p className="text-stone-200 font-light text-[13px] leading-relaxed italic">
                    "avant tout un vrai disque de jazz pur et dur...Assurément les garçons ont mis la barre très haut. (A real jazz hard-core jazz CD...these young guys have really set the bar very high.)"
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-stone-900/40 flex justify-between items-center">
                  <div>
                    <span className="font-serif italic text-xs text-stone-300 block">Dernières Nouvelles du Jazz</span>
                  </div>
                </div>
              </div>

              {/* Review 6 */}
              <div className="p-5 bg-stone-950/40 border border-stone-900/60 rounded-sm hover:border-stone-800/80 transition-all duration-500 flex flex-col justify-between h-full group">
                <div className="space-y-3">
                  <span className="text-[#c5a880] text-2xl font-serif leading-none block">“</span>
                  <p className="text-stone-200 font-light text-[13px] leading-relaxed italic">
                    "L'imprévu peut vous surprendre à chaque nouvelle mesure. Pour le grand grand plaisir de l'écoute. (The unexpected takes the listener by surprise measure by measure. A real joy to listen listen to.)"
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-stone-900/40 flex justify-between items-center">
                  <div>
                    <span className="font-serif italic text-xs text-stone-300 block">Vincent Fertey, Musicalité.net</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section with a Different Background */}
      <div 
        id="about-section" 
        className="w-full bg-gradient-to-b from-[#08090a] to-[#0c0d0e] border-t border-stone-900/50 py-24 relative overflow-hidden z-10"
      >
        {/* Subtle cool highlight to give deep space aesthetics */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#c5a880]/1 blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 relative z-20">
          <div className="space-y-20">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c5a880]/80">Biography</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-100 mt-3 tracking-wide italic">Rob Chapman - Pianist</h2>
            </div>

            <div className="aspect-[16/7] overflow-hidden border border-stone-900 bg-stone-950">
              <img
                src="https://i.postimg.cc/YqqQYG6f/home-bg.jpg"
                alt="Rob Chapman in Studio"
                className="w-full h-full object-cover opacity-85 hover:opacity-100 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pt-4">
              {/* Quote Column */}
              <div className="md:col-span-5 space-y-6">
                <blockquote className="border-l-2 border-[#c5a880]/40 pl-6 space-y-2">
                  <p className="font-serif italic text-2xl text-stone-300 leading-normal font-light">
                    "The trio format is the perfect setting to explore harmony, leaving room for immediate interplay and a dialogue of ideas"
                  </p>
                  <cite className="font-mono text-[9px] tracking-[0.2em] uppercase text-stone-500 block">
                    — Rob Chapman
                  </cite>
                </blockquote>
              </div>

              {/* Narrative Column */}
              <div className="md:col-span-7 space-y-8 text-stone-300 font-light text-base leading-relaxed">
                <p>
                  Back in the early 2000s, pianist Rob Chapman co-led a quartet with saxophonist Sam Coombes. With bassist Mauro Gargano and drummer Frédéric Delestré this quartet explored varying soundscapes of the modern jazz quartet. The work of the quartet led to an album <em>Static Shock</em> (published on the Elabeth label) and a series of concert dates including such venues as the Duc des Lombards, Radio France (Paris), and Pizza Express Jazz Club (London).
                </p>
                <p>
                  After a period away from recording, Rob Chapman now explores some of the vast array of musical possibilities within the intimate setting of piano trio. Rob’s recent piano trio session highlights his personal voice in contemporary acoustic jazz. Guided by the rich traditions of the piano trio and drawing on inspiration from masters such as Bill Evans and Herbie Hancock, the trio contrasts deep introspection with daring improvisation. It displays an intimate dialogue between structure and freedom, where compositions serve as starting points for sonic exploration. Each member brings a singular warmth and precision, creating a unified trio sound that is rich with dynamic range, and emotional depth.
                </p>
                
                <div className="pt-8 border-t border-stone-900/50">
                  <Link 
                    to="/contact"
                    className="inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.25em] uppercase border border-stone-800 hover:border-stone-500 text-stone-400 hover:text-stone-100 px-5 py-3 transition-all duration-300"
                  >
                    Contact & Bookings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div 
        id="contact-section" 
        className="w-full bg-[#0a0a0a] border-t border-stone-900/50 py-24 relative overflow-hidden z-10"
      >
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-[#c5a880]/2 blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 relative z-20">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c5a880]/80">Contact</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-stone-100 tracking-wide italic">Inquiries & Bookings</h2>
              <p className="text-stone-400 font-light max-w-lg mx-auto text-sm leading-relaxed">
                For worldwide booking, masterclasses, collaborations, and press inquiries, please reach out directly or send an email.
              </p>
            </div>

            <div className="p-8 md:p-12 bg-stone-950/40 border border-stone-900/60 rounded-sm max-w-xl mx-auto transition-all duration-500 hover:border-stone-800/80">
              <div className="space-y-6">
                <p className="font-mono text-[10px] tracking-widest text-[#c5a880] uppercase">Direct Email</p>
                <a 
                  href="mailto:robert.m.chapman@gmail.com"
                  className="font-serif italic text-2xl md:text-3xl text-stone-200 hover:text-[#c5a880] transition-colors duration-300 block tracking-wide"
                >
                  robert.m.chapman@gmail.com
                </a>
                <p className="text-stone-500 font-light text-xs">
                  We aim to respond to all inquiries within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Background = () => {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/audio' || location.pathname === '/about' || location.pathname === '/reviews' || location.pathname === '/contact';

  return (
    <>
      {/* Background Image Layer */}
      <div 
        className={`${isHome ? 'absolute top-0 left-0 w-full h-[110vh]' : 'fixed inset-0'} z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000`}
        style={{ 
          backgroundImage: isHome 
            ? 'url("https://i.postimg.cc/YqqQYG6f/home-bg.jpg")' 
            : 'url("https://images.unsplash.com/photo-1513883049090-d0b7439799bf?auto=format&fit=crop&q=80&w=1920")',
          backgroundColor: '#0a0a0a',
          opacity: isHome ? 1 : 0.15,
          filter: isHome ? 'none' : 'grayscale(1) brightness(0.2) contrast(1.1)'
        }}
      />
      
      {/* Subtle Dark Vignette Overlay */}
      <div 
        className={`${isHome ? 'absolute top-0 left-0 w-full h-[110vh]' : 'fixed inset-0'} z-0 bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a] pointer-events-none`} 
      />
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans text-stone-100 selection:bg-stone-800 selection:text-[#c5a880] relative">
      <Background />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/audio" element={<HomePage />} />
              <Route path="/about" element={<HomePage />} />
              <Route path="/reviews" element={<HomePage />} />
              <Route path="/contact" element={<HomePage />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <footer className="border-t border-stone-900/40 bg-[#0a0a0a]/80 backdrop-blur-sm py-16 mt-32 relative z-20">
          <div className="max-w-5xl mx-auto px-6 text-center space-y-4">
            <span className="font-serif font-light text-stone-200 tracking-[0.2em] text-xs uppercase block">
              Rob Chapman Piano Trio
            </span>
            <a 
              href="mailto:robert.m.chapman@gmail.com" 
              className="font-serif font-light text-stone-200 hover:text-white transition-colors block text-xs tracking-widest"
            >
              robert.m.chapman@gmail.com
            </a>
            <p className="text-stone-500 font-mono text-[9px] tracking-widest uppercase">
              © {new Date().getFullYear()} Rob Chapman. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

