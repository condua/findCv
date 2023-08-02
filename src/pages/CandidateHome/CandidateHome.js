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
import { BiCaretUp, BiCaretDown } from 'react-icons/bi';
import {PieChart, Pie,Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { useSpring, animated } from 'react-spring';

function CandidateHome() {
  const texts = [
    'Định hướng nghề nghiệp',
    'Việc làm mới',
    'CV mới',
    'Phúc lợi tốt',
    'Mức lương cao'
  ];
  const props = useSpring({ x: 1 });
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
  useEffect(() => {
    // Sử dụng setInterval để thay đổi giá trị currentIndex sau mỗi 3 giây
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    // Xóa interval khi component unmount để tránh memory leak
    return () => clearInterval(interval);
  }, []);
  const currentIndexRef = useRef(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     currentIndexRef.current = (currentIndexRef.current + 1) % texts.length;
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const dataChart = [
    { name: '12 Jun', value: 25 },
    { name: '30 Jun', value: 30 },
    { name: '15 Jul', value: 50 },
    { name: '30 Jul', value: 40 },
    { name: '8 Aug', value: 45 },
  ];
  const dataPie = [
    { name: 'New', value: 30 },
    { name: 'Subscribe', value: 70 },
  ];
  const colorsPie = ['#4eebe5', '#2b84c8'];
  const colors = ['#f0b238', '#ec5540'];
  useEffect(() => {
    // Thiết lập giá trị cho showModal sau khi trang đã được tải hoàn thành
    setShowModal(true);
  }, []);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
    <Header />
    <div className="candidatehome">
      <Modal show={showModal} onHide={handleCloseModal} size="lg" style = {{color: "black"}}>
        <Modal.Header>
          <Modal.Title className="modal-title">
            <span className = "modal-title-logo">PRIMECMR</span> - Tiếp lợi thế, nối thành công
          </Modal.Title>
          <button
          className="close"
          style={{width: "30px" ,height: "30px", color: 'red', fontSize: '24px', display: "flex", marginLeft:"240px", borderRadius: "40px", border: "1px solid black"}}
          onClick={handleCloseModal}
          
        >
          <span style = {{marginLeft: "7px", marginTop: "-2px"}}>&times;</span>
        </button>
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
          <Button variant="outline-success" onClick={handleCloseModal}>
            Tìm hiểu thêm
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="homesidenew">
      <Row style = {{height: "600px"}}>
        <Col className="col1" xs={8}>
          <div className="image-container" style={{ height: "100%", display: "flex" }}>
            <div className="white-area"></div>
            <div className="img-container" style={{ display: "flex",flex: "1" }}>
              <div style = {{zIndex: "2", marginTop: "20%", marginLeft: "10%", width: "70%", display:"flex", flexDirection: "column"}}>
                <span style = {{fontSize: "41px", fontWeight:"600"}}> Unlock Pro Inside </span>
                <Button variant="outline-dark" style = {{width: "50%"}}> View More </Button>
              </div>
              <img
                src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.15752-9/363884917_1011318203399397_3022744282137691245_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=S9s1vs8kUg4AX_rXUDg&_nc_ht=scontent.fsgn2-6.fna&oh=03_AdQr44i-tBtA3wfJM0NpoizUvvWUkZ4wjJgQ4y6gMnOGjg&oe=64ECADAA"
                alt="Image"
              />
            <div className = "boxinsight">
              <Row style = {{width: "90%", marginLeft: "10%"}}>
                <Col>
                  <Row> <span style = {{fontSize: "15px", fontWeight: "600"}}>Active User</span> </Row>
                  <Row > 
                    <span style = {{fontSize: "45px", fontWeight: "700", display: "flex"}}>678
                      <Col style = {{fontSize: "13px", color: "green", display: "flex", marginTop: "15px"}}>
                      <BiCaretUp className="green-icon" style={{ fontSize: "20px" }}/>
                      <span className="percentage">32%</span> 
                    </Col>
                    </span>
                  </Row>
                </Col>  
                <Col>
                  <Row> <span style = {{fontSize: "15px", fontWeight: "600"}}>New</span> </Row>
                  <Row > 
                    <span style = {{fontSize: "45px", fontWeight: "700", display: "flex"}}>256
                      <Col style = {{fontSize: "13px", color: "green", display: "flex", marginTop: "15px"}}>
                      <BiCaretUp className="green-icon" style={{ fontSize: "20px" }}/>
                      <span className="percentage">48%</span> 
                    </Col>
                    </span>
                  </Row>
                </Col>
                <Col>
                  <Row> <span style = {{fontSize: "15px", fontWeight: "600"}}>Cancel</span> </Row>
                  <Row > 
                    <span style = {{fontSize: "45px", fontWeight: "700", display: "flex"}}>12
                      <Col style = {{fontSize: "13px", color: "red", display: "flex", marginTop: "15px"}}>
                      <BiCaretDown className="red-icon" style={{ fontSize: "20px", marginTop: "-3px" }}/>
                      <span className="percentage">30%</span> 
                    </Col>
                    </span>
                  </Row>
                </Col>
              </Row>
            </div>
            </div>
          </div>
        </Col>
        <Col>
          <Row style = {{backgroundColor: "white", border: "1px solid #ede8e8", borderRadius: "20px", width: "100%", height: "55%", boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'}}>
          <span style = {{display: "flex", justifyContent: "center", fontSize: "30px", fontWeight: "600"}}> Membership</span>
          <div style={{ width: '100%', height: '100%' ,marginLeft: "-20px"}}>
            <ResponsiveContainer width="100%" height="85%" >
              <BarChart data={dataChart} fill="transparent">
                <XAxis dataKey="name"  />
                <YAxis  />
                
                {/* Ẩn các đường kẻ */}
                <Bar dataKey="value" fill="green">
                  {dataChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} radius={[10, 10, 0, 0]} />
                  ))}
                </Bar>
                
              </BarChart>
            </ResponsiveContainer>
          </div>
          </Row>
            <Row
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #ede8e8',
                  borderRadius: '20px',
                  width: '100%',
                  height: '45%',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: "10px"
                }}
              >
              <Col>
                <PieChart width={300} height={300} style = {{marginBottom: "20px", marginTop: "-50px"}}>
                    <Pie
                      data={dataPie}
                      cx={150}
                      cy={150}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1500}
                      strokeWidth={2} // Tăng kích thước đường viền lên gấp 3 lần
                    >
                      {dataPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colorsPie[index]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
              </Col>
              
              <Col style = {{width: "100%", height: "80%"}}>
              <span style = {{ fontSize: "40px", fontWeight: "600", marginLeft: "-30px"}}> Audiences</span>
              <span style = {{fontSize: "45px", fontWeight: "700", marginLeft: "20px"}}> 68% </span>
              <Row style = {{marginLeft: "-30px"}}>
                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ backgroundColor: "#4eebe5", width: "15px", height: "15px", borderRadius: "5px" }}></div>
                  <span style = {{marginLeft: "5px", fontWeight: "600"}}>New</span>
                  <BiCaretUp className="red-icon" style={{color: "green", fontSize: "20px", marginTop: "0px", marginLeft: "5px", marginRight: "-5px" }} />
                  <span className="percentage" style={{ marginLeft: "5px" , color: "green", fontWeight: "600"}}>30%</span>
                </Col>

                <Col style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ backgroundColor: "#2b84c8", width: "15px", height: "15px", borderRadius: "5px" }}></div>
                  <span style = {{marginLeft: "5px", fontWeight: "600"}}>Subscribe</span>
                  <BiCaretUp className="red-icon" style={{color: "green", fontSize: "20px", marginTop: "0px", marginLeft: "5px", marginRight: "-5px" }} />
                  <span className="percentage" style={{ marginLeft: "5px" , color: "green", fontWeight: "600"}}>30%</span>
                </Col>
              </Row>

              </Col>
            </Row>
        </Col>
      </Row>
    </div>
      <div className="homeheader">
        <div className="homeheader-left">
          <Col>
            <Row>
              <p className="hometext" style = {{fontSize: "40px", fontWeight: "600"}}>Ứng tuyển bất cứ nơi đâu!</p>
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
