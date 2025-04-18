import React, { useEffect } from 'react'
import './style.css'
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, QUESTION_VIEW_ABSOLUTE_PATH, QUESTION_WRTIE_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import type { Question } from 'src/types/interfaces';
import { usePagination } from 'src/hooks';
import { GetQuestionListResponseDto } from 'src/apis/dto/response/question';
import { ResponseDto } from 'src/apis/dto/response';
import { l } from 'react-router/dist/development/fog-of-war-oa9CGk10';
import { getQuestionListRequest } from 'src/apis';
import Pagination from 'src/components/Pagination';

// interface: 문의사항 테이블 레코드 컴포넌트 속성 //
interface QuestionItemProps{
  question: Question;
}

// component: 문의사항 테이블 레코드 컴포넌트 //
function QuestionItem({ question }: QuestionItemProps){

  const {category, inAnswered, postDate, questionSequence, title} = question;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(QUESTION_VIEW_ABSOLUTE_PATH(questionSequence));
  }

  // render: 문의사항 테이블 레코드 컴포넌트 렌더링 //
  return(
    <div className='tr' onClick={onClick}>
      <div className='th date'>{postDate}</div>
      <div className='th category'>{category}</div>
      <div className='th title'>{title}</div>
      <div className='th is-answered'>{inAnswered}</div>
    </div>
  )
}


// component: 문의사항 메인 화면 컴포넌트 //
export default function Question() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: pagination 상태 //
  const{
    currentPage, setCurrentPage, currentSection, setCurrentSection, 
    totalSection, setTotalList, viewList, pageList
  } = usePagination<Question>();

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get question List response 처리 함수 //
  const getQuestionListResponse = (responseBody: GetQuestionListResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }

    const {questions} = responseBody as GetQuestionListResponseDto;
    setTotalList(questions);
  }

  // event handler: 작성하기 버튼 클릭 이벤트 처리 //
  const onWriteButtonClickHandler = () => {
    navigator(QUESTION_WRTIE_ABSOLUTE_PATH);
  }

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;
    getQuestionListRequest(accessToken).then(getQuestionListResponse);
  }, [])


  return (
    <div id='question-main-wrapper'>
      <div className='sidebar-container'>
        <div className='button'>카테고리</div>
        <div className='categories'>
          <div className='title'>내 정보</div>
          <div className='title'>내 활동</div>
          <div className='sub-title'>내가 받은 후기
            <div className='sub-text'>도우미 후기</div>
            <div className='sub-text'>도움 받은 후기</div>
          </div>
          <div className='sub-title'>내 공동구매
            <div className='sub-text'>판매 내역</div>
            <div className='sub-text'>구매 내역</div>
            <div className='sub-text'>장바구니</div>
            <div className='sub-text'>찜한 목록</div>
          </div>
          <div className='sub-title'>도우미
            <div className='sub-text'>내가 요청한 도움</div>
            <div className='sub-text'>신청 현황</div>
            <div className='sub-text'>좋아요 누른 글</div>
          </div>
          <div className='sub-title'>커뮤니티
            <div className='sub-text'>내가 쓴 글</div>
            <div className='sub-text'>내가 쓴 댓글</div>
            <div className='sub-text'>좋아요 누른 글</div>
          </div>
          <div className='title'>고객센터</div>
        </div>
      </div>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>고객센터</div>
          <div className='current active'>문의 내역</div>
          <div className='current'>FAQ</div>
          <div className='current'>공지사항</div>
        </div>
        <hr className='question-hr'/>
        <div className='question-header'>
          <div className='question-amount'>총 15건</div>
          <div className='write-button' onClick={onWriteButtonClickHandler}>작성</div>
        </div>
        <div className='question-list'>
          <div className='tr'>
              <div className='th date'>등록일</div>
              <div className='th category'>카테고리</div>
              <div className='th titile'>제목</div>
              <div className='th is-answered'>처리여부</div>
          </div>
          {viewList.map((question, index) => (
          <QuestionItem key={index} question={question}/>
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
