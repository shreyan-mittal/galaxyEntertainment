import { useState, useEffect, useRef } from 'react';
import { Star, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import GalleryModalStaggered from './GalleryModalStaggered';

function PastEvents() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<{ images: string[]; title: string }>({
    images: [],
    title: '',
  });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const pastEvents = [
    {
      id: 1,
      title: 'Kirtidan Gadhvi Garba',
      date: 'July, 2025',
      image: '/images/kirtidhan1.jpg',
      gallery: [],
    },
    
     {
      id: 2,
      title: 'Geeta Rabari Garba',
      date: 'July, 2024',
      image: '/images/geetaRabariPoster2024.jpeg',
      gallery: [],
    },
    
    {
      id: 3,
      title: 'Sonu Nigam Show',
      date: 'June, 2024',
      image: '/images/sonu1.jpg',
      gallery: ['/images/sonu2.jpg', '/images/sonu3.jpg', '/images/sonu4.jpg'],
    },
    {
      id: 4,
      title: 'The Shaan Show',
      date: 'April, 2024',
      image: '/images/shaan3.jpg',
      gallery: ['/images/shaan2.jpg', '/images/shaan 1.jpg'],
    },
    {
      id: 5,
      title: 'Gujjubhai Comedy Night',
      date: 'October, 2023',
      image: '/images/gujjubhai1.jpg',
      gallery: [],
    },
    {
      id: 6,
      title: 'Open Air Garba Night',
      date: 'August, 2023',
      image: '/images/kirtidhanposter2023.jpg',
      gallery: [],
    },
    {
      id: 7,
      title: 'Anup Jalota - Jagjit, Mehdi Aur Main',
      date: 'May, 2023',
      image: '/images/image.png',
      gallery: [],
    },
    {
      id: 8,
      title: 'Shaan - The Musical Evening',
      date: 'November, 2022',
      image: '/images/shaanposter2022.jpg',
      gallery: [],
    },
    {
      id: 9,
      title: 'Sonu Nigam Live Concert',
      date: 'June, 2022',
      image: '/images/sonunigam2022.jpg',
      gallery: [],
    },
    {
      id: 10,
      title: 'Yoga with Swami Ramdev',
      date: 'February, 2020',
      image: '/images/babaramdevposter.jpeg',
      gallery: [],
    },
    {
      id: 11,
      title: 'Atul Purohit & Group',
      date: 'August, 2019',
      image: '/images/atulpurohitposter.jpeg',
      gallery: [],
    },
    {
      id: 12,
      title: 'The Comedy Factory - Manan Desai & Chirayu Mistry',
      date: 'June, 2019',
      image: '/images/comedyfactoryposter.jpeg',
      gallery: [],
    },
    {
      id: 13,
      title: 'Gujarati Play - Sanjay Goradiya',
      date: 'February, 2019',
      image: '/images/sanjaygoradiyaposter.jpeg',
      gallery: [],
    },
  ];

  const additionalGalleryImages = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/8.jpg',
    '/images/10.jpg',
    '/images/11.jpg',
    '/images/15.jpg',
    '/images/16.jpg',
    '/images/17.jpg',
    '/images/18.jpg',
    '/images/19.jpg',
    '/images/20.jpg',
    '/images/22.jpg',
    '/images/23.jpg',
    '/images/24.jpg',
    '/images/25.jpg',
    '/images/28.jpg',
    '/images/29.jpg',
    '/images/30.jpeg',
    '/images/31.jpeg',
    '/images/32.jpeg',
    '/images/33.jpeg',
    '/images/34.jpeg',
    '/images/35.jpeg',
    '/images/36.jpg',
    '/images/37.jpg',
    '/images/38.jpg',
    '/images/39.jpg',
    '/images/40.jpg',
    '/images/41.jpg',
    '/images/42.jpg',
    '/images/43.jpg',
    '/images/44.jpg',
    '/images/45.jpg',
    '/images/46.jpg',
    '/images/47.jpg',
    '/images/48.jpg',
  ];

  const allGalleryImages = [
    ...pastEvents.flatMap(event => event.gallery),
    ...additionalGalleryImages,
  ];

  const openGallery = () => {
    setSelectedGallery({
      images: allGalleryImages,
      title: 'All Events Gallery',
    });
    setIsGalleryOpen(true);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 350;
      const currentScroll = carouselRef.current.scrollLeft;
      const targetScroll = direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      setIsPaused(true);
      setTimeout(() => setIsPaused(false), 3000);
    }
  };

  return (
    <section ref={sectionRef} id="past-events" className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-br from-black via-navy-950 to-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold-500/5 via-transparent to-amber-500/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
      </div>

      <div className="absolute inset-0 opacity-15 z-0">
        {[...Array(15)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="absolute w-3 h-3 text-gold-400 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-10 z-0">
        {[...Array(10)].map((_, i) => (
          <Sparkles
            key={`sparkle-${i}`}
            className="absolute w-4 h-4 text-amber-400 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${2.5 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              background: 'rgba(218, 165, 32, 0.4)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: '0 0 10px rgba(218, 165, 32, 0.6)',
            }}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
              opacity: 0.2;
            }
            25% {
              transform: translateY(-20px) translateX(10px);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-10px) translateX(-10px);
              opacity: 0.4;
            }
            75% {
              transform: translateY(-25px) translateX(5px);
              opacity: 0.7;
            }
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .carousel-container {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            scroll-behavior: smooth;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .carousel-container::-webkit-scrollbar {
            display: none;
          }

          .carousel-track {
            display: flex;
            gap: 1.5rem;
            animation: scroll 50s linear infinite;
            width: fit-content;
          }

          @media (min-width: 768px) {
            .carousel-track {
              gap: 2rem;
              animation: scroll 40s linear infinite;
            }
          }

          .carousel-track:hover {
            animation-play-state: paused;
          }

          .carousel-track.paused {
            animation-play-state: paused;
          }

          .carousel-item {
            flex-shrink: 0;
          }
        `}
      </style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="relative inline-block mb-2">
            <div className="absolute inset-0 bg-gold-500/20 blur-[80px] animate-pulse" style={{ animationDuration: '4s' }}></div>
            <h2 className="relative text-3xl sm:text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              <span className="inline-block hover:scale-105 transition-transform duration-300">
                Past <span className="bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 bg-clip-text text-transparent" style={{
                  textShadow: '0 0 40px rgba(218, 165, 32, 0.4)'
                }}>Events</span>
              </span>
            </h2>
          </div>

          <p className={`text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{
            textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
            transitionDelay: '400ms'
          }}>
          </p>
        </div>

        <div className={`relative mb-12 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ transitionDelay: '600ms' }}>
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-black via-navy-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-black via-navy-950 to-transparent z-10 pointer-events-none"></div>

          <button
            onClick={() => scrollCarousel('left')}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gold-500/90 hover:bg-gold-400 text-white transition-all duration-300 hover:scale-110 shadow-lg shadow-gold-500/50 backdrop-blur-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <button
            onClick={() => scrollCarousel('right')}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gold-500/90 hover:bg-gold-400 text-white transition-all duration-300 hover:scale-110 shadow-lg shadow-gold-500/50 backdrop-blur-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <div ref={carouselRef} className="carousel-container">
            <div className={`carousel-track ${isPaused ? 'paused' : ''}`}>
              {[...pastEvents, ...pastEvents].map((event, index) => {
                const isHovered = hoveredCard === `${event.id}-${index}`;

                return (
                  <div
                    key={`${event.id}-${index}`}
                    className="carousel-item cursor-pointer"
                    onMouseEnter={() => setHoveredCard(`${event.id}-${index}`)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setSelectedImage({ src: event.image, title: event.title })}
                  >
                    <div className="relative w-64 sm:w-72 md:w-80 h-80 sm:h-[22rem] md:h-96 flex-shrink-0">
                      <div className="absolute inset-0 transition-all duration-500 ease-out"
                        style={{
                          transform: isHovered ? 'translateY(-16px) scale(1.05)' : 'translateY(0) scale(1)',
                          zIndex: 30
                        }}
                      >
                        <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                          <div className="relative h-full bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
                            <img
                              src={event.image}
                              alt={event.title}
                              className={`w-full h-full transition-transform duration-700 ${
                                event.id === 6 ? 'object-contain p-2' : 'object-cover'
                              }`}
                              style={{
                                transform: isHovered ? 'scale(1.1) rotate(1deg)' : 'scale(1)'
                              }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent md:from-navy-900/95 md:via-navy-900/40"></div>

                            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent translate-x-[-100%] transition-transform duration-1000"
                              style={{
                                transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)'
                              }}
                            ></div>

                            {isHovered && (
                              <>
                                <div className="hidden md:block absolute top-3 left-3 opacity-100 transition-opacity duration-500">
                                  <Sparkles className="w-5 h-5 text-gold-400 animate-pulse" />
                                </div>
                                <div className="hidden md:block absolute bottom-3 right-3 opacity-100 transition-opacity duration-500" style={{ transitionDelay: '100ms' }}>
                                  <Star className="w-4 h-4 text-amber-300 animate-pulse" />
                                </div>
                              </>
                            )}

                            <div className="hidden md:block absolute inset-0 border-2 border-gold-500/40 rounded-2xl"></div>

                            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-gradient-to-t from-navy-900/90 via-navy-900/70 to-transparent pt-8 -mx-4 sm:-mx-6 px-4 sm:px-6 md:from-transparent md:via-transparent md:pt-0 md:mx-0">
                              <h3 className="text-white font-bold text-base sm:text-lg md:text-xl mb-1 sm:mb-2 line-clamp-2">{event.title}</h3>
                              <div className="flex items-center text-white md:text-gold-300 text-xs sm:text-sm">
                                <span>{event.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="hidden md:block absolute inset-0 transition-all duration-500 ease-out"
                        style={{
                          transform: isHovered ? 'translateY(-10px) scale(1.03)' : 'translateY(3px) scale(0.98)',
                          opacity: isHovered ? 1 : 0.7,
                          zIndex: 20
                        }}
                      >
                        <div className="h-full rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-gold-600/80 to-gold-800/80 backdrop-blur-sm border-2 border-gold-500/30">
                        </div>
                      </div>

                      <div
                        className="hidden md:block absolute inset-0 transition-all duration-500 ease-out"
                        style={{
                          transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(6px) scale(0.96)',
                          opacity: isHovered ? 0.8 : 0.5,
                          zIndex: 10
                        }}
                      >
                        <div className="h-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-red-800/70 to-red-900/70 backdrop-blur-sm border-2 border-red-700/20">
                        </div>
                      </div>

                      <div
                        className="hidden md:block absolute inset-0 transition-all duration-500 ease-out"
                        style={{
                          transform: isHovered ? 'translateY(2px) scale(0.99)' : 'translateY(9px) scale(0.94)',
                          opacity: isHovered ? 0.6 : 0.3,
                          zIndex: 5
                        }}
                      >
                        <div className="h-full rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-navy-800/60 to-navy-900/60 backdrop-blur-sm border-2 border-navy-700/10">
                        </div>
                      </div>

                      {isHovered && (
                        <div
                          className="hidden md:block absolute -inset-8 rounded-3xl opacity-60 blur-3xl transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: 'radial-gradient(circle, rgba(218, 165, 32, 0.4) 0%, transparent 70%)',
                            zIndex: 1
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-1000 hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(218, 165, 32, 0.2)',
            transitionDelay: '800ms'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black via-navy-950 to-black"></div>

          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold-500/10 via-transparent to-amber-500/10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s' }}></div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={`cta-particle-${i}`}
                className="absolute w-1 h-1 bg-gold-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: 0.4,
                  boxShadow: '0 0 8px rgba(218, 165, 32, 0.6)',
                }}
              />
            ))}
          </div>

          <div className="relative z-10 p-8 sm:p-12 md:p-16 text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gold-500/30 blur-[60px] animate-pulse" style={{ animationDuration: '3s' }}></div>
              <h3 className="relative text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2"
                style={{
                  textShadow: '0 0 40px rgba(218, 165, 32, 0.4)'
                }}
              >
                Events Photo <span className="bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 bg-clip-text text-transparent">Gallery</span>
              </h3>
            </div>

            <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
              }}
            >
              Explore our complete photo gallery featuring moments from all our spectacular events
            </p>

            <button
              onClick={openGallery}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-gold-500 text-black font-bold text-sm sm:text-base overflow-hidden uppercase tracking-wider transition-all duration-500 hover:bg-gold-400 hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/60"
              style={{
                boxShadow: '0 0 40px rgba(218, 165, 32, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.2)',
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

              <div className="absolute -inset-1 bg-gold-400 blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="w-3 h-3 text-white animate-pulse" />
              </div>
              <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transitionDelay: '100ms' }}>
                <Star className="w-3 h-3 text-white animate-pulse" />
              </div>

              <span className="relative z-10">View All Photos</span>

              <svg className="relative z-10 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-gold-500/30"></div>
            <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-gold-500/30"></div>

            <div className="absolute bottom-4 left-4 w-3 h-3 bg-gold-500 rounded-full shadow-lg shadow-gold-500/80 animate-pulse"></div>
            <div className="absolute top-4 right-4 w-3 h-3 bg-gold-500 rounded-full shadow-lg shadow-gold-500/80 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-[110] w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:rotate-90"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 via-transparent to-amber-500/20 pointer-events-none"></div>

              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[85vh]"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8">
                <h3 className="text-white text-3xl font-bold">{selectedImage.title}</h3>
              </div>

              <div className="absolute inset-0 border-4 border-gold-500/30 rounded-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      )}

      <GalleryModalStaggered
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={selectedGallery.images}
        eventTitle={selectedGallery.title}
      />
    </section>
  );
}

export default PastEvents;
