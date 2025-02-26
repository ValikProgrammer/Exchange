import React, { useState } from 'react';
import { Container, Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faWallet, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

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

const CopyButton = styled(Button)`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
`;

const AdminWallets = () => {
  // Имитация данных о кошельках
  const [wallets, setWallets] = useState([
    { id: 1, currency: 'USDT', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', balance: 15420.45, active: true },
    { id: 2, currency: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', balance: 0.85, active: true },
    { id: 3, currency: 'ETH', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', balance: 12.34, active: true },
    { id: 4, currency: 'BNB', address: 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2', balance: 45.67, active: true },
    { id: 5, currency: 'SOL', address: '8ZUgm2XQFXcdUFBQffVpyJQZQJYxpJH7j7SBdBnKX8Yn', balance: 123.45, active: true },
    { id: 6, currency: 'ADA', address: 'addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', balance: 2345.67, active: true },
    { id: 7, currency: 'XRP', address: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh', balance: 789.01, active: true }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(null);
  const [formData, setFormData] = useState({
    currency: '',
    address: '',
    active: true
  });
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  const [copied, setCopied] = useState(null);
  
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentWallet(null);
    setFormData({
      currency: '',
      address: '',
      active: true
    });
  };
  
  const handleShowModal = (wallet = null) => {
    if (wallet) {
      setCurrentWallet(wallet);
      setFormData({
        currency: wallet.currency,
        address: wallet.address,
        active: wallet.active
      });
    }
    setShowModal(true);
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentWallet) {
      // Обновление существующего кошелька
      setWallets(prev => prev.map(wallet => 
        wallet.id === currentWallet.id ? 
        { ...wallet, ...formData } : 
        wallet
      ));
      
      setAlert({
        show: true,
        variant: 'success',
        message: `Кошелек ${formData.currency} успешно обновлен!`
      });
    } else {
      // Добавление нового кошелька
      const newWallet = {
        id: wallets.length > 0 ? Math.max(...wallets.map(w => w.id)) + 1 : 1,
        ...formData,
        balance: 0
      };
      
      setWallets(prev => [...prev, newWallet]);
      
      setAlert({
        show: true,
        variant: 'success',
        message: `Кошелек ${formData.currency} успешно добавлен!`
      });
    }
    
    handleCloseModal();
    
    // Скрыть уведомление через 3 секунды
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 3000);
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот кошелек?')) {
      setWallets(prev => prev.filter(wallet => wallet.id !== id));
      
      setAlert({
        show: true,
        variant: 'success',
        message: 'Кошелек успешно удален!'
      });
      
      // Скрыть уведомление через 3 секунды
      setTimeout(() => {
        setAlert({ show: false, variant: '', message: '' });
      }, 3000);
    }
  };
  
  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopied(address);
        setTimeout(() => setCopied(null), 2000);
      })
      .catch(err => console.error('Не удалось скопировать адрес:', err));
  };
  
  return (
    <Container>
      <PageTitle>Управление кошельками</PageTitle>
      
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      
      <div className="d-flex justify-content-end mb-4">
        <Button variant="primary" onClick={() => handleShowModal()}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Добавить кошелек
        </Button>
      </div>
      
      <TableContainer>
        <StyledTable responsive hover variant="dark">
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Адрес</th>
              <th>Баланс</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map(wallet => (
              <tr key={wallet.id}>
                <td>
                  <FontAwesomeIcon icon={faWallet} className="me-2 text-primary" />
                  {wallet.currency}
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="text-truncate me-2" style={{ maxWidth: '200px' }}>
                      {wallet.address}
                    </span>
                    <CopyButton 
                      variant={copied === wallet.address ? "success" : "outline-secondary"}
                      size="sm"
                      onClick={() => handleCopyAddress(wallet.address)}
                    >
                      <FontAwesomeIcon icon={copied === wallet.address ? faCheck : faCopy} />
                    </CopyButton>
                  </div>
                </td>
                <td>{wallet.balance} {wallet.currency}</td>
                <td>
                  <span className={`badge bg-${wallet.active ? 'success' : 'danger'}`}>
                    {wallet.active ? 'Активен' : 'Неактивен'}
                  </span>
                </td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleShowModal(wallet)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDelete(wallet.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
      
      {/* Модальное окно для добавления/редактирования кошелька */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>
            {currentWallet ? 'Редактировать кошелек' : 'Добавить новый кошелек'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Валюта</Form.Label>
              <Form.Control
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Адрес кошелька</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Активен"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
            </Form.Group>
            
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleCloseModal}>
                Отмена
              </Button>
              <Button variant="primary" type="submit">
                {currentWallet ? 'Сохранить' : 'Добавить'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminWallets;