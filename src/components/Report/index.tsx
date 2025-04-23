import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import './style.css';
import { useSignInUserStore } from 'src/stores';
import ReportCategory from 'src/types/aliases/report-category.alias';
import PostReportRequestDto from 'src/apis/dto/request/report/post-report.request.dto';
import { getUserNicknameRequest, postReportRequest } from 'src/apis';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, COMMUNITY_VIEW_ABSOLUTE_PATH } from 'src/constants';
import { ResponseDto } from 'src/apis/dto/response';
import ReportEntity from 'src/types/interfaces/report.interface';
import { useNavigate } from 'react-router';
import GetUserNicknameResponseDto from 'src/apis/dto/response/user/get-user-nickname.response.dto';

// interface: 신고 모달 컴포넌트 속성 //
interface ReportProps {
    onClose: () => void;
    reportEntity: ReportEntity;
    isReportPage: boolean;
    children?: ReactNode;
}

// component: 신고 모달 화면 컴포넌트 //
export default function Report({ onClose, reportEntity, isReportPage, children}: ReportProps) {

    // state: cookie 상태 //
    const [cookies] = useCookies();

    // state: 로그인 사용자 정보 //
    const { nickname } = useSignInUserStore();

    // state: 신고 내역 상태 //
    const { reporterId, reportedId, reportCategory, reportDate, 
            reportContent, reportDetail, reportProcess, reportedEntityNum, reportedEntityType } = reportEntity;

    // state: 신고자 닉네임 상태 //
    const [reporterNickname, setReporterNickname] = useState<string>(nickname);

    // state: 신고 대상 닉네임 상태 //
    const [reportedNickname, setReportedNickname] = useState<string>('');

    // state: 신고 사유 선택 상태 //
    const [category, setCategory] = useState<ReportCategory>('');

    // state: 신고 상세 내용 상태 //
    const [detail, setDetail] = useState<string>('');

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
        : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

        const isSuccess = responseBody !== null && responseBody.code === 'SU';
        if (!isSuccess) {
        alert(message);
        return;
        }

        onClose();
    };

    // function: get user nickname response 처리 함수 //
    const getUserNicknameResponse = (responseBody: GetUserNicknameResponseDto | ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'NU' ? '존재하지 않는 사용자입니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
        alert(message);
        return;
    }

    const { nickname } = responseBody as GetUserNicknameResponseDto;
    setReportedNickname(nickname);
    };

    // event handler: 기타 카테고리 선택 이벤트 처리 //
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
        const requestBody: PostReportRequestDto = {
            reportedId, reportedEntityNum, reportedEntityType, 
            reportedContent: reportContent, reportCategory: category, reportDetail: detail
        };

        postReportRequest(requestBody, accessToken).then(postReportResponse);
    };

    // event handler: 신고 내용 클릭 시 이벤트 처리 //
    const onContentClickHandler = () => {
        if (reportedEntityType === 'community_post' && reportedEntityNum) navigator(COMMUNITY_VIEW_ABSOLUTE_PATH(reportedEntityNum)); 
    };

    // effect: 컴포넌트 로드 시 실행할 함수 //
    useEffect(() => {
        if (isReportPage) {
            getUserNicknameRequest(reportedId, accessToken).then(getUserNicknameResponse);
        }

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    } , []);

    // render: 신고 모달 화면 컴포넌트 렌더링 //
    return (
        <div id='report-wrapper'>
            {isReportPage &&
                <div className='report-container'>
                    <div className='report-header'>
                        <div className='title'>신고 내역</div>
                        <div className='close-button' onClick={onClose}>X</div>
                    </div>
                    <div className='report-body'>
                        <div className='info-type'>
                            <span>피신고자</span>
                            <span>신고자</span>
                            <span>사유</span>
                            <span>신고 내용</span>
                        </div>
                        <div className='info-container'>
                            <span>{reportedNickname}({reportedId})</span>
                            <span>{reporterNickname}({reporterId})</span>
                            <span>{reportCategory}</span>
                            <span className='content' onClick={onContentClickHandler}>{reportContent}</span>
                        </div>
                    </div>
                </div>
            }
            {!isReportPage &&
                <div className='report-container'>
                    <div className='report-header'>
                        <div className='title'>신고</div>
                        <div className='close-button' onClick={onClose}>X</div>
                    </div>
                    <div className='report-body'>
                        <div className='info-type'>
                            <span>신고 대상</span>
                            <span>신고 내용</span>
                        </div>
                        <div className='info-container'>
                            <span>{reportedNickname}({reportedId})</span>
                            <span>{reportContent}</span>
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
                        <textarea className='report-detail' placeholder='상세 신고 내용을 입력해주세요.' value={reportDetail} onChange={onReportDetailChangeHandler}></textarea>
                    }
                    <div className='report-btn' onClick={onReportClickHandler}>신고</div>
                </div>
            }
            
        </div>
    )
}
