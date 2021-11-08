import React from "react";
import '../csses/App.css';
import MyFile from "../Components/file";
import myCollectionFile from "../hardData/myCollectionFile";
import addButton from "../image/addButton.png";

const Collection = () =>{
    return (
        <div className = "page">
            <div className = "row marginTop">
                <p className = "pageTitle">珍藏項目</p>
            </div>
            <div class="row centerHorizontal">
                <div className = "wrap">
                    {
                        myCollectionFile.map((item)=>{
                            return(
                                <MyFile name = {item}/>
                            );
                        })
                    }
                    <img scr = {addButton} width = "200px" height="200px"/>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Collection;