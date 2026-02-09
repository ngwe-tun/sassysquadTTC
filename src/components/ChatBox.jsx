import { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom'; // Required for receiving booking data
import { getGeminiResponse } from '../services/gemini';
import { getWeather } from '../services/weather';

// 1. Weather Icon Helper (Visual Crossing names -> React Icons)
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog, WiNightAltPartlyCloudy } from "react-icons/wi";

const renderWeatherIcon = (iconName) => {
  if (!iconName) return null;
  const name = iconName.toLowerCase();
  if (name.includes("rain")) return <WiRain size={40} color="#007bff" />;
  if (name.includes("night") && name.includes("cloud")) return <WiNightAltPartlyCloudy size={40} color="#6c757d" />;
  if (name.includes("cloud")) return <WiCloudy size={40} color="#6c757d" />;
  if (name.includes("clear") || name.includes("sun")) return <WiDaySunny size={40} color="#ffc107" />;
  return <WiFog size={40} color="#adb5bd" />;
};

const ChatBox = () => {
  const location = useLocation();
  const hasAutoSent = useRef(false); // Prevents duplicate auto-sending on re-renders
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Sawasdee krub! 🙏 I am your Sassy Squad travel assistant. How can I help you with your Thailand trip today?",
      sender: "bot"
    }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  // --- 2. BOOKING INTEGRATION: Detect incoming message from Tours.jsx ---
  useEffect(() => {
    if (location.state?.prefilledMessage && !hasAutoSent.current) {
      handleSend(null, location.state.prefilledMessage);
      hasAutoSent.current = true;
    }
  }, [location]);

  // 3. Main handleSend (Supports both user typing and "Book Now" clicks)
  const handleSend = async (e, directText = null) => {
    if (e) e.preventDefault();
    
    const messageText = directText || input;
    if (!messageText.trim()) return;

    // Add User Message
    const userMessage = { id: Date.now(), text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    
    setInput(""); 
    setIsLoading(true);

    try {
      let finalPrompt = messageText;
      let weatherIconName = null;

      // Weather Logic (Bottom-Up Data Integration)
      if (messageText.toLowerCase().includes("weather")) {
        const weatherData = await getWeather("Bangkok");
        if (weatherData) {
          finalPrompt = `Context: The current weather in ${weatherData.city} is ${weatherData.temp}°C and ${weatherData.condition}. User Question: ${messageText}`;
          weatherIconName = weatherData.icon;
        }
      }

      // Get Gemini Response
      const botText = await getGeminiResponse(finalPrompt);

      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: botText,
        sender: "bot",
        iconName: weatherIconName
      }]);

    } catch (error) {
      setMessages((prev) => [...prev, { 
        id: Date.now() + 1, 
        text: "Sorry, I'm having a bit of a technical glitch. Please try again! 🔌", 
        sender: "bot" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm mt-4 border-0" style={{ maxWidth: '700px', margin: '0 auto', borderRadius: '20px' }}>
      <Card.Header className="bg-primary text-white d-flex align-items-center gap-2 py-3" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
        <FaRobot size={24} />
        <h5 className="mb-0 fw-bold">Sassy Squad Assistant</h5>
      </Card.Header>

      <Card.Body 
        style={{ height: '450px', overflowY: 'auto', backgroundColor: '#fcfcfc' }}
        className="d-flex flex-column gap-3"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
            {msg.sender === "bot" && (
              <div className="me-2 text-primary mt-1"><FaRobot size={22} /></div>
            )}
            <div 
              className={`p-3 shadow-sm ${
                msg.sender === "user" 
                  ? "bg-primary text-white rounded-4 rounded-bottom-right-0" 
                  : "bg-white text-dark border rounded-4 rounded-bottom-left-0"
              }`}
              style={{ maxWidth: '80%' }}
            >
              <div>{msg.text}</div>
              {msg.iconName && (
                <div className="mt-2 p-2 bg-light rounded-3 text-center border">
                  {renderWeatherIcon(msg.iconName)}
                  <div className="small text-muted fw-bold">Current Weather</div>
                </div>
              )}
            </div>
            {msg.sender === "user" && (
              <div className="ms-2 text-secondary mt-1"><FaUser size={18} /></div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="text-muted small ms-2 d-flex align-items-center gap-2">
            <Spinner animation="grow" size="sm" variant="primary" />
            Sassy Squad is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </Card.Body>

      <Card.Footer className="bg-white p-3" style={{ borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
        <Form onSubmit={handleSend} className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-pill px-4 border-2 shadow-none"
            disabled={isLoading}
          />
          <Button type="submit" variant="primary" className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '45px', height: '45px' }} disabled={isLoading}>
            <FaPaperPlane />
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ChatBox;