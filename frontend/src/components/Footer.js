import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTelegram, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

const FooterWrapper = styled.footer`
  background-color: #0a1017;
  color: rgba(255, 255, 255, 0.7);
  padding: 60px 0 30px;
  margin-top: 80px;
`;

const FooterLogo = styled.img`
  height: 40px;
  margin-bottom: 20px;
`;

const FooterTitle = styled.h5`
  color: white;
  font-weight: 600;
  margin-bottom: 20px;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const SocialIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  margin-right: 20px;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s;
  
  &:hover {
    color: white;
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterWrapper>
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <FooterLogo src="/images/logo.svg" alt="CryptoExchange" />
            <p>
              Быстрый и безопасный обмен криптовалют. Мы предлагаем лучшие курсы и мгновенные транзакции для всех поддерживаемых криптовалют.
            </p>
            <div className="mt-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <SocialIcon icon={faTwitter} />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                <SocialIcon icon={faTelegram} />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <SocialIcon icon={faDiscord} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <SocialIcon icon={faGithub} />
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <FooterTitle>Навигация</FooterTitle>
            <FooterLink to="/">Главная</FooterLink>
            <FooterLink to="/exchange">Обмен</FooterLink>
            <FooterLink to="/about">О нас</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/contact">Контакты</FooterLink>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <FooterTitle>Криптовалюты</FooterTitle>
            <FooterLink to="/exchange?from=USDT&to=BTC">USDT → Bitcoin</FooterLink>
            <FooterLink to="/exchange?from=USDT&to=ETH">USDT → Ethereum</FooterLink>
            <FooterLink to="/exchange?from=USDT&to=BNB">USDT → Binance Coin</FooterLink>
            <FooterLink to="/exchange?from=USDT&to=SOL">USDT → Solana</FooterLink>
            <FooterLink to="/exchange?from=USDT&to=DOGE">USDT → Dogecoin</FooterLink>
          </Col>
          
          <Col lg={3} md={6}>
            <FooterTitle>Контакты</FooterTitle>
            <p>Email: support@cryptoexchange.com</p>
            <p>Telegram: @cryptoexchange_support</p>
            <p>Часы работы: 24/7</p>
          </Col>
        </Row>
        
        <Copyright>
          &copy; {currentYear} CryptoExchange. Все права защищены.
        </Copyright>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;