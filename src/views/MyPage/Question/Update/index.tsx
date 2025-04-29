import { useNavigate, useParams } from 'react-router';
import './style.css'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useSignInUserStore } from 'src/stores';
import { QuestionCategory } from 'src/types/aliases';
import { ACCESS_TOKEN, QUESTION_ABSOLUTE_PATH, QUESTION_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { GetQuestionResponseDto } from 'src/apis/dto/response/question';
import { ResponseDto } from 'src/apis/dto/response';
import { PatchQuestionRequestDto } from 'src/apis/dto/request/question';
import { getQuestionRequest, patchQuestionRequest } from 'src/apis';
import MypageSidebar from 'src/layouts/MypageSidebar';
import TextEditor from 'src/components/TextEditor';

export default function QuestionUpdate() {
    
  // state: 경로 변수 상태 //
  const { questionSequence } = useParams();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 로그인 사용자 아이디 상태 //
  const { userId } = useSignInUserStore();

  // state: 문의하기 내용 상태 //
  const [writerId, setWriterId] = useState<string>('');
  const [category, setCategory] = useState<QuestionCategory | ''>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 문의하기 수정 가능 여부 //
  const isActive = category !== '' && title !== '' && content !== '';

  // variable: 문의하기 수정 버튼 클래스 //
  const updateButtonClass = isActive ? 'button middle primary' : 'button middle disable';

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get Question post response 처리 함수//
  const getQuestionResponse = (responseBody:GetQuestionResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' : 
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
      
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess) {
      alert(message);
      navigator(QUESTION_ABSOLUTE_PATH);
      return;
    }
    const {category, content, title, userId} = responseBody as GetQuestionResponseDto
      setWriterId(userId);
      setCategory(category);
      setContent(content);
      setTitle(title);
    };

  // function: patch question response 처리 함수 //
  const patchQuestionResponse = (responseBody:ResponseDto | null) => {
    const message = 
      !responseBody? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
      
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess) {
      alert(message);
      return;
    }

    if(!questionSequence) return;

    navigator(QUESTION_VIEW_ABSOLUTE_PATH(questionSequence));
  }

  // event handler: 제목 변경 이벤트 처리 //
  const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  }

  // event handler: 내용 변경 이벤트 처리 //
  const onContentChangeHandler = (content: string) => {
    setContent(content);
  }

  // event handler: 문의하기 수정 버튼 클릭 이벤트 처리 //
  const onUpdateQuestionClickHandler = () => {
    if(!isActive || !accessToken || !questionSequence) return;
    const requestBody: PatchQuestionRequestDto = {
      category, content, title  
    };
    patchQuestionRequest(questionSequence, requestBody, accessToken).then(patchQuestionResponse);
  };

  // effect: 문의 번호가 변경될 시 실행할 함수 //
  useEffect(() => {
    if(!accessToken || !questionSequence) return;

    getQuestionRequest(questionSequence, accessToken).then(getQuestionResponse);
  }, [questionSequence])

  // effect: 로그인 유저 아이디와 작성자 아이디가 변경될 시 실행할 함수 //
  useEffect(() => {
    if(writerId && userId && writerId !== userId){
      alert('권한이 없습니다.');
      navigator(QUESTION_ABSOLUTE_PATH);
    }
  }, [writerId, userId])

  return (
    <div id='question-update-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='write-header'>
          <div className='headline'>문의하기</div>
        </div>
        <div className='write-container'>
          <div className='input-box'>
            <input className='title' value={title} placeholder='제목을 입력해 주세요.' onChange={onTitleChangeHandler}/>
          </div>
          <div className='dropbox-container'>
            <select className='select category' value={category} onChange={(event) => setCategory(event.target.value as QuestionCategory)}>
              <option value="">카테고리 선택</option>
              {
                <>
                  <option value="배송">배송</option>
                  <option value="커뮤니티">커뮤니티</option>
                  <option value="계정">계정</option>
                  <option value="광고">광고</option>
                  <option value="제안">제안</option>
                </>
              }
            </select>
          </div>
          <div className='input-box'>
            <div>
              <TextEditor content={content} setContent={onContentChangeHandler} />
            </div>
          </div>
        </div>
        <div className='button-box'>
          <div className='btn cancel'>취소</div>
          <div className='btn write' onClick={onUpdateQuestionClickHandler}>수정</div>
        </div>
      </div>
    </div>
  )
}
