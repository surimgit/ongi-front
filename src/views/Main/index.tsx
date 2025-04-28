import React, { useState } from "react";
import AdSlider from "src/components/Main/AdSlider";
import GroupBuyingSlider from "src/components/Main/GroupByingSlider";
import MainHelper from "src/components/Main/MainHelper";
import MainCommunity from "src/components/Main/MainCommunity";

import './style.css';
import Calendar from "../Calendar";

export default function Main() {

    return (
        <div id="main-wrapper">
            <AdSlider />
            <GroupBuyingSlider />            
            <MainHelper />
            <MainCommunity />
            <div className="calendar-container">
                <span className="calendar-title">청년달력</span>
                <Calendar />
            </div>
            
            <footer></footer>
        </div>
    )
}