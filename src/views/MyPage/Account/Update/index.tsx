import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, MY_ACTIVITY_ABSOLUTE_PATH } from 'src/constants';
import { GetUserAccountResponseDto } from 'src/apis/dto/response/user';
import { ResponseDto } from 'src/apis/dto/response';
import { useNavigate } from 'react-router';
import { getUserAccountRequest, patchUserPasswordRequest } from 'src/apis';
import { PatchUserPasswordRequestDto } from 'src/apis/dto/request/user';

export default function AccountUpdate() {

  // state: 쿠키 상태 //
  const [ cookies ] = useCookies();

  // state: 사용자 비밀번호 정보 //
  const [userPassword, setUserPassword] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [updatePassword, setUpdatePassword] = useState<string>('');
  const [updatePasswordCheck, setUpdatePasswordCheck] = useState<string>('');
  
  // state: 사용자 비밀번호 메세지 상태 //
  const [currentPasswordCheckMessage, setCurrentPasswordCheckMessage] = useState<string>('');
  const [updatePasswrodCheckMessage, setUpdatePasswordCheckMessage] = useState<string>('');
  const [updatePasswordPatthernCheckMessage, setUpdatePasswordPatthernCheckMessage] = useState<string>('');

  // state: 사용자 현재 비밀번호 패턴 일치 상태 //
  const [isCurrentPasswordEqual, setCurrentPasswordEqual] = useState<boolean>(false);
  // state: 사용자 변경 비밀번호 패턴 일치 상태 //
  const [isUdpatePasswordPatthernChecked, setUpdatePasswordPatthernChecked] = useState<boolean>(false);
  // state: 사용자 변경 비밀번호 동일 여부 상태 //
  const [isUpdatePasswordEqual, setUpdatePasswordEqual] = useState<boolean>(false);



  // event handler: 현재 비밀번호 확인 변경 이벤트 처리 //
  const onCurrentPasswordChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurrentPassword(value);

    const isMatch = userPassword === currentPassword;
    const message = isMatch ? '' : '현재 비밀번호와 일치하지 않습니다.';
    setCurrentPasswordCheckMessage(message);
    setCurrentPasswordEqual(isMatch);
  }

  const onUpdatePasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatePassword(value);

    const regexp = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,13}$/;
    const isMatch = regexp.test(value);
    const message = isMatch ? '' : '영문, 숫자를 혼용하여 8 ~ 13자 입력해주세요';
    setUpdatePasswordPatthernCheckMessage(message);
    setUpdatePasswordPatthernChecked(isMatch);
  }

  const onUpdatePasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUpdatePasswordCheck(value);

    const isMatch = updatePassword === updatePasswordCheck;
    const message = isMatch ? '' : '변경될 비밀번호가 일치하지 않습니다.';
    setUpdatePasswordCheckMessage(message);
    setUpdatePasswordEqual(isMatch);
  }

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 비밀번호 변경 확인 버튼 활성화 //
  const isActive =
    currentPassword && updatePassword && updatePasswordCheck && 
    isCurrentPasswordEqual && isUpdatePasswordEqual && isUdpatePasswordPatthernChecked;

  // function: get user account response 함수 //
  const getUserAccountResponse = (responseBody: GetUserAccountResponseDto | ResponseDto | null) => {
  const message =
    !responseBody ? '서버에 문제가 있습니다.' :
    responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
    responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
  
  const isSuccess = responseBody !== null && responseBody.code === 'SU';
  if(!isSuccess){
    alert(message);
    return;
  }

  const {userPassword} = responseBody as GetUserAccountResponseDto
  setUserPassword(userPassword);
  }

  // function: patch user account response 함수 //
  const patchUserPasswordResponse = (responseBody: ResponseDto | null) => {
  const message =
  !responseBody ? '서버에 문제가 있습니다.' :
  responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
  responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
  
  const isSuccess = responseBody !== null && responseBody.code === 'SU';
  if(!isSuccess){
    alert(message);
    return;
  }
  }

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;

    getUserAccountRequest(accessToken).then(getUserAccountResponse);
  }, [])

  // effect: 현재 사용자 비밀번호가 변경될 시 실행할 함수 //
  useEffect(() => {
    const isMatch = currentPassword === userPassword;
    const message = isMatch ? '' : '현재 비밀번호가 일치하지 않습니다';
    setCurrentPasswordCheckMessage(message);
    setCurrentPasswordEqual(isMatch);
  }, [userPassword, currentPassword]);

  // effect: 변경될 비밀번호가 변경될 시 실행할 함수 //
  useEffect(() => {
    const isMatch = updatePassword === updatePasswordCheck;
    const message = isMatch ? '' : '변경될 비밀번호가 일치하지 않습니다.';
    setUpdatePasswordCheckMessage(message);
    setUpdatePasswordEqual(isMatch);
  }, [updatePassword, updatePasswordCheck]);

  // event handler: 비밀번호 변경 버튼 클릭 이벤트 처리 //
  const onChangePasswordButtonClickHandler = () => {
    if(!isActive) {
      alert('모든 정보를 정확히 입력해주세요!')
      return;
    }

    const requestBody: PatchUserPasswordRequestDto = {
      userPassword
    };

    patchUserPasswordRequest(requestBody, accessToken).then(patchUserPasswordResponse);
    navigator(MY_ACTIVITY_ABSOLUTE_PATH);
  }



  return (
    <div id='account-update-main-wrapper'>
      <div className='header-container'>
        <div className='top'>
          <div className='logo'/>
          <div className='title'>계정 설정</div>
        </div>
      </div>
      <div className='content-wrapper'>
        <div className='title'>비밀번호 변경</div>
        <div className='notice-box'>
          <div className='notice '>안전한 비밀번호로 내 정보를 보호하세요</div>
          <div className='notice'>다른 아이디/사이트에서 사용한 적 없는 비밀번호</div>
          <div className='notice'>이전에 사용한 적 없는 비밀번호가 안전합니다</div>
        </div>
        <div className='input-box'>
          <input className='input first' type='password' placeholder='현재 비밀번호' maxLength={13} onChange={onCurrentPasswordChangeHanlder}/>
          <div className='message'>{currentPasswordCheckMessage}</div>
          <input className='input second' type='password' placeholder='새 비밀번호' maxLength={13} onChange={onUpdatePasswordChangeHandler}/>
          <div className='message'>{updatePasswordPatthernCheckMessage}</div>
          <input className='input second' type='password' placeholder='새 비밀번호 확인' maxLength={13} onChange={onUpdatePasswordCheckChangeHandler}/>
          <div className='message'>{updatePasswrodCheckMessage}</div>
        </div>

        <div className='button-wrapper'>
          <div className='button-check' onClick={onChangePasswordButtonClickHandler}>확인</div>
          <div className='button-cancel'>취소</div>
        </div>

      </div>

    </div>
  )
}
