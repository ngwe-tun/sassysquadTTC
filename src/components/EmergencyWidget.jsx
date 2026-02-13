import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EmergencyWidget = () => {
  const navigate = useNavigate();

  // Emergency assistance navigation
  const handleEmergencyAssistance = () => {
    navigate('/chat', {
      state: { prefilledMessage: "I need emergency assistance. What should I do?" }
    });
  };

  return (
    <Card className="border shadow-sm h-100">
      <Card.Header className="emergency-card-header">
        <h5 className="mb-0 fw-semibold">Emergency Assistance</h5>
      </Card.Header>

      <Card.Body className="d-flex flex-column justify-content-between" style={{ padding: 'var(--spacing-lg)' }}>

        {/* Section 1: Direct Emergency Lines */}
        <div>
          <p className="mb-3" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            Tap any number below to call directly. English-speaking support available.
          </p>
          <Row className="g-3 mb-4">
            <Col sm={4}>
              <a href="tel:1155" className="text-decoration-none">
                <div className="p-3 bg-white rounded border text-center hover-lift transition">
                  <div className="fw-semibold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-sm)' }}>Tourist Police</div>
                  <div className="fw-bold mb-0" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-primary)' }}>1155</div>
                </div>
              </a>
            </Col>
            <Col sm={4}>
              <a href="tel:1669" className="text-decoration-none">
                <div className="p-3 bg-white rounded border text-center hover-lift transition">
                  <div className="fw-semibold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-sm)' }}>Ambulance</div>
                  <div className="fw-bold mb-0" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-emergency)' }}>1669</div>
                </div>
              </a>
            </Col>
            <Col sm={4}>
              <a href="tel:199" className="text-decoration-none">
                <div className="p-3 bg-white rounded border text-center hover-lift transition">
                  <div className="fw-semibold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-sm)' }}>Fire Department</div>
                  <div className="fw-bold mb-0" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text)' }}>199</div>
                </div>
              </a>
            </Col>
          </Row>
        </div>

        {/* Section 2: AI Assistance */}
        <div className="p-3 rounded border" style={{ backgroundColor: 'rgba(192, 57, 43, 0.05)', borderColor: 'var(--color-emergency)' }}>
          <div className="d-flex align-items-center gap-3">
            <div className="flex-grow-1">
              <h6 className="fw-semibold mb-1" style={{ color: 'var(--color-emergency)' }}>Need Guidance?</h6>
              <p className="small mb-0" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                Get immediate translation or safety advice from our AI assistant.
              </p>
            </div>
            <Button
              onClick={handleEmergencyAssistance}
              className="px-4 fw-semibold shadow-sm"
              style={{
                backgroundColor: 'var(--color-emergency)',
                borderColor: 'var(--color-emergency)',
                fontSize: 'var(--font-size-sm)'
              }}
            >
              Ask AI
            </Button>
          </div>
        </div>

      </Card.Body>
    </Card>
  );
};

export default EmergencyWidget;