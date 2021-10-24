import React from "react";
import "../csses/App.css";
import "../csses/button.css";
import "../csses/signIn&logIn.css";

const SignIn = () =>{
    return (
        <div className={["page", "fullPage", "center"].join(" ")} >
            <div className = {["loginSignIn_Container"].join(" ")}>
                <p className = {["title"].join(" ")}>Welcome to 實習吧</p>
                <input className="input" placeholder="帳號"></input>
                <input className="input" placeholder="密碼"></input>
                <p className="button">註冊</p>
            </div>
        </div>
    )
}

export default SignIn;