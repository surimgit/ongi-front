import React, { useEffect, useState } from "react";
import './style.css';

import fire from 'src/assets/images/fire.png';
import GetHelperPostListResponseDto from "src/apis/dto/response/needhelper/get-helper-post-list.response.dto";
import { ResponseDto } from "src/apis/dto/response";
import { getHelperPostMainRequest, getMatchPostMainRequest } from "src/apis";
import { NeedHelperPost } from "src/types/interfaces";
import { useSignInUserStore } from "src/stores";
import { ACCESS_TOKEN, NEEDHELPER_ABSOLUTE_PATH, NEEDHELPER_VIEW_ABSOLUTE_PATH } from "src/constants";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

export default function MainHelper() {

  // state: cookie 상태 //
  const [cookies] = useCookies();

    const {userId} = useSignInUserStore();

    const [recommendedList, setRecommendedList] = useState<NeedHelperPost[]>([]);
    const [generalList, setGeneralList] = useState<NeedHelperPost[]>([]);

    const navigator = useNavigate();

    // variable: access token //
      const accessToken = cookies[ACCESS_TOKEN];
    
      // function: get match helper post list 함수 // 
      const handleRecommendedResponse = (responseBody: GetHelperPostListResponseDto | ResponseDto | null) => {
        if (!responseBody || responseBody.code !== 'SU') {
          alert('추천 게시글 불러오기 실패');
          return;
        }
        const posts = (responseBody as GetHelperPostListResponseDto).posts;
        const valid = posts.filter(post => new Date(post.schedule).getTime() > Date.now());
        console.log('추천게시글: ', posts);
        setRecommendedList(valid.slice(0, 5));
      };
      
    
      // function: get helper post list 함수 // 
      const handleGeneralResponse = (responseBody: GetHelperPostListResponseDto | ResponseDto | null) => {
        if (!responseBody || responseBody.code !== 'SU') {
          alert('전체 게시글 불러오기 실패');
          return;
        }
        const posts = (responseBody as GetHelperPostListResponseDto).posts;
        const valid = posts.filter(post => new Date(post.schedule).getTime() > Date.now());
        setGeneralList(valid.slice(0, 5));
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

      // event handler: 전체 더보기 클릭 이벤트 처리 //
      const onMoreAllClickHandler = () => {
        navigator(NEEDHELPER_ABSOLUTE_PATH);
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    
      // effect: 서버 데이터 불러오기 //
      useEffect(() => {
        getMatchPostMainRequest(userId).then(handleRecommendedResponse);
        getHelperPostMainRequest().then(handleGeneralResponse);
      }, []);

    return (
        <div id="helper-of-main-wrapper">
            <div className="hm-container-title">도우미 게시판</div>
            
            {/* 추천 */}
            { accessToken && (
              <>
                <div className="hm-container-subtitle">
                    <div className="hm-subtitle-hot">당신에게 어울려요!<img src={fire}/></div>
                    <div className="hm-more" onClick={onMoreAllClickHandler}>더보기{'>'}</div>
                </div>
                <div className="helper-of-main-container">
                    <div className="hm-tob-bar">
                        <div className="title">제목</div>
                        <div className="when">시간</div>
                        <div className="reward">급여</div>
                    </div>
                    {recommendedList.map((post, index) => (
                        <div className="contents-box" key={index}>
                            <div className="sequence">{index + 1}</div>
                            <div className="title">{post.title}</div>
                            <div className="when">{getRemainingTimeString(post.schedule)}</div>
                            <div className="reward">{post.reward}</div>
                            <button className="application"
                            onClick={() => {
                              navigator(NEEDHELPER_VIEW_ABSOLUTE_PATH(post.sequence));
                              window.scrollTo({ top: 0, behavior: 'auto' });
                            }}>신청하기</button>
                        </div>
                    ))}
                </div>
              </>
            )}

            {/* all */}
            <div className="hm-container-subtitle s2">
                <div className="hm-subtitle-hot">ALL</div>
                <div className="hm-more" onClick={onMoreAllClickHandler}>더보기{'>'}</div>
            </div>
            <div className="helper-of-main-container">
                <div className="hm-tob-bar">
                    <div className="title">제목</div>
                    <div className="when">시간</div>
                    <div className="reward">급여</div>
                </div>
                {generalList.map((post, index) => (
                    <div className="contents-box" key={index}>
                        <div className="sequence">{post.sequence}</div>
                        <div className="title">{post.title}</div>
                        <div className="when">{getRemainingTimeString(post.schedule)}</div>
                        <div className="reward">{post.reward}</div>
                        <button className="application" 
                        onClick={() => {
                          navigator(NEEDHELPER_VIEW_ABSOLUTE_PATH(post.sequence));
                          window.scrollTo({ top: 0, behavior: 'auto' });
                        }}>신청하기</button>
                    </div>
                ))}
            </div>
        </div>
    );
}