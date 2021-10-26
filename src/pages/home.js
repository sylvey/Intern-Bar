import React from "react";
import SearchBar from "../Components/searchBar";
import '../csses/App.css'

const Home = () =>{
    return (
        <div>
            <div className = "row marginTop marginLeft">
                <SearchBar></SearchBar>
            </div>
        </div>
    )
}

export default Home;