import { Mail, Phone, MapPin, Sparkles, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
    const res = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

const data = await res.json().catch(() => ({}));

if (!res.ok) {
  setSubmitStatus('error');
  setErrorMessage(data?.error || 'Failed to submit form');
  return;
}

setSubmitStatus('success');
setFormData({ name: '', email: '', phone: '', message: '' });
setTimeout(() => setSubmitStatus('idle'), 5000);

    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage(`Something went wrong: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-3xl animate-pulse"
          style={{
            animationDuration: '4s',
            transform: `translate(${scrollY * 60}px, ${scrollY * 40}px) scale(${1 + scrollY * 0.3})`
          }}
        ></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-900 rounded-full blur-3xl animate-pulse"
          style={{
            animationDuration: '5s',
            transform: `translate(${-scrollY * 50}px, ${-scrollY * 30}px) scale(${1 + scrollY * 0.25})`
          }}
        ></div>
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-gold-500 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-gold-500 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-gold-500 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute w-4 h-4 text-gold-400 animate-twinkle"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            <span className="inline-block hover:scale-110 transition-transform duration-300">
              Get in <span className="text-gold-500">Touch</span>
            </span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6 animate-pulse"></div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8 sm:mb-12">
            <p className={`text-gray-600 text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed text-center max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Reach out to Galaxy Entertainment Australia for bookings, event inquiries, and more information about our upcoming performances.
            </p>

            <div className="flex flex-col gap-4 mb-6 sm:mb-8">
              <div className={`group flex items-start gap-4 p-5 sm:p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-gold-500 hover:shadow-2xl transition-all duration-500 hover:scale-[1.08] hover:-translate-y-2 hover:rotate-1 relative overflow-hidden cursor-pointer ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '400ms' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/10 to-gold-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 via-amber-500 to-gold-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"></div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gold-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700 shadow-lg relative z-10">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <h4 className="font-bold text-navy-900 mb-2 text-sm sm:text-base group-hover:text-gold-600 transition-colors duration-300">Location</h4>
                  <p className="text-gray-600 text-sm sm:text-base group-hover:text-gray-800 transition-colors duration-300">Perth, Western Australia</p>
                </div>
              </div>

              <div className={`group flex items-start gap-4 p-5 sm:p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-gold-500 hover:shadow-2xl transition-all duration-500 hover:scale-[1.08] hover:-translate-y-2 hover:rotate-1 relative overflow-hidden cursor-pointer ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '600ms' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/10 to-gold-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 via-amber-500 to-gold-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"></div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gold-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700 shadow-lg relative z-10">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <h4 className="font-bold text-navy-900 mb-2 text-sm sm:text-base group-hover:text-gold-600 transition-colors duration-300">Email</h4>
                  <a
                    href="mailto:galaxyentertainmentaustralia@gmail.com"
                    className="text-gray-600 hover:text-gold-600 text-xs sm:text-sm break-words transition-colors duration-300 font-medium"
                  >
                    galaxyentertainmentaustralia@gmail.com
                  </a>
                </div>
              </div>

              <div className={`group flex items-start gap-4 p-5 sm:p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-gold-500 hover:shadow-2xl transition-all duration-500 hover:scale-[1.08] hover:-translate-y-2 hover:rotate-1 relative overflow-hidden cursor-pointer ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '800ms' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/10 to-gold-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 via-amber-500 to-gold-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"></div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gold-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700 shadow-lg relative z-10">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="flex-1 min-w-0 relative z-10">
                  <h4 className="font-bold text-navy-900 mb-4 text-sm sm:text-base group-hover:text-gold-600 transition-colors duration-300">Phone</h4>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-gray-50 to-transparent p-3 rounded-lg border-l-4 border-gold-500">
                      <p className="text-gray-500 text-xs sm:text-sm font-semibold mb-1">Vishal Patel</p>
                      <a
                        href="tel:+61487251784"
                        className="text-gray-700 hover:text-gold-600 text-sm sm:text-base font-medium transition-colors duration-300 block"
                      >
                        +61 487 251 784
                      </a>
                    </div>

                    {/* <div className="bg-gradient-to-r from-gray-50 to-transparent p-3 rounded-lg border-l-4 border-gold-500">
                      <p className="text-gray-500 text-xs sm:text-sm font-semibold mb-1">Hitesh Modi</p>
                      <a
                        href="tel:+61410738938"
                        className="text-gray-700 hover:text-gold-600 text-sm sm:text-base font-medium transition-colors duration-300 block"
                      >
                        +61 410 738 938
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div id="message-form" className={`mt-12 sm:mt-16 scroll-mt-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1000ms' }}>
              <div className="relative group bg-gradient-to-br from-navy-50 via-white to-gold-50 border-2 border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden hover:border-gold-500 hover:shadow-2xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/5 to-gold-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-500 via-amber-500 to-gold-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>

                <div className="relative z-10 text-center mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
                    Register or <span className="text-gold-500">Connect</span> with Us
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
                    Register for pre-sale tickets, inquire about events, or send us any questions. We'll get back to you soon!
                  </p>
                </div>

                {submitStatus === 'success' ? (
                  <div className="relative z-10 text-center py-8 animate-fade-in">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-green-600 mb-2">Message Sent Successfully!</h4>
                    <p className="text-gray-600">Thank you for reaching out. We'll get back to you as soon as possible!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative z-10 max-w-2xl mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="relative group/input">
                        <input
                          type="text"
                          placeholder="Your Name *"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 focus:shadow-lg focus:shadow-gold-500/20"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="relative group/input">
                        <input
                          type="email"
                          placeholder="Your Email *"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 focus:shadow-lg focus:shadow-gold-500/20"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="relative group/input">
                        <input
                          type="tel"
                          placeholder="Your Phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 focus:shadow-lg focus:shadow-gold-500/20"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="relative group/input mb-4">
                      <textarea
                        placeholder="Your Message or Inquiry"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={5}
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 focus:shadow-lg focus:shadow-gold-500/20 resize-none"
                        disabled={isSubmitting}
                      />
                    </div>

                    {submitStatus === 'error' && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center animate-shake">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group/btn relative bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-500 shadow-md hover:shadow-2xl hover:shadow-gold-500/50 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:-translate-y-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                      </div>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-all duration-300" />
                            Send Message
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
