import { useState } from 'react';
import { Card, Row, Col, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TravelToolsSection = () => {
    const { t } = useTranslation();
    // Packing List State
    const [tripDuration, setTripDuration] = useState('');
    const [tripType, setTripType] = useState('beach');
    const [packingList, setPackingList] = useState([]);

    // Budget Calculator State
    const [budgetDays, setBudgetDays] = useState('');
    const [budgetStyle, setBudgetStyle] = useState('budget');
    const [budgetDestination, setBudgetDestination] = useState('Bangkok');
    const [budgetEstimate, setBudgetEstimate] = useState(null);

    // Distance Calculator State
    const [fromCity, setFromCity] = useState('Bangkok');
    const [toCity, setToCity] = useState('Phuket');
    const [distance, setDistance] = useState(null);

    // Thai Phrase State
    const [selectedPhrase, setSelectedPhrase] = useState('');

    // Packing List Data
    const packingItems = {
        beach: ['Swimsuit', 'Sunscreen', 'Sunglasses', 'Beach towel', 'Flip-flops', 'Hat', 'Light clothes'],
        city: ['Comfortable shoes', 'Light jacket', 'Backpack', 'Camera', 'Power bank', 'Modest clothing'],
        mountain: ['Hiking boots', 'Warm jacket', 'Rain gear', 'Backpack', 'First aid kit', 'Flashlight'],
        cultural: ['Modest clothing', 'Scarf/shawl', 'Comfortable shoes', 'Camera', 'Notebook', 'Respectful attire']
    };

    const essentials = ['Passport', 'Visa', 'Travel insurance', 'Medications', 'Phone charger', 'Money/cards'];

    // Expanded Thai Cities with coordinates
    const thaiCities = {
        'Bangkok': { lat: 13.7563, lng: 100.5018 },
        'Phuket': { lat: 7.8804, lng: 98.3923 },
        'Chiang Mai': { lat: 18.7883, lng: 98.9853 },
        'Pattaya': { lat: 12.9236, lng: 100.8825 },
        'Krabi': { lat: 8.0863, lng: 98.9063 },
        'Koh Samui': { lat: 9.5357, lng: 100.0629 },
        'Ayutthaya': { lat: 14.3532, lng: 100.5775 },
        'Hua Hin': { lat: 12.5683, lng: 99.9576 },
        'Chiang Rai': { lat: 19.9105, lng: 99.8406 },
        'Kanchanaburi': { lat: 14.0227, lng: 99.5328 },
        'Sukhothai': { lat: 17.0077, lng: 99.8230 },
        'Pai': { lat: 19.3582, lng: 98.4405 }
    };

    // Expanded Thai Phrases
    const thaiPhrases = {
        'Hello': { thai: 'สวัสดี', phonetic: 'Sawasdee' },
        'Thank you': { thai: 'ขอบคุณ', phonetic: 'Khob khun' },
        'How much?': { thai: 'เท่าไหร่', phonetic: 'Tao rai?' },
        'Delicious': { thai: 'อร่อย', phonetic: 'Aroi' },
        'Where is...?': { thai: 'อยู่ที่ไหน', phonetic: 'Yu tee nai?' },
        'Help': { thai: 'ช่วยด้วย', phonetic: 'Chuay duay' },
        'Goodbye': { thai: 'ลาก่อน', phonetic: 'La gon' },
        'Yes': { thai: 'ใช่', phonetic: 'Chai' },
        'No': { thai: 'ไม่', phonetic: 'Mai' },
        'Sorry': { thai: 'ขอโทษ', phonetic: 'Khor thot' },
        'Excuse me': { thai: 'ขอโทษครับ/ค่ะ', phonetic: 'Khor thot krab/ka' },
        'Please': { thai: 'กรุณา', phonetic: 'Karuna' },
        'Water': { thai: 'น้ำ', phonetic: 'Nam' },
        'Bathroom': { thai: 'ห้องน้ำ', phonetic: 'Hong nam' },
        'I don\'t understand': { thai: 'ไม่เข้าใจ', phonetic: 'Mai kao jai' },
        'Can you help me?': { thai: 'ช่วยได้ไหม', phonetic: 'Chuay dai mai?' },
        'Too expensive': { thai: 'แพงเกินไป', phonetic: 'Paeng gern pai' },
        'Very good': { thai: 'ดีมาก', phonetic: 'Dee mak' },
        'Beautiful': { thai: 'สวย', phonetic: 'Suay' },
        'I\'m lost': { thai: 'ฉันหลงทาง', phonetic: 'Chan long tang' },
        'Call police': { thai: 'เรียกตำรวจ', phonetic: 'Riak tam ruat' },
        'Hospital': { thai: 'โรงพยาบาล', phonetic: 'Rong paya ban' },
        'Taxi': { thai: 'แท็กซี่', phonetic: 'Taxi' },
        'Airport': { thai: 'สนามบิน', phonetic: 'Sanam bin' },
        'Hotel': { thai: 'โรงแรม', phonetic: 'Rong raem' }
    };

    // Budget estimates per day in THB (base rates)
    const budgetRates = {
        budget: { accommodation: 500, food: 400, transport: 200, activities: 300 },
        moderate: { accommodation: 1500, food: 800, transport: 400, activities: 600 },
        luxury: { accommodation: 4000, food: 1500, transport: 800, activities: 1200 }
    };

    // Destination price multipliers (based on actual cost differences)
    const destinationMultipliers = {
        'Bangkok': 1.0,           // Base price
        'Phuket': 1.3,            // Tourist island - expensive
        'Koh Samui': 1.3,         // Tourist island - expensive
        'Chiang Mai': 0.8,        // Cheaper than Bangkok
        'Pattaya': 1.1,           // Tourist city
        'Krabi': 1.2,             // Tourist destination
        'Hua Hin': 1.1,           // Beach resort
        'Ayutthaya': 0.7,         // Historical, less touristy
        'Chiang Rai': 0.75,       // Northern, cheaper
        'Kanchanaburi': 0.75,     // Less touristy
        'Sukhothai': 0.7,         // Historical, budget-friendly
        'Pai': 0.7                // Backpacker haven
    };

    // Generate Packing List
    const generatePackingList = () => {
        const items = [...essentials, ...packingItems[tripType]];
        const days = parseInt(tripDuration) || 1;

        const additionalItems = [];
        if (days > 3) additionalItems.push('Extra clothes', 'Laundry bag');
        if (days > 7) additionalItems.push('Book/entertainment', 'Snacks');

        setPackingList([...items, ...additionalItems]);
    };

    // Calculate Budget
    const calculateBudget = () => {
        const days = parseInt(budgetDays) || 1;
        const rates = budgetRates[budgetStyle];
        const multiplier = destinationMultipliers[budgetDestination] || 1.0;

        // Apply destination multiplier to all costs
        const adjustedRates = {
            accommodation: Math.round(rates.accommodation * multiplier),
            food: Math.round(rates.food * multiplier),
            transport: Math.round(rates.transport * multiplier),
            activities: Math.round(rates.activities * multiplier)
        };

        const perDay = adjustedRates.accommodation + adjustedRates.food + adjustedRates.transport + adjustedRates.activities;
        const total = perDay * days;

        setBudgetEstimate({
            total: total,
            perDay: perDay,
            destination: budgetDestination,
            breakdown: {
                accommodation: adjustedRates.accommodation * days,
                food: adjustedRates.food * days,
                transport: adjustedRates.transport * days,
                activities: adjustedRates.activities * days
            }
        });
    };

    // Calculate Distance (Haversine formula)
    const calculateDistance = () => {
        const from = thaiCities[fromCity];
        const to = thaiCities[toCity];

        const R = 6371; // Earth's radius in km
        const dLat = (to.lat - from.lat) * Math.PI / 180;
        const dLon = (to.lng - from.lng) * Math.PI / 180;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const dist = R * c;

        setDistance(dist.toFixed(0));
    };

    return (
        <div className="my-5">
            <h2 className="text-center mb-2 fw-bold" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-2xl)' }}>{t('travelTools.title')}</h2>
            <p className="text-center mb-5" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>{t('travelTools.subtitle')}</p>

            <Row className="g-4">
                {/* Packing List Generator */}
                <Col md={6} lg={3}>
                    <Card className="h-100 shadow-sm border hover-lift">
                        <Card.Body>
                            <Card.Title className="text-center fw-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-primary)' }}>{t('travelTools.packingList')}</Card.Title>

                            <Form.Group className="mb-2">
                                <Form.Label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)' }}>Trip Duration (days)</Form.Label>
                                <Form.Control
                                    type="number"
                                    size="sm"
                                    placeholder="e.g., 7"
                                    value={tripDuration}
                                    onChange={(e) => setTripDuration(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)' }}>{t('travelTools.tripType')}</Form.Label>
                                <Form.Select
                                    size="sm"
                                    value={tripType}
                                    onChange={(e) => setTripType(e.target.value)}
                                >
                                    <option value="beach">{t('tripTypes.beach')}</option>
                                    <option value="city">{t('tripTypes.city')}</option>
                                    <option value="mountain">{t('tripTypes.mountain')}</option>
                                    <option value="cultural">{t('tripTypes.cultural')}</option>
                                </Form.Select>
                            </Form.Group>

                            <Button
                                variant="primary"
                                size="sm"
                                className="w-100 mb-3"
                                onClick={generatePackingList}
                            >
                                {t('buttons.generateList')}
                            </Button>

                            {packingList.length > 0 && (
                                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    <ListGroup variant="flush">
                                        {packingList.map((item, idx) => (
                                            <ListGroup.Item key={idx} className="py-1 px-2 border-0" style={{ fontSize: 'var(--font-size-sm)' }}>
                                                ✓ {item}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Budget Calculator */}
                <Col md={6} lg={3}>
                    <Card className="h-100 shadow-sm border hover-lift">
                        <Card.Body>
                            <Card.Title className="text-center fw-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-primary)' }}>{t('travelTools.budgetCalculator')}</Card.Title>

                            <Form.Group className="mb-2">
                                <Form.Label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)' }}>Trip Duration (days)</Form.Label>
                                <Form.Control
                                    type="number"
                                    size="sm"
                                    placeholder="e.g., 7"
                                    value={budgetDays}
                                    onChange={(e) => setBudgetDays(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-2">
                                <Form.Label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)' }}>{t('travelTools.destination')}</Form.Label>
                                <Form.Select
                                    size="sm"
                                    value={budgetDestination}
                                    onChange={(e) => setBudgetDestination(e.target.value)}
                                >
                                    {Object.keys(destinationMultipliers).map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)' }}>{t('travelTools.travelStyle')}</Form.Label>
                                <Form.Select
                                    size="sm"
                                    value={budgetStyle}
                                    onChange={(e) => setBudgetStyle(e.target.value)}
                                >
                                    <option value="budget">{t('travelStyles.budget')}</option>
                                    <option value="moderate">{t('travelStyles.moderate')}</option>
                                    <option value="luxury">{t('travelStyles.luxury')}</option>
                                </Form.Select>
                            </Form.Group>

                            <Button
                                variant="primary"
                                size="sm"
                                className="w-100 mb-3"
                                onClick={calculateBudget}
                            >
                                {t('buttons.calculateBudget')}
                            </Button>

                            {budgetEstimate && (
                                <div className="text-center p-3 rounded" style={{ backgroundColor: 'var(--color-background)' }}>
                                    <div className="mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{budgetEstimate.destination}</div>
                                    <div className="mb-2 fw-bold" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-primary)' }}>
                                        {budgetEstimate.total.toLocaleString()} ฿
                                    </div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                                        ≈ ${(budgetEstimate.total / 31).toFixed(0)} USD
                                    </div>
                                    <div className="mt-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                                        {budgetEstimate.perDay.toLocaleString()} ฿/day
                                    </div>
                                </div>
                            )}

                            <div className="mt-3 text-center" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                                {t('travelTools.budgetIncludes')}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Distance Calculator */}
                <Col md={6} lg={3}>
                    <Card className="h-100 shadow-sm border hover-lift">
                        <Card.Body>
                            <Card.Title className="text-center fw-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-primary)' }}>{t('travelTools.distance')}</Card.Title>

                            <Form.Group className="mb-2">
                                <Form.Label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)' }}>{t('travelTools.from')}</Form.Label>
                                <Form.Select
                                    size="sm"
                                    value={fromCity}
                                    onChange={(e) => setFromCity(e.target.value)}
                                >
                                    {Object.keys(thaiCities).map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)' }}>{t('travelTools.to')}</Form.Label>
                                <Form.Select
                                    size="sm"
                                    value={toCity}
                                    onChange={(e) => setToCity(e.target.value)}
                                >
                                    {Object.keys(thaiCities).map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Button
                                variant="primary"
                                size="sm"
                                className="w-100 mb-3"
                                onClick={calculateDistance}
                            >
                                {t('buttons.calculateDistance')}
                            </Button>

                            {distance && (
                                <div className="text-center p-3 rounded" style={{ backgroundColor: 'var(--color-background)' }}>
                                    <div className="mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Distance</div>
                                    <div className="mb-0 fw-bold" style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-primary)' }}>{distance} km</div>
                                    <div className="mt-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                                        ≈ {(distance / 1.609).toFixed(0)} miles
                                    </div>
                                    <div className="mt-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                                        ~{Math.ceil(distance / 80)} hrs by car
                                    </div>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Thai Phrase Translator */}
                <Col md={6} lg={3}>
                    <Card className="h-100 shadow-sm border hover-lift">
                        <Card.Body>
                            <Card.Title className="text-center fw-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-primary)' }}>{t('travelTools.thaiPhrases')}</Card.Title>

                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)' }}>{t('travelTools.selectPhrase')}</Form.Label>
                                <Form.Select
                                    size="sm"
                                    value={selectedPhrase}
                                    onChange={(e) => setSelectedPhrase(e.target.value)}
                                >
                                    <option value="">Choose a phrase...</option>
                                    {Object.keys(thaiPhrases).map(phrase => (
                                        <option key={phrase} value={phrase}>{phrase}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            {selectedPhrase && (
                                <div className="p-3 rounded mb-3" style={{ backgroundColor: 'var(--color-background)' }}>
                                    <div className="text-center mb-2">
                                        <Badge bg="primary" className="mb-2" style={{ fontSize: 'var(--font-size-sm)' }}>{selectedPhrase}</Badge>
                                    </div>
                                    <div className="text-center mb-2">
                                        <div className="mb-1" style={{ fontSize: 'var(--font-size-2xl)' }}>{thaiPhrases[selectedPhrase].thai}</div>
                                    </div>
                                    <div className="text-center">
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{t('travelTools.pronunciation')}:</div>
                                        <div className="fw-semibold" style={{ color: 'var(--color-primary)' }}>{thaiPhrases[selectedPhrase].phonetic}</div>
                                    </div>
                                </div>
                            )}

                            <div className="text-center" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                                {Object.keys(thaiPhrases).length} {t('travelTools.phrasesAvailable')}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TravelToolsSection;
