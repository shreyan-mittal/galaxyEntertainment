import { useState, useEffect, useRef } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  image: string;
}

interface PastEventsCarouselProps {
  events: Event[];
  onEventClick: (image: string) => void;
}

function PastEventsCarousel({ events, onEventClick }: PastEventsCarouselProps) {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardWidth = 400;
  const gap = 32;
  const totalWidth = cardWidth + gap;
  const maxOffset = -(events.length * totalWidth - (typeof window !== 'undefined' ? window.innerWidth : 1200));

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const newOffset = prev - totalWidth;
        if (newOffset < maxOffset) {
          return 0;
        }
        return newOffset;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [maxOffset, totalWidth]);

  const handleNavigation = (direction: 'prev' | 'next') => {
    setOffset((prev) => {
      if (direction === 'next') {
        const newOffset = prev - totalWidth;
        return newOffset < maxOffset ? maxOffset : newOffset;
      } else {
        const newOffset = prev + totalWidth;
        return newOffset > 0 ? 0 : newOffset;
      }
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - offset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.pageX - startX;
    setCurrentTranslate(x);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    let newOffset = currentTranslate;
    newOffset = Math.max(maxOffset, Math.min(0, newOffset));
    const snappedOffset = Math.round(newOffset / totalWidth) * totalWidth;
    setOffset(snappedOffset);
    setCurrentTranslate(snappedOffset);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div className="relative w-full mb-8 sm:mb-12 overflow-hidden py-8">
      <div
        ref={containerRef}
        className="relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          className="flex gap-8"
          style={{
            transform: `translateX(${isDragging ? currentTranslate : offset}px)`,
            transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            willChange: 'transform',
          }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="flex-shrink-0 group cursor-pointer"
              style={{ width: `${cardWidth}px` }}
              onClick={() => onEventClick(event.image)}
            >
              <div className="relative h-[500px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                <div
                  className="relative rounded-2xl overflow-hidden h-full transform group-hover:scale-[1.02] transition-all duration-500"
                  style={{
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className={`w-full h-full object-cover ${
                      [1, 2, 3, 4, 5, 7, 8, 9, 10].includes(event.id)
                        ? 'object-[center_10%]'
                        : event.id === 12
                        ? 'object-[center_35%]'
                        : 'object-center'
                    }`}
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div
                      className="bg-black/90 backdrop-blur-md px-5 py-4 rounded-xl border-l-4 border-gold-500"
                      style={{
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(218, 165, 32, 0.15)',
                      }}
                    >
                      <h3
                        className="text-white font-bold text-xl mb-1"
                        style={{
                          textShadow: '0 0 20px rgba(218, 165, 32, 0.4)',
                        }}
                      >
                        {event.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gold-500 rounded-full shadow-lg shadow-gold-500/80 animate-pulse" />
                        <p
                          className="text-gold-400 text-sm font-light tracking-wider"
                          style={{
                            fontFamily: 'Georgia, serif',
                            textShadow: '0 0 10px rgba(218, 165, 32, 0.4)',
                          }}
                        >
                          {event.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleNavigation('prev')}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 group disabled:opacity-30 disabled:cursor-not-allowed"
        disabled={offset >= 0}
        aria-label="Previous"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gold-500/30 blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div
            className="relative w-14 h-14 bg-black/80 backdrop-blur-sm border border-gold-500/50 group-hover:border-gold-400 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            <svg
              className="w-6 h-6 text-white group-hover:text-gold-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
      </button>

      <button
        onClick={() => handleNavigation('next')}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 group disabled:opacity-30 disabled:cursor-not-allowed"
        disabled={offset <= maxOffset}
        aria-label="Next"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gold-500/30 blur-xl group-hover:blur-2xl transition-all duration-300" />
          <div
            className="relative w-14 h-14 bg-black/80 backdrop-blur-sm border border-gold-500/50 group-hover:border-gold-400 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            <svg
              className="w-6 h-6 text-white group-hover:text-gold-400 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

export default PastEventsCarousel;
