import React from "react";
import './style.css';

export default function PolicyView() {
  return (
    <div id="policy-main-wrapper">
      <div className="policy-view-wrapper">

        <div className="title">의약품 규제업무 전문가 양성교육</div>

        <div className="tag-container">
          <div className="region">전국</div>
          <div className="category">교육</div>
          <div className="remain">신청마감 D-21</div>
          <div className="organization">식품의약품안전처</div>
        </div>

        <div className="short-textbox">
          의약품 안전관리 전주기의 법적,과학적 규제기준에 대한 종합적 지식을 갖춘 '의약품 규제업무 전문자' 양성/배출
        </div>

        <div className="info-container summary">
          <div className="info-title">한 눈에 보는 정책 요약</div>
          <div className="info-row">
            <span className="span-title">· 정책 번호</span>
            <span className="content-detail">20250321005400110646</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 정책 분야</span>
            <span className="content-detail">참여권리</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 지원내용</span>
            <span className="content-detail">
              행사 일시 및 장소<br />
              &nbsp;&nbsp;일시: 2024. 10. 1.(화) - 2024. 10. 2.(수)<br />
              &nbsp;&nbsp;장소: 벡스코 제1전시장, 밋업 ZONE(부산광역시 해운대구 APEC로 55)<br />
              &nbsp;&nbsp;지원내용: 스타트업과 투자자 간의 비즈니스 미팅 기회를 제공
            </span>
          </div>
          <div className="info-row">
            <span className="span-title">· 사업 운영 기간</span>
            <span className="content-detail">2024년 8월 13일 ~ 2024년 9월 19일</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 사업 신청기간</span>
            <span className="content-detail">2024년 8월 13일 ~ 2024년 9월 19일</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 지원 규모(명)</span>
            <span className="content-detail">0명</span>
          </div>
        </div>

        <div className="info-container qualifications">
          <div className="info-title">신청자격</div>
          {[
            ["· 연령", "제한없음"],
            ["· 거주지역", "전국"],
            ["· 소득", "제한없음"],
            ["· 학력", "제한없음"],
            ["· 전공", "제한없음"],
            ["· 취업상태", "제한없음"],
            ["· 특화분야", "제한없음"],
            ["· 추가사항", "제한없음"],
            ["· 참여제한 대상", "2014년 10월 이전 설립 기업"]
          ].map(([title, content], idx) => (
            <div className="info-row" key={idx}>
              <span className="span-title">{title}</span>
              <span className="content-detail">{content}</span>
            </div>
          ))}
        </div>

        <div className="info-container application">
          <div className="info-title">신청방법</div>
          <div className="info-row">
            <span className="span-title">· 신청절차</span>
            <span className="content-detail">
              밋업 프로세스<br />
              &nbsp;&nbsp;Step 01 : 투자자 참가 확정 – 국내외 투자자 참가리스트 공개 <br />
              &nbsp;&nbsp;&nbsp;&nbsp;*8월 12일(월)<br />
              &nbsp;&nbsp;Step 02 : 스타트업 모집(연장) 및 매칭 선정 – 공개 모집 및 스타트업 IR 제출<br />
              &nbsp;&nbsp;&nbsp;&nbsp;*8월 13일(화) ~ 9월 19일(목)<br />
              &nbsp;&nbsp;Step 03 : 최종 스케줄링 – 미팅일정 확정 및 안내<br />
              &nbsp;&nbsp;&nbsp;&nbsp;*9월 12일(목) ~ 9월 23일(월)<br />
              &nbsp;&nbsp;※ 상기 일정은 추진상황에 따라 일부 변경될 수 있습니다.
            </span>
          </div>
          <div className="info-row">
            <span className="span-title">· 심사 및 발표</span>
            <span className="content-detail">2014년 10월</span>
          </div>
          <div className="info-row">
            <span className="span-title">· 신청 사이트</span>
            <span className="content-detail">
              <a href="https://example.com">https://example.com</a>
            </span>
          </div>
          <div className="info-row">
            <span className="span-title">· 제출 서류</span>
            <span className="content-detail">
              FLY ASIA 홈페이지 內 제출- CI 이미지- IR 자료- IR 자료(영문)
            </span>
          </div>
        </div>

      </div>
      <div className="policy-move-container">
          <div className="title">의약품 규제업무 전문가 양성교육 의약품 규제업무 전문가 양성교육</div>
          <button className="hyperlink">신청 바로가기</button>
          <button className="list">목록으로</button>
      </div>
    </div>
  );
}