import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, COMMUNITY_EDIT_ABSOLUTE_PATH, COMMUNITY_OVERALL_ABSOLUTE_PATH } from 'src/constants';
import { deleteCommunityCommentRequest, deleteCommunityPostRequest, getCommunityCommentRequest, getCommunityCommentsRequest, getCommunityLikedRequest, getCommunityPostRequest, patchCommunityCommentRequest, patchCommunityViewCountRequest, postAlertRequest, postCommunityCommentRequest, postReportRequest, putCommunityLikedRequest } from 'src/apis';
import { GetCommunityPostResponseDto } from 'src/apis/dto/response/community';
import { ResponseDto } from 'src/apis/dto/response';
import { CommunityComment } from 'src/types/interfaces';
import GetCommunityCommentsResponse from 'src/apis/dto/response/community/get-community-comments.response.dto';
import PostCommunityCommentRequestDto from 'src/apis/dto/request/community/post-community-comment.request.dto';
import patchCommunityViewCountResponse from 'src/hooks/viewcount.hook';
import GetCommunityLikedResponseDto from 'src/apis/dto/response/community/get-community-liked.response.dto';
import { useSignInUserStore } from 'src/stores';
import PostAlertRequestDto from 'src/apis/dto/request/alert/post-alert.request.dto';
import DefaultProfile from 'src/assets/images/default-profile.png';
import useCommentCountStore from 'src/stores/comment-count.store';
import PatchCommunityCommentRequestDto from 'src/apis/dto/request/community/patch-community-comment.request.dto';
import ReportCategory from 'src/types/aliases/report-category.alias';
import PostReportRequestDto from 'src/apis/dto/request/report/post-report.request.dto';
import Modal from 'src/components/Modal';
import GetCommunityCommentResponse from 'src/apis/dto/response/community/get-community-comment.response.dto';

// interface: 신고 모달 컴포넌트 속성 //
interface TypeProps {
    onClose(): void;
    entityType: string;
    entitySequence: number | string | undefined;
    children?: ReactNode;
}

