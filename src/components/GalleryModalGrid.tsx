import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GalleryModalGridProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  eventTitle: string;
}

function GalleryModalGrid({ isOpen, onClose, images, eventTitle }: GalleryModalGridProps) {
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
      <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm overflow-y-auto">
        <div className="min-h-screen p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-black/80 backdrop-blur-md p-4 rounded-lg z-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">{eventTitle}</h2>
                <p className="text-gold-400 text-sm">{images.length} photos</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white transition-colors"
                aria-label="Close gallery"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/20"
                >
                  <img
                    src={img}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                    <span className="text-white text-sm font-semibold">View</span>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-500/50 rounded-lg transition-all duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showLightbox && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 backdrop-blur-sm">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 z-[210] p-2 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
            <div className="text-center mb-4">
              <p className="text-gold-400 text-sm sm:text-base">
                {currentIndex + 1} / {images.length}
              </p>
            </div>

            <div className="relative w-full max-w-6xl h-[70vh] flex items-center justify-center">
              <img
                src={images[currentIndex]}
                alt={`Photo ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fadeIn"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 p-2 sm:p-3 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GalleryModalGrid;
