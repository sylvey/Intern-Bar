import React from "react";
import "../csses/App.css";
import myOwnPost from "../hardData/myOwnPost";

const MyPost = () =>{
    return (
        <div className = "page">
            <div className = "row marginTop">
                <p className = "pageTitle">我的貼文</p>
                <p className = "button">新增</p>
            </div>
        </div>
    )
}

export default MyPost;