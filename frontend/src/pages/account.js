import React, {useState, useEffect} from "react";
import "../csses/App.css";
import profile from "../hardData/profile";
import MyProfile from "../Components/myProfile";
import EditProfile from "../Components/EditProfile";
import orgs from "../hardData/orgs";

function Account(){

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
                <p className = "pageTitle">個人檔案</p>
                <div className = "button" onClick = {handleShow}>新增</div>
            </div>
            <div className="scroll centerVertical" >
                {
                    profile.map((item, index)=>{
                        return(
                            <MyProfile 
                                posName = {item.posName}
                                orgName = {item.org.orgName}
                                place = {item.org.place}
                                startDate ={item.startDate}
                                endDate = {item.endDate}/>
                        );
                    })
                }
                <EditProfile 
                    show={editShow} 
                    setEditShow = {setEditShow}
                    handleClose = {handleClose}
                />
                
            </div>
            
         </div>
    )
}

export default Account;