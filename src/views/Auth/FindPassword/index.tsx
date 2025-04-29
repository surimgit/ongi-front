import React, { useState } from "react";
import './style.css';
import { useNavigate } from "react-router";
import { AUTH_FIND_ID_ABSOLUTE_PATH, AUTH_FIND_USER_RESULT_ABSOLUTE_PATH } from "src/constants";
import { ResponseDto } from "src/apis/dto/response";
import { findPasswordRequest } from "src/apis";

export default function FindPassword() {

    // state: navigator 설정 //
    const navigator = useNavigate();
    
    // state: 입력 정보 상태 //
    const [userId, setUserId] = useState<string>('');
    const [telNumber, setTelNumber] = useState<string>('');

    // function: 비밀번호 재발급 처리 함수 //
    const findPassword = (responseBody: ResponseDto | null) => {
        if (!responseBody || responseBody.code === 'DBE') {
            alert('서버에 문제가 있습니다.');
            return;
        }
        if (responseBody.code === 'NU') {
            navigator(AUTH_FIND_USER_RESULT_ABSOLUTE_PATH, {
                state: { message : '존재하지 않는 사용자입니다.' }
            });
            return;
        }
        if (responseBody.code === 'SU') {
            navigator(AUTH_FIND_USER_RESULT_ABSOLUTE_PATH , {
                state: { message : `회원님의 임시 비밀번호를 전화번호로 발송했습니다.`}
            });
        }
    };

    // event handler: 비밀번호 찾기 버튼 클릭 이벤트 처리 //
    const handleFindPasswordClick = async () => {
        if(!userId) {alert('닉네임을 입력하세요.'); return;}
        if(!telNumber) {alert('전화번호를 입력하세요.'); return;}

        const responseBody = await findPasswordRequest({ userId, telNumber });
        findPassword(responseBody);
    };

    // event handler: 로고 클릭 이벤트 처리 //
    const onLogoClickHandler = () => {
    navigator('/main');
    };

    // event handler: 아이디 찾기 클릭 이벤트 처리 //
    const onFindIdClickHandler = () => {
    navigator(AUTH_FIND_ID_ABSOLUTE_PATH);
    };

    return(
        <div id="find-user-wrapper">
            <div className="find-user-logo" onClick={onLogoClickHandler}></div>
            <div className="find-password-navigator">
                <div className="id" onClick={onFindIdClickHandler}>아이디 찾기</div>
                <div className="password">비밀번호 재발급</div>
            </div>
            <div className="find-user-container">
                <div className="label">아이디</div>
                <input type="text" className="input" value={userId} onChange={(e) => setUserId(e.target.value)}/>
                <div className="label telnumber">휴대전화 번호</div>
                <input type="text" className="input" value={telNumber} onChange={(e) => setTelNumber(e.target.value)} placeholder="-, 공백 제외 11자"/>
                <button className="find-submit" onClick={handleFindPasswordClick}>비밀번호 찾기</button>
            </div>
        </div>
    )
}