import React, { useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router';
import { CommunityPost } from 'src/types/interfaces';
import usePagination from 'src/hooks/pagination.hook';
import Pagination from 'src/components/Pagination';

// interface: 게시글 레코드 컴포넌트 속성 //
interface TableItemProps {
  communityPost: CommunityPost;
}

// component: 게시글 테이블 레코드 컴포넌트 //
function TableItem({ communityPost }: TableItemProps) {
  const { postSequence, userId, category, postDate, title, liked} = communityPost;

  // function: 내비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(`/info-community-main/${postSequence}`);
  };

  // render: 게시글 테이블 레코드 컴포넌트 렌더링
  return (
    <div className='tr' onClick={onClick}>
      <div className='td'>{category}</div>
      <div className='td title'>{title}</div>
      <div className='td nickname'>{userId}</div>
      <div className='td'>{liked}</div>
      <div className='td'>{postDate}</div>
    </div>
  )
}


// component: 정보 게시판 메인 화면 컴포넌트 //
export default function InfoCommunityMain() {

  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList
} = usePagination<CommunityPost>();

  // function: 내비게이터 함수 //
  const navigator = useNavigate();

  // effect: 컴포넌트 로드 시 실행할 함수 //
  useEffect(() => {

  }, []);

  // render: 정보 게시판 메인 화면 컴포넌트 렌더링 //
  return (
    <div id='info-community-main-wrapper'>
      <div className='board-header-container'>
        <div className='board-name'>정보 게시판</div>
        <div className='divider'></div>
        <div className='board-category'>패션</div>
      </div>
      <div className='board-list-container'>
        <div className='board-list-table'>
          <div className='tr'>
            <div className='th category'>카테고리</div>
            <div className='th title'>제목</div>
            <div className='th nickname'>작성자</div>
            <div className='th liked'>좋아요</div>
            <div className='th date'>작성 일자</div>
          </div>
          {viewList.map((communityPost, index) => <TableItem key={index} communityPost={communityPost} />)}
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
    </div>
  )
}
