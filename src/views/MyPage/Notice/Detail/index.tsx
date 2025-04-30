import React, { useEffect, useState } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { useSignInUserStore } from 'src/stores';
import { ACCESS_TOKEN, NOTICE_ABSOLUTE_PATH, NOTICE_PATCH_ABSOLUTE_PATH } from 'src/constants';
import { GetNoticeResponseDto } from 'src/apis/dto/response/notice';
import { ResponseDto } from 'src/apis/dto/response';
import { deleteNoticeRequest, getNoticeRequest } from 'src/apis';
import MypageSidebar from 'src/layouts/MypageSidebar';

export default function NoticeView() {
  // state: 경로 변수 상태 //
  const { sequence } = useParams();

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 로그인 사용자 아이디 상태 //
  const { isAdmin } = useSignInUserStore();

  // state: 공지사항 내용 상태 //
  const [postDate, setPostDate] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

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
    const {content, title, postDate} = responseBody as GetNoticeResponseDto
      setPostDate(postDate);
      setContent(content);
      setTitle(title);
    };

  // function: delete notice response 처리 함수 //
  const deleteNoticeResponse = (responseBody:ResponseDto | null) => {
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

  // event handler: 수정 버튼 클릭 이벤트 처리 //
  const onUpdateClickHandler = () => {
    if(!sequence) return;
    navigator(NOTICE_PATCH_ABSOLUTE_PATH(sequence));
  } 

  // event handler: 삭제 버튼 클릭 이벤트 처리 //
  const onDeleteClickHandler = () => {
    if(!sequence || !accessToken) return;
    const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
    if(!isConfirm) return;

    deleteNoticeRequest(sequence, accessToken).then(deleteNoticeResponse);

    alert('삭제에 성공했습니다.');
    navigator(NOTICE_ABSOLUTE_PATH);
  }

  
  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;
    if(!sequence) {
      navigator(NOTICE_ABSOLUTE_PATH);
      return;
    }

    getNoticeRequest(sequence, accessToken).then(getNoticeResponse);
  }, [])

  return (
    <div id='notice-detail-wrapper'>
    <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='detail-container'>
          <div className='board-header-container'>공지사항
            <div className='interaction-box'>
                      { isAdmin &&
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
                      관리자
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
      </div>
    </div>
  )
}
