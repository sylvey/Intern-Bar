import React from "react";
import "../csses/App.css";
import "../csses/Comment.css";


function Comment({comment}){
    return(
        <div className = "commentContainer column">
            <div className = "subInformation marginLeftS">
                {comment.author}
            </div>
            <div className = "subTitleh marginLeftS">
                {comment.content}
            </div>
            <div className = "subInformation marginLeftS">
                {comment.published_time}
            </div>
        </div>
    )

}


export default Comment;