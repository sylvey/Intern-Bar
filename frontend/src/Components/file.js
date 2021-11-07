import React from "react";
import '../csses/App.css';
import { Link } from "react-router-dom";

function MyFile(props){

    return(
        <div className = "squareItem center">
            {/* <div>{props.name}</div> */}
            <Link className="subTitleh" 
                  to={{pathname: "/thisFile/" + props.name}}
                  >{props.name}</Link>
        </div>
    );
}

export default MyFile;