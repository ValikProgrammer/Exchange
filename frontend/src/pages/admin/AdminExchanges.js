// frontend/src/pages/admin/AdminExchanges.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Badge, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faEye, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { exchangeService } from '../../services/exchangeService';

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
`;

const StyledTable = styled(Table)`
  background-color: #1a2c38;
  color: white;
  
  th {
    background-color: #0f1923;
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  td {
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const StatusBadge = styled(Badge)`
  font-size: 0.85rem;
  padding: 0.5em 0.75em;
`;

const ActionButton = styled(Button)`
  margin-right: 5px;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
`;

const AdminExchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  
  // Загрузка обменов при монтировании компонента
  useEffect(() => {
    loadExchanges();
  }, []);
  
  // Загрузка списка обменов
  const loadExchanges = () => {
    const allExchanges = exchangeService.getAllExchanges();
    setExchanges(allExchanges);
  };
  
  // Открытие модального окна с деталями обмена
  const handleViewDetails = (exchange) => {
    setSelectedExchange(exchange);
    setShowDetailsModal(true);
  };
  
  // Открытие модального окна для обработки обмена
  const handleProcessExchange = (exchange) => {
    setSelectedExchange(exchange);
    setShowProcessModal(true);
  };
  
  // Обработка обмена (перевод средств)
  const handleConfirmProcess = () => {
    if (selectedExchange) {
      // Выполнение перевода
      exchangeService.processExchange(selectedExchange.id);
      
      // Обновление списка обменов
      loadExchanges();
      
      // Закрытие модального окна
      setShowProcessModal(false);
    }
  };
  
  // Получение класса для бейджа статуса
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'danger';
      default:
        return 'secondary';
    }
  };
  
  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  return (
    <Container>
      <PageTitle>Управление обменами</PageTitle>
      
      <StyledTable responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Дата</th>
            <th>От</th>
            <th>К</th>
            <th>Адрес</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {exchanges.length > 0 ? (
            exchanges.map(exchange => (
              <tr key={exchange.id}>
                <td>{exchange.id.substring(0, 8)}...</td>
                <td>{formatDate(exchange.createdAt)}</td>
                <td>{exchange.fromAmount} {exchange.fromCurrency}</td>
                <td>{exchange.toAmount.toFixed(8)} {exchange.toCurrency}</td>
                <td>{exchange.walletAddress.substring(0, 10)}...</td>
                <td>
                  <StatusBadge bg={getStatusBadgeVariant(exchange.status)}>
                    {exchange.status}
                  </StatusBadge>
                </td>
                <td>
                  <ActionButton 
                    variant="info" 
                    onClick={() => handleViewDetails(exchange)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </ActionButton>
                  
                  {exchange.status === 'pending' && (
                    <ActionButton 
                      variant="success" 
                      onClick={() => handleProcessExchange(exchange)}
                    >
                      <FontAwesomeIcon icon={faExchangeAlt} />
                    </ActionButton>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">Нет данных об обменах</td>
            </tr>
          )}
        </tbody>
      </StyledTable>
      
      {/* Модальное окно с деталями обмена */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Детали обмена</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedExchange && (
            <div>
              <p><strong>ID:</strong> {selectedExchange.id}</p>
              <p><strong>Создан:</strong> {formatDate(selectedExchange.createdAt)}</p>
              <p><strong>Обновлен:</strong> {formatDate(selectedExchange.updatedAt)}</p>
              <p><strong>Отправлено:</strong> {selectedExchange.fromAmount} {selectedExchange.fromCurrency}</p>
              <p><strong>Получено:</strong> {selectedExchange.toAmount.toFixed(8)} {selectedExchange.toCurrency}</p>
              <p><strong>Адрес кошелька:</strong> {selectedExchange.walletAddress}</p>
              <p>
                <strong>Статус:</strong> 
                <StatusBadge bg={getStatusBadgeVariant(selectedExchange.status)} className="ms-2">
                  {selectedExchange.status}
                </StatusBadge>
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Модальное окно для обработки обмена */}
      <Modal show={showProcessModal} onHide={() => setShowProcessModal(false)}>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Обработка обмена</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          {selectedExchange && (
            <div>
              <p>Вы собираетесь обработать следующий обмен:</p>
              <p><strong>ID:</strong> {selectedExchange.id}</p>
              <p><strong>Отправлено:</strong> {selectedExchange.fromAmount} {selectedExchange.fromCurrency}</p>
              <p><strong>К отправке:</strong> {selectedExchange.toAmount.toFixed(8)} {selectedExchange.toCurrency}</p>
              <p><strong>Адрес кошелька:</strong> {selectedExchange.walletAddress}</p>
              
              <Form.Group className="mt-4">
                <Form.Check
                  type="checkbox"
                  id="confirm-checkbox"
                  label="Я подтверждаю, что средства были отправлены на указанный адрес"
                />
              </Form.Group>
              
              <div className="alert alert-warning mt-3">
                <strong>Внимание!</strong> Эта операция имитирует отправку средств. В реальном проекте здесь должна быть интеграция с API кошелька.
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowProcessModal(false)}>
            Отмена
          </Button>
          <Button variant="success" onClick={handleConfirmProcess}>
            <FontAwesomeIcon icon={faCheck} className="me-2" />
            Подтвердить отправку
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminExchanges;