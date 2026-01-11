import { X, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GalleryModalSplitProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  eventTitle: string;
}

function GalleryModalSplit({ isOpen, onClose, images, eventTitle }: GalleryModalSplitProps) {
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
      if (e.key === 'ArrowUp') handlePrevious();
      if (e.key === 'ArrowDown') handleNext();
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
    <div className="fixed inset-0 z-[100] bg-black">
      <div className="h-full flex flex-col lg:flex-row">
        <div className="lg:w-1/3 w-full h-48 lg:h-full bg-gradient-to-br from-navy-950 via-black to-navy-950 border-b lg:border-r border-gold-500/20 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="p-4 lg:p-6 bg-gradient-to-b from-black/90 to-transparent border-b border-gold-500/20">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-1">{eventTitle}</h2>
                  <p className="text-gold-400 text-sm">
                    {currentIndex + 1} / {images.length}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/20"
                  aria-label="Close gallery"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 lg:p-4 custom-scrollbar">
              <div className="grid grid-cols-3 lg:grid-cols-2 gap-2 lg:gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentIndex
                        ? 'ring-2 ring-gold-500 scale-105 shadow-xl shadow-gold-500/30'
                        : 'opacity-50 hover:opacity-80 hover:scale-105'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-gold-500/20 flex items-center justify-center">
                        <div className="w-3 h-3 bg-gold-500 rounded-full animate-pulse"></div>
                      </div>
                    )}
                    <div className="absolute bottom-1 right-1 text-xs font-bold text-white bg-black/70 px-2 py-0.5 rounded-full">
                      {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 lg:p-4 bg-gradient-to-t from-black/90 to-transparent border-t border-gold-500/20 lg:flex gap-2 hidden">
              <button
                onClick={handlePrevious}
                className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/20"
              >
                <ChevronUp size={20} />
                <span className="text-sm font-semibold">Previous</span>
              </button>
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/20"
              >
                <span className="text-sm font-semibold">Next</span>
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-black flex items-center justify-center p-4 lg:p-8 relative">
          <img
            src={images[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            style={{
              animation: 'slideIn 0.4s ease-out'
            }}
          />

          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 lg:hidden">
            <button
              onClick={handlePrevious}
              className="p-2 rounded-full bg-gold-500/20 hover:bg-gold-500/30 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/40 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronUp size={24} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-gold-500/20 hover:bg-gold-500/30 text-gold-400 hover:text-gold-300 transition-all duration-300 border border-gold-500/40 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronDown size={24} />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-gold-500/30">
            <p className="text-gold-400 text-sm font-semibold">
              Use arrow keys to navigate
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </div>
  );
}

export default GalleryModalSplit;
