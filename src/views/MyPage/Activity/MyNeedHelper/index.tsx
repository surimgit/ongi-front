import React from 'react'
import './style.css';

interface NeedHelperProps{
  date: string;
  title: string;
  time: string;
  applicants: number;
  comments: number;
}

const needHelperPosts = [
  {
    date: '2025-04-11',
    title: '다이아 찍어주실 분 구합니다 제발요',
    time: '10시간 21분',
    applicants: 3,
    comments: 5
  },
  {
    date: '2025-04-11',
    title: '다이아 찍어주실 분 구합니다 제발요',
    time: '10시간 21분',
    applicants: 3,
    comments: 5
  },
  {
    date: '2025-04-11',
    title: '다이아 찍어주실 분 구합니다 제발요',
    time: '10시간 21분',
    applicants: 3,
    comments: 5
  },
  {
    date: '2025-04-11',
    title: '다이아 찍어주실 분 구합니다 제발요',
    time: '10시간 21분',
    applicants: 3,
    comments: 5
  }
]

function NeedHelperItem({
  date, title, time, applicants, comments
}: NeedHelperProps) {
  return(
    <div className='tr'>
      <div className='td date'>{date}</div>
      <div className='td title'>{title}</div>
      <div className='td time'>{time}</div>
      <div className='td applicants'>ㅇㅇ{applicants}명</div>
      <div className='td comments'>ㅇㅇ{comments}개</div>
    </div>
  )
}



export default function NeedHelper() {
  return (
    <div id='need-helper-main-wrapper'>
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
          <div className='title'>내가 요청한 도움 12개</div>
        </div>
        <hr className='need-helper-hr'/>
        <div className='need-helper-list'>
          <div className='tr'>
            <div className='th date'>등록일</div>
            <div className='th title'>제목</div>
            <div className='th time'>남은 시간</div>
            <div className='th applicants'>신청 인원</div>
            <div className='th comments'>댓글 수</div>
          </div>
          {needHelperPosts.map((needHelperPost, index) => (
            <NeedHelperItem key={index} {...needHelperPost}/>
          ))}
        </div>
        <div className='pagination'>1 2 3 4 5 6 7 8 9 10 --</div>
      </div>

    </div>
  )
}
