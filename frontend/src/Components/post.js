import React, {useState} from "react";
// import "../csses/button.css"
import "../csses/App.css";


function Post (props) {
    return(
        <div className = "item profile">
            <div className = "textLeftBox">
                <h1>{props.title}</h1>
                <div>{props.posName}</div>
                <div>{props.orgName}</div>
                <div>{props.content}</div>
            </div>
            <div className = "buttonRightBox end">
                {props.time}
            </div>
            
            
        </div>
    );
}

export default Post;