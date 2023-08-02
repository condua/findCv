// EmailVerificationModal.js
import React from 'react';
import { useState,useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import './Eventtest.scss'; // Import custom CSS file

const Eventtest = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{color:'black'}}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{display:'flex',flexDirection:'column'}}>
          <p style={{marginBottom:'20px'}}>Vui lòng nhập mã xác thực vào đây</p>
          <input type='text' placeholder='Your verification code' style={{border:'1px solid black',height:'50px',borderRadius:'30px',textAlign:'center'}}/>
        
        
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleClose} style={{color:'black'}}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Eventtest;
