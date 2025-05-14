import React, { useEffect, useState } from 'react'
import './style.css';
import MypageSidebar from 'src/layouts/MypageSidebar';
import { HelperApplyList, MyNeedHelperPost } from 'src/types/interfaces';
import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, CHAT_ABSOLUTE_PATH, NEEDHELPER_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { useCookies } from 'react-cookie';
import { ResponseDto } from 'src/apis/dto/response';
import { accpetChatRequest, accpetHelperApplyRequest, getApplicantCountRequest, getHelperApplyListRequest, getHelperCommentsRequest, getHelperApplyRequest,getMyHelperApplyPostRequest, getMyHelperlikedPostRequest, getMyHelperRequestPostRequest } from 'src/apis';
import { usePagination } from 'src/hooks';
import GetMyHelperPostResponseDto from 'src/apis/dto/response/needhelper/get-my-helper-post-list.responsedto';
import Pagination from 'src/components/Pagination';
import GetHelperApplyListResponseDto from 'src/apis/dto/response/needhelper/get-helper-apply-list.response.dto';
import Modal from 'src/components/Modal';
import GetHelperIsApplyResponseDto from 'src/apis/dto/response/needhelper/get-helper-is-apply.response.dto';

// interface: 내 도우미 게시글 테이블 레코드 컴포넌트 속성 //
interface NeedHelperProps{
  needHelperPost: MyNeedHelperPost;
  isApplied: boolean;
  onApplyModalOpen: (postSequence: number) => void;
  type: 'ask' | 'apply' | 'liked';
}

interface Props {
  type: 'ask' | 'apply' | 'liked';
}

function NeedHelperItem({
  needHelperPost, onApplyModalOpen, isApplied, type 
}: NeedHelperProps) {
  const {date, sequence, title, schedule, isRequestSolved, applicantCount, commentCount } = needHelperPost;

  // function: 네비게이터 함수 //
  const navigator = useNavigate();
  
  // event handler: 레코드 클릭 이벤트 처리 //
  const onClick = () => {
    navigator(NEEDHELPER_VIEW_ABSOLUTE_PATH(sequence));
  }

  // event handler: 채팅 클릭 이벤트 처리 //
  const onChatClick = () => {
    navigator(CHAT_ABSOLUTE_PATH);
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
      {type === 'apply' ? (isApplied ? (
        <div className="td button-wrapper" onClick={onChatClick}>
          <div className='accept-button chat'>채팅</div>
        </div>
        ) : (
          <div className="td button-wrapper ">
            <div className='accept-button'>대기중</div>
          </div>
        )):
        <div className='td applicants-box' onClick={() => onApplyModalOpen(sequence)}>
          {applicantCount}
          <div className='applicants-icon'/>
        </div> 
      }
      <div className='td comments'>{commentCount}개</div>
    </div>
  )
}


