import React, { useEffect } from 'react'
import './style.css'
import type { Notice } from 'src/types/interfaces';
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, FAQ_ABSOLUTE_PATH, NOTICE_VIEW_ABSOLUTE_PATH, NOTICE_WRITE_ABSOLUTE_PATH, QUESTION_ABSOLUTE_PATH } from 'src/constants';
import { usePagination } from 'src/hooks';
import { useCookies } from 'react-cookie';
import { GetNoticeListResponseDto } from 'src/apis/dto/response/notice';
import { ResponseDto } from 'src/apis/dto/response';
import { getNoticeListRequest } from 'src/apis';
import Pagination from 'src/components/Pagination';
import MypageSidebar from 'src/layouts/MypageSidebar';

// interface: 공지사항 테이블 레코드 컴포넌트 속성 //
interface NoticeItemProps{
  notice: Notice;
  index: number;
  total: number;
  currentPage: number;
  itemCountPerPage: number;
}


// component: 공지사항 테이블 레코드 컴포넌트 //
function NoticeItem({ notice, index, total, currentPage, itemCountPerPage }: NoticeItemProps){

  const {postDate, sequence, title} = notice;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // variable: UI용 sequence //
  const displayNumber = total - ((currentPage - 1) * itemCountPerPage + index);

  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(NOTICE_VIEW_ABSOLUTE_PATH(sequence));
  }

  // render: 문의사항 테이블 레코드 컴포넌트 렌더링 //
  return(
    <div className='tr' onClick={onClick}>
      <div className='td sequence'>{displayNumber}</div>
      <div className='td title'>{title}</div>
      <div className='td postdate'>{postDate}</div>
    </div>
  )
}

// component: 문의사항 메인 화면 컴포넌트 //
export default function Notice() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: pagination 상태 //
  const{
    currentPage, setCurrentPage, currentSection, setCurrentSection, 
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<Notice>();

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get notice List response 처리 함수 //
  const getNoticeListResponse = (responseBody: GetNoticeListResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }

    const {notices} = responseBody as GetNoticeListResponseDto;
    setTotalList(notices);
  }

  // event handler: 작성하기 버튼 클릭 이벤트 처리 //
  const onWriteButtonClickHandler = () => {
    navigator(NOTICE_WRITE_ABSOLUTE_PATH);
  }

  // event handler: faq 버튼 클릭 이벤트 처리 //
  const onFaqButtonClickHandler = () => {
    navigator(FAQ_ABSOLUTE_PATH);
  }

  // event handler: question 버튼 클릭 이벤트 처리 //
  const onQuestionButtonClickHandler = () => {
    navigator(QUESTION_ABSOLUTE_PATH);
  }
  
  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;
    getNoticeListRequest(accessToken).then(getNoticeListResponse);
  }, [])

  return (
    <div id='notice-main-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>고객센터</div>
          <div className='current' onClick={onQuestionButtonClickHandler}>문의 내역</div>
          <div className='current' onClick={onFaqButtonClickHandler}>FAQ</div>
          <div className='current active'>공지사항</div>
        </div>
        <hr className='notice-hr'/>
        <div className='notice-header'>
          <div className='notice-amount'>총 15건</div>
          <div className='write-button' onClick={onWriteButtonClickHandler}>작성</div>
        </div>
        <div className='notice-list'>
          <div className='tr'>
              <div className='th sequence'>번호</div>
              <div className='th title'>제목</div>
              <div className='th postdate'>등록일</div>
          </div>
          {viewList.map((notice, index) => (
            <NoticeItem 
            key={index} 
            notice={notice}
            index={index}
            total={totalList.length}  // ✅ 이렇게
            currentPage={currentPage}
            itemCountPerPage={10} // ✅ 항상 10개로 고정 (ITEMS_PER_PAGE)
            />
          ))}
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
