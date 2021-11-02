import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../csses/App.css'



function EditProfile(props){

    const [showEditCompany, setShowEditCompany] = useState(false);
    const [place, setPlace] = useState("");
    const [placeError, setPlaceError] = useState(null);

    const validate = () => {
      if(place === ""){
        setPlaceError("you must fill this field");
        return false;
      }
      return true;
    }
    const handleSubmitOrg = (e) => {
      e.preventDefault();
      if(validate()){
        setPlace("");
        setShowEditCompany(false);
        props.setOrgSubmitted(true);
      }
      
    }

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
                         value={props.posName}
                         onChange = {props.setPosName} 
                         required/>
                  {
                    props.posError == null? null:(
                      <div className="marginLeftS" style = {{color:'red'}}>{props.posError}</div>
                    )
                  }
                </div>
            </div>
            <div className="flex marginTopS">
                <p>公司名稱</p>
                {props.org.name?(
                    <div className = "tagButtonG">{props.org.name}</div>
                    ):(
                    <input className="marginLeftS"
                           value={props.orgName}
                           onChange = {props.setOrgName}
                           required/>
                    )
                }
            </div>
            {
              props.orgName === ""? null:(
                  props.org.name? null :(
                    <div className = "scrollRow centerVertical">  
                      <div className = "tagButton"
                          onClick={()=>{
                            props.setOrg({id:100, name: props.orgName})
                            setShowEditCompany(true)}}>新增 {props.orgName}</div>  
                      {
                        props.filtered? (
                          props.filtered.map((item)=>{
                            return(
                              <div className = "tagButtonG"
                                   onClick = {()=>{
                                     props.setOrg(item)
                                     props.setOrgSubmitted(true)}}>{item.name}</div>
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
              props.orgError == null? null:(
                <div className="marginLeftS" style = {{color:'red'}}>{props.orgError}</div>
              )
            }
            
            
            <div className="flex marginTopS">
                <p>開始日期</p>
                <div className = "flex column">
                  <input type="date" 
                         className="marginLeftS"
                         value={props.startTime}
                         onChange = {props.setStartTime}
                         required/>
                  {
                    props.startError == null? null:(
                      <div className="marginLeftS" style = {{color:'red'}}>{props.startError}</div>
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
                         onChange = {props.setEndTime}
                         required/>
                  {
                    props.endError == null? null:(
                      <div className="marginLeftS" style = {{color:'red'}}>{props.endError}</div>
                    )
                  }
                </div>
            </div>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant= "primary" onClick = {props.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
    // </form>
    
    );
}

export default EditProfile;