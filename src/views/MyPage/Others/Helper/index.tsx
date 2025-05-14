import React, { useEffect } from 'react'
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { usePagination } from 'src/hooks';
import { MyNeedHelperPost } from 'src/types/interfaces';
import { NEEDHELPER_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { getOtherApplicantCountRequest, getOtherUserHelperCommentsRequest, getOtherUserHelperPostRequest } from 'src/apis';
import GetMyHelperPostResponseDto from 'src/apis/dto/response/needhelper/get-my-helper-post-list.responsedto';
import { ResponseDto } from 'src/apis/dto/response';
import OtherSidebar from 'src/layouts/OtherUserSidebar';
import Pagination from 'src/components/Pagination';



// interface: 내 도우미 게시글 테이블 레코드 컴포넌트 속성 //
interface NeedHelperProps{
  needHelperPost: MyNeedHelperPost;
}


function NeedHelperItem({
  needHelperPost
}: NeedHelperProps) {
  const {date, sequence, title, schedule, isRequestSolved, applicantCount, commentCount } = needHelperPost;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();
  
  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(NEEDHELPER_VIEW_ABSOLUTE_PATH(sequence));
  }

  // function: 시간 변환 함수 처리 //
  const getRemainingTime = (schedule: string) => {
    const now = new Date();
    const scheduleDate = new Date(schedule);
  
    const diffMs = scheduleDate.getTime() - now.getTime();
  
    if (diffMs <= 0) {
      return '마감';
    }
  
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${diffHours}시간 ${diffMinutes}분`;
  };

  return(
    <div className='tr'>
      <div className='td date'>{date.slice(0, 10)}</div>
      <div className='td title'>
        <span onClick={onClick}>
          {title}
        </span>
      </div>
      <div className='td time'>{getRemainingTime(schedule)}</div>
      <div className='td applicants-box'>
        {applicantCount}
      <div className='applicants-icon'/>
      </div>
      <div className='td comments'>{commentCount}개</div>
    </div>
  )
}


// component: 다른 사용자 커뮤니티 메인 화면 컴포넌트 //
export default function OtherUserHelper() {
  
  // state: 경로 변수 상태
  const { userId } = useParams();

  // state: pagination 상태 //
  const{
    currentPage, setCurrentPage, currentSection, setCurrentSection, 
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<MyNeedHelperPost>();

  
  // function: featch post detail 처리 함수 //
  const fetchPostDetails = async (post: MyNeedHelperPost): Promise<MyNeedHelperPost> => {
    if (!userId) throw new Error('No Exist User');

    const [applicantCountResponse, commentsResponse] = await Promise.all([
      getOtherApplicantCountRequest(post.sequence, userId),
      getOtherUserHelperCommentsRequest(post.sequence, userId)
    ]);

    const applicantCount = typeof applicantCountResponse === 'number' ? applicantCountResponse : 0;
    const commentCount = (commentsResponse && 'comments' in commentsResponse) ? commentsResponse.comments.length : 0;

    return {
      ...post,
      applicantCount,
      commentCount,
    };
  };

  // function: get my helper request post List response 처리 함수 //
  const getOtherUserHelperPostResponse = async (responseBody: GetMyHelperPostResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }

    const {posts} = responseBody as GetMyHelperPostResponseDto;
    const postsWithDetails = await Promise.all(
      posts.map(post => fetchPostDetails(post))
    );

    setTotalList(postsWithDetails);
  };

  // effect: 컴포넌트 로드시 실행할 함수 //
  useEffect(() => {
    if(!userId) return;
    getOtherUserHelperPostRequest(userId).then(getOtherUserHelperPostResponse);
  }, []);

  return (
    <div id='other-helper-main-wrapper'>
      <OtherSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          <div className='title'>작성한 게시글
            <div className='title-number'>{totalList.length}개</div>
          </div>
        </div>
        <hr className='need-helper-hr'/>
        <div className='need-helper-list'>      
          <div className='tr'>
            <div className='th date'>등록일</div>
            <div className='th title'>제목</div>
            <div className='th time'>남은시간</div>
            <div className='th applicants'>신청 인원</div>
            <div className='th comments'>댓글 수</div>
          </div>  
          {viewList.map((item, index) =>
          <NeedHelperItem 
          key={index}
          needHelperPost={item as MyNeedHelperPost}
          />)}
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

