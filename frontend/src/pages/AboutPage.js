import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faShieldAlt, faGlobe, faHandshake } from '@fortawesome/free-solid-svg-icons';

const PageHeader = styled.div`
  padding: 60px 0 40px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 700px;
  margin: 0 auto;
`;

const Section = styled.section`
  padding: 60px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
`;

const ValueCard = styled(Card)`
  background-color: #1a2c38;
  border: none;
  border-radius: 10px;
  padding: 30px;
  height: 100%;
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 20px;
`;

const ValueTitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
`;

const AboutPage = () => {
  return (
    <Container>
      <PageHeader>
        <PageTitle>О нас</PageTitle>
        <PageDescription>
          Узнайте больше о нашей компании и нашей миссии в мире криптовалют
        </PageDescription>
      </PageHeader>
      
      <Section>
        <Row>
          <Col lg={6} className="mb-4 mb-lg-0">
            <SectionTitle>Наша история</SectionTitle>
            <p>
              CryptoExchange был основан в 2023 году группой энтузиастов криптовалют, которые увидели необходимость в создании простой и безопасной платформы для обмена цифровых активов.
            </p>
            <p>
              С момента основания наша цель остается неизменной: предоставить пользователям самый удобный и безопасный способ обмена криптовалют с минимальными комиссиями и максимальной скоростью.
            </p>
            <p>
              За короткое время мы выросли из небольшого стартапа в надежную платформу, которой доверяют тысячи пользователей по всему миру.
            </p>
          </Col>
          <Col lg={6}>
            <SectionTitle>Наша миссия</SectionTitle>
            <p>
              Мы стремимся сделать обмен криптовалют доступным для всех, независимо от уровня технических знаний или опыта в мире криптовалют.
            </p>
            <p>
              Наша миссия — создать экосистему, где каждый может безопасно и быстро обменивать цифровые активы, не беспокоясь о сложных процессах или безопасности своих средств.
            </p>
            <p>
              Мы постоянно работаем над улучшением нашего сервиса, внедряя новые технологии и функции, чтобы обеспечить лучший опыт для наших пользователей.
            </p>
          </Col>
        </Row>
      </Section>
      
      <Section>
        <SectionTitle className="text-center mb-5">Наши ценности</SectionTitle>
        <Row>
          <Col md={6} lg={3} className="mb-4">
            <ValueCard>
              <ValueIcon>
                <FontAwesomeIcon icon={faShieldAlt} />
              </ValueIcon>
              <ValueTitle>Безопасность</ValueTitle>
              <Card.Text>
                Безопасность ваших средств и данных — наш главный приоритет. Мы используем передовые технологии шифрования и многоуровневую защиту.
              </Card.Text>
            </ValueCard>
          </Col>
          
          <Col md={6} lg={3} className="mb-4">
            <ValueCard>
              <ValueIcon>
                <FontAwesomeIcon icon={faUsers} />
              </ValueIcon>
              <ValueTitle>Клиентоориентированность</ValueTitle>
              <Card.Text>
                Мы ставим потребности наших пользователей на первое место и постоянно работаем над улучшением пользовательского опыта.
              </Card.Text>
            </ValueCard>
          </Col>
          
          <Col md={6} lg={3} className="mb-4">
            <ValueCard>
              <ValueIcon>
                <FontAwesomeIcon icon={faGlobe} />
              </ValueIcon>
              <ValueTitle>Доступность</ValueTitle>
              <Card.Text>
                Мы стремимся сделать наш сервис доступным для пользователей по всему миру, независимо от их местоположения.
              </Card.Text>
            </ValueCard>
          </Col>
          
          <Col md={6} lg={3} className="mb-4">
            <ValueCard>
              <ValueIcon>
                <FontAwesomeIcon icon={faHandshake} />
              </ValueIcon>
              <ValueTitle>Прозрачность</ValueTitle>
              <Card.Text>
                Мы верим в честность и прозрачность во всех аспектах нашего бизнеса, от комиссий до процессов обмена.
              </Card.Text>
            </ValueCard>
          </Col>
        </Row>
      </Section>
    </Container>
  );
};

export default AboutPage;