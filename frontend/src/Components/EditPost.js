import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown, } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import MyPicker from "./Picker";
import profile from "../hardData/profile";
import MyPicker from "./Picker";
import orgs from "../hardData/orgs";


function EditPost(props){

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(null);
    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState(null);

    const [position, setPosition] = useState("choose a current position");
    const [positionError, setPositionError] = useState(null);
    
    const [posName, setPosName] = useState("");
    const [posError, setPosError] = useState(null);
    const [org, setOrg] = useState({});
    const [orgName, setOrgName] = useState("");
    const [orgError, setOrgError] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [startError, setStartError] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [endError, setEndError] = useState(null);

    const [filtered, setFiltered] = useState(orgs);
    const [showEditCompany, setShowEditCompany] = useState(false);
    const [orgSubmitted, setOrgSubmitted] = useState(false);
    const [place, setPlace] = useState("");
    const [placeError, setPlaceError] = useState(null);

    const validate = () =>{
        if(howToAddPos === " add from current position"){
          if(position === "choose a current position" 
            || content === ""
            || title === ""){
                if(position === "choose a current position"){
                  setPositionError("please choose one position");

                }
                if(content === ""){
                    setContentError("please fill in this content");
                }
                if(title === ""){
                    setTitleError("please fill in your title");
                }

                return false;
            }
        }
        else if(howToAddPos === " add new"){
          if(posName === "" || startTime == null || endTime == null || !orgSubmitted
            || content === "" || title === ""){
              if(posName === ""){
                  setPosError("you must fill this field");
              }
              if(startTime == null){
                  setStartError("you haven't choose a time");
              }
              if(endTime == null){
                  setEndError("you haven't choose a time");
              }
              if(!orgSubmitted){
                  setOrgError("you haven't finish adding an organization")
              }
              if(content === ""){
                  setContentError("please fill in this content");
              }
              if(title === ""){
                  setTitleError("please fill in your title");
              }
              return false;
          }
          
          
        }
        return true;
    }

    const handleSubmit = (e)=>{
        console.log(validate());
        if(validate()){
          console.log("here");
          setTitle("");
          setContent("");
          props.setEditShow(false);
          console.log(props.show)
        }
        console.log(howToAddPos, posError);
    }

    const handleSetOrg = (e) =>{
        setOrgName(e.target.value);
        // console.log(orgName);
        let tempt = orgs.filter((item)=>{
            if(item.name.includes(e.target.value)){
                return item;
            }
        });
        setFiltered(tempt);
        console.log(tempt);
    }

    const validatePlace = () => {
      if(place === ""){
        setPlaceError("you must fill this field");
        return false;
      }
      return true;
    }
    const handleSubmitOrg = (e) => {
      e.preventDefault();
      if(validatePlace()){
        setPlace("");
        setShowEditCompany(false);
        setOrgSubmitted(true);
      }
      
    }


    const [howToAddPos, setHowToAddPos] = useState(" add from current position");

    useEffect(() => {
      if(title !== ""){
        setTitleError(null);
      }
      if(content !== ""){
        setContentError(null);
      }
      if(posName !== ""){
        setPosError(null);
      }
      if(startTime !== null){
          setStartError(null);
      }
      if(endTime !== null){
          setEndError(null);
      }
      if(orgSubmitted){
          setOrgError(null)
      }
      if(position !== "choose a current position"){
        setPositionError(null);
      }
      
    }, [title, content, posName, startTime, endTime, orgSubmitted, position])

    return (
    <>
      <Modal show={props.show} onHide={(e)=>props.setEditShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>新增貼文</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            {
              howToAddPos === " add from current position" ? 
              (
                <>
                <Dropdown>
                  <Dropdown.Toggle variant="transparentBackground" id="dropdown-basic" >
                    {position}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {
                      profile.map((item)=>(
                        <Dropdown.Item onClick = {()=>setPosition(item.posName)}>{item.posName}</Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
                {
                  positionError == null? null:(
                    <div className="marginLeftS" style = {{color:'red'}}>{positionError}</div>
                  )
                }
                </>
              ):null
              }

              {
                howToAddPos === " add new" ? 
                (
                <>
                  <div className="flex marginTopS">
                      <p>職務名稱</p>
                      <div className = "flex column">
                        <input className="marginLeftS"
                               value={posName}
                               onChange = {(e)=>setPosName(e.target.value)} 
                               required/>
                        {
                          posError == null? null:(
                            <div className="marginLeftS" style = {{color:'red'}}>{posError}</div>
                          )
                        }
                      </div>
                  </div>
                  <div className="flex marginTopS">
                      <p>公司名稱</p>
                      {org.name?(
                          <div className = "tagButtonG">{org.name}</div>
                          ):(
                          <input className="marginLeftS"
                                 value={orgName}
                                 onChange = {handleSetOrg}
                                 required/>
                          )
                      }
                  </div>
                  {
                    orgName === ""? null:(
                        org.name? null :(
                          <div className = "scrollRow centerVertical">  
                            <div className = "tagButton"
                                onClick={()=>{
                                  setOrg({id:100, name: orgName})
                                  setShowEditCompany(true)}}>新增 {orgName}</div>  
                            {
                              filtered? (
                                filtered.map((item)=>{
                                  return(
                                    <div className = "tagButtonG"
                                         onClick = {()=>{
                                           setOrg(item)
                                           setOrgSubmitted(true)}}>{item.name}</div>
                                  );
                                })
                              ):null
                            }
                          </div>
                        )
                    )
                    
                  }
                  {
                    showEditCompany?(
                      <form>
                        <div className="flex marginTopS marginLeftS">
                          <p>公司地點</p>
                          <div className = "flex column">
                            <input className="marginLeftS"
                                   value={place}
                                   onChange = {(e)=>setPlace(e.target.value)}
                                   required/>
                            {
                              placeError == null? null:(
                                <div className="marginLeftS" style = {{color:'red'}}>{placeError}</div>
                              )
                            }
                          </div>
                        </div>

                        <button
                             type = "submit"
                             className = "button marginTopS marginRight endSelf"
                             onClick = {handleSubmitOrg}
                             >submit</button>

                      </form>
                    ):null
                  }
                  {
                    orgError == null? null:(
                      <div className="marginLeftS" style = {{color:'red'}}>{orgError}</div>
                    )
                  }
                  <div className="flex marginTopS">
                      <p>開始日期</p>
                      <div className = "flex column">
                            <input type="date" 
                                   className="marginLeftS"
                                   value={startTime}
                                   onChange = {(e)=>setStartTime(e.target.value)}
                                   required/>
                            {
                              startError == null? null:(
                                <div className="marginLeftS" style = {{color:'red'}}>{startError}</div>
                              )
                            }
                          </div>
                  </div>
                  <div className="flex marginTopS">
                      <p>結束日期</p>
                      <div className = "flex column">
                        <input type="date" 
                               className="marginLeftS"
                               value={endTime}
                               onChange = {(e)=>setEndTime(e.target.value)}
                               required/>
                        {
                          endError == null? null:(
                            <div className="marginLeftS" style = {{color:'red'}}>{endError}</div>
                          )
                        }
                      </div>
                  </div>
                </>
                ):null
              }
              
            

        
            <MyPicker 
                value = {howToAddPos}
                setValue = {setHowToAddPos}
                choices = {[" add from current position", " add new"]}/>

            <div className="flex marginTopS">
                <p>標題</p>
                <div className = "flex column">
                  <input className="marginLeftS" 
                          value = {title}
                          onChange = {(e)=>setTitle(e.target.value)}/>
                  
                  {
                    titleError == null? null:(
                      <div className="marginLeftS" style = {{color:'red'}}>{titleError}</div>
                    )
                  }
                </div>
            </div>
            <div className="flex marginTopS">
                <p>內文</p>
                <div className = "flex column">
                  <textarea className="marginLeftS" 
                         cols="40" rows="7" 
                         value = {content}
                         onChange = {(e)=>setContent(e.target.value)}/>
                  {
                    contentError == null? null:(
                      <div className="marginLeftS" style = {{color:'red'}}>{contentError}</div>
                    )
                  }
                </div>
            </div>
            
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={(e)=>props.setEditShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default EditPost;