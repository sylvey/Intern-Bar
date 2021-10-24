import React from "react";
import "../csses/searchBar.css"

const SearchBar = () =>{
    return (
        <div className = "searchBarContainer">
            <input className="searchBarInput" placeholder="Search Post"></input>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"/>
        </div>
        
    )
}

export default SearchBar;