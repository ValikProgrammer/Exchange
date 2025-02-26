import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faExchangeAlt, faHistory, faCog } from '@fortawesome/free-solid-svg-icons';

const StyledNavbar = styled(Navbar)`
  padding: 15px 0;
  background-color: rgba(10, 16, 23, 0.95);
  backdrop-filter: blur(10px);
`;

const Logo = styled.img`
  height: 40px;
`;

const NavLink = styled(Nav.Link)`
  color: rgba(255, 255, 255, 0.8) !important;
  margin: 0 10px;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover, &.active {
    color: white !important;
  }
`;

const UserDropdown = styled(NavDropdown)`
  .dropdown-toggle::after {
    display: none;
  }
  
  .dropdown-menu {
    background-color: #1a2c38;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .dropdown-item {
    color: rgba(255, 255, 255, 0.8);
    padding: 10px 15px;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      color: white;
    }
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
`;

const Header = () => {
  const { isAuthenticated, currentUser, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  return (
    <StyledNavbar expand="lg" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Logo src="/images/logo.svg" alt="CryptoExchange" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <NavLink as={Link} to="/">Главная</NavLink>
            <NavLink as={Link} to="/exchange">Обмен</NavLink>
            <NavLink as={Link} to="/about">О нас</NavLink>
            <NavLink as={Link} to="/faq">FAQ</NavLink>
            <NavLink as={Link} to="/contact">Контакты</NavLink>
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <UserDropdown 
                title={
                  <div className="d-flex align-items-center">
                    <UserAvatar>{getInitials(currentUser?.name)}</UserAvatar>
                    <span className="d-none d-md-inline">{currentUser?.name}</span>
                  </div>
                }
                id="user-dropdown"
              >
                <NavDropdown.Item as={Link} to="/history">
                  <FontAwesomeIcon icon={faHistory} className="me-2" />
                  История обменов
                </NavDropdown.Item>
                
                <NavDropdown.Item as={Link} to="/profile">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Профиль
                </NavDropdown.Item>
                
                {isAdmin && (
                  <NavDropdown.Item as={Link} to="/admin">
                    <FontAwesomeIcon icon={faCog} className="me-2" />
                    Панель администратора
                  </NavDropdown.Item>
                )}
                
                <NavDropdown.Divider />
                
                <NavDropdown.Item onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  Выйти
                </NavDropdown.Item>
              </UserDropdown>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-light" 
                  className="me-2"
                >
                  Войти
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary"
                >
                  Регистрация
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
};

export default Header;