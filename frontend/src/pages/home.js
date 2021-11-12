import React, {useState, useEffect} from "react";
import SearchBar from "../Components/searchBar";
import '../csses/App.css'
import myOwnPost from "../hardData/myOwnPost";
import Post from "../Components/post";
import axios from "axios";
// import posts from "../hardData/posts";


const Home = ({userName}) =>{
    const [posts, setPosts] = useState();

    useEffect(() => {
        const fetchData = async ()=>{
            let res;
            try {
                res = await axios.get("http://127.0.0.1:8000/api/post/getAll");

                if(res.status === 200){
                    console.log("res.data:", res.data); 
                    setPosts(res.data); 
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
            {userName}
            <div className = "row marginTop marginLeft">
                <SearchBar setPosts = {setPosts}></SearchBar>
            </div>
            <div className="scroll centerVertical marginTopS" >
                {
                    posts? posts.map((item)=>{
                        return(
                            <Post 
                                content = {item.content}
                                title = {item.title}
                                posName = {item.experience.pos.pos_name}
                                time = {item.published_time}
                                fromWhere = "home"
                                orgName = {item.experience.pos.org.org_name}/>   
                        );
                    }):null
                }
            </div>
        </div>
    )
}

export default Home;