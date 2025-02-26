import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const PageHeader = styled.div`
  padding: 60px 0 40px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 700px;
  margin: 0 auto;
`;

const ContactForm = styled(Form)`
  background-color: #1a2c38;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 40px;
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  background-color: #1a2c38;
  padding: 30px;
  border-radius: 10px;
  height: 100%;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(0, 123, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #007bff;
  margin-right: 15px;
  flex-shrink: 0;
`;

const ContactText = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    margin: 0;
  }
`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Простая валидация
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Пожалуйста, заполните все обязательные поля.'
      });
      return;
    }
    
    // Имитация отправки формы
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
      });
      
      // Сброс формы
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };
  
  return (
    <Container>
      <PageHeader>
        <PageTitle>Связаться с нами</PageTitle>
        <PageDescription>
          У вас есть вопросы или предложения? Свяжитесь с нами, и мы ответим вам в ближайшее время.
        </PageDescription>
      </PageHeader>
      
      <div className="row">
        <div className="col-lg-8 mb-4 mb-lg-0">
          <ContactForm onSubmit={handleSubmit}>
            {formStatus.submitted && (
              <Alert variant={formStatus.success ? 'success' : 'danger'} className="mb-4">
                {formStatus.message}
              </Alert>
            )}
            
            <div className="row">
              <div className="col-md-6">
                <FormGroup className="mb-3">
                  <Form.Label>Ваше имя *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup className="mb-3">
                  <Form.Label>Ваш email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </div>
            </div>
            
            <FormGroup className="mb-3">
              <Form.Label>Тема</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup className="mb-4">
              <Form.Label>Сообщение *</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <Button type="submit" variant="primary" size="lg">
              <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
              Отправить сообщение
            </Button>
          </ContactForm>
        </div>
        
        <div className="col-lg-4">
          <ContactInfo>
            <h3 className="mb-4">Контактная информация</h3>
            
            <ContactItem>
              <ContactIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </ContactIcon>
              <ContactText>
                <h4>Email</h4>
                <p>support@cryptoexchange.com</p>
              </ContactText>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FontAwesomeIcon icon={faPhone} />
              </ContactIcon>
              <ContactText>
                <h4>Телефон</h4>
                <p>+7 (999) 123-45-67</p>
              </ContactText>
            </ContactItem>
            
            <ContactItem>
              <ContactIcon>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </ContactIcon>
              <ContactText>
                <h4>Адрес</h4>
                <p>г. Москва, ул. Примерная, д. 123, офис 456</p>
              </ContactText>
            </ContactItem>
          </ContactInfo>
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;