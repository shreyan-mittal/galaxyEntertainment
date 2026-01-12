import { Award, Users, Calendar, Heart, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height + window.innerHeight);
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-white py-14 sm:py-18 md:py-24 scroll-mt-28"
    >
      {/* Background accents with parallax */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute top-10 left-10 w-64 h-64 bg-gold-500 rounded-full blur-3xl animate-pulse"
          style={{
            animationDuration: '6s',
            transform: `translate(${scrollY * 50}px, ${scrollY * 30}px) scale(${1 + scrollY * 0.2})`
          }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-64 h-64 bg-navy-900 rounded-full blur-3xl animate-pulse"
          style={{
            animationDuration: '7s',
            transform: `translate(${-scrollY * 40}px, ${scrollY * 20}px) scale(${1 + scrollY * 0.15})`
          }}
        ></div>
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute w-4 h-4 text-gold-500 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div
          className={`text-center mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900">
            <span className="inline-block hover:scale-110 transition-transform duration-300">
              About{' '}
              <span className="text-gold-500">
                Galaxy Entertainment
              </span>
            </span>
          </h2>
          <div className="mt-4 flex justify-center">
            <span className="h-1 w-20 sm:w-28 bg-gold-500 rounded-full"></span>
          </div>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          {/* TEXT — JUSTIFIED */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="space-y-4 sm:space-y-6 max-w-prose mx-auto md:mx-0 text-justify">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Galaxy Entertainment stands as Perth's premier cultural platform dedicated to
                celebrating the rich heritage and vibrant spirit of Indian culture in Australia.
                Since our inception, we have been committed to creating memorable experiences that
                honour tradition, music, and the deep sense of community that lies at the heart of
                Indian culture.
              </p>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                From high-energy Garba Nights that echo the colours and rhythms of Gujarat, to grand
                Bollywood Musical Evenings showcasing beloved and chart-topping melodies, and
                laughter-filled Stand-up Comedy shows featuring some of India's finest comedic
                talent — each event is thoughtfully curated to connect emotionally with the Indian
                diaspora.
              </p>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Our mission is simple yet meaningful: to bridge continents through culture, bringing
                authentic Indian experiences and world-class entertainment to Perth's diverse and
                multicultural community, while preserving the values, warmth, and cultural pride
                that define our roots.
              </p>
            </div>
          </div>

          {/* IMAGE */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative min-h-[200px] sm:min-h-[260px] md:min-h-[320px] flex items-center justify-center">
              <div
                className="group w-full h-full flex items-center justify-center cursor-pointer"
                style={{
                  perspective: '1000px'
                }}
              >
                <img
                  src="/images/logo.png"
                  alt="Galaxy Entertainment"
                  className="w-4/5 h-auto object-contain drop-shadow-[0_0_25px_rgba(234,179,8,0.6)]"
                  style={{
                    animation: 'tilt3d 6s ease-in-out infinite',
                    transformStyle: 'preserve-3d'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {[
            { icon: Award, title: 'Excellence', desc: 'Delivering premium events with meticulous attention to every detail' },
            { icon: Users, title: 'Community', desc: 'Building bridges and fostering connections through cultural celebrations' },
            { icon: Heart, title: 'Passion', desc: 'Driven by love for Indian culture and entertainment' },
            { icon: Calendar, title: 'Experience', desc: 'Years of expertise in creating memorable cultural events' },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`group text-center p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-navy-50 to-gold-50 hover:from-gold-50 hover:to-navy-50 hover:shadow-2xl transition-all duration-700 hover:scale-[1.08] hover:-translate-y-3 hover:rotate-1 relative overflow-hidden cursor-pointer ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${800 + i * 200}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/0 via-gold-400/5 to-gold-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <item.icon className="w-11 h-11 sm:w-12 sm:h-12 text-gold-500 mx-auto mb-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10 drop-shadow-lg" />
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-2 relative z-10 group-hover:text-gold-600 transition-colors duration-300">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 relative z-10 group-hover:text-gray-700 transition-colors duration-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
