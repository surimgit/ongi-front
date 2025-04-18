import React, { ChangeEvent, useState } from "react";

import "./style.css";
import Pagination from "src/components/Pagination";

// component: 도우미 게시판 화면 컴포넌트 //
export default function NeedHelper() {
  // variable: 더미 지역 데이터 //
  const DUMMY_REGIONS: Record<string, string[]> = {
    서울특별시: ["강남구", "강북구", "마포구"],
    경기도: ["수원시", "성남시", "용인시"],
    부산광역시: ["해운대구", "중구", "사하구"],
  };

  // variable: 도우미 게시글 더미 데이터 //
  const DUMMY_HELPER_LIST = [
    {
      title: "벌레가 들어왔어요ㅠ 제발 도와주세요ㅠㅠㅠ",
      location: "부산광역시 동래구",
      pay: 10000,
      deadline: "3일 2시간 남음",
    },
    {
      title: "문이 안 열려요",
      location: "서울특별시 마포구",
      pay: 15000,
      deadline: "1일 4시간 남음",
    },
    {
      title: "세탁기 고장났어요",
      location: "경기도 수원시",
      pay: 20000,
      deadline: "2일 1시간 남음",
    },
    {
      title: "컴퓨터 설치 도와주세요",
      location: "서울특별시 강남구",
      pay: 30000,
      deadline: "4시간 남음",
    },
    {
      title: "짐 옮기는 거 도와주세요",
      location: "경기도 성남시",
      pay: 25000,
      deadline: "1일 남음",
    },
    {
      title: "인터넷 연결 안 돼요",
      location: "부산광역시 해운대구",
      pay: 12000,
      deadline: "3시간 남음",
    },
    {
      title: "TV가 안 나와요",
      location: "서울특별시 강북구",
      pay: 13000,
      deadline: "5시간 남음",
    },
    {
      title: "가스레인지 고장났어요",
      location: "경기도 용인시",
      pay: 17000,
      deadline: "2일 남음",
    },
    {
      title: "전등 갈아주세요",
      location: "부산광역시 중구",
      pay: 8000,
      deadline: "1시간 남음",
    },
    {
      title: "장보는 거 도와주세요",
      location: "서울특별시 마포구",
      pay: 9000,
      deadline: "2시간 남음",
    },
  ];

  // state: 선택된 시/도
  const [city, setCity] = useState("");

  // state: 선택된 시/군/구
  const [district, setDistrict] = useState("");

  // state: 선택된 만남 방식
  const [meetingType, setMeetingType] = useState("");

  // state: 페이지네이션 상태 //
  // const { 
  //   currentPage, setCurrentPage, currentSection, setCurrentSection,
  //   totalSection, setTotalList, viewList, pageList
  // } = usePagination<NeedHelper>();

  // event handler: 체크박스 클릭 처리
  const onMettingTypeChangeHandler = (type: string) => {
    setMeetingType((prev) => (prev === type ? "" : type));
  };

  // event handler: 시/도 선택 이벤트 처리 //
  const onCitySelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setCity(city);
    setDistrict("");
  };

  // event handler: 시/군/구 선택 이벤트 처리 //
  const onDistrictSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setDistrict(e.target.value);
  };

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
          {/* // todo: DB 작업 후 다시 */}
          <div className="option-location-select">
            <div className="sub-title">지역</div>
            <div className="option-location-box">
              <div className="city">
                <select value={city} onChange={onCitySelectHandler}>
                  <option value="">시/도 선택</option>
                  {Object.keys(DUMMY_REGIONS).map((cityName) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="district">
                <select
                  value={district}
                  onChange={onDistrictSelectHandler}
                  disabled={!city}
                >
                  <option value="">시/군/구 선택</option>
                  {city &&
                    DUMMY_REGIONS[city].map((districtName: string) => (
                      <option key={districtName} value={districtName}>
                        {districtName}
                      </option>
                    ))}
                </select>
              </div>
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
          {/* {viewList.map((helper, index) => ( */}
          {DUMMY_HELPER_LIST.map((helper, index) => (
            <div className="tr" key={index}>
              <div className="td content">
                <div className="title">{helper.title}</div>
                <div className="summary">
                  {helper.location} •{" "}
                  <div className="pay">{helper.pay.toLocaleString()}</div>원
                </div>
              </div>
              <div className="td deadline">{helper.deadline}</div>
            </div>
          ))}
        </div>
      </div>
        <div className="write-button-box">
          <button className="write-button">글쓰기</button>
        </div>
      <div className="pagination-container">
      {/* {totalSection !== 0 &&
          <Pagination 
            currentPage={currentPage}
            currentSection={currentSection}
            totalSection={totalSection}
            pageList={pageList}
            setCurrentPage={setCurrentPage}
            setCurrentSection={setCurrentSection}
          />
          } */}
      </div>
    </div>
  );
}
