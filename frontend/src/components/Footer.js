// frontend/src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTelegram, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png'; // Убедитесь, что у вас есть этот файл

const FooterWrapper = styled.footer`
  background-color: #3158d8;
  padding: 60px 0 30px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 80px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  margin-bottom: 15px;
  
  &:hover {
    color: white;
    opacity: 0.9;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const FooterLink = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 12px;
  text-decoration: none;
  font-size: 0.95rem;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  margin-right: 20px;
  transition: transform 0.2s;
  
  &:hover {
    color: white;
    transform: translateY(-3px);
  }
`;

const FooterTitle = styled.h5`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 0.95rem;
`;

const ContactIcon = styled.span`
  margin-right: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const Copyright = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const PaymentMethods = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
`;

const PaymentIcon = styled.img`
  height: 30px;
  opacity: 0.9;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <Logo to="/">
              <LogoImage src={logo} alt="WHITEBIRD" />
              WHITEBIRD
            </Logo>
            <p>
              Быстрый и безопасный обмен криптовалют с выгодными курсами.
              Мы предлагаем лучшие условия и высокую скорость обработки транзакций.
            </p>
            <SocialLinks>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </SocialLink>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTelegram} />
              </SocialLink>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faDiscord} />
              </SocialLink>
            </SocialLinks>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <FooterTitle>Навигация</FooterTitle>
            <FooterLink to="/">Главная</FooterLink>
            <FooterLink to="/exchange">Обмен</FooterLink>
            <FooterLink to="/status">Статус</FooterLink>
            <FooterLink to="/faq">Вопросы-ответы</FooterLink>
            <FooterLink to="/news">Новости</FooterLink>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <FooterTitle>Информация</FooterTitle>
            <FooterLink to="/documents">Документы</FooterLink>
            <FooterLink to="/terms">Условия использования</FooterLink>
            <FooterLink to="/privacy">Политика конфиденциальности</FooterLink>
            <FooterLink to="/aml">AML/KYC политика</FooterLink>
            <FooterLink to="/affiliate">Партнерская программа</FooterLink>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <FooterTitle>Контакты</FooterTitle>
            <ContactItem>
              <ContactIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </ContactIcon>
              support@whitebird.com
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FontAwesomeIcon icon={faPhone} />
              </ContactIcon>
              Телеграм: @whitebird_support
            </ContactItem>
            <ContactItem>
              <ContactIcon>
                <FontAwesomeIcon icon={faShieldAlt} />
              </ContactIcon>
              Время работы: 24/7
            </ContactItem>
          </Col>
        </Row>
        
        <PaymentMethods>
          <PaymentIcon src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025" alt="Bitcoin" />
          <PaymentIcon src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025" alt="Ethereum" />
          <PaymentIcon src="https://cryptologos.cc/logos/tether-usdt-logo.png?v=025" alt="USDT" />
          <PaymentIcon src="https://cryptologos.cc/logos/tron-trx-logo.png?v=025" alt="TRON" />
          <PaymentIcon src="https://cryptologos.cc/logos/bnb-bnb-logo.png?v=025" alt="BNB" />
          <PaymentIcon src="https://cryptologos.cc/logos/solana-sol-logo.png?v=025" alt="Solana" />
        </PaymentMethods>
        
        <Copyright>
          &copy; {new Date().getFullYear()} WHITEBIRD. Все права защищены.
        </Copyright>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;