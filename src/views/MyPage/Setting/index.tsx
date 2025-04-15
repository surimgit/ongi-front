import React from 'react'
import './style.css'
export default function Setting() {
  return (
    <div id='setting-main-wrapper'>
      <div className='sidebar-container'>
        <div className='button'>카테고리</div>
        <div className='categories'>
          <div className='title'>내 정보</div>
          <div className='title'>내 활동</div>
          <div className='sub-title'>내가 받은 후기
            <div className='sub-text'>도우미 후기</div>
            <div className='sub-text'>도움 받은 후기</div>
          </div>
          <div className='sub-title'>내 공동구매
            <div className='sub-text'>판매 내역</div>
            <div className='sub-text'>구매 내역</div>
            <div className='sub-text'>장바구니</div>
            <div className='sub-text'>찜한 목록</div>
          </div>
          <div className='sub-title'>도우미
            <div className='sub-text'>내가 요청한 도움</div>
            <div className='sub-text'>신청 현황</div>
            <div className='sub-text'>좋아요 누른 글</div>
          </div>
          <div className='sub-title'>커뮤니티
            <div className='sub-text'>내가 쓴 글</div>
            <div className='sub-text'>내가 쓴 댓글</div>
            <div className='sub-text'>좋아요 누른 글</div>
          </div>
          <div className='title'>고객센터</div>
        </div>
      </div>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>마이페이지</div>
          <div className='current active'>내 정보</div>
          <div className='current'>내 활동</div>
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
