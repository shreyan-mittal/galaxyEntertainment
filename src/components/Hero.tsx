// import { Music2, Sparkles } from 'lucide-react';
// import { useEffect, useState } from 'react';

// function Hero() {
//   const [countUp, setCountUp] = useState({ events: 0, attendees: 0, artists: 0 });

//   useEffect(() => {
//     const duration = 2000;
//     const steps = 60;
//     const eventTarget = 20;
//     const attendeeTarget = 40;
//     const artistTarget = 10;

//     let step = 0;
//     const timer = setInterval(() => {
//       step++;
//       const progress = step / steps;
//       setCountUp({
//         events: Math.floor(eventTarget * progress),
//         attendees: Math.floor(attendeeTarget * progress),
//         artists: Math.floor(artistTarget * progress)
//       });
//       if (step >= steps) clearInterval(timer);
//     }, duration / steps);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <>
//       <style>{`
//         @keyframes spotlight-sweep {
//           0% {
//             transform: translateX(-100%) skewX(-20deg);
//             opacity: 0;
//           }
//           20% {
//             opacity: 0.6;
//           }
//           100% {
//             transform: translateX(200%) skewX(-20deg);
//             opacity: 0;
//           }
//         }

//         @keyframes light-beam {
//           0%, 100% {
//             opacity: 0.3;
//             transform: translateY(0) scaleY(1);
//           }
//           50% {
//             opacity: 0.7;
//             transform: translateY(-20px) scaleY(1.1);
//           }
//         }

//         @keyframes float-up {
//           0% {
//             transform: translateY(0) rotate(0deg);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           90% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-100vh) rotate(180deg);
//             opacity: 0;
//           }
//         }

//         @keyframes confetti-fall {
//           0% {
//             transform: translateY(-100vh) rotate(0deg);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           90% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(100vh) rotate(720deg);
//             opacity: 0;
//           }
//         }

//         @keyframes pulse-rhythm {
//           0%, 100% {
//             transform: scale(1);
//             opacity: 0.6;
//           }
//           50% {
//             transform: scale(1.3);
//             opacity: 1;
//           }
//         }

//         @keyframes sound-wave {
//           0%, 100% {
//             transform: scaleY(0.5);
//             opacity: 0.4;
//           }
//           50% {
//             transform: scaleY(1.5);
//             opacity: 1;
//           }
//         }

//         @keyframes fade-in-up {
//           0% {
//             opacity: 0;
//             transform: translateY(50px);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes glow-pulse {
//           0%, 100% {
//             filter: drop-shadow(0 0 20px currentColor);
//           }
//           50% {
//             filter: drop-shadow(0 0 40px currentColor);
//           }
//         }

//         @keyframes stage-light-rotate {
//           0% {
//             transform: rotate(0deg);
//           }
//           100% {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes shimmer {
//           0% {
//             background-position: -200% center;
//           }
//           100% {
//             background-position: 200% center;
//           }
//         }

//         @keyframes bounce-slow {
//           0%, 100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }

//         @keyframes music-note-float {
//           0% {
//             transform: translateY(100vh) translateX(0) rotate(0deg) scale(0);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//             transform: translateY(90vh) translateX(10px) rotate(45deg) scale(1);
//           }
//           90% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(-10vh) translateX(-30px) rotate(180deg) scale(0.8);
//             opacity: 0;
//           }
//         }

//         @keyframes laser-sweep {
//           0% {
//             transform: translateX(-100%);
//             opacity: 0;
//           }
//           50% {
//             opacity: 1;
//           }
//           100% {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//         }

