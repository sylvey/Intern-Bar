import React from "react";
import "../csses/input.css"
import "../csses/button.css"

const LogIn = () =>{
    return (
        <div>
            <p>登入實習吧</p>
            <input className="input" placeholder="帳號"></input>
            <input className="input" placeholder="密碼"></input>
            <p className="button">登入</p>
        </div>
    )
}

export default LogIn;