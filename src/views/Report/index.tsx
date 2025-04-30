import React, { ReactNode, useEffect, useState } from 'react';
import './style.css';
import ReportEntity from 'src/types/interfaces/report.interface';
import { usePagination } from 'src/hooks';
import Pagination from 'src/components/Pagination';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, COMMUNITY_VIEW_ABSOLUTE_PATH, ROOT_PATH } from 'src/constants';
import { getAlertedCountRequest, getIsAdminRequest, getProcessedReportsRequest, getReportRequest, getReportsRequest, getUserNicknameRequest, patchReportProcessRequest, patchResignRequest, postAlertRequest } from 'src/apis';
import { ResponseDto } from 'src/apis/dto/response';
import GetUserNicknameResponseDto from 'src/apis/dto/response/user/get-user-nickname.response.dto';
import GetReportsResponseDto from 'src/apis/dto/response/report/get-reports.response.dto';
import Modal from 'src/components/Modal';
import ReportCategory from 'src/types/aliases/report-category.alias';
import GetReportResponseDto from 'src/apis/dto/response/report/get-report.response.dto';
import PatchReportProcessRequestDto from 'src/apis/dto/request/report/patch-report-process.request.dto';
import GetAlertedCountResponseDto from 'src/apis/dto/response/report/get-alerted-count.response.dto';
import PatchResignRequestDto from 'src/apis/dto/request/user/patch-resign.request.dto';
import PostAlertRequestDto from 'src/apis/dto/request/alert/post-alert.request.dto';
import { useSignInUserStore } from 'src/stores';
import { useNavigate } from 'react-router';
import GetIsAdminResponseDto from 'src/apis/dto/response/admin/get-is-admin.response.dto';

// interface: 신고 내용 모달 컴포넌트 속성 //
interface ReportContentProps {
  onClose(): void;
  reportSequence: number;
  onProcessed: () => void;
  children?: ReactNode;
}

