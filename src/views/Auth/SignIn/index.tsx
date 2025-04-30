import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { SignInRequestDto } from 'src/apis/dto/request/auth';
import { ResponseDto } from 'src/apis/dto/response';
import { SignInResponseDto } from 'src/apis/dto/response/auth';
import { ACCESS_TOKEN, AUTH_FIND_ID_ABSOLUTE_PATH } from 'src/constants';
import AuthPage from 'src/types/aliases/auth-page.alias';

import './style.css'
import axios from 'axios';

interface Props {
  onPageChange: (page: AuthPage) => void;
}

export default function SignIn({ onPageChange }: Props) {
  
  // state: cookie 상태 //
  const [_, setCookie] = useCookies();
  // state: navigator 설정 //
  const navigator = useNavigate();

  // state: id/password 상태 //
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userIdMessage, setUserIdMessage] = useState('');
  const [userPasswordMessage, setUserPasswordMessage] = useState('');

  // function: 로그인 요청 및 응답 처리 함수 //
  const onLoginClick = async () => {
    // 아이디와 비밀번호가 비어있으면 에러 메시지 설정
    if (!userId) setUserIdMessage('아이디를 입력하세요.');
    if (!userPassword) setUserPasswordMessage('비밀번호를 입력하세요.');

    if (!userId || !userPassword) return; // 하나라도 비어있으면 요청하지 않음

    const requestBody: SignInRequestDto = { userId, userPassword };

    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/sign-in', requestBody);

      const responseBody: SignInResponseDto | ResponseDto = response.data;

      // 응답 처리
      const message =
        !responseBody ? '서버에 문제가 있습니다.' :
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
        responseBody.code === 'SF' ? '아이디 또는 비밀번호가 일치하지 않습니다.' :
        '';

      const isSuccess = responseBody.code === 'SU';
      if (!isSuccess) {
        // 로그인 실패 시 처리
        if (responseBody.code === 'SF') {
          setUserIdMessage('아이디 또는 비밀번호가 잘못되었습니다.');
        } else if (responseBody.code === '401') {
          setUserIdMessage('아이디 또는 비밀번호가 잘못되었습니다.');  // 401 상태에 대한 처리 추가
        } else {
          setUserPasswordMessage(message);
        }
        return;
      }

      // 로그인 성공 시 처리
      const { accessToken, expiration } = responseBody as SignInResponseDto;
      const expires = new Date(Date.now() + expiration * 1000);
      setCookie(ACCESS_TOKEN, accessToken, { path: '/', expires });
      navigator('/main');
    } catch (error: unknown) {
      // error를 AxiosError로 타입을 지정하여 접근
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message || '서버에 문제가 있습니다.';
        if (statusCode === 401) {
          setUserPasswordMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
        } else {
          console.error('로그인 요청 실패', errorMessage);
        }
      } else {
        console.error('로그인 요청 실패', error);
      }
    }
  };

  // event handler: 로고 클릭 이벤트 처리 //
  const onLogoClickHandler = () => {
    navigator('/main');
  };

  // event handler: 아이디/비밀번호 클릭 이벤트 처리 //
  const onFindUserClickHandler = () => {
    navigator(AUTH_FIND_ID_ABSOLUTE_PATH);
  };
  
  return (
    <div className="login-wrapper">
      <div className="logo" onClick={onLogoClickHandler}></div>
      <div className="login-card">
        <div className="login-input-group">
          <label>아이디</label>
          <input type="text" value={userId} 
            onChange={(e) => {
              setUserId(e.target.value);
              setUserIdMessage('');
            }} 
          />
          {userIdMessage && <div className="error-message">{userIdMessage}</div>}
        </div>
        <div className="login-input-group">
          <label>비밀번호</label>
          <input type="password" value={userPassword} 
            onChange={(e) => {
              setUserPassword(e.target.value);
              setUserPasswordMessage('');
            }} 
          />
          {userPasswordMessage && <div className="error-message">{userPasswordMessage}</div>}
          <div className="find-link" onClick={onFindUserClickHandler}>아이디/비밀번호 찾기</div>
        </div>
        <button className="login-btn" onClick={onLoginClick}>로그인</button>
        <div className="bottom-link">
          아직 온기 계정이 없으신가요? <span className="signup-link" onClick={() => onPageChange('sign-up')}>회원가입</span>
        </div>
      </div>
    </div>
  );
}
