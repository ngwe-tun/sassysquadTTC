import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer style={{
            backgroundColor: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            marginTop: 'var(--spacing-3xl)',
            paddingTop: 'var(--spacing-2xl)',
            paddingBottom: 'var(--spacing-xl)'
        }}>
            <Container>
                <Row className="g-4">
                    {/* About Section */}
                    <Col md={4}>
                        <h5 className="fw-bold mb-3" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-lg)' }}>
                            {t('footer.about')}
                        </h5>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
                            {t('footer.aboutText')}
                        </p>
                        <Link to="/team" className="text-decoration-none" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-sm)' }}>
                            {t('footer.meetTeam')} →
                        </Link>
                    </Col>

                    {/* Quick Links */}
                    <Col md={3}>
                        <h5 className="fw-bold mb-3" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-lg)' }}>
                            {t('footer.quickLinks')}
                        </h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-decoration-none" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                    {t('nav.home')}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/chat" className="text-decoration-none" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                    {t('nav.chat')}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/tours" className="text-decoration-none" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                    {t('nav.tours')}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/team" className="text-decoration-none" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                    {t('nav.team')}
                                </Link>
                            </li>
                        </ul>
                    </Col>

                    {/* Contact Info */}
                    <Col md={5}>
                        <h5 className="fw-bold mb-3" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-lg)' }}>
                            {t('footer.contact')}
                        </h5>
                        <div className="mb-2 d-flex align-items-start gap-2">
                            <FaEnvelope style={{ color: 'var(--color-primary)', marginTop: '4px', flexShrink: 0 }} />
                            <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                contact@sassysquad.travel
                            </span>
                        </div>
                        <div className="mb-2 d-flex align-items-start gap-2">
                            <FaPhone style={{ color: 'var(--color-primary)', marginTop: '4px', flexShrink: 0 }} />
                            <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                +66 (0) 2-123-4567
                            </span>
                        </div>
                        <div className="mb-3 d-flex align-items-start gap-2">
                            <FaMapMarkerAlt style={{ color: 'var(--color-primary)', marginTop: '4px', flexShrink: 0 }} />
                            <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                Bangkok, Thailand
                            </span>
                        </div>

                        {/* Social Media */}
                        <div className="mt-3">
                            <p className="fw-semibold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-sm)' }}>
                                {t('footer.followUs')}
                            </p>
                            <div className="d-flex gap-3">
                                <a
                                    href="#"
                                    className="text-decoration-none d-flex align-items-center justify-content-center rounded-circle border hover-lift transition"
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        color: 'var(--color-text-muted)',
                                        borderColor: 'var(--color-border)',
                                        backgroundColor: 'var(--color-background)'
                                    }}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <FaLinkedin size={16} />
                                </a>
                                <a
                                    href="#"
                                    className="text-decoration-none d-flex align-items-center justify-content-center rounded-circle border hover-lift transition"
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        color: 'var(--color-text-muted)',
                                        borderColor: 'var(--color-border)',
                                        backgroundColor: 'var(--color-background)'
                                    }}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <FaGithub size={16} />
                                </a>
                                <a
                                    href="#"
                                    className="text-decoration-none d-flex align-items-center justify-content-center rounded-circle border hover-lift transition"
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        color: 'var(--color-text-muted)',
                                        borderColor: 'var(--color-border)',
                                        backgroundColor: 'var(--color-background)'
                                    }}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <FaEnvelope size={16} />
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Copyright Bar */}
                <hr className="my-4" style={{ borderColor: 'var(--color-border)' }} />
                <div className="text-center">
                    <p className="mb-0" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                        {t('footer.copyright')}
                    </p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