// component: 신고 모달 화면 컴포넌트 //
function Report({ onClose, entityType, entitySequence }: TypeProps) {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 경로 변수 상태 //
    const { postSequence } = useParams();

    // state: 신고 테이블 상태 //
    const [reportedId, setReportedId] = useState<string>('');
    const [reportedNickname, setReportedNickname] = useState<string>('');
    const [category, setCategory] = useState<ReportCategory>('');
    const [detail, setDetail] = useState<string>('');
    const [content, setContent] = useState<string>('');

    // state: 기타 사유 선택 상태 //
    const [isEtc, setEtc] = useState<boolean>(false);

    // variable: access Token //
    const accessToken = cookies[ACCESS_TOKEN];

    // function: 내비게이터 함수 //
    const navigator = useNavigate();

    // function: post report response 처리 함수 //
    const postReportResponse = (responseBody: ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.' 
        : responseBody.code === 'ARU' ? '탈퇴한 사용자입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
        alert(message);
        onClose();
        return;
        }

        onClose();
    };

    // function: get community post resopnse 처리 함수 //
    const getCommunityPostResponse = (responseBody: GetCommunityPostResponseDto | ResponseDto | null) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.'
        : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccess) {
            alert(message);
            navigator(COMMUNITY_OVERALL_ABSOLUTE_PATH);
            return;
        }

        const { userId, nickname, title } = responseBody as GetCommunityPostResponseDto;
        setReportedId(userId);
        setReportedNickname(nickname);
        setContent(title);
    }

    // function: get community comment response 처리 함수 //
    const getCommunityCommentResponse = (responseBody: GetCommunityCommentResponse | ResponseDto | null) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.'
        : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.'
        : responseBody.code === 'NEC' ? '존재하지 않는 댓글입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccess) {
            alert(message);
            navigator(COMMUNITY_OVERALL_ABSOLUTE_PATH);
            return;
        }

        const { userId, nickname, content } = responseBody as GetCommunityCommentResponse;
        setReportedId(userId);
        setReportedNickname(nickname);
        setContent(content);

    };

    // event handler: 카테고리 선택 이벤트 처리 //
    const onCategoryClickHandler = (reportCategory: ReportCategory) => {
        if (reportCategory === '기타') setEtc(true);
        else {
            setEtc(false);
        }
        setCategory(reportCategory);
    };

    // event handler: 신고 상세 내역 변경 이벤트 처리 //
    const onReportDetailChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event?.target;
        setDetail(value);
    };

    // event handler: 신고 버튼 클릭 시 이벤트 처리 //
    const onReportClickHandler = () => {
        if (!category) return;
        const requestBody: PostReportRequestDto = {
            reportedId, reportedEntityNum: entitySequence, reportedEntityType: entityType, 
            reportedContent: content, reportCategory: category, reportDetail: detail
        };

        postReportRequest(requestBody, accessToken).then(postReportResponse);
    };

    // effect: 컴포넌트 로드 시 실행할 함수 //
    useEffect(() => {
        if (!entitySequence) return;
        if (entityType === 'community_post') getCommunityPostRequest(entitySequence).then(getCommunityPostResponse);
        else if (entityType === 'comment' && postSequence) getCommunityCommentRequest(postSequence, entitySequence).then(getCommunityCommentResponse);

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    } , []);

    // render: 신고 모달 화면 컴포넌트 렌더링 //
    return (
        <div className='report-container'>
            <div className='report-body'>
                <div className='info-type'>
                    <span>신고 대상</span>
                    <span>신고 내용</span>
                </div>
                <div className='info-container'>
                    <span>{reportedNickname}({reportedId})</span>
                    <span>{content}</span>
                </div>
            </div>
            <div className='report-category-box'>
                <label>
                    <input type='radio' name='report-category' className='radio-btn' onClick={() => onCategoryClickHandler('도배')}/> 
                    <span>도배</span>
                </label>
                <label>
                    <input type='radio' name='report-category' className='radio-btn' onClick={() => onCategoryClickHandler('음란물')}/> 
                    <span>음란물</span>
                </label>
                <label>
                    <input type='radio' name='report-category' className='radio-btn' onClick={() => onCategoryClickHandler('혐오스러운 컨텐츠')}/> 
                    <span>혐오스러운 컨텐츠</span>
                </label>
                <label>
                    <input type='radio' name='report-category' className='radio-btn' onClick={() => onCategoryClickHandler('욕설')}/> 
                    <span>욕설</span>
                </label>
                <label>
                    <input type='radio' name='report-category' className='radio-btn' onClick={() => onCategoryClickHandler('광고')}/> 
                    <span>광고</span>
                </label>
                <label>
                    <input type='radio' name='report-category' className='radio-btn' onClick={() => onCategoryClickHandler('기타')}/> 
                    <span>기타</span>
                </label>
            </div>
            {isEtc &&
                <textarea className='report-detail' placeholder='상세 신고 내용을 입력해주세요.' value={detail} onChange={onReportDetailChangeHandler}></textarea>
            }
            <div className='report-btn' onClick={onReportClickHandler}>신고</div>
        </div>
    )
}

// interface: 댓글 레코드 컴포넌트 속성 //
interface CommentItemProps {
    communityComment: CommunityComment;
    getCommunityComment: () => void;
}

