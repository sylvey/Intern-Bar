import React, {useState, useEffect} from "react";
import "../csses/App.css";
import profile from "../hardData/profile";
import MyProfile from "../Components/myProfile";
import EditProfile from "../Components/EditProfile";
import orgs from "../hardData/orgs";

function Account(){

    const [editShow, setEditShow] = useState(false);
    const [posName, setPosName] = useState("");
    const [orgName, setOrgName] = useState("");
    const [startTime, setStartTime] = useState({date: new Date()});
    const [endTime, setEndTime] = useState({date: new Date()});
    const [filtered, setFiltered] = useState(orgs);
    const [org, setOrg] = useState({});

    const handleShow = () =>{
        setEditShow(true);
    }
    const handleClose = () =>{
        setEditShow(false);
    }

    const handleSetOrg = (e) =>{
        setOrgName(e.target.value);
        // console.log(orgName);
        let tempt = orgs.filter((item)=>{
            if(item.name.includes(e.target.value)){
                return item;
            }
        });
        setFiltered(tempt);
        console.log(tempt);
    }

    useEffect(()=>{
        console.log(org);
    }, [org])


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
                    handleClose = {handleClose}
                    posName = {posName}
                    orgName = {orgName}
                    startTime = {startTime}
                    endTime = {endTime}
                    setPosName = {(e)=>{setPosName(e.target.value)}}
                    setOrgName = {handleSetOrg}
                    setStartTime = {(e)=>{setStartTime(e.target.value)}}
                    setEndTime = {(e)=>{setEndTime(e.target.value)}}
                    filtered = {filtered}
                    org = {org}
                    setOrg = {setOrg}
                />
                
            </div>
            
         </div>
    )
}

export default Account;