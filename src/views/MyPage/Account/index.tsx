import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import MypageSidebar from 'src/layouts/MypageSidebar'
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, MY_ACTIVITY_ABSOLUTE_PATH, MYPAGE_ABSOLUTE_PATH, MYPAGE_ACCOUNT_PATCH_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { getUserAccountRequest, patchUserAddressRequest } from 'src/apis';
import { GetUserAccountResponseDto } from 'src/apis/dto/response/user';
import { ResponseDto } from 'src/apis/dto/response';
import { useDaumPostcodePopup, Address } from 'react-daum-postcode';
import { PatchUserAddressRequestDto } from 'src/apis/dto/request/user';
export default function Account() {

  // state: 쿠키 상태 //
  const [ cookies ] = useCookies();

  // state: 로그인 사용자 정보 //
  const [userId, setUserId] = useState<string>('');
  const [telNumber, setTelNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [isChangeAddress, setChangeAddress] = useState<boolean>(false);
 
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

  const {telNumber, userId, address, detailAddress} = responseBody as GetUserAccountResponseDto
  setUserId(userId);
  setTelNumber(telNumber);
  setAddress(address);
  setDetailAddress(detailAddress);
  }

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: 다음 포스트 코드 팝업 오픈 함수 //
  const open = useDaumPostcodePopup();

  // function: 다음 포스트 코드 완료 처리 함수 //
  const daumPostCompleteHandler = (data: Address) => {
    const { address } = data;
    setAddress(address);
    setChangeAddress(true);
  }

  // function: patch address response 처리 함수 //
  const patchUserAddressResponse = (responseBody: ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }
    alert('주소가 저장되었습니다!');
    setChangeAddress(false);
  }
  
  // event handler: 주소 검색 버튼 클릭 이벤트 처리 //
  const onSearchAddressClickHandler = () => {
    open({ onComplete: daumPostCompleteHandler });
  };

  // event handler: 사용자 상세 주소 변경 이벤트 처리 //
  const onDetailAddressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDetailAddress(value);
    setChangeAddress(true);
  }

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

  // event handler: 주소 저장 버튼 클릭 이벤트 처리 //
  const onSaveAddressClickHandler = () => {
    if (!address || !detailAddress) {
      alert("주소를 모두 입력해주세요.");
      return;
    }

    if (!isChangeAddress) {
      return;
    }
  
    const requestBody: PatchUserAddressRequestDto = {
      address,
      detailAddress,
    };
  
    patchUserAddressRequest(requestBody, accessToken).then(patchUserAddressResponse);
  };
    
  // variable: 주소 저장 버튼 클래스 //
  const buttonClass = `change-button ${isChangeAddress ? 'success save' : 'error'}`;

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
              <div className='content'>{userId}</div>
            </div>
            <div className='category-wrapper'>
              <div className='category'>비밀번호</div>
              <div className='password-icon'/>
              <div className='change-button success' onClick={onChangeAccountButtonClickHandler}>비밀번호 변경</div>
            </div>
            <div className='category-wrapper'>
              <div className='category'>전화번호</div>
              <div className='content'>{telNumber}</div>
            </div>
            <div className='category-wrapper'>
              <div className='category'>주소</div>
              <input
                className='address-content'
                value={address}
                onChange={() => {}}
                readOnly
              />
              <div className='change-button success' onClick={onSearchAddressClickHandler}>주소 변경</div>
            </div>
            <div className='category-wrapper'>
              <div className='category'>상세주소</div>
              <input
                className='detail-address-content'
                value={detailAddress}
                onChange={onDetailAddressChangeHandler}
              />
              <div className={buttonClass} onClick={onSaveAddressClickHandler}>주소 저장</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
