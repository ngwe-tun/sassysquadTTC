import { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { getGeminiResponse } from '../services/gemini';
import { getWeather } from '../services/weather';

// Weather Icon Helper
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog, WiNightAltPartlyCloudy } from "react-icons/wi";

const renderWeatherIcon = (iconName) => {
  if (!iconName) return null;
  const name = iconName.toLowerCase();
  if (name.includes("rain")) return <WiRain size={40} color="#3498DB" />;
  if (name.includes("night") && name.includes("cloud")) return <WiNightAltPartlyCloudy size={40} color="#7F8C8D" />;
  if (name.includes("cloud")) return <WiCloudy size={40} color="#7F8C8D" />;
  if (name.includes("clear") || name.includes("sun")) return <WiDaySunny size={40} color="#F39C12" />;
  return <WiFog size={40} color="#95A5A6" />;
};

// Extract city name from user message
const extractCityFromMessage = (message) => {
  const thaiCities = [
    'Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Krabi',
    'Koh Samui', 'Ayutthaya', 'Hua Hin', 'Chiang Rai',
    'Kanchanaburi', 'Sukhothai', 'Pai'
  ];

  const lowerMessage = message.toLowerCase();

  for (const city of thaiCities) {
    if (lowerMessage.includes(city.toLowerCase())) {
      return city;
    }
  }

  return 'Bangkok'; // Default to Bangkok if no city mentioned
};

const ChatBox = ({ suggestionInput }) => {
  const location = useLocation();
  const hasAutoSent = useRef(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I am your Sassy Squad travel assistant. How can I help you with your Thailand trip today?",
      sender: "bot"
    }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatBodyRef = useRef(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // On initial mount, scroll to top
    if (isInitialMount.current) {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = 0;
      }
      isInitialMount.current = false;
      return;
    }
    // Only scroll to bottom when new messages are added
    scrollToBottom();
  }, [messages]);

  // Booking integration: Detect incoming message from Tours.jsx
  useEffect(() => {
    if (location.state?.prefilledMessage && !hasAutoSent.current) {
      handleSend(null, location.state.prefilledMessage);
      hasAutoSent.current = true;
    }
  }, [location]);

  // Handle suggestion clicks from sidebar
  useEffect(() => {
    if (suggestionInput) {
      setInput(suggestionInput);
    }
  }, [suggestionInput]);

  // Main handleSend (Supports both user typing and "Book Now" clicks)
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

      // Weather Logic - Enhanced with city extraction
      if (messageText.toLowerCase().includes("weather")) {
        const city = extractCityFromMessage(messageText);
        const weatherData = await getWeather(city);
        if (weatherData) {
          finalPrompt = `Context: Current weather in ${weatherData.city}:
- Temperature: ${weatherData.temp}°C (feels like ${weatherData.feelsLike}°C)
- Conditions: ${weatherData.condition}
- Humidity: ${weatherData.humidity}%
- Wind Speed: ${weatherData.windSpeed} km/h
- Summary: ${weatherData.description}

User Question: ${messageText}`;
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
        text: "Sorry, I'm having a technical issue. Please try again.",
        sender: "bot"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm border" style={{ maxWidth: '800px', margin: '0 auto', borderRadius: 'var(--radius-lg)' }}>
      <Card.Header className="d-flex align-items-center gap-2 py-3" style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-white)', borderTopLeftRadius: 'var(--radius-lg)', borderTopRightRadius: 'var(--radius-lg)' }}>
        <FaRobot size={22} />
        <h5 className="mb-0 fw-semibold">Sassy Squad Assistant</h5>
      </Card.Header>

      <Card.Body
        ref={chatBodyRef}
        style={{ height: '500px', overflowY: 'auto', backgroundColor: 'var(--color-background)' }}
        className="d-flex flex-column gap-3 p-4"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
            {msg.sender === "bot" && (
              <div className="me-2 mt-1" style={{ color: 'var(--color-primary)' }}><FaRobot size={20} /></div>
            )}
            <div
              className={`p-3 shadow-sm ${msg.sender === "user"
                ? "text-white"
                : "bg-white border"
                }`}
              style={{
                maxWidth: '75%',
                backgroundColor: msg.sender === "user" ? 'var(--color-primary)' : 'var(--color-white)',
                color: msg.sender === "user" ? '#FFFFFF' : 'var(--color-text)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-base)',
                lineHeight: '1.6'
              }}
            >
              <div>{msg.text}</div>
              {msg.iconName && (
                <div className="mt-2 p-2 rounded text-center border" style={{ backgroundColor: 'var(--color-background)' }}>
                  {renderWeatherIcon(msg.iconName)}
                  <div className="small fw-semibold" style={{ color: 'var(--color-text-muted)' }}>Current Weather</div>
                </div>
              )}
            </div>
            {msg.sender === "user" && (
              <div className="ms-2 mt-1" style={{ color: 'var(--color-text-muted)' }}><FaUser size={16} /></div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="small ms-2 d-flex align-items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
            <Spinner animation="grow" size="sm" style={{ color: 'var(--color-primary)' }} />
            Sassy Squad is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </Card.Body>

      <Card.Footer className="bg-white p-3" style={{ borderBottomLeftRadius: 'var(--radius-lg)', borderBottomRightRadius: 'var(--radius-lg)', borderTop: '1px solid var(--color-border)' }}>
        <Form onSubmit={handleSend} className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Ask me anything about Thailand..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="px-4 shadow-none"
            style={{
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              fontSize: 'var(--font-size-base)'
            }}
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="d-flex align-items-center justify-content-center"
            style={{
              width: '45px',
              height: '45px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-primary)',
              borderColor: 'var(--color-primary)'
            }}
            disabled={isLoading}
          >
            <FaPaperPlane />
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ChatBox;