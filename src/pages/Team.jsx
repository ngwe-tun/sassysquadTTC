import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Team = () => {
    const { t } = useTranslation();

    const teamMembers = [
        {
            id: 1,
            name: t('team.member1.name'),
            role: t('team.member1.role'),
            bio: t('team.member1.bio'),
            image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&size=200&background=E74C3C&color=fff&bold=true'
        },
        {
            id: 2,
            name: t('team.member2.name'),
            role: t('team.member2.role'),
            bio: t('team.member2.bio'),
            image: 'https://ui-avatars.com/api/?name=Michael+Chen&size=200&background=3498DB&color=fff&bold=true'
        },
        {
            id: 3,
            name: t('team.member3.name'),
            role: t('team.member3.role'),
            bio: t('team.member3.bio'),
            image: 'https://ui-avatars.com/api/?name=Aisha+Patel&size=200&background=2ECC71&color=fff&bold=true'
        },
        {
            id: 4,
            name: t('team.member4.name'),
            role: t('team.member4.role'),
            bio: t('team.member4.bio'),
            image: 'https://ui-avatars.com/api/?name=David+Martinez&size=200&background=F39C12&color=fff&bold=true'
        }
    ];

    return (
        <Container className="py-5">
            {/* Hero Section */}
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-3" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-3xl)' }}>
                    {t('team.title')}
                </h1>
                <p className="mb-0" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-lg)', maxWidth: '700px', margin: '0 auto' }}>
                    {t('team.subtitle')}
                </p>
            </div>

            {/* Team Grid */}
            <Row className="g-4 justify-content-center">
                {teamMembers.map((member) => (
                    <Col key={member.id} md={6} lg={6} xl={5}>
                        <Card className="h-100 border-0 shadow-sm hover-shadow transition" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                            <Card.Body className="p-4 text-center">
                                {/* Profile Image */}
                                <div className="mb-4">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="rounded-circle shadow-sm"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'cover',
                                            border: '4px solid var(--color-background)'
                                        }}
                                    />
                                </div>

                                {/* Name & Role */}
                                <h4 className="fw-bold mb-2" style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-xl)' }}>
                                    {member.name}
                                </h4>
                                <p className="mb-3" style={{ color: 'var(--color-primary)', fontSize: 'var(--font-size-base)', fontWeight: 600 }}>
                                    {member.role}
                                </p>

                                {/* Bio */}
                                <p className="mb-4" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
                                    {member.bio}
                                </p>

                                {/* Social Links */}
                                <div className="d-flex justify-content-center gap-3">
                                    <a
                                        href="#"
                                        className="text-decoration-none d-flex align-items-center justify-content-center rounded-circle border hover-lift transition"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            color: 'var(--color-text-muted)',
                                            borderColor: 'var(--color-border)',
                                            backgroundColor: 'var(--color-background)'
                                        }}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <FaLinkedin size={18} />
                                    </a>
                                    <a
                                        href="#"
                                        className="text-decoration-none d-flex align-items-center justify-content-center rounded-circle border hover-lift transition"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            color: 'var(--color-text-muted)',
                                            borderColor: 'var(--color-border)',
                                            backgroundColor: 'var(--color-background)'
                                        }}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <FaGithub size={18} />
                                    </a>
                                    <a
                                        href="#"
                                        className="text-decoration-none d-flex align-items-center justify-content-center rounded-circle border hover-lift transition"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            color: 'var(--color-text-muted)',
                                            borderColor: 'var(--color-border)',
                                            backgroundColor: 'var(--color-background)'
                                        }}
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <FaEnvelope size={18} />
                                    </a>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Team;
