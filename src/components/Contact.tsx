import { Mail, Phone, MapPin, Sparkles, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] =
    useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setScrollY(-rect.top / (rect.height + window.innerHeight));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setSubmitStatus("error");
      setErrorMessage("Missing required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setSubmitStatus("error");
        setErrorMessage(
          data?.error || "Something went wrong. Please try again."
        );
        return;
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (err) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden scroll-mt-20"
    >
     
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-3xl animate-pulse"
          style={{
            animationDuration: "4s",
            transform: `translate(${scrollY * 60}px, ${
              scrollY * 40
            }px) scale(${1 + scrollY * 0.3})`,
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-900 rounded-full blur-3xl animate-pulse"
          style={{
            animationDuration: "5s",
            transform: `translate(${-scrollY * 50}px, ${
              -scrollY * 30
            }px) scale(${1 + scrollY * 0.25})`,
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute w-4 h-4 text-gold-400 animate-twinkle"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div
          className={`text-center mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Get in <span className="text-gold-500">Touch</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6 animate-pulse" />
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
            Reach out to Galaxy Entertainment Australia for bookings, event
            inquiries, and more information about our upcoming performances.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 mb-10">
            <div className="group flex items-start gap-4 p-5 sm:p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-gold-500 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gold-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-navy-900 mb-1 text-sm sm:text-base">
                  Location
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  Perth, Western Australia
                </p>
              </div>
            </div>

            <div className="group flex items-start gap-4 p-5 sm:p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-gold-500 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gold-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-navy-900 mb-1 text-sm sm:text-base">
                  Email
                </h4>
                <a
                  href="mailto:galaxyentertainmentaustralia@gmail.com"
                  className="text-gray-600 hover:text-gold-600 text-xs sm:text-sm break-words transition-colors duration-300 font-medium"
                >
                  galaxyentertainmentaustralia@gmail.com
                </a>
              </div>
            </div>

            <div className="group flex items-start gap-4 p-5 sm:p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-gold-500 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gold-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-navy-900 mb-1 text-sm sm:text-base">
                  Phone
                </h4>
                <p className="text-gray-600 text-sm sm:text-base font-medium">
                  Vishal Patel —{" "}
                  <a className="hover:text-gold-600" href="tel:+61487251784">
                    +61 487 251 784
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div id="message-form" className="scroll-mt-24">
            <div className="bg-gradient-to-br from-navy-50 via-white to-gold-50 border-2 border-gray-100 rounded-3xl p-6 sm:p-8 md:p-10">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-3">
                  Register or <span className="text-gold-500">Connect</span> with
                  Us
                </h3>
                <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
                  Register for pre-sale tickets, inquire about events, or send
                  us any questions. We'll get back to you soon!
                </p>
              </div>

              {submitStatus === "success" ? (
                <div className="text-center py-6">
                  <h4 className="text-xl font-bold text-green-600 mb-2">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 bg-white text-gray-800 placeholder-gray-400"
                    />

                    <input
                      type="email"
                      placeholder="Your Email *"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 bg-white text-gray-800 placeholder-gray-400"
                    />

                    <input
                      type="tel"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                      disabled={isSubmitting}
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 bg-white text-gray-800 placeholder-gray-400"
                    />
                  </div>

                  <textarea
                    placeholder="Your Message or Inquiry *"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    rows={5}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 bg-white text-gray-800 placeholder-gray-400 resize-none mb-4"
                  />

                  {submitStatus === "error" && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group/btn relative bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-600 hover:to-amber-600 text-white font-bold py-3 sm:py-4 rounded-xl transition-all duration-500 shadow-md hover:shadow-2xl hover:shadow-gold-500/50 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
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
    </section>
  );
}

export default Contact;