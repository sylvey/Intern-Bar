import React, {useState} from "react";
// import "../csses/button.css"
import "../csses/App.css";


function MyPostComponent (props) {
    return(
        <div className = "item profile">
            <div className = "textLeftBox">
                <div>{props.content}</div>
                <div>{props.posName}</div>
                <div>{props.orgName}</div>
            </div>
            <div className = "buttonRightBox">
                <div className = "button marginLeft marginTop">編輯</div>
                <div className = "button marginLeft marginTop">刪除</div>
            </div>
            
        </div>
    );
}

export default MyPostComponent;