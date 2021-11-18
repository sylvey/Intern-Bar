import React, {useState} from "react";
// import "../csses/button.css"
import "../csses/App.css";
import { Link } from "react-router-dom";

function MyPostComponent ({post}) {


    return(
        <div className = "item profile">
            <div className = "textLeftBox">
                <h1 className = "cursor">
                    <Link className="subTitleh" 
                          to={{pathname: "/PostDetail/" + post.title, 
                          state: {post: post,
                                  myPost: true}}}
                          >{post.title}</Link>
                </h1>
                <div className = "subInformation">{post.experience.pos.pos_name}</div>
                <div className = "subInformation">{post.experience.pos.org.org_name}</div>
                <div className = "contentIgnoreBack">{post.content}</div>
            </div>
            
            <div className = "buttonRightBox column">
                {/* <div className = "flex row">
                    <div className = "button marginLeft marginTop">編輯</div>
                    <div className = "button marginLeft marginTop">刪除</div>
                </div> */}
                <div className = "flex fullHeight end">{post.published_time}</div>
            </div>
            
        </div>
    );
}

export default MyPostComponent;