export default function MyNeedHelper({ type }: Props) {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];
    
  // state: title 상태 //
  const [title, setTitle] = useState<string>('');

  // state: 신청 인원 관리 모달 오픈 상태 //
  const [isApplyModalOpen, setApplyModalOpen] = useState<boolean>(false);

  // state: 해당 게시글의 신청자 목록 상태 //
  const [applicants, setApplicants] = useState<HelperApplyList[] | null>(null);

  // state: 신청 수락 여부 상태 //
  const [appliedStatusMap, setAppliedStatusMap] = useState<{ [key: number]: boolean }>({});


  // event handler: 신청자 모달 버튼 클릭 이벤트 처리 //
  const onApplyModalOpenButtonClickHanlder = (postSequence: number) => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }
    const openState = !isApplyModalOpen
    setApplyModalOpen(openState);
    
    if (openState) {
      getHelperApplyListRequest(postSequence, accessToken).then(getHelperApplyListResponse);
    }
  }
    
  // event handler: 모달 닫기 버튼 클랙 이벤트 처리 //
  const closeApplyModal = () => {
    setApplyModalOpen(false);  // 모달 닫기
    setApplicants(null);       // 신청자 리스트 초기화
  };

  // event handler: 신청자 수락후 과정 이벤트 처리//
  const onAcceptApplicantsClickHandler = (applicantId: string) => {
    if (!accessToken) {
      alert("로그인이 필요합니다.");
      return;
    }
    const applicant = applicants?.find(apply => apply.applicantId === applicantId);

    if (!applicant) {
      alert('신청자 정보를 찾을 수 없습니다.');
      return;
    }
    
    const { postSequence, chatSequence } = applicant;
    accpetHelperApplyRequest(postSequence, applicantId, accessToken).then((responseBody) => accpetHelperApplyResponse(responseBody, postSequence, applicantId, chatSequence));
    
  }

  // function: 네비게이터 함수 //
  const navigator = useNavigate();
  
  // event handler: 채팅 클릭 이벤트 처리 //
  const onChatClick = () => {
    navigator(CHAT_ABSOLUTE_PATH);
  }

  // function: accpet helper apply response 처리 함수 //
  const accpetHelperApplyResponse = async (
    responseBody: any,
    postSequence: number,
    applicantId: string,
    chatSequence: number
  ) => {
    if (!responseBody || responseBody.code !== 'SU') {
      alert('도우미 신청 수락에 실패했습니다.');
      return;
    }

    const chatAcceptResponse = await accpetChatRequest(chatSequence, accessToken, applicantId);

    if (!chatAcceptResponse || chatAcceptResponse.code !== 'SU') {
      alert('채팅방 수락에 실패했습니다.');
      return;
    }

    alert('신청 수락이 완료되었습니다.');

    setApplicants(prevApplicants =>
      prevApplicants
        ? prevApplicants.map(applicant =>
            applicant.applicantId === applicantId
              ? { ...applicant, isApplied: true }
              : applicant
          )
        : null
    );
  };

  // function: get helper apply list response 처리 함수 //
  const getHelperApplyListResponse = async (responseBody: GetHelperApplyListResponseDto | ResponseDto | null) => {
    const message = 
      !responseBody ? '서버에 문제가 있습니다.' :
      responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' :
      responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess){
      alert(message);
      return;
    }

    const {applies} = responseBody as GetHelperApplyListResponseDto;
    setApplicants(applies);
  };

  // state: pagination 상태 //
  const{
    currentPage, setCurrentPage, currentSection, setCurrentSection, 
    totalSection, setTotalList, viewList, pageList, totalList
  } = usePagination<MyNeedHelperPost>();

  // function: featch post detail 처리 함수 //
  const fetchPostDetails = async (post: MyNeedHelperPost): Promise<MyNeedHelperPost> => {
    if (!accessToken) throw new Error('No Access Token');

    const [applicantCountResponse, commentsResponse] = await Promise.all([
      getApplicantCountRequest(post.sequence, accessToken),
      getHelperCommentsRequest(post.sequence, accessToken)
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
  const getMyHelperRequestPostResponse = async (responseBody: GetMyHelperPostResponseDto | ResponseDto | null) => {
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

  // function: get my helper apply post List response 처리 함수 //
  const getMyHelperApplyPostResponse = async (responseBody: GetMyHelperPostResponseDto | ResponseDto | null) => {
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

  // function: get my helper liked post List response 처리 함수 //
  const getMyHelperlikedPostResponse = async (responseBody: GetMyHelperPostResponseDto | ResponseDto | null) => {
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

  // effect: 타입 변경 함수 //
  useEffect(() => {
    if(!accessToken) return;

    const changeType = async () => {
      if(type === 'ask'){
        setTitle('내가 요청한 도우미 게시글')
        getMyHelperRequestPostRequest(accessToken).then(getMyHelperRequestPostResponse);
      }

      if(type === 'apply'){
        setTitle('내가 신청한 도우미 게시글')
        getMyHelperApplyPostRequest(accessToken).then(getMyHelperApplyPostResponse);
      }

      if(type === 'liked'){
        setTitle('내가 좋아요한 도우미 게시글')
        getMyHelperlikedPostRequest(accessToken).then(getMyHelperlikedPostResponse);
      }

    };
    changeType();
  }, [type]);

  // effect: 신청 게시글 변경 함수 //
  useEffect(() => {
    if (!accessToken) return;
    if (type !== 'apply') return;
    if (!viewList || viewList.length === 0) return;
  
    const fetchAllIsApplied = async () => {
      const results: { [key: number]: boolean } = {};
  
      for (const post of viewList) {
        try {
          const response = await getHelperApplyRequest(post.sequence, accessToken);
          if (response && response.code === 'SU') {
            results[post.sequence] = (response as GetHelperIsApplyResponseDto).isApplied;
          }
        } catch (error) {
          console.error('isApplied 요청 실패:', error);
        }
      }
  
      setAppliedStatusMap(results);
    };
  
    fetchAllIsApplied();
  }, [viewList, type]);

  return (
    <div id='need-helper-main-wrapper'>
      <MypageSidebar/>
      <div className='contents-wrapper'>
        <div className='title-area'>
          {totalList && 
            <div className='title'>{title}
              <div className='title-number'>{totalList.length}개</div>
          </div>}
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
          onApplyModalOpen={onApplyModalOpenButtonClickHanlder} 
          isApplied={appliedStatusMap[item.sequence] || false} 
          type={type} 
          />
          )}
          {isApplyModalOpen && applicants && type !== 'liked' &&(
          <Modal 
          title="신청자 목록" 
          onClose={closeApplyModal}
          >
          <div className="modal-applicants-wrapper">
          <div className="applicants-header">
            <div className="applicant-id">신청자 ID</div>
            <div className="requested-at">신청 일시</div>
            <div className="is-applied">승인 여부</div>
            <div className="action">액션</div>
          </div>
          <div className="applicants-list">
            {applicants.length === 0 ? <div className='applicants-notice'>아직 신청자가 없습니다!</div> : 
              applicants.map((applicant, index) => (
              <div className="applicant-row" key={index}>
                <div className="applicant-id">{applicant.applicantId}</div>
                <div className="requested-at">{new Date(applicant.requestedAt).toLocaleString()}</div>
                <div className="is-applied">{applicant.isApplied ? '승인됨' : '대기중'}</div>
                <div className="action">
                  {!applicant.isApplied ? (
                    <div
                      className="accept-button active"
                      onClick={() => onAcceptApplicantsClickHandler(applicant.applicantId)}
                    >
                      신청 수락
                    </div>
                  ) : (<div className='accept-button' onClick={onChatClick}>채팅</div>)}
                </div>
              </div>
              ))}
          </div>
          </div>
          </Modal>
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
