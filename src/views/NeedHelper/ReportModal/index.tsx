import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router";
import { getCommunityCommentRequest, getCommunityPostRequest, getHelperCommentRequest, getHelperPostRequest, postReportRequest } from "src/apis";
import PostReportRequestDto from "src/apis/dto/request/report/post-report.request.dto";
import { ResponseDto } from "src/apis/dto/response";
import GetCommunityCommentResponse from "src/apis/dto/response/community/get-community-comment.response.dto";
import GetHelperCommentResponse from "src/apis/dto/response/needhelper/get-helper-comment.response.dto";
import GetHelperPostResponseDto from "src/apis/dto/response/needhelper/get-helper-post.response.dto";
import { ACCESS_TOKEN, NEEDHELPER_ABSOLUTE_PATH } from "src/constants";
import ReportCategory from "src/types/aliases/report-category.alias";
import { Message } from "src/types/interfaces";


// interface: 신고 모달 컴포넌트 속성 //
interface TypeProps {
    onClose(): void;
    entityType: string;
    entitySequence: number | string | undefined;
    postSequence?: number | string | undefined;
    children?: ReactNode;
}

// component: 신고 모달 화면 컴포넌트 //
export default function Report({ onClose, entityType, entitySequence, postSequence }: TypeProps) {

    // state: cookie 상태 //
    const [cookies] = useCookies();

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
    const getHelperPostResponse = (responseBody: GetHelperPostResponseDto | ResponseDto | null) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.'
        : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccess) {
            alert(message);
            navigator(NEEDHELPER_ABSOLUTE_PATH);
            return;
        }

        const { userId, nickname, title } = responseBody as GetHelperPostResponseDto;
        setReportedId(userId);
        setReportedNickname(nickname);
        setContent(title);
    }

    // function: get community comment response 처리 함수 //
    const getHelperCommentResponse = (responseBody: GetHelperCommentResponse | ResponseDto | null) => {
        const message = 
        !responseBody ? '서버에 문제가 있습니다.'
        : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
        : responseBody.code === 'AF' ? '인증에 실패했습니다.'
        : responseBody.code === 'NPS' ? '존재하지 않는 게시물입니다.'
        : responseBody.code === 'NEC' ? '존재하지 않는 댓글입니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';

        if (!isSuccess) {
            alert(message);
            navigator(NEEDHELPER_ABSOLUTE_PATH);
            return;
        }

        const { userId, nickname, content } = responseBody as GetHelperCommentResponse;
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
        if (entityType === 'need_helper_post') getHelperPostRequest(entitySequence, accessToken).then(getHelperPostResponse);
        else if (entityType === 'comment' && postSequence) getHelperCommentRequest(postSequence, entitySequence, accessToken).then(getHelperCommentResponse);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };

    } , [entitySequence, entityType, postSequence]);

    // render: 신고 모달 화면 컴포넌트 렌더링 //
    return (
        <div className='report-container'>
            <div className='report-body'>
                <div className='info-row'>
                    <span className='info-type'>신고 대상</span>
                    <span className='info-content'>{reportedNickname}({reportedId})</span>
                </div>
                <div className='info-row'>
                    <span className='info-type'>신고 내용</span>
                    <span className='info-content'>{content}</span>
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
