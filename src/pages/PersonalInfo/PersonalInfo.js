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
    language: [],
    phone: "",
    skill: [],  
  });

  const accessToken = useSelector((state) => state.auth.accessToken);
  const reponse = useSelector(state => state.auth)
  const profileData = useSelector((state) => state.profile.profileData);
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
  reponse.data.userInfoEntity.avatar = data.avatar;
  reponse.data.userInfoEntity.fullName = data.fullName;
  return (
    <>
      <Header userData = {reponse.data.userInfoEntity}/>
  
      <div className="personalinfo">
        <Container>
          <Row>
            <Col xs={4} className="sidebar">
              <SelectOption />
            </Col>
            <Col className="main-content">
              <div className="section">
                <h1 className="section-title">Information</h1>
                <div className="avatar-wrapper">
                <img src={data.avatar} alt="Avatar" className="avatar" />
                <input type="file" onChange={handleFileChange} />
                <Button onClick={handleFileUpload} variant="outline-success">Upload File</Button>
                  <Form style={{ marginLeft: "10px" }}>
                    <Form.Group controlId="formHello">
                      <Form.Label>Chào bạn trở lại: <span style={{ fontSize: "18px", fontWeight: "500" }}>{data.fullName}</span></Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formHello">
                      <Form.Label>Email: <span style={{ fontSize: "18px", fontWeight: "500" }}>{data.email}</span></Form.Label>
                    </Form.Group>
                  </Form>
                </div>

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
                      {/* Button "Upload File" */}
                      
                      <Button onClick= {handleSave} variant="outline-success" className="save-btn" >
                        Save
                      </Button>
                    </div>
                  </Form>
                </Form>
              
                <div className="section">
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
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div style={{ marginTop: "20px" }}></div>
      </div>
      <Footer />
    </>
  );
}

export default PersonalInfo;
