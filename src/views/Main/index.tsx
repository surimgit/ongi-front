import React from "react";

import './style.css';
import adImage from 'src/assets/images/ad-sample-image.png';

export default function Main() {

    // render: Main 화면 컴포넌트 렌더링 //
    return (
        <div id="main-wrapper">
            <div className="ad-container">
                <img className="ad-image" src={adImage}/>
                <div className="ad-text">
                    <div className="ad-content">완전 완전 대박 좋은<br />비타민 C, D</div>
                    <div className="ad-price">34,000원</div>
                </div>
                <div className="ad-next"></div>
            </div>
            <div className="group-bying-container"></div>
            <div className="helper-container"></div>
            <div className="community-container"></div>
            <div className="hot-community-container"></div>
            <div className="popular-user-container"></div>
            <div className="local-community-container"></div>
            <div className="calaedar-container"></div>
            
            <footer></footer>
        </div>
    )
}