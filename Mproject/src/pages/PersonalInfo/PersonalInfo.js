import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from './../Header/Header';
import './PersonalInfo.scss';
import SelectOption from "./../SelectOption/SelectOption";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "./../Footer/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { getProfileRequest } from '../../redux/action/profileActions';

function PersonalInfo() {
  const [data, setData] = useState({
    address: "",
    cv: {
      talent: "",
      description: "",
      language: [],
      experience: "",
    },
    gender: "",
    phone: "",
    name: "",
    avatar: "",
    cv_pdf: null,
    email: "",
  });

  const accessToken = useSelector((state) => state.auth.accessToken);
 
  const dispatch = useDispatch();

  useEffect(() => {
    // Call the API to get the profile data
    dispatch(getProfileRequest(accessToken));
  }, [dispatch, accessToken]);

  const profileData = useSelector((state) => state.profile.profileData);
  useEffect(() => {
    // When the profile data is fetched, update the state
    if (profileData) {
      setData(profileData.data);
    }
  }, [profileData]);
  console.log(profileData)
  const handleSave = () => {
    // Implement your API call here to save the personal information
    // For now, I'm showing a toast to indicate that the data has been saved
    toast.success("Thông tin cá nhân đã được lưu", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
  };

  const handlePasswordChange = () => {
    // Implement password change logic here
    // ...
  };

  return (
    <>
      <Header />
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
                  <Button variant="outline-success" className="change-avatar-btn">
                    Change
                  </Button>
                  <Form style={{ marginLeft: "10px" }}>
                    <Form.Group controlId="formHello">
                      <Form.Label>Chào bạn trở lại: <span style={{ fontSize: "18px", fontWeight: "500" }}>{data.name}</span></Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formHello">
                      <Form.Label>Email: <span style={{ fontSize: "18px", fontWeight: "500" }}>{data.email}</span></Form.Label>
                    </Form.Group>
                  </Form>
                </div>

                <Form style={{ marginTop: "10px" }}>
                  <Form.Group controlId="formName">
                    <Form.Label>Họ và Tên</Form.Label>
                    <Form.Control type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                  </Form.Group>

                  <Form.Group controlId="formGender">
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Control type="text" value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })} />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
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
                      <Button variant="outline-success" className="save-btn" onClick={handleSave}>
                        Save
                      </Button>
                      <ToastContainer />
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