//         .animate-spotlight-sweep { animation: spotlight-sweep 8s ease-in-out infinite; }
//         .animate-light-beam { animation: light-beam 3s ease-in-out infinite; }
//         .animate-float-up { animation: float-up 15s linear infinite; }
//         .animate-confetti-fall { animation: confetti-fall 8s linear infinite; }
//         .animate-pulse-rhythm { animation: pulse-rhythm 1.5s ease-in-out infinite; }
//         .animate-sound-wave { animation: sound-wave 1s ease-in-out infinite; }
//         .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
//         .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
//         .animate-stage-light-rotate { animation: stage-light-rotate 20s linear infinite; }
//         .animate-shimmer { animation: shimmer 3s linear infinite; }
//         .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
//         .animate-music-note-float { animation: music-note-float 12s linear infinite; }
//         .animate-laser-sweep { animation: laser-sweep 4s ease-in-out infinite; }
//       `}</style>

//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         {/* Audience Background Image */}
//         <div
//           className="absolute inset-0 bg-cover bg-[center_30%] sm:bg-center bg-no-repeat"
//           style={{
//             backgroundImage: 'url(https://images.pexels.com/photos/1120162/pexels-photo-1120162.jpeg?auto=compress&cs=tinysrgb&w=1920)',
//           }}
//         ></div>

//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85"></div>

//         {/* Spotlight Sweeps */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div
//             className="absolute top-0 left-0 w-[300px] h-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent animate-spotlight-sweep"
//             style={{ animationDelay: '0s' }}
//           ></div>
//           <div
//             className="absolute top-0 left-0 w-[300px] h-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-spotlight-sweep"
//             style={{ animationDelay: '3s' }}
//           ></div>
//           <div
//             className="absolute top-0 left-0 w-[300px] h-full bg-gradient-to-r from-transparent via-pink-500/30 to-transparent animate-spotlight-sweep"
//             style={{ animationDelay: '6s' }}
//           ></div>
//         </div>

//         {/* Stage Light Beams */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
//           {[...Array(8)].map((_, i) => (
//             <div
//               key={`beam-${i}`}
//               className="absolute bottom-0 w-32 h-full bg-gradient-to-t from-amber-400/50 via-amber-400/20 to-transparent animate-light-beam"
//               style={{
//                 left: `${(i * 12) + 5}%`,
//                 animationDelay: `${i * 0.2}s`,
//                 animationDuration: `${2.5 + (i % 3) * 0.5}s`,
//                 transform: `skewX(${-10 + (i % 3) * 10}deg)`,
//               }}
//             ></div>
//           ))}
//         </div>

//         {/* Colorful Stage Lights from top */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-20 left-1/4 w-64 h-64 bg-blue-500/40 rounded-full blur-3xl animate-pulse-rhythm"></div>
//           <div className="absolute -top-20 right-1/4 w-64 h-64 bg-pink-500/40 rounded-full blur-3xl animate-pulse-rhythm" style={{ animationDelay: '0.5s' }}></div>
//           <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/40 rounded-full blur-3xl animate-pulse-rhythm" style={{ animationDelay: '1s' }}></div>
//         </div>

//         {/* Confetti Particles */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(30)].map((_, i) => (
//             <div
//               key={`confetti-${i}`}
//               className="absolute w-3 h-3 animate-confetti-fall"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 8}s`,
//                 animationDuration: `${6 + Math.random() * 4}s`,
//                 backgroundColor: ['#fbbf24', '#ec4899', '#3b82f6', '#10b981', '#f97316'][Math.floor(Math.random() * 5)],
//                 opacity: 0.7,
//               }}
//             ></div>
//           ))}
//         </div>

//         {/* Music Notes */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={`note-${i}`}
//               className="absolute animate-music-note-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 10}s`,
//                 animationDuration: `${10 + Math.random() * 5}s`,
//               }}
//             >
//               <Music2
//                 className="w-6 h-6"
//                 style={{
//                   color: ['#fbbf24', '#ec4899', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)],
//                   opacity: 0.6
//                 }}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Music Emojis Falling */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {['🎵', '🎶', '🎸', '🎤', '🎧', '🎹', '🥁', '🎺', '🎻', '🎼', '🎷', '🪕', '🎙️', '🔊', '📻'].map((emoji, i) => (
//             <div
//               key={`emoji-${i}`}
//               className="absolute text-3xl sm:text-4xl animate-confetti-fall"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 8}s`,
//                 animationDuration: `${6 + Math.random() * 4}s`,
//                 opacity: 0.8,
//               }}
//             >
//               {emoji}
//             </div>
//           ))}
//         </div>