// component: 댓글 테이블 레코드 컴포넌트 //
function CommentItem({ communityComment, getCommunityComment }: CommentItemProps) {
    const { commentSequence, postSequence, profileImage, commentWriterId, nickname, commentPostDate, comment } = communityComment;

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 로그인 사용자 아이디 상태 //
    const { userId } = useSignInUserStore();

    // state: 댓글 수정 중 상태 //
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // state: 수정 내용 상태 //
    const [content, setContent] = useState<string>(comment);

    // state: 신고 모달 오픈 상태 //
    const [isReportOpen, setReportOpen] = useState<boolean>(false);

    // variable: access Token //
    const accessToken = cookies[ACCESS_TOKEN];

    // variable: 프로필 이미지 스타일 //
    const profileImageStyle = { backgroundImage: `url(${profileImage ? profileImage : DefaultProfile})` };

    // function: delete community comment response 처리 함수 //
    const deleteCommunityCommentResponse = (responseBody: ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DEB' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.'
        : responseBody.code === 'NP' ? '권한이 없습니다.'
        : responseBody.code === 'NEC' ? '존재하지 않는 댓글입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }
    };

    // function: patch community comment response 처리 함수 //
    const patchCommunityCommentResponse = (responseBody: ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DEB' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.'
        : responseBody.code === 'NP' ? '권한이 없습니다.'
        : responseBody.code === 'NPS' ? '존재하지 않는 게시글입니다.'
        : responseBody.code === 'NEC' ? '존재하지 않는 댓글입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }
    };

    // event handler: 댓글 수정 버튼 클릭 이벤트 처리 //
    const onEditCommentButtonClickHandler = () => {
        setIsEditing(true);
    };

    // event handler: 댓글 수정 완료(작성) 버튼 클릭 이벤트 처리 //
    const onEditCommentCompleteButtonClickHandler = () => {
        const requestBody: PatchCommunityCommentRequestDto = {
            content
        };

        patchCommunityCommentRequest(requestBody, postSequence, commentSequence, accessToken).then(patchCommunityCommentResponse);
        setIsEditing(false);
    };

    // event handler: 댓글 삭제 버튼 클릭 이벤트 처리 //
    const onDeleteCommentButtonClickHandler = () => {
        if (!postSequence || !commentSequence || !accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteCommunityCommentRequest(postSequence, commentSequence, accessToken).then(deleteCommunityCommentResponse);
        getCommunityComment();
    };

    // event handler: 댓글 내용 수정 이벤트 처리 //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setContent(value);
    };

    // event handler: 신고 버튼 클릭 이벤트 처리 //
    const onOpenReportClickHandler = () => {
        setReportOpen(true);
    };

    // event handler: 신고 모달 화면 닫기 클릭 이벤트 처리 //
    const onCloseReportClickHandler = () => {
        setReportOpen(false);
    };

    // render: 댓글 테이블 레코드 컴포넌트 렌더링 //
    return (
        <div className='comment-box'>
            {!isEditing &&
                <>
                    <div className='profile-img' style={profileImageStyle}></div>
                    <div className='content-container'>
                        <div className='nickname'>{nickname}</div>
                        <div className='content'>{content}</div>
                        <div className='post-date'>{commentPostDate}</div>
                    </div>
                    <div className='interaction-container'>
                        <div className='report' onClick={onOpenReportClickHandler}></div>
                        {isReportOpen &&
                            <Modal
                                title='신고'
                                onClose={onCloseReportClickHandler}
                            >
                                <Report
                                    onClose={onCloseReportClickHandler}
                                    entityType='comment'
                                    entitySequence={commentSequence}
                                >
                                </Report>
                            </Modal>
                        }
                        { commentWriterId === userId &&
                            <>
                                <div className='btn edit' onClick={onEditCommentButtonClickHandler}>수정</div>
                                <div className='btn delete' onClick={onDeleteCommentButtonClickHandler}>삭제</div>
                            </>
                        }
                    </div>
                </>
            }
            {isEditing &&
                <div className='editting-container'>
                    <textarea className='edit-input' value={content} maxLength={200} onChange={onCommentChangeHandler}>{comment}</textarea>
                    <div className='btn editting' onClick={onEditCommentCompleteButtonClickHandler}>수정</div>
                </div>
            }
        </div>
    )

}

