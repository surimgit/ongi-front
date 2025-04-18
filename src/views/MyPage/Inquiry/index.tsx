import React from 'react'
import './style.css'

export default function Inquiry() {
  return (
    <div id='inquiry-main-wrapper'>
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
          <div className='title'>고객센터</div>
          <div className='current active'>문의 내역</div>
          <div className='current'>FAQ</div>
          <div className='current'>공지사항</div>
        </div>
        <hr className='inquriy-hr'/>
        <div className='inquriy-header'>
          <div className='inquriy-amount'>총 15건</div>
          <div className='write-button'>작성</div>
        </div>
        <div className='inquriy-list'>
          <div className='list-box'>
            <div className='date'>등록일</div>
            <div className='category'>카테고리</div>
            <div className='title'>제목</div>
            <div className='is_answered'>처리여부</div>
          </div>
          <div className='list-box'>
            <div className='date content'>2025-04-10</div>
            <div className='category content'>배송 문의</div>
            <div className='title content'>아직 상품이 도착하지 않았습니다</div>
            <div className='is_answered content'>접수중</div>
          </div>
          <div className='list-box'>
            <div className='date content'>2025-04-10</div>
            <div className='category content'>배송 문의</div>
            <div className='title content'>아직 상품이 도착하지 않았습니다</div>
            <div className='is_answered content'>접수중</div>
          </div>
          <div className='list-box'>
            <div className='date content'>2025-04-10</div>
            <div className='category content'>배송 문의</div>
            <div className='title content'>아직 상품이 도착하지 않았습니다</div>
            <div className='is_answered content'>접수중</div>
          </div>
          <div className='list-box'>
            <div className='date content'>2025-04-10</div>
            <div className='category content'>배송 문의</div>
            <div className='title content'>아직 상품이 도착하지 않았습니다</div>
            <div className='is_answered content'>접수중</div>
          </div>
          <div className='list-box'>
            <div className='date content'>2025-04-10</div>
            <div className='category content'>배송 문의</div>
            <div className='title content'>아직 상품이 도착하지 않았습니다</div>
            <div className='is_answered content'>접수중</div>
          </div>
          <div className='list-box'>
            <div className='date content'>2025-04-10</div>
            <div className='category content'>배송 문의</div>
            <div className='title content'>아직 상품이 도착하지 않았습니다</div>
            <div className='is_answered content'>접수중</div>
          </div>
          <div className='list-box'>
            <div className='date content'>2025-04-10</div>
            <div className='category content'>배송 문의</div>
            <div className='title content'>아직 상품이 도착하지 않았습니다</div>
            <div className='is_answered content'>접수중</div>
          </div>
          <div className='list-box'>
            <div className='date content'>2025-04-10</div>
            <div className='category content'>배송 문의</div>
            <div className='title content'>아직 상품이 도착하지 않았습니다</div>
            <div className='is_answered content'>접수중</div>
          </div>
          <div className='list-box'>
            <div className='date content'>2025-04-10</div>
            <div className='category content'>배송 문의</div>
            <div className='title content'>아직 상품이 도착하지 않았습니다</div>
            <div className='is_answered content'>접수중</div>
          </div>
          <div className='list-box'>
            <div className='date content'>2025-04-10</div>
            <div className='category content'>배송 문의</div>
            <div className='title content'>아직 상품이 도착하지 않았습니다</div>
            <div className='is_answered content'>접수중</div>
          </div>
        </div>
        <div className='pagination'>1 2 3 4 5 6 7 8 9 10 --</div>
      </div>

    </div>
  )
}
