import React, { useEffect, useState } from 'react'
import './style.css'
import MypageSidebar from 'src/layouts/MypageSidebar'
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, MY_ACTIVITY_ABSOLUTE_PATH, MYPAGE_ABSOLUTE_PATH, MYPAGE_ACCOUNT_PATCH_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { useSignInUserStore } from 'src/stores';
import { getUserAccountRequest } from 'src/apis';
import { GetUserAccountResponseDto } from 'src/apis/dto/response/user';
import { ResponseDto } from 'src/apis/dto/response';
export default function Account() {

  // state: 쿠키 상태 //
  const [ cookies ] = useCookies();

  // state: 로그인 사용자 정보 //
  const [userId, setUserId] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [telNumber, setTelNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  
  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];



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

  const {telNumber, userId, address, detailAddress, userPassword} = responseBody as GetUserAccountResponseDto
  setUserId(userId);
  setUserPassword(userPassword);
  setTelNumber(telNumber);
  setAddress(address);
  setDetailAddress(detailAddress);
  }

  // function: patch user account response 함수 //



  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 내 활동 클릭 이벤트 처리 //
  const onMyPageButtonClickHandler = () => {
    navigator(MYPAGE_ABSOLUTE_PATH);
  }

  // event handler: 내 활동 클릭 이벤트 처리 //
  const onMyActivityButtonClickHandler= () => {
    navigator(MY_ACTIVITY_ABSOLUTE_PATH);
  }

  // event handler: 정보 수정 버튼 클릭 이벤트 처리 //
  const onChangeAccountButtonClickHandler = () => {
    navigator(MYPAGE_ACCOUNT_PATCH_ABSOLUTE_PATH);
  }

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;

    getUserAccountRequest(accessToken).then(getUserAccountResponse);
  }, [])
  return (
    <div id='setting-main-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>마이페이지</div>
          <div className='current active' onClick={onMyPageButtonClickHandler}>내 정보</div>
          <div className='current' onClick={onMyActivityButtonClickHandler}>내 활동</div>
        </div>  
        <div className='body'>
          <div className='title'>계정 설정</div>
          <div className='information-container'>
            <div className='category-wrapper'>
              <div className='category'>아이디</div>
              <div className='content'>user123455</div>
            </div>
            <div className='category-wrapper'>
              <div className='category'>비밀번호</div>
              <div className='content'>us*******</div>
              <div className='change-button' onClick={onChangeAccountButtonClickHandler}>비밀번호 수정</div>
            </div>
            <div className='category-wrapper'>
              <div className='category'>전화번호</div>
              <div className='content'>010-2222-3333</div>
            </div>
            <div className='category-wrapper'>
              <div className='category'>주소</div>
              <div className='content'>us*******</div>
              <div className='change-button'>주소 찾기</div>
            </div>
            <div className='category-wrapper'>
              <div className='category'>상세주소</div>
              <div className='content'>4층 B강의실</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
