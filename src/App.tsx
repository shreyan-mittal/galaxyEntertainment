import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import UpcomingEvents from './components/UpcomingEvents';
import PastEvents from './components/PastEvents';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <UpcomingEvents />
      <PastEvents />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
