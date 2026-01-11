import { Instagram, Facebook, MessageCircle, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-navy-900 via-navy-800 to-red-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-gold-400" />
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Galaxy <span className="text-gold-400">Entertainment</span>
              </h3>
            </div>
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-bold tracking-wider">
                <span className="text-gold-400 hover:text-gold-300 transition-colors duration-300">CULTURE</span>
                <span className="text-gold-500">•</span>
                <span className="text-gold-400 hover:text-gold-300 transition-colors duration-300">MUSIC</span>
                <span className="text-gold-500">•</span>
                <span className="text-gold-400 hover:text-gold-300 transition-colors duration-300">COMMUNITY</span>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/galaxy_entertainment_aus/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gold-500 hover:bg-gold-600 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-navy-900" />
              </a>
              <a
                href="https://www.facebook.com/p/Galaxy-Entertainment-100090940196154/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gold-500 hover:bg-gold-600 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-navy-900" />
              </a>
              <a
                href="https://wa.me/61487251784"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-gold-500 hover:bg-gold-600 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-navy-900" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gold-400">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#hero" className="text-gold-200 hover:text-gold-400 transition-colors text-sm sm:text-base">
                  Home
                </a>
              </li>
              <li>
                <a href="#upcoming-events" className="text-gold-200 hover:text-gold-400 transition-colors text-sm sm:text-base">
                  Upcoming Events
                </a>
              </li>
              <li>
                <a href="#past-events" className="text-gold-200 hover:text-gold-400 transition-colors text-sm sm:text-base">
                  Past Events
                </a>
              </li>
              <li>
                <a href="#about" className="text-gold-200 hover:text-gold-400 transition-colors text-sm sm:text-base">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gold-200 hover:text-gold-400 transition-colors text-sm sm:text-base">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gold-200 hover:text-gold-400 transition-colors text-sm sm:text-base">
                  Register for Event Updates
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gold-400">Contact Info</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 text-gold-200 text-sm sm:text-base">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                <span>Perth, Western Australia</span>
              </li>
              <li className="flex items-start gap-2 text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-gold-200" />
                <a
                  href="mailto:galaxyentertainmentaustralia@gmail.com"
                  className="break-words text-gold-200 hover:text-gold-400 transition-colors"
                >
                  galaxyentertainmentaustralia@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5 text-gold-200" />
                <a
                  href="tel:+61487251784"
                  className="text-gold-200 hover:text-gold-400 transition-colors"
                >
                  +61 487 251 784
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gold-500/20 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gold-200 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Galaxy Entertainment. All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gold-200 hover:text-gold-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gold-200 hover:text-gold-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