// component: 커뮤니티 게시글 상세 화면 컴포넌트 //
export default function PostDetail() {

    // state: 경로 변수 상태 //
    const { postSequence } = useParams();

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 게시글 내용 상태 //
    const [writerId, setWriterId] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [postDate, setPostDate] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [liked, setLiked] = useState<number>(0);
    const [viewCount, setViewCount] = useState<number>(0);

    // state: 로그인 사용자 아이디 상태 //
    const { userId } = useSignInUserStore();

    // state: 댓글 상태 //
    const [comment, setComment] = useState<string>('');

    // state: 댓글 리스트 상태 //
    const [comments, setComments] = useState<CommunityComment[]>([]);

    // state: 댓글 갯수 상태 //
    const { setCommentCount } = useCommentCountStore();

    // state: 좋아요를 누른 사용자 리스트 상태 //
    const [likes, setLikes] = useState<string[]>([]);

    // state: 신규 댓글 등록 상태 //
    const [newCommentTriger, setNewCommentTriger] = useState<boolean>(false);

    // state: 알림 구성 요소 상태 //
    const [senderId, setSenderId] = useState<string>('');
    const [receiverId, setReceiverId] = useState<string>('');
    const [alertEntitySequence] = useState<number>(Number(postSequence));
    const [alertType, setAlertType] = useState<string>('');

    // state: 신고 모달 오픈 상태 //
    const [isReportOpen, setReportOpen] = useState<boolean>(false);

    // variable: access token //
    const accessToken = cookies[ACCESS_TOKEN];

    // variable: 좋아요 여부 //
    const isLiked = likes.includes(userId);
    // variable: 좋아요 클래스 //
    const likedClass = isLiked ? 'icon liked' : 'icon not-liked';

    // function: 내비게이터 함수 //
    const navigator = useNavigate();

    // function: get community post response 처리 함수 //
    const getCommunityPostResponse = (responseBody: GetCommunityPostResponseDto | ResponseDto | null) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.'
        : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccess) {
            alert(message);
            navigator(COMMUNITY_OVERALL_ABSOLUTE_PATH);
            return;
        }

        const { userId, nickname, postDate, category, title, content, liked, viewCount } = responseBody as GetCommunityPostResponseDto;
        setWriterId(userId);
        setNickname(nickname);
        setPostDate(postDate);
        setCategory(category);
        setTitle(title);
        setContent(content);
        setLiked(liked);
        setViewCount(viewCount);
    };

    // function: delete community post response 처리 함수 //
    const deleteCommunityPostResponse = (responseBody: ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.'
        : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.'
        : responseBody.code === 'NP' ? '수정 권한이 없습니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

        alert('삭제되었습니다.');
        navigator(COMMUNITY_OVERALL_ABSOLUTE_PATH);
    };

    // function: get community comment response 처리 함수 //
    const getCommunityCommentsResponse = (responseBody: GetCommunityCommentsResponse | ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.' 
        : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

        const { comments } = responseBody as GetCommunityCommentsResponse;
        setComments(comments);
    };

    // function: post community comment response 처리 함수 //
    const postCommunityCommentResponse = (responseBody: ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.'
        : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.'
        : responseBody.code === 'VF' ? '유효하지 않은 입력입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

        setComment('');
        if (!postSequence) return;
        getCommunityCommentsRequest(postSequence).then(getCommunityCommentsResponse);

        setSenderId(userId);
        setReceiverId(writerId);
        setAlertType('community_comment');
        setNewCommentTriger(true);
    };

    // function: put community liked response 처리 함수 //
    const putCommunityLikedResponse = (responseBody: ResponseDto | null) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.' 
        : responseBody.code === 'ALP' ? '이미 좋아요를 눌렀습니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

        if (!postSequence) return;
        getCommunityLikedRequest(postSequence).then(getCommunityLikedResponse);
    };

    // function: get community liked response 처리 함수 //
    const getCommunityLikedResponse = (responseBody: GetCommunityLikedResponseDto | ResponseDto | null) => {
        const message =
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }

        const { likes } = responseBody as GetCommunityLikedResponseDto;
        setLikes(likes);
    };

    // function: post alert response 처리 함수 //
    const postAlertResponse = (responseBody: ResponseDto | null) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
            alert(message);
            return;
        }
    };

    // event handler: 댓글 목록 리렌더링 처리 //
    const getCommunityComments = () => {
        if (!postSequence) return;
        getCommunityCommentsRequest(postSequence).then(getCommunityCommentsResponse);
    }

    // event handler: 삭제 버튼 클릭 이벤트 처리 //
    const onDeleteClickHandler = () => {
        if (!postSequence || !accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        console.log('clicked');
        deleteCommunityPostRequest(postSequence, accessToken).then(deleteCommunityPostResponse);
        console.log(comments.length);
    };

    // event handler: 수정 버튼 클릭 이벤트 처리 //
    const onEditClickHandler = () => {
        if (!postSequence) return;
        navigator(COMMUNITY_EDIT_ABSOLUTE_PATH(postSequence));
    }

    // event handler: 댓글 변경 이벤트 처리 //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setComment(value);
    };

    // event handler: 댓글 작성 클릭 이벤트 처리 //
    const onCommentButtonClickHandler = () => {
        if (!accessToken || !postSequence) return;

        const requestBody: PostCommunityCommentRequestDto = {
            comment
        };

        postCommunityCommentRequest(requestBody, postSequence, accessToken).then(postCommunityCommentResponse);
    }

    // event handler: 좋아요 클릭 이벤트 처리 //
    const onLikedClickHandler = () => {
        if (!accessToken || !postSequence) return;

        putCommunityLikedRequest(postSequence, accessToken).then(putCommunityLikedResponse);
    }

    // event handler: 신고 버튼 클릭 이벤트 처리 //
    const onOpenReportClickHandler = () => {
        setReportOpen(true);
    };

    // event handler: 신고 모달 화면 닫기 클릭 이벤트 처리 //
    const onCloseReportClickHandler = () => {
        setReportOpen(false);
    };

    // effect: 컴포넌트 로드 시 실행할 함수 //
    useEffect(() => {
        if (!postSequence) {
            navigator(COMMUNITY_OVERALL_ABSOLUTE_PATH);
            return;
        }
        patchCommunityViewCountRequest(postSequence).then(patchCommunityViewCountResponse);
        getCommunityLikedRequest(postSequence).then(getCommunityLikedResponse);
        getCommunityPostRequest(postSequence).then(getCommunityPostResponse);
        getCommunityCommentsRequest(postSequence).then(getCommunityCommentsResponse);
    }, []);

    // effect: 신규 댓글 등록 시 실행할 함수 //
    useEffect(() => {
        if (newCommentTriger) {
            const requestBody: PostAlertRequestDto = {
                senderId, receiverId, alertEntitySequence, alertType, reason: null
            };
            if (senderId === receiverId) return;
            postAlertRequest(requestBody, accessToken).then(postAlertResponse);
            setNewCommentTriger(false);
        }
    }, [newCommentTriger]);

    // effect: 댓글 갯수가 변할 시 실행할 함수 //
    useEffect(() => {
        if (!postSequence) return;
        setCommentCount(postSequence, comments.length);
    }, [comments.length]);

    // render: 커뮤니티 글 상세 화면 컴포넌트 렌더링 //
    return (
        <div id='post-detail-wrapper'>
            <div className='board-header-container'>{category}</div>
            <div className='detail-container'>
                <div className='title-container'>
                    <div className='title'>{title}</div>
                    <div className='title-footer'>
                        <div className='post-info'>
                            <div className='posted-user'>{nickname}</div>
                            <div className='posted-date'>{postDate}</div>
                        </div>
                        <div className='interaction-box'>
                            <div className='view-count'>조회수 {viewCount}</div>
                            <div className='report' onClick={onOpenReportClickHandler}></div>
                            {isReportOpen &&
                            <Modal
                                title='신고'
                                onClose={onCloseReportClickHandler}
                            >
                                <Report
                                    onClose={onCloseReportClickHandler}
                                    entityType='community_post'
                                    entitySequence={postSequence}
                                >
                                </Report>
                            </Modal>
                            }
                            { writerId === userId &&
                                <>
                                <div className='bt edit' onClick={onEditClickHandler}>수정</div>
                                <div className='bt delete' onClick={onDeleteClickHandler}>삭제</div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='content-container'>
                    <div className='content' style={{ flex: 1, display: 'block'}}
                    dangerouslySetInnerHTML={{__html: content}}></div>
                </div>
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
                    <textarea className='comment-input' value={comment} maxLength={200} onChange={onCommentChangeHandler}/>
                    <div className='comment-post' onClick={onCommentButtonClickHandler}>작성</div>
                </div>
                { comments.length !== 0 &&
                    <div className='comment-container'>
                        {
                        comments.map((communityComment, index) => 
                        <CommentItem key={index} communityComment={communityComment} getCommunityComment={getCommunityComments} />)
                        }
                    </div>
                }
            </div>
        </div>
    )
}
