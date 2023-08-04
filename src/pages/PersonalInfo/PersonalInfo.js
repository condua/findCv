import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from './../Header/Header';
import './PersonalInfo.scss';
import SelectOption from "./../SelectOption/SelectOption";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "./../Footer/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { getProfileRequest, updateProfileRequest } from '../../redux/action/profileActions';
// import { uploadAvatarRequest } from '../../redux/action/uploadAvatarActions';
import axios from 'axios'

function PersonalInfo() {
  const [data, setData] = useState({
    address: "",
    avatar: "",
    cv_pdf: null,
    email: "",
    experience: "",
    fullName: "",
    gender: "",
    language: "",
    phone: "",
    skill: "",  
  });

  const accessToken = useSelector((state) => state.auth.accessToken);
  const reponse = useSelector(state => state.auth)
  const profileData = useSelector((state) => state.profile.profileData);
  console.log("USER DATA", profileData)
  // const {avatarUrl} = useSelector((state) => state.uploadAvatar);
  
  // console.log(avatarUrl)
  const test = useSelector((state) => state.uploadAvatar);
  // console.log(test)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileRequest(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (profileData) {
      setData(profileData.data);
    }
  }, [profileData]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [contentToShow, setContentToShow] = useState('Content 1'); // State to hold the content to be shown

  const handleButtonClick = (buttonContent) => {
    setContentToShow(buttonContent); // Set the content to be shown based on the button clicked
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  

  const handleFileUpload = async () => {
    try {
      const profileURL = "https://qltd01.cfapps.us10-001.hana.ondemand.com/profile/upload/avatar";
      const formData = new FormData();
      formData.append('file', selectedFile);
      const response = await axios.post(profileURL, formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log('Upload Success:', response.data);
      setData(response.data.data);
      
    } catch (error) {
      console.error('Upload Error:', error);
    }
  };
  // const handleSave = async () => {
  //   try {
  //     console.log("UPDATA DATA",data)
  //     const updateURL = "https://qltd01.cfapps.us10-001.hana.ondemand.com/profile";
  //     const response = await axios.put(updateURL, data, {
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`
  //       }
  //     });
  //     console.log('Update Success:', response);
  //     toast.success("Personal information updated successfully", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
  //   } catch (error) {
  //     console.error('Update Error:', error);
  //     toast.error("Failed to update personal information", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
  //   }
  // };
  const handleSave = () => {
    try {
      console.log("UPDATA DATA",data)
      console.log("ACCESS TOKEN", accessToken)
      dispatch(updateProfileRequest(accessToken, data));
      
      toast.success("Personal information updated successfully", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
      dispatch(getProfileRequest(accessToken))
    } catch (error) {
      console.error('Update Error:', error);
      toast.error("Failed to update personal information", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    }
  };
  // const handleSave = () => {
  //   toast.success("Thông tin cá nhân đã được lưu", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
  // };
  const handlePasswordChange = () => {
  };
  reponse.data.userInfo.avatar = data.avatar;
  reponse.data.userInfo.fullName = data.fullName;
  return (
    <>
    <Header userData = {reponse.data.userInfo}/>
    <div className = "personalinfo" >
      <Container>
        <Row>
          <Col className="sidebar" style = {{height:"200px",width: "14%", marginRight: "1%"}}>
            <SelectOption/>
          </Col>
          <Col xs = {10} className = "newmain" style = {{width: "85%", backgroundColor: "white", boxShadow: "0px 10px 10px 0px rgba(0,0,0,0.15)"}}>
            <Row style = {{width: "100%", marginTop: "25px"}}>
            <div class="newcontainer" style = {{width: "98%", marginLeft: "1%", marginRight: "1%", backgroundColor: "white", borderRadius: "1px solid #dce0e2", marginBottom: "20px"}}>
              <div class="image-newcontainer">
                <img src="https://images.unsplash.com/photo-1532767153582-b1a0e5145009?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Image" />
              </div>
              <div class="circle-image-newcontainer">
                <img class="circle-imagenew" src={data.avatar} alt="Circle Image"  />
              </div>
              <div class="newcontent" style = {{width: "100%"}}>
                <Container style = {{width: "100%"}}>
                  <Row >
                    <Col xs = {2}> 
                    </Col>
                    <Col xs = {5} style = {{paddingLeft: "5%"}}>
                    <Form >
                      <Form.Group controlId="formHello">
                        <Form.Label style={{ fontSize: "24px", fontWeight: "900" , fontFamily: "Poppins", lineHeight: "0.5"}}>{data.fullName}</Form.Label>
                        </Form.Group>
                      <Form.Group controlId="formUsername">
                        <Form.Label style={{ fontSize: "16px", fontWeight: "200" , fontFamily: "Poppins", lineHeight: "1" }}>{data.email}</Form.Label>
                        </Form.Group>
                    </Form>
                    </Col>
                    <Col xs = {5} style = {{height: "100%"}}>
                      <Row style = {{marginTop: "0px", marginLeft: "35%"}}>
                        <input type="file" onChange={handleFileChange} />
                        
                      </Row>
                      <Row  style = {{marginTop: "5px", marginLeft: "35%"}}>
                      <Button onClick={handleFileUpload} variant="outline-success" className="change-avatar-btn" style = {{width: "140px", marginTop: "0px", borderRadius: "20px"}}>
                        Change Image
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                  
                  <Row style = {{marginTop: "0px"}}>
                  <hr/> 
                    <Col xs = {4} style = {{borderRight: "1px solid #c5c8c9", marginTop: "15px"}}>         
                      <p style = {{fontSize: "20px", fontWeight: "600"}}> Introduce</p> 
                      <p>I think listening to music is my hobby. I love listening to all kind of music when I do my housework, when I do not have anything to do, or even when I have meal. I love all kinds of music; country, pop, rock and roll, and other kind of music.</p>
                    </Col>
                  
                    <Col xs = {8}> 
                      <Row>
                      <div style = {{display: "flex", marginTop: "15px", marginBottom: "10px"}}>
                      <Button variant = "outline-primary" onClick={() => handleButtonClick('Content 1')}>Personal Info</Button>
                      <Button variant = "outline-primary" onClick={() => handleButtonClick('Content 2')}>Password</Button>
                      </div>
                      {contentToShow === 'Content 1' && (
                        <div className="Content 1">
                        <h1 className="section-title">Personal Information</h1>
                        <Form style={{ marginTop: "10px" }}>
                          <Form.Group controlId="formName">
                              <Form.Label>Họ và Tên</Form.Label>
                              <Form.Control type="text" value={data.fullName} onChange={(e) => setData({ ...data, fullName: e.target.value })} />
                            </Form.Group>
          
                            <Form.Group controlId="formGender">
                              <Form.Label>Giới tính</Form.Label>
                              <Form.Control type="text" value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} />
                            </Form.Group>
          
                            <Form.Group controlId="formEmail">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                value={data.email}
                                readOnly // Thêm readOnly vào đây để trường input chỉ đọc
                              />
                            </Form.Group>
          
                            <Form.Group controlId="formPhone">
                              <Form.Label>Số điện thoại</Form.Label>
                              <Form.Control type="text" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
                            </Form.Group>
          
                            <Form.Group controlId="formAddress">
                              <Form.Label>Địa chỉ</Form.Label>
                              <Form.Control type="text" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
                            </Form.Group>
          
          
                          <Form style={{ marginTop: "10px" }}>
                            {/* Form content */}
                            <div className="d-flex justify-content-end">
                              {/* Button "Save" */}
                              <Button variant="outline-success" className="save-btn" onClick= {handleSave}>
                                Save
                              </Button>
                              {/* <ToastContainer /> */}
                            </div>
                          </Form>
                        </Form>
                      </div>
                      )}

                      {contentToShow === 'Content 2' && (
                        <div className="Content 2">
                          <Row>
                          <h1 className="section-title">Password</h1>
                  <Form>
                    <Form.Group controlId="formCurrentPassword">
                      <Form.Label>Mật khẩu hiện tại</Form.Label>
                      <Form.Control type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="formNewPassword">
                      <Form.Label>Mật khẩu mới</Form.Label>
                      <Form.Control type="password" value={data.newPassword} onChange={(e) => setData({ ...data, newPassword: e.target.value })} />
                    </Form.Group>

                    <Form.Group controlId="formConfirmPassword">
                      <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                      <Form.Control type="password" value={data.confirmPassword} onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
                    </Form.Group>

                    <Form style={{ marginTop: "10px" }}>
                      {/* Form content */}
                      <div className="d-flex justify-content-end">
                        {/* Button "Save" */}
                        <Button variant="outline-success" className="change-password-btn" onClick={handlePasswordChange}>
                          Change Password
                        </Button>
                        <ToastContainer />
                      </div>
                    </Form>
                  </Form>
                          </Row>
                        </div>
                      )}
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>


            </Row>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer/>
    </>
  );
}

export default PersonalInfo;
