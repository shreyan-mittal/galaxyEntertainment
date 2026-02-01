import {
  Calendar,
  MapPin,
  Ticket,
  Clock,
  Sparkles,
  Star,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

function UpcomingEvents() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById("message-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // City boxes (STATIC: no click, no scroll)
  const geetaTourCities = [
    "Perth",
    "Sydney",
    "Melbourne",
    "Brisbane",
    "Adelaide",
    "Auckland",
    "Christchurch",
  ];

  const events = [
    {
      id: 1,
      title: "The Magic of Javed Ali",
      date: "16th May, 2026",
      time: "19:00",
      venue: "Perth Convention & Exhibition Centre",
      description:
        "Experience the magic of Bollywood with legendary playback singer Javed Ali performing your favorite melodies live.",
      category: "Music",
      artist: "Javed Ali",
      image: "/images/javedaliposter.jpg",
    },
    {
      id: 2,
      title: "Garba Night with Geeta Rabari",
      date: "2026",
      time: "TBA",
      venue: "TBA",
      description:
        "Join us for an unforgettable evening of traditional Garba with the sensational Geeta Rabari, the voice behind countless traditional Gujarati hits.",
      category: "Cultural",
      artist: "Geeta Rabari",
      image: "/images/geetaRabariPoster2026.jpeg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="upcoming-events"
      className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden"
    >
      {/* glowing blobs */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-20 left-10 w-96 h-96 bg-gold-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s" }}
        ></div>
      </div>

      {/* stars */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(12)].map((_, i) => (
          <Star
            key={i}
            className="absolute w-3 h-3 text-gold-400 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* sparkles */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(8)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute w-4 h-4 text-gold-300 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${2.5 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* heading */}
        <div
          className={`text-center mb-8 sm:mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="inline-block hover:scale-110 transition-transform duration-300">
              Upcoming <span className="text-gold-400">Events</span>
            </span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gold-400 mx-auto mb-4 sm:mb-6 animate-pulse"></div>
          <p
            className={`text-gold-200 text-base sm:text-lg max-w-2xl mx-auto px-4 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Don't miss out on our exciting lineup of events bringing the best of
            Indian entertainment to Perth
          </p>
        </div>

        {/* cards */}
        <div className="flex justify-center gap-8 max-w-6xl mx-auto flex-col md:flex-row">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`group bg-white rounded-xl sm:rounded-2xl overflow-hidden image-3d-tilt flex flex-col transition-all duration-1000 hover:shadow-2xl hover:shadow-gold-500/20 w-full md:w-[500px] lg:w-[600px] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${400 + index * 200}ms` }}
            >
              {/* poster */}
              <div className="relative overflow-hidden gold-glow-effect">
                <img
                  src={event.image}
                  alt={event.artist}
                  className="w-full h-auto transition-all duration-700 group-hover:brightness-110 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent group-hover:from-navy-900/50 transition-all duration-500"></div>
                <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/40 rounded-xl sm:rounded-2xl transition-all duration-500"></div>

                <div
                  className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(218, 165, 32, 0.4) 0%, transparent 70%)",
                  }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
                </div>
                <div
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ transitionDelay: "100ms" }}
                >
                  <Star className="w-5 h-5 text-gold-300 animate-pulse" />
                </div>

                <div className="absolute top-4 right-4 bg-navy-900/90 backdrop-blur-sm text-gold-400 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg border border-gold-500/30 group-hover:border-gold-500/60 group-hover:bg-navy-800/90 group-hover:shadow-xl group-hover:shadow-gold-500/20 transition-all duration-300">
                  {event.date}
                </div>
              </div>

              {/* body */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy-900 mb-4 sm:mb-6 group-hover:text-gold-600 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-center text-gray-600 text-sm sm:text-base">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm sm:text-base">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm sm:text-base">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 mr-2 sm:mr-3 flex-shrink-0" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {event.id === 1 ? (
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-3">
                    {event.description}
                  </p>
                ) : (
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base flex-grow mb-6 sm:mb-8">
                    {event.description}
                  </p>
                )}

                {/* ACTION AREA */}
                <div className="mt-auto">
                  {event.id === 1 ? (
                    /* ✅ FIXED: full-width Book Now button */
                    <a
                      href="https://premier.ticketek.com.au/shows/Show.aspx?sh=JAVEDALI26&eg=PROM&ep=PRESALE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600 text-white font-semibold py-3 sm:py-4 rounded-lg transition-all duration-500 shadow-md hover:shadow-2xl hover:shadow-gold-500/60 text-sm sm:text-base relative overflow-hidden group/btn"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                      <Ticket className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                      <span className="relative z-10">Book Now</span>
                    </a>
                  ) : (
                    /* EVENT 2 */
                    <div className="space-y-4">
                      <div className="text-center text-base sm:text-lg md:text-xl font-semibold text-navy-900 tracking-wide">
                        Australia–New Zealand Tour
                      </div>

                      {/* ✅ FIXED: aligned city layout using flex-wrap */}
                      <div className="flex flex-wrap justify-center gap-2">
                        {geetaTourCities.map((city) => (
                          <div
                            key={city}
                            className="
                              h-12 sm:h-14
                              w-[120px] sm:w-[135px] md:w-[140px]
                              rounded-lg border border-amber-300/60
                              bg-gradient-to-r from-orange-100 to-amber-100
                              text-navy-900 shadow-sm
                              flex items-center justify-center text-center
                              px-2 font-semibold text-xs sm:text-sm
                              select-none
                            "
                          >
                            {city}
                          </div>
                        ))}
                      </div>

                      {/* <div className="bg-orange-50 border border-amber-300/40 rounded-lg p-3 sm:p-4"> */}
                        {/* <p className="text-navy-900 text-xs sm:text-sm leading-relaxed">
                          Tickets are{" "}
                          <span className="font-semibold">
                            to be announced soon
                          </span>
                          . Please register for updates.
                        </p> */}

                        <button
                          type="button"
                          onClick={scrollToForm}
                          className="mt-3 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600 text-white font-semibold py-3 sm:py-3.5 rounded-lg transition-all duration-500 shadow-md hover:shadow-2xl hover:shadow-gold-500/60 text-sm sm:text-base relative overflow-hidden group/btn"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                          <span className="relative z-10">
                            Register Your Interest
                          </span>
                          <ChevronDown className="w-5 h-5 relative z-10" />
                        </button>
                      {/* </div> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* footer note */}
        <div
          className={`text-center mt-8 sm:mt-12 px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <p className="text-gold-200 text-base sm:text-lg hover:text-gold-100 transition-colors duration-300">
            More exciting events coming soon! Follow us on social media for
            updates.
          </p>
        </div>
      </div>
    </section>
  );
}

export default UpcomingEvents;
