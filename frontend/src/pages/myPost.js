import React, {useState, useEffect} from "react";
import "../csses/App.css";
// import myOwnPost from "../hardData/myOwnPost";
import MyPostComponent from "../Components/myPost";
import EditPost from "../Components/EditPost";
import axios from "axios";

const MyPost = ({userId}) =>{

    const [editShow, setEditShow] = useState(false);
    const [myOwnPost, setMyOwnPost] = useState();

    const handleShow = () =>{
        setEditShow(true);
    }
    
    useEffect(() => {
        const fetchData = async()=>{
            let res;
            try {
                res = await axios.get("http://127.0.0.1:8000/user/post/get",{
                    user_id: userId,
                });

                if(res.status === 200){
                    console.log(res.data); 
                    setMyOwnPost(res.data); 
                } 
                return;
            }catch(e){
                console.log(e);
            }
        }
        fetchData();
        
    }, [])


    return (
        <div className = "page">
            <div className = "row marginTop">
                <p className = "pageTitle">我的貼文</p>
                <p className = "button" onClick = {handleShow}>新增</p>
            </div>
            <div className="scroll centerVertical" >
                {
                    myOwnPost? (myOwnPost.map((item)=>{
                        return(
                            <MyPostComponent 
                                content = {item.content}
                                title = {item.title}
                                time = {item.published_time}
                                posName = {item.experience.pos.pos_name}
                                orgName = {item.experience.pos.org.org_name}/>   
                        );
                    })):null
                }
                <EditPost 
                    show={editShow} 
                    setEditShow = {setEditShow}
                    />
             
            </div>
        </div>
    )
}

export default MyPost;