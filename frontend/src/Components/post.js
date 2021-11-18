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
                          state: {post: post,
                                  myPost: window.sessionStorage.getItem('userId') === post.publisher.user_id}}}
                          >{post.title}</Link>
                </h1>
                
                <div className = "subInformation">from {post.experience.start_date} to {post.experience.end_date}</div>
                <div className = "subInformation">{post.experience.pos.pos_name} in {post.experience.pos.place}</div>
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
                
                <div className = "flex fullHeight end column">
                    <p>{post.publisher.user_name + ` published at\n`} </p>
                    <p>{post.published_time}</p>
                </div>
            </div>
            
            
        </div>
    );
}

export default Post;