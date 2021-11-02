import React, {useState} from "react";
import "../csses/App.css";
import myOwnPost from "../hardData/myOwnPost";
import MyPostComponent from "../Components/myPost";
import EditPost from "../Components/EditPost";

const MyPost = () =>{
    const [editShow, setEditShow] = useState(false);

    const [posName, setPosName] = useState("");
    const [orgName, setOrgName] = useState("");
    const [place, setPlace] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [position, setPosition] = useState("choose a current position");

    const handleSubmit = ()=>{
        console.log(posName);
        setPosName("");
        setOrgName("");
        setPlace("");
        setTitle("");
        setContent("");
        setEditShow(false);
    }

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
                                title = {item.title}
                                time = {item.time}
                                posName = {item.position.posName}
                                orgName = {item.position.organization.orgName}/>   
                        );
                    })
                }
                <EditPost 
                    show={editShow} 
                    handleClose = {handleClose}
                    handleSubmit = {handleSubmit}
                    posName = {posName}
                    setPosName = {(event)=>setPosName(event.target.value)}
                    orgName = {orgName}
                    setOrgName = {(event)=>setOrgName(event.target.value)}
                    place = {place}
                    setPlace = {(event)=>setPlace(event.target.value)}
                    title = {title}
                    setTitle = {(event)=>setTitle(event.target.value)}
                    content = {content}
                    setContent = {(event)=>setContent(event.target.value)}
                    position = {position}
                    setPosition = {setPosition}
                    />
             
            </div>
        </div>
    )
}

export default MyPost;