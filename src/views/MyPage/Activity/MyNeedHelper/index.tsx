import React, { useEffect, useState } from 'react'
import './style.css';
import MypageSidebar from 'src/layouts/MypageSidebar';
import { NeedHelperPost } from 'src/types/interfaces';
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, NEEDHELPER_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import GetHelperCommentResponse from 'src/apis/dto/response/needhelper/get-helper-comment.response.dto';
import { ResponseDto } from 'src/apis/dto/response';
import GetHelperCommentsResponse from 'src/apis/dto/response/needhelper/get-helper-comments.response.dto';
import { getHelperCommentsRequest } from 'src/apis';

// interface: 내 커뮤니티 게시글 테이블 레코드 컴포넌트 속성 //
interface NeedHelperProps{
  needHelperPost: NeedHelperPost;
}


interface Props {
  type: 'request' | 'apply' | 'liked';
}



function NeedHelperItem({
  needHelperPost
}: NeedHelperProps) {
  const {date, sequence, title, schedule, isRequestSolved } = needHelperPost;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(NEEDHELPER_VIEW_ABSOLUTE_PATH(sequence));
  }
  
  // state: cookie 상태 //
  const [cookies] = useCookies();

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // state: 댓글 수 상태//
  const [needHelperComment, setNeedHelperComment] = useState<number>(0);

  
  // function: get community comments response 처리 함수 //
  const getHelperCommentsResponse = (responseBody:GetHelperCommentsResponse | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }

    const {comments} = responseBody as GetHelperCommentsResponse;
    setNeedHelperComment(comments.length);
  }

    // effect: 컴포넌트 로드시 실행할 함수 //
    useEffect(() => {
      if(!accessToken) return;
      if(sequence != null)
      getHelperCommentsRequest(sequence, accessToken).then(getHelperCommentsResponse);
    }, [])
  

  return(
    <div className='tr'>
      <div className='td date'>{date}</div>
      <div className='td title'>{title}</div>
      <div className='td time'>{schedule}</div>
      <div className='td applicants'>ㅇㅇ명</div>
      <div className='td comments'>{needHelperComment}개</div>
    </div>
  )
}



export default function MyNeedHelper() {
  return (
    <div id='need-helper-main-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>내가 요청한 도움 12개</div>
        </div>
        <hr className='need-helper-hr'/>
        <div className='need-helper-list'>
          <div className='tr'>
            <div className='th date'>등록일</div>
            <div className='th title'>제목</div>
            <div className='th time'>남은 시간</div>
            <div className='th applicants'>신청 인원</div>
            <div className='th comments'>댓글 수</div>
          </div>
          {/* {needHelperPosts.map((needHelperPost, index) => (
            <NeedHelperItem key={index} {...needHelperPost}/>
          ))} */}
        </div>
        <div className='pagination'>1 2 3 4 5 6 7 8 9 10 --</div>
      </div>

    </div>
  )
}
