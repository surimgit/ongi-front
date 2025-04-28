import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router';
import { ACCESS_TOKEN, COMMUNITY_BOARD_ABSOLUTE_PATH, COMMUNITY_CATEGORY_ABSOLUTE_PATH, COMMUNITY_COUNTYBOARD_ABSOLUTE_PATH, COMMUNITY_HOTBOARD_ABSOLUTE_PATH, COMMUNITY_INFOBOARD_ABSOLUTE_PATH, COMMUNITY_POST_ABSOLUTE_PATH, COMMUNITY_SEARCH_ABSOLUTE_PATH, COMMUNITY_WRITE_ABSOLUTE_PATH, REPORT_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { Board, CommunityCategory, SearchCategory } from 'src/types/aliases';
import { useSignInUserStore } from 'src/stores';

// component: 커뮤니티 사이드바 레이아웃 컴포넌트 //
export default function CommunityLayout() {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 게시판 parameter 상태 //
    const [searchParams] = useSearchParams();

    // state: 게시판 상태 //
    const boardType = searchParams.get('board') as Board;

    // state: 카테고리 상태 //
    const categoryType = searchParams.get('category') as CommunityCategory;

    // state: 검색 키워드 주소 상태 //
    const keywordKey = searchParams.get('keyword') as string;

    // state: 로그인 사용자 정보 //
    const { admin } = useSignInUserStore();

    // state: 검색 카테고리 상태 //
    const [searchCategory, setSearchCategory] = useState<SearchCategory>('선택');

    // state: 검색 키워드 상태 //
    const [keyword, setKeyword] = useState<string>('');

    // variable: 게시판 상수 //
    const infoBoard = '정보 게시판';
    const countyBoard = '우리 동네 게시판';

    // variable: 인기 게시판 클래스 //
    const hotBoardClass = boardType === '인기 게시판' && categoryType === null ? 'large-category active' : 'large-category';

    // variable: 정보 게시판 클래스 //
    const infoBoardClass = boardType === '정보 게시판' && categoryType === null ? 'large-category active' : 'large-category';
    
    // variable: 우리 동네 게시판 클래스 //
    const countyBoardClass = boardType === '우리 동네 게시판' && categoryType === null ? 'large-category active' : 'large-category';
    
    // variable: 각 카테고리 클래스 //
    const studyBoardClass = categoryType === '공부' ? 'category-item active' : 'category-item';
    const beautyBoardClass = categoryType === '미용' ? 'category-item active' : 'category-item';
    const travleBoardClass = categoryType === '여행' ? 'category-item active' : 'category-item';
    const mediaBoardClass = categoryType === '영화/드라마' ? 'category-item active' : 'category-item';
    const exerciseBoardClass = categoryType === '운동' ? 'category-item active' : 'category-item';
    const livingBoardClass = categoryType === '자취꿀팁' ? 'category-item active' : 'category-item';
    const investBoardClass = categoryType === '재테크' ? 'category-item active' : 'category-item';
    const fashionBoardClass = categoryType === '패션' ? 'category-item active' : 'category-item';
    const hotdealBoardClass = categoryType === '핫딜' ? 'category-item active' : 'category-item';
    const etcInfoBoardClass = categoryType === '정보기타' ? 'category-item active' : 'category-item';
    const hometownBoardClass = categoryType === '동네생활' ? 'category-item active' : 'category-item';
    const meetingBoardClass = categoryType === '모임' ? 'category-item active' : 'category-item';
    const etcCountyBoardClass = categoryType === '우리동네기타' ? 'category-item active' : 'category-item';

    // function: 내비게이터 함수 //
    const navigator = useNavigate();

    // event handler: 커뮤니티 글쓰기 버튼 클릭 이벤트 처리 //
    const onPostClickHandler = () => {
        navigator(COMMUNITY_WRITE_ABSOLUTE_PATH);
    };

    // event handler: 게시판 클릭 이벤트 처리 //
    const onBoardClickHandler = (targetBoard: Board) => {
        if (targetBoard === '신고 게시판') navigator(REPORT_ABSOLUTE_PATH);
        else navigator(COMMUNITY_BOARD_ABSOLUTE_PATH(targetBoard));
    };

    // event handler: 카테고리 게시판 클릭 이벤트 처리 //
    const onCategoryClickHandler = (targetBoard: Board, category: CommunityCategory) => {
        navigator(COMMUNITY_CATEGORY_ABSOLUTE_PATH(targetBoard, category));
    };

    // event handler: 검색어 변경 이벤트 처리 //
    const onKeywordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
    };
    
    // event handler: 검색 이벤트 처리 //
    const onSearchClickHandler = () => {
    if (!searchCategory || !keyword) return;

    navigator(COMMUNITY_SEARCH_ABSOLUTE_PATH(searchCategory, keyword));
    };

    useEffect(() => {
        setSearchCategory('선택');
        setKeyword('');
    }, [searchParams]);

    // render: 커뮤니티 사이드바 레이아웃 컴포넌트 렌더링 //
    return (
        <div id='community-layout-wrapper'>
            <div className='category-list-container'>
                <div className='community-post-button' onClick={onPostClickHandler}>커뮤니티 글쓰기</div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className={hotBoardClass} onClick={() => onBoardClickHandler('인기 게시판')}>🔥인기 게시판</div>
                </div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className={infoBoardClass} onClick={() => onBoardClickHandler('정보 게시판')}>💡정보 게시판</div>
                    <div className={studyBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '공부')}>ㄴ공부</div>
                    <div className={beautyBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '미용')}>ㄴ미용</div>
                    <div className={travleBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '여행')}>ㄴ여행</div>
                    <div className={mediaBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '영화/드라마')}>ㄴ영화/드라마</div>
                    <div className={exerciseBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '운동')}>ㄴ운동</div>
                    <div className={livingBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '자취꿀팁')}>ㄴ자취꿀팁</div>
                    <div className={investBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '재테크')}>ㄴ재테크</div>
                    <div className={fashionBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '패션')}>ㄴ패션</div>
                    <div className={hotdealBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '핫딜')}>ㄴ핫딜</div>
                    <div className={etcInfoBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '정보기타')}>ㄴ정보 기타</div>
                </div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className={countyBoardClass} onClick={() => onBoardClickHandler('우리 동네 게시판')}>🏙️ 우리 동네 게시판</div>
                    <div className={hometownBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '동네생활')}>ㄴ동네 생활</div>
                    <div className={meetingBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '모임')}>ㄴ모임</div>
                    <div className={etcCountyBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '우리동네기타')}>ㄴ우리 동네 기타</div>
                </div>
                {admin &&
                <>
                    <div className='divider'></div>
                    <div className='category-container'>
                        <div className={countyBoardClass} onClick={() => onBoardClickHandler('신고 게시판')}>🔔 신고 게시판</div>
                    </div>
                </>
                }
            </div>
            <div id='board-format'>
                <Outlet />
                {(boardType || keywordKey) &&
                    <div className='search-container'>
                        <select className='search-category' value={searchCategory} onChange={(event) => setSearchCategory(event.target.value as SearchCategory)}>
                            <option value="선택">선택</option>
                            <option value="writer">작성자</option>
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                        </select>
                        <input className='search-box' value={keyword} placeholder='검색 키워드를 입력해주세요.' onChange={onKeywordChangeHandler}/>
                        <div className='search-button' onClick={onSearchClickHandler}></div>
                    </div>
                }
            </div>
        </div>
        
    )
}
