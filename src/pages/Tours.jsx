import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt, FaStar, FaCheckCircle, FaBus, FaUtensils, FaCamera } from 'react-icons/fa';

// --- EXPANDED TOUR CATALOG (6 Items) ---
const tourPackages = [
  {
    id: 1,
    title: "Bangkok Temple & Food Discovery",
    price: "1,200 THB",
    duration: "6 Hours",
    rating: 4.8,
    reviews: 120,
    img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    tags: ["Culture", "Food"],
    description: "Explore the Grand Palace and hidden street food gems.",
    bookingText: "I want to book the Bangkok Temple & Food Discovery tour.",
    inclusions: ["English Guide", "All Entrance Fees", "Street Food Tasting", "Tuk-Tuk Ride"],
    itinerary: [
      { time: "08:00 AM", activity: "Pickup from Hotel" },
      { time: "09:30 AM", activity: "Grand Palace & Emerald Buddha" },
      { time: "11:30 AM", activity: "Tuk-Tuk ride to Chinatown" },
      { time: "12:30 PM", activity: "Michelin Guide Street Food Lunch" }
    ]
  },
  {
    id: 2,
    title: "Phi Phi Island Speedboat Adventure",
    price: "2,500 THB",
    duration: "Full Day",
    rating: 4.9,
    reviews: 85,
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    tags: ["Beach", "Adventure"],
    description: "Full day island hopping with snorkeling and lunch included.",
    bookingText: "I want to book the Phi Phi Island Speedboat Adventure.",
    inclusions: ["Speedboat Transfer", "Snorkeling Gear", "Buffet Lunch", "National Park Fees"],
    itinerary: [
      { time: "07:30 AM", activity: "Pickup from Hotel" },
      { time: "09:00 AM", activity: "Departure to Phi Phi Islands" },
      { time: "10:30 AM", activity: "Snorkeling at Maya Bay" },
      { time: "01:00 PM", activity: "Beachside Buffet Lunch" },
      { time: "04:30 PM", activity: "Return to Pier" }
    ]
  },
  {
    id: 3,
    title: "Chiang Mai Elephant Sanctuary",
    price: "1,800 THB",
    duration: "Half Day",
    rating: 5.0,
    reviews: 210,
    img: "https://images.unsplash.com/photo-1585938389612-a552a28d6914?auto=format&fit=crop&w=800&q=80",
    tags: ["Nature", "Wildlife"],
    description: "A responsible and ethical encounter with gentle giants.",
    bookingText: "I want to book the Chiang Mai Elephant Sanctuary tour.",
    inclusions: ["Hotel Transfer", "Elephant Feeding", "Traditional Karen Clothing", "Photo Service"],
    itinerary: [
      { time: "08:00 AM", activity: "Scenic drive to mountains" },
      { time: "09:30 AM", activity: "Meet & Feed the Elephants" },
      { time: "11:00 AM", activity: "Mud Spa with Elephants" },
      { time: "12:30 PM", activity: "Local Thai Lunch" }
    ]
  },
  {
    id: 4,
    title: "Ayutthaya Ancient City Tour",
    price: "1,500 THB",
    duration: "Full Day",
    rating: 4.7,
    reviews: 95,
    img: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=800&q=80",
    tags: ["History", "Culture"],
    description: "Step back in time to the ancient capital of Siam.",
    bookingText: "I want to book the Ayutthaya Ancient City Tour.",
    inclusions: ["Luxury Van Transfer", "Professional Historian Guide", "River Boat Ride", "Lunch"],
    itinerary: [
      { time: "07:00 AM", activity: "Depart Bangkok" },
      { time: "09:00 AM", activity: "Visit Wat Mahathat (Buddha Head in Tree)" },
      { time: "12:00 PM", activity: "Riverside Lunch" },
      { time: "02:00 PM", activity: "Boat trip around the island" }
    ]
  },
  {
    id: 5,
    title: "Krabi 4-Island Sunset Cruise",
    price: "3,200 THB",
    duration: "Afternoon",
    rating: 4.9,
    reviews: 150,
    img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    tags: ["Luxury", "Sunset"],
    description: "A romantic sunset cruise with BBQ dinner on the beach.",
    bookingText: "I want to book the Krabi 4-Island Sunset Cruise.",
    inclusions: ["Big Boat Cruise", "BBQ Seafood Dinner", "Sunset Cocktail", "Hotel Transfer"],
    itinerary: [
      { time: "01:00 PM", activity: "Pickup from Hotel" },
      { time: "02:30 PM", activity: "Swimming at Poda Island" },
      { time: "05:30 PM", activity: "Sunset over the Andaman Sea" },
      { time: "06:30 PM", activity: "BBQ Dinner on Railay Beach" }
    ]
  },
  {
    id: 6,
    title: "Floating Market & Railway Market",
    price: "900 THB",
    duration: "Half Day",
    rating: 4.6,
    reviews: 300,
    img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80",
    tags: ["Shopping", "Local Life"],
    description: "Witness the train passing through the market stalls!",
    bookingText: "I want to book the Floating Market & Railway Market tour.",
    inclusions: ["Long-tail Boat Ride", "Coconut Sugar Farm Visit", "Train Ticket", "Cold Water"],
    itinerary: [
      { time: "06:30 AM", activity: "Early morning pickup" },
      { time: "08:30 AM", activity: "Maeklong Railway Market (Train passing)" },
      { time: "09:30 AM", activity: "Damnoen Saduak Floating Market" },
      { time: "12:00 PM", activity: "Return to Bangkok" }
    ]
  }
];

