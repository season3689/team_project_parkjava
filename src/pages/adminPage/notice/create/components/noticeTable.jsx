import React, { useState, useEffect } from 'react';
import { Table, Container, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const setCookie = (name, value) => {
    cookies.set(name, value, { path: '/' });
}

const getCookie = (name) => {
    return cookies.get(name);
}

export default function NoticeTable() {
    const [noticeText, setNoticeText] = useState({
        title: '',
        content: '',
        adminIndex: '',
        name: '',
        date: '',
    });
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const admin = getCookie('session');
        if (admin) {
            try {
                const { index, name } = admin;  // admin이 이미 객체라고 가정
                setNoticeText((prevState) => ({
                    ...prevState,
                    adminIndex: index.toString(),
                    name: name.toString(),
                }));
            } catch (error) {
                console.error('Error parsing admin data:', error);
            }
        }

        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setNoticeText((prevState) => ({
            ...prevState,
            date: formattedDate,
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNoticeText({
            ...noticeText,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!noticeText.title) newErrors.title = '제목을 입력해주세요';
        if (!noticeText.content) newErrors.content = '내용을 입력해주세요';
        // if (!noticeText.date) newErrors.date = '작성일을 선택해주세요';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setShowAlert(true);
            return;
        }

        const newNotice = {
            noticeTitle: noticeText.title,
            noticeContent: noticeText.content,
            adminIndex: noticeText.adminIndex,
            adminName: noticeText.name,
            createDate: noticeText.date,
            noticeView: 0,
        };

        fetch('http://localhost:8080/api/notice/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNotice),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setNoticeText({
                    title: '',
                    content: '',
                    adminIndex: '',
                    name: '',
                    date: '',
                });
                navigate('/admin/notice');
            })
            .catch((error) => console.error('Error saving data:', error));
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Table striped bordered hover variant="light">
                    <thead>
                    <tr>
                        <th>
                            <Form.Control
                                type="text"
                                placeholder="제목 입력"
                                name="title"
                                value={noticeText.title}
                                onChange={handleInputChange}
                            />
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <Form.Control
                                as="textarea"
                                rows={15}
                                placeholder="내용 입력"
                                name="content"
                                value={noticeText.content}
                                onChange={handleInputChange}
                                style={{ border: 'none', resize: 'none' }}
                            />
                        </td>
                    </tr>
                    {/*<tr>*/}
                    {/*    <th>*/}
                    {/*        <Form.Control*/}
                    {/*            type="number"*/}
                    {/*            placeholder="유저 인덱스 입력"*/}
                    {/*            name="adminIndex"*/}
                    {/*            value={noticeText.adminIndex}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*            readOnly*/}
                    {/*        />*/}
                    {/*    </th>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <th>*/}
                    {/*        <Form.Control*/}
                    {/*            type="text"*/}
                    {/*            placeholder="유저 이름 입력"*/}
                    {/*            name="name"*/}
                    {/*            value={noticeText.name}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*            readOnly*/}
                    {/*        />*/}
                    {/*    </th>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <th>*/}
                    {/*        <Form.Control*/}
                    {/*            type="date"*/}
                    {/*            placeholder="작성일 입력"*/}
                    {/*            name="date"*/}
                    {/*            value={noticeText.date}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*        />*/}
                    {/*    </th>*/}
                    {/*</tr>*/}
                    </tbody>
                </Table>
                {showAlert && (
                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                        {Object.values(errors).map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </Alert>
                )}
                <div className="d-flex justify-content-end">
                    <Button
                        variant="primary"
                        type="submit"
                        style={{ width: '100px' }}
                        disabled={!noticeText.title || !noticeText.content}
                    >
                        작성
                    </Button>
                </div>
            </Form>
            <div>
                <Link to={'/admin/notice'}>목록으로</Link>
            </div>
        </Container>
    );
}
