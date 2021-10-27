import React from "react";
// import "../csses/searchBar.css";
import "../csses/App.css";
import { Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import searchButton from "../image/SearchButton.png"

const SearchBar = () =>{
    return (
        <div className = "searchBarContainer">
          <div className = "textLeftBox">
            <input className="searchBarInput" placeholder="公司名稱"/>
            <input className="searchBarInput" placeholder="職務名稱"/>
            <div className = "searchBarDateContainer">
              <input type = "date" className = "searchBarDate"/>
              <input type = "date" className = "searchBarDate marginLeft"/>
            </div>
          </div>
          <div className = "buttonRightBox">
            <img src={searchButton}
                 class = "searchButton transparentBackground"
                 width = "80px"
                 height= "60px"/>
          </div>
        </div>
        
    )
}

export default SearchBar;