// component: 신고 내용 모달 컴포넌트 //
function Report({ onClose, reportSequence, onProcessed }: ReportContentProps) {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 신고 내용 상태 //
  const [reportedId, setReportedId] = useState<string>('');
  const [reportedNickname, setReportedNickname] = useState<string>('');
  const [reporterId, setReporterId] = useState<string>('');
  const [reporterNickname, setReporterNickname] = useState<string>('');
  const [reportDate, setReportDate] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<ReportCategory>('');
  const [detail, setDetail] = useState<string>('');
  const [entityType, setEntityType] = useState<string>('');
  const [entitySequence, setEntitySequence] = useState<number | string>('');
  const [process, setProcess] = useState<string>('');

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 처리 버튼 활성화 클래스 //
  const processBtnClass = process === null ? 'process-btn' : 'process-btn active';

  // function: get report response 처리 함수 //
  const getReportResponse = (responseBody: GetReportResponseDto | ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'NER' ? '존재하지 않는 신고 내역입니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { reporterId, reportedId, date, reportedContent, category, detail, process, entityNum, entityType } = responseBody as GetReportResponseDto;
    setReporterId(reporterId);
    setReportedId(reportedId);
    setReportDate(date);
    setContent(reportedContent);
    setCategory(category);
    setDetail(detail);
    setProcess(process);
    setEntitySequence(entityNum);
    setEntityType(entityType);
    getUserNicknameRequest(reportedId, accessToken).then(getReportedNicknameResponse);
    getUserNicknameRequest(reporterId, accessToken).then(getReporterNicknameResponse);

  };

  // function: get reported nickname response 처리 함수 //
  const getReportedNicknameResponse = (responseBody: GetUserNicknameResponseDto | ResponseDto | null) => {
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

  // function: get reporter nickname response 처리 함수 //
  const getReporterNicknameResponse = (responseBody: GetUserNicknameResponseDto | ResponseDto | null) => {
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
    setReporterNickname(nickname);
  };

  // function: patch report process response 처리 함수 //
  const patchReportProcessResponse = (responseBody: ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'NER' ? '존재하지 않는 신고 내역입니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    onProcessed();
  };

  // function: get alerted count response 처리 함수 //
  function getAlertedCountResponse(responseBody: GetAlertedCountResponseDto | ResponseDto | null): boolean {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return false;
    }

    return true;
  };

  // function: patch resign response 처리 함수 //
  const patchResignResponse = (responseBody: ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.'
    : responseBody.code === 'NU' ? '존재하지 않는 사용자입니다.'
    : responseBody.code === 'ARU' ? '이미 탈퇴한 사용자입니다.'
    : responseBody.code === 'NP' ? '권한이 없습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }
  };

  // function: post alert response 처리 함수 //
  const postAlertResponse = (responseBody: ResponseDto | null) => {
      const message = 
      !responseBody ? '서버에 문제가 있습니다.'
      : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
      : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

      const isSuccess = responseBody !== null && (responseBody.code === 'SU' || responseBody.code === 'ARU');
      if (!isSuccess) {
          alert(message);
          return;
      }
  };

  // event handler: 내용 클릭 시 원본 글 이동 이벤트 처리 //
  const onContentNavigate = () => {
    if (!entitySequence) return;
    if (entityType === 'community_post' || entityType === 'comment') window.open(COMMUNITY_VIEW_ABSOLUTE_PATH(entitySequence));
  };

  // event handler: 처리 내역 선택 이벤트 처리 //
  const onProcessSelectHandler = (process: string) => {
    setProcess(process);
  };

  // event handler: 처리하기 버튼 클릭 이벤트 처리 //
  const onProcessClickHandler = async () => {
    const reportRequestBody: PatchReportProcessRequestDto = { process };
    patchReportProcessRequest(reportRequestBody, reportSequence, accessToken).then(patchReportProcessResponse);
    
    const alertRequestBody: PostAlertRequestDto = { alertType: 'report_alerted', senderId: reporterId, receiverId: reportedId, alertEntitySequence: entitySequence, reason: category };
    postAlertRequest(alertRequestBody, accessToken).then(postAlertResponse);
    
    if (process === '경고') {
      const responseBody = await getAlertedCountRequest(reportedId, accessToken);
      const isGetAlertedCountRequestValid = getAlertedCountResponse(responseBody);
      if (!isGetAlertedCountRequestValid) return;
      
      const { alertedCount } = responseBody as GetAlertedCountResponseDto;
      if (alertedCount >= 5) {
        const resignRequestBody: PatchResignRequestDto = { userId: reportedId, isAdmin: true, reason: '경고 5회 이상 누적' };
        patchResignRequest(resignRequestBody, accessToken).then(patchResignResponse);
      }
    }
    else if (process === '강제 탈퇴') {
      const resignRequestBody: PatchResignRequestDto = { userId: reportedId, isAdmin: true, reason: `${process}: 즉시 강제 탈퇴`};
      patchResignRequest(resignRequestBody, accessToken).then(patchResignResponse);
    }
    
    onClose();
  };

  // effect: 컴포넌트 로드 시 실행할 함수 //
  useEffect(() => {
    if (!reportSequence) return;
    getReportRequest(reportSequence, accessToken).then(getReportResponse);

  }, []);

  // render: 신고 내용 모달 컴포넌트 렌더링 //
  return (
    <div className='report-container'>
      <div className='report-body'>
        <div className='info-type'>
          <span>신고 대상</span>
          <span>신고자</span>
          <span>일자</span>
          <span>내용</span>
          <span>사유</span>
          {detail &&
            <span>상세 사유</span>
          }
        </div>
        <div className='info-container'>
          <span>{reportedNickname}({reportedId})</span>
          <span>{reporterNickname}({reporterId})</span>
          <span>{reportDate}</span>
          <span className='content' onClick={onContentNavigate}>{content}</span>
          <span>{category}</span>
          {detail &&
            <span>{detail}</span>
          }
        </div>
      </div>
      <div className='process-box'>
        <label>
            <input type='radio' name='process' className='process-radio' onClick={() => onProcessSelectHandler('조치 없음')}/>
            <span>조치 없음</span>
        </label>
        <label>
            <input type='radio' name='process' className='process-radio' onClick={() => onProcessSelectHandler('경고')}/>
            <span>경고</span>
        </label>
        <label>
            <input type='radio' name='process' className='process-radio' onClick={() => onProcessSelectHandler('강제 탈퇴')}/>
            <span>강제 탈퇴</span>
        </label>
      </div>
      <div className={processBtnClass} onClick={onProcessClickHandler}>처리하기</div>
    </div>
  )
}

// interface: 신고 내역/처리 레코드 컴포넌트 속성 //
interface ReportProps {
  reportEntity: ReportEntity;
  onProcessed: () => void;
}

