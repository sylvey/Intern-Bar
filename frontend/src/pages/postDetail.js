import React, {useState} from "react";
import { useLocation } from "react-router";
import CollectPost from "../Components/CollectPost";
// import { BrowserRouter as useLocation } from "react-router-dom";
function PostDetail(props){
    let location = useLocation();
    const [showCollect, setShowCollect] = useState(false);
    console.log(location.state.post.experience.pos.org.org_name);
    return(
        <div className = "page center fullPage">
            <div className= "item">
                <div className = "textLeftBox">
                    
                    <h1>{props.match.params.title}</h1>
                    <div className = "subInformation">{location.state.post.experience.pos.org.org_name}</div>
                    <div className = "subInformation">{location.state.post.experience.pos.pos_name}</div>
                    <div className = "marginTopS">{location.state.post.content}</div>
                    <div className = "subInformation marginTopS">{location.state.post.published_time}</div>
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
                            <div className = "button marginTopS"
                                 onClick = {(e)=>setShowCollect(true)}>收藏</div>
                            
                        </div>)
                }
                
            </div>
            <CollectPost 
                post = {location.state.post}
                show = {showCollect}
                setShow = {setShowCollect}
            />
        </div>
    )
}


export default PostDetail;