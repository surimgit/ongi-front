import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { deleteHelperCommentRequest, getHelperCommentsRequest, postHelperCommentRequest } from "src/apis";
import PostHelperCommentRequestDto from "src/apis/dto/request/needhelper/post-helper-comment.request.dto";
import { ResponseDto } from "src/apis/dto/response";
import Modal from "src/components/Modal";
import { ACCESS_TOKEN } from "src/constants";
import { useSignInUserStore } from "src/stores";
import { CommunityComment } from "src/types/interfaces";
import DefaultProfile from 'src/assets/images/default-profile.png';
import Report from "../ReportModal";


// interface: 댓글 레코드 컴포넌트 속성 //
interface CommentItemProps {
    communityComment: CommunityComment;
    getCommunityComment: () => void;
}

// component: 댓글 테이블 레코드 컴포넌트 //
export default function CommentItem({ communityComment, getCommunityComment }: CommentItemProps) {
    const { commentSequence, postSequence, profileImage, commentWriterId, nickname, commentPostDate, comment } = communityComment;

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 로그인 사용자 아이디 상태 //
    const { userId } = useSignInUserStore();

    // state: 신고 모달 오픈 상태 //
    const [isReportOpen, setReportOpen] = useState<boolean>(false);


    // variable: access Token //
    const accessToken = cookies[ACCESS_TOKEN];

    // variable: 프로필 이미지 스타일 //
    const profileImageStyle = { backgroundImage: `url(${profileImage ? profileImage : DefaultProfile})` };
    
    // function: delete helper comment response 처리 함수 //
    const deleteHelperCommentResponse = (responseBody: ResponseDto | null) => {
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

        deleteHelperCommentRequest(postSequence, commentSequence, accessToken).then(deleteHelperCommentResponse);
        getCommunityComment();
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
            <div className='profile-img' style={profileImageStyle}></div>
            <div className='content-container'>
                <div className='nickname'>{nickname}</div>
                <div className='content'>{comment}</div>
                <div className='post-date'>{commentPostDate}</div>
            </div>
            <div className='interaction-container'>
                <div className='report' onClick={onOpenReportClickHandler}>신고</div>
                {isReportOpen &&
                    <Modal title='신고' onClose={onCloseReportClickHandler}>
                        <Report onClose={onCloseReportClickHandler} entityType='comment' entitySequence={commentSequence} postSequence={postSequence} />
                    </Modal>
                }
                { commentWriterId === userId &&
                    <div className='btn delete' onClick={onDeleteCommentButtonClickHandler}>삭제</div>
                }
            </div>
        </div>
    );

}
