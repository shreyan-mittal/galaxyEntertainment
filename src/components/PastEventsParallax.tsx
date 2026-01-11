import { useState, useRef, MouseEvent } from 'react';

function PastEventsParallax() {
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

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

    setHoveredCard(cardId);
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
    setMousePosition({ x: 0, y: 0 });
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
            Relive the magic of our previous events that brought joy to thousands
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              style={{
                transform: hoveredCard === event.id
                  ? `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg) translateZ(20px)`
                  : 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)',
                transition: 'transform 0.3s ease-out, box-shadow 0.3s ease'
              }}
              onMouseMove={(e) => handleMouseMove(e, event.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative h-64 sm:h-72 md:h-80 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{
                    transform: hoveredCard === event.id
                      ? `scale(1.15) translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`
                      : 'scale(1) translate(0px, 0px)',
                    filter: hoveredCard === event.id ? 'brightness(1.2)' : 'brightness(1)'
                  }}
                />

                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent transition-opacity duration-300"
                  style={{
                    opacity: hoveredCard === event.id ? 0.4 : 0.6
                  }}
                ></div>

                <div
                  className="absolute inset-0 border-2 rounded-xl sm:rounded-2xl transition-all duration-300"
                  style={{
                    borderColor: hoveredCard === event.id ? 'rgba(218, 165, 32, 0.5)' : 'rgba(218, 165, 32, 0)',
                    boxShadow: hoveredCard === event.id
                      ? '0 0 30px rgba(218, 165, 32, 0.3), inset 0 0 30px rgba(218, 165, 32, 0.1)'
                      : 'none'
                  }}
                ></div>

                <div
                  className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-navy-900/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-gold-500/30 transition-all duration-300"
                  style={{
                    transform: hoveredCard === event.id
                      ? `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
                      : 'translate(0px, 0px)',
                    borderColor: hoveredCard === event.id ? 'rgba(218, 165, 32, 0.6)' : 'rgba(218, 165, 32, 0.3)'
                  }}
                >
                  <h3
                    className="text-white font-semibold text-xs sm:text-sm transition-colors duration-300"
                    style={{
                      color: hoveredCard === event.id ? 'rgb(253, 224, 71)' : 'white'
                    }}
                  >
                    {event.title}
                  </h3>
                </div>

                {hoveredCard === event.id && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${(mousePosition.x + 10) * 5}% ${(mousePosition.y + 10) * 5}%, rgba(218, 165, 32, 0.2) 0%, transparent 50%)`
                    }}
                  ></div>
                )}
              </div>
            </div>
          ))}
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

export default PastEventsParallax;
