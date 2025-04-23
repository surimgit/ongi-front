import React from 'react'
import './style.css';
import MypageSidebar from 'src/layouts/MypageSidebar';

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



export default function MyNeedHelper() {
  return (
    <div id='need-helper-main-wrapper'>
      <MypageSidebar/>
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
