import React, {useState} from "react";
// import "../csses/button.css"
import "../csses/App.css";


function Post (props) {
    return(
        <div className = "item profile">
            <div className = "textLeftBox">
                <div>{props.content}</div>
                <div>{props.posName}</div>
                <div>{props.orgName}</div>
            </div>
            
            
            
        </div>
    );
}

export default Post;