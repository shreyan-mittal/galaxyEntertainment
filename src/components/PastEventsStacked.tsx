import { useState } from 'react';
import GalleryModal from './GalleryModal';

function PastEventsStacked() {
  const pastEvents = [
    {
      id: 1,
      title: 'Sonu Nigam Show',
      image: '/images/sonu1.jpg',
      date: 'December 2023',
    },
    {
      id: 3,
      title: 'Live Audience Moments',
      image: '/images/sonu3.jpg',
      date: 'December 2023',
    },
    {
      id: 4,
      title: 'Kirtidan Gadhvi Garba',
      image: '/images/kirtidhan1.jpg',
      date: 'October 2023',
    },
    {
      id: 5,
      title: 'Gujjubhai Comedy Night',
      image: '/images/gujjubhai1.jpg',
      date: 'September 2023',
    },
    {
      id: 6,
      title: 'The Shaan Show',
      image: '/images/shaan3.jpg',
      date: 'November 2023',
    },
    {
      id: 7,
      title: 'Anup Jalota Show',
      image: '/images/poster.jpg',
      date: 'May 2023',
    },
  ];

  const galleryImages = [
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
  ];

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const openGallery = () => {
    setIsGalleryOpen(true);
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
            Hover over cards to reveal the layered depth effect
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {pastEvents.map((event) => {
            const isHovered = hoveredCard === event.id;

            return (
              <div
                key={event.id}
                className="relative h-64 sm:h-72 md:h-80"
                onMouseEnter={() => setHoveredCard(event.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    transform: isHovered ? 'translateY(-16px) scale(1.05)' : 'translateY(0) scale(1)',
                    zIndex: 30
                  }}
                >
                  <div className="relative h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                    <div className="relative h-full bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
                      <img
                        src={event.image}
                        alt={event.title}
                        className={`w-full h-full transition-transform duration-700 ${
                          event.id === 7 ? 'object-contain p-2' : 'object-cover'
                        }`}
                        style={{
                          transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent"></div>

                      <div className="absolute inset-0 border-2 border-gold-500/40 rounded-xl sm:rounded-2xl"></div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-base sm:text-lg mb-1">{event.title}</h3>
                        <div className="flex items-center text-gold-300 text-xs sm:text-sm">
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    transform: isHovered ? 'translateY(-10px) scale(1.03)' : 'translateY(3px) scale(0.98)',
                    opacity: isHovered ? 1 : 0.7,
                    zIndex: 20
                  }}
                >
                  <div className="h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-gold-600/80 to-gold-800/80 backdrop-blur-sm border-2 border-gold-500/30">
                  </div>
                </div>

                <div
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(6px) scale(0.96)',
                    opacity: isHovered ? 0.8 : 0.5,
                    zIndex: 10
                  }}
                >
                  <div className="h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-red-800/70 to-red-900/70 backdrop-blur-sm border-2 border-red-700/20">
                  </div>
                </div>

                <div
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    transform: isHovered ? 'translateY(2px) scale(0.99)' : 'translateY(9px) scale(0.94)',
                    opacity: isHovered ? 0.6 : 0.3,
                    zIndex: 5
                  }}
                >
                  <div className="h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-navy-800/60 to-navy-900/60 backdrop-blur-sm border-2 border-navy-700/10">
                  </div>
                </div>

                {isHovered && (
                  <div
                    className="absolute -inset-8 rounded-3xl opacity-60 blur-3xl transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(218, 165, 32, 0.4) 0%, transparent 70%)',
                      zIndex: 1
                    }}
                  ></div>
                )}
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
          <div className="flex justify-center px-4">
            <button
              onClick={openGallery}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold rounded-lg transition-colors duration-300 text-sm sm:text-base"
            >
              View Full Gallery
            </button>
          </div>
        </div>
      </div>

      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={galleryImages}
        eventTitle="Event Gallery"
      />
    </section>
  );
}

export default PastEventsStacked;
