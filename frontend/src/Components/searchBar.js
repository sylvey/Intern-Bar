import React, {useState} from "react";
// import "../csses/searchBar.css";
import "../csses/App.css";
// import { Dropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import searchButton from "../image/SearchButton.png";
import axios from "axios";

const SearchBar = ({setPosts}) =>{
    const [org, setOrg] = useState("");
    const [pos, setPos] = useState("");
    const [sDate, setSDate] = useState("");
    const [eDate, setEDate] = useState("");

    const handleSearch = async()=>{
      const fetchData = async()=>{
        let res;
        try {
            res = await axios.post("http://127.0.0.1:8000/api/post/search",{
                keyword_org: org,
                keyword_pos: pos,
                keyword_sDate: sDate,
                keyword_eDate: eDate,
            });

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
    }
    return (
        <div className = "searchBarContainer">
          <div className = "textLeftBox">
            <input className="searchBarInput" 
                   placeholder="公司名稱"
                   value = {org}
                   onChange = {(e)=>setOrg(e.target.value)}/>
            <input className="searchBarInput"
                   placeholder="職務名稱"
                   value = {pos}
                   onChange = {(e)=>setPos(e.target.value)}/>
            <div className = "searchBarDateContainer">
              <input type = "date" 
                     className = "searchBarDate"
                     value = {sDate}
                     onChange = {(e)=>setSDate(e.target.value)}/>
              <input type = "date"
                     className = "searchBarDate marginLeft"
                     value = {eDate}
                     onChange = {(e)=>setEDate(e.target.value)}/>
            </div>
          </div>
          <div className = "buttonRightBox centerHorizontal"
               onClick = {handleSearch}>
            <img src={searchButton}
                 class = "searchButton transparentBackground"
                 width = "80px"
                 height= "60px"/>
          </div>
        </div>
        
    )
}

export default SearchBar;