import React, { useEffect, useState } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, COMMUNITY_ABSOLUTE_PATH, COMMUNITY_EDIT_ABSOLUTE_PATH } from 'src/constants';
import { deleteCommunityPostRequest, getCommunityPostRequest } from 'src/apis';
import { GetCommunityPostResponseDto } from 'src/apis/dto/response/community';
import { ResponseDto } from 'src/apis/dto/response';

// component: 커뮤니티 정보글 상세 화면 컴포넌트 //
export default function InfoPostDetail() {

    // state: 경로 변수 상태 //
    const { postSequence } = useParams();

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 게시글 내용 상태 //
    const [nickname, setNickname] = useState<string>('');
    const [postDate, setPostDate] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    // variable: access token //
    const accessToken = cookies[ACCESS_TOKEN];

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
            navigator(COMMUNITY_ABSOLUTE_PATH);
            return;
        }

        const { nickname, postDate, category, title, content} = responseBody as GetCommunityPostResponseDto;
        setNickname(nickname);
        setPostDate(postDate);
        setCategory(category);
        setTitle(title);
        setContent(content);
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
        navigator(COMMUNITY_ABSOLUTE_PATH);
    };

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

    // effect: 컴포넌트 로드 시 실행할 함수 //
    useEffect(() => {
        if (!postSequence) {
            navigator(COMMUNITY_ABSOLUTE_PATH);
            return;
        }

        getCommunityPostRequest(postSequence).then(getCommunityPostResponse);
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
                    <div className='comment-count'>댓글(0)개</div>
                    <div className='liked-box'>1234 좋아요</div>
                </div>
                <div className='comment-box'>
                    <input className='comment-input'/>
                    <div className='comment-post'>작성</div>
                </div>
                <div className='comment-container'>
                    <div className='comment-item'>댓글댓글댓글글</div>
                    <div className='comment-item'>댓글댓글댓글글</div>
                    <div className='comment-item'>댓글댓글댓글글</div>
                    <div className='comment-item'>댓글댓글댓글글</div>
                    <div className='comment-item'>댓글댓글댓글글</div>
                </div>
            </div>
        </div>
    )
}
