import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Header from "./../Header/Header";
import Carou from "./../Carou/Carou";
import './Body.scss'
import Footer from "./../Footer/Footer";
import DetailJob from "./DetailJob/DetailJob";
import { getJobsRequest } from "../../redux/action/jobActions"
import { useDispatch, useSelector } from "react-redux"

function Body() {
  const ITEMS_PER_PAGE = 10;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setShowResults(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobsRequest());
  }, [dispatch]);

  const jobs = useSelector((state) => state.jobs.jobs.filter(job => job.status === true));

  const filteredData = jobs.filter((item) => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation ? item.location === selectedLocation : true;
    const matchesPosition = selectedPosition ? item.position === selectedPosition : true;
    const matchesLanguage = selectedLanguage ? item.language === selectedLanguage : true;
    return matchesSearchTerm && matchesLocation && matchesPosition && matchesLanguage;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getdate = () => {
    const today = new Date();
    const time = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    return time;
  };

  return (
    <>
      <Header />
      <div className="findjob">
        <Container fluid className="w-100">
          <h1 className="text-center text-success" style={{ paddingTop: "20px" }}>
            Tìm việc làm nhanh 24h, việc làm mới nhất.
          </h1>
          <h6 className="text-center text-secondary">
            Tiếp cận 1000+ tin tuyển dụng việc làm mỗi ngày từ doanh nghiệp FPT SoftWare
          </h6>

          <Form className="d-flex w-100 text-center" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Tên công việc, vị trí ..."
              className="me-1"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Form.Select
              aria-label="Location"
              className="me-1"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Tất cả các tỉnh/ Thành phố</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Hà Nội">Hà Nội</option>
            </Form.Select>
            <Form.Select
              aria-label="Language"
              className="me-1"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="">Ngôn ngữ</option>
              <option value="ReactJS">ReactJS</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="Java">Java</option>
              <option value="NodeJS">NodeJS</option>
            </Form.Select>
            <Form.Select
              aria-label="Position"
              className="me-1"
              value={selectedPosition}
              onChange={(e) => setSelectedPosition(e.target.value)}
            >
              <option value="">Vị trí</option>
              <option value="Intern">Intern</option>
              <option value="Fresher">Fresher</option>
              <option value="Middle">Middle</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </Form.Select>
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </Form>

          <div className="mt-10">
            <h5 className="text-center text-secondary mt-3 ">
              <i className="bi bi-calendar-date"></i> Thị trường việc làm hôm nay:{' '}
              <span className="text-success">{getdate()}</span>
            </h5>
            <h6 className="text-center text-secondary">
              Vị trí đang chờ bạn khám phá {'  '} <span className="text-success">{filteredData.length}</span>{' '}
              <i className="bi bi-graph-up-arrow"></i> {'  |  '}
              Việc làm mới 24h gần nhất <span className="text-success">{filteredData.length}</span>
            </h6>
          </div>

          <div className="mt-5">
            <Carou />
          </div>

          {showResults && (
            <Container>
              <hr />
              {paginatedData.map((item) => (
                <Container key={item.id} className="w-100">
                  <Row>
                    <Col md={2} className="d-flex justify-content-center">
                      <div>
                        <img
                          className="d-block w-100 img-fluid"
                          src={item.image}
                          alt="imgPosition"
                        />
                      </div>
                    </Col>
                    <Col md={8}>
                      <Row className="h-25">
                        <div>Name: {item.name}</div>
                      </Row>
                      <Row className="h-50">
                        <div>Language: {item.language}</div>
                      </Row>
                      <Row className="fluid-left">
                        <Col>
                          <div>Position: {item.position}</div>
                        </Col>
                        <Col>
                          <div>ID: {item.id}</div>
                        </Col>
                        <Col>
                          <div>Location: {item.location}</div>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={2}>
                      <Row> </Row>
                      <Row> </Row>

                      <Row style={{ marginTop: "10px" }}>
                        <Link
                          to={`/body/detailjob/${item.id}`}
                          style={{ textDecoration: "none" }}
                          target="_blank"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(`/body/detailjob/${item.id}`, '_blank');
                          }}
                        >
                          <Button variant="outline-success">Xem chi tiết</Button>
                        </Link>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                </Container>
              ))}

              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="outline-success"
                    onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                    disabled={currentPage === 1}
                    className="me-2 rounded-circle btn btn-md "
                  >
                    <span>&lt;</span>
                  </Button>
                  <span className="align-self-center">
                    {currentPage}/{totalPages} trang
                  </span>
                  <Button
                    variant="outline-success"
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={currentPage === totalPages}
                    className="ms-2 rounded-circle btn btn-md "
                  >
                    <span>&gt;</span>
                  </Button>
                </div>
              )}
            </Container>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default Body;
