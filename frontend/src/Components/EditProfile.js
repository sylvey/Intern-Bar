import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../csses/App.css'



function EditProfile(props){

    const [showEditCompany, setShowEditCompany] = useState(false);
    const [place, setPlace] = useState("");

    const handleSubmitOrg = () => {
      setPlace("");
      setShowEditCompany(false);
    }

    return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>新增職務</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <form onSubmit={props.handleSubmit} 
                  className="editProfile">
                <div className="flex marginTopS">
                    <p>職務名稱</p>
                    <input className="marginLeftS"
                           value={props.posName}
                           onChange = {props.setPosName}/>
                </div>
                <div className="flex marginTopS">
                    <p>公司名稱</p>
                    {props.org.name?(
                        <div className = "tagButtonG">{props.org.name}</div>
                        ):(
                        <input className="marginLeftS"
                               value={props.orgName}
                               onChange = {props.setOrgName}/>
                        )
                    }
                </div>
                {
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
                                   onClick = {()=>{props.setOrg(item)}}>{item.name}</div>
                            );
                          })
                        ):null
                      }
                    </div>
                  )
                }
                {
                  showEditCompany?(
                    <>
                    <div className="flex marginTopS marginLeftS">
                      <p>公司地點</p>
                      <input className="marginLeftS"
                             value={place}
                             onChange = {(e)=>setPlace(e.target.value)}/>
                      
                    </div>
                    <div className = "button marginTopS marginRight endSelf"
                         onClick = {handleSubmitOrg}
                         >submit</div>
                    </>
                  ):null
                }
                
                
                <div className="flex marginTopS">
                    <p>開始日期</p>
                    <input type="date" 
                           className="marginLeftS"
                           value={props.startTime}
                           onChange = {props.setStartTime}/>
                </div>
                <div className="flex marginTopS">
                    <p>結束日期</p>
                    <input type="date" 
                           className="marginLeftS"
                           value={props.endTime}
                           onChange = {props.setEndTime}/>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default EditProfile;