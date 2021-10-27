import React from "react";
import SearchBar from "../Components/searchBar";
import '../csses/App.css'
import myOwnPost from "../hardData/myOwnPost";
import Post from "../Components/post";
import posts from "../hardData/posts";


const Home = () =>{
    return (
        <div className = "page">
            <div className = "row marginTop marginLeft">
                <SearchBar></SearchBar>
            </div>
            <div className="scroll centerVertical marginTopS" >
                {
                    posts.map((item)=>{
                        return(
                            <Post 
                                content = {item.content}
                                posName = {item.position.posName}
                                orgName = {item.position.organization.orgName}/>   
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Home;