//         {/* Additional Music Emojis with Different Animation */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {['🎵', '🎶', '🎸', '🎤', '🎧', '🎹', '🥁', '🎺', '🎻', '🎼'].map((emoji, i) => (
//             <div
//               key={`emoji-float-${i}`}
//               className="absolute text-2xl sm:text-3xl animate-music-note-float"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 12}s`,
//                 animationDuration: `${8 + Math.random() * 6}s`,
//                 opacity: 0.7,
//               }}
//             >
//               {emoji}
//             </div>
//           ))}
//         </div>

//         {/* Sound Wave Bars */}
//         <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 h-32 pointer-events-none opacity-30">
//           {[...Array(40)].map((_, i) => (
//             <div
//               key={`wave-${i}`}
//               className="w-2 bg-gradient-to-t from-amber-500 to-orange-500 rounded-t animate-sound-wave"
//               style={{
//                 animationDelay: `${i * 0.05}s`,
//                 animationDuration: `${0.8 + (i % 5) * 0.1}s`,
//               }}
//             ></div>
//           ))}
//         </div>

//         {/* Laser Effects */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-sweep opacity-60" style={{ animationDelay: '0s' }}></div>
//           <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-laser-sweep opacity-60" style={{ animationDelay: '2s' }}></div>
//         </div>

//         {/* Rotating Stage Light Effect */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animate-stage-light-rotate">
//             <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent blur-sm"></div>
//             <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent blur-sm transform rotate-90"></div>
//           </div>
//         </div>

//         {/* Floating Sparkles */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(15)].map((_, i) => (
//             <div
//               key={`sparkle-${i}`}
//               className="absolute animate-float-up"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 15}s`,
//                 animationDuration: `${12 + Math.random() * 6}s`,
//               }}
//             >
//               <Sparkles
//                 className="w-4 h-4"
//                 style={{
//                   color: ['#fbbf24', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 3)],
//                   opacity: 0.8
//                 }}
//               />
//             </div>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-40 sm:pt-0">
//           <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-3 sm:gap-0 opacity-0 animate-fade-in-up">
//             <Music2 className="w-10 h-10 sm:w-14 sm:h-14 text-amber-400 sm:mr-4 animate-bounce-slow" />
//             <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-2xl">
//               <span className="inline-block">Galaxy</span>{' '}
//               <span
//                 className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 animate-shimmer"
//                 style={{ backgroundSize: '200% auto' }}
//               >
//                 Entertainment
//               </span>
//             </h1>
//             <Music2 className="w-10 h-10 sm:w-14 sm:h-14 text-amber-400 sm:ml-4 animate-bounce-slow" style={{ animationDelay: '0.5s' }} />
//           </div>

//           <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-light mb-8 opacity-0 animate-fade-in-up px-2 drop-shadow-lg" style={{ animationDelay: '0.3s' }}>
//             Bringing India's Biggest Cultural Experiences to{' '}
//             <span className="text-amber-400 font-semibold animate-glow-pulse">Perth</span>
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up px-4" style={{ animationDelay: '0.6s' }}>
//             <a
//               href="#upcoming-events"
//               className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/50 hover:shadow-amber-500/70 text-center overflow-hidden"
//             >
//               <span className="relative z-10">Explore Events</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//             </a>
//             <a
//               href="#contact"
//               className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border-2 border-amber-400 text-white hover:bg-amber-400 hover:text-slate-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-400/50 text-center overflow-hidden"
//             >
//               <span className="relative z-10">Get in Touch</span>
//             </a>
//           </div>

