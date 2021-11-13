import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../csses/App.css'
// import orgs from "../hardData/orgs";
import axios from "axios";



function EditProfile(props){

    
    
    const [orgName, setOrgName] = useState("");
    const [filteredOrg, setFilteredOrg] = useState();
    const [showEditCompany, setShowEditCompany] = useState(false);
    const [orgEmail, setOrgEmail] = useState("");
    const [orgWebsite, setOrgWebsite] = useState("");
    const [org, setOrg] = useState({});
    const [orgSubmitted, setOrgSubmitted] = useState(false);
    const [orgError, setOrgError] = useState(null);


    const [posName, setPosName] = useState("");
    const [filteredPos, setFilteredPos] = useState();
    const [showEditPos, setShowEditPos] = useState(false);
    const [place, setPlace] = useState("");
    const [placeError, setPlaceError] = useState(null);
    const [pos, setPos] = useState({});
    const [posSubmitted, setPosSubmitted] = useState(false);
    const [posError, setPosError] = useState();

    const [startTime, setStartTime] = useState(null);
    const [startError, setStartError] = useState(null);

    const [endTime, setEndTime] = useState(null);
    const [endError, setEndError] = useState(null);

    
    

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
    }

    //filter orgs
    useEffect(() => {
      const fetchData = async()=>{
          let res;
          try {
              res = await axios.post("http://127.0.0.1:8000/api/org/search",{
                  keyword: orgName
              });

              if(res.status === 200){
                  console.log("res.data:", res.data); 
                  setFilteredOrg(res.data); 
              } 
              return;
          }catch(e){
              console.log(e);
          }
      }
      fetchData();
      
    }, [orgName])

    //filter poses
    useEffect(() => {
      if(posName !== "" && orgSubmitted == false){
        setOrgError("請先填入公司名稱，否則無法正確新增職務名稱");
      }
      const fetchData = async()=>{
          let res;
          try {
              res = await axios.post("http://127.0.0.1:8000/api/pos/search",{
                  org_id: org.org_id,
                  keyword: posName
              });

              if(res.status === 200){
                  console.log("res.data:", res.data); 
                  setFilteredPos(res.data); 
              } 
              return;
          }catch(e){
              console.log(e);
          }
      }
      fetchData();
    }, [posName])


    const handleSubmitOrg = (e) => {
      e.preventDefault();
      setShowEditCompany(false);
      setOrgSubmitted(true);
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
                <p>公司名稱</p>
                {org.org_name?(
                    <div className = "tagButtonG">{org.org_name}</div>
                    ):(
                    <input className="marginLeftS"
                           value={orgName}
                           onChange = {handleSetOrg}
                           required/>
                    )
                }
            </div>

            {/* orgtags show */}
            {
              orgName === ""? null:(
                  org.org_name? null :(
                    <div className = "scrollRow centerVertical">  
                      <div className = "tagButton"
                          onClick={()=>{
                            setOrg({org_id: -1, org_name: orgName, email: "", website: ""})
                            setShowEditCompany(true)}}>新增 {orgName}</div>  
                      {
                        filteredOrg? (
                          filteredOrg.map((item)=>{
                            return(
                              <div className = "tagButtonG"
                                   onClick = {()=>{
                                     setOrg(item)
                                     setOrgSubmitted(true)}}>{item.org_name}</div>
                            );
                          })
                        ):null
                      }
                    </div>
                  )
              )
              
            }
            {/* company place edit */}
            {
              showEditCompany?(
                <form>
                  <div className="flex marginTopS marginLeftS">
                    <p>公司信箱</p>
                    <div className = "flex column">
                      <input className="marginLeftS" 
                             value={orgEmail}
                             onChange = {(e)=>setOrgEmail(e.target.value)}/>
                    </div>
                  </div>

                  <div className="flex marginTopS marginLeftS">
                    <p>公司網站</p>
                    <div className = "flex column">
                      <input className="marginLeftS"
                             value = {orgWebsite}
                             onChange = {(e)=>setOrgWebsite(e.target.value)}/>
                    </div>
                  </div>
                  
                  <button
                       type = "submit"
                       className = "button marginTopS marginRight endSelf"
                       onClick = {handleSubmitOrg}
                       >新增</button>
                  
                </form>
              ):null
            }
            {
              orgError == null? null:(
                <div className="marginLeftS" style = {{color:'red'}}>{orgError}</div>
              )
            }

            <div className="flex marginTopS">
                <p>職務名稱</p>
                {pos.pos_name?(
                    <div className = "tagButtonG">{pos.pos_name}</div>
                    ):(
                    <input className="marginLeftS"
                      value={posName}
                      onChange = {(e)=>setPosName(e.target.value)} 
                      required/>
                    )
                } 
            </div>  
            {/* postags show */}
            {
              posName === ""? null:(
                  pos.pos_name? null :(
                    <div className = "scrollRow centerVertical">  
                      <div className = "tagButton"
                          onClick={()=>{
                            setPos({pos_id: -1, pos_name: posName})
                            setShowEditPos(true)
                            }}>新增 {posName}</div>  
                      {
                        filteredPos? (
                          filteredPos.map((item)=>{
                            return(
                              <div className = "tagButtonG"
                                   onClick = {()=>{
                                     setPos(item)
                                     setPosSubmitted(true)}}>{item.pos_name}</div>
                            );
                          })
                        ):null
                      }
                    </div>
                  )
              )
              
            }
            {
              showEditPos?(
                <form>
                  <div className="flex marginTopS marginLeftS">
                    <p>薪資</p>
                    <div className = "flex column">
                      <input className="marginLeftS" 
                             value={orgEmail}
                             onChange = {(e)=>setOrgEmail(e.target.value)}/>
                    </div>
                  </div>

                  <div className="flex marginTopS marginLeftS">
                    <p>公司網站</p>
                    <div className = "flex column">
                      <input className="marginLeftS"
                             value = {orgWebsite}
                             onChange = {(e)=>setOrgWebsite(e.target.value)}/>
                    </div>
                  </div>
                  
                  <button
                       type = "submit"
                       className = "button marginTopS marginRight endSelf"
                       onClick = {handleSubmitOrg}
                       >新增</button>
                  
                </form>
              ):null
            }
            {
              posError == null? null:(
                <div className="marginLeftS" style = {{color:'red'}}>{posError}</div>
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
                </div>
            </div>
            {
              startError == null? null:(
                <div className="marginLeftS" style = {{color:'red'}}>{startError}</div>
              )
            }
            <div className="flex marginTopS">
                <p>結束日期</p>
                <div className = "flex column">
                  <input type="date" 
                         className="marginLeftS"
                         value={props.endTime}
                         onChange = {(e)=>setEndTime(e.target.value)}
                         required/>
                </div>
            </div>
            {
              endError == null? null:(
                <div className="marginLeftS" style = {{color:'red'}}>{endError}</div>
              )
            }
            
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