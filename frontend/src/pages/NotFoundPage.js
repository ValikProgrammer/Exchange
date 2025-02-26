import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 20px;
`;

const ErrorCode = styled.h1`
  font-size: 120px;
  font-weight: 700;
  color: #007bff;
  margin: 0;
  line-height: 1;
`;

const ErrorTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin: 20px 0;
`;

const ErrorMessage = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 500px;
  margin: 0 auto 30px;
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <Container>
        <ErrorCode>404</ErrorCode>
        <ErrorTitle>Страница не найдена</ErrorTitle>
        <ErrorMessage>
          Извините, запрашиваемая страница не существует или была перемещена.
        </ErrorMessage>
        <Button as={Link} to="/" variant="primary" size="lg">
          <FontAwesomeIcon icon={faHome} className="me-2" />
          Вернуться на главную
        </Button>
      </Container>
    </NotFoundContainer>
  );
};

export default NotFoundPage;