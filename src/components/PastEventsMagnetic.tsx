import { useState, useRef, MouseEvent } from 'react';

function PastEventsMagnetic() {
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

  const [positions, setPositions] = useState<Record<number, { x: number; y: number }>>({});
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = cardRefs.current[cardId];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distanceX = mouseX - cardCenterX;
    const distanceY = mouseY - cardCenterY;

    const maxDistance = 150;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < maxDistance) {
      const strength = 1 - distance / maxDistance;
      const pullX = distanceX * strength * 0.3;
      const pullY = distanceY * strength * 0.3;

      setPositions(prev => ({
        ...prev,
        [cardId]: { x: pullX, y: pullY }
      }));
    } else {
      setPositions(prev => ({
        ...prev,
        [cardId]: { x: 0, y: 0 }
      }));
    }
  };

  const handleMouseLeave = (cardId: number) => {
    setPositions(prev => ({
      ...prev,
      [cardId]: { x: 0, y: 0 }
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
            Move your cursor near the cards and watch them follow you
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12"
          onMouseMove={(e) => {
            pastEvents.forEach(event => handleMouseMove(e, event.id));
          }}
        >
          {pastEvents.map((event) => {
            const pos = positions[event.id] || { x: 0, y: 0 };

            return (
              <div
                key={event.id}
                ref={el => cardRefs.current[event.id] = el}
                className="group relative"
                onMouseLeave={() => handleMouseLeave(event.id)}
              >
                <div
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ease-out"
                  style={{
                    transform: `translate(${pos.x}px, ${pos.y}px)`,
                  }}
                >
                  <div className="relative h-64 sm:h-72 md:h-80 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-all duration-500"
                      style={{
                        transform: pos.x !== 0 || pos.y !== 0
                          ? `scale(1.15) translate(${-pos.x * 0.2}px, ${-pos.y * 0.2}px)`
                          : 'scale(1) translate(0px, 0px)',
                        filter: pos.x !== 0 || pos.y !== 0 ? 'brightness(1.2)' : 'brightness(1)'
                      }}
                    />

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent transition-opacity duration-300"
                      style={{
                        opacity: pos.x !== 0 || pos.y !== 0 ? 0.4 : 0.6
                      }}
                    ></div>

                    <div
                      className="absolute inset-0 border-2 rounded-xl sm:rounded-2xl transition-all duration-300"
                      style={{
                        borderColor: pos.x !== 0 || pos.y !== 0
                          ? 'rgba(218, 165, 32, 0.6)'
                          : 'rgba(218, 165, 32, 0.2)',
                        boxShadow: pos.x !== 0 || pos.y !== 0
                          ? `0 0 40px rgba(218, 165, 32, 0.4), ${pos.x * 2}px ${pos.y * 2}px 60px rgba(218, 165, 32, 0.3)`
                          : 'none'
                      }}
                    ></div>

                    <div
                      className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-navy-900/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border transition-all duration-300"
                      style={{
                        borderColor: pos.x !== 0 || pos.y !== 0
                          ? 'rgba(218, 165, 32, 0.7)'
                          : 'rgba(218, 165, 32, 0.3)',
                        transform: `translate(${-pos.x * 0.15}px, ${-pos.y * 0.15}px)`
                      }}
                    >
                      <h3
                        className="text-white font-semibold text-xs sm:text-sm transition-colors duration-300"
                        style={{
                          color: pos.x !== 0 || pos.y !== 0 ? 'rgb(253, 224, 71)' : 'white'
                        }}
                      >
                        {event.title}
                      </h3>
                    </div>

                    {(pos.x !== 0 || pos.y !== 0) && (
                      <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at ${((pos.x / 30) + 50)}% ${((pos.y / 30) + 50)}%, rgba(218, 165, 32, 0.3) 0%, transparent 50%)`
                        }}
                      ></div>
                    )}

                    <div
                      className="absolute w-full h-full top-0 left-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        opacity: pos.x !== 0 || pos.y !== 0 ? 1 : 0,
                        background: `linear-gradient(${Math.atan2(pos.y, pos.x) * (180 / Math.PI)}deg, transparent 0%, rgba(218, 165, 32, 0.1) 100%)`
                      }}
                    ></div>
                  </div>
                </div>

                <div
                  className="absolute -inset-4 rounded-2xl blur-xl transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(218, 165, 32, 0.2) 0%, transparent 70%)',
                    opacity: pos.x !== 0 || pos.y !== 0 ? 1 : 0,
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

export default PastEventsMagnetic;
