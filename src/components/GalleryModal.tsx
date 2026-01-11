import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  eventTitle: string;
}

function GalleryModal({ isOpen, onClose, images, eventTitle }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-navy-900/80 hover:bg-navy-800 text-white transition-colors"
        aria-label="Close gallery"
      >
        <X size={24} />
      </button>

      <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{eventTitle}</h2>
          <p className="text-gold-400 text-sm sm:text-base">
            {currentIndex + 1} / {images.length}
          </p>
        </div>

        <div className="relative w-full max-w-6xl h-[60vh] sm:h-[70vh] flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`${eventTitle} - Photo ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
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

        {images.length > 1 && (
          <div className="mt-6 flex gap-2 overflow-x-auto max-w-full px-4 pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex
                    ? 'ring-2 ring-gold-500 opacity-100'
                    : 'opacity-50 hover:opacity-75'
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
        )}
      </div>
    </div>
  );
}

export default GalleryModal;
