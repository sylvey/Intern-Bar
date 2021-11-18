import React,{useState} from "react";
import "../csses/App.css";
// import "../csses/button.css";
import "../csses/signIn&logIn.css";
import { useHistory } from "react-router-dom";
import _axios from "axios";
import axios from "axios";

const SignIn = () =>{

    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();
    const handleNavigate = () =>history.push("/LogIn");
    async function handleSignIn(){
        try {
            let res = await axios.post("http://127.0.0.1:8000/api/user/create",{
                user_id: userId,
                password: password,
                user_name: userName
            });

            if(res.status === 201){
                console.log("success");
                setUserId("");
                setUserName("");
                setPassword("");
                setError("");
                handleNavigate();
                alert("successfully registered")
            } 
            return;
        }catch(e){
            // console.log(e);
            setError("此帳號名稱已存在")
        }
    }
    return (
        <div className={["page", "fullPage", "center"].join(" ")} >
            <div className = "logInRegisterSmallPage">
                <p className = {["title"].join(" ")}>Welcome to ProjectName</p>
                <input className="searchBarInput" 
                       placeholder="帳號"
                       value = {userId}
                       onChange = {(e)=>setUserId(e.target.value)}></input>
                <input className="searchBarInput" 
                       placeholder="名稱"
                       value = {userName}
                       onChange = {(e)=>setUserName(e.target.value)}></input>
                <input className="searchBarInput"
                       type = "password" 
                       placeholder="密碼"
                       value = {password}
                       onChange = {(e)=>setPassword(e.target.value)}></input>
                {/* <div className="searchBarDateContainer center">
                    <input type="radio" name="AccountType"/> GENERAL USER
                    <input type="radio" name="AccountType" className="marginLeft"/> ENTERPRISE
                </div> */}
                <div className="logIn_SignIn_button center" 
                     onClick = {handleSignIn}>Register</div>
                
                {
                    error === ""?null:(<div className = "errorMes">{error}</div>)
                }
            </div>
        </div>
    )
}

export default SignIn;