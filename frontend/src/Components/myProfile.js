import React, {useState} from "react";
// import "../csses/button.css"
import "../csses/App.css";


function MyProfile (props) {
    return(
        <div className = "item profile center">
            <div className = "textLeftBox">
                <div>職務名稱：{props.posName}</div>
                <div>公司名稱：{props.orgName}</div>
                <div>地點：{props.place}</div>
                <div>開始日期：{props.startDate}</div>
                <div>結束日期：{props.endDate}</div>
            </div>
            <div className = "buttonRightBox">
                <div className = "button marginLeft marginTop">編輯</div>
                <div className = "button marginLeft marginTop">刪除</div>
            </div>
            
        </div>
    );
}

export default MyProfile;