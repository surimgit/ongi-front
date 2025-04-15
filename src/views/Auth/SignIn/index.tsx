import React, { ChangeEvent, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { signInRequest } from 'src/apis';
import { SignInRequestDto } from 'src/apis/dto/request/auth';
import { ResponseDto } from 'src/apis/dto/response';
import { SignInResponseDto } from 'src/apis/dto/response/auth';
import { ACCESS_TOKEN } from 'src/constants';
import AuthPage from 'src/types/aliases/auth-page.alias';

import './style.css'

interface Props {
  onPageChange: (page: AuthPage) => void;
}

export default function SignIn({ onPageChange }: Props) {
  const [_, setCookie] = useCookies();
  const navigator = useNavigate();

  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userIdMessage, setUserIdMessage] = useState('');
  const [userPasswordMessage, setUserPasswordMessage] = useState('');

  const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'SF' ? '로그인 정보가 일치하지 않습니다.' : '';

    const isSuccess = responseBody && responseBody.code === 'SU';
    if (!isSuccess) {
      setUserPasswordMessage(message);
      return;
    }

    const { accessToken, expiration } = responseBody as SignInResponseDto;
    const expires = new Date(Date.now() + expiration * 1000);
    setCookie(ACCESS_TOKEN, accessToken, { path: '/', expires });
    navigator('/main');
  };

  const onLoginClick = () => {
    if (!userId) setUserIdMessage('아이디를 입력하세요.');
    if (!userPassword) setUserPasswordMessage('비밀번호를 입력하세요.');
    if (!userId || !userPassword) return;

    const requestBody: SignInRequestDto = { userId, userPassword };
    signInRequest(requestBody).then(signInResponse);
  };

  useEffect(() => {
    setUserIdMessage('');
    setUserPasswordMessage('');
  }, [userId, userPassword]);

  return (
    <div className="login-wrapper">
      <div className="logo"></div>
      <div className="login-card">
        <div className="input-group">
          <label>아이디</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
          {userIdMessage && <div className="error-message">{userIdMessage}</div>}
        </div>
        <div className="input-group">
          <label>비밀번호</label>
          <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
          {userPasswordMessage && <div className="error-message">{userPasswordMessage}</div>}
          <div className="find-link">아이디/비밀번호 찾기</div>
        </div>
        <button className="login-btn" onClick={onLoginClick}>로그인</button>
        <div className="bottom-link">
          아직 온기 계정이 없으신가요? <span className="signup-link" onClick={() => onPageChange('sign-up')}>회원가입</span>
        </div>
      </div>
    </div>
  );
}
