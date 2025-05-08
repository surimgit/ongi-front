import React, { ChangeEvent, useEffect, useState } from "react";

import "./style.css";
import Pagination from "src/components/Pagination";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { usePagination } from "src/hooks";
import { useLocationSelector } from "src/hooks/select-box.hook";
import GetHelperPostListResponseDto from "src/apis/dto/response/needhelper/get-helper-post-list.response.dto";
import { ResponseDto } from "src/apis/dto/response";
import NeedHelperPost from "src/types/interfaces/need-helper-post.interface";
import { getHelperPostListRequest } from "src/apis";
import { ACCESS_TOKEN } from "src/constants";

// component: 도우미 게시판 화면 컴포넌트 //
export default function NeedHelper() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

  // state: navigator 상태 //
  const navigator = useNavigate();

  // state: location 상태 //
  const location = useLocation();

  // state: 게시판 parameter 상태 //
  const [searchParams] = useSearchParams();

  // state: 지역 선택 //
  const {areaList, sido, gugun, gugunList, onSidoChange, onGugunChange} = useLocationSelector();
  
  // state: 선택된 만남 방식
  const [meetingType, setMeetingType] = useState("");

  // state: 페이지네이션 상태 //
  const { 
    currentPage, setCurrentPage, currentSection, setCurrentSection,
    totalSection, setTotalList, viewList, pageList
  } = usePagination<NeedHelperPost>();

  // variable: access Token //
  const accessToken = cookies[ACCESS_TOKEN];

  // function: get helper post list 함수 // 
  const getHelerPostListResponse = (responseBody: GetHelperPostListResponseDto | ResponseDto | null) => {
    const message = !responseBody ? '서버에 문제가 있습니다.'
    : responseBody.code === 'DBE' ? '서버에 문제가 있습니다.'
    : responseBody.code === 'AF' ? '인증에 실패했습니다.' : '';

    const isSuccess = responseBody !== null && responseBody.code === 'SU';
    if(!isSuccess) {
      alert(message);
      
      return;
    }

    const { posts } = responseBody as GetHelperPostListResponseDto;
    const validPosts = posts.filter(post => new Date(post.schedule).getTime() > Date.now());

    setTotalList(validPosts);
  };

  // function: 남은 시간 계산 함수 //
  function getRemainingTimeString(schedule: string): string {

    const targetDate = new Date(schedule);
    const now = new Date();

    const diffMs = targetDate.getTime() - now.getTime();

    if (diffMs <= 0) return "마감됨";

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

    if (diffDays > 0) {
      return `${diffDays}일 ${diffHours}시간`;
    }

    return `${diffHours}시간`;
  }

  // event handler: 체크박스 클릭 처리
  const onMettingTypeChangeHandler = (type: string) => {
    setMeetingType((prev) => (prev === type ? "" : type));
  };

  // event handler: 글쓰기 버튼 클릭 이벤트 처리 //
  const onWriterClickHandler = () => {
    navigator('/needHelper/write')
  };

  // event handler: 게시글 클릭 이벤트 처리 //
  const onPostClickHandler = (sequence: number) => {
    navigator(`/needHelper/${sequence}`);
  };  

  // effect: 서버 데이터 불러오기 //
  useEffect(() => {
    getHelperPostListRequest(accessToken).then(getHelerPostListResponse);
  }, [accessToken]);
  
  // render: 도우미 게시판 화면 컴포넌트 렌더링 //
  return (
    <div id="need-helper-wrapper">
      <div className="top">
        <div className="title">
          <div style={{ color: "#FF5233" }}>도우미&nbsp;</div>게시판
        </div>
        <div className="option-container">
          <div className="option-metting-type">
            <div className="sub-title">만남 방식</div>
            <div className="option-check-box">
              <div className="face-to-face">
                <input
                  type="checkbox"
                  checked={meetingType === "face"}
                  onChange={() => onMettingTypeChangeHandler("face")}
                />
                대면
              </div>
              <div className="non-face-to-face">
                <input
                  type="checkbox"
                  checked={meetingType === "non-face"}
                  onChange={() => onMettingTypeChangeHandler("non-face")}
                />
                비대면
              </div>
            </div>
          </div>
          <div className="vertical-bar">|</div>
          <div className="option-location-select">
            <div className="sub-title">지역</div>
            <div className="option-location-box">
              <select className='select-box' value={sido} onChange={onSidoChange}>
                    {areaList.map((sido, index) => (
                        <option key={index} value={sido}>{sido}</option>
                    ))}
                </select>
                <select className='select-box' value={gugun} onChange={onGugunChange}>
                    {gugunList.map((gugun, index) => (
                        <option key={index} value={gugun}>{gugun}</option>
                    ))}
                </select>
            </div>
          </div>
          <div className="vertical-bar">|</div>
          <div className="option-amount-enter">
            <div className="sub-title">급여</div>
            <div className="option-salary-box">
              <div className="min">
                <input type="text" placeholder="금액을 입력하세요." />
              </div>
              원 이상
            </div>
          </div>
          <div className="option-button-box">
            <button className="search-button">검색</button>
          </div>
        </div>
      </div>
      <div className="helper-list-container">
        <div className="helper-list-table">
          {viewList.map((helper, index) => (
            <div className="tr" key={index} onClick={() => onPostClickHandler(helper.sequence)}>
              <div className="td content">
                <div className="title">{helper.title}</div>
                <div className="summary">
                  {helper.city} {helper.district} • <div className="pay">{Number(helper.reward).toLocaleString()}원</div>
                </div>
              </div>
              <div className="td deadline">{getRemainingTimeString(helper.schedule)}</div>
            </div>
          ))}
        </div>
      </div>
        <div className="write-button-box">
          <button className="write-button" onClick={onWriterClickHandler}>글쓰기</button>
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
  );
}