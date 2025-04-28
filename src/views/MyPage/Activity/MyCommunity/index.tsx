import React from 'react'
import './style.css';
import MypageSidebar from 'src/layouts/MypageSidebar';

interface CommunityProps{
  category: string;
  title: string;
  liked: number;
  views: number;
  date: string;
}

const communityPosts = [
  {
    category: '운동',
    title: '다이아 찍어주실 분 구합니다 제발요',
    liked: 3,
    views: 5,
    date: '2025-04-11'
  },
  {
    category: '운동',
    title: '다이아 찍어주실 분 구합니다 제발요',
    liked: 3,
    views: 5,
    date: '2025-04-11'
  },
  {
    category: '운동',
    title: '다이아 찍어주실 분 구합니다 제발요',
    liked: 3,
    views: 5,
    date: '2025-04-11'
  },
  {
    category: '운동',
    title: '다이아 찍어주실 분 구합니다 제발요',
    liked: 3,
    views: 5,
    date: '2025-04-11'
  },
  {
    category: '운동',
    title: '다이아 찍어주실 분 구합니다 제발요',
    liked: 3,
    views: 5,
    date: '2025-04-11'
  },
  {
    category: '운동',
    title: '다이아 찍어주실 분 구합니다 제발요',
    liked: 3,
    views: 5,
    date: '2025-04-11'
  },
  {
    category: '운동',
    title: '다이아 찍어주실 분 구합니다 제발요',
    liked: 3,
    views: 5,
    date: '2025-04-11'
  },
]

function CommunityItem({
  category, title, liked, views, date
}: CommunityProps) {
  return(
    <div className='tr'>
      <div className='td category'>{category}</div>
      <div className='td title'>{title}[{views}]</div>
      <div className='td liked'>❤ㅇ{liked}</div>
      <div className='td views'>ㅇㅇ{views}</div>
      <div className='td date'>{date}</div>
    </div>
  )
}



export default function MyCommunity() {
  return (
    <div id='my-community-main-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>내가 요청한 도움 12개</div>
        </div>
        <hr className='my-community-hr'/>
        <div className='my-community-list'>
          <div className='tr'>
            <div className='th category'>카테고리</div>
            <div className='th title'>제목</div>
            <div className='th liked'>좋아요</div>
            <div className='th views'>조회수</div>
            <div className='th date'>작성일</div>
          </div>
          {communityPosts.map((communityPost, index) => (
            <CommunityItem key={index} {...communityPost}/>
          ))}
        </div>
        <div className='pagination'>1 2 3 4 5 6 7 8 9 10 --</div>
      </div>

    </div>
  )
}
