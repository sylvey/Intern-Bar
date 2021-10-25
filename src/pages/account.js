import React, {useState} from "react";
import "../csses/App.css";
import profile from "../hardData/profile";
import MyProfile from "../Components/myProfile";

function Account(){

    return (
         <div className = "page">
            <div className = "row marginTop">
                <p className = "pageTitle">個人檔案</p>
                <p className = "button">新增</p>
            </div>
            <div className="scroll centerVertical" >
                {
                    profile.map((item, index)=>{
                        return(
                            <MyProfile/>
                        );
                    })
                }
                
            </div>
            
         </div>
    )
}

export default Account;