import React, { useState } from "react";
import Header from "../Header/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./Company.scss";
import Banner from "./../Banner/Banner";
import Footer from "./../Footer/Footer";



function Home() {
  const [numberFollowing, setnumberFollowing] = useState(672);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleFollow = () => {
    setIsFollowing(true);
    toast.success("Đã theo dõi công ty", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
    setnumberFollowing(numberFollowing+1);
  };

  const handleUnfollow = () => {
    setShowModal(true);
  };

  const handleConfirmUnfollow = () => {
    setIsFollowing(false);
    setFadeOut(true);
    setTimeout(() => {
        setShowModal(false);
        setFadeOut(false);
      }, 500);
    setnumberFollowing(numberFollowing-1);
  };

  const handleCancelUnfollow = () => {
    setFadeOut(true);
    setTimeout(() => {
        setShowModal(false);
        setFadeOut(false);
      }, 500);
  };
  const handleCloseModal = () => {
    setFadeOut(true);
    setTimeout(() => {
        setShowModal(false);
        setFadeOut(false);
      }, 500);
  };
  return (
    <>
    <Header/>
    <div className = "homebackground">  
    <div style = {{width: "100%"}}>
      <Container>
        <div className="background-image">
          <div className = "topdiv" >
            {/* Thẻ div trên */}
          </div>
          <img
            src="PositionLogo.png"
            alt="Hình ảnh"
            className="round-image"
          />
          <div className = "bottomdiv" >
            {/* Thẻ div dưới */}
            <Container>
                <Row>
                <Col md={{ span: 6, offset: 3 }} style = {{marginTop: '10px'}}>
                    <div className = "NameCompany">
                        <span className = "textcompany">
                            FPT SoftWare Ho Chi Minh
                        </span>
                    </div>
                </Col>
                <Col md={{ span: 6, offset: 3 }} style = {{marginTop: '15px'}}>
                    <div className = "NameCompany">
                        <span className = "text1company">
                            <i className="bi bi-buildings"></i>{'  '} 5000+ nhân viên
                        </span>
                        <span className = "text1company">
                            <i className="bi bi-people-fill"></i>{'  '} {numberFollowing} người theo dõi
                        </span>
                    </div>
                </Col>
                </Row>
                <Row>
                <Col md={{ span: 3, offset: 9 }} style = {{marginTop: '-50px'}}>
                    <Button 
                    className="btn btn-md bg-white custom-button" 
                    variant="outline-success"
                    onClick={isFollowing ? handleUnfollow : handleFollow}
                    >
                        {isFollowing ? "Đang theo dõi" : "+ Theo dõi công ty"}
                    </Button>
                    <Modal
                        isOpen={showModal}
                        onRequestClose={handleCancelUnfollow}
                        style={{
                            overlay: {
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 9999,
                            },
                            content: {
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: "500px",
                              height: "250px",
                              padding: "10px",
                              borderRadius: "8px",
                              backgroundColor: "#fff",
                              opacity: fadeOut ? 0 : 1, // Đặt opacity thành 0 khi fadeOut = true
                              transition: "opacity 0.5s ease", // Hiệu ứng mờ dần trong 0.5 giây
                            },
                          }}
                        contentLabel="Unfollow Confirmation"
                    >
                        <div className="modal-header">
                            <h4 style={{ marginRight: "auto" }}>Bỏ theo dõi</h4>
                            <button className="close-button" style={{ marginLeft: "auto" }} onClick={handleCloseModal}>
                            <i className="bi bi-x bi-3x"></i>
                            </button>
                            
                        </div>
                        <div style = {{marginLeft: '15px', marginRight: '15px'}}>
                        <span style = {{color: '#737d8b'}}>Bỏ theo dõi sẽ không tiếp tục nhận được thông tin tuyển dụng từ</span> <span> FPT Software.</span>
                        </div>
                        <div className="modal-buttons">
                        <Button onClick={handleCancelUnfollow} variant="outline-success">
                            Hủy
                        </Button>
                        <Button onClick={handleConfirmUnfollow} variant="outline-danger">
                            Bỏ theo dõi
                        </Button>
                        </div>
                    </Modal>
                    <ToastContainer/>
                </Col>
                </Row>
            </Container>
          </div>
        </div>
      </Container>
    <Container>
<div className = "bodycontainer">
    <div className = "left">
        <div className = "headerInfo"> 
            <div className = "headerInfo header">
                <div className = "textinfo"> Giới thiệu công ty </div>
            </div>
            <div className = "headerInfo body">
                <p className = "headerInfo body textinfo">
                Tham gia dự án Logistic ứng viên nhận SIGNING BONUS iPhone 12 pro max <br/> Chia sẻ ngay tới ứng viên của bạn:
                5 lý do KHÔNG NÊN BỎ QUA cơ hội làm việc với Digital platforms hàng đầu thế giới!! <br/> <br/> <br/>
                1. KHÁCH HÀNG WORLD-CLASS - ĐỨNG TOP THỊ TRƯỜNG TOÀN CẦU VỀ LOGISTICS <br/> <br/> Là tập đoàn lớn nhất thế giới trong 
                các lĩnh vực Logistics, Supply Chain, và E-commerce solutions với doanh thu 76 tỉ USD, có 540.000 nhân viên
                 hoạt động toàn cầu, khách hàng lần này của FSOFT là công ty Logistics có hàng tỉ người dùng, có mặt trên hầu 
                 hết các nước trên thế giới. <br/> <br/>
                 2. ĐỐI TÁC CHUYÊN NGHIỆP, SẢN PHẨM VƯỢT TRỘI <br/> <br/>
                 Tham gia dự án này, các bạn sẽ được làm việc với đơn vị phụ trách phát triển các sản phẩm Digital Platformsquy mô toàn cầu tập trung vào 7 lĩnh vực 
                 công nghệ: Intelligent Automation (RPA), IoT, API, Data Lake và Data Analytics, Virtual Assistants, và Blockchain.
                  Các sản phẩm phục vụ quy mô toàn cầu đã có từ 4 triệu đến 3 trăm triệu lượt người sử dụng hàng tháng, là ước mơ 
                  của ngành Logistics toàn thế giới. Các bạn sẽ có cơ hội làm việc với những sản phẩm digital ở mức độ chuyên nghiệp,
                   hoàn thiện production chứ không còn ở mức thử nghiệm.
                <br/>
                <span style = {{color:'white'}}>a</span>
                </p>
            </div>
            <div className = "headerInfo header">
                <div className = "textinfo"> Lý do chọn FPT </div>
            </div>
            <div className = "headerInfo body">
            <div >
            <Row style = {{marginTop: '10px'}}>
                <Col>
                    <div className = "headerInfo body card" style = {{border: 'none'}}>
                        <span className = "textcard">The key drivers of our business</span>
                    </div>
                </Col>
                <Col>
                    <div className = "headerInfo body card" style = {{backgroundColor: '#f6edeb'}}>
                        <img
                        src = "https://fptsoftware.com/-/media/project/fpt-software/fso/about-us/core-values/agility-orange.svg?iar=0&modified=20230406103420&hash=24A8D62A79D987FB4F48FE24D3A053DD"
                        alt = "agility"
                        className = "imgcard"
                        />
                        <p style = {{color: 'orange',fontWeight: '700'}}>Agility</p>
                        <p style = {{color: 'black'}}>Important changes are inevitable, so we must be agile in all we do.</p>
                    </div>
                </Col>
                <Col>
                <div className = "headerInfo body card" style = {{backgroundColor: '#e0eef7'}}>
                        <img
                        src = "https://fptsoftware.com/-/media/project/fpt-software/fso/about-us/core-values/one-team-blue.svg?iar=0&modified=20230406103419&hash=CF861B2001E1516F456848AEFA407449"
                        alt = "oneteam"
                        className = "imgcard"
                        />
                        <p style = {{color: '#1328ee',fontWeight: '700'}}>One-Team</p>
                        <p style = {{color: 'black'}}>We come together as one team to achieve business and social impact.</p>
                    </div>
                </Col>
            </Row>
            <Row >
                <Col>
                    <div className = "headerInfo body card" style = {{backgroundColor: '#eaf9eb'}}>
                        <img
                        src = "https://fptsoftware.com/-/media/project/fpt-software/fso/about-us/core-values/innovation-green.svg?iar=0&modified=20230406103419&hash=0852850222730F80BF33179ADE4DE407"
                        alt = "innovation"
                        className = "imgcard"
                        />
                        <p style = {{color: '#10be20',fontWeight: '700'}}>Innovation</p>
                        <p style = {{color: 'black'}}>We thrive where engineering, science, design, and art converge.</p>
                    </div>
                </Col>
                <Col>
                    <div className = "headerInfo body card" style = {{backgroundColor: '#ecfbfa'}}>
                        <img
                        src = "https://fptsoftware.com/-/media/project/fpt-software/fso/about-us/core-values/commitment-lightblue.svg?iar=0&modified=20230406103420&hash=8DE08A2644992C0B6F3DAD8B56C6AAF2"
                        alt = "commitment"
                        className = "imgcard"
                        />
                        <p style = {{color: '#40dfcf',fontWeight: '700'}}>Commitment</p>
                        <p style = {{color: 'black'}}>We’re entrusted to deliver for our people, our clients, and communities.</p>
                    </div>
                </Col>
                <Col>
                    <div className = "headerInfo body card" style = {{backgroundColor: '#e9d8f0'}}>
                        <img
                        src = "https://fptsoftware.com/-/media/project/fpt-software/fso/about-us/core-values/respect-blueviolet.svg?iar=0&modified=20230406103419&hash=50540BBAD5BB1991C7AC0122AB5724AB"
                        alt = "respect"
                        className = "imgcard"
                        />
                        <p style = {{color: '#a440df',fontWeight: '700'}}>Respect</p>
                        <p style = {{color: 'black'}}>Respect holds our best relationships closer and keeps them strong.</p>
                    </div>
                </Col>
            </Row>
            </div>
            </div>
        </div>
    </div>
    <div className = "right">
        <div className = "contact">
            <div className = "contact header">
                <div className = "textinfo"> Thông tin liên hệ </div>
            </div>
            <div className = "contact body">
                <div className = "textcontact">
                    <br/>
                    <i className="bi bi-geo-alt-fill text-success" style = {{marginLeft: '18px'}}></i><span className = "textcontact-text">Địa chỉ công ty</span>
                    <br/>
                    <p className = "textcontact-text1">Đường D1, Khu Công Nghệ Cao, Phường Tân Phú, Quận 9, Thành phố Hồ Chí Minh</p>
                </div>
                    <hr/>
                <div className = "map">
                    <i className="bi bi-map text-success" style = {{marginLeft: '18px'}}></i><span className = "textcontact-text">Xem vị trí công ty</span>
                    <iframe
                        title="Bản đồ công ty"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.141526651255!2d106.78404451525872!3d10.859127292267647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f7f1223c2a7%3A0x9716673d8dc6eaba!2zTMOqIFRow6BuaCBERSwgS2h1IMSQ4buTbmcgQ-G7lSBIw7luZywgVGjDoG5oIHPhu5EgS2hvYSBI4bqhaSDEkOG7mWkgTOG6r2ksIEjDoCBO4bunYyBMw6J5LCBI4bqhaSDEkOG7mWkgTOG6r2k!5e0!3m2!1svi!2s!4v1625562786899!5m2!1svi!2s"
                        width="90%"
                        height="400"
                        className="mapcompany"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
            <div className = "contact header">
                <div className = "textinfo"> Chia sẻ công ty tới bạn bè </div>
            </div>
            <div className = "contact body">
                <div className = "textcontact">
                    <br/>
                    <span className = "textcontact-text" style = {{marginLeft: '15px'}}>Sao chép đường dẫn</span>
                    <div className = "borderInput">
                    <input readOnly type = "text" className = "copyinput" value = "https://www.topcv.vn/cong-ty/fpt-software/44243.html"/><i className="bi bi-clipboard" ></i> 
                    </div>
                    <span className = "textcontact-text" style = {{marginLeft: '15px'}}>Chia sẻ qua mạng xã hội</span>
                    <div className="social-buttons-container">
                        <a href="https://www.facebook.com">
                            <button className="social-button" style = {{color: '#3b5998'}}>
                            <FaFacebook size={27} />
                            </button>
                        </a>
                        <a href="https://www.twitter.com">
                            <button className="social-button">
                            <FaTwitter size={27} />
                            </button>
                        </a>
                        <a href="https://www.linkedin.com">
                            <button className="social-button" style = {{color: '#0e76a8'}}>
                            <FaLinkedin size={27} />
                            </button>
                        </a>
                        </div>
                </div>
                <span style = {{color: 'white'}}>a</span>
            </div>
        </div>
        
    </div>  
</div>
    </Container>
    <Container>
        <div className = "banner">
        <p className = "banner header"> Our Rewards </p>
        </div>
        <div style = {{backgroundColor: 'white', borderRadius: '0px 0px 10px 10px', marginBottom: '20px'}}>
        <Banner/> 
        </div>
    </Container>
    </div>
    </div>
    <Footer/>
    </>
  );
}

export default Home;
