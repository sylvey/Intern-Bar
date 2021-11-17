import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown, } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


function CollectPost({show, setShow, post}){

    const [collections, setCollections] = useState([]);
    const [collectFile, setCollectFile] = useState({category_name: "請選擇要新增進的檔案夾"});

    useEffect(() => {
        const fetchData = async ()=>{
            let res;
            try {
                res = await axios.post("http://127.0.0.1:8000/api/user/myCat",{
                    user_id: window.sessionStorage.getItem('userId'),
                });

                if(res.status === 200){
                    console.log("all my collection file", res.data); 
                    setCollections(res.data); 
                } 
                
                return;
            }catch(e){
                console.log(e);
            }
        }
        fetchData();
    }, [])

    const handleSubmit = ()=>{
        const collect = async ()=>{
            let res;
            try {
                res = await axios.post("http://127.0.0.1:8000/api/collection/add",{
                    user_id: window.sessionStorage.getItem('userId'),
                    post: post.post_id,
                    category: collectFile.category_id,
                });

                if(res.status === 201){
                    console.log("add in file success"); 
                    setShow(false);
                    //setCollections(res.data); 
                } 
                
                return;
            }catch(e){
                console.log(e);
            }
        }
        collect();
    }

    return (
    <>
      <Modal 
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show} 
        onHide={(e)=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>將文章[{post.title}]加入收藏</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            {
                collections === []? "請先至珍藏項目新增珍藏資料夾" : (
                    <Dropdown>
                      <Dropdown.Toggle style= {{borderStyle: "solid", borderRadius:0, borderColor: "#9E9D9D" }} 
                                       variant="transparentBackground" id="dropdown-basic" >
                        {collectFile.category_name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {
                          collections === []? null: collections.map((item)=>(
                            <Dropdown.Item onClick = {()=>setCollectFile(item)}>{item.category_name}</Dropdown.Item>
                          ))
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                )
                
            }
            
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={(e)=>setShow(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            確認收藏
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default CollectPost;