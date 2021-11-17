import React, {useState} from "react";
import { Link } from "react-router-dom";
// import "../csses/button.css"
import "../csses/App.css";


function Post ({post, fromWhere, postToBeCollected, setPostToBeCollected, setShowCollect}) {

    const handleToCollect = ()=>{
        setPostToBeCollected(post);
        setShowCollect(true);
    }

    
    return(
        <div className = "item profile">
            <div className = "textLeftBox">
                <h1 className = "cursor">
                    <Link className="subTitleh" 
                          to={{pathname: "/PostDetail/" + post.title, 
                          state: {posName: post.experience.pos.pos_Name, 
                                  orgName: post.experience.pos.org.org_name, 
                                  content: post.content,
                                  time: post.published_time,
                                  myPost: false}}}
                          >{post.title}</Link>
                </h1>
                <div className = "subInformation">{post.experience.pos.pos_Name}</div>
                <div className = "subInformation">{post.experience.pos.org.org_name}</div>
                <div className = "contentIgnoreBack">{post.content}</div>
            </div>
            <div className = "buttonRightBox column centerVertical">
                {
                    fromWhere == "home"?(
                        <div className = "button marginTopS"
                             onClick = {handleToCollect}>收藏</div>
                    ):null
                }
                
                <div className = "flex fullHeight end">{post.published_time}</div>
            </div>
            
            
        </div>
    );
}

export default Post;