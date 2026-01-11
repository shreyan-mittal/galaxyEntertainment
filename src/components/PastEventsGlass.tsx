function PastEventsGlass() {
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
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative h-64 sm:h-72 md:h-80 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  style={{
                    filter: 'brightness(0.9) contrast(1.1)'
                  }}
                />

                <div className="absolute inset-0 backdrop-blur-[2px] bg-gradient-to-t from-navy-900/60 via-transparent to-transparent group-hover:backdrop-blur-0 transition-all duration-700"></div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(218, 165, 32, 0.1) 0%, transparent 50%, rgba(218, 165, 32, 0.1) 100%)',
                  }}
                ></div>

                <div className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl bg-gold-400/30"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 blur-3xl bg-gold-500/20"></div>

                <div
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 backdrop-blur-md bg-gradient-to-t from-navy-900/80 via-navy-900/60 to-transparent group-hover:from-navy-900/70 group-hover:via-navy-900/40 transition-all duration-500"
                  style={{
                    backdropFilter: 'blur(12px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                  }}
                >
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gold-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <h3 className="relative text-white font-bold text-base sm:text-lg group-hover:text-gold-300 transition-colors duration-300">
                      {event.title}
                    </h3>
                  </div>

                  <div className="mt-2 h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                    <div className="pt-2 border-t border-gold-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <p className="text-gold-200 text-xs sm:text-sm">View Gallery</p>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute inset-0 border-2 rounded-xl sm:rounded-2xl border-gold-500/0 group-hover:border-gold-500/40 transition-all duration-500"
                  style={{
                    boxShadow: '0 0 0 0 rgba(218, 165, 32, 0)',
                  }}
                ></div>

                <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                  <div className="absolute top-4 left-4 w-24 h-24 border border-gold-400/50 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
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

export default PastEventsGlass;
