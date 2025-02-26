// frontend/src/pages/SupportPage.js
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const SupportContainer = styled(Container)`
  padding: 60px 0;
`;

const SupportForm = styled(Form)`
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const SupportTitle = styled.h1`
  margin-bottom: 30px;
  text-align: center;
`;

const SubmitButton = styled(Button)`
  background-color: #4169e1;
  border: none;
  padding: 10px 20px;
  width: 100%;
  
  &:hover {
    background-color: #3158d8;
  }
`;

const SupportPage = () => {
  return (
    <SupportContainer>
      <SupportForm>
        <SupportTitle>Поддержка</SupportTitle>
        <Form.Group className="mb-3">
          <Form.Label>Ваше имя</Form.Label>
          <Form.Control type="text" placeholder="Введите ваше имя" />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Введите ваш email" />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Тема</Form.Label>
          <Form.Control as="select">
            <option>Выберите тему обращения</option>
            <option>Проблема с обменом</option>
            <option>Вопрос по курсам</option>
            <option>Технический вопрос</option>
            <option>Другое</option>
          </Form.Control>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Сообщение</Form.Label>
          <Form.Control as="textarea" rows={5} placeholder="Опишите вашу проблему или вопрос" />
        </Form.Group>
        
        <SubmitButton type="submit">Отправить</SubmitButton>
      </SupportForm>
    </SupportContainer>
  );
};

export default SupportPage;