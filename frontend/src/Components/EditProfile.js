import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../csses/App.css'
import orgs from "../hardData/orgs";



function EditProfile(props){

    const [showEditCompany, setShowEditCompany] = useState(false);
    const [place, setPlace] = useState("");
    const [placeError, setPlaceError] = useState(null);

    const [posName, setPosName] = useState("");
    const [posError, setPosError] = useState();
    const [orgName, setOrgName] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [startError, setStartError] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [endError, setEndError] = useState(null);
    const [filtered, setFiltered] = useState(orgs);
    const [org, setOrg] = useState({});
    const [orgSubmitted, setOrgSubmitted] = useState(false);
    const [orgError, setOrgError] = useState(null);

    const validate = () =>{
        if(posName === "" || startTime == null || endTime == null || !orgSubmitted){
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
            return false;
        }
        
        return true;
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(validate()){
            props.setEditShow(false);
        }
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

    const validateOrg = () => {
      if(place === ""){
        setPlaceError("you must fill this field");
        return false;
      }
      return true;
    }
    const handleSubmitOrg = (e) => {
      e.preventDefault();
      if(validateOrg()){
        setPlace("");
        setShowEditCompany(false);
        setOrgSubmitted(true);
      }
      
    }

    useEffect(() => {
      
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
      
    }, [posName, startTime, endTime, orgSubmitted])


    return (
    // <form onSubmit = {props.handleSubmit}>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>新增職務</Modal.Title>
        </Modal.Header>
        <Modal.Body >
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
                         value={props.endTime}
                         onChange = {(e)=>setEndTime(e.target.value)}
                         required/>
                  {
                    endError == null? null:(
                      <div className="marginLeftS" style = {{color:'red'}}>{endError}</div>
                    )
                  }
                </div>
            </div>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant= "primary" onClick = {handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    // </form>
    
    );
}

export default EditProfile;