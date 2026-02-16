import { Card, Badge } from 'react-bootstrap';

const ChatSidebar = ({ onSuggestionClick }) => {
    const quickSuggestions = [
        "What's the weather in Bangkok?",
        "Best time to visit Thailand",
        "Popular tourist destinations",
        "Thai food recommendations",
        "Budget travel tips"
    ];

    const travelTips = [
        { title: "Visa Requirements", text: "Most tourists get 30-day visa on arrival" },
        { title: "Currency", text: "Thai Baht (฿). ATMs widely available" },
        { title: "Language", text: "English spoken in tourist areas" },
        { title: "Transportation", text: "Grab, taxis, BTS/MRT in Bangkok" }
    ];

    const popularDestinations = [
        "Bangkok", "Phuket", "Chiang Mai", "Krabi", "Koh Samui", "Pattaya"
    ];

    return (
        <div className="d-flex flex-column gap-4">
            {/* Quick Suggestions */}
            <Card className="shadow-sm border">
                <Card.Body style={{ padding: 'var(--spacing-lg)' }}>
                    <h6 className="fw-semibold mb-3" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-base)' }}>
                        Quick Suggestions
                    </h6>
                    <div className="d-flex flex-column gap-2">
                        {quickSuggestions.map((suggestion, idx) => (
                            <button
                                key={idx}
                                className="btn btn-sm text-start border hover-lift transition"
                                style={{
                                    backgroundColor: 'var(--color-background)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text)',
                                    fontSize: 'var(--font-size-sm)',
                                    borderRadius: 'var(--radius-sm)',
                                    padding: 'var(--spacing-sm) var(--spacing-md)'
                                }}
                                onClick={() => onSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </Card.Body>
            </Card>

            {/* Popular Destinations */}
            <Card className="shadow-sm border">
                <Card.Body style={{ padding: 'var(--spacing-lg)' }}>
                    <h6 className="fw-semibold mb-3" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-base)' }}>
                        Popular Destinations
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                        {popularDestinations.map((dest, idx) => (
                            <Badge
                                key={idx}
                                bg="light"
                                className="text-dark border"
                                style={{
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: 500,
                                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => onSuggestionClick(`Tell me about ${dest}`)}
                            >
                                {dest}
                            </Badge>
                        ))}
                    </div>
                </Card.Body>
            </Card>

            {/* Travel Tips */}
            <Card className="shadow-sm border">
                <Card.Body style={{ padding: 'var(--spacing-lg)' }}>
                    <h6 className="fw-semibold mb-3" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-base)' }}>
                        Quick Tips
                    </h6>
                    <div className="d-flex flex-column gap-3">
                        {travelTips.map((tip, idx) => (
                            <div key={idx}>
                                <div className="fw-semibold mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
                                    {tip.title}
                                </div>
                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                                    {tip.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ChatSidebar;
