import React from "react";
import "../csses/searchBar.css";
import { Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = () =>{
    return (
        <div className = "searchBarContainer center">
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    下拉選單
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item>職位名稱</Dropdown.Item>
                    <Dropdown.Item>公司名稱</Dropdown.Item>
                    <Dropdown.Item>開始日期</Dropdown.Item>
                    <Dropdown.Item>結束日期</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <input className="searchBarInput marginLeftS" placeholder="Search Post"></input>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
                     width = "18px"
                     height = "18px"
                     className = "marginLeftS"/>
        </div>
        
    )
}

export default SearchBar;