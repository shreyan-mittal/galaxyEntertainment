import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GalleryModalStaggeredProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  eventTitle: string;
}

function GalleryModalStaggered({ isOpen, onClose, images, eventTitle }: GalleryModalStaggeredProps) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setShowLightbox(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        if (showLightbox) {
          setShowLightbox(false);
        } else {
          onClose();
        }
      }
      if (showLightbox && e.key === 'ArrowLeft') handlePrevious();
      if (showLightbox && e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showLightbox, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setShowLightbox(true);
  };

  const getColumnHeight = (index: number) => {
    const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64', 'h-88'];
    return heights[index % heights.length];
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-gradient-to-br from-black via-navy-950 to-black overflow-y-auto">
        <div className="min-h-screen p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6 sm:mb-8 sticky top-0 bg-gradient-to-r from-navy-900/90 via-black/90 to-navy-900/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-gold-500/30 shadow-2xl z-10">
              <div className="flex-1 min-w-0 mr-3">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent mb-1 sm:mb-2 truncate">
                  {eventTitle}
                </h2>
                <p className="text-gold-400 text-xs sm:text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span>
                  <span className="hidden sm:inline">Masonry Gallery - </span>{images.length} photos
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/20 hover:from-gold-500/30 hover:to-gold-600/30 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/40 hover:scale-110 flex-shrink-0"
                aria-label="Close gallery"
              >
                <X size={20} className="sm:hidden" />
                <X size={24} className="hidden sm:block" />
              </button>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="group relative w-full break-inside-avoid mb-3 sm:mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-navy-900/50 to-black/50 backdrop-blur-sm border border-gold-500/20 hover:border-gold-500/60 transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold-500/30"
                  style={{
                    animation: `fadeIn 0.6s ease-out ${index * 0.05}s backwards`
                  }}
                >
                  <div className={`relative ${getColumnHeight(index)}`}>
                    <img
                      src={img}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="text-white text-sm font-bold px-4 py-2 rounded-full bg-gold-500 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500">
                        View Full Size
                      </div>
                    </div>

                    <div className="absolute top-3 right-3 text-xs font-bold text-gold-400 bg-navy-900/90 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gold-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      #{index + 1}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showLightbox && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black animate-fadeIn">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[210] p-2 sm:p-3 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/20 hover:from-gold-500/30 hover:to-gold-600/30 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/40"
            aria-label="Close lightbox"
          >
            <X size={20} className="sm:hidden" />
            <X size={24} className="hidden sm:block" />
          </button>

          <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
            <div className="text-center mb-3 sm:mb-4">
              <p className="text-gold-400 text-sm sm:text-base font-semibold bg-navy-900/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-sm border border-gold-500/30">
                {currentIndex + 1} / {images.length}
              </p>
            </div>

            <div className="relative w-full max-w-6xl h-[70vh] flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg sm:rounded-2xl shadow-2xl shadow-gold-500/20 border border-gold-500/20"
                style={{
                  animation: 'zoomIn 0.4s ease-out'
                }}
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/20 hover:from-gold-500/30 hover:to-gold-600/30 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/40 backdrop-blur-sm hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} className="sm:hidden" />
                    <ChevronLeft size={28} className="hidden sm:block" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 p-2 sm:p-3 rounded-xl bg-gradient-to-br from-gold-500/20 to-gold-600/20 hover:from-gold-500/30 hover:to-gold-600/30 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/40 backdrop-blur-sm hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} className="sm:hidden" />
                    <ChevronRight size={28} className="hidden sm:block" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}

export default GalleryModalStaggered;
