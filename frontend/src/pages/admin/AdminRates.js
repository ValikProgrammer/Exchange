import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPercent, faCog, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 30px;
`;

const SettingsCard = styled(Card)`
  background-color: #1a2c38;
  border: none;
  border-radius: 10px;
  margin-bottom: 30px;
`;

const CardHeader = styled(Card.Header)`
  background-color: #0f1923;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px 20px;
`;

const CardTitle = styled.h5`
  margin: 0;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const CardIcon = styled.span`
  margin-right: 10px;
  color: #007bff;
`;

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    feePercentage: 3,
    minExchangeAmount: 10,
    maxExchangeAmount: 10000,
    autoApproveExchanges: true,
    maintenanceMode: false
  });
  
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Имитация сохранения настроек
    setTimeout(() => {
      setAlert({
        show: true,
        variant: 'success',
        message: 'Настройки успешно сохранены!'
      });
      
      // Скрыть уведомление через 3 секунды
      setTimeout(() => {
        setAlert({ show: false, variant: '', message: '' });
      }, 3000);
    }, 500);
  };
  
  return (
    <Container>
      <PageTitle>Настройки системы</PageTitle>
      
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <SettingsCard>
          <CardHeader>
            <CardTitle>
              <CardIcon>
                <FontAwesomeIcon icon={faPercent} />
              </CardIcon>
              Настройки комиссий
            </CardTitle>
          </CardHeader>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Комиссия за обмен (%)</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                max="100"
                name="feePercentage"
                value={settings.feePercentage}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Комиссия, взимаемая с каждого обмена
              </Form.Text>
            </Form.Group>
          </Card.Body>
        </SettingsCard>
        
        <SettingsCard>
          <CardHeader>
            <CardTitle>
              <CardIcon>
                <FontAwesomeIcon icon={faExchangeAlt} />
              </CardIcon>
              Настройки обменов
            </CardTitle>
          </CardHeader>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Минимальная сумма обмена (USDT)</Form.Label>
              <Form.Control
                type="number"
                step="1"
                min="0"
                name="minExchangeAmount"
                value={settings.minExchangeAmount}
                onChange={handleChange}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Максимальная сумма обмена (USDT)</Form.Label>
              <Form.Control
                type="number"
                step="100"
                min="0"
                name="maxExchangeAmount"
                value={settings.maxExchangeAmount}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Установите 0 для отключения ограничения
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Автоматическое подтверждение обменов"
                name="autoApproveExchanges"
                checked={settings.autoApproveExchanges}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Если включено, обмены будут автоматически подтверждаться после получения средств
              </Form.Text>
            </Form.Group>
          </Card.Body>
        </SettingsCard>
        
        <SettingsCard>
          <CardHeader>
            <CardTitle>
              <CardIcon>
                <FontAwesomeIcon icon={faCog} />
              </CardIcon>
              Общие настройки
            </CardTitle>
          </CardHeader>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Режим технического обслуживания"
                name="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Если включено, сайт будет недоступен для пользователей
              </Form.Text>
            </Form.Group>
          </Card.Body>
        </SettingsCard>
        
        <div className="d-flex justify-content-end">
          <Button type="submit" variant="primary">
            <FontAwesomeIcon icon={faSave} className="me-2" />
            Сохранить настройки
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AdminSettings;