//           <div className="mt-20 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto opacity-0 animate-fade-in-up px-4" style={{ animationDelay: '0.9s' }}>
//             <div className="text-center group hover:scale-110 transition-transform duration-300 bg-black/30 backdrop-blur-sm rounded-lg p-4">
//               <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-1 sm:mb-2 animate-pulse-rhythm">
//                 {countUp.events}+
//               </div>
//               <div className="text-white/90 text-xs sm:text-sm group-hover:text-white transition-colors">Events Hosted</div>
//             </div>
//             <div className="text-center group hover:scale-110 transition-transform duration-300 bg-black/30 backdrop-blur-sm rounded-lg p-4">
//               <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-1 sm:mb-2 animate-pulse-rhythm" style={{ animationDelay: '0.5s' }}>
//                 {countUp.attendees}K+
//               </div>
//               <div className="text-white/90 text-xs sm:text-sm group-hover:text-white transition-colors">Happy Attendees</div>
//             </div>
//             <div className="text-center group hover:scale-110 transition-transform duration-300 bg-black/30 backdrop-blur-sm rounded-lg p-4">
//               <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-1 sm:mb-2 animate-pulse-rhythm" style={{ animationDelay: '1s' }}>
//                 {countUp.artists}+
//               </div>
//               <div className="text-white/90 text-xs sm:text-sm group-hover:text-white transition-colors">Artists Featured</div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
//           <div className="flex flex-col items-center gap-2 animate-bounce-slow">
//             <div className="w-6 h-10 border-2 border-amber-400/70 rounded-full flex items-start justify-center p-2 hover:border-amber-300 transition-colors duration-300 cursor-pointer backdrop-blur-sm bg-black/20">
//               <div className="w-1 h-3 bg-amber-400 rounded-full animate-pulse-rhythm"></div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Hero;



