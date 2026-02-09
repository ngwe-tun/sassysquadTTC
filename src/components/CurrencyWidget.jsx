// src/components/CurrencyWidget.jsx
import { useState, useEffect } from 'react';
import { Card, Table, Spinner } from 'react-bootstrap';
import { FaMoneyBillWave, FaSync } from 'react-icons/fa';

const CurrencyWidget = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchRates = async () => {
    setLoading(true);
    try {
      // Free API: Get rates based on Thai Baht
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/THB');
      const data = await response.json();
      
      setRates(data.rates);
      
      // Format the date nicely
      const date = new Date(data.date);
      setLastUpdated(date.toLocaleDateString());
      
    } catch (error) {
      console.error("Currency Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // Helper to calculate "1 Foreign Unit = X THB"
  const getRate = (currencyCode) => {
    if (!rates || !rates[currencyCode]) return "...";
    // Invert the rate: 1 / (THB value of foreign currency) is wrong?
    // API gives: 1 THB = 0.029 USD. 
    // We want: 1 USD = ? THB.  Answer: 1 / 0.029
    return (1 / rates[currencyCode]).toFixed(2);
  };

  return (
    <Card className="shadow-sm h-100 border-0">
      <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <FaMoneyBillWave />
          <h6 className="mb-0">Exchange Rates (THB)</h6>
        </div>
        <button onClick={fetchRates} className="btn btn-sm btn-link text-white p-0">
          <FaSync className={loading ? "fa-spin" : ""} />
        </button>
      </Card.Header>
      
      <Card.Body className="p-0">
        <Table striped hover borderless className="mb-0 text-center">
          <thead className="small text-muted">
            <tr>
              <th>Currency</th>
              <th>Buying (THB)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>🇺🇸 USD</td>
              <td className="fw-bold text-success">{getRate('USD')} ฿</td>
            </tr>
            <tr>
              <td>🇪🇺 EUR</td>
              <td className="fw-bold text-primary">{getRate('EUR')} ฿</td>
            </tr>
            <tr>
              <td>🇬🇧 GBP</td>
              <td className="fw-bold text-danger">{getRate('GBP')} ฿</td>
            </tr>
            <tr>
              <td>🇯🇵 JPY (100)</td>
              {/* Special case for Yen, usually shown per 100 */}
              <td className="fw-bold text-dark">
                {rates ? (100 / rates['JPY']).toFixed(2) : "..."} ฿
              </td>
            </tr>
            <tr>
              <td>🇨🇳 CNY</td>
              <td className="fw-bold text-danger">{getRate('CNY')} ฿</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="text-muted small text-center bg-white">
        Updated: {lastUpdated}
      </Card.Footer>
    </Card>
  );
};

export default CurrencyWidget;