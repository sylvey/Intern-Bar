import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown, } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import MyPicker from "./Picker";
import profile from "../hardData/profile";
import MyPicker from "./Picker";
function EditPost(props){

    const [howToAddPos, setHowToAddPos] = useState(" add from current position");
    const handleSetHowToAdd = (value) =>{
      setHowToAddPos(value);
    }

    useEffect(() => {
     console.log(profile); 
    })
    return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>新增貼文</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            {
              howToAddPos === " add from current position" ? 
              (
                <Dropdown>
                  <Dropdown.Toggle variant="transparentBackground" id="dropdown-basic" >
                    {props.position}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {
                      profile.map((item)=>(
                        <Dropdown.Item onClick = {()=>props.setPosition(item.posName)}>{item.posName}</Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              ):(
                <>
                <div>add new</div> 
                </>

              )
            }
        
            <MyPicker 
                value = {howToAddPos}
                setValue = {setHowToAddPos}
                firstValue = " add from current position"
                secondValue = " add new"  />
            <div className="flex marginTopS">
                <p>標題</p>
                <div className = "flex column">
                  <input className="marginLeftS" 
                          value = {props.title}
                          onChange = {props.setTitle}/>
                  
                </div>
            </div>
            <div className="flex marginTopS">
                <p>內文</p>
                <div className = "flex column">
                  <textarea className="marginLeftS" 
                         cols="40" rows="7" 
                         value = {props.content}
                         onChange = {props.setContent}/>
                </div>
            </div>
            
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default EditPost;