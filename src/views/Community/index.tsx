import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { CommunityComment, CommunityPost } from 'src/types/interfaces';
import usePagination from 'src/hooks/pagination.hook';
import Pagination from 'src/components/Pagination';
import { getCommunityRequest, getCommunitySearchRequest } from 'src/apis';
import { GetCommunityResponseDto } from 'src/apis/dto/response/community';
import { ResponseDto } from 'src/apis/dto/response';
import { useCookies } from 'react-cookie';
import { COMMUNITY_OVERALL_ABSOLUTE_PATH, COMMUNITY_SEARCH_ABSOLUTE_PATH, COMMUNITY_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { Board, CommunityCategory, SearchCategory } from 'src/types/aliases';
import useCommentCountStore from 'src/stores/comment-count.store';

const SECOND = 1000;
const MINUTE = 60;
const HOUR = 60;
const DAY = 24;

// interface: 게시글 레코드 컴포넌트 속성 //
interface TableItemProps {
  communityPost: CommunityPost;
  boardCategory: CommunityCategory | string;
}

// component: 게시글 테이블 레코드 컴포넌트 //
function TableItem({ communityPost, boardCategory }: TableItemProps) {
  const { postSequence, nickname, category, postDate, title, liked, viewCount } = communityPost;
  
  // state: 게시글 댓글 수 상태 //
  const { commentCountMap } = useCommentCountStore();
  const commentCount = commentCountMap[postSequence];

  // function: 내비게이터 함수 //
  const navigator = useNavigate();

  // function: 작성 일자 표시 형태를 정하는 함수 //
  const formatPostDate = (postDate: string) => {
    const [datePart, timePart] = postDate.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    const postedDate = new Date(year, month - 1, day, hour, minute, second);
    const now = new Date();

    const diffTime = now.getTime() - postedDate.getTime();

    const diffDays = diffTime / (SECOND * MINUTE * HOUR * DAY);

    if (diffDays >= 1) {
      return `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    } else {
      return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    }
  };
  
  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(COMMUNITY_VIEW_ABSOLUTE_PATH(postSequence));
  };

  // render: 게시글 테이블 레코드 컴포넌트 렌더링 //
  return (
    <div className='tr'>
      <div className='td category'>{category}</div>
      <div className='td title' >
        <span className='title-text' onClick={onClick}>
          {title} 
          {commentCount !== 0 && commentCount !== undefined &&
          <span> [{commentCount}]</span>
          }
          </span>
      </div>
      <div className='td nickname'>{nickname}</div>
      <div className='td liked'>{liked}</div>
      <div className='td view'>{viewCount}</div>
      <div className='td postDate'>{formatPostDate(postDate)}</div>
    </div>
  )
}


// component: 게시판 메인 화면 컴포넌트 //
export default function CommunityMain() {

  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList
  } = usePagination<CommunityPost>();

  // state: 게시판 parameter 상태 //
  const [searchParams] = useSearchParams();

  // state: 게시판 상태 //
  const boardType = searchParams.get('board') as Board;

  // state: 게시판 카테고리 상태 //
  const categoryType = searchParams.get('category') as CommunityCategory;

  // state: 검색어 상태 //
  const keywordState = searchParams.get('keyword') as string;

  // state: 게시글 카테고리 상태 //
  const [boardCategory, setBoardCategory] = useState<CommunityCategory | string>('전체');

  // state: 검색 카테고리 상태 //
  const [searchCategory, setSearchCategory] = useState<SearchCategory>('작성자');

  // state: 검색 키워드 상태 //
  const [keyword, setKeyword] = useState<string>('');

  // function: 내비게이터 //
  const navigator = useNavigate();

  // function: get community response 처리 함수 //
  const getCommunityResponse = (responseBody: GetCommunityResponseDto | ResponseDto | null) => {
    const message = !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess) {
      alert(message);
      
      return;
    }

    const { posts } = responseBody as GetCommunityResponseDto;
    setTotalList(posts);
    
  };

  // function: get community search response 처리 함수 //
  const getCommunitySearchResponse = (responseBody: GetCommunityResponseDto | ResponseDto | null) => {
    const message = !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess) {
      alert(message);
      
      return;
    }

    const { posts } = responseBody as GetCommunityResponseDto;
    setTotalList(posts);
  };

  // event handler: 검색어 변경 이벤트 처리 //
  const onKeywordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  // event handler: 검색 이벤트 처리 //
  const onSearchClickHandler = () => {
    if (!searchCategory || !keyword) return;

    getCommunitySearchRequest(searchCategory, keyword).then(getCommunitySearchResponse);
  };

  // effect: 컴포넌트 로드 시 실행할 함수 //
  useEffect(() => {
    if(!boardType) navigator(COMMUNITY_OVERALL_ABSOLUTE_PATH);
    else{
      getCommunityRequest(boardType, categoryType).then(getCommunityResponse);
    }
  }, [boardType, categoryType]);

  // render: 커뮤니티 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='info-community-main-wrapper'>
      <div className='board-header-container'>
        <div className='board-name'>
          {
          boardType === 
          '전체 글' ? '전체 글'
          : boardType === '인기 게시판' ? '인기 게시판'
          : boardType === '정보 게시판' ? '정보 게시판'
          : boardType === '우리 동네 게시판' ? '우리 동네 게시판' : ''
          }
        </div>
        { categoryType &&
          <div className='category-name'>
            {
              categoryType ===
              '공부' ? '공부'
              : categoryType === '미용' ? '미용'
              : categoryType === '여행' ? '여행'
              : categoryType === '영화/드라마' ? '영화/드라마'
              : categoryType === '운동' ? '운동'
              : categoryType === '자취꿀팁' ? '자취 꿀팁'
              : categoryType === '재테크' ? '재테크'
              : categoryType === '패션' ? '패션'
              : categoryType === '핫딜' ? '핫딜'
              : categoryType === '정보기타' ? '정보 기타'
              : categoryType === '동네생활' ? '동네 생활'
              : categoryType === '모임' ? '모임'
              : categoryType === '우리동네기타' ? '우리 동네 기타' : ''
            }
          </div>
        }
      </div>
      <div className='board-list-container'>
        <div className='board-list-table'>
          <div className='tr'>
            <div className='th category'>카테고리</div>
            <div className='th title'>제목</div>
            <div className='th nickname'>작성자</div>
            <div className='th liked'>좋아요</div>
            <div className='th view'>조회</div>
            <div className='th postDate'>작성 일자</div>
          </div>
          {viewList.map((communityPost, index) => 
          <TableItem key={index} 
          communityPost={communityPost} 
          boardCategory={boardCategory} 
          />)}
        </div>
      </div>
      <div className='pagination-container'>
        {totalSection !== 0 &&
        <Pagination 
            currentPage={currentPage}
            currentSection={currentSection}
            totalSection={totalSection}
            pageList={pageList}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
        />
        }
      </div>
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
    </div>
  )
}
