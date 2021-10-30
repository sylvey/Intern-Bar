import React from "react";
import '../csses/App.css';

function MyFile(props){

    return(
        <div className = "squareItem center">
            <div>{props.name}</div>
            
        </div>
    );
}

export default MyFile;