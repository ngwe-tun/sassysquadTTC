import ChatBox from './components/ChatBox';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Row, Col, Card } from 'react-bootstrap';
import Tours from './pages/Tours';
import CurrencyWidget from './components/CurrencyWidget'; // Ensure path is ./

const Home = () => (
  <Container className="py-5">
    {/* 1. HERO SECTION: Clean, Centered, Professional */}
    <div className="p-5 mb-5 bg-white rounded-4 shadow-sm border text-center">
      <h1 className="display-4 fw-bold text-primary mb-3">
        Explore Thailand with Sassy Squad 🇹🇭
      </h1>
      <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
        Your centralized platform for instant responses, hotel bookings, and intelligent recommendations.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/chat">
          <Button variant="primary" size="lg" className="px-5 rounded-pill shadow-sm hover-scale">
            Start AI Chat
          </Button>
        </Link>
        <Link to="/tours">
          <Button variant="outline-dark" size="lg" className="px-5 rounded-pill hover-scale">
            Browse Tours
          </Button>
        </Link>
      </div>
    </div>

    {/* 2. DASHBOARD SECTION: Widgets Below */}
    <Row className="g-4">
      {/* Left Side: Currency Widget */}
      <Col md={6} lg={4}>
        <div className="h-100">
          <CurrencyWidget />
        </div>
      </Col>

      {/* Right Side: Placeholder for your future grid */}
      <Col md={6} lg={8}>
        <Card className="h-100 border-0 bg-light text-center d-flex justify-content-center align-items-center text-muted" style={{ minHeight: '300px', borderStyle: 'dashed' }}>
          <div>
            <h4>📍 Future Feature Grid</h4>
            <p>Add "Trending Places" or "Recent Activity" here later.</p>
          </div>
        </Card>
      </Col>
    </Row>
  </Container>
);

// Placeholder components
const Chat = () => (
  <div className="py-5">
    <h2 className="text-center mb-4 fw-bold">Plan Your Trip with AI</h2>
    <ChatBox />
  </div>
);

function App() {
  return (
    <Router>
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

      <Container style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tours" element={<Tours />} />
        </Routes>
      </Container>
      
      {/* Simple Footer */}
      <footer className="text-center py-4 text-muted mt-5 border-top">
        <small>© 2026 Sassy Squad Travel. Built with React & Gemini AI.</small>
      </footer>
    </Router>
  );
}

export default App;