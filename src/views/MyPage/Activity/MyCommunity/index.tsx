import React, { useEffect, useState } from 'react'
import './style.css';
import MypageSidebar from 'src/layouts/MypageSidebar';
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, COMMUNITY_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { CommunityComment, CommunityPost } from 'src/types/interfaces';
import { usePagination } from 'src/hooks';
import { useCookies } from 'react-cookie';
import { getCommunityCommentRequest, getCommunityCommentsRequest, getCommunityPostRequest, getMyCommunityCommentRequest, getMyCommunityLikedPostComment, getMyCommunityPostRequest, getNoticeListRequest } from 'src/apis';
import { GetCommunityPostResponseDto, GetCommunityResponseDto } from 'src/apis/dto/response/community';
import { ResponseDto } from 'src/apis/dto/response';
import GetCommunityCommentResponse from 'src/apis/dto/response/community/get-community-comment.response.dto';
import Pagination from 'src/components/Pagination';
import GetCommunityCommentsResponse from 'src/apis/dto/response/community/get-community-comments.response.dto';

// interface: 내 커뮤니티 게시글 테이블 레코드 컴포넌트 속성 //
interface CommunityProps{
  communityPost: CommunityPost;
}

// interface: 내 커뮤니티 댓글 테이블 레코드 컴포넌트 속성 //
interface CommentProps{
  communityComment: CommunityComment;
}

// interface: 게시글, 댓글, 좋아요 플래그 속성 //

interface Props {
  type: 'post' | 'comment' | 'liked';
}

// component: 커뮤니티 게시글 테이블 레코드 컴포넌트 //
function CommunityItem({
  communityPost
}: CommunityProps) {

  const {category, liked, postDate, postSequence, title, viewCount} = communityPost;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(COMMUNITY_VIEW_ABSOLUTE_PATH(postSequence));
  }
  
  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 댓글 수 상태//
  const [communityComment, setCommunityComment] = useState<number>(0);

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

   // function: get community comments response 처리 함수 //
  const getCommunityCommentsResponse = (responseBody:GetCommunityCommentsResponse | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }

    const {comments} = responseBody as GetCommunityCommentsResponse;
    setCommunityComment(comments.length);
  }

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;
    if(postSequence != null)
    getCommunityCommentsRequest(postSequence).then(getCommunityCommentsResponse);
  }, [])

  return(
    <div className='tr'>
      <div className='td category'>{category}</div>
      <div className='td title'>
        <span onClick={onClick}>
          {title}[{communityComment}]
        </span>
      </div>
      <div className='td liked'>{liked}</div>
      <div className='td views'>{viewCount}</div>
      <div className='td date'>{postDate}</div>
    </div>
  )
}

// component: 커뮤니티 게시글 테이블 레코드 컴포넌트 //
function CommentItem({
  communityComment
}: CommentProps){
  const {comment, commentPostDate, postSequence} = communityComment;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // state: 해당 게시글 제목 상태 //
  const [communityTitle, setCommunityTitle] = useState<string>('');

  // state: 해당 게시글 제목 상태 //
  const [communityCategory, setCommunityCategory] = useState<string>('');

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

    // function: get community post response 처리 함수 //
  const getCommunityPostResponse = (responseBody:GetCommunityPostResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }

    const {title, category} = responseBody as GetCommunityPostResponseDto;
    setCommunityTitle(title);
    setCommunityCategory(category);
  }

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!accessToken) return;
    if(postSequence != null)
    getCommunityPostRequest(postSequence).then(getCommunityPostResponse);
  }, [])
  
  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(COMMUNITY_VIEW_ABSOLUTE_PATH(postSequence));
  }

  return(
    <div className='tr comment'>
      <div className='td category'>{communityCategory}</div> 
      <div className='td comment-title-box' onClick={onClick}>
        <span className='td content' >{comment}</span>
        <span className='td title' >{communityTitle}</span>
      </div>
      <div className='td date'>{commentPostDate}</div>
    </div> 
  )

}

// component: 내 커뮤니티 메인 화면 컴포넌트 //
export default function MyCommunity( { type }: Props) {
  
  // state: cookie 상태 //
  const [cookies] = useCookies();

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];
  
  // state: title 상태 //
  const [title, setTitle] = useState<string>('');

  // state: pagination 상태 //
  const{
    currentPage, setCurrentPage, currentSection, setCurrentSection, 
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<CommunityPost | CommunityComment>();

  // function: get my commnutiy post List response 처리 함수 //
  const getMyCommunityPostResponse = (responseBody: GetCommunityResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }

    const {posts} = responseBody as GetCommunityResponseDto;
    setTotalList(posts);
  }
  
  // function: get my commnet List response 처리 함수 //
  const getMyCommunityCommentResponse = (responseBody: GetCommunityCommentsResponse | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }
    const {comments} = responseBody as GetCommunityCommentsResponse;

    if (!comments) {
      setTotalList([]);
      return;
    }

    setTotalList(comments);
  }

    
  // function: get my commnutiy liked post List response 처리 함수 //
  const getMyCommunityLikedPostResponse = (responseBody: GetCommunityResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    } 

    const {posts} = responseBody as GetCommunityResponseDto;
    setTotalList(posts);
  }


  // effect: 타입 변경 함수 //
  useEffect(() => {
    if(!accessToken) return;

    const changeType = async () => {
    
      if(type === 'post'){
        setTitle('내가 작성한 게시글')
        getMyCommunityPostRequest(accessToken).then(getMyCommunityPostResponse);
      }

      if(type === 'comment'){
        setTitle('내가 작성한 댓글')
        getMyCommunityCommentRequest(accessToken).then(getMyCommunityCommentResponse);
      }

      if(type === 'liked'){
        setTitle('내가 좋아요한 게시글')
        getMyCommunityLikedPostComment(accessToken).then(getMyCommunityLikedPostResponse);
      }
    };
    changeType();
  }, [type]);





  return (
    <div id='my-community-main-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          {totalList && 
          <div className='title'>{title}
            <div className='title-number'>{totalList.length}개</div>
          </div>}
        </div>
        <hr className='my-community-hr'/>
        <div className='my-community-list'>
        {type === 'comment' ? (
          <div className='tr'>
            <div className='th category'>카테고리</div>
            <div className='th comment-title-box'>내용</div>
            <div className='th date'>작성일</div>
          </div>  
          ) : (
            <div className='tr comment'>
              <div className='th category'>카테고리</div>
              <div className='th title'>제목</div>
              <div className='th liked'>좋아요</div>
              <div className='th views'>조회수</div>
              <div className='th date'>작성일</div>
            </div>
          )}
            {viewList.map((item, index) =>
            type === 'comment' ? (
              <CommentItem communityComment={item as CommunityComment} />
            ) : (
              <CommunityItem communityPost={item as CommunityPost} />
            )
          )}
          </div>
          <div className='pagination-box'>
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
