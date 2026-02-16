import ChatBox from './components/ChatBox';
import ChatSidebar from './components/ChatSidebar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import Tours from './pages/Tours';
import CurrencyWidget from './components/CurrencyWidget';
import EmergencyWidget from './components/EmergencyWidget';
import TravelToolsSection from './components/TravelToolsSection';
import { useState, useRef, useEffect } from 'react';
import { DarkModeProvider } from './context/DarkModeContext';
import DarkModeToggle from './components/DarkModeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <Container className="py-5">
      {/* --- HERO SECTION --- */}
      <div className="p-5 mb-5 bg-white shadow-sm border text-center position-relative" style={{ borderRadius: 'var(--radius-lg)' }}>
        <div className="position-relative">
          <h1 className="fw-bold mb-3" style={{ fontSize: 'var(--font-size-3xl)', color: 'var(--color-primary)', letterSpacing: '-0.5px' }}>
            {t('hero.title')}
          </h1>
          <p className="mb-4 mx-auto" style={{ maxWidth: '650px', fontSize: 'var(--font-size-lg)', color: 'var(--color-text-muted)', lineHeight: '1.7' }}>
            {t('hero.subtitle')}
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/chat">
              <Button variant="primary" size="lg" className="px-5">
                {t('buttons.startChat')}
              </Button>
            </Link>
            <Link to="/tours">
              <Button variant="outline-dark" size="lg" className="px-5">
                {t('buttons.browseTours')}
              </Button>
            </Link>
          </div>
        </div>
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
          AI Travel Assistant
        </h1>
        <p className="mb-0" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', maxWidth: '600px', margin: '0 auto' }}>
          Get instant answers about Thailand travel, weather, destinations, and personalized recommendations
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
          </Routes>
        </Container>

        {/* Footer */}
        <footer className="text-center mt-5">
          <p className="mb-0" style={{ fontSize: 'var(--font-size-sm)' }}>© 2026 Sassy Squad Travel. Built with React & Gemini AI.</p>
        </footer>
      </Router>
    </DarkModeProvider>
  );
}

export default App;