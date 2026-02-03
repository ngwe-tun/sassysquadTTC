import ChatBox from './components/ChatBox';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

// 1. Improved Home Page Component
const Home = () => (
  <div className="text-center p-5 bg-light rounded-3">
    <h1 className="display-4 fw-bold">Welcome to Sassy Squad Travel 🇹🇭</h1>
    <p className="lead">
      Your AI-powered assistant for planning the perfect trip to Thailand.
    </p>
    <hr className="my-4" />
    <p>Ask our chatbot anything or browse our exclusive tour packages.</p>
    <div className="d-flex justify-content-center gap-3">
      <Link to="/chat">
        <Button variant="primary" size="lg">Start Chatting</Button>
      </Link>
      <Link to="/tours">
        <Button variant="outline-dark" size="lg">View Tours</Button>
      </Link>
    </div>
  </div>
);

// Placeholder components
// The new Chat Page Component
const Chat = () => (
  <div className="py-5">
    <h2 className="text-center mb-4">Plan Your Trip with AI</h2>
    <ChatBox />
  </div>
);
const Tours = () => <h2 className="text-center mt-5">Tour Packages</h2>;

function App() {
  return (
    <Router>
      {/* Navbar - now spans full width */}
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            ✈️ Sassy Squad
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/chat">Chat AI</Nav.Link>
              <Nav.Link as={Link} to="/tours">Tours</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content Container */}
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tours" element={<Tours />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;