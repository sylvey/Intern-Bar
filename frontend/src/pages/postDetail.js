import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import CollectPost from "../Components/CollectPost";
import Comment from "../Components/comment";
import axios from "axios";
// import { BrowserRouter as useLocation } from "react-router-dom";
function PostDetail(props){
    let location = useLocation();
    const [showCollect, setShowCollect] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    const [trigger,setTrigger] = useState(false);
    
    const handleSubmitComment = async(e)=>{
        e.preventDefault();
        let today = new Date();
        let time = today.getFullYear() + "-"+today.getMonth() + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log("time:", time);
        const create = async()=>{
            let res;
            try {
                res = await axios.post("http://127.0.0.1:8000/api/comment/create",{
                    author: window.sessionStorage.getItem('userId'),
                    content: newComment,
                    post_attached_id: location.state.post.post_id,
                    published_time: time,
                });
              
                if(res.status === 201){
                    console.log("success create exp");
                    console.log("create resdata:", res.data); 
                    setTrigger(!trigger);
                } 
                return;
            }catch(e){
                console.log(e);
            }
        }
        await create();
        setNewComment("");
        //console.log("submit commemt")
    }

    const fetchData = async()=>{
        let res;
        try {
            res = await axios.post("http://127.0.0.1:8000/api/comment/get",{
                post_id: location.state.post.post_id,
            });
            
            if(res.status === 200){
                console.log("success fetch");
                console.log("comments in this post:", res.data);
                setComments(res.data); 
            } 
            return;
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData()
    }, [trigger])

    return(
        <div className = "page centerVertical">
            <div className= "item">
                <div className = "textLeftBox">
                    
                    <h1>{props.match.params.title}</h1>
                    <div className = "subInformation">{location.state.post.experience.pos.org.org_name}</div>
                    <div className = "subInformation">{location.state.post.experience.pos.pos_name} in {location.state.post.experience.pos.place}</div>
                    <div className = "marginTopS">{location.state.post.content}</div>
                    <div className = "subInformation marginTopS">{location.state.post.published_time}</div>
                </div>
                {
                    location.state.myPost?(
                        <div className = "buttonRightBox column">
                            <div className = "flex row">
                                {/* <div className = "button marginLeft marginTop">編輯</div>
                                <div className = "button marginLeft marginTop">刪除</div> */}
                            </div>
                        </div>
                    ):(
                        
                        <div className = "buttonRightBox column centerVertical">
                            <div className = "button marginTopS"
                                 onClick = {(e)=>setShowCollect(true)}>收藏</div>
                            
                        </div>)
                }
                
            </div>
            
            <div className="item borderRadius">
                <form onSubmit = {handleSubmitComment}>
                    <input className="commentInput" 
                           value = {newComment}
                           onChange = {(e)=>setNewComment(e.target.value)}
                           type= "text" 
                           placeholder = "留言"/>
                </form>
                
            </div>
            {
                comments[0]?
                <div className = "item column">
                {
                    comments !==[]? comments.map((item)=>{
                        return(
                            <Comment comment = {item}/>
                        )
                    }):null
                }
                </div>:null
            }
            
            
            

            <CollectPost 
                post = {location.state.post}
                show = {showCollect}
                setShow = {setShowCollect}
            />
        </div>
    )
}


export default PostDetail;