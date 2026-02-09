import ChatBox from './components/ChatBox';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import Tours from './pages/Tours';
import CurrencyWidget from './components/CurrencyWidget'; 
import EmergencyWidget from './components/EmergencyWidget'; 

const Home = () => (
  <Container className="py-5">
    {/* --- HERO SECTION --- */}
    <div className="p-5 mb-5 bg-white rounded-4 shadow-sm border text-center position-relative overflow-hidden">
      <div className="position-relative z-1">
        <h1 className="display-4 fw-bold text-primary mb-3">
          Explore Thailand with Sassy Squad 🇹🇭
        </h1>
        <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
          Your centralized platform for instant responses, hotel bookings, and intelligent recommendations.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/chat">
            <Button variant="primary" size="lg" className="px-5 rounded-pill shadow-sm">
              Start AI Chat
            </Button>
          </Link>
          <Link to="/tours">
            <Button variant="outline-dark" size="lg" className="px-5 rounded-pill">
              Browse Tours
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
  </Container>
);

// Placeholder wrapper for Chat page
const Chat = () => (
  <div className="py-5">
    <h2 className="text-center mb-4 fw-bold text-primary">Plan Your Trip with AI</h2>
    <ChatBox />
  </div>
);

function App() {
  return (
    <Router>
      {/* Navbar: Sticky & branded */}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow-sm sticky-top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
            ✈️ Sassy Squad
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
              <Nav.Link as={Link} to="/chat" className="px-3">Chat AI</Nav.Link>
              <Nav.Link as={Link} to="/tours" className="px-3">Tours</Nav.Link>
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
      <footer className="text-center py-4 text-muted mt-5 border-top">
        <small>© 2026 Sassy Squad Travel. Built with React & Gemini AI.</small>
      </footer>
    </Router>
  );
}

export default App;