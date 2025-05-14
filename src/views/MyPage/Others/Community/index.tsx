import React, { useEffect, useState } from 'react'
import './style.css';
import { getCommunityCommentsRequest, getMyCommunityPostRequest, getOtherUserCommunityPostRequest } from 'src/apis';
import { CommunityComment, CommunityPost } from 'src/types/interfaces';
import { useNavigate, useParams } from 'react-router';
import { ACCESS_TOKEN, COMMUNITY_VIEW_ABSOLUTE_PATH } from 'src/constants';
import GetCommunityCommentsResponse from 'src/apis/dto/response/community/get-community-comments.response.dto';
import { ResponseDto } from 'src/apis/dto/response';
import { useCookies } from 'react-cookie';
import { usePagination } from 'src/hooks';
import { GetCommunityResponseDto } from 'src/apis/dto/response/community';
import OtherSidebar from 'src/layouts/OtherUserSidebar';
import Pagination from 'src/components/Pagination';


// interface: 다른 사용자 커뮤니티 게시글 테이블 레코드 컴포넌트 속성 //
interface CommunityProps{
  communityPost: CommunityPost;
}

// component: 커뮤니티 게시글 테이블 레코드 컴포넌트 //
function CommunityItem({
  communityPost
}: CommunityProps) {

  const {category, liked, postDate, postSequence, title, viewCount} = communityPost;
  
  // state: 경로 변수 상태
  const { userId } = useParams();

  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(COMMUNITY_VIEW_ABSOLUTE_PATH(postSequence));
  }
  
  // state: 댓글 수 상태//
  const [communityComment, setCommunityComment] = useState<number>(0);


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


// component: 다른 사용자 커뮤니티 메인 화면 컴포넌트 //
export default function OtherUserCommunity() {
  
  // state: 경로 변수 상태
  const { userId } = useParams();

  // state: pagination 상태 //
  const{
    currentPage, setCurrentPage, currentSection, setCurrentSection, 
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<CommunityPost>();

  // function: get other user commnutiy post List response 처리 함수 //
  const getOtherCommunityPostResponse = (responseBody: GetCommunityResponseDto | ResponseDto | null) => {
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

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!userId) return;
    getOtherUserCommunityPostRequest(userId).then(getOtherCommunityPostResponse);
  }, []);

  return (
    <div id='other-community-main-wrapper'>
      <OtherSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          {totalList && 
          <div className='title'>작성한 게시글
            <div className='title-number'>{totalList.length}개</div>
          </div>}
        </div>
        <hr className='my-community-hr'/>
        <div className='my-community-list'>
          <div className='tr comment'>
            <div className='th category'>카테고리</div>
            <div className='th title'>제목</div>
            <div className='th liked'>좋아요</div>
            <div className='th views'>조회수</div>
            <div className='th date'>작성일</div>
          </div>
          {viewList.map((item, index) =>
            <CommunityItem communityPost={item as CommunityPost} />
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
