import React, { ChangeEvent, useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, COMMUNITY_EDIT_ABSOLUTE_PATH, COMMUNITY_OVERALL_ABSOLUTE_PATH } from 'src/constants';
import { deleteCommunityCommentRequest, deleteCommunityPostRequest, getCommunityCommentRequest, getCommunityLikedRequest, getCommunityPostRequest, patchCommunityViewCountRequest, postCommunityCommentRequest, putCommunityLikedRequest } from 'src/apis';
import { GetCommunityPostResponseDto } from 'src/apis/dto/response/community';
import { ResponseDto } from 'src/apis/dto/response';
import { CommunityComment } from 'src/types/interfaces';
import GetCommunityCommentResponse from 'src/apis/dto/response/community/get-community-comment.response.dto';
import PostCommunityCommentRequestDto from 'src/apis/dto/request/community/post-community-comment.request.dto';
import patchCommunityViewCountResponse from 'src/hooks/viewcount.hook';
import GetCommunityLikedResponseDto from 'src/apis/dto/response/community/get-community-liked.response.dto';
import { useSignInUserStore } from 'src/stores';

// interface: 댓글 레코드 컴포넌트 속성 //
interface CommentItemProps {
    communityComment: CommunityComment;
    getCommunityComment: () => void;
}

// component: 댓글 테이블 레코드 컴포넌트 //
function CommentItem({ communityComment, getCommunityComment }: CommentItemProps) {
    const { commentSequence, postSequence, profileImage, nickname, commentPostDate, comment } = communityComment;

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // variable: access Token //
    const accessToken = cookies[ACCESS_TOKEN];

    // variable: 프로필 이미지 스타일 //
    const profileImageStyle = { backgroundImage: `url(${profileImage ? profileImage : null})` };

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

    // event handler: 댓글 삭제 버튼 클릭 이벤트 처리 //
    const onDeleteCommentButtonClickHandler = () => {
        if (!postSequence || !commentSequence || !accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteCommunityCommentRequest(postSequence, commentSequence, accessToken).then(deleteCommunityCommentResponse);
        alert('삭제되었습니다.');
        getCommunityComment();
    };

    // render: 댓글 테이블 레코드 컴포넌트 렌더링 //
    return (
        <div className='comment-box'>
            <div className='profile-img' style={profileImageStyle}></div>
            <div className='content-container'>
                <div className='nickname'>{nickname}</div>
                <div className='content'>{comment}</div>
                <div className='post-date'>{commentPostDate}</div>
            </div>
            <div className='interaction-container'>
                <div className='report'></div>
                <div className='btn edit'>수정</div>
                <div className='btn delete' onClick={onDeleteCommentButtonClickHandler}>삭제</div>
            </div>
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
    console.log(useSignInUserStore());

    // state: 댓글 상태 //
    const [comment, setComment] = useState<string>('');

    // state: 댓글 리스트 상태 //
    const [comments, setComments] = useState<CommunityComment[]>([]);

    // state: 좋아요를 누른 사용자 리스트 상태 //
    const [likes, setLikes] = useState<string[]>([]);

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
    const getCommunityCommentResponse = (responseBody: GetCommunityCommentResponse | ResponseDto | null) => {
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

        const { comments } = responseBody as GetCommunityCommentResponse;
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
        getCommunityCommentRequest(postSequence).then(getCommunityCommentResponse);
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

    // event handler: 댓글 목록 리렌더링 처리 //
    const getCommunityComment = () => {
        if (!postSequence) return;
        getCommunityCommentRequest(postSequence).then(getCommunityCommentResponse);
    }

    // event handler: 삭제 버튼 클릭 이벤트 처리 //
    const onDeleteClickHandler = () => {
        if (!postSequence || !accessToken) return;
        const isConfirm = window.confirm('정말로 삭제하시겠습니까?');
        if (!isConfirm) return;

        deleteCommunityPostRequest(postSequence, accessToken).then(deleteCommunityPostResponse);
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
        getCommunityCommentRequest(postSequence).then(getCommunityCommentResponse);
    }

    // effect: 컴포넌트 로드 시 실행할 함수 //
    useEffect(() => {
        if (!postSequence) {
            navigator(COMMUNITY_OVERALL_ABSOLUTE_PATH);
            return;
        }

        patchCommunityViewCountRequest(postSequence).then(patchCommunityViewCountResponse);
        getCommunityLikedRequest(postSequence).then(getCommunityLikedResponse);
        getCommunityPostRequest(postSequence).then(getCommunityPostResponse);
        getCommunityCommentRequest(postSequence).then(getCommunityCommentResponse);
    }, []);

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
                            <div className='report'></div>
                            <div className='bt edit' onClick={onEditClickHandler}>수정</div>
                            <div className='bt delete' onClick={onDeleteClickHandler}>삭제</div>
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
                        <CommentItem key={index} communityComment={communityComment} getCommunityComment={getCommunityComment} />)
                        }
                    </div>
                }
            </div>
        </div>
    )
}
