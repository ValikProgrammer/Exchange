import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExchangeAlt, 
  faShieldAlt, 
  faBolt, 
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import ExchangeForm from '../components/ExchangeForm';

const HeroSection = styled.section`
  padding: 100px 0 80px;
  background: linear-gradient(135deg, #0f1923 0%, #1a2c38 100%);
  position: relative;
  overflow: hidden;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FeatureSection = styled.section`
  padding: 80px 0;
`;

const FeatureCard = styled(Card)`
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

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 20px;
`;

const FeatureTitle = styled(Card.Title)`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
`;

const HomePage = () => {
  return (
    <>
      <HeroSection>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <HeroTitle>Быстрый и безопасный обмен криптовалют</HeroTitle>
              <HeroSubtitle>
                Обменивайте USDT на популярные криптовалюты с лучшими курсами и мгновенными транзакциями
              </HeroSubtitle>
              <Button as={Link} to="/exchange" variant="primary" size="lg" className="me-3">
                <FontAwesomeIcon icon={faExchangeAlt} className="me-2" />
                Начать обмен
              </Button>
            </Col>
            <Col lg={6}>
              <ExchangeForm />
            </Col>
          </Row>
        </Container>
      </HeroSection>
      
      <FeatureSection>
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="mb-4">Почему выбирают нас</h2>
              <p className="text-muted">
                Мы предлагаем лучший сервис для обмена криптовалют
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col md={6} lg={3} className="mb-4">
              <FeatureCard>
                <FeatureIcon>
                  <FontAwesomeIcon icon={faBolt} />
                </FeatureIcon>
                <FeatureTitle>Быстрые транзакции</FeatureTitle>
                <Card.Text>
                  Мгновенный обмен криптовалют без длительного ожидания подтверждений.
                </Card.Text>
              </FeatureCard>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <FeatureCard>
                <FeatureIcon>
                  <FontAwesomeIcon icon={faShieldAlt} />
                </FeatureIcon>
                <FeatureTitle>Безопасность</FeatureTitle>
                <Card.Text>
                  Ваши средства защищены современными технологиями шифрования и безопасности.
                </Card.Text>
              </FeatureCard>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <FeatureCard>
                <FeatureIcon>
                  <FontAwesomeIcon icon={faChartLine} />
                </FeatureIcon>
                <FeatureTitle>Лучшие курсы</FeatureTitle>
                <Card.Text>
                  Мы предлагаем конкурентные курсы обмена с минимальной комиссией.
                </Card.Text>
              </FeatureCard>
            </Col>
            
            <Col md={6} lg={3} className="mb-4">
              <FeatureCard>
                <FeatureIcon>
                  <FontAwesomeIcon icon={faExchangeAlt} />
                </FeatureIcon>
                <FeatureTitle>Множество валют</FeatureTitle>
                <Card.Text>
                  Поддержка популярных криптовалют для обмена с USDT.
                </Card.Text>
              </FeatureCard>
            </Col>
          </Row>
        </Container>
      </FeatureSection>
    </>
  );
};

export default HomePage;