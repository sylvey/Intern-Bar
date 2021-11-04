import React, {useState} from "react";
// import "../csses/button.css"
import "../csses/App.css";
import { Link } from "react-router-dom";

function MyPostComponent (props) {


    return(
        <div className = "item profile">
            <div className = "textLeftBox">
                <h1 className = "cursor">
                    <Link className="subTitleh" 
                          to={{pathname: "/PostDetail/" + props.title, 
                          state: {posName: props.posName, 
                                  orgName: props.orgName, 
                                  content: props.content,
                                  time: props.time,
                                  myPost: true}}}
                          >{props.title}</Link>
                </h1>
                <div className = "subInformation">{props.posName}</div>
                <div className = "subInformation">{props.orgName}</div>
                <div className = "contentIgnoreBack">{props.content}</div>
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