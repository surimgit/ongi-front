import { QuestionCategory } from 'src/types/aliases'
import './style.css'
import React, { ChangeEvent, useState } from 'react'
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, QUESTION_ABSOLUTE_PATH } from 'src/constants';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import { PostQuestionRequestDto } from 'src/apis/dto/request/question';
import { postNoticeRequest, postQuestionRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import { l } from 'react-router/dist/development/fog-of-war-oa9CGk10';
import TextEditor from 'src/components/TextEditor';
import MypageSidebar from 'src/layouts/MypageSidebar';

export default function QuestionWrite() {

  // state: 문의하기 작성 내용 상태 //
  const [category, setCategory] = useState<QuestionCategory | ''>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // variable: accessToken //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 문의하기 작성 가능 여부 //
  const isActive = category !== '' && title !== '' && content !== '';

  // variable: 문의하기 작성 버튼 클래스 //
  const writeButtonClass = isActive ? 'button middle primary' : 'button middle disable'; 

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: post question response 처리 함수 //
  const postQuestionResponse = (responseBody: ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }

    navigator(QUESTION_ABSOLUTE_PATH);
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

  // event handler: 문의하기 작성 버튼 클릭 이벤트 처리 //
  const onWriteButtonClickHandler = () => {
    if(!isActive || !accessToken) return;
    const requestBody: PostQuestionRequestDto = {
      category, content, title
    };
    postQuestionRequest(requestBody, accessToken).then(postQuestionResponse);
  };

  return (
    <div id='question-write-wrapper'>
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
                <>'배송'|'커뮤니티'|'계정'|'광고'|'제안';
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
            <TextEditor content={content} setContent={onContentChangeHandler} />
          </div>
        </div>
        <div className='button-box'>
          <div className='btn cancel'>취소</div>
          <div className='btn write' onClick={onWriteButtonClickHandler}>작성</div>
        </div>
      </div>
    </div>
  )
}
