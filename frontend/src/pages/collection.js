import React, { useState, useEffect } from "react";
import '../csses/App.css';
import MyFile from "../Components/file";
import axios from "axios";
const Collection = () =>{
    const [collection, setCollection] = useState();
    const [showAddCat, setShowAddCat] = useState(false);
    const [newCat, setNewCat] = useState("");

    useEffect(() => {
        // console.log("userIdOn collection:",userId);
        const fetchData = async()=>{
            let res;
            try {
                res = await axios.post("http://127.0.0.1:8000/api/user/myCat",{
                    user_id: window.sessionStorage.getItem('userId'),
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

    const handleAddCat = () =>{
        setShowAddCat(false);
    }
    
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
                <div className="addButton center"
                     onClick = {()=>{setShowAddCat(true)}}>
                         {
                             showAddCat? (
                             <form className = "flex centerHorizontal"
                                    onSubmit = {handleAddCat}>
                                <input className="normalInput"
                                       value = {newCat}
                                       onChange = {(e)=>setNewCat(e.target.value)}/>
                             </form>
                             ):(
                                <>+</>
                             )
                         } 
                     </div>
            </div>
            
            
        </div>
    )
}

export default Collection;