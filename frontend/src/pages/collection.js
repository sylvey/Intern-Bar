import React, { useState, useEffect } from "react";
import '../csses/App.css';
import MyFile from "../Components/file";
import myCollectionFile from "../hardData/myCollectionFile";
import addButton from "../image/addButton.png";
import axios from "axios";
const Collection = ({userId}) =>{
    const [collection, setCollection] = useState();

    useEffect(() => {
        const fetchData = async()=>{
            let res;
            try {
                res = await axios.post("http://127.0.0.1:8000/api/user/myCat",{
                    user_id: userId,
                });

                if(res.status === 200){
                    console.log(res.data); 
                    setCollection(res.data); 
                } 
                return;
            }catch(e){
                console.log(e);
            }
        }
        fetchData();
    }, [])
    
    return (
        <div className = "page">
            <div className = "row marginTop">
                <p className = "pageTitle">珍藏項目</p>
            </div>
            
            <div className = "wrap centerHorizontal centerSelf">
                {
                    collection?
                            collection.map((item)=>{
                                return(
                                    <MyFile name = {item.category_name}/>
                                );
                            })
                    :null
                }
                {/* <img scr = {addButton} width = "200px" height="200px"/> */}
                <div className="addButton center">+</div>
            </div>
            
            
        </div>
    )
}

export default Collection;