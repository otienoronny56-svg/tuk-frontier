import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Public/Home';
import About from './pages/Public/About';
import Tracks from './pages/Public/Tracks';
import Schedule from './pages/Public/Schedule';
import Blog from './pages/Public/Blog';
import BlogPostDetail from './pages/Public/BlogPostDetail';
import Guide from './pages/Public/Guide';
import SponsorUs from './pages/Public/SponsorUs';
import Contact from './pages/Public/Contact';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DashboardRouter from './pages/Dashboard/DashboardRouter';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/254794107254" 
      target="_blank" 
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="32" 
        height="32" 
        fill="white"
      >
        <path d="M12.004 2C6.48 2 2.004 6.478 2.004 12c0 2.226.73 4.28 1.967 5.955L2.004 22l4.167-1.92A9.94 9.94 0 0 0 12.004 22c5.523 0 10-4.478 10-10s-4.477-10-10-10zm0 18.333c-1.895 0-3.666-.547-5.17-1.498l-.37-.233-2.457 1.133.673-2.39-.256-.407a8.293 8.293 0 0 1-1.424-4.605c0-4.6 3.738-8.333 8.333-8.333 4.6 0 8.333 3.733 8.333 8.333 0 4.6-3.737 8.333-8.333 8.333zm4.568-6.223c-.25-.125-1.478-.73-1.707-.812-.229-.083-.396-.125-.562.125-.167.25-.646.812-.792.979-.146.167-.292.188-.542.063-.25-.125-1.055-.388-2.01-1.242-.743-.662-1.245-1.48-1.39-1.73-.146-.25-.015-.385.11-.51.113-.112.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.02-.438-.063-.125-.563-1.354-.77-1.854-.203-.49-.41-.422-.563-.43-.146-.008-.313-.008-.479-.008s-.438.063-.667.313c-.229.25-.875.854-.875 2.083s.896 2.417 1.02 2.583c.125.167 1.763 2.693 4.272 3.778.597.258 1.063.413 1.426.528.6.19 1.147.163 1.58.098.481-.072 1.479-.604 1.687-1.188.208-.583.208-1.083.146-1.188-.062-.104-.208-.167-.458-.292z"/>
      </svg>
    </a>
  );
};

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/sponsor" element={<SponsorUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<DashboardRouter />} />
          </Routes>
        </main>
        
        <Footer />
      </div>

      <WhatsAppButton />

    </Router>
  );
}

export default App;
