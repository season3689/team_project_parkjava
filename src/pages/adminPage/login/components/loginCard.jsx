import React, { useState, useEffect } from 'react';
import { Card, Form, Button, FloatingLabel, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginCard() {
  const [values, setValues] = useState({
    id: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSuccess = (user) => {
    localStorage.setItem('user', JSON.stringify(user)); // 로그인 성공 후 사용자 정보를 로컬 스토리지에 저장
    navigate('/'); // 홈페이지 또는 로그인 후 이동할 페이지로 이동
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find((u) => u.userId === values.id && u.userPw === values.password);

    if (user) {
      alert('로그인 성공!');
      handleLoginSuccess(user); // 로그인 성공 처리 함수 호출
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
      <Container className="justify-content-center align-items-center vh-100">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="p-4 shadow">
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  <h2>
                    <strong>로그인</strong>
                  </h2>
                </Card.Title>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleSubmit}>
                  <FloatingLabel controlId="floatingInput" label="아이디" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="아이디"
                        name="id"
                        value={values.id}
                        onChange={handleChange}
                        required
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingPassword" label="비밀번호" className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        required
                    />
                  </FloatingLabel>

                  <Button variant="primary" type="submit" className="w-100">
                    로그인
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default LoginCard;
