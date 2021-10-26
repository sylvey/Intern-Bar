import React, {useState} from "react";
import "../csses/App.css";
import myOwnPost from "../hardData/myOwnPost";
import MyPostComponent from "../Components/myPost";
import EditPost from "../Components/EditPost";

const MyPost = () =>{
    const [editShow, setEditShow] = useState(false);

    const handleShow = () =>{
        setEditShow(true);
    }
    const handleClose = () =>{
        setEditShow(false);
    }
    return (
        <div className = "page">
            <div className = "row marginTop">
                <p className = "pageTitle">我的貼文</p>
                <p className = "button" onClick = {handleShow}>新增</p>
            </div>
            <div className="scroll centerVertical" >
                {
                    myOwnPost.map((item)=>{
                        return(
                            <MyPostComponent 
                                content = {item.content}
                                posName = {item.position.posName}
                                orgName = {item.position.organization.orgName}/>   
                        );
                    })
                }
                <EditPost show={editShow} handleClose = {handleClose}/>
             
            </div>
        </div>
    )
}

export default MyPost;