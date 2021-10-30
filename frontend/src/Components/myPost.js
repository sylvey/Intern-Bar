import React, {useState} from "react";
// import "../csses/button.css"
import "../csses/App.css";


function MyPostComponent (props) {


    return(
        <div className = "item profile">
            <div className = "textLeftBox">
                <h1>{props.title}</h1>
                <div>{props.posName}</div>
                <div>{props.orgName}</div>
                <div>{props.content}</div>
            </div>
            
            <div className = "buttonRightBox column">
                <div className = "flex row">
                    <div className = "button marginLeft marginTop">編輯</div>
                    <div className = "button marginLeft marginTop">刪除</div>
                </div>
                <div className = "flex fullHeight end">{props.time}</div>
            </div>
            
        </div>
    );
}

export default MyPostComponent;