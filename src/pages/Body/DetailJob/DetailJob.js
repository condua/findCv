import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Header from "./../../Header/Header";
import Form from 'react-bootstrap/Form';
import { NavLink } from "react-router-dom";
import data from '../../../data/data.json'
import { useParams } from 'react-router-dom';
import "./DetailJob.scss"
import Footer from "./../../Footer/Footer";
import { getJobsRequest } from "../../../redux/action/jobActions"
import { useDispatch, useSelector } from "react-redux"
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { applyJobRequest } from "../../../redux/action/applyJobActions";
import { getProfileRequest, updateProfileRequest } from '../../../redux/action/profileActions';

function DetailJob() {
  const [data, setData] = useState({
    address: "",
    avatar: "",
    cv_pdf: null,
    email: "",
    experience: "",
    fullName: "",
    gender: "",
    language: "",
    listJobPosting: [],
    phone: "",
    skill: "",  
  });
  const { id } = useParams();
  let keyId = parseInt(id);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getJobsRequest());
  }, [dispatch]);
  // const profileData = useSelector((state) => state.profile);
  // console.log("USER DATA", profileData)
  const accessToken = useSelector((state) => state.auth.accessToken);
  const response = useSelector((state) => state.auth);
  const profileData = useSelector((state) => state.profile.profileData);

  useEffect(() => {
    dispatch(getProfileRequest(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (profileData) {
      setData(profileData.data);
    }
  }, [profileData]);
  console.log("PROFILE DATA:", profileData);
  const jobs = useSelector((state) => state.jobs.jobs.filter(job => job.status === true));
  const item = jobs.filter((item) => item.id === keyId);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCVUploadModal, setShowCVUploadModal] = useState(false);
  const [showProfileUpdateModal, setShowProfileUpdateModal] = useState(false);
  const [showCVInfoUpdateModal, setShowCVInfoUpdateModal] = useState(false);

  const handleApplyJob = () => {
    if (!response.data) {
      setShowLoginModal(true);
      console.log("SHOW LOGIN MODAL")
    } else {
      if (!profileData.data.cv_pdf) {
        setShowCVUploadModal(true);
        console.log("SHOW CV MODAL")
      } else {
        if (!profileData.data.fullName || !profileData.data.gender || !profileData.data.phone || !profileData.data.address) {
          setShowProfileUpdateModal(true);
          console.log("SHOW INFO MODAL")
        } else {
          if (!profileData.data.language || !profileData.data.skill || !profileData.data.experience) {
            setShowCVInfoUpdateModal(true);
            console.log("SHOW CV INFO MODAL")
          } else {
            // User meets all requirements, proceed to /cvhandler
            // Handle the navigation to "/cvhandler" here
            const accessToken = response.accessToken;
            // console.log("ACCESS TOKEN: ",accessToken);
  
            dispatch(applyJobRequest(accessToken, keyId));
            dispatch(getProfileRequest(accessToken));
            console.log("REDIRECT", profileData)
            dispatch(updateProfileRequest(accessToken, profileData));

        }
        }
      }
    }
  };
  const listJobPostingIds = profileData.data.listJobPosting ? profileData.data.listJobPosting.map((item) => item.id) : [];
  const isKeyIdInList = listJobPostingIds.includes(keyId);
  if (response.data) {
    if (response.data.userInfo) {
      if (data.avatar) {
        response.data.userInfo.avatar = data.avatar;
      }
      if (data.fullName) {
        response.data.userInfo.fullName = data.fullName;
      }
    }
  }
  return (
    <>
      <Header userData = {response.data?.userInfo}/>
      <div className="detailjob">
        <div className="detailjobbanner" style={{ width: "100%" }}>
          <Row>
            <Col xs={8}>
              <Row>
                <p>Khám phá 1000+ vị trí nổi bật </p>
              </Row>
              <Row>
                <span>Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn</span>
              </Row>
              <Row style={{ marginLeft: "68px", marginTop: "30px" }}>
                <Col>
                  <Form.Control
                    type="search"
                    placeholder="Tên công việc, vị trí ..."
                    className="me-1"
                    aria-label="Search"
                  />
                </Col>
                <Col>
                  <NavLink to="/body" style={{ textDecoration: "none" }}>
                    <Button style={{ backgroundColor: "#1dad20", borderRadius: "20px" }}>Tìm kiếm</Button>
                  </NavLink>
                </Col>
              </Row>
            </Col>
            <Col>
              <img
                src="https://www.topcv.vn/v4/image/brand-identity/company-billBoard.png?v=1.0.0"
                alt="bannerimage"
                width="300px"
                height="300px"
                marginLeft="30px"
              />
            </Col>
          </Row>
        </div>
        <Container>
          <div className="detailjobposition">
            <Row>
              <Col xs={3}>
                <div className="detailjobpositionimage">
                  <img
                    src="https://dsa.org.vn/wp-content/uploads/2017/11/fpt.png"
                    alt="positionimage"
                    width="125px"
                    height="125px"
                  />
                </div>
              </Col>
              <Col>
                <div className="detailjobpositiontext">
                  <Row>
                    <p className="ptext1">{item[0].name}</p>
                  </Row>
                  <Row>
                    <p className="ptext2">FPT SoftWare - Công ty TNHH Phần Mềm FPT</p>
                  </Row>
                  <Row>
                    <span>Hạn nộp hồ sơ: 11/08/2023</span>
                  </Row>
                </div>
              </Col>
              <Col>
                <Row>
                  <Button
                    className="btn btn-md justify-content-md-end"
                    variant="outline-success"
                    style={{ width: "30%", marginTop: "40px", marginLeft: "250px" }}
                    onClick={handleApplyJob}
                    disabled={isKeyIdInList}
                  >
                    Ứng tuyển ngay
                  </Button>{" "}
                </Row>
                <Row>
                  <Button
                    className="btn btn-md justify-content-md-end"
                    variant="outline-primary"
                    style={{ width: "30%", marginTop: "10px", marginLeft: "250px" }}
                  >
                    Lưu vị trí
                  </Button>{" "}
                </Row>
              </Col>
            </Row>
          </div>
          <div className="detailjobpositionbanner">
            <Button className="btn btn-success" variant="outline-light" style={{ marginTop: "20px", marginLeft: "30px" }}>
              Tin tuyển dụng
            </Button>
            <Button className="btn btn-success" variant="outline-light" style={{ marginTop: "20px", marginLeft: "30px" }}>
              Việc làm liên quan
            </Button>
          </div>
          <div className="detailjobpositionbody">
            <div>
              <h2>
                <span style={{ borderLeft: "6px solid #00b14f" }}></span>
                <span style={{ marginLeft: "10px" }}>Chi tiết tuyển dụng</span>
              </h2>
            </div>
            <div>
              <div className="detailflex">
                <div className="detailflexleft">
                  <Col>
                    <div style={{ backgroundColor: "#f4f5f5", borderRadius: "10px", textAlign: "left", width: "100%", marginLeft: "20px" }}>
                      <Row>
                        <h5 style={{ margin: "20px", color: "#212f3f", fontSize: "16px", fontWeight: "600", lineHeight: "24px" }}>
                          Thông tin chung
                        </h5>
                      </Row>
                      <Row>
                        <Col>
                          <Row>
                            <Col style={{ marginLeft: "20px", marginRight: "-200px" }}>
                              <img
                                src="https://www.topcv.vn/v4/image/job-detail/icon/11.svg"
                                alt="icon11"
                                height="40px"
                                width="40px"
                              />
                            </Col>
                            <Col>
                              <Row>
                                <p style={{ marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400" }}>Mức lương</p>
                              </Row>
                              <Row>
                                <p style={{ marginTop: "5px", lineHeight: "20px", fontWeight: "600" }}>{item[0].salary}</p>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <Col xs={4} style={{ marginLeft: "0px" }}>
                              <img
                                src="https://www.topcv.vn/v4/image/job-detail/icon/14.svg"
                                alt="icon14"
                                height="40px"
                                width="40px"
                              />
                            </Col>
                            <Col style={{ marginLeft: "-48px" }}>
                              <Row>
                                <p style={{ marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400" }}>Số lượng tuyển</p>
                              </Row>
                              <Row>
                                <p style={{ marginTop: "5px", lineHeight: "20px", fontWeight: "600" }}>{item[0].number} người</p>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Row>
                            <Col style={{ marginLeft: "20px", marginRight: "-200px" }}>
                              <img
                                src="https://www.topcv.vn/v4/image/job-detail/icon/12.svg"
                                alt="icon12"
                                height="40px"
                                width="40px"
                              />
                            </Col>
                            <Col>
                              <Row>
                                <p style={{ marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400" }}>Hình thức làm việc</p>
                              </Row>
                              <Row>
                                <p style={{ marginTop: "5px", lineHeight: "20px", fontWeight: "600" }}>{item[0].workingform}</p>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <Col xs={4} style={{ marginLeft: "0px" }}>
                              <img
                                src="https://www.topcv.vn/v4/image/job-detail/icon/13.svg"
                                alt="icon13"
                                height="40px"
                                width="40px"
                              />
                            </Col>
                            <Col style={{ marginLeft: "-48px" }}>
                              <Row>
                                <p style={{ marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400" }}>Cấp bậc</p>
                              </Row>
                              <Row>
                                <p style={{ marginTop: "5px", lineHeight: "20px", fontWeight: "600" }}>{item[0].position}</p>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Row>
                            <Col style={{ marginLeft: "20px", marginRight: "-200px" }}>
                              <img
                                src="https://www.topcv.vn/v4/image/job-detail/icon/15.svg"
                                alt="icon15"
                                height="40px"
                                width="40px"
                              />
                            </Col>
                            <Col>
                              <Row>
                                <p style={{ marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400" }}>Giới tính</p>
                              </Row>
                              <Row>
                                <p style={{ marginTop: "5px", lineHeight: "20px", fontWeight: "600" }}>{item[0].sex}</p>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <Col xs={4} style={{ marginLeft: "0px" }}>
                              <img
                                src="https://www.topcv.vn/v4/image/job-detail/icon/14.svg"
                                alt="icon14"
                                height="40px"
                                width="40px"
                              />
                            </Col>
                            <Col style={{ marginLeft: "-48px" }}>
                              <Row>
                                <p style={{ marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400" }}>Kinh nghiệm</p>
                              </Row>
                              <Row>
                                <p style={{ marginTop: "5px", lineHeight: "20px", fontWeight: "600" }}>{item[0].experience}</p>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div style={{ backgroundColor: '#f4f5f5', marginTop: "20px", marginLeft: "20px", borderRadius: "10px", width: "100%" }}>
                      <Row>
                        <h5 style={{ margin: "20px", color: "#212f3f", fontSize: "16px", fontWeight: "600", lineHeight: "24px" }}>
                          Địa điểm làm việc
                        </h5>
                      </Row>
                      <Row>
                        <p style={{ marginTop: "0px", marginLeft: "20px", color: "#4d5965", lineHeight: "20px", fontWeight: "400", paddingRight: "40px" }}>
                          - {item[0].detaillocation}
                        </p>
                      </Row>
                    </div>
                  </Col>
                  <Col>
                    <div style={{ width: "100%", marginLeft: "20px", marginTop: "10px" }}>
                      <h2>
                        <span style={{ borderLeft: "6px solid #00b14f", marginLeft: "-20px" }}></span>
                        <span style={{ marginLeft: "10px" }}>Mô tả công việc</span>
                      </h2>
                      <>
                        {item[0].detailJob.split("\n").map((item) => (
                          <p style={{ marginLeft: "20px" }}> - {item} </p>
                        ))}
                      </>
                    </div>
                  </Col>
                  <Col>
                    <div style={{ width: "100%", marginLeft: "20px", marginTop: "10px" }}>
                      <h2>
                        <span style={{ borderLeft: "6px solid #00b14f", marginLeft: "-20px" }}></span>
                        <span style={{ marginLeft: "10px" }}>Yêu cầu ứng viên</span>
                      </h2>
                      <>
                        {item[0].requirements.split("\n").map((item) => (
                          <p style={{ marginLeft: "20px" }}> - {item} </p>
                        ))}
                      </>
                    </div>
                  </Col>
                  <Col>
                    <div style={{ width: "100%", marginLeft: "20px", marginTop: "10px" }}>
                      <h2>
                        <span style={{ borderLeft: "6px solid #00b14f", marginLeft: "-20px" }}></span>
                        <span style={{ marginLeft: "10px" }}>Quyền lợi</span>
                      </h2>
                      <>
                        {item[0].interest.split("\n").map((item) => (
                          <p style={{ marginLeft: "20px" }}> - {item} </p>
                        ))}
                      </>
                    </div>
                  </Col>
                </div>
              </div>
            </div>
          </div>
          <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please log in to continue.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-secondary" onClick={() => setShowLoginModal(false)}>
                        Close
                        </Button>
                        <Button variant="outline-primary" onClick={() => navigate('/login')}>
                        Continue
                        </Button>
                    </Modal.Footer>
            </Modal>
            <Modal show={showCVUploadModal} onHide={() => setShowCVUploadModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>CV Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please upload your CV to continue.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowCVUploadModal(false)}>
                    Close
                    </Button>
                    <Button variant="outline-primary" onClick={() => navigate('/cvhandler')}>
                    Continue
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showProfileUpdateModal} onHide={() => setShowProfileUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Profile Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please complete your profile to continue.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowProfileUpdateModal(false)}>
                    Close
                    </Button>
                    <Button variant="outline-primary" onClick={() => navigate('/cvhandler')}>
                    Continue
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showCVInfoUpdateModal} onHide={() => setShowCVInfoUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>CV Info Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please update your CV information to continue.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowCVInfoUpdateModal(false)}>
                    Close
                    </Button>
                    <Button variant="outline-primary" onClick={() => navigate('/cvhandler')}>
                    Continue
                    </Button>
                </Modal.Footer>
                </Modal>

        </Container>
        <Footer />
      </div>
    </>
  );
  
};

export default DetailJob;