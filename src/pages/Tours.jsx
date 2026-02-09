import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// 1. Data structure updated with 'bookingText' for the Chatbot to process
const tourPackages = [
  {
    id: 1,
    title: "Bangkok Temple & Food Discovery",
    price: "1,200 THB",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
    tags: ["Culture", "Food"],
    description: "Explore the Grand Palace and hidden street food gems.",
    bookingText: "I want to book the Bangkok Temple & Food Discovery tour."
  },
  {
    id: 2,
    title: "Phi Phi Island Speedboat Adventure",
    price: "2,500 THB",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
    tags: ["Beach", "Adventure"],
    description: "Full day island hopping with snorkeling and lunch included.",
    bookingText: "I want to book the Phi Phi Island Speedboat Adventure."
  },
  {
    id: 3,
    title: "Chiang Mai Elephant Sanctuary",
    price: "1,800 THB",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
    tags: ["Nature", "Wildlife"],
    description: "A responsible and ethical encounter with gentle giants.",
    bookingText: "I want to book the Chiang Mai Elephant Sanctuary tour."
  }
];

const Tours = () => {
  const navigate = useNavigate();

  // 2. Logic to jump to Chat AI with the booking message
  const handleBookNow = (text) => {
    navigate('/chat', { state: { prefilledMessage: text } });
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold display-6">Explore Thailand with Sassy Squad 🇹🇭</h2>
        <p className="text-muted">Select a package to start your automated booking process.</p>
      </div>

      <Row className="g-4">
        {tourPackages.map((pkg) => (
          <Col key={pkg.id} md={6} lg={4}>
            {/* Added custom CSS classes for hover effects */}
            <Card className="h-100 border-0 shadow-sm hover-shadow transition">
              <div className="overflow-hidden rounded-top">
                <Card.Img 
                  variant="top" 
                  src={pkg.img} 
                  style={{ height: '220px', objectFit: 'cover' }}
                  className="card-img-hover"
                />
              </div>
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  {pkg.tags.map(tag => (
                    <Badge key={tag} bg="primary" className="me-1 fw-normal px-3 py-2 rounded-pill">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Card.Title className="fw-bold fs-4 mb-3">{pkg.title}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">
                  {pkg.description}
                </Card.Text>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted small d-block">Price per person</span>
                    <span className="fw-bold fs-5 text-primary">{pkg.price}</span>
                  </div>
                  <Button 
                    variant="primary" 
                    className="px-4 rounded-pill shadow-sm"
                    onClick={() => handleBookNow(pkg.bookingText)}
                  >
                    Book Now
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Tours;