// component: 신고 내역/처리 테이블 레코드 컴포넌트 //
function ReportItem({ reportEntity, onProcessed }: ReportProps) {
  const { reportSequence, reportContent, reportCategory, reportedId, reportProcess } = reportEntity;

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 신고 대상 닉네임 상태 //
  const [nickname, setNickname] = useState<string>('');

  // state: 신고 내역 모달 디스플레이 상태 //
  const [isReportClicked, setReportClicked] = useState<boolean>(false);

  // variable: 신고 모달 열기 기능 활성화 클래스 //
  const reportModalOpenClass = reportProcess === '미처리' ? 'rpt-tc content' : 'rpt-tc content inactive';

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 처리 현황 클래스 //
  const processClass = reportProcess === '조치 없음' ? 'rpt-tc process no-action'
                      :reportProcess === '경고' ? 'rpt-tc process alerted'
                      :reportProcess === '강제 탈퇴' ? 'rpt-tc process forced-resign' : 'rpt-tc process';

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
    setNickname(nickname);
  };

  // event handler: 신고 내역 클릭 시 이벤트 처리 //
  const onReportClickHandler = () => {
    if (!reportProcess) return;
    setReportClicked(true);
  };

  // event handler: 신고 내역 닫기 클릭 시 이벤트 처리 //
  const onReportCloseClickHandler = () => {
    setReportClicked(false);
  };

  // effect: 컴포넌트 로드 시 실행할 함수 //
  useEffect(() => {
    getUserNicknameRequest(reportedId, accessToken).then(getUserNicknameResponse);
  }, [reportedId]);

  // render: 신고 내역/처리 테이블 레코드 컴포넌트 //
  return (
    <div className='rpt-tr item'>
      <div className='rpt-tc category'>{reportCategory}</div>
      <div className={reportModalOpenClass} onClick={onReportClickHandler}>{reportContent}</div>
      {isReportClicked &&
      <Modal
        title='신고 내용'
        onClose={onReportCloseClickHandler}
      >
        <Report
          onClose={onReportCloseClickHandler}
          reportSequence={reportSequence}
          onProcessed={onProcessed}
        >
        </Report>
      </Modal>
      }
      <div className='rpt-tc reported'>{nickname}({reportedId})</div>
      <div className={processClass}>{reportProcess}</div>
    </div>
  )
}

// component: 신고 내역/처리 컴포넌트 //
export default function ReportBoard() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList
  } = usePagination<ReportEntity>();

  // state: 신고 처리 내역 표시 여부 상태 //
  const [isProcessedPage, setProcessedPage] = useState<boolean>(false);

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // variable: 신고 내역 클래스 //
  const reportListClass = isProcessedPage ? 'list-title nonactive' : 'list-title';

  // variable: 신고 처리 내역 클래스 //
  const processListClass = !isProcessedPage ? 'list-title nonactive' : 'list-title'; 

  // function: 내비게이터 함수 //
  const navigator = useNavigate();

  // function: get reports response 처리 함수 //
  const getReportsResponse = (responseBody: GetReportsResponseDto | ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { reports } = responseBody as GetReportsResponseDto;
    setTotalList(reports);
  };

  // function: 신고 내역/처리 내역 렌더링 fetch 함수 //
  const fecthReports = () => {
    if (!accessToken) return;
    const fetcher = isProcessedPage ? getProcessedReportsRequest : getReportsRequest;
    fetcher(accessToken).then(getReportsResponse);
  };

  // function: get is admin response 처리 함수 //
  const getIsAdminResponse = (responseBody: GetIsAdminResponseDto | ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.'
    : responseBody.code === 'ARU' ? '탈퇴한 사용자입니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { isAdmin } = responseBody as GetIsAdminResponseDto;

    if (!isAdmin) {
      alert('권한이 없습니다.');
      navigator(ROOT_PATH);
    }

  };

  // event handler: 신고 내역 클릭 시 이벤트 처리 //
  const onReportListClickHandler = () => {
    setProcessedPage(false);
  };

  // event handler: 신고 처리 내역 클릭 시 이벤트 처리 //
  const onProcessedListClickHandler = () => {
    setProcessedPage(true);
  };

  // effect: 컴포넌트 로드 시 실행할 함수 //
  useEffect(() => {
    getIsAdminRequest(accessToken).then(getIsAdminResponse);
    fecthReports();
  }, [isProcessedPage]);

  // render: 신고 내역/처리 컴포넌트 렌더링 //
  return (
    <div id='report-page-wrapper'>
      <div className='header-container'>
        <div className='title'>신고 내역/처리</div>
      </div>
      <div className='body-container'>
        <div className='title-header'>
          <div className={reportListClass} onClick={onReportListClickHandler}>신고 내역</div>
          <div className='divider'></div>
          <div className={processListClass} onClick={onProcessedListClickHandler}>신고 처리 내역</div>
        </div>
        <div className='list-container'>
          <div className='rpt-tr'>
            <div className='rpt-ti category'>사유</div>
            <div className='rpt-ti content'>내용</div>
            <div className='rpt-ti reported'>신고 대상</div>
            <div className='rpt-ti process'>처리 현황</div>
          </div>
        {viewList.map((reportEntity, index) =>
        <ReportItem 
          key={index}
          reportEntity={reportEntity}
          onProcessed={fecthReports}
        />)}
        </div>
        <div className='pagination-container'>
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
