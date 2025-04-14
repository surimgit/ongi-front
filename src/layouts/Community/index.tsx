import React from 'react'
import './style.css';
import { Outlet } from 'react-router';

export default function CommunityLayout() {
  return (
    <div id='community-layout-wrapper'>
        <div className='category-list-container'>
            <div className='community-post-button'>커뮤니티 글쓰기</div>
            <div className='divider'></div>
            <div className='category-container'>
                <div className='large-category'>🔥인기 게시판</div>
            </div>
            <div className='divider'></div>
            <div className='category-container'>
                <div className='large-category'>💡정보 게시판</div>
                <div className='category-item'>ㄴ공부</div>
                <div className='category-item'>ㄴ미용</div>
                <div className='category-item'>ㄴ여행</div>
                <div className='category-item'>ㄴ영화/드라마</div>
                <div className='category-item'>ㄴ운동</div>
                <div className='category-item'>ㄴ자취꿀팁</div>
                <div className='category-item'>ㄴ재테크</div>
                <div className='category-item'>ㄴ패션</div>
                <div className='category-item'>ㄴ핫딜</div>
            </div>
            <div className='divider'></div>
            <div className='category-container'>
                <div className='large-category'>🏙️ 우리 동네 게시판</div>
                <div className='category-item'>ㄴ동네 생활</div>
                <div className='category-item'>ㄴ모임</div>
            </div>
        </div>
        <div id='board-format'>
            <Outlet />
        </div>
    </div>
    
  )
}
