import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



function EditPost(props){

    return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>新增貼文</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <form onSubmit={props.handleSubmit} 
                  className="editPost">
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
                    <input className="marginLeftS"/>
                </div>
                <div className="flex marginTopS">
                    <p>標題</p>
                    <input className="marginLeftS"/>
                </div>
                <div className="flex marginTopS">
                    <p>內文</p>
                    <textarea className="marginLeftS" 
                           cols="40" rows="7"/>
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

export default EditPost;