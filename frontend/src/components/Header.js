// frontend/src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png'; // Создайте папку assets и добавьте логотип

const StyledNavbar = styled(Navbar)`
  background-color: #4169e1;
  padding: 15px 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
  
  &.scrolled {
    background-color: rgba(65, 105, 225, 0.95);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  
  &:hover {
    color: white;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const StyledNavLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.9);
  margin: 0 15px;
  font-weight: 500;
  text-decoration: none;
  position: relative;
  padding: 5px 0;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }
  
  &:hover, &.active {
    color: white;
    
    &:after {
      width: 100%;
    }
  }
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <StyledNavbar expand="lg" variant="dark" className={scrolled ? 'scrolled' : ''}>
      <Container>
        <Navbar.Brand as="div">
          <Logo to="/">
            <LogoImage src={logo} alt="WHITEBIRD" />
            WHITEBIRD
          </Logo>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <StyledNavLink to="/exchange" className={({ isActive }) => isActive ? 'active' : ''}>
              Обмен
            </StyledNavLink>
            <StyledNavLink to="/status" className={({ isActive }) => isActive ? 'active' : ''}>
              Статус
            </StyledNavLink>
            <StyledNavLink to="/faq" className={({ isActive }) => isActive ? 'active' : ''}>
              Вопросы-ответы
            </StyledNavLink>
            <StyledNavLink to="/news" className={({ isActive }) => isActive ? 'active' : ''}>
              Новости
            </StyledNavLink>
            <StyledNavLink to="/documents" className={({ isActive }) => isActive ? 'active' : ''}>
              Документы
            </StyledNavLink>
            <StyledNavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
              Поддержка
            </StyledNavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default Header;