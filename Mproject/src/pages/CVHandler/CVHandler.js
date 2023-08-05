import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from './../Header/Header';
import userData from '../../data/userData.json';
import accountData from '../../data/account.json';
import './CVHandler.scss';

import { ToastContainer, toast } from 'react-toastify';
import { Document, Page } from 'react-pdf';

import { BsUpload } from 'react-icons/bs';
import CVSelect from "./../CVSelect/CVSelect";
import Footer from "./../Footer/Footer";


function CVHandler() {
  const [name, setName] = useState(userData.name);
  const [gender, setGender] = useState(userData.gender);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [address, setAddress] = useState(userData.address);
  const [language, setLanguage] = useState('');
  const [experience, setExperience] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };
  const handleSavePersonalInfo = () => {
    // Thực hiện lưu thông tin cá nhân
    toast.success("Thông tin cá nhân đã được lưu", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
  };

  const handleSaveCVDetails = () => {
    // Thực hiện lưu thông tin CV
    toast.success("Thông tin CV đã được lưu", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
  };

  return (
    <>
    <Header />
    <div className = "cvhandler">
      <Container>
        <Row>
          <Col xs={2} className="sidebar">
            <CVSelect/>
          </Col>
          <Col xs={3} className="main-content">
          <div className="section">
                <h1 className="section-title">Information</h1>
                <div className="avatar-wrapper">
                    <div className="info-wrapper">
                    <img src={userData.avatar} alt="Avatar" className="avatar" />
                    
                    </div>
                    <Button variant="outline-success" className="change-avatar-btn">
                    Change
                    </Button>
                    <div className = "info-wrapper">
                    <Form >
                        <Form.Group controlId="formHello">
                        <Form.Label>Chào bạn trở lại:</Form.Label>
                        <Form.Label style={{ fontSize: "18px", fontWeight: "500" }}>{name}</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="formUsername">
                        <Form.Label>User Name:</Form.Label>
                        <Form.Label style={{ fontSize: "18px", fontWeight: "500" }}>{accountData.username}</Form.Label>
                        </Form.Group>
                    </Form>
                    </div>
                </div>
                </div>

            <div className="section">
              <h1 className="section-title">Upload CV</h1>
              <div className="cv-upload-section">
              <label htmlFor="pdf-upload" className="upload-button">
                    <BsUpload />
                    Upload PDF
                </label>
                <input
                    id="pdf-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
                {file && (
                    <div>
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p>
                    </div>
                )}
              </div>
            </div>
          </Col>
          <Col xs={7} className="main-content">
            <div className="section">
              <h1 className="section-title">Personal Information</h1>
              <Form style={{ marginTop: "10px" }}>
                <Form.Group controlId="formName">
                  <Form.Label>Họ và Tên</Form.Label>
                  <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formGender">
                  <Form.Label>Giới tính</Form.Label>
                  <Form.Control type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPhone">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formAddress">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>

                <Form style={{ marginTop: "10px" }}>
                  {/* Form content */}
                  <div className="d-flex justify-content-end">
                    {/* Button "Save" */}
                    <Button variant="outline-success" className="save-btn" onClick={handleSavePersonalInfo}>
                      Save
                    </Button>
                    <ToastContainer />
                  </div>
                </Form>
              </Form>
            </div>
            <div className="section">
              <h1 className="section-title cv-details-title">CV Details</h1>
              <Form style={{ marginTop: "10px" }}>
                <Form.Group controlId="formLanguage">
                  <Form.Label>Ngôn ngữ</Form.Label>
                  <Form.Control type="text" placeholder="Nhập ngôn ngữ" value={language} onChange={(e) => setLanguage(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formExperience">
                  <Form.Label>Kinh nghiệm</Form.Label>
                  <Form.Control type="text" placeholder="Nhập kinh nghiệm" value={experience} onChange={(e) => setExperience(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formDescription">
                  <Form.Label>Mô tả sơ lược</Form.Label>
                  <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>

                <Form style={{ marginTop: "10px" }}>
                  {/* Form content */}
                  <div className="d-flex justify-content-end">
                    {/* Button "Save" */}
                    <Button variant="outline-success" className="save-btn" onClick={handleSaveCVDetails}>
                      Save
                    </Button>
                    <ToastContainer />
                  </div>
                </Form>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer/>
    </>
  );
}

export default CVHandler;
