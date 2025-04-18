import React, { useEffect } from 'react'
import './style.css';
import { Link, Outlet, useNavigate, useSearchParams } from 'react-router';
import { ACCESS_TOKEN, COMMUNITY_BOARD_ABSOLUTE_PATH, COMMUNITY_CATEGORY_ABSOLUTE_PATH, COMMUNITY_COUNTYBOARD_ABSOLUTE_PATH, COMMUNITY_HOTBOARD_ABSOLUTE_PATH, COMMUNITY_INFOBOARD_ABSOLUTE_PATH, COMMUNITY_POST_ABSOLUTE_PATH, COMMUNITY_WRITE_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { Board, CommunityCategory } from 'src/types/aliases';

// component: 커뮤니티 사이드바 레이아웃 컴포넌트 //
export default function CommunityLayout() {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 게시판 parameter 상태 //
    const [searchParams] = useSearchParams();

    // state: 게시판 상태 //
    const boardType = searchParams.get('board') as Board;

    // variable: 게시판 상수 //
    const infoBoard = '정보 게시판';
    const countyBoard = '우리 동네 게시판';

    // function: 내비게이터 함수 //
    const navigator = useNavigate();

    // event handler: 커뮤니티 글쓰기 버튼 클릭 이벤트 처리 //
    const onPostClickHandler = () => {
        navigator(COMMUNITY_WRITE_ABSOLUTE_PATH);
    };

    // event handler: 게시판 클릭 이벤트 처리 //
    const onBoardClickHandler = (targetBoard: Board) => {
        navigator(COMMUNITY_BOARD_ABSOLUTE_PATH(targetBoard));
    };

    // event handler: 카테고리 게시판 클릭 이벤트 처리 //
    const onCategoryClickHandler = (targetBoard: Board, category: CommunityCategory) => {
        navigator(COMMUNITY_CATEGORY_ABSOLUTE_PATH(targetBoard, category));
    };

    // render: 커뮤니티 사이드바 레이아웃 컴포넌트 렌더링 //
    return (
        <div id='community-layout-wrapper'>
            <div className='category-list-container'>
                <div className='community-post-button' onClick={onPostClickHandler}>커뮤니티 글쓰기</div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className='large-category' onClick={() => onBoardClickHandler('인기 게시판')}>🔥인기 게시판</div>
                </div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className='large-category' onClick={() => onBoardClickHandler('정보 게시판')}>💡정보 게시판</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '공부')}>ㄴ공부</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '미용')}>ㄴ미용</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '여행')}>ㄴ여행</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '영화/드라마')}>ㄴ영화/드라마</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '운동')}>ㄴ운동</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '자취꿀팁')}>ㄴ자취꿀팁</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '재테크')}>ㄴ재테크</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '패션')}>ㄴ패션</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '핫딜')}>ㄴ핫딜</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '정보기타')}>ㄴ정보 기타</div>
                </div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className='large-category' onClick={() => onBoardClickHandler('우리 동네 게시판')}>🏙️ 우리 동네 게시판</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '동네생활')}>ㄴ동네 생활</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '모임')}>ㄴ모임</div>
                    <div className='category-item' onClick={() => onCategoryClickHandler(infoBoard, '우리동네기타')}>ㄴ우리 동네 기타</div>
                </div>
            </div>
            <div id='board-format'>
                <Outlet />
            </div>
        </div>
        
    )
}
