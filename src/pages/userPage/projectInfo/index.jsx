import React, {useEffect} from 'react';
import "../../../static/common.css"
import {Image} from "react-bootstrap";
import Intellij from '../../../static/images/infoImg/intellij.png'
import VsCode from '../../../static/images/infoImg/vscode.png'
import JetBot from '../../../static/images/infoImg/jetbot.jpg'
import ReactLogo from '../../../static/images/infoImg/react.png'
import RosLogo from '../../../static/images/infoImg/ros.png'
import SpringLogo from '../../../static/images/infoImg/spring.png'
import MySqlLogo from '../../../static/images/infoImg/mysql.png'
import BootStrapLogo from '../../../static/images/infoImg/bootstrap.png'
import JavascriptLogo from '../../../static/images/infoImg/js.png'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Index() {
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <>
            <div className={'infoStart'}>
                <h1 data-aos="fade-up" data-aos-duration="3000">Project Information</h1>
            </div>
            <div className={'commonContainer'}>
                <div className={'projectInfo'} >
                    <h1 data-aos="fade-up" data-aos-duration="3000">프로젝트 개요</h1>
                    <div className={'infoStart2'} data-aos="fade-up" data-aos-duration="3000">
                        현재 사회에서 불법주차에 의한 사회적 문제들이 많이 발생하고 있습니다.<br/>
                        어린아이부터 노인까지 누구에게나 일어날 수 있는 불법 주차 사고<br/>
                        우리 프로젝트는 이에 대한 문제 해결책을 제시하고자 불법 주차 단속 로봇을 개발하고자 합니다.<br/>
                    </div>
                    <div className={'infoAreaRight'} data-aos="fade-up" data-aos-duration="3000">
                        <Image src={VsCode} width={130}/>
                        <div className={'IDEArea'}>
                            IDE<br/><br/>
                            PARKJAVA 프로젝트를 제작하며 사용된 통합개발환경은<br/>
                            IntelliJ, Visual Studio Code 입니다.
                        </div>
                        <Image src={Intellij} width={150}/>
                    </div>
                    <div className={'infoAreaRight'} data-aos="fade-down" data-aos-duration="3000">
                        <div className={'jetbotArea'}>
                            Robot Hardware<br/><br/>
                            YAHBOOM Jetbot mini 를 Python을 통해 제어하며<br/>
                            카메라 모듈을 통해 Line Tracing을 기반으로 자율주행을 구현하였습니다.<br/>
                            자율 주행을 할 수 없는 상황에서는 Web Page 내에서 버튼을 통해<br/>
                            직접 JetBot mini를 제어할 수 있습니다.
                        </div>
                        <Image src={JetBot} width={300}/>
                    </div>
                    <div className={'infoAreaLeft'} data-aos="fade-down" data-aos-duration="3000">
                        <Image src={RosLogo} width={200}/>
                        <div className={'jetbotArea'} style={{color: 'rgb(33,46,73)'}}>
                            Robot Software<br/><br/>
                            WebSocket 을 통해 Web 과 Robot 간 제어가 가능합니다.<br/>
                            ROS Web Video Server 통신을 통하여<br/>
                            실시간으로 촬영되는 자동차의 번호판을 검출합니다.<br/>
                        </div>
                    </div>
                    <div className={'infoAreaLeft'} data-aos="fade-right" data-aos-duration="3000"
                    >
                        <Image src={ReactLogo} width={200} className={'wheel'}/>
                        <div className={'reactArea'}>
                            FrontEnd<br/><br/>
                            동적인 UI를 쉽게 구성할 수 있도록 React.js로 개발 및 구성하였고,<br/>
                            여러 라이브러리를 사용하며 구현하고자 하는 페이지의 완성도를 높혔습니다.<br/>
                        </div>
                        <Image src={BootStrapLogo} width={200}/>
                    </div>
                    <div className={'infoAreaRight'} data-aos="fade-left" data-aos-duration="3000">
                        <Image src={SpringLogo} width={300}/>
                        <div className={'springArea'}>
                            Backend<br/><br/>
                            Spring Boot + MySQL 로 Restful API 서버를 만들어<br/>
                            Client / Server 간 HTTP 통신으로 CRUD 를 구현하였습니다.
                        </div>
                        <Image src={MySqlLogo} width={300}/>
                    </div>

                </div>
            </div>
        </>
    );
}