import React from "react";
import '../csses/App.css';
import { Link } from "react-router-dom";

function MyFile({item}){

    return(
        <div className = "squareItem center">
            {/* <div>{props.name}</div> */}
            <Link className="subTitleh" 
                  to={{
                       pathname: "/thisFile/" + item.category_name,
                       state: {item: item}
                    }}
                  >{item.category_name}</Link>
        </div>
    );
}

export default MyFile;