const Tours = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const handleShowDetails = (tour) => {
    setSelectedTour(tour);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleBookNow = () => {
    if (selectedTour) {
      navigate('/chat', { state: { prefilledMessage: selectedTour.bookingText } });
    }
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-2" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-2xl)' }}>
          Thailand Tour Packages
        </h1>
        <p className="mb-0" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)', maxWidth: '600px', margin: '0 auto' }}>
          Curated experiences for every type of traveler
        </p>
      </div>

      <Row className="g-4">
        {tourPackages.map((pkg) => (
          <Col key={pkg.id} md={6} lg={4}>
            <Card className="h-100 border-0 shadow-sm hover-shadow transition" onClick={() => handleShowDetails(pkg)} style={{ cursor: 'pointer' }}>
              <div className="overflow-hidden rounded-top position-relative">
                <Card.Img
                  variant="top"
                  src={pkg.img}
                  style={{ height: '240px', objectFit: 'cover' }}
                  className="card-img-hover"
                />
                <div className="position-absolute top-0 end-0 m-3">
                  <Badge bg="light" className="shadow-sm d-flex align-items-center gap-1 py-2 px-3 border" style={{ color: 'var(--color-text)', fontWeight: 500 }}>
                    <FaStar style={{ color: '#F39C12' }} /> {pkg.rating}
                  </Badge>
                </div>
              </div>
              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  {pkg.tags.map(tag => (
                    <Badge key={tag} bg="light" text="primary" className="me-1 border">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Card.Title className="fw-bold fs-5">{pkg.title}</Card.Title>
                <div className="d-flex align-items-center text-muted small mb-3">
                  <FaClock className="me-1" /> {pkg.duration}
                  <span className="mx-2">•</span>
                  <FaMapMarkerAlt className="me-1" /> Thailand
                </div>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted small d-block">From</span>
                    <span className="fw-bold fs-5 text-primary">{pkg.price}</span>
                  </div>
                  <Button variant="outline-primary" size="sm" className="px-3" style={{ borderRadius: 'var(--radius-sm)' }}>View Details</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* --- TOUR DETAILS MODAL --- */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        {selectedTour && (
          <>
            <Modal.Header closeButton className="border-0 pb-0">
              <Modal.Title className="fw-bold">{selectedTour.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4">
              <img
                src={selectedTour.img}
                className="w-100 rounded-4 mb-4 object-fit-cover shadow-sm"
                style={{ height: '300px' }}
                alt={selectedTour.title}
              />

              <Row>
                {/* Left: Itinerary Timeline */}
                <Col md={7}>
                  <h5 className="fw-bold mb-4 d-flex align-items-center"><FaCamera className="me-2 text-primary" />Experience Highlights</h5>
                  <div className="border-start border-2 ps-4 ms-2 mb-4 position-relative" style={{ borderColor: '#e9ecef' }}>
                    {selectedTour.itinerary.map((item, index) => (
                      <div key={index} className="mb-4 position-relative">
                        <span
                          className="position-absolute bg-white border border-primary border-2 rounded-circle"
                          style={{ width: '16px', height: '16px', left: '-33px', top: '4px' }}
                        ></span>
                        <strong className="d-block text-dark">{item.time}</strong>
                        <span className="text-muted">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </Col>

                {/* Right: Pricing & Inclusions Box */}
                <Col md={5}>
                  <div className="bg-light p-4 rounded-4 h-100 border">
                    <h6 className="fw-bold mb-3 d-flex align-items-center"><FaCheckCircle className="me-2 text-success" />What's Included</h6>
                    <ul className="list-unstyled mb-4">
                      {selectedTour.inclusions.map((inc, i) => (
                        <li key={i} className="mb-2 small d-flex align-items-center text-muted">
                          <FaCheckCircle className="text-success me-2 flex-shrink-0" /> {inc}
                        </li>
                      ))}
                    </ul>

                    <hr className="my-4" />

                    <div className="text-center">
                      <p className="text-muted small mb-1">Total Price per Person</p>
                      <h2 className="fw-bold text-primary mb-3">{selectedTour.price}</h2>
                      <Button
                        variant="primary"
                        size="lg"
                        onClick={handleBookNow}
                        className="w-100 shadow"
                        style={{ borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}
                      >
                        Book Now
                      </Button>
                      <p className="text-muted x-small mt-2" style={{ fontSize: '0.75rem' }}>
                        *You will be redirected to our AI Assistant to finalize details.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default Tours;