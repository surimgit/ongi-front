import React from 'react'
import './style.css'

export default function Faq() {
  return (
    <div id='faq-main-wrapper'>
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
          <div className='title'>FAQ</div>
          <div className='current'>문의 내역</div>
          <div className='current active'>FAQ</div>
          <div className='current'>공지사항</div>
        </div>
        <hr className='faq-hr'/>
        <div className='question-title'>자주 묻는 질문</div>
        <div className='question-list'>
          <div className='question-text'>Q1. 아이디/비밀번호를 잃어버렸어요</div>
          <div className='answer-text'>A1. 로그인 페이지의 아이디/비밀번호 찾기 기능을 통해 아이디와 비밀번호를 찾을 수 있어요. 아이디 및 비밀번호를 찾기 위해서는 휴대전화 번호 인증이 요구돼요.</div>
        </div>
        <div className='question-list'>
          <div className='question-text'>Q1. 아이디/비밀번호를 잃어버렸어요</div>
          <div className='answer-text'>A1. 로그인 페이지의 아이디/비밀번호 찾기 기능을 통해 아이디와 비밀번호를 찾을 수 있어요. 아이디 및 비밀번호를 찾기 위해서는 휴대전화 번호 인증이 요구돼요.</div>
        </div>
      </div>
    </div>
  )
}
