// frontend/src/pages/HomePage.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ExchangeForm from '../components/ExchangeForm';

const HeroSection = styled.section`
  padding: 120px 0 60px;
  background: linear-gradient(135deg, #4169e1 0%, #3a7bd5 100%);
  color: white;
  text-align: center;
  margin-bottom: 0;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ExchangeSection = styled.section`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: -50px;
  margin-bottom: 60px;
  position: relative;
  z-index: 10;
  padding: 30px;
`;

const VipNotice = styled.div`
  background-color: rgba(65, 105, 225, 0.1);
  border-radius: 5px;
  padding: 10px 15px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #4169e1;
`;

const FeaturesSection = styled.section`
  padding: 80px 0;
  background-color: #f8f9fa;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #666;
  margin-bottom: 30px;
`;

const HomePage = () => {
  return (
    <>
      <HeroSection>
        <Container>
          <HeroTitle>Просто. Быстро. Крипто.</HeroTitle>
          <HeroSubtitle>
            Удобный и выгодный обмен криптовалют
          </HeroSubtitle>
        </Container>
      </HeroSection>
      
      <Container>
        <ExchangeSection>
          <VipNotice>
            VIP курс если продаёте от 20 тыс. USDT
          </VipNotice>
          <ExchangeForm />
        </ExchangeSection>
        
        <FeaturesSection>
          <Row>
            <Col md={4}>
              <FeatureTitle>Быстрый обмен</FeatureTitle>
              <FeatureDescription>
                Мгновенный обмен криптовалют без лишних задержек. Получайте ваши средства в течение нескольких минут.
              </FeatureDescription>
            </Col>
            <Col md={4}>
              <FeatureTitle>Выгодные курсы</FeatureTitle>
              <FeatureDescription>
                Мы предлагаем конкурентные курсы обмена и регулярно обновляем их в соответствии с рыночными условиями.
              </FeatureDescription>
            </Col>
            <Col md={4}>
              <FeatureTitle>Безопасность</FeatureTitle>
              <FeatureDescription>
                Ваши транзакции защищены современными технологиями шифрования и проходят через безопасные каналы.
              </FeatureDescription>
            </Col>
          </Row>
        </FeaturesSection>
      </Container>
    </>
  );
};

export default HomePage;