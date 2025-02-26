import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faWallet, faDollarSign, faUsers } from '@fortawesome/free-solid-svg-icons';

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
`;

const StatsCard = styled(Card)`
  background-color: #1a2c38;
  border: none;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
`;

const StatsIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: rgba(0, 123, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #007bff;
  margin-right: 15px;
`;

const StatsContent = styled.div`
  flex: 1;
`;

const StatsValue = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
`;

const StatsLabel = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
`;

const AdminDashboard = () => {
  // Имитация данных для дашборда
  const stats = {
    totalExchanges: 1248,
    activeWallets: 7,
    totalVolume: 156789.45,
    users: 843
  };
  
  return (
    <Container>
      <PageTitle>Панель управления</PageTitle>
      
      <Row>
        <Col md={6} lg={3}>
          <StatsCard>
            <div className="d-flex align-items-center">
              <StatsIcon>
                <FontAwesomeIcon icon={faExchangeAlt} />
              </StatsIcon>
              <StatsContent>
                <StatsValue>{stats.totalExchanges}</StatsValue>
                <StatsLabel>Всего обменов</StatsLabel>
              </StatsContent>
            </div>
          </StatsCard>
        </Col>
        
        <Col md={6} lg={3}>
          <StatsCard>
            <div className="d-flex align-items-center">
              <StatsIcon>
                <FontAwesomeIcon icon={faWallet} />
              </StatsIcon>
              <StatsContent>
                <StatsValue>{stats.activeWallets}</StatsValue>
                <StatsLabel>Активных кошельков</StatsLabel>
              </StatsContent>
            </div>
          </StatsCard>
        </Col>
        
        <Col md={6} lg={3}>
          <StatsCard>
            <div className="d-flex align-items-center">
              <StatsIcon>
                <FontAwesomeIcon icon={faDollarSign} />
              </StatsIcon>
              <StatsContent>
                <StatsValue>${stats.totalVolume.toLocaleString()}</StatsValue>
                <StatsLabel>Общий объем (USDT)</StatsLabel>
              </StatsContent>
            </div>
          </StatsCard>
        </Col>
        
        <Col md={6} lg={3}>
          <StatsCard>
            <div className="d-flex align-items-center">
              <StatsIcon>
                <FontAwesomeIcon icon={faUsers} />
              </StatsIcon>
              <StatsContent>
                <StatsValue>{stats.users}</StatsValue>
                <StatsLabel>Пользователей</StatsLabel>
              </StatsContent>
            </div>
          </StatsCard>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Header className="bg-dark">
              <h5 className="mb-0">Последние обмены</h5>
            </Card.Header>
            <Card.Body className="bg-dark">
              <p className="text-center text-muted">Здесь будет график активности обменов</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card>
            <Card.Header className="bg-dark">
              <h5 className="mb-0">Распределение валют</h5>
            </Card.Header>
            <Card.Body className="bg-dark">
              <p className="text-center text-muted">Здесь будет круговая диаграмма распределения валют</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;