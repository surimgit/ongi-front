import React from "react";
import './style.css';

import fire from 'src/assets/images/fire.png';

export default function MainHelper() {

    return (
        <div id="helper-of-main-wrapper">
            <div className="hm-container-title">도우미 게시판</div>
            
            {/* 추천 */}
            <div className="hm-container-subtitle">
                <div className="hm-subtitle-hot">당신에게 어울려요!<img src={fire}/></div>
                <div className="hm-more">더보기{'>'}</div>
            </div>
            <div className="helper-of-main-container">
                <div className="hm-tob-bar">
                    <div className="title">제목</div>
                    <div className="when">시간</div>
                    <div className="reward">급여</div>
                </div>
                <div className="contents-box">
                    <div className="sequence">1</div>
                    <div className="title">도와주세요!!</div>
                    <div className="when">01:12:34</div>
                    <div className="reward">10,000</div>
                    <button className="application">신청하기</button>
                </div>
            </div>

            {/* all */}
            <div className="hm-container-subtitle s2">
                <div className="hm-subtitle-hot">ALL</div>
                <div className="hm-more">더보기{'>'}</div>
            </div>
            <div className="helper-of-main-container">
                <div className="hm-tob-bar">
                    <div className="title">제목</div>
                    <div className="when">시간</div>
                    <div className="reward">급여</div>
                </div>
                <div className="contents-box">
                    <div className="sequence">1</div>
                    <div className="title">도와주세요!!</div>
                    <div className="when">01:12:34</div>
                    <div className="reward">10,000</div>
                    <button className="application">신청하기</button>
                </div>
            </div>
        </div>
    );
}