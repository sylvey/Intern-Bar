import React from "react";
import "../csses/App.css";
import "../csses/button.css";


const Account = () =>{
    return (
         <div className = {["page"].join(" ")}>
            <div className = {["row", "marginTop"].join(" ")}>
                <p className = "pageTitle">個人檔案</p>
                <p className = "button">新增</p>
            </div>
            
         </div>
    )
}

export default Account;