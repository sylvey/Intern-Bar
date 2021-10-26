import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



function EditProfile(props){

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
                    <input className="marginLeftS"/>
                </div>
                <div className="flex marginTopS">
                    <p>公司名稱</p>
                    <input className="marginLeftS"/>
                </div>
                <div className="flex marginTopS">
                    <p>地點名稱</p>
                    <input className="marginLeftS"/>
                </div>
                <div className="flex marginTopS">
                    <p>開始日期</p>
                    <input type="date" className="marginLeftS"/>
                </div>
                <div className="flex marginTopS">
                    <p>結束日期</p>
                    <input type="date" className="marginLeftS"/>
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