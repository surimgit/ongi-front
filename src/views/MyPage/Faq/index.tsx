import React from "react";
import "./style.css";
import { useNavigate } from "react-router";
import {
  FAQ_ABSOLUTE_PATH,
  NOTICE_ABSOLUTE_PATH,
  QUESTION_ABSOLUTE_PATH,
} from "src/constants";
import MypageSidebar from "src/layouts/MypageSidebar";

export default function Faq() {
  // function: 네비게이터 함수 //
  const navigator = useNavigate();

  // event handler: notice 버튼 클릭 이벤트 처리 //
  const onNoticeButtonClickHandler = () => {
    navigator(NOTICE_ABSOLUTE_PATH);
  };

  // event handler: question 버튼 클릭 이벤트 처리 //
  const onQuestionButtonClickHandler = () => {
    navigator(QUESTION_ABSOLUTE_PATH);
  };

  return (
    <div id="faq-main-wrapper">
      <MypageSidebar />
      <div className="contents-wrapper">
        <div className="title-area">
          <div className="title">고객센터</div>
          <div className="current" onClick={onQuestionButtonClickHandler}>
            문의 내역
          </div>
          <div className="current active">FAQ</div>
          <div className="current" onClick={onNoticeButtonClickHandler}>
            공지사항
          </div>
        </div>
        <hr className="faq-hr" />
        <div className="question-title">자주 묻는 질문</div>
        <div className="question-list">
          <div className="question-text">
            Q1. 아이디/비밀번호를 잃어버렸어요
          </div>
          <div className="answer-text">
            A1. 로그인 페이지의 아이디/비밀번호 찾기 기능을 통해 아이디와
            비밀번호를 찾을 수 있어요. 아이디 및 비밀번호를 찾기 위해서는
            휴대전화 번호 인증이 요구돼요.
          </div>
        </div>
        <div className="question-list">
          <div className="question-text">Q1. 광고는 어떻게 신청하나요?</div>
          <div className="answer-text">
            A1. 문의하기 페이지에 오셔서 문의를 남겨주시면 빠르게
            답변해드리겠습니다.
          </div>
        </div>
      </div>
    </div>
  );
}
