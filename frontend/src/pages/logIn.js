import React from "react";
import "../csses/input.css";
// import "../csses/button.css";
import "../csses/App.css";

const LogIn = () =>{
    return (
        <div className={["page", "fullPage", "center"].join(" ")} >
            <div className = "logInRegisterSmallPage">
                <p className = {["title"].join(" ")}>Welcome to ProjectName</p>
                <input className="searchBarInput" placeholder="帳號"></input>
                <input className="searchBarInput" placeholder="密碼"></input>
                <div className="searchBarDateContainer center">
                    <input type="radio" name="AccountType"/> GENERAL USER
                    <input type="radio" name="AccountType" className="marginLeft"/> ENTERPRISE
                </div>
                <div className="logIn_SignIn_button center">Log In</div>

            </div>
        </div>
    )
}

export default LogIn;