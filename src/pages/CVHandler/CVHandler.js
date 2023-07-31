import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from './../Header/Header';
import userData from '../../data/userData.json';
import accountData from '../../data/account.json';
import './CVHandler.scss';

import { ToastContainer, toast } from 'react-toastify';

import { BsUpload, BsDownload } from 'react-icons/bs';
import CVSelect from "./../CVSelect/CVSelect";
import Footer from "./../Footer/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { getProfileRequest, updateProfileRequest } from '../../redux/action/profileActions';

import axios from 'axios'

function CVHandler() {
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
  const [selectedCvFile,setSelectedCvFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleCVFileChange = (event) => {
    setSelectedCvFile(event.target.files[0]);
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
  const handleCVFileUpload = async () => {
    try {
      const profileURL = "https://qltd01.cfapps.us10-001.hana.ondemand.com/profile/upload/cv";
      const formData = new FormData();
      formData.append('file', selectedCvFile);
      const response = await axios.post(profileURL, formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      console.log('Upload Success:', response.data);
      setData({ ...data, cv_pdf: response.data.data.cv_pdf });
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
  
  const handleCVInfoSave = () => {
    try {
      console.log("UPDATA DATA",data)
      console.log("ACCESS TOKEN", accessToken)
      dispatch(updateProfileRequest(accessToken, data));
      toast.success("CV information updated successfully", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    } catch (error) {
      console.error('Update Error:', error);
      toast.error("Failed to update CV information", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    }
  };
  // const handleSave = () => {
  //   toast.success("Thông tin cá nhân đã được lưu", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
  // };
  const handlePasswordChange = () => {
  };
  reponse.data.userInfoEntity.avatar = data.avatar;
  reponse.data.userInfoEntity.fullName = data.fullName;

  const handleSaveCVDetails = () => {
    // Thực hiện lưu thông tin CV
    toast.success("Thông tin CV đã được lưu", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
  };
  const handlePDFLinkClick = () => {
    // Mở file PDF trong một tab mới khi người dùng nhấp vào link
    window.open(data.cv_pdf, '_blank');
  };
  return (
    <>
    <Header userData = {reponse.data.userInfoEntity}/>
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
                    <img src={data.avatar} alt="Avatar" className="avatar" 
                    style = {{marginLeft: "30%"}}
                    />
                    <input type="file" onChange={handleFileChange} />
                    
                    </div>
                    <Button onClick={handleFileUpload} variant="outline-success" className="change-avatar-btn">
                    Change
                    </Button>
                    <div className = "info-wrapper">
                    <Form >
                        <Form.Group controlId="formHello">
                        <Form.Label>Chào bạn trở lại:</Form.Label>
                        <Form.Label style={{ fontSize: "18px", fontWeight: "500" }}>{data.fullName}</Form.Label>
                        </Form.Group>
                        <Form.Group controlId="formUsername">
                        <Form.Label>Email:</Form.Label>
                        <Form.Label style={{ fontSize: "18px", fontWeight: "500" }}>{data.email}</Form.Label>
                        </Form.Group>
                    </Form>
                    </div>
                </div>
                </div>

                <div className="section">
  <h1 className="section-title">Upload CV</h1>
  <div className="cv-upload-section">
    <Col>
      <Row>
        <Col >
          {data.cv_pdf ? (
            <a href={data.cv_pdf} target="_blank" rel="noopener noreferrer" style={{ margin: '0 auto', display: 'flex', marginLeft: '90px', textDecoration: 'none' }}>
              CV_PDF_UPLOAD
            </a>
          ) : (
            <label htmlFor="pdf-upload" className="upload-button" style={{ margin: '0 auto', display: 'flex', marginLeft: '90px' }}>
              <BsUpload style={{ marginTop: '3px' }} />
              <span style={{ marginLeft: '10px' }}>Upload PDF</span>
            </label>
          )}
          <input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleCVFileChange}
            style={{ display: 'none' }} // Ẩn input file khi không cần thiết
          />
        </Col>
        <Col style = {{marginTop: "10px"}}>
          <Button
            onClick={handleCVFileUpload}
            variant="outline-success"
            className="change-avatar-btn"
            style={{ width: '40%', margin: '0 auto', marginLeft: "90px" }}
          >
            Upload
          </Button>
          {data.cv_pdf && (
            <Col style = {{marginTop: "10px"}}>
              <Button
                href={data.cv_pdf}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-success"
                style={{ marginTop: '10px', width: '40%', margin: '0 auto', marginLeft: "90px" }}
              >
                Download
              </Button>
            </Col>
          )}
        </Col>
      </Row>
    </Col>
  </div>
</div>


          </Col>
          <Col xs={7} className="main-content">
            <div className="section">
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
                <Form.Control
                  type="text"
                  placeholder="Nhập ngôn ngữ"
                  value={data.language?.join(", ") || ""} // Sử dụng optional chaining và trả về chuỗi rỗng nếu data.language là null hoặc undefined
                  onChange={(e) =>
                    setData({
                      ...data,
                      language: e.target.value.split(", "),
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formSoftSkills">
                    <Form.Label>Kĩ Năng</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập kĩ năng"
                      value={data.skill?.join(", ") || ""} // Sử dụng optional chaining và trả về chuỗi rỗng nếu data.language là null hoặc undefined
                      onChange={(e) =>
                        setData({
                          ...data,
                          skill: e.target.value.split(", "),
                        })
                      }
                    />
              </Form.Group>


              <Form.Group controlId="formExperience">
                    <Form.Label>Kinh nghiệm</Form.Label>
                    <Form.Control type="text" placeholder="Nhập kinh nghiệm" value={data.experience} onChange={(e) => setData({ ...data, experience: e.target.value })} />
                  </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Mô tả sơ lược</Form.Label>
                  <Form.Control as="textarea" rows={3}   />
                  {/* value={description} onChange={(e) => setDescription(e.target.value)} */}
                </Form.Group>

                <Form style={{ marginTop: "10px" }}>
                  {/* Form content */}
                  <div className="d-flex justify-content-end">
                    {/* Button "Save" */}
                    <Button variant="outline-success" className="save-btn" onClick= {handleCVInfoSave}>
                      Save CV Info
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
