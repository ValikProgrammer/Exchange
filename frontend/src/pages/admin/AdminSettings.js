// frontend/src/pages/admin/AdminSettings.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPercent, faCog, faExchangeAlt, faCoins } from '@fortawesome/free-solid-svg-icons';
import { settingsService } from '../../services/settingsService';

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
    discountPercentage: 3,
    discountCoin: 'BTC',
    minExchangeAmount: 10,
    maxExchangeAmount: 10000,
    autoApproveExchanges: true,
    maintenanceMode: false
  });
  
  const [alert, setAlert] = useState({ show: false, variant: '', message: '' });
  
  // Загрузка настроек при монтировании компонента
  useEffect(() => {
    const currentSettings = settingsService.getSettings();
    if (currentSettings) {
      setSettings(currentSettings);
    }
  }, []);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Сохранение настроек через сервис
    settingsService.saveSettings(settings);
    
    // Вывод в консоль для отладки
    console.log('Настройки сохранены:', settings);
    
    // Показать уведомление
    setAlert({
      show: true,
      variant: 'success',
      message: 'Настройки успешно сохранены!'
    });
    
    // Скрыть уведомление через 3 секунды
    setTimeout(() => {
      setAlert({ show: false, variant: '', message: '' });
    }, 3000);
  };
  
  // Список доступных криптовалют
  const availableCoins = [
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'BNB', label: 'Binance Coin (BNB)' },
    { value: 'SOL', label: 'Solana (SOL)' },
    { value: 'ADA', label: 'Cardano (ADA)' },
    { value: 'XRP', label: 'Ripple (XRP)' },
    { value: 'DOGE', label: 'Dogecoin (DOGE)' }
  ];
  
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
              Настройки скидки
            </CardTitle>
          </CardHeader>
          <Card.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Скидка (%)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    name="discountPercentage"
                    value={settings.discountPercentage}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    Скидка на курс обмена (например, если XRP стоит 100$, то с 3% скидкой курс будет 97$)
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Монета для скидки</Form.Label>
                  <Form.Select
                    name="discountCoin"
                    value={settings.discountCoin}
                    onChange={handleChange}
                  >
                    {availableCoins.map(coin => (
                      <option key={coin.value} value={coin.value}>
                        {coin.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Выберите криптовалюту, для которой будет применяться скидка
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
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