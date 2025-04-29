import React, { ChangeEvent, useEffect, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { useSignInUserStore } from 'src/stores';
import { ACCESS_TOKEN, NOTICE_ABSOLUTE_PATH, NOTICE_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { ResponseDto } from 'src/apis/dto/response';
import { GetNoticeResponseDto } from 'src/apis/dto/response/notice';
import { PatchNoticeRequestDto } from 'src/apis/dto/request/admin';
import { getNoticeRequest, patchNoticeRequest } from 'src/apis';
import MypageSidebar from 'src/layouts/MypageSidebar';
import TextEditor from 'src/components/TextEditor';

export default function NoticeUpdate() {
  // state: 경로 변수 상태 //
  const { sequence } = useParams();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 공지사항 내용 상태 //
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 공지사항 수정 가능 여부 //
  const isActive = title !== '' && content !== '';

  // variable: 공지사항 수정 버튼 클래스 //
  const updateButtonClass = isActive ? 'button middle primary' : 'button middle disable';

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: get notice post response 처리 함수//
  const getNoticeResponse = (responseBody:GetNoticeResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' : 
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
      
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess) {
      alert(message);
      navigator(NOTICE_ABSOLUTE_PATH);
      return;
    }
    const {content, title} = responseBody as GetNoticeResponseDto
      setContent(content);
      setTitle(title);
    };

  // function: patch notice response 처리 함수 //
  const patchNoticeResponse = (responseBody:ResponseDto | null) => {
    const message = 
      !responseBody? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';
      
    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess) {
      alert(message);
      return;
    }

    if(!sequence) return;

    navigator(NOTICE_VIEW_ABSOLUTE_PATH(sequence));
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

  // event handler: 공지사항 수정 버튼 클릭 이벤트 처리 //
  const onUpdateQuestionClickHandler = () => {
    if(!isActive || !accessToken || !sequence) return;
    const requestBody: PatchNoticeRequestDto = {
      content, title
    };
    patchNoticeRequest(requestBody, sequence, accessToken).then(patchNoticeResponse);
  };

  // effect: 공지사항 번호가 변경될 시 실행할 함수 //
  useEffect(() => {
    if(!accessToken || !sequence) return;

    getNoticeRequest(sequence, accessToken).then(getNoticeResponse);
  }, [sequence])

  return (
    <div id='notice-update-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='write-header'>
          <div className='headline'>공지사항</div>
        </div>
        <div className='write-container'>
          <div className='input-box'>
            <input className='title' value={title} placeholder='제목을 입력해 주세요.' onChange={onTitleChangeHandler}/>
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
