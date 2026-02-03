// src/components/ChatBox.jsx
import { getGeminiResponse } from '../services/gemini';
import { getWeather } from '../services/weather';
import { useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa'; // Icons

const ChatBox = () => {
  // 1. State to store the conversation
  // We start with a "Welcome" message to test the UI
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Sawasdee krub! 🙏 I am your Sassy Squad travel assistant. Ask me about hotels, tours, or the weather in Thailand!",
      sender: "bot"
    }
  ]);

  const [input, setInput] = useState(""); // Stores what the user is typing
  const [isLoading, setIsLoading] = useState(false); // For the "Typing..." effect

  // 2. Function to handle sending a message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message to UI
    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    
    const originalInput = input;
    setInput(""); 
    setIsLoading(true);

    try {
      let finalPrompt = originalInput;

      // 2. CHECK: Is the user asking about weather?
      if (originalInput.toLowerCase().includes("weather")) {
        // Default to Bangkok, or try to find a city name (simplified for demo)
        // In a full app, you'd parse the city name more carefully
        const weatherData = await getWeather("Bangkok"); 

        if (weatherData) {
          // 3. INJECT: Add the real data to the prompt "behind the scenes"
          // The user doesn't see this, but the Bot does!
          finalPrompt = `
            Context: The current weather in ${weatherData.city} is ${weatherData.temp}°C 
            with ${weatherData.description}.
            
            User Question: ${originalInput}
          `;
        }
      }

      // 4. Send the "Enriched" prompt to Gemini
      const botText = await getGeminiResponse(finalPrompt);

      const botReply = {
        id: Date.now() + 1,
        text: botText,
        sender: "bot"
      };
      setMessages((prev) => [...prev, botReply]);

    } catch (error) {
      const errorMsg = { id: Date.now()+1, text: "My brain is offline! 🔌", sender: "bot" };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Card.Header className="bg-primary text-white d-flex align-items-center gap-2">
        <FaRobot size={24} />
        <h5 className="mb-0">Travel Assistant</h5>
      </Card.Header>

      {/* 3. Message Display Area */}
      <Card.Body 
        style={{ height: '400px', overflowY: 'auto', backgroundColor: '#f8f9fa' }}
        className="d-flex flex-column gap-3"
      >
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}
          >
            {/* Bot Icon (Only show on left) */}
            {msg.sender === "bot" && (
              <div className="me-2 text-primary mt-1">
                <FaRobot size={24} />
              </div>
            )}

            {/* Message Bubble */}
            <div 
              className={`p-3 rounded-4 ${
                msg.sender === "user" 
                  ? "bg-primary text-white rounded-bottom-right-0" 
                  : "bg-white border text-dark rounded-bottom-left-0"
              }`}
              style={{ maxWidth: '75%', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            >
              {msg.text}
            </div>

            {/* User Icon (Only show on right) */}
            {msg.sender === "user" && (
              <div className="ms-2 text-secondary mt-1">
                <FaUser size={20} />
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="text-muted small ms-2">
            <Spinner animation="grow" size="sm" className="me-1" />
            Thinking...
          </div>
        )}
      </Card.Body>

      {/* 4. Input Area */}
      <Card.Footer className="bg-white">
        <Form onSubmit={handleSend} className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Ask about your trip..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-pill"
          />
          <Button type="submit" variant="primary" className="rounded-circle" disabled={isLoading}>
            <FaPaperPlane />
          </Button>
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ChatBox;