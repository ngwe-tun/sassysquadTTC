// src/components/CurrencyWidget.jsx
import { useState, useEffect } from 'react';
import { Card, Table, Spinner } from 'react-bootstrap';
import { FaSync } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const CurrencyWidget = () => {
  const { t } = useTranslation();
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
    return (1 / rates[currencyCode]).toFixed(2);
  };

  return (
    <Card className="shadow-sm h-100 border">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold">{t('widgets.exchangeRates')}</h6>
        <button
          onClick={fetchRates}
          className="btn btn-sm btn-link p-0"
          style={{ color: 'var(--color-white)', textDecoration: 'none' }}
        >
          <FaSync className={loading ? "fa-spin" : ""} />
        </button>
      </Card.Header>

      <Card.Body className="p-0">
        <Table className="mb-0 text-center" style={{ fontSize: 'var(--font-size-sm)' }}>
          <thead style={{ backgroundColor: 'var(--color-background)' }}>
            <tr>
              <th style={{ fontWeight: 500, color: 'var(--color-text-muted)', padding: 'var(--spacing-sm)' }}>{t('widgets.currency')}</th>
              <th style={{ fontWeight: 500, color: 'var(--color-text-muted)', padding: 'var(--spacing-sm)' }}>{t('widgets.rate')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 'var(--spacing-sm)' }}>USD</td>
              <td className="fw-semibold" style={{ padding: 'var(--spacing-sm)', color: 'var(--color-primary)' }}>{getRate('USD')} ฿</td>
            </tr>
            <tr>
              <td style={{ padding: 'var(--spacing-sm)' }}>EUR</td>
              <td className="fw-semibold" style={{ padding: 'var(--spacing-sm)', color: 'var(--color-primary)' }}>{getRate('EUR')} ฿</td>
            </tr>
            <tr>
              <td style={{ padding: 'var(--spacing-sm)' }}>GBP</td>
              <td className="fw-semibold" style={{ padding: 'var(--spacing-sm)', color: 'var(--color-primary)' }}>{getRate('GBP')} ฿</td>
            </tr>
            <tr>
              <td style={{ padding: 'var(--spacing-sm)' }}>JPY (100)</td>
              <td className="fw-semibold" style={{ padding: 'var(--spacing-sm)', color: 'var(--color-primary)' }}>
                {rates ? (100 / rates['JPY']).toFixed(2) : "..."} ฿
              </td>
            </tr>
            <tr>
              <td style={{ padding: 'var(--spacing-sm)' }}>CNY</td>
              <td className="fw-semibold" style={{ padding: 'var(--spacing-sm)', color: 'var(--color-primary)' }}>{getRate('CNY')} ฿</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer className="text-center" style={{ backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-border)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', padding: 'var(--spacing-sm)' }}>
        {t('widgets.updated')}: {lastUpdated}
      </Card.Footer>
    </Card>
  );
};

export default CurrencyWidget;