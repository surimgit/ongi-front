import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, MYPAGE_ABSOLUTE_PATH } from 'src/constants';
import { ResponseDto } from 'src/apis/dto/response';
import { useNavigate } from 'react-router';
import { patchUserPasswordRequest } from 'src/apis';
import { PatchUserPasswordRequestDto } from 'src/apis/dto/request/user';

export default function AccountUpdate() {

  // state: 쿠키 상태 //
  const [ cookies ] = useCookies();

  // state: 사용자 비밀번호 정보 //
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [updatePassword, setUpdatePassword] = useState<string>('');
  const [updatePasswordCheck, setUpdatePasswordCheck] = useState<string>('');
  
  // state: 사용자 비밀번호 메세지 상태 //
  const [updatePasswrodCheckMessage, setUpdatePasswordCheckMessage] = useState<string>('');
  const [updatePasswordPatthernCheckMessage, setUpdatePasswordPatthernCheckMessage] = useState<string>('');

  // state: 사용자 변경 비밀번호 패턴 일치 상태 //
  const [isUdpatePasswordPatthernChecked, setUpdatePasswordPatthernChecked] = useState<boolean>(false);
  // state: 사용자 변경 비밀번호 동일 여부 상태 //
  const [isUpdatePasswordEqual, setUpdatePasswordEqual] = useState<boolean>(false);

  // event handler: 현재 비밀번호 확인 변경 이벤트 처리 //
  const onCurrentPasswordChangeHanlder = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurrentPassword(value);
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
    isUpdatePasswordEqual && isUdpatePasswordPatthernChecked;

    
  // variable: 버튼 클래스 //
  const buttonClass = `button-check ${isActive ? 'success' : 'error'}`;

  // function: patch user account response 함수 //
  const patchUserPasswordResponse = (responseBody: ResponseDto | null): boolean => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.' :
    responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
    responseBody.code === 'AF' ? '인증에 실패했습니다.' : 
    responseBody.code === 'NP' ? '현재 비밀번호가 일치하지 않습니다.' :
    responseBody.code === 'INVALID_REQUEST' ? '동일한 패스워드로의 변경은 불가능합니다.' : '';
    
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return false;
    }
    alert('변경에 성공했습니다!');
    return true;
  }

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;
  }, [])

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
      return;
    }

    const requestBody: PatchUserPasswordRequestDto = {
      currentPassword, newPassword:updatePassword
    };

    patchUserPasswordRequest(requestBody, accessToken).then((res) => {
      const isSuccess = patchUserPasswordResponse(res);
      if (isSuccess) navigator(MYPAGE_ABSOLUTE_PATH);
      else{
        setCurrentPassword('');
        setUpdatePassword('');
        setUpdatePasswordCheck('');
      }
    });

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
          <input className='input first' value={currentPassword} type='password' placeholder='현재 비밀번호' maxLength={13} onChange={onCurrentPasswordChangeHanlder}/>
          <input className='input second' value={updatePassword} type='password' placeholder='새 비밀번호' maxLength={13} onChange={onUpdatePasswordChangeHandler}/>
          <div className='message'>{updatePasswordPatthernCheckMessage}</div>
          <input className='input second' value={updatePasswordCheck} type='password' placeholder='새 비밀번호 확인' maxLength={13} onChange={onUpdatePasswordCheckChangeHandler}/>
          <div className='message'>{updatePasswrodCheckMessage}</div>
        </div>

        <div className='button-wrapper'>
          <div className={buttonClass} onClick={onChangePasswordButtonClickHandler}>확인</div>
          <div className='button-cancel'>취소</div>
        </div>

      </div>

    </div>
  )
}
