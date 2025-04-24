import React from 'react'
import './style.css'
import MypageSidebar from 'src/layouts/MypageSidebar'
import { useNavigate } from 'react-router';
import { MYPAGE_ABSOLUTE_PATH } from 'src/constants';
export default function Account() {

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 내 활동 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(MYPAGE_ABSOLUTE_PATH);
  }

  return (
    <div id='setting-main-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>마이페이지</div>
          <div className='current' onClick={onClick}>내 정보</div>
          <div className='current active'>내 활동</div>
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
              <div className='change-button'>비밀번호 수정</div>
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
