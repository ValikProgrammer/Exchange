import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Button, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faClock, faExchangeAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { exchangeService } from '../services/exchangeService';

const PageHeader = styled.div`
  padding: 60px 0 40px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const StatusCard = styled(Card)`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: none;
`;

const CardHeader = styled(Card.Header)`
  background-color: #1a2c38;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const CardTitle = styled.h3`
  color: white;
  font-weight: 600;
  margin: 0;
`;

const CardBody = styled(Card.Body)`
  padding: 30px;
`;

const StatusBadge = styled(Badge)`
  font-size: 1rem;
  padding: 8px 15px;
  border-radius: 30px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
`;

const DetailValue = styled.div`
  font-weight: 500;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
`;

const StatusPage = () => {
  const { id } = useParams();
  const [exchange, setExchange] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    try {
      const exchangeData = exchangeService.getExchangeById(id);
      if (exchangeData) {
        setExchange(exchangeData);
      } else {
        setError('Обмен не найден');
      }
    } catch (err) {
      setError('Ошибка при загрузке данных обмена');
    } finally {
      setLoading(false);
    }
  }, [id]);
  
  // Функция для обновления статуса каждые 10 секунд
  useEffect(() => {
    if (!exchange) return;
    
    const interval = setInterval(() => {
      const updatedExchange = exchangeService.getExchangeById(id);
      if (updatedExchange) {
        setExchange(updatedExchange);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [exchange, id]);
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <StatusBadge bg="warning">
            <FontAwesomeIcon icon={faClock} className="me-2" />
            Ожидание
          </StatusBadge>
        );
      case 'completed':
        return (
          <StatusBadge bg="success">
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Завершен
          </StatusBadge>
        );
      case 'failed':
        return (
          <StatusBadge bg="danger">
            <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
            Ошибка
          </StatusBadge>
        );
      default:
        return (
          <StatusBadge bg="secondary">
            <FontAwesomeIcon icon={faClock} className="me-2" />
            {status}
          </StatusBadge>
        );
    }
  };
  
  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
        <p className="mt-3">Загрузка информации об обмене...</p>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
          {error}
        </Alert>
        <div className="text-center mt-4">
          <Button as={Link} to="/" variant="primary">
            <FontAwesomeIcon icon={faHome} className="me-2" />
            Вернуться на главную
          </Button>
        </div>
      </Container>
    );
  }
  
  return (
    <Container>
      <PageHeader>
        <PageTitle>Статус обмена</PageTitle>
      </PageHeader>
      
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <StatusCard>
            <CardHeader className="d-flex justify-content-between align-items-center">
              <CardTitle>Обмен #{exchange.id}</CardTitle>
              {getStatusBadge(exchange.status)}
            </CardHeader>
            <CardBody>
              <DetailRow>
                <DetailLabel>Дата создания</DetailLabel>
                <DetailValue>{new Date(exchange.createdAt).toLocaleString()}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Отправлено</DetailLabel>
                <DetailValue>{exchange.fromAmount} {exchange.fromCurrency}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Получено</DetailLabel>
                <DetailValue>{exchange.toAmount} {exchange.toCurrency}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Адрес кошелька</DetailLabel>
                <DetailValue>{exchange.walletAddress}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Статус</DetailLabel>
                <DetailValue>
                  {exchange.status === 'pending' && 'Ожидание подтверждения транзакции'}
                  {exchange.status === 'completed' && 'Обмен успешно завершен'}
                  {exchange.status === 'failed' && 'Ошибка при выполнении обмена'}
                </DetailValue>
              </DetailRow>
              
              {exchange.status === 'pending' && (
                <Alert variant="info" className="mt-4">
                  <FontAwesomeIcon icon={faClock} className="me-2" />
                  Ожидание подтверждения транзакции. Это может занять некоторое время.
                </Alert>
              )}
              
              {exchange.status === 'completed' && (
                <Alert variant="success" className="mt-4">
                  <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                  Обмен успешно завершен! Средства отправлены на ваш кошелек.
                </Alert>
              )}
              
              {exchange.status === 'failed' && (
                <Alert variant="danger" className="mt-4">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
                  Произошла ошибка при выполнении обмена. Пожалуйста, свяжитесь с поддержкой.
                </Alert>
              )}
              
              <ButtonsContainer>
                <Button as={Link} to="/" variant="outline-primary">
                  <FontAwesomeIcon icon={faHome} className="me-2" />
                  На главную
                </Button>
                <Button as={Link} to="/exchange" variant="primary">
                  <FontAwesomeIcon icon={faExchangeAlt} className="me-2" />
                  Новый обмен
                </Button>
              </ButtonsContainer>
            </CardBody>
          </StatusCard>
        </div>
      </div>
    </Container>
  );
};

export default StatusPage;