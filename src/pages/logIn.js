import React from "react";
import "../csses/input.css";
// import "../csses/button.css";
import "../csses/App.css";

const LogIn = () =>{
    return (
        <div className={["page", "fullPage", "center"].join(" ")} >
            <div className = {["loginSignIn_Container"].join(" ")}>
                <p className = {["title"].join(" ")}>Welcome to 實習吧</p>
                <input className="input" placeholder="帳號"></input>
                <input className="input" placeholder="密碼"></input>
                <p className="button">登入</p>
            </div>
        </div>
    )
}

export default LogIn;