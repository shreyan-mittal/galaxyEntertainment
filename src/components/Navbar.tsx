import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Upcoming Events', id: 'upcoming-events' },
    { label: 'Past Events', id: 'past-events' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
    { label: 'Register for Event Updates', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-lg">
      <div className="px-4 sm:px-6">

        {/* Navbar Container */}
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">

          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center hover:opacity-80 transition-opacity py-2"
          >
            <img
              src="/images/logo.png"
              alt="Galaxy Entertainment"
              className="h-10 sm:h-12 md:h-12 w-auto object-contain"
            />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 lg:gap-8 ml-auto pr-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-gold-500 transition-colors duration-200 font-medium text-sm lg:text-base whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-gold-500 transition-colors"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-800 py-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-900 hover:text-gold-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
