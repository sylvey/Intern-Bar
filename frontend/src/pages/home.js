import React, {useState, useEffect} from "react";
import SearchBar from "../Components/searchBar";
import '../csses/App.css'
import myOwnPost from "../hardData/myOwnPost";
import CollectPost from "../Components/CollectPost";
import Post from "../Components/post";
import axios from "axios";
// import posts from "../hardData/posts";


const Home = ({userName}) =>{
    const [posts, setPosts] = useState();
    const [postToBeCollected, setPostToBeCollected] = useState({title: "nothing"});
    const [showCollect, setShowCollect] = useState(false);

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
                                post = {item}
                                postToBeCollected = {postToBeCollected}
                                setPostToBeCollected = {setPostToBeCollected}
                                setShowCollect = {setShowCollect}
                                fromWhere = "home"/>   
                        );
                    }):null
                }
            </div>
            
            <CollectPost 
                post = {postToBeCollected}
                show = {showCollect}
                setShow = {setShowCollect}
            />
                
        </div>
    )
}

export default Home;