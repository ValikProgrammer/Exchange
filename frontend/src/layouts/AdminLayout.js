import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faExchangeAlt, 
  faChartLine, 
  faCog, 
  faWallet,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';


const AdminContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AdminHeader = styled(Navbar)`
  background-color: #0f1923;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SidebarContainer = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #0f1923;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarNav = styled(Nav)`
  flex-direction: column;
`;

const SidebarLink = styled(Nav.Link)`
  color: rgba(255, 255, 255, 0.7);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-left: 3px solid transparent;
  
  &:hover, &.active {
    color: white;
    background-color: rgba(255, 255, 255, 0.05);
    border-left-color: #007bff;
  }
  
  svg {
    margin-right: 10px;
    width: 20px;
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 30px;
  background-color: #0f1923;
`;

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Добавьте эту строку
    
    const handleLogout = () => {
      logout();
      navigate('/');
    };
    
    return (
      <AdminContainer>
        {/* ... остальной код ... */}
        
        <SidebarContainer>
          <Sidebar>
            <SidebarNav>
              <SidebarLink as={Link} to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                <FontAwesomeIcon icon={faTachometerAlt} />
                Дашборд
              </SidebarLink>
              <SidebarLink as={Link} to="/admin/exchanges" className={location.pathname === '/admin/exchanges' ? 'active' : ''}>
                <FontAwesomeIcon icon={faExchangeAlt} />
                Обмены
              </SidebarLink>
              <SidebarLink as={Link} to="/admin/rates" className={location.pathname === '/admin/rates' ? 'active' : ''}>
                <FontAwesomeIcon icon={faChartLine} />
                Курсы валют
              </SidebarLink>
              <SidebarLink as={Link} to="/admin/wallets" className={location.pathname === '/admin/wallets' ? 'active' : ''}>
                <FontAwesomeIcon icon={faWallet} />
                Кошельки
              </SidebarLink>
              <SidebarLink as={Link} to="/admin/settings" className={location.pathname === '/admin/settings' ? 'active' : ''}>
                <FontAwesomeIcon icon={faCog} />
                Настройки
              </SidebarLink>
            </SidebarNav>
          </Sidebar>
          
          <Content>
            <Outlet />
          </Content>
        </SidebarContainer>
      </AdminContainer>
    );
  };
  
  export default AdminLayout;