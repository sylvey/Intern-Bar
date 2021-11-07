import React, { useState } from "react";
import { useLocation } from "react-router";
import myOwnPost from "../hardData/myOwnPost";
import Post from "../Components/post";
function ThisFileCollection(props){
    let location = useLocation();
    const [myColPost, setColPost] = useState(myOwnPost);// ignore this import, it's just for testing

    return (
        <div className = "page">
            
            <div className = "row marginTop">
                <p className = "pageTitle">{props.match.params.title}</p>
            </div>
            <div className="scroll centerVertical" >
                {
                    myColPost.map((item)=>{
                        return(
                            <Post 
                                content = {item.content}
                                title = {item.title}
                                posName = {item.position.posName}
                                time = {item.time}
                                fromWhere = "myfileCollection"
                                orgName = {item.position.organization.orgName}/>   
                        );
                    })
                }
            </div>
        </div>
        
    )
}

export default ThisFileCollection;