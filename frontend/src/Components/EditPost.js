import React, { useState, useEffect } from "react";
import { Modal, Button, Dropdown, } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import MyPicker from "./Picker";
// import profile from "../hardData/profile";
import MyPicker from "./Picker";
import axios from "axios";


function EditPost(props){

    //post related
    const [howToAddPos, setHowToAddPos] = useState(" add from current position");

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(null);
    const [content, setContent] = useState("");
    const [contentError, setContentError] = useState(null);

    const [exps, setExps] = useState([]);
    const [exp, setExp] = useState({pos:{pos_name: "選擇一個現有的工作經驗", org:{org_name:""}}});
    const [expError, setExpError] = useState(null);

    const setAllStateDefault = ()=>{
        setHowToAddPos(" add from current position");
        setTitle("");
        setTitleError(null);
        setContent("");
        setContentError(null);
        setExp({pos:{pos_name: "選擇一個現有的工作經驗", org:{org_name:""}}});
        setExpError(null);

        setExpSubmitted(false);
        setOrgName("");
        setShowEditCompany(false);
        setOrgEmail("");
        setOrgWebsite("");
        setOrg({});
        setOrgSubmitted(false);
        setOrgError(null);
        setPosName("");
        setShowEditPos(false);
        setSalary();
        setCity({city_name: "請選擇城市"});
        setDist({district_name: "請選擇鄉鎮市區"})
        setPlaceError(null);
        setPos({});
        setPosSubmitted(false);
        setPosError();
        setStartTime(null);
        setStartError(null);
        setEndTime(null);
        setEndError (null);
    }
    const validate = () =>{
        
      if(!expSubmitted || title === "" || content === ""){
          if(title === ""){
              setTitleError("請輸入標題");
          }
          if(content === ""){
              setContentError("請輸入內文");
          }
          if(!expSubmitted){
              setExpError("請選擇貼文相關的實習經驗");
          }
          return false;
      }   
        
        return true;
    }

    const handleSubmit = (e)=>{
        if(validate()){
          console.log("exp:", exp);
          const createPost = async()=>{
                let res;
                try {
                    res = await axios.post("http://127.0.0.1:8000/api/post/create",{
                        publisher: window.sessionStorage.getItem('userId'),
                        title: title,
                        content: content,
                        experience: exp.exp_id,
                    });
                  
                    if(res.status === 201){
                        console.log("success create post");
                        console.log("create post data:", res.data);
                        setAllStateDefault();
                        props.setEditShow(false);
                        alert("新增貼文成功")
                    } 
                    let x;
                    return x;
                }catch(e){
                    console.log(e);
                    alert("新增貼文失敗")
                }    
          }
          createPost();
          
        }   // console.log(howToAddPos, posError);
    }

    useEffect(() => {
      if(title !== ""){
        setTitleError(null);
      }
      if(content !== ""){
        setContentError(null);
      }
      if(exp !== {pos:{pos_name: "選擇一個現有的工作經驗"}}){
        setExpError(null)
      }
    }, [title, content, exp])

    //filter exps
    useEffect(() => {
        const fetchData = async()=>{
          let res;
          try {
              res = await axios.post("http://127.0.0.1:8000/api/user/exp/get",{
                  user_id: window.sessionStorage.getItem('userId'),
              });
            
              if(res.status === 200){
                  console.log("exps", res.data); 
                  setExps(res.data); 
              } 
              return;
          }catch(e){
              console.log(e);
          }
      }
      fetchData();
    }, [])

    //add new exp related-------------------------------
    const [expSubmitted, setExpSubmitted] = useState(false);
    //org related
    const [orgName, setOrgName] = useState("");
    const [filteredOrg, setFilteredOrg] = useState();
    const [showEditCompany, setShowEditCompany] = useState(false);
    const [orgEmail, setOrgEmail] = useState("");
    const [orgWebsite, setOrgWebsite] = useState("");
    const [org, setOrg] = useState({});
    const [orgSubmitted, setOrgSubmitted] = useState(false);
    const [orgError, setOrgError] = useState(null);

    //pos related
    const [posName, setPosName] = useState("");
    const [filteredPos, setFilteredPos] = useState();
    const [showEditPos, setShowEditPos] = useState(false);
    const [salary, setSalary] = useState();
    const [city, setCity] = useState({city_name: "請選擇城市"});
    const [dist, setDist] = useState({district_name: "請選擇鄉鎮市區"})
    const [allCities, setAllCities] = useState();
    const [allDists, setAllDists] = useState();
    const [placeError, setPlaceError] = useState(null);
    const [pos, setPos] = useState({});
    const [posSubmitted, setPosSubmitted] = useState(false);
    const [posError, setPosError] = useState();

    //startime related
    const [startTime, setStartTime] = useState(null);
    const [startError, setStartError] = useState(null);

    //endtime related
    const [endTime, setEndTime] = useState(null);
    const [endError, setEndError] = useState(null);

    const validateExp = () =>{
      if( !posSubmitted || startTime == null || endTime == null || !orgSubmitted){
          if(!posSubmitted){
              setPosError("you haven't finished adding a position");
          }
          if(startTime == null){
              setStartError("you haven't choose a time");
          }
          if(endTime == null){
              setEndError("you haven't choose a time");
          }
          if(!orgSubmitted){
              setOrgError("you haven't finished adding an organization")
          }
          return false;
      }
      
      return true;
    }
    const handleSubmitExp = async (e) =>{
      e.preventDefault();
      if(validateExp()){
          const create = async()=>{
              let res;
              try {
                  res = await axios.post("http://127.0.0.1:8000/api/exp/create",{
                      user_id: window.sessionStorage.getItem('userId'),
                      start_date: startTime,
                      end_date: endTime,
                      pos:pos,
                  });
                
                  if(res.status === 201){
                      console.log("success create exp");
                      console.log("create resdata:", res.data); 
                      let newExp = exp;
                      newExp.exp_id = res.data.exp_id;
                      setExp(newExp);
                  } 
                  return;
              }catch(e){
                  console.log(e);
              }
          }
          await create();
          setExpSubmitted(true);
          
      }
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

    //filter postes
    useEffect(() => {
      if(posName !== "" && orgSubmitted == false){
        setOrgError("請先將公司名稱新增完成，否則無法正確新增職務名稱");
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

    //fetch City Data
    useEffect(() => {
      const fetchData = async()=>{
        try {
            let data = await axios.get("http://127.0.0.1:8000/api/city");

            if(data.status === 200){
                console.log("cities:", data.data); 
                setAllCities(data.data); 
            } 
            return;
        }catch(e){
            console.log(e);
        }
      }
      fetchData();
    }, [city])

    //fetch Dist data
    useEffect(() => {
      console.log("city_id:", city.city_id);
      setDist({district_name: "請選擇鄉鎮市區"});
      const fetchData = async()=>{
        try {
            let data = await axios.post("http://127.0.0.1:8000/api/district",{
              city_id: city.city_id,
            });

            if(data.status === 200){
                console.log("dist:", data.data); 
                setAllDists(data.data); 
            } 
            return;
        }catch(e){
            console.log(e);
        }
      }

      if(city.city_id){
         fetchData();
      }
      
    }, [city])

    //submit org
    const handleSubmitOrg = (e) => {
      e.preventDefault();
      let newOrg = org;
      newOrg.email = orgEmail;
      newOrg.website = orgWebsite;
      setOrg(newOrg);
      setShowEditCompany(false);
      setOrgSubmitted(true);
      console.log("Submit org:", org);
    }

    //submit pos
    const handleSubmitPos = (e) =>{
      e.preventDefault();
      console.log("orginal pos:", pos);
      if(city.city_name !== "請選擇城市"){
        let newPos = pos;
        newPos.salary = parseInt(salary);
        if(dist.district_name === "請選擇鄉鎮市區"){
          newPos.place = allDists[0].district_id;
        }
        else{
          newPos.place = dist.district_id;
        }
        
        setPos(newPos);
        setShowEditPos(false);
        setPosSubmitted(true);
        console.log("submit pos:", pos);
      }
      else{
        setPlaceError("工作地點為必填欄位");
        console.log("avoid success");
      }
    }

    useEffect(() => {
      
      if(posSubmitted){
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
      if(expSubmitted){
        setExpError(null)
      }
      
    }, [posSubmitted, startTime, endTime, orgSubmitted, expSubmitted])

    //add new exp related-----------------------


    return (
    <>
      <Modal show={props.show} onHide={(e)=>{props.setEditShow(false)
                                             setAllStateDefault()}}>
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
                    {exp.pos? exp.pos.pos_name: null}{exp.pos.org.org_name !== ""? " in "+ exp.pos.org.org_name : null}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {
                      exps.map((item)=>(
                        <Dropdown.Item onClick = {()=>{setExp(item); setExpSubmitted(true)}}>{item.pos.pos_name} in {item.pos.org.org_name}</Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
                
                </>
              ):null
              }

              {
                howToAddPos === " add new" ? 
                (
                  <>
                      <>
                      <div className="flex marginTopS">
                          <p>公司名稱</p>
                          {org.org_name?(
                              <div className = "tagButtonG">{org.org_name}</div>
                              ):(
                              <input className="marginLeftS"
                                     value={orgName}
                                     onChange = {(e)=>setOrgName(e.target.value)}
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
                                      setPos({pos_id: -1, pos_name: posName, salary: 0, place: null, org: org})
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
                                       type="number" 
                                       step="1"
                                       min = "0"
                                       value={salary}
                                       onChange = {(e)=>setSalary(e.target.value)}/>
                              </div>
                              <p>元/月</p>
                            </div>
                            <div className="flex marginTopS marginLeftS">
                              <p>工作地點</p>
                              <Dropdown>
                                <Dropdown.Toggle style= {{borderStyle: "solid", borderRadius:0, borderColor: "#9E9D9D", marginLeft:"20px" }} 
                                                 variant="transparentBackground" id="dropdown-basic" >
                                  {city.city_name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {
                                    allCities? allCities.map((item)=>(
                                      <Dropdown.Item onClick = {()=>setCity(item)}>{item.city_name}</Dropdown.Item>
                                    )):null
                                  }
                                </Dropdown.Menu>
                              </Dropdown>
                              <Dropdown>
                                <Dropdown.Toggle style= {{borderStyle: "solid", borderRadius:0, borderColor: "#9E9D9D", marginLeft:"20px"}} 
                                                 variant="transparentBackground" id="dropdown-basic" >
                                  {dist.district_name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {
                                    allDists? allDists.map((item)=>(
                                      item.district_name !== "" ?
                                      (<Dropdown.Item onClick = {()=>setDist(item)}>{item.district_name}</Dropdown.Item>
                                      ): null
                                    )):null
                                  }
                                </Dropdown.Menu>
                              </Dropdown>
                                
                            </div>
                            {
                              placeError == null? null:(
                                <div className="marginLeftS" style = {{color:'red'}}>{placeError}</div>
                              )
                            }

                            <button
                                 type = "submit"
                                 className = "button marginTopS marginRight endSelf"
                                 onClick = {handleSubmitPos}
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
                            {
                              expSubmitted?(
                                <div className = "marginLeftS">{startTime? startTime: null}</div>
                              ):(
                                <input type="date" 
                                    className="marginLeftS"
                                    value={startTime}
                                    onChange = {(e)=>setStartTime(e.target.value)}
                                    required/>
                              )
                            }
                            
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
                            {
                              expSubmitted?(
                                <div className = "marginLeftS">{endTime? endTime:null}</div>
                                ):(
                                <input type="date" 
                                  className="marginLeftS"
                                  value={props.endTime}
                                  onChange = {(e)=>setEndTime(e.target.value)}
                                  required/>)
                            }
                            
                          </div>
                      </div>
                      {
                        endError == null? null:(
                          <div className="marginLeftS" style = {{color:'red'}}>{endError}</div>
                        )
                      }
                      {
                        expSubmitted? null: (
                          <div
                            onClick = {handleSubmitExp}
                            className = "button marginTopS marginRight endSelf"
                            >確認職務無誤</div>
                        )
                      }
                      
                      </>

                  </>
                ):null
              }
              {
                expError == null? null:(
                  <div className="marginLeftS" style = {{color:'red'}}>{expError}</div>
                )
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
          <Button variant="secondary" onClick={(e)=>{props.setEditShow(false)
                                                     setAllStateDefault()}}>
            取消
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            發布貼文
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default EditPost;