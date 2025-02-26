import React, { useState, useEffect } from 'react';
import { Container, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faCheckCircle, faExclamationTriangle, faClock } from '@fortawesome/free-solid-svg-icons';
import { exchangeService } from '../../services/exchangeService';

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
`;

const TableContainer = styled.div`
  background-color: #1a2c38;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const StyledTable = styled(Table)`
  margin-bottom: 0;
  
  th {
    background-color: #0f1923;
    color: white;
    font-weight: 600;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    padding: 15px;
  }
  
  td {
    vertical-align: middle;
    padding: 15px;
    border-color: rgba(255, 255, 255, 0.05);
  }
`;

const SearchBar = styled.div`
  margin-bottom: 20px;
`;

const AdminExchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [filteredExchanges, setFilteredExchanges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    // Загрузка данных об обменах
    const allExchanges = exchangeService.getAllExchanges();
    setExchanges(allExchanges);
    setFilteredExchanges(allExchanges);
  }, []);
  
  useEffect(() => {
    // Фильтрация обменов при изменении поискового запроса или фильтра статуса
    let filtered = exchanges;
    
    if (searchTerm) {
      filtered = filtered.filter(exchange => 
        exchange.id.includes(searchTerm) || 
        exchange.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(exchange => exchange.status === statusFilter);
    }
    
    setFilteredExchanges(filtered);
  }, [searchTerm, statusFilter, exchanges]);
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Badge bg="warning">
            <FontAwesomeIcon icon={faClock} className="me-1" />
            Ожидание
          </Badge>
        );
      case 'completed':
        return (
          <Badge bg="success">
            <FontAwesomeIcon icon={faCheckCircle} className="me-1" />
            Завершен
          </Badge>
        );
      case 'failed':
        return (
          <Badge bg="danger">
            <FontAwesomeIcon icon={faExclamationTriangle} className="me-1" />
            Ошибка
          </Badge>
        );
      default:
        return (
          <Badge bg="secondary">
            <FontAwesomeIcon icon={faClock} className="me-1" />
            {status}
          </Badge>
        );
    }
  };
  
  return (
    <Container>
      <PageTitle>Управление обменами</PageTitle>
      
      <SearchBar className="row">
        <div className="col-md-6 mb-3 mb-md-0">
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Поиск по ID или адресу кошелька"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="col-md-6">
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faFilter} />
            </InputGroup.Text>
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Все статусы</option>
              <option value="pending">Ожидание</option>
              <option value="completed">Завершен</option>
              <option value="failed">Ошибка</option>
            </Form.Select>
          </InputGroup>
        </div>
      </SearchBar>
      
      <TableContainer>
        <StyledTable responsive hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата</th>
              <th>От</th>
              <th>К</th>
              <th>Адрес кошелька</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredExchanges.length > 0 ? (
              filteredExchanges.map(exchange => (
                <tr key={exchange.id}>
                  <td>{exchange.id}</td>
                  <td>{new Date(exchange.createdAt).toLocaleString()}</td>
                  <td>{exchange.fromAmount} {exchange.fromCurrency}</td>
                  <td>{exchange.toAmount} {exchange.toCurrency}</td>
                  <td>
                    <span className="text-truncate d-inline-block" style={{ maxWidth: '150px' }}>
                      {exchange.walletAddress}
                    </span>
                  </td>
                  <td>{getStatusBadge(exchange.status)}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      Детали
                    </Button>
                    {exchange.status === 'pending' && (
                      <Button 
                        variant="outline-success" 
                        size="sm"
                        onClick={() => {
                          exchangeService.updateExchangeStatus(exchange.id, 'completed');
                          setExchanges([...exchanges]); // Обновление списка
                        }}
                      >
                        Завершить
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  Обмены не найдены
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </TableContainer>
    </Container>
  );
};

export default AdminExchanges;