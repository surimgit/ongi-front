import React, { ChangeEvent, useState } from 'react'
import './style.css'
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, NOTICE_ABSOLUTE_PATH } from 'src/constants';
import { useNavigate } from 'react-router';
import { ResponseDto } from 'src/apis/dto/response';
import { PostNoticeRequestDto } from 'src/apis/dto/request/admin';
import { postNoticeRequest } from 'src/apis';
import MypageSidebar from 'src/layouts/MypageSidebar';
import TextEditor from 'src/components/TextEditor';

export default function NoticeWrite() {
  
  // state: 공지사항 작성 내용 상태 //
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // state: 쿠키 상태 //
  const [cookies] = useCookies();

  // variable: accessToken //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 공지사항 작성 가능 여부 //
  const isActive = title !== '' && content !== '';

  // variable: 문의하기 작성 버튼 클래스 //
  const writeButtonClass = isActive ? 'button middle primary' : 'button middle disable'; 

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // function: post notice response 처리 함수 //
  const postNoticeResponse = (responseBody: ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }

    navigator(NOTICE_ABSOLUTE_PATH);
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

  // event handler: 취소 버튼 클릭 이벤트 처리 //
  const onCancelClickHandler = () => {
    navigator(NOTICE_ABSOLUTE_PATH);
  }

  // event handler: 공지사항 작성 버튼 클릭 이벤트 처리 //
  const onWriteButtonClickHandler = () => {
    if(!isActive || !accessToken) return;
    const requestBody: PostNoticeRequestDto = {
      content, title
    };
    postNoticeRequest(requestBody, accessToken).then(postNoticeResponse);
  };

  return (
    <div id='notice-write-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='write-header'>
          <div className='headline'>문의하기</div>
        </div>
        <div className='write-container'>
          <div className='input-box'>
            <input className='title' value={title} placeholder='제목을 입력해 주세요.' onChange={onTitleChangeHandler}/>
          </div>
          <div className='input-box'>
            <TextEditor content={content} setContent={onContentChangeHandler} />
          </div>
        </div>
        <div className='button-box'>
          <div className='btn cancel' onClick={onCancelClickHandler}>취소</div>
          <div className='btn write' onClick={onWriteButtonClickHandler}>작성</div>
        </div>
      </div>
    </div>
  )
}
