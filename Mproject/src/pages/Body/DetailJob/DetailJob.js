import React from 'react';
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

function DetailJob() {
    const { id } = useParams();
    let keyId = parseInt(id);
    const item = data.filter((item) => item.id === keyId);
    console.log(item)
    return (
        <>
        <Header/>
        <div className = "detailjob">
        
        <div className = "detailjobbanner" style = {{width: "100%"}}>
            <Row>
                <Col xs = {8}>
                    <Row> <p>Khám phá 1000+ vị trí nổi bật </p> </Row>
                    <Row> <span>Tra cứu thông tin công ty và tìm kiếm nơi làm việc tốt nhất dành cho bạn</span> </Row>
                    <Row style = {{marginLeft: "68px", marginTop: "30px"}}>
                        <Col>
                        <Form.Control
                            type="search"
                            placeholder="Tên công việc, vị trí ..."
                            className="me-1"
                            aria-label="Search"
                        />
                        </Col>
                        <Col>
                        <NavLink to = "/body" style = {{textDecoration: "none"}}>
                        <Button style = {{backgroundColor: "#1dad20", borderRadius: "20px"}}>Tìm kiếm</Button>
                        </NavLink>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <img 
                    src = "https://www.topcv.vn/v4/image/brand-identity/company-billBoard.png?v=1.0.0"
                    alt = "bannerimage"
                    width = "300px"
                    height = "300px"
                    marginLeft = "30px"
                    />
                </Col>
            </Row>
        </div>
            <Container>
                <div className="detailjobposition">
                    <Row>
                        <Col xs = {3}>
                            <div className = "detailjobpositionimage">
                            <img
                            src = "https://dsa.org.vn/wp-content/uploads/2017/11/fpt.png"
                            alt = "positionimage"
                            width = "125px"
                            height = "125px" 
                            />
                            </div>
                        </Col>
                        <Col >  
                            <div className = "detailjobpositiontext">
                            <Row> <p className = "ptext1">{item[0].name}</p></Row>
                            <Row> <p className = "ptext2">FPT SoftWare - Công ty TNHH Phần Mềm FPT</p></Row>
                            <Row> <span>Hạn nộp hồ sơ: 11/08/2023</span></Row>
                            </div>
                        </Col>
                        <Col>
                            <Row> 
                                <Button 
                                className="btn btn-md justify-content-md-end" 
                                variant="outline-success"
                                style = {{width: "30%", marginTop: "40px", marginLeft: "250px"}}
                                >Ứng tuyển ngay</Button> </Row>
                            <Row> 
                                <Button 
                                className="btn btn-md justify-content-md-end" 
                                variant="outline-primary"
                                style = {{width: "30%", marginTop: "10px", marginLeft: "250px"}}
                                >Lưu vị trí</Button> </Row>
                        </Col>
                    </Row>
                </div>
                <div className = "detailjobpositionbanner">
                    <Button className = "btn btn-success" variant="outline-light" style = {{marginTop: "20px",marginLeft: "30px"}}>Tin tuyển dụng</Button>
                    <Button className = "btn btn-success" variant="outline-light" style = {{marginTop: "20px",marginLeft: "30px"}}>Việc làm liên quan</Button>
                </div>
                <div className = "detailjobpositionbody">
                    <div>
                        <h2> <span style = {{borderLeft: "6px solid #00b14f"}}></span><span style = {{marginLeft: "10px"}}>Chi tiết tuyển dụng</span></h2>
                    </div>
                    <div>
                    <div className = "detailflex">
                    <div className = "detailflexleft">
                    <Col >
                        <div style = {{backgroundColor: "#f4f5f5", borderRadius: "10px", textAlign: "left", width : "100%", marginLeft: "20px"}}>
                            <Row >
                                <h5 style = {{margin: "20px", color: "#212f3f",fontSize: "16px", fontWeight: "600", lineHeight: "24px"}}>Thông tin chung</h5>
                            </Row>
                            <Row>
                                <Col>
                                    <Row>
                                    <Col style = {{marginLeft: "20px",  marginRight:  "-200px"}}>
                                    <img 
                                    src = "https://www.topcv.vn/v4/image/job-detail/icon/11.svg"
                                    alt = "icon11"
                                    height = "40px"
                                    width = "40px"
                                    
                                    />
                                    </Col>
                                    <Col>
                                        <Row><p style = {{marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400"}}>Mức lương</p></Row>
                                        <Row><p style = {{marginTop: "5px", lineHeight: "20px", fontWeight: "600"}}>{item[0].salary}</p></Row>
                                    </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                    <Col xs = {4} style = {{marginLeft: "0px"}}><img 
                                    src = "https://www.topcv.vn/v4/image/job-detail/icon/14.svg"
                                    alt = "icon14"
                                    height = "40px"
                                    width = "40px"
                                    />
                                    </Col>
                                    <Col style = {{marginLeft: "-48px"}}>
                                        <Row><p style = {{marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400"}}>Số lượng tuyển</p></Row>
                                        <Row><p style = {{marginTop: "5px", lineHeight: "20px", fontWeight: "600"}}>{item[0].number} người</p></Row>
                                    </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row>
                                    <Col style = {{marginLeft: "20px",  marginRight:  "-200px"}}>
                                    <img 
                                    src = "https://www.topcv.vn/v4/image/job-detail/icon/12.svg"
                                    alt = "icon12"
                                    height = "40px"
                                    width = "40px"
                                    
                                    />
                                    </Col>
                                    <Col>
                                        <Row><p style = {{marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400"}}>Hình thức làm việc</p></Row>
                                        <Row><p style = {{marginTop: "5px", lineHeight: "20px", fontWeight: "600"}}>{item[0].workingform}</p></Row>
                                    </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                    <Col xs = {4} style = {{marginLeft: "0px"}}><img 
                                    src = "https://www.topcv.vn/v4/image/job-detail/icon/13.svg"
                                    alt = "icon13"
                                    height = "40px"
                                    width = "40px"
                                    />
                                    </Col>
                                    <Col style = {{marginLeft: "-48px"}}>
                                        <Row><p style = {{marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400"}}>Cấp bậc</p></Row>
                                        <Row><p style = {{marginTop: "5px", lineHeight: "20px", fontWeight: "600"}}>{item[0].position}</p></Row>
                                    </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Row>
                                    <Col style = {{marginLeft: "20px",  marginRight:  "-200px"}}>
                                    <img 
                                    src = "https://www.topcv.vn/v4/image/job-detail/icon/15.svg"
                                    alt = "icon15"
                                    height = "40px"
                                    width = "40px"
                                    
                                    />
                                    </Col>
                                    <Col>
                                        <Row><p style = {{marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400"}}>Giới tính</p></Row>
                                        <Row><p style = {{marginTop: "5px", lineHeight: "20px", fontWeight: "600"}}>{item[0].sex}</p></Row>
                                    </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                    <Col xs = {4} style = {{marginLeft: "0px"}}><img 
                                    src = "https://www.topcv.vn/v4/image/job-detail/icon/14.svg"
                                    alt = "icon14"
                                    height = "40px"
                                    width = "40px"
                                    />
                                    </Col>
                                    <Col style = {{marginLeft: "-48px"}}>
                                        <Row><p style = {{marginTop: "0px", color: "#4d5965", lineHeight: "20px", fontWeight: "400"}}>Kinh nghiệm</p></Row>
                                        <Row><p style = {{marginTop: "5px", lineHeight: "20px", fontWeight: "600"}}>{item[0].experience}</p></Row>
                                    </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                </Col>
                <Col>
                    <div style = {{backgroundColor: '#f4f5f5', marginTop: "20px", marginLeft: "20px", borderRadius: "10px", width: "100%"}}>
                        <Row> <h5 style = {{margin: "20px", color: "#212f3f",fontSize: "16px", fontWeight: "600", lineHeight: "24px"}}>Địa điểm làm việc</h5> </Row>
                        <Row> <p style = {{marginTop: "0px" ,marginLeft: "20px", color: "#4d5965", lineHeight: "20px", fontWeight: "400", paddingRight: "40px"}}> - {item[0].detaillocation}</p> </Row>
                    </div>
                </Col>
                <Col>
                    <div style = {{width: "100%", marginLeft: "20px", marginTop: "10px"}}>
                    <h2> <span style = {{borderLeft: "6px solid #00b14f", marginLeft: "-20px"}}></span><span style = {{marginLeft: "10px"}}>Mô tả công việc</span></h2>
                    <>
                    {item[0].detailjob.map(item=> (
                        <p style = {{marginLeft: "20px"}}> - {item} </p>
                    ))}
                    </>
                    </div>
                </Col>
                <Col>
                    <div style = {{width: "100%", marginLeft: "20px", marginTop: "10px"}}>
                    <h2> <span style = {{borderLeft: "6px solid #00b14f", marginLeft: "-20px"}}></span><span style = {{marginLeft: "10px"}}>Yêu cầu ứng viên</span></h2>
                    <>
                    {item[0].requirements.map(item=> (
                        <p style = {{marginLeft: "20px"}}> - {item} </p>
                    ))}
                    </>
                    </div>
                </Col>
                <Col>
                    <div style = {{width: "100%", marginLeft: "20px", marginTop: "10px"}}>
                    <h2> <span style = {{borderLeft: "6px solid #00b14f", marginLeft: "-20px"}}></span><span style = {{marginLeft: "10px"}}>Quyền lợi</span></h2>
                    <>
                    {item[0].interest.map(item=> (
                        <p style = {{marginLeft: "20px"}}> - {item} </p>
                    ))}
                    </>
                    </div>
                </Col>
                <Col>
                <div style = {{width: "100%", marginLeft: "20px", marginTop: "10px"}}>
                    <h2> <span style = {{borderLeft: "6px solid #00b14f", marginLeft: "-20px"}}></span><span style = {{marginLeft: "10px"}}>Cách thức ứng tuyển</span></h2>
                    <p style = {{marginLeft: "20px"}}>Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển phía trên.</p>  
                    <p style = {{marginLeft: "20px", marginTop: "10px"}}>Hạn nộp hồ sơ: 23/07/2023</p>  
                </div>
                </Col>
            </div>
            <div className = "detailflexright" style = {{marginLeft: "100px"}}>
                <Col style = {{border: "1px solid #00b14f", marginRight: "50px", borderRadius: "10px"}}>
                    <Row style = {{marginTop: "10px"}}>
                       <Col xs = {2}><i className ="bi bi-question-circle" style = {{color: "#00b14f", marginLeft: "30px", marginTop: "5px"}}></i></Col>
                       <Col><h3> Bí kiếp Tìm việc an toàn </h3></Col>
                    </Row>
                    <Row>
                        <p>Dưới đây là những dấu hiệu của các tổ chức, cá nhân tuyển dụng không minh bạch:</p>
                        
                        <span>1. Dấu hiệu phổ biến</span>
                        <div style = {{textAlign: "center"}}>
                        <img 
                        src = "https://www.topcv.vn/v4/image/report/1.png?v=1.0.0"
                        alt = "1.png"
                        width = "200px"
                        height = "200px"
                        />
                        <p style = {{textAlign: "center", marginTop: "10px"}}>Nội dung mô tả công việc sơ sài, không đồng nhất với công việc thực tế</p>
                        </div>
                        <div style = {{textAlign: "center"}}>
                        <img 
                        src = "https://www.topcv.vn/v4/image/report/2.png?v=1.0.0"
                        alt = "1.png"
                        width = "200px"
                        height = "200px"
                        />
                        <p style = {{textAlign: "center", marginTop: "10px"}}>Hứa hẹn "việc nhẹ lương cao", không cần bỏ nhiều công sức dễ dàng lấy tiền "khủng"</p>
                        </div>
                        <div style = {{paddingRight: "-10px"}}>
                        <span>2. Cần làm gì khi gặp việc làm, công ty không minh bạch</span>
                        <li>Kiểm tra thông tin về công ty, việc làm trước khi ứng tuyển</li>
                        <li>Báo cáo tin tuyển dụng với TopCV thông qua nút <b>"Báo cáo tin tuyển dụng"</b> để được hỗ trợ và giúp các ứng viên khác tránh được rủi ro</li>
                        <li>Hoặc liên hệ với TopCV thông qua kênh hỗ trợ ứng viên của TopCV:
                        <br/>Email: {' '}
                        <a href = "hotro@topcv.vn" style = {{textDecoration: "none", color: "#00b14f", fontWeight: "600"}}>hotro@topcv.vn</a>
                        <br/>Hotline: <a href = "hotro@topcv.vn" style = {{textDecoration: "none", color: "#00b14f", fontWeight: "600"}}>(024) 6680 5588</a></li>
                        <Button className = "btn btn-md justify-center" variant = "outline-success" style = {{marginLeft: "130px", marginTop: "30px"}}>Báo cáo tin tuyển dụng</Button>
                        
                        <p style = {{marginTop: "20px", width: "100%"}}>Tìm hiểu thêm kinh nghiệm phòng tránh lừa đảo <a href = "#" style = {{textDecoration: "none", color: "#00b14f", fontWeight: "600"}}>tại đây</a></p>
                        </div>
                    </Row>
                </Col>
            </div>
            </div>
                </div>
            </div>
        </Container>
        
        </div>
        <Footer/>
        </>
    )
};

export default DetailJob;