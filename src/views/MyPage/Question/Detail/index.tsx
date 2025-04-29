import React, { useEffect, useState } from 'react'
import './style.css'
import MypageSidebar from 'src/layouts/MypageSidebar'
import { useNavigate, useParams } from 'react-router'
import { useCookies } from 'react-cookie';
import { useSignInUserStore } from 'src/stores';
import { ACCESS_TOKEN, QUESTION_ABSOLUTE_PATH, QUESTION_ANSWER_ABSOLUTE_PATH, QUESTION_ANSWER_PATH, QUESTION_PATCH_ABSOLUTE_PATH } from 'src/constants';
import { QuestionCategory } from 'src/types/aliases';
import { deleteQuestionRequest, getQuestionRequest, patchAnswerRequest } from 'src/apis';
import { GetQuestionResponseDto } from 'src/apis/dto/response/question';
import { ResponseDto } from 'src/apis/dto/response';
import { l } from 'react-router/dist/development/fog-of-war-oa9CGk10';

export default function QuestionView() {

  // state: 경로 변수 상태 //
  const { questionSequence } = useParams();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 로그인 사용자 아이디 상태 //
  const { userId, isAdmin } = useSignInUserStore();

  // state: 답변 작성 모드 상태 //
  const [isAnswerEditMode, setIsAnswerEditMode] = useState<boolean>(false);
  // state: 답변 작성 입력 상태 //
  const [editedAnswer, setEditedAnswer] = useState<string>('');

  // state: 문의하기 내용 상태 //
  const [postDate, setPostDate] = useState<string>('');
  const [writerId, setWriterId] = useState<string>('');
  const [category, setCategory] = useState<QuestionCategory | ''>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

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
    const {answer, category, content, answered, title, userId, postDate} = responseBody as GetQuestionResponseDto
      setWriterId(userId);
      setPostDate(postDate);
      setCategory(category);
      setContent(content);
      setAnswer(answer);
      setIsAnswered(answered);
      setTitle(title);
    };

  // function: delete question response 처리 함수 //
  const deleteQuestionResponse = (responseBody:ResponseDto | null) => {
    const message = 
      !responseBody? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
      
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess) {
      alert(message);
    }

    return;
  }

  // function: patch question answer response 처리 함수 //
  const patchAnswerResponse = (responseBody: ResponseDto | null) => {
  const message =
    !responseBody ? '서버에 문제가 있습니다.' :
    responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
    responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

  const isSuccess = responseBody !== null && responseBody.code === 'SU';
  if (!isSuccess) {
    alert(message);
    return;
  }

  setAnswer(editedAnswer); 
  setIsAnswerEditMode(false); 
  }

  // event handler: 수정 버튼 클릭 이벤트 처리 //
  const onUpdateClickHandler = () => {
    if(!questionSequence) return;
    navigator(QUESTION_PATCH_ABSOLUTE_PATH(questionSequence));
  } 

  // event handler: 삭제 버튼 클릭 이벤트 처리 //
  const onDeleteClickHandler = () => {
    if(!questionSequence || !accessToken) return;
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if(!isConfirm) return;

    if(isAnswered === true){
      alert('답변이 등록되었으므로 삭제할 수 없습니다.');
    }

    deleteQuestionRequest(questionSequence, accessToken).then(deleteQuestionResponse);

    alert('삭제에 성공했습니다.');
    navigator(QUESTION_ABSOLUTE_PATH);
  }

  // event handler: 답변 버튼 클릭 이벤트 처리 //
  const onPatchAnswerClickHandler = () => {
    if(!questionSequence || !isAdmin){
      return;
    }

    setIsAnswerEditMode(true);
  }

  // event handler: 답변 등록 버튼 클릭 이벤트 처리 //
  const onAnswerSubmitClickHandler = () => {
    if (!questionSequence || !accessToken) return;
  
    const requestBody = { answer: editedAnswer };
    patchAnswerRequest(questionSequence, requestBody, accessToken).then(patchAnswerResponse);
  }

  // event handler: 답변 입력창 변경 이벤트 처리 //
  const onAnswerInputChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedAnswer(event.target.value);
  }
  
  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;
    if(!questionSequence) {
      navigator(QUESTION_ABSOLUTE_PATH);
      return;
    }

    getQuestionRequest(questionSequence, accessToken).then(getQuestionResponse);
  }, [])

  return (
    <div id='question-detail-wrapper'>
    <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='detail-container'>
          <div className='board-header-container'>
            문의내역
            <div className='question-category'>{category}</div>
            <div className='interaction-box'>
                      { writerId === userId &&
                          <>
                          <div className='bt edit' onClick={onUpdateClickHandler}>수정</div>
                          <div className='bt delete' onClick={onDeleteClickHandler}>삭제</div>
                          </>
                      }
            </div>
          </div>
          <div className='title-container'>
              <div className='title'>{title}</div>
              <div className='title-footer'>
                  <div className='post-info'>
                      {writerId.length >= 6 ? '***' + writerId.slice(3) : writerId}
                      <div className='posted-date'>{postDate}</div>
                  </div>
              </div>
          </div>
          <div className='content-container'>
              <div className='content' style={{ flex: 1, display: 'block'}}
                  dangerouslySetInnerHTML={{
                    __html: content.replace(/\n/g, '<br />')
                  }}
              ></div>
          </div>
        </div>
        {(isAnswered || isAdmin) && 
          <div className='answer-container'> 
            <div className='answer-title'>답변 내역
              {isAdmin && !isAnswerEditMode &&
                <div className='bt answer-write' onClick={onPatchAnswerClickHandler}>작성</div>
              }
              {isAdmin && isAnswerEditMode &&
                <div className='bt answer-submit' onClick={onAnswerSubmitClickHandler}>등록</div>
              }
            </div>
            <div className='answer-content'>
              {isAnswerEditMode ? (
                <textarea 
                  className='answer-input'
                  value={editedAnswer}
                  onChange={onAnswerInputChangeHandler}
                  placeholder='답변을 입력해주세요.'
                  style={{ width: '100%', height: '150px', marginTop: '10px' }}
                />
              ) : (
                answer
              )}
            </div>
          </div>
        }
      </div>
    </div>
  )
}
