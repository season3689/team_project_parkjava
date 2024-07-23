import React, {useEffect, useState} from 'react';
import {Card, Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import axios from "axios";


export default function Index() {
    const {noticeIndex} = useParams();
    const [notice, setNotice] = useState();

    useEffect(() => {
        // axios를 사용하여 공지사항 데이터를 가져옵니다.
        axios.get(`http://localhost:8080/user/api/notice/${noticeIndex}`)
            .then(response => setNotice(response.data))
            .catch(error => console.error('데이터 가져오기 오류:', error));
    }, [noticeIndex]);


    if (!notice) {
        return <Container>Loading...</Container>;
    }

    return (
      <>
          <Container className="d-flex justify-content-center p-5">
              <h1>공지사항</h1>
          </Container>
          <Container>
              <Card>
                  <Card.Header>{notice.noticeTitle}</Card.Header>
                  <Card.Body>
                      <Card.Text>
                          {notice.noticeContent}
                      </Card.Text>
                      <Card.Footer>
                          작성자: {notice.adminName} | 게시일: {new Date(notice.createDate).toLocaleDateString('ko-KR')}
                      </Card.Footer>
                      {notice.noticeView}
                  </Card.Body>
              </Card>
          </Container>
      </>
    );
}
