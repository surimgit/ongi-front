import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css';
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from 'react-router';
import { ACCESS_TOKEN, COMMUNITY_BOARD_ABSOLUTE_PATH, COMMUNITY_CATEGORY_ABSOLUTE_PATH, COMMUNITY_COUNTYBOARD_ABSOLUTE_PATH, COMMUNITY_HOTBOARD_ABSOLUTE_PATH, COMMUNITY_INFOBOARD_ABSOLUTE_PATH, COMMUNITY_POST_ABSOLUTE_PATH, COMMUNITY_SEARCH_ABSOLUTE_PATH, COMMUNITY_WRITE_ABSOLUTE_PATH, COUNTY_ABSOLUTE_PATH, COUNTY_CATEGORY_ABSOLUTE_PATH, COUNTY_MAIN_ABSOLUTE_PATH, MYPAGE_ABSOLUTE_PATH, REPORT_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { Board, CommunityCategory, SearchCategory } from 'src/types/aliases';
import { useSignInUserStore } from 'src/stores';
import County from 'src/types/aliases/community-county.alias';
import CountyMain from 'src/views/Community/County';

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

    // state: 게시판 지역 상태 //
    const regionType = searchParams.get('region') as string;
    const countyType = searchParams.get('county') as string;

    // state: 로그인 사용자 정보 //
    const { isAdmin, county, setCountyFromAddress } = useSignInUserStore();

    // state: 검색 카테고리 상태 //
    const [searchCategory, setSearchCategory] = useState<SearchCategory>('선택');

    // state: 검색 키워드 상태 //
    const [keyword, setKeyword] = useState<string>('');

    // state: 지역 상태 //
    const region = searchParams.get('region') as string;

    // variable: 게시판 상수 //
    const infoBoard = '정보 게시판';
    const countyBoard = '우리 동네 게시판';
    const myCountyBoard = county;

    // variable: 인기 게시판 클래스 //
    const hotBoardClass = boardType === '인기 게시판' && categoryType === null ? 'large-category active' : 'large-category';

    // variable: 정보 게시판 클래스 //
    const infoBoardClass = boardType === '정보 게시판' && categoryType === null ? 'large-category active' : 'large-category';
    
    // variable: 우리 동네 게시판 클래스 //
    const countyBoardClass = boardType === '우리 동네 게시판' && categoryType === null ? 'large-category active' : 'large-category';

    // variable: 우리 동네 게시판 클래스 //
    const myCountyBoardClass = boardType === '우리 동네 게시판' && categoryType === null ? 'large-category active' : 'large-category';

    // variable: 신고 게시판 클래스 //
    const reportBoardClass = boardType === '신고 게시판' && categoryType === null ? 'large-category active' : 'large-category';
    
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
        else if (targetBoard === '우리 동네 게시판') navigator(COUNTY_MAIN_ABSOLUTE_PATH(targetBoard));
        else navigator(COMMUNITY_BOARD_ABSOLUTE_PATH(targetBoard));
    };

    // event handler: 카테고리 게시판 클릭 이벤트 처리 //
    const onCategoryClickHandler = (targetBoard: Board, category: CommunityCategory) => {
        navigator(COMMUNITY_CATEGORY_ABSOLUTE_PATH(targetBoard, category));
    };

    // event handler: 사용자 거주지 게시판 클릭 이벤트 처리 //
    const onMyCountyClickHandler = (county: County) => {
        navigator(COUNTY_ABSOLUTE_PATH('우리 동네 게시판', county[0], county[1]));
    };

    // event handler: 사용자 거주지 카테고리 게시판 클릭 이벤트 처리 //
    const onMyCountyCategoryClickHandler = (targetBoard: Board, category: CommunityCategory, county: County | null) => {
        if (!county) {
            alert('주소를 등록해주세요.');
            return;
        }
        const [region, district] = county;
        if (!region && !district) return;
        navigator(COUNTY_CATEGORY_ABSOLUTE_PATH(targetBoard, category, region, district));
    };

    // event handler: 검색어 변경 이벤트 처리 //
    const onKeywordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
    };
    
    // event handler: 검색 이벤트 처리 //
    const onSearchClickHandler = () => {
    if (!searchCategory || !keyword) return;
    if (searchCategory === '선택') {
        alert('검색 유형을 선택해주세요.');
        return;
    }

    navigator(COMMUNITY_SEARCH_ABSOLUTE_PATH(searchCategory, keyword));
    };

    useEffect(() => {
        setSearchCategory('선택');
        setKeyword('');
    }, [searchParams]);

    // event handler: 주소 등록 클릭 이벤트 처리 //
    const onAddressRegisterClickHandler = () => {
        navigator(MYPAGE_ABSOLUTE_PATH);
    };

    // render: 우리 동네 게시판 메인 화면 컴포넌트 렌더링 //
    if (boardType === '우리 동네 게시판' && !region) {
        return <CountyMain />;
    }

    // render: 커뮤니티 사이드바 레이아웃 컴포넌트 렌더링 //
    return (
        <div id='community-layout-wrapper'>
            <div className='category-list-container'>
                {boardType === '우리 동네 게시판' && regionType &&
                    <div className='county-box'>
                        <div className='county-icon'></div>
                        <div className='county'>{regionType} {countyType}</div>
                    </div>
                }
                {(boardType !== '우리 동네 게시판' || !county) &&
                    <div className='blank'></div>
                }
                <div className='community-post-button' onClick={onPostClickHandler}>커뮤니티 글쓰기</div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className='category-item-box'>
                        <div className='item-icon'>🔥</div>
                        <div className={hotBoardClass} onClick={() => onBoardClickHandler('인기 게시판')}>인기 게시판</div>
                    </div>
                </div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className='category-item-box'>
                        <div className='item-icon'>💡</div>
                        <div className={infoBoardClass} onClick={() => onBoardClickHandler('정보 게시판')}>정보 게시판</div>
                    </div>
                    <div className='category-item-box'>
                        <div className='item-icon'>📄</div>
                        <div className={studyBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '공부')}>공부</div>
                    </div>
                    <div className='category-item-box'>
                        <div className='item-icon'>📄</div>
                        <div className={beautyBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '미용')}>미용</div>
                    </div>
                    <div className='category-item-box'>
                        <div className='item-icon'>📄</div>
                        <div className={travleBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '여행')}>여행</div>
                    </div>
                    <div className='category-item-box'>
                        <div className='item-icon'>📄</div>
                        <div className={mediaBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '영화/드라마')}>영화/드라마</div>
                    </div>
                    <div className='category-item-box'>
                        <div className='item-icon'>📄</div>
                        <div className={exerciseBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '운동')}>운동</div>
                    </div>
                    <div className='category-item-box'>
                        <div className='item-icon'>📄</div>
                        <div className={livingBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '자취꿀팁')}>자취꿀팁</div>
                    </div>
                    <div className='category-item-box'>
                        <div className='item-icon'>📄</div>
                        <div className={investBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '재테크')}>재테크</div>
                    </div>
                    <div className='category-item-box'>
                        <div className='item-icon'>📄</div>
                        <div className={fashionBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '패션')}>패션</div>
                    </div>
                    <div className='category-item-box'>
                        <div className='item-icon'>📄</div>
                        <div className={hotdealBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '핫딜')}>핫딜</div>
                    </div>
                    <div className='category-item-box'>
                        <div className='item-icon'>📄</div>
                        <div className={etcInfoBoardClass} onClick={() => onCategoryClickHandler(infoBoard, '정보기타')}>정보 기타</div>
                    </div>
                </div>
                <div className='divider'></div>
                <div className='category-container'>
                    <div className='category-item-box'>
                        <div className='item-icon'>🏙️</div>
                        <div className={countyBoardClass} onClick={() => onBoardClickHandler('우리 동네 게시판')}>우리 동네 게시판</div>
                    </div>
                    {county &&
                        <>
                            <div className='category-item-box'>
                                <div className='item-icon'>🏙️</div>
                                <div className={myCountyBoardClass} onClick={() => county && onMyCountyClickHandler(county)}>{county?.join(' ')}</div>
                            </div>
                            <div className='category-item-box'>
                                <div className='item-icon'>📄</div>
                                <div className={hometownBoardClass} onClick={() => onMyCountyCategoryClickHandler(countyBoard, '동네생활', county)}>동네 생활</div>
                            </div>
                            <div className='category-item-box'>
                                <div className='item-icon'>📄</div>
                                <div className={meetingBoardClass} onClick={() => onMyCountyCategoryClickHandler(countyBoard, '모임', county)}>모임</div>
                            </div>
                            <div className='category-item-box'>
                                <div className='item-icon'>📄</div>
                                <div className={etcCountyBoardClass} onClick={() => onMyCountyCategoryClickHandler(countyBoard, '우리동네기타', county)}>우리 동네 기타</div>
                            </div> 
                        </>
                    }
                    {!county &&
                        <div className='address-register' onClick={onAddressRegisterClickHandler}></div>
                    }
                    
                </div>
                {isAdmin &&
                <div className='category-container'>
                    <div className='divider'></div>
                    <div className='category-item-box'>
                        <div className='item-icon'>🔔</div>
                        <div className={reportBoardClass} onClick={() => onBoardClickHandler('신고 게시판')}>신고 게시판</div>
                    </div> 
                </div>
                    
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
