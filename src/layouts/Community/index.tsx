import React from 'react'
import './style.css';
import { Outlet, useNavigate } from 'react-router';
import { ACCESS_TOKEN, COMMUNITY_COUNTYBOARD_ABSOLUTE_PATH, COMMUNITY_HOTBOARD_ABSOLUTE_PATH, COMMUNITY_INFOBOARD_ABSOLUTE_PATH, COMMUNITY_POST_ABSOLUTE_PATH, COMMUNITY_WRITE_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';

// component: 커뮤니티 사이드바 레이아웃 컴포넌트 //
export default function CommunityLayout() {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // variable: access Token //
    const accessToken = cookies[ACCESS_TOKEN];

    // function: 내비게이터 함수 //
    const navigator = useNavigate();

    // event handler: 커뮤니티 글쓰기 버튼 클릭 이벤트 처리 //
    const onPostClickHandler = () => {
        navigator(COMMUNITY_WRITE_ABSOLUTE_PATH);
    };

    // event handler: 인기 게시판 클릭 이벤트 처리 //
    const onHotBoardClickHandler = () => {
        navigator(COMMUNITY_HOTBOARD_ABSOLUTE_PATH);
    };

    // event handler: 정보 게시판 클릭 이벤트 처리 //
    const onInfoBoardClickHandler = () => {
        navigator(COMMUNITY_INFOBOARD_ABSOLUTE_PATH);
    };

    // event handler: 정보 게시판 클릭 이벤트 처리 //
    const onCountyBoardClickHandler = () => {
        navigator(COMMUNITY_COUNTYBOARD_ABSOLUTE_PATH);
    };

    // render: 커뮤니티 사이드바 레이아웃 컴포넌트 렌더링 //
    return (
        <div id='community-layout-wrapper'>
            <div className='category-list-container'>
                <div className='community-post-button' onClick={onPostClickHandler}>커뮤니티 글쓰기</div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className='large-category' onClick={onHotBoardClickHandler}>🔥인기 게시판</div>
                </div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className='large-category' onClick={onInfoBoardClickHandler}>💡정보 게시판</div>
                    <div className='category-item'>ㄴ공부</div>
                    <div className='category-item'>ㄴ미용</div>
                    <div className='category-item'>ㄴ여행</div>
                    <div className='category-item'>ㄴ영화/드라마</div>
                    <div className='category-item'>ㄴ운동</div>
                    <div className='category-item'>ㄴ자취꿀팁</div>
                    <div className='category-item'>ㄴ재테크</div>
                    <div className='category-item'>ㄴ패션</div>
                    <div className='category-item'>ㄴ핫딜</div>
                    <div className='category-item'>ㄴ정보기타</div>
                </div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className='large-category' onClick={onCountyBoardClickHandler}>🏙️ 우리 동네 게시판</div>
                    <div className='category-item'>ㄴ동네 생활</div>
                    <div className='category-item'>ㄴ모임</div>
                    <div className='category-item'>ㄴ우리동네기타</div>
                </div>
            </div>
            <div id='board-format'>
                <Outlet />
            </div>
        </div>
        
    )
}
