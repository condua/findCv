import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Header from "./../Header/Header";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CandidateHome.scss';
import Footer from "./../Footer/Footer";
import Box from "./Box/Box";
import data from "../../data/data.json"
import events from "../../data/event.json"
import EventBox from "./EventBox/EventBox";
import { Typography,Grid } from "@mui/material";

function CandidateHome() {
  const texts = [
    'Định hướng nghề nghiệp',
    'Việc làm mới',
    'CV mới',
    'Phúc lợi tốt',
    'Mức lương cao'
  ];
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [currentIndex1, setCurrentIndex1] = useState(0);
  

  
  const totalBoxes = data.length;
  const itemsPerPage = 5;
  const recentEvents = events.slice(-5);
  const showBoxes = data
    .slice(currentIndex1, currentIndex1 + itemsPerPage)
    .map((item) => <Box key={item.id} data={item} />);

  const handlePrev = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex === 0 ? totalBoxes - itemsPerPage : prevIndex - itemsPerPage
    );
  };

  const handleNext = () => {
    setCurrentIndex1((prevIndex) =>
      prevIndex === totalBoxes - itemsPerPage ? 0 : prevIndex + itemsPerPage
    );
  };

  const currentIndexRef = useRef(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     currentIndexRef.current = (currentIndexRef.current + 1) % texts.length;
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
    <Header />
    <div className="candidatehome">
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            <span className = "modal-title-logo">PRIMECMR</span> - Tiếp lợi thế, nối thành công
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="350"
            src="https://www.youtube.com/embed/5y9EYHhAwPs?autoplay=1"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
            autoPlay
          ></iframe>
          <div className="modalContainer">
            <Row>
            <Col xs = {4}>
            <div className="modalContainer modalleft">
              <img
                src="https://www.topcv.vn/v4/image/welcome/section-header/toppy-hr-tech.png?v=1.0.0"
                alt="imagebanner"
                width="90%"
                height="90%"
              />
            </div>
            </Col>
            <Col>
            <div className="modalContainer modalright">
                <p className="modal-text" style = {{fontWeight: "400"}}>
                  Trong sự nghiệp, chọn đúng việc, đi đúng hướng là một{' '}
                  <span className="modal-highlight" style={{ color: "#41a636", fontWeight: 600 }}>
                    lợi thế
                  </span>{' '}
                  <br />
                  Định vị bản thân chính xác là một{' '}
                  <span className="modal-highlight" style={{ color: "#41a636", fontWeight: 600 }}>
                    lợi thế
                  </span>{' '}
                  <br />
                  Kết nối bền chặt cùng đồng nghiệp cũng là một{' '}
                  <span className="modal-highlight" style={{ color: "#41a636", fontWeight: 600 }}>
                    lợi thế
                  </span>{' '}
                  <br />
                  TopCV hiểu rõ,{' '}
                  <span className="modal-highlight" style={{ color: "#41a636", fontWeight: 600 }}>
                    lợi thế
                  </span>{' '}
                  nằm trong tay bạn! <br />
                  <span className="modal-highlight" style={{ color: "#41a636", fontWeight: 600 }}>
                    Với Hệ sinh thái HR Tech, TopCV luôn đồng hành để bạn thành công trong sự nghiệp
                  </span>
                </p>
              </div>

            </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Tìm hiểu thêm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="homeheader">
        <div className="homeheader-left">
          <Col>
            <Row>
              <p className="hometext">Ứng tuyển bất cứ nơi đâu!</p>
            </Row>
            <Row>
              <p className="hometext">
                <span className="hometext-highlight">{texts[currentIndex]}</span> dành cho bạn
              </p>
            </Row>
            <Row>
              <p className="hometext-logo" style = {{color: "green"}}>PrimeCMR - Khởi đầu thành công</p>
            </Row>
            <Row className="homebox-row">
              <div className="homebox">
                <div className="homebox-left">
                  <i className="bi bi-award"></i>
                </div>
                <div className="homebox-right">
                  <Col>
                    <Row>
                      <p className="homebox-title">Việc làm xứng tầm</p>
                    </Row>
                    <Row>
                      <p className="homebox-description">
                        Thăng tiến nhanh, công việc hấp dẫn, thu nhập xứng tầm
                      </p>
                    </Row>
                  </Col>
                </div>
              </div>
            </Row>
            <Row className="homebox-row">
              <div className="homebox">
                <div className="homebox-left">
                  <i className="bi bi-person-circle"></i>
                </div>
                <div className="homebox-right">
                  <Col>
                    <Row>
                      <p className="homebox-title">Cá nhân hóa trải nghiệm</p>
                    </Row>
                    <Row>
                      <p className="homebox-description">
                        Sử dụng công nghệ AI dự đoán, cá nhân hoá việc làm
                      </p>
                    </Row>
                  </Col>
                </div>
              </div>
            </Row>
            <Row className="homebox-row">
              <div className="homebox">
                <div className="homebox-left">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <div className="homebox-right">
                  <Col>
                    <Row>
                      <p className="homebox-title">Đồng hành cùng bạn trên hành trình sự nghiệp</p>
                    </Row>
                    <Row>
                      <p className="homebox-description">Tìm kiếm, kết nối, xây dựng thành công</p>
                    </Row>
                  </Col>
                </div>
              </div>
            </Row>
          </Col>
        </div>
        <div className="homeheader-right">
          <img
            className="homeheader-image"
            src="https://www.topcv.vn/v4/image/welcome/mobile-app/mobile.png"
            alt="jumpimage"
          />
        </div>
      </div>
      <div style = {{boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"}}><hr/></div>
      <div className="homecontainer">
        <Container>
          <div className="homecontainer-header" style = {{boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", paddingBottom: "20px"}}>
            <Col>
              <Row>
                <p className="homecontainer-title">Tính năng nổi bật</p>
              </Row>
              <Row>
                <span className="homecontainer-subtitle">
                  Những tính năng của ứng dụng PrimeCMR giúp ứng viên dễ dàng ứng tuyển, nâng cao trải nghiệm tìm việc trong kỷ nguyên số
                </span>
              </Row>
            </Col>
          </div>
          <div className="homecontainer-body">
            <Row>
              <Col xs={12} md={7}>
                <p className="homecontainer-section-title">Chọn đúng việc - Đi đúng hướng</p>
                <p className="homecontainer-section-description">
                  Cá nhân hoá trải nghiệm tìm việc theo nhu cầu ứng viên gồm các tính năng:
                </p>
                <ul className="homecontainer-feature-list">
                  <li>Gợi ý việc làm phù hợp</li>
                  <li>Tìm kiếm việc làm</li>
                  <li>Việc làm gần bạn</li>
                  <li>Công ty nổi bật</li>
                  <li>Top Connect - Chat trực tiếp với Nhà tuyển dụng</li>
                </ul>
              </Col>
              <Col xs={12} md={5}>
                <img
                  className="homecontainer-image"
                  src="https://www.topcv.vn/v4/image/welcome/mobile-app/select_truejob.png"
                  alt="img"
                />
              </Col>
            </Row>
          </div>
          <div className="homecontainer-body">
            <Row>
              <Col xs={12} md={5}>
                <img
                  className="homecontainer-image"
                  src="https://www.topcv.vn/v4/image/welcome/mobile-app/share_together.png"
                  alt="img"
                />
              </Col>
              <Col xs={12} md={7}>
                <p className="homecontainer-section-title">Cùng chia sẻ - Cùng vươn xa</p>
                <p className="homecontainer-section-description">
                  Các bài viết chia sẻ kinh nghiệm thành công trong môi trường công sở, kinh nghiệm tìm việc, phát triển kỹ năng và viết CV được chọn lọc theo mức độ kinh nghiệm và số năm đi làm của ứng viên.
                </p>
              </Col>
            </Row>
          </div>
          <div className="homecontainer-body">
            <Row>
              <Col xs={12} md={7}>
                <p className="homecontainer-section-title">PrimeCMR Podcast</p>
                <p className="homecontainer-section-description">
                  Các Podcast với nội dung chiều sâu, hữu ích cho người đi làm được chia sẻ bởi chuyên gia và TopCV về các chủ đề tìm việc, phỏng vấn, ứng dụng công nghệ trong công việc.
                </p>
              </Col>
              <Col xs={12} md={5}>
                <img
                  className="homecontainer-image"
                  src="https://www.topcv.vn/v4/image/welcome/mobile-app/topcv_podcast.png"
                  alt="img"
                />
              </Col>
            </Row>
          </div>
          <div className="homecontainer-body">
            <Row>
              <Col xs={12} md={5}>
                <img
                  className="homecontainer-image"
                  src="https://www.topcv.vn/v4/image/welcome/mobile-app/tools.png"
                  alt="img"
                />
              </Col>
              <Col xs={12} md={7}>
                <p className="homecontainer-section-title">Thêm công cụ - Thêm vượt trội</p>
                <p className="homecontainer-section-description">
                  Các công cụ hữu ích cho người đi làm bao gồm:
                </p>
                <ul className="homecontainer-feature-list">
                  <li>Công cụ chuyển đổi lương Gross - Net</li>
                  <li>Công cụ tính thuế thu nhập cá nhân</li>
                  <li>Công cụ so sánh lương</li>
                  <li>Công cụ viết CV trực tuyến</li>
                </ul>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container style={{ textAlign: "center", marginBottom: "20px" }}>
      <div
        className="containerbanner"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "left",
        }}
      >
        <div
          className="headerbanner"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: "10px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <p
            style={{
              fontSize: "40px",
              fontWeight: "700",
              color: "#146014",
              margin: "0",
              flexGrow: "1",
            }}
          >
            Top Vị Trí Hàng Đầu
          </p>
          <div
            className="buttons"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              variant="outline-success"
              onClick={handlePrev}
              style={{
                margin: "0 5px",
                padding: "0",
                width: "30px",
                height: "30px",
              }}
              className="rounded-circle"
            >
              &lt;
            </Button>
            <Button
              variant="outline-success"
              onClick={handleNext}
              style={{
                margin: "0 5px",
                padding: "0",
                width: "30px",
                height: "30px",  
              }}
              className="rounded-circle"
            >
              &gt;
            </Button>
          </div>
        </div>
      <div className="bodybanner w-100"  >
        <div className="flex-container" >{showBoxes}</div>
        </div>
    </div>
       
      </Container>
    <Container style = {{width: "100%"}}>
    <p style={{
              fontSize: "40px",
              fontWeight: "700",
              color: "#146014",
              marginBottom: "20px",
              marginTop: "20px",
              flexGrow: "1",
              display: "flex",
              justifyContent: "center",
            }}
          > Bài Viết Nổi Bật </p>
    <Grid container spacing={2} style = {{width: "100%"}}>
      {/* Row 1 */}
      <Grid item xs={6} style={{ backgroundColor: "white", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <EventBox key={recentEvents[0].id} event={recentEvents[0]} />
      </Grid>
      <Grid item xs={6} style={{ backgroundColor: "white", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <EventBox key={recentEvents[1].id} event={recentEvents[1]} />
      </Grid>
    </Grid>
    <p style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#146014",
              marginBottom: "20px",
              marginTop: "20px",
              flexGrow: "1",
              display: "flex",
              justifyContent: "center",
            }}
          > Các Bài Viết Mới Nhất </p>
    <Grid container spacing={2} style = {{width: "100%"}}>
      <Grid item xs={4} style={{ backgroundColor: "white", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <EventBox key={recentEvents[2].id} event={recentEvents[2]} />
      </Grid>
      <Grid item xs={4} style={{ backgroundColor: "white", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <EventBox key={recentEvents[3].id} event={recentEvents[3]} />
      </Grid>
      <Grid item xs={4} style={{ backgroundColor: "white", height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <EventBox key={recentEvents[4].id} event={recentEvents[4]} />
      </Grid>
    </Grid>
    </Container>
     
    </div>
    <Footer />
    </>
  );
}

export default CandidateHome;
