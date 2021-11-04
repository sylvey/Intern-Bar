import React from "react";
import { useLocation } from "react-router";
// import { BrowserRouter as useLocation } from "react-router-dom";
function PostDetail(props){
    let location = useLocation();
    console.log(location);
    return(
        <div className = "page center fullPage">
            <div className= "item">
                <div className = "textLeftBox">
                    <h1>{props.match.params.title}</h1>
                    <div className = "subInformation">{location.state.orgName}</div>
                    <div className = "subInformation">{location.state.posName}</div>
                    <div className = "marginTopS">{location.state.content}</div>
                    <div className = "subInformation marginTopS">{location.state.time}</div>
                </div>
                {
                    location.state.myPost?(
                        <div className = "buttonRightBox column">
                            <div className = "flex row">
                                <div className = "button marginLeft marginTop">編輯</div>
                                <div className = "button marginLeft marginTop">刪除</div>
                            </div>
                        </div>
                    ):(
                        
                        <div className = "buttonRightBox column centerVertical">
                            <div className = "button marginTopS">收藏</div>
                            
                        </div>)
                }
                
            </div>
        </div>
    )
}


export default PostDetail;