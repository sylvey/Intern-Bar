import React, {useState, useEffect} from "react";
import "../csses/App.css";
// import profile from "../hardData/profile";
import MyProfile from "../Components/myProfile";
import EditProfile from "../Components/EditProfile";
// import orgs from "../hardData/orgs";
import axios from "axios";
const Account =()=>{

    const [editShow, setEditShow] = useState(false);
    const [profile, setProfile] = useState();
    
    const fetchData = async()=>{
        let res;
        try {
            res = await axios.post("http://127.0.0.1:8000/api/user/exp/get",{
                user_id: window.sessionStorage.getItem('userId'),
            });

            if(res.status === 200){
                console.log("all my profile", res.data); 
                setProfile(res.data); 
            } 
            return;
        }catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, [editShow])

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
                    profile? profile.map((item)=>{
                        return(
                            <MyProfile 
                                posName = {item.pos.pos_name}
                                orgName = {item.pos.org.org_name}
                                place = {item.pos.place}
                                startDate ={item.start_date}
                                endDate = {item.end_date}/>
                        );
                    })
                    : null
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