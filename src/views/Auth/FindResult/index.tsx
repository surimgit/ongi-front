import React from "react";

import './style.css';
import { useLocation, useNavigate } from "react-router";
import { AUTH_ABSOLUTE_PATH, AUTH_FIND_ID_ABSOLUTE_PATH } from "src/constants";

export default function FindResult() {

    // state: navigator 설정 //
    const navigator = useNavigate();

    const location = useLocation();
    const message = location.state?.message || '결과 메시지가 없습니다.';

    // event handler: 로고 클릭 이벤트 처리 //
    const onLogoClickHandler = () => {
    navigator('/main');
    };

    // event handler: 로그인 하기 클릭 이벤트 처리 //
    const onLoginClickHandler = () => {
    navigator(AUTH_ABSOLUTE_PATH);
    };

    // event handler: 로고 클릭 이벤트 처리 //
    const onReturnClickHandler = () => {
    navigator(AUTH_FIND_ID_ABSOLUTE_PATH);
    };

    return (
        <div id="find-user-wrapper">
            <div className="find-user-logo" onClick={onLogoClickHandler}></div>
            <div className="result-container">
                <div className="result-title">아이디/비밀번호 찾기 결과</div>
                <div className="result-message">{message}</div>
                <div className="button-container">
                    <button className="login" onClick={onLoginClickHandler}>로그인 하기</button>
                    <button className="return" onClick={onReturnClickHandler}>다시 조회하기</button>
                </div>
            </div>
        </div>
    );
}