import React, { useState } from "react";
import AdSlider from "src/components/AdSlider";
import GroupBuyingSlider from "src/components/GroupByingSlider";
import './style.css';

export default function Main() {

    return (
        <div id="main-wrapper">
            <AdSlider />
            <GroupBuyingSlider />            
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