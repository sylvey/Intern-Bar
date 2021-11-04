import React, {useState} from "react";
import { Link } from "react-router-dom";
// import "../csses/button.css"
import "../csses/App.css";


function Post (props) {
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
                                  myPost: false}}}
                          >{props.title}</Link>
                </h1>
                <div className = "subInformation">{props.posName}</div>
                <div className = "subInformation">{props.orgName}</div>
                <div className = "contentIgnoreBack">{props.content}</div>
            </div>
            <div className = "buttonRightBox column centerVertical">
                <div className = "button marginTopS">收藏</div>
                <div className = "flex fullHeight end">{props.time}</div>
            </div>
            
            
        </div>
    );
}

export default Post;