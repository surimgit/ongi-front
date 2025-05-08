import React, { useEffect, useState, ChangeEvent, ReactNode } from "react";
import { useParams, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, NEEDHELPER_ABSOLUTE_PATH } from "src/constants";
import { useSignInUserStore } from "src/stores";
import { ResponseDto } from "src/apis/dto/response";
import GetHelperPostResponseDto from "src/apis/dto/response/needhelper/get-helper-post.response.dto";
import GetHelperLikedResponseDto from "src/apis/dto/response/needhelper/get-helper-liked.response.dto";
import Modal from "src/components/Modal";
import "./style.css";
import { getHelperPostRequest, deleteHelperApplyRequest, getHelperLikedRequest, postHelperApplyRequest, putHelperLikedRequest, getHelperCommentsRequest, postHelperCommentRequest, deleteHelperPostRequest } from "src/apis";
import CommentItem from "../Comment";
import Report from "../ReportModal";
import PostHelperCommentRequestDto from "src/apis/dto/request/needhelper/post-helper-comment.request.dto";
import { CommunityComment } from "src/types/interfaces";

// component: need helper 상세 메인 컴포넌트 //
export default function NeedHelperPostDetail() {
    
    // state: sequence params //
    const { sequence } = useParams();
    
    // state: cookie 상태 //
    const [cookies] = useCookies();
    const accessToken = cookies[ACCESS_TOKEN];
    
    // state: user Id 상태 //
    const { userId } = useSignInUserStore();
    
    // state: navigator //
    const navigator = useNavigate();

    // state: 게시글 상태 //
    const [title, setTitle] = useState("");
    const [schedule, setSchedule] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [reward, setReward] = useState("");
    const [content, setContent] = useState("");
    const [likes, setLikes] = useState<string[]>([]);
    const [isReportOpen, setReportOpen] = useState(false);
    const [isApplied, setApplied] = useState(false);
    const [writeTime, setWriteTime] = useState("");

    // state: 게시글 작성자 //
    const [writerId, setWriterId] = useState('');

    // state: 좋아요 상태 //
    const isLiked = likes.includes(userId);
    const likedClass = isLiked ? "icon liked" : "icon not-liked";

    // state: 댓글 상태 //
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState<CommunityComment[]>([]); 


    // function: get helper post api 처리 함수 //
    const getHelperPostResponse = (responseBody: GetHelperPostResponseDto | ResponseDto | null) => {
        if (!responseBody || responseBody.code !== "SU") {
            alert("게시물을 불러오는데 실패했습니다.");
            navigator(NEEDHELPER_ABSOLUTE_PATH);
            return;
        }
        const { title, schedule, city, district, reward, content, userId, date } = responseBody as GetHelperPostResponseDto;

        setTitle(title);
        setSchedule(schedule);
        setCity(city);
        setDistrict(district);
        setReward(reward);
        setContent(content);
        setWriterId(userId);
        setWriteTime(date);
    };

    // function: get helper post api 처리 함수 //
    const getHelperLikedResponse = (responseBody: GetHelperLikedResponseDto | ResponseDto | null) => {
        if (!responseBody || responseBody.code !== "SU") {
            setLikes([]); 
            return;
        }
    
        const { likes } = responseBody as GetHelperLikedResponseDto;
        setLikes(likes || []);
    };
        

    // function: get comments 처리 함수 //
    const getHelperComments = () => {
        if(!sequence) return;
        getHelperCommentsRequest(sequence, accessToken).then(responseBody => {
            if(!responseBody || responseBody.code !== "SU") return;
            setComments(responseBody.comments);
        })
    };

    // function: data format // 
    const formatDate = (dateString: string) => {
        if (!dateString) return ""; // 예외 처리
    
        const date = new Date(dateString);
        
        return date.toLocaleDateString("ko-KR", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };    
    
    // function: delete helper post response 처리 함수 //
    const deleteHelperPostResponse = (responseBody: ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DEB' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.'
        : responseBody.code === 'NP' ? '권한이 없습니다.'
        : responseBody.code === 'NEC' ? '존재하지 않는 게시글입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }
    };
    
    // function: format Date 함수 //
    const formatWriteTime = (dateString: string) => {
        if (!dateString) return ""; 
    
        const date = new Date(dateString);
    
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    };

    // event handler: 좋아요 클릭 이벤트 처리 //
    const onLikedClickHandler = () => {
        if (!accessToken || !sequence) return;
        
        putHelperLikedRequest(Number(sequence), !isLiked, accessToken)
            .then(() => getHelperLikedRequest(Number(sequence), accessToken))
            .then(getHelperLikedResponse);
    };    

    // event handler: 신청하기 클릭 이벤트 처리 //
    const onApplyClickHandler = () => {
        if (!accessToken || !sequence) return;
        if (isApplied) {
            deleteHelperApplyRequest(Number(sequence), accessToken).then(() => {
            alert("신청 취소되었습니다!");
            setApplied(false);
            });
        } else {
            postHelperApplyRequest(Number(sequence), accessToken).then(() => {
            alert("신청되었습니다!");
            setApplied(true);
            });
        }
    };

    // event handler: 댓글 작성 버튼 클릭 이벤트 처리 //
    const onCommentPostHandler = () => {

        if (!commentInput.trim()) return;
        if (!accessToken || !sequence) return;
    
        const requestBody: PostHelperCommentRequestDto = { comment: commentInput };
    
        postHelperCommentRequest(requestBody, sequence, accessToken)
          .then(() => {
              setCommentInput("");
              getHelperComments();
          });

      };


    // event handler: 신고하기 클릭 이벤트 처리 //
    const onOpenReportClickHandler = () => setReportOpen(true);
    const onCloseReportClickHandler = () => setReportOpen(false);

    // event handler: 수정하기 클릭 이벤트 처리 //
    const onEditPostHandler = () => {
        navigator(`/needHelper/write/${sequence}`);
    };

    // event handler: 삭제하기 클릭 이벤트 처리 //
    const onDeletePostButtonClickHandler = () => {
        if (!sequence || !accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteHelperPostRequest(sequence, accessToken).then(deleteHelperPostResponse);
        navigator(NEEDHELPER_ABSOLUTE_PATH);
    }; 

    // effect: 화면 렌더링 시 호출 함수 //
    useEffect(() => {
        if (!sequence) {
        navigator(NEEDHELPER_ABSOLUTE_PATH);
        return;
        }
        getHelperPostRequest(Number(sequence), accessToken).then(getHelperPostResponse);
        getHelperLikedRequest(Number(sequence), accessToken).then(getHelperLikedResponse);
        getHelperComments();
    }, []);

    // render: 도우미 상세 게시글 컴포넌트 렌더링 //
    return (
    <div id="helper-detail-wrapper">
        <div className="detail-container">
            <div className='helper-detail-header'>
                <div className="title">{title}</div>
                { writerId !== userId ?  
                    <div className="apply-button" onClick={onApplyClickHandler}>
                        { isApplied ? "신청 취소" : "신청하기"}
                    </div> : 
                    <div className="my-helper-post">
                        <div className="edit-button" onClick={onEditPostHandler}>수정</div>
                        <div className="delete-button" onClick={onDeletePostButtonClickHandler}>삭제</div>
                    </div>
                }
            </div>            
            <div className="writer">작성자닉네임</div>
            <div className="date-report">
                <div className="write-date">작성일자: {formatWriteTime(writeTime)} </div>
                <div className="report" onClick={onOpenReportClickHandler}></div>
                {isReportOpen &&
                <Modal title="신고" onClose={onCloseReportClickHandler}>
                    <Report onClose={onCloseReportClickHandler} entityType="need_helper_post" entitySequence={sequence} />
                </Modal>
                }
            </div>
            <div className="info">
                <span>대면 여부: 대면</span> | 
                <span>지역: {city} {district}</span> | 
                <span>급여: {reward.toLocaleString()}원</span> | 
                <span>일시: {formatDate(schedule)}</span>
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
        <div className='user-reaction-container'>
            <div className='user-reaction-box'>
                <div className='comment-count'>댓글({comments.length})개</div>
                <div className='liked-box'>
                    <div className='liked-amount'>{likes.length}</div>
                    <div className={likedClass} onClick={onLikedClickHandler}></div>
                </div>
            </div>
            <div className='comment-input-box'>
                <textarea className='comment-input' maxLength={200} value={commentInput} onChange={(e) => setCommentInput(e.target.value)}/>
                <div className='comment-post' onClick={onCommentPostHandler}>작성</div>
            </div>
            { comments.length !== 0 &&
                <div className='comment-container'>
                    {
                        comments.map((communityComment, index) => 
                        <CommentItem key={index} communityComment={communityComment} getCommunityComment={getHelperComments} />)
                    }
                </div>
            }
        </div>
    </div>
    );
}

