import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import React, {useState, useRef, useEffect} from "react";
import '../../../static/common.css'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from 'react-router-dom';


import styled from 'styled-components'

export default function Index() {
    const [inquiryText, setInquiryText] = useState({
        title: '',
        content: '',
        name: '',
        email: '',
        phone: '',
        date: '',
    });

    const [inquiryList, setInquiryList] = useState({
        title: '',
        name: '',
        phone: '',
        content: '',
        date: '',
    });

    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false); // 상태 추가
    const [isFormValid, setIsFormValid] = useState(false);
    const modalBackground = useRef();
    

    useEffect(() => {

        setInquiryList(prevState => ({
            ...prevState,
            date: '',
        }))
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setInquiryList((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        const inputElement = e.target;
        if (value) {
            inputElement.classList.add('not-empty');
        } else {
            inputElement.classList.remove('not-empty');
        }
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


        axios.post('http://localhost:8080/user/api/inquiry/create', newInquiry)
            .then((response) => {
                alert("문의가 접수되었습니다.")
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
                    navigate('/user');
                });
            })
            .catch((error) => console.error('Error saving data:', error));
    };


    const handleGet = (e) => {
        e.preventDefault();
        const inquiryPhone = inquiryList.phone

        axios
            .get(`http://localhost:8080/user/api/inquiry/phone/${inquiryPhone}`)
            .then((res) => {
                const data = res.data
                
                if (data.length > 0) {
                    setInquiryList({
                        title: data[0].inquiryTitle,
                        name: data[0].inquiryWriter,
                        phone: data[0].inquiryPhone,
                        content: data[0].inquiryContent,
                        date: data[0].inquiryDate.split('T')[0],
                    });
                    navigate('./')
                } else {
                    alert('문의 내역을 찾을 수 없습니다.');
                }
            })
            .catch((error) => console.error('Error saving data:', error));
    }

    const DisplayBox = styled.div`
        display: ${props => props.display};
        justify-content: ${props => props.justify};
        padding: ${props => props.padding};
    `

    const SpaceBox = styled.div`
        padding-bottom: ${props => props.paddingbottom}
        margin-bottom: ${props => props.marginbottom}
    `


    return (
        <>
            <section>
                <DisplayBox display='flex' justify='center'>
                    <h1 style={{paddingTop: '100px'}}>
                        <FontAwesomeIcon icon={faComment} bounce style={{color: 'skyblue', paddingRight: '5px'}} />ParkJava 문의하기
                    </h1>
                </DisplayBox>
            </section>
            <section>
            <div class='outBox' style={{display: 'flex', justifyContent: 'center'}}>
                <Form onSubmit={handleGet} style={{width: '354px', position: 'relative', top: '5px'}}>
                    <div class='inputBox'>
                        <Form.Group style={{width: '100%'}}>
                            <Form.Control
                                className=''
                                id='inquiryPhoneInput'
                                type="text"
                                name="phone"
                                value={inquiryList.phone}
                                onChange={handleChange}
                                />
                            <label for='inquiryPhoneInput'>전화번호를 입력하세요</label>
                            <FontAwesomeIcon onClick={handleGet} style={{position: 'absolute', left: '92%', bottom: '44%', cursor: 'pointer'}} icon={faMagnifyingGlass} />
                        </Form.Group>
                    </div>
                </Form>
            </div>
            <SpaceBox paddingBottom='16px' marginBottom='32px'></SpaceBox>
            {inquiryList.date && (
                    <DisplayBox display='flex' justify='center' padding='50px'>
                        <div>
                            작성자: {inquiryList.name} <br />
                            제목: {inquiryList.title} <br />
                            전화번호: {inquiryList.phone} <br />
                            내용: {inquiryList.content} <br />
                            문의일자: {inquiryList.date}
                        </div>
                    </DisplayBox>
            )}
            </section>

            <section>
                <div class='inquiryNew'>
                    <div>
                        <h2 class='headline'>
                            문의하기
                        </h2>
                        <hr style={{width: '90%'}}/>
                        <SpaceBox paddingBottom='100px' marginBottom='32px'></SpaceBox>
                        <Button className={'modalOpenBtn'} variant="primary" onClick={() => setModalOpen(true)}>문의하기</Button>
                    </div>
                </div>

                {
                    modalOpen &&
                    <div className={'modalContainer'} ref={modalBackground} onClick={e => {
                        if (e.target === modalBackground.current) {
                            setModalOpen(false);
                        }
                    }}>
                        <div className={''}>
                            <div className={'inquiryForm'}>
                                <h1 className={'inquiryTitle'}>무엇이든 물어보살</h1>
                                <Form className={'inquiryIndex'} onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridTitle">
                                            <Form.Label className={'formLabel'}>제목</Form.Label>
                                            <Form.Control className={'formControl'}
                                                            type="text"
                                                            placeholder="제목을 적어주세요"
                                                            name="title"
                                                            value={inquiryText.title}
                                                            onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridName">
                                            <Form.Label className={'formLabel'}>작성자</Form.Label>
                                            <Form.Control className={'formControl'}
                                                            type="text"
                                                            placeholder="이름을 적어주세요"
                                                            name="name"
                                                            value={inquiryText.name}
                                                            onChange={handleChange}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formGridEmail">
                                            <Form.Label className={'formLabel'}>Email</Form.Label>
                                            <Form.Control className={'formControl'}
                                                            type="email"
                                                            placeholder="email형식에 맞게 작성해주세요"
                                                            name="email"
                                                            value={inquiryText.email}
                                                            onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="formGridPhone">
                                        <Form.Label className={'formLabel'}>전화번호</Form.Label>
                                        <Form.Control className={'formControl'}
                                                        type="text"
                                                        placeholder="전화번호를 적어주세요"
                                                        name="phone"
                                                        value={inquiryText.phone}
                                                        onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formGridContent">
                                        <Form.Label className={'formLabel'}>문의내용</Form.Label>
                                        <Form.Control className={'formControl'}
                                                        as="textarea"
                                                        name="content"
                                                        value={inquiryText.content}
                                                        onChange={handleChange}
                                                        style={{whiteSpace: 'pre-line'}}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formGridDate">
                                        <Form.Label className={'formLabel'}>문의일자</Form.Label>
                                        <Form.Control className={'formControl'}
                                                        type="date"
                                                        name="date"
                                                        value={inquiryText.date}
                                                        disabled={true}
                                                        onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <div className={'buttonContainer'}>
                                        <Button className={'inquiryButton'} variant="primary" type="submit"
                                                disabled={!isFormValid}>
                                            문의등록
                                        </Button>xx
                                        <Button className={'modalCloseBtn'} variant="primary"
                                                onClick={() => setModalOpen(false)}>
                                            닫기
                                        </Button>
                                    </div>
                                </Form>

                                {showMessage && (
                                    <Alert variant="success" className="mt-3">
                                        문의가 완료되었습니다
                                    </Alert>
                                )}
                            </div>
                        </div>
                    </div>
                }

            </section>
            
            
        </>
    )
}