import { useState, useRef, MouseEvent } from 'react';

function PastEventsHolographic() {
  const pastEvents = [
    {
      id: 1,
      title: 'Sonu Nigam Show',
      image: '/images/sonu1.jpg',
    },
    {
      id: 2,
      title: 'Sonu Nigam Performance',
      image: '/images/sonu2.jpg',
    },
    {
      id: 3,
      title: 'Live Audience Moments',
      image: '/images/sonu3.jpg',
    },
    {
      id: 4,
      title: 'Kirtidan Gadhvi Garba',
      image: '/images/kirtidhan1.jpg',
    },
    {
      id: 5,
      title: 'Gujjubhai Comedy Night',
      image: '/images/gujjubhai1.jpg',
    },
    {
      id: 6,
      title: 'The Shaan Show',
      image: '/images/shaan3.jpg',
    },
  ];

  const [holoPositions, setHoloPositions] = useState<Record<number, { x: number; y: number }>>({});
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = cardRefs.current[cardId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setHoloPositions(prev => ({
      ...prev,
      [cardId]: { x, y }
    }));
  };

  const handleMouseLeave = (cardId: number) => {
    setHoloPositions(prev => ({
      ...prev,
      [cardId]: { x: 50, y: 50 }
    }));
  };

  return (
    <section id="past-events" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Past <span className="text-gold-500">Events Gallery</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gold-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Move your cursor over the cards to reveal holographic effects
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {pastEvents.map((event) => {
            const pos = holoPositions[event.id] || { x: 50, y: 50 };
            const isHovered = holoPositions[event.id] !== undefined;

            return (
              <div
                key={event.id}
                ref={el => cardRefs.current[event.id] = el}
                className="group relative"
                onMouseMove={(e) => handleMouseMove(e, event.id)}
                onMouseLeave={() => handleMouseLeave(event.id)}
              >
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-105">
                  <div className="relative h-64 sm:h-72 md:h-80 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent"></div>

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
                      style={{
                        background: `
                          radial-gradient(
                            circle 800px at ${pos.x}% ${pos.y}%,
                            rgba(218, 165, 32, 0.8),
                            rgba(255, 215, 0, 0.6) 20%,
                            rgba(255, 182, 193, 0.5) 40%,
                            rgba(173, 216, 230, 0.4) 60%,
                            rgba(221, 160, 221, 0.3) 80%,
                            transparent 100%
                          )
                        `
                      }}
                    ></div>

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `
                          linear-gradient(
                            ${Math.atan2(pos.y - 50, pos.x - 50) * (180 / Math.PI) + 90}deg,
                            transparent 0%,
                            rgba(218, 165, 32, 0.3) 30%,
                            rgba(255, 215, 0, 0.4) 50%,
                            rgba(218, 165, 32, 0.3) 70%,
                            transparent 100%
                          )
                        `
                      }}
                    ></div>

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(
                            ${pos.x * 1.8}deg,
                            rgba(255, 255, 255, 0) 0px,
                            rgba(255, 255, 255, 0.03) 1px,
                            rgba(255, 255, 255, 0) 2px,
                            rgba(255, 255, 255, 0) 3px
                          ),
                          repeating-linear-gradient(
                            ${pos.y * 1.8 + 90}deg,
                            rgba(255, 255, 255, 0) 0px,
                            rgba(255, 255, 255, 0.03) 1px,
                            rgba(255, 255, 255, 0) 2px,
                            rgba(255, 255, 255, 0) 3px
                          )
                        `
                      }}
                    ></div>

                    <div
                      className="absolute -inset-[100%] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none"
                      style={{
                        background: `
                          conic-gradient(
                            from ${pos.x * 3.6}deg at 50% 50%,
                            transparent 0deg,
                            rgba(218, 165, 32, 0.4) 60deg,
                            rgba(255, 215, 0, 0.5) 120deg,
                            rgba(255, 182, 193, 0.4) 180deg,
                            rgba(173, 216, 230, 0.4) 240deg,
                            rgba(221, 160, 221, 0.4) 300deg,
                            transparent 360deg
                          )
                        `,
                        transform: `translate(${(pos.x - 50) * 0.5}%, ${(pos.y - 50) * 0.5}%)`
                      }}
                    ></div>

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-all duration-500 pointer-events-none"
                      style={{
                        background: `
                          radial-gradient(
                            circle 600px at ${pos.x}% ${pos.y}%,
                            rgba(255, 255, 255, 0.4) 0%,
                            rgba(255, 255, 255, 0.2) 10%,
                            transparent 40%
                          )
                        `,
                        filter: 'blur(20px)'
                      }}
                    ></div>

                    <div
                      className="absolute inset-0 border-2 rounded-xl sm:rounded-2xl transition-all duration-500 pointer-events-none"
                      style={{
                        borderColor: isHovered ? 'rgba(218, 165, 32, 0.8)' : 'rgba(218, 165, 32, 0.2)',
                        boxShadow: isHovered
                          ? `0 0 30px rgba(218, 165, 32, 0.6), inset 0 0 60px rgba(218, 165, 32, 0.2)`
                          : 'none'
                      }}
                    ></div>

                    <div className="absolute bottom-4 left-4 right-4 backdrop-blur-sm bg-navy-900/70 p-3 rounded-lg border border-gold-500/30 transition-all duration-300 group-hover:bg-navy-900/50 group-hover:border-gold-400/60">
                      <h3 className="text-white font-bold text-base sm:text-lg group-hover:text-gold-300 transition-colors duration-300">
                        {event.title}
                      </h3>
                    </div>

                    {isHovered && (
                      <>
                        <div
                          className="absolute w-32 h-32 rounded-full opacity-60 blur-3xl pointer-events-none transition-all duration-300"
                          style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                            transform: 'translate(-50%, -50%)',
                            background: 'radial-gradient(circle, rgba(218, 165, 32, 0.8) 0%, transparent 70%)'
                          }}
                        ></div>
                        <div
                          className="absolute w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none transition-all duration-500"
                          style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                            transform: 'translate(-50%, -50%)',
                            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%)'
                          }}
                        ></div>
                      </>
                    )}
                  </div>
                </div>

                <div
                  className="absolute -inset-3 rounded-2xl blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none -z-10"
                  style={{
                    background: `
                      radial-gradient(
                        circle at ${pos.x}% ${pos.y}%,
                        rgba(218, 165, 32, 0.5) 0%,
                        rgba(255, 215, 0, 0.3) 30%,
                        transparent 70%
                      )
                    `
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-navy-900 to-red-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Want to See More?
          </h3>
          <p className="text-gold-200 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Follow us on social media for photos, videos, and behind-the-scenes content from all our events
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a
              href="https://www.facebook.com/profile.php?id=100090940196154"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold rounded-lg transition-colors duration-300 text-sm sm:text-base"
            >
              View Full Gallery
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100090940196154"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-transparent border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-navy-900 font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
            >
              Watch Videos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PastEventsHolographic;
