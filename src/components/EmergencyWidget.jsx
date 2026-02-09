import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaAmbulance, FaFireExtinguisher, FaExclamationTriangle } from 'react-icons/fa';

const EmergencyWidget = () => {
  const navigate = useNavigate();

  // "Panic Mode": Sends the user to chat with a high-priority prompt
  const handlePanic = () => {
    navigate('/chat', { 
      state: { prefilledMessage: "EMERGENCY: I need help right now! What should I do?" } 
    });
  };

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Header className="bg-danger text-white py-3">
        <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
          <FaUserShield size={24} /> Tourist Safety Center
        </h5>
      </Card.Header>
      
      <Card.Body className="d-flex flex-column justify-content-between p-4">
        
        {/* Section 1: Direct Emergency Lines (Tap to Call) */}
        <div>
          <p className="text-muted small mb-3">
            Tap any number below to call directly. These lines have English-speaking support.
          </p>
          <Row className="g-3 mb-4">
            <Col sm={4}>
              <a href="tel:1155" className="text-decoration-none">
                <div className="p-3 bg-light rounded border text-center hover-shadow transition">
                  <FaUserShield className="text-primary mb-2" size={30} />
                  <div className="fw-bold text-dark">Tourist Police</div>
                  <div className="h4 text-primary mb-0">1155</div>
                </div>
              </a>
            </Col>
            <Col sm={4}>
              <a href="tel:1669" className="text-decoration-none">
                <div className="p-3 bg-light rounded border text-center hover-shadow transition">
                  <FaAmbulance className="text-danger mb-2" size={30} />
                  <div className="fw-bold text-dark">Ambulance</div>
                  <div className="h4 text-danger mb-0">1669</div>
                </div>
              </a>
            </Col>
            <Col sm={4}>
              <a href="tel:199" className="text-decoration-none">
                <div className="p-3 bg-light rounded border text-center hover-shadow transition">
                  <FaFireExtinguisher className="text-warning mb-2" size={30} />
                  <div className="fw-bold text-dark">Fire Dept</div>
                  <div className="h4 text-warning mb-0">199</div>
                </div>
              </a>
            </Col>
          </Row>
        </div>

        {/* Section 2: AI Panic Button */}
        <div className="bg-danger bg-opacity-10 p-3 rounded border border-danger">
          <div className="d-flex align-items-center gap-3">
            <FaExclamationTriangle className="text-danger" size={40} />
            <div className="flex-grow-1">
              <h6 className="fw-bold text-danger mb-1">Not sure who to call?</h6>
              <p className="small text-muted mb-0">Ask Sassy Squad for immediate translation or safety advice.</p>
            </div>
            <Button variant="danger" onClick={handlePanic} className="px-4 fw-bold shadow-sm">
              Ask AI Help
            </Button>
          </div>
        </div>

      </Card.Body>
    </Card>
  );
};

export default EmergencyWidget;