import React, { useEffect, useState } from 'react';
import './style.css';
import ReportEntity from 'src/types/interfaces/report.interface';
import { usePagination } from 'src/hooks';
import Pagination from 'src/components/Pagination';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN } from 'src/constants';
import { getReportRequest, getUserNicknameRequest } from 'src/apis';
import GetReportResponseDto from 'src/apis/dto/response/report/get-report.response.dto';
import { ResponseDto } from 'src/apis/dto/response';
import GetUserNicknameResponseDto from 'src/apis/dto/response/user/get-user-nickname.response.dto';
import Report from 'src/components/Report';

// interface: 신고 내역/처리 레코드 컴포넌트 속성 //
interface ReportProps {
  reportEntity: ReportEntity;
}

// component: 신고 내역/처리 테이블 레코드 컴포넌트 //
function ReportItem({ reportEntity }: ReportProps) {
  const { reportedId, reporterId, reportCategory, reportDate, reportDetail,
    reportContent, reportedEntityNum, reportedEntityType, reportProcess
   } = reportEntity;

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: 신고 대상 닉네임 상태 //
  const [nickname, setNickname] = useState<string>('');

  // state: 신고 내역 모달 디스플레이 상태 //
  const [isReportClicked, setReportClicked] = useState<boolean>(false);

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

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
    setReportClicked(true);
  };

  // event handler: 신고 내역 닫기 클릭 시 이벤트 처리 //
  const onReportCloseClickHandler = () => {
    setReportClicked(false);
  };

  // effect: 컴포넌트 로드 시 실행할 함수 //
  useEffect(() => {
    getUserNicknameRequest(reportedId, accessToken).then(getUserNicknameResponse);
  }, []);

  // render: 신고 내역/처리 테이블 레코드 컴포넌트 //
  return (
    <div className='rpt-tr'>
      <div className='rpt-tc category'>{reportCategory}</div>
      <div className='rpt-tc content' onClick={onReportClickHandler}>{reportContent}</div>
      {isReportClicked &&
      <Report 
        onClose={onReportCloseClickHandler}
        reportEntity={reportEntity}
        isReportPage={true}
      >
      </Report>
      }
      <div className='rpt-tc reported'>{nickname}({reportedId})</div>
      <div className='rpt-tc process'>{reportProcess}</div>
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

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: get report response 처리 함수 //
  const getReportResponse = (responseBody: GetReportResponseDto | ResponseDto | null) => {
    const message =
    !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if (!isSuccess) {
      alert(message);
      return;
    }

    const { reports } = responseBody as GetReportResponseDto;
    setTotalList(reports);
  };

  // effect: 컴포넌트 로드 시 실행할 함수 //
  useEffect(() => {
    if (!accessToken) return;
    getReportRequest(accessToken).then(getReportResponse);
  }, []);

  // render: 신고 내역/처리 컴포넌트 렌더링 //
  return (
    <div id='report-page-wrapper'>
      <div className='header-container'>
        <div className='title'>신고 내역/처리</div>
      </div>
      <div className='body-container'>
        <div className='title-header'>
          <div className='list-title'>신고 내역</div>
          <div className='divider'></div>
          <div className='list-title'>신고 처리 내역</div>
        </div>
        <div className='list-container'>
          <div className='rpt-tr'>
            <div className='rpt-tc category'>사유</div>
            <div className='rpt-tc'>내용</div>
            <div className='rpt-tc reported'>신고 대상</div>
            <div className='rpt-tc process'>처리 현황</div>
          </div>
        {viewList.map((reportEntity, index) =>
        <ReportItem key={index}
        reportEntity={reportEntity}
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
