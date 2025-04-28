import React, { useEffect, useState } from 'react';
import './style.css';
import { usePagination } from 'src/hooks';
import { CommunityPost } from 'src/types/interfaces';
import { useNavigate, useSearchParams } from 'react-router';
import { getCommunitySearchRequest } from 'src/apis';
import { SearchCategory } from 'src/types/aliases';
import { GetCommunityResponseDto } from 'src/apis/dto/response/community';
import { ResponseDto } from 'src/apis/dto/response';
import Pagination from 'src/components/Pagination';
import useCommentCountStore from 'src/stores/comment-count.store';
import { COMMUNITY_VIEW_ABSOLUTE_PATH } from 'src/constants';

const SECOND = 1000;
const MINUTE = 60;
const HOUR = 60;
const DAY = 24;

// interface: 게시글 레코드 컴포넌트 속성 //
interface TableItemProps {
  communityPost: CommunityPost;
}

// component: 게시글 테이블 레코드 컴포넌트 //
function TableItem({ communityPost }: TableItemProps) {
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

// component: 검색 결과 컴포넌트 //
export default function CommunitySearch() {

    // state: 페이지네이션 상태 //
    const { 
        currentPage, setCurrentPage, currentSection, setCurrentSection,
        totalSection, setTotalList, viewList, pageList
    } = usePagination<CommunityPost>();

    // state: 게시판 parameter 상태 //
    const [searchParams] = useSearchParams();

    // state: 검색어 유형 상태 //
    const type = searchParams.get('type') as SearchCategory;

    // state: 검색어 상태 //
    const keyword = searchParams.get('keyword') as string;

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

    // effect: 컴포넌트 렌더 시 실행 함수 //
    useEffect(() => {
        getCommunitySearchRequest(type, keyword).then(getCommunitySearchResponse);
    }, [type, keyword]);

    // render: 검색 결과 컴포넌트 렌더링 //
    return (
        <div id='search-page-wrapper'>
            <div className='search-header'>
                '{keyword}' 검색 결과
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
        </div>
    )
}
