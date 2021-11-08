import React, {useState} from "react";
import "../csses/input.css";
// import "../csses/button.css";
import { useHistory } from "react-router";
import "../csses/App.css";
import _axios from "axios";
import axios from "axios";

const LogIn = ({userId, setLogin, setUserId}) =>{
    // const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();
    const handleNavigate = ()=>history.push("/");
    async function handleLogIn(){
        let res;
        try {
            res = await axios.post("http://127.0.0.1:8000/api/user/login",{
                user_id: userId,
                password: password,
            });

            if(res.status === 200){
                console.log("success");
                setLogin(true);
                setPassword("");
                setError("");
                handleNavigate();
                console.log("success");
            } 
            return;
        }catch(e){
            console.log(e.response.status);
            if(e.response.status === 400){
                setError("帳號不存在");
            }
            else if(e.response.status === 401){
                setError("Incorrect Password");
            }
            
        }
    }

    return (
        <div className={["page", "fullPage", "center"].join(" ")} >
            <div className = "logInRegisterSmallPage">
                <p className = {["title"].join(" ")}>Welcome to ProjectName</p>
                <input 
                    className="searchBarInput" 
                    placeholder="帳號"
                    value = {userId}
                    onChange = {(e)=>setUserId(e.target.value)}></input>
                <input 
                    className="searchBarInput" 
                    placeholder="密碼"
                    value = {password}
                    onChange = {(e)=>setPassword(e.target.value)}></input>
                {/* <div className="searchBarDateContainer center">
                    <input type="radio" name="AccountType"/> GENERAL USER
                    <input type="radio" name="AccountType" className="marginLeft"/> ENTERPRISE
                </div> */}
                <div className="logIn_SignIn_button center"
                     onClick = {handleLogIn}>Log In</div>
                {
                    error === ""?null:(<div className = "errorMes">{error}</div>)
                }
            </div>
        </div>
    )
}

export default LogIn;