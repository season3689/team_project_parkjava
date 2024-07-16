import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Index() {
    const [inquiryText, setInquiryText] = useState({
        title: '',
        content: '',
        name: '',
        email: '',
        phone: '',
        date: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false); // 상태 추가

    const navigate = useNavigate();

    useEffect(() => {
        // 모든 필드가 입력되었는지 확인
        const allFieldsFilled = Object.values(inquiryText).every(field => field !== '');
        setIsFormValid(allFieldsFilled);
    }, [inquiryText]);

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 날짜 설정
        setInquiryText(prevState => ({
            ...prevState,
            date: currentDate,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiryText({
            ...inquiryText,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newInquiry = {
            inquiryTitle: inquiryText.title,
            inquiryContent: inquiryText.content,
            inquiryWriter: inquiryText.name,
            inquiryEmail: inquiryText.email,
            inquiryPhone: inquiryText.phone,
            inquiryDate: inquiryText.date,
        };

        axios.post('http://localhost:8080/api/inquiry/create', newInquiry)
            .then((response) => {
                setInquiryText({
                    title: '',
                    content: '',
                    name: '',
                    email: '',
                    phone: '',
                    date: '', // 성공적으로 등록 후 초기화
                });
                setShowMessage(true); // 메시지 표시
                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/main'); // 3초 후 목록 페이지로 리디렉션
                }, 3000);
            })
            .catch((error) => console.error('Error saving data:', error));
    };

    return (
        <Form style={{border:'1px,solid,black'}} className={'inquiryadd'}>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label>제목</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="제목을 적어주세요"
                            name="title"
                            value={inquiryText.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridName">
                        <Form.Label>작성자</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="이름을 적어주세요"
                            name="name"
                            value={inquiryText.name}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="email형식에 맞게 작성해주세요"
                            name="email"
                            value={inquiryText.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>전화번호</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="전화번호를 적어주세요"
                        name="phone"
                        value={inquiryText.phone}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridContent">
                    <Form.Label>문의내용</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        value={inquiryText.content}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridDate">
                    <Form.Label>문의일자</Form.Label>
                    <Form.Control
                        type="date"
                        name="date"
                        value={inquiryText.date}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!isFormValid}>
                    등록하기
                </Button>
            </Form>

            {showMessage && (
                <Alert variant="success" className="mt-3">
                    문의가 완료되었습니다
                </Alert>
            )}
        </Form>
    );
}
