import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import myOwnPost from "../hardData/myOwnPost";
import Post from "../Components/post";
import axios from "axios";
function ThisFileCollection(props){
    let location = useLocation();
    const [myColPost, setColPost] = useState();// ignore this import, it's just for testing

    useEffect(() => {
        const fetchData = async()=>{
            let res;
            try {
                res = await axios.post("http://127.0.0.1:8000/api/collection/get",{
                    user_id: window.sessionStorage.getItem('userId'),
                    category: location.state.item.category_id,
                });
    
                if(res.status === 200){
                    console.log("this file collection:", res.data); 
                    setColPost(res.data); 
                } 
                return;
            }catch(e){
                console.log(e);
            }
        }
        fetchData();
    }, [])
    


    return (
        <div className = "page">
            
            <div className = "row marginTop">
                <p className = "pageTitle">{props.match.params.title}</p>
            </div>
            <div className="scroll centerVertical" >
                {
                    myColPost? myColPost.map((item)=>{
                        return(
                            <Post 
                                content = {item.content}
                                title = {item.title}
                                posName = {item.experience.pos.pos_name}
                                time = {item.published_time}
                                fromWhere = "myfileCollection"
                                orgName = {item.experience.pos.org.org_name}/>   
                        );
                    }) : null
                }
            </div>
        </div>
        
    )
}

export default ThisFileCollection;