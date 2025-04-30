import React, { useState } from "react";
import './style.css';

import HotGroupBuyingData from "./HOT";
import NewGroupBuyingData from "./NEW";

export default function GroupBuyingSlider() {

    return (
        <div id="group-bying-container">
            <div className="gb-container-title">공동구매</div>
            <HotGroupBuyingData />
            <NewGroupBuyingData />
        </div>
    );
}
