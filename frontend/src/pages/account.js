import React, {useState, useEffect} from "react";
import "../csses/App.css";
import profile from "../hardData/profile";
import MyProfile from "../Components/myProfile";
import EditProfile from "../Components/EditProfile";
import orgs from "../hardData/orgs";

function Account(){

    const [editShow, setEditShow] = useState(false);

    const [posName, setPosName] = useState("");
    const [posError, setPosError] = useState();
    const [orgName, setOrgName] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [startError, setStartError] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [endError, setEndError] = useState(null);
    const [filtered, setFiltered] = useState(orgs);
    const [org, setOrg] = useState({});
    const [orgSubmitted, setOrgSubmitted] = useState(false);
    const [orgError, setOrgError] = useState(null);

    const handleShow = () =>{
        setEditShow(true);
    }
    const handleClose = () =>{
        setEditShow(false);
    }

    const validate = () =>{
        if(posName === "" || startTime == null || endTime == null || !orgSubmitted){
            if(posName === ""){
                setPosError("you must fill this field");
            }
            if(startTime == null){
                setStartError("you haven't choose a time");
            }
            if(endTime == null){
                setEndError("you haven't choose a time");
            }
            if(!orgSubmitted){
                setOrgError("you haven't finish adding an organization")
            }
            return false;
        }
        
        return true;
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validate()){

            handleClose();
        }
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
                    handleSubmit = {handleSubmit}
                    show={editShow} 
                    handleClose = {handleClose}
                    posName = {posName}
                    posError = {posError}
                    orgName = {orgName}
                    orgError = {orgError}
                    startTime = {startTime}
                    startError = {startError}
                    endTime = {endTime}
                    endError = {endError}
                    setPosName = {(e)=>{setPosName(e.target.value)}}
                    setOrgName = {handleSetOrg}
                    setStartTime = {(e)=>{setStartTime(e.target.value)}}
                    setEndTime = {(e)=>{setEndTime(e.target.value)}}
                    filtered = {filtered}
                    org = {org}
                    setOrg = {setOrg}
                    setOrgSubmitted = {setOrgSubmitted}
                />
                
            </div>
            
         </div>
    )
}

export default Account;