import { Music2, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

function Hero() {
  const [countUp, setCountUp] = useState({ events: 0, attendees: 0, artists: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const eventTarget = 20;
    const attendeeTarget = 40;
    const artistTarget = 10;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCountUp({
        events: Math.floor(eventTarget * progress),
        attendees: Math.floor(attendeeTarget * progress),
        artists: Math.floor(artistTarget * progress)
      });
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes spotlight-sweep {
          0% { transform: translateX(-100%) skewX(-20deg); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateX(200%) skewX(-20deg); opacity: 0; }
        }
        @keyframes light-beam {
          0%, 100% { opacity: 0.3; transform: translateY(0) scaleY(1); }
          50% { opacity: 0.7; transform: translateY(-20px) scaleY(1.1); }
        }
        @keyframes float-up {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(180deg); opacity: 0; }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pulse-rhythm {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes sound-wave {
          0%, 100% { transform: scaleY(0.5); opacity: 0.4; }
          50% { transform: scaleY(1.5); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 20px currentColor); }
          50% { filter: drop-shadow(0 0 40px currentColor); }
        }
        @keyframes stage-light-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes music-note-float {
          0% { transform: translateY(100vh) translateX(0) rotate(0deg) scale(0); opacity: 0; }
          10% { opacity: 1; transform: translateY(90vh) translateX(10px) rotate(45deg) scale(1); }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) translateX(-30px) rotate(180deg) scale(0.8); opacity: 0; }
        }
        @keyframes laser-sweep {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }

        .animate-spotlight-sweep { animation: spotlight-sweep 8s ease-in-out infinite; }
        .animate-light-beam { animation: light-beam 3s ease-in-out infinite; }
        .animate-float-up { animation: float-up 15s linear infinite; }
        .animate-confetti-fall { animation: confetti-fall 8s linear infinite; }
        .animate-pulse-rhythm { animation: pulse-rhythm 1.5s ease-in-out infinite; }
        .animate-sound-wave { animation: sound-wave 1s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .animate-stage-light-rotate { animation: stage-light-rotate 20s linear infinite; }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-music-note-float { animation: music-note-float 12s linear infinite; }
        .animate-laser-sweep { animation: laser-sweep 4s ease-in-out infinite; }
      `}</style>

      {/* ✅ Key change: use 100svh for mobile + tighter spacing */}
      <section className="relative min-h-[100svh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Audience Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-[center_30%] sm:bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1120162/pexels-photo-1120162.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85"></div>

        {/* Spotlight Sweeps */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 left-0 w-[300px] h-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent animate-spotlight-sweep"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="absolute top-0 left-0 w-[300px] h-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-spotlight-sweep"
            style={{ animationDelay: '3s' }}
          ></div>
          <div
            className="absolute top-0 left-0 w-[300px] h-full bg-gradient-to-r from-transparent via-pink-500/30 to-transparent animate-spotlight-sweep"
            style={{ animationDelay: '6s' }}
          ></div>
        </div>

        {/* Stage Light Beams */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {[...Array(8)].map((_, i) => (
            <div
              key={`beam-${i}`}
              className="absolute bottom-0 w-32 h-full bg-gradient-to-t from-amber-400/50 via-amber-400/20 to-transparent animate-light-beam"
              style={{
                left: `${i * 12 + 5}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2.5 + (i % 3) * 0.5}s`,
                transform: `skewX(${-10 + (i % 3) * 10}deg)`,
              }}
            ></div>
          ))}
        </div>

        {/* Colorful Stage Lights from top */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-64 h-64 bg-blue-500/40 rounded-full blur-3xl animate-pulse-rhythm"></div>
          <div
            className="absolute -top-20 right-1/4 w-64 h-64 bg-pink-500/40 rounded-full blur-3xl animate-pulse-rhythm"
            style={{ animationDelay: '0.5s' }}
          ></div>
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/40 rounded-full blur-3xl animate-pulse-rhythm"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        {/* Confetti Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute w-3 h-3 animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
                backgroundColor: ['#fbbf24', '#ec4899', '#3b82f6', '#10b981', '#f97316'][
                  Math.floor(Math.random() * 5)
                ],
                opacity: 0.7,
              }}
            ></div>
          ))}
        </div>

        {/* Music Notes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={`note-${i}`}
              className="absolute animate-music-note-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 5}s`,
              }}
            >
              <Music2
                className="w-6 h-6"
                style={{
                  color: ['#fbbf24', '#ec4899', '#3b82f6', '#10b981'][Math.floor(Math.random() * 4)],
                  opacity: 0.6,
                }}
              />
            </div>
          ))}
        </div>

        {/* Music Emojis Falling */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['🎵', '🎶', '🎸', '🎤', '🎧', '🎹', '🥁', '🎺', '🎻', '🎼', '🎷', '🪕', '🎙️', '🔊', '📻'].map(
            (emoji, i) => (
              <div
                key={`emoji-${i}`}
                className="absolute text-3xl sm:text-4xl animate-confetti-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                  opacity: 0.8,
                }}
              >
                {emoji}
              </div>
            )
          )}
        </div>

        {/* Additional Music Emojis with Different Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['🎵', '🎶', '🎸', '🎤', '🎧', '🎹', '🥁', '🎺', '🎻', '🎼'].map((emoji, i) => (
            <div
              key={`emoji-float-${i}`}
              className="absolute text-2xl sm:text-3xl animate-music-note-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 12}s`,
                animationDuration: `${8 + Math.random() * 6}s`,
                opacity: 0.7,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* Sound Wave Bars */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 h-32 pointer-events-none opacity-30">
          {[...Array(40)].map((_, i) => (
            <div
              key={`wave-${i}`}
              className="w-2 bg-gradient-to-t from-amber-500 to-orange-500 rounded-t animate-sound-wave"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationDuration: `${0.8 + (i % 5) * 0.1}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Laser Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-sweep opacity-60"
            style={{ animationDelay: '0s' }}
          ></div>
          <div
            className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-laser-sweep opacity-60"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        {/* Rotating Stage Light Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animate-stage-light-rotate">
            <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-amber-500/50 via-amber-500/20 to-transparent blur-sm"></div>
            <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent blur-sm transform rotate-90"></div>
          </div>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${12 + Math.random() * 6}s`,
              }}
            >
              <Sparkles
                className="w-4 h-4"
                style={{
                  color: ['#fbbf24', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 3)],
                  opacity: 0.8,
                }}
              />
            </div>
          ))}
        </div>

        {/* ✅ Key change: tighter padding on mobile so stats stay visible */}
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 sm:pt-0">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 gap-2 sm:gap-0 opacity-0 animate-fade-in-up">
            <Music2 className="w-9 h-9 sm:w-14 sm:h-14 text-amber-400 sm:mr-4 animate-bounce-slow" />
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight drop-shadow-2xl">
              <span className="inline-block">Galaxy</span>{' '}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 animate-shimmer"
                style={{ backgroundSize: '200% auto' }}
              >
                Entertainment
              </span>
            </h1>
            <Music2
              className="w-9 h-9 sm:w-14 sm:h-14 text-amber-400 sm:ml-4 animate-bounce-slow"
              style={{ animationDelay: '0.5s' }}
            />
          </div>

          <p
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-light mb-6 sm:mb-8 opacity-0 animate-fade-in-up px-2 drop-shadow-lg"
            style={{ animationDelay: '0.3s' }}
          >
            Bringing India's Biggest Cultural Experiences to{' '}
            <span className="text-amber-400 font-semibold animate-glow-pulse">Perth</span>
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center opacity-0 animate-fade-in-up px-4"
            style={{ animationDelay: '0.6s' }}
          >
            <a
              href="#upcoming-events"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-amber-500/50 hover:shadow-amber-500/70 text-center overflow-hidden"
            >
              <span className="relative z-10">Explore Events</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </a>

            <a
              href="#contact"
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border-2 border-amber-400 text-white hover:bg-amber-400 hover:text-slate-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-400/50 text-center overflow-hidden"
            >
              <span className="relative z-10">Get in Touch</span>
            </a>
          </div>

          {/* ✅ Key change: reduce mt on mobile so stats stay above fold */}
          <div
            className="mt-10 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-8 max-w-3xl mx-auto opacity-0 animate-fade-in-up px-4"
            style={{ animationDelay: '0.9s' }}
          >
            <div className="text-center group hover:scale-110 transition-transform duration-300 bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-1 sm:mb-2 animate-pulse-rhythm">
                {countUp.events}+
              </div>
              <div className="text-white/90 text-[11px] sm:text-sm group-hover:text-white transition-colors">
                Events Hosted
              </div>
            </div>

            <div className="text-center group hover:scale-110 transition-transform duration-300 bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-1 sm:mb-2 animate-pulse-rhythm"
                style={{ animationDelay: '0.5s' }}
              >
                {countUp.attendees}K+
              </div>
              <div className="text-white/90 text-[11px] sm:text-sm group-hover:text-white transition-colors">
                Happy Attendees
              </div>
            </div>

            <div className="text-center group hover:scale-110 transition-transform duration-300 bg-black/30 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-400 mb-1 sm:mb-2 animate-pulse-rhythm"
                style={{ animationDelay: '1s' }}
              >
                {countUp.artists}+
              </div>
              <div className="text-white/90 text-[11px] sm:text-sm group-hover:text-white transition-colors">
                Artists Featured
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 opacity-0 animate-fade-in-up"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="flex flex-col items-center gap-2 animate-bounce-slow">
            <div className="w-6 h-10 border-2 border-amber-400/70 rounded-full flex items-start justify-center p-2 hover:border-amber-300 transition-colors duration-300 cursor-pointer backdrop-blur-sm bg-black/20">
              <div className="w-1 h-3 bg-amber-400 rounded-full animate-pulse-rhythm"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
