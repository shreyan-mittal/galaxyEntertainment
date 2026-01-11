import { useState } from 'react';

function PastEventsFlip() {
  const pastEvents = [
    {
      id: 1,
      title: 'Sonu Nigam Show',
      image: '/images/sonu1.jpg',
      date: 'December 2023',
      location: 'Surat, Gujarat',
      description: 'An unforgettable evening with the legendary Sonu Nigam performing his greatest hits'
    },
    {
      id: 2,
      title: 'Sonu Nigam Performance',
      image: '/images/sonu2.jpg',
      date: 'December 2023',
      location: 'Surat, Gujarat',
      description: 'Mesmerizing performance that captivated thousands of music lovers'
    },
    {
      id: 3,
      title: 'Live Audience Moments',
      image: '/images/sonu3.jpg',
      date: 'December 2023',
      location: 'Surat, Gujarat',
      description: 'The energy and excitement of the crowd during the spectacular show'
    },
    {
      id: 4,
      title: 'Kirtidan Gadhvi Garba',
      image: '/images/kirtidhan1.jpg',
      date: 'October 2023',
      location: 'Surat, Gujarat',
      description: 'Traditional Garba night featuring the renowned folk singer Kirtidan Gadhvi'
    },
    {
      id: 5,
      title: 'Gujjubhai Comedy Night',
      image: '/images/gujjubhai1.jpg',
      date: 'September 2023',
      location: 'Surat, Gujarat',
      description: 'A night full of laughter with the beloved Gujarati comedian Gujjubhai'
    },
    {
      id: 6,
      title: 'The Shaan Show',
      image: '/images/shaan3.jpg',
      date: 'November 2023',
      location: 'Surat, Gujarat',
      description: 'Soulful melodies by the versatile singer Shaan in an intimate concert setting'
    },
  ];

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleFlip = (cardId: number) => {
    setFlippedCards(prev =>
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
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
            Click any card to reveal more details about the event
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {pastEvents.map((event) => (
            <div
              key={event.id}
              className="h-64 sm:h-72 md:h-80 perspective-1000 cursor-pointer"
              onClick={() => handleFlip(event.id)}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCards.includes(event.id) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="relative h-full bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent"></div>

                    <div className="absolute inset-0 border-2 border-gold-500/30 rounded-xl sm:rounded-2xl"></div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-2">{event.title}</h3>
                      <p className="text-gold-300 text-xs sm:text-sm">Click to reveal details</p>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 bg-gold-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-gold-400/40">
                      <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute inset-0 w-full h-full backface-hidden rounded-xl sm:rounded-2xl overflow-hidden shadow-xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="h-full bg-gradient-to-br from-navy-900 via-navy-800 to-red-900 p-6 flex flex-col justify-between border-2 border-gold-500/40">
                    <div>
                      <h3 className="text-gold-400 font-bold text-xl sm:text-2xl mb-4">{event.title}</h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-gold-400 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-white text-sm">{event.date}</span>
                        </div>

                        <div className="flex items-start">
                          <svg className="w-5 h-5 text-gold-400 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-white text-sm">{event.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed">{event.description}</p>
                    </div>

                    <div className="pt-4 border-t border-gold-500/30">
                      <p className="text-gold-300 text-xs text-center">Click to flip back</p>
                    </div>

                    <div className="absolute top-4 right-4 w-8 h-8 bg-gold-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-gold-400/40">
                      <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                </div>
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

export default PastEventsFlip;
