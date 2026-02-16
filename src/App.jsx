import ChatBox from './components/ChatBox';
import ChatSidebar from './components/ChatSidebar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Row, Col, Carousel } from 'react-bootstrap';
import Tours from './pages/Tours';
import Team from './pages/Team';
import CurrencyWidget from './components/CurrencyWidget';
import EmergencyWidget from './components/EmergencyWidget';
import TravelToolsSection from './components/TravelToolsSection';
import { useState, useRef, useEffect } from 'react';
import { DarkModeProvider } from './context/DarkModeContext';
import DarkModeToggle from './components/DarkModeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import Footer from './components/Footer';
import { useTranslation } from 'react-i18next';


const Home = () => {
  const { t } = useTranslation();

  const destinations = [
    { key: 'bangkok', color: '#E74C3C', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&h=300&fit=crop' },
    { key: 'phuket', color: '#3498DB', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=400&h=300&fit=crop' },
    { key: 'chiangmai', color: '#2ECC71', image: 'https://images.unsplash.com/photo-1598965675045-f2c0c1e3c0e1?w=400&h=300&fit=crop' },
    { key: 'pattaya', color: '#F39C12', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop' }
  ];

  return (
    <Container className="py-5">
      {/* --- ENHANCED HERO SECTION --- */}
      <div
        className="p-5 mb-5 shadow-sm border text-center position-relative"
        style={{
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--color-surface)',
          borderLeft: '4px solid var(--color-primary)'
        }}
      >
        <div className="position-relative">
          <h1 className="fw-bold mb-3" style={{ fontSize: 'var(--font-size-3xl)', color: 'var(--color-primary)', letterSpacing: '-0.5px' }}>
            {t('hero.title')}
          </h1>
          <p className="mb-4 mx-auto" style={{ maxWidth: '650px', fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
            {t('hero.subtitle')}
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/chat">
              <Button
                variant="primary"
                size="lg"
                className="px-5 fw-semibold"
              >
                {t('buttons.startChat')}
              </Button>
            </Link>
            <Link to="/tours">
              <Button
                variant="outline-primary"
                size="lg"
                className="px-5 fw-semibold"
              >
                {t('buttons.browseTours')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* --- FEATURED DESTINATIONS CAROUSEL --- */}
      <div className="mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold mb-2" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-2xl)' }}>
            {t('destinations.title')}
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>
            {t('destinations.subtitle')}
          </p>
        </div>

        {/* Carousel Slider */}
        <Carousel
          fade
          interval={4000}
          style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
        >
          {destinations.map((dest) => (
            <Carousel.Item key={dest.key}>
              <div style={{ position: 'relative', height: '500px' }}>
                {/* Background Image */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${dest.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.7)'
                  }}
                />

                {/* Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(to bottom, transparent 0%, ${dest.color}99 100%)`
                  }}
                />

                {/* Content */}
                <Carousel.Caption className="d-flex flex-column justify-content-end h-100 pb-5">
                  <h3 className="fw-bold mb-3" style={{ fontSize: 'var(--font-size-3xl)', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    {t(`destinations.${dest.key}.name`)}
                  </h3>
                  <p className="mb-0" style={{ fontSize: 'var(--font-size-lg)', maxWidth: '600px', margin: '0 auto', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                    {t(`destinations.${dest.key}.description`)}
                  </p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* --- DASHBOARD WIDGETS --- */}
      <Row className="g-4">
        {/* Left Column: Real-Time Currency (Compact) */}
        <Col md={12} lg={4}>
          <div className="h-100">
            <CurrencyWidget />
          </div>
        </Col>

        {/* Right Column: Emergency Safety Center (Expanded) */}
        <Col md={12} lg={8}>
          <div className="h-100">
            <EmergencyWidget />
          </div>
        </Col>
      </Row>

      {/* --- TRAVEL TOOLS SECTION --- */}
      <TravelToolsSection />
    </Container>
  );
};

// Chat page wrapper with sidebar
const Chat = () => {
  const { t } = useTranslation();
  const [chatInput, setChatInput] = useState('');
  const chatBoxRef = useRef(null);

  // Scroll to top when Chat page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSuggestionClick = (suggestion) => {
    // This will be passed to ChatBox to handle suggestion clicks
    setChatInput(suggestion);
  };

  return (
    <Container className="py-5">
      {/* Professional Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold mb-2" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-2xl)' }}>
          {t('chat.title')}
        </h1>
        <p className="mb-0" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', maxWidth: '600px', margin: '0 auto' }}>
          {t('chat.subtitle')}
        </p>
      </div>

      {/* Two-column layout */}
      <Row className="g-4">
        {/* Main Chat - Left Column */}
        <Col lg={8}>
          <ChatBox ref={chatBoxRef} suggestionInput={chatInput} />
        </Col>

        {/* Sidebar - Right Column */}
        <Col lg={4}>
          <ChatSidebar onSuggestionClick={handleSuggestionClick} />
        </Col>
      </Row>
    </Container>
  );
};

function App() {
  const { t } = useTranslation();
  return (
    <DarkModeProvider>
      <Router>
        {/* Navbar: Sticky & branded */}
        <Navbar bg="white" variant="light" expand="lg" className="mb-4 sticky-top">
          <Container>
            <Navbar.Brand as={Link} to="/" className="fw-bold">
              Sassy Squad
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto d-flex align-items-center">
                <Nav.Link as={Link} to="/" className="px-3">{t('nav.home')}</Nav.Link>
                <Nav.Link as={Link} to="/chat" className="px-3">{t('nav.chat')}</Nav.Link>
                <Nav.Link as={Link} to="/tours" className="px-3">{t('nav.tours')}</Nav.Link>
                <Nav.Link as={Link} to="/team" className="px-3">{t('nav.team')}</Nav.Link>
                <div className="d-flex align-items-center gap-2 ms-lg-3 ms-0 mt-lg-0 mt-2">
                  <LanguageSwitcher />
                  <DarkModeToggle />
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Layout Container */}
        <Container style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </Container>

        {/* Comprehensive Footer */}
        <Footer />
      </Router>
    </DarkModeProvider>
  );
}

export default App;