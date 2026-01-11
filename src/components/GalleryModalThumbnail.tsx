import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GalleryModalThumbnailProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  eventTitle: string;
}

function GalleryModalThumbnail({ isOpen, onClose, images, eventTitle }: GalleryModalThumbnailProps) {
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

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-gradient-to-br from-navy-950 via-black to-navy-950 backdrop-blur-sm overflow-y-auto">
        <div className="min-h-screen p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 sticky top-0 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-gold-500/20 z-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">{eventTitle}</h2>
                <p className="text-gold-400 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse"></span>
                  {images.length} photos in collection
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/20"
                aria-label="Close gallery"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-navy-900/50 backdrop-blur-sm border border-gold-500/10 hover:border-gold-500/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/20 hover:z-10"
                >
                  <img
                    src={img}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
                    <div className="text-white text-xs font-semibold px-3 py-1 rounded-full bg-gold-500/80 backdrop-blur-sm">
                      View
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 text-xs font-bold text-gold-400 bg-navy-900/80 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    #{index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showLightbox && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-black">
          <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/90 to-transparent">
            <div className="text-gold-400 text-sm sm:text-base font-semibold">
              Photo {currentIndex + 1} of {images.length}
            </div>
            <button
              onClick={() => setShowLightbox(false)}
              className="p-2 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/20"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 relative">
            <img
              src={images[currentIndex]}
              alt={`Photo ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 p-3 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/20 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/20 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>

          <div className="p-4 bg-gradient-to-t from-black/90 to-transparent">
            <div className="max-w-6xl mx-auto">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentIndex
                        ? 'ring-2 ring-gold-500 opacity-100 scale-110'
                        : 'opacity-40 hover:opacity-70 hover:scale-105'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryModalThumbnail;
