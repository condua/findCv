import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { NavLink, Link } from "react-router-dom";
import "./CandidateEvent.scss";
import Header from "./../Header/Header";
import event from "../../data/event.json";
import Footer from "./../Footer/Footer";

function CandidateEvent() {
  const EVENTS_PER_PAGE = 3;
  const eventdata = event;
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(true);
  const totalEventPage = Math.ceil(eventdata.length / EVENTS_PER_PAGE);
  const paginatedData = eventdata.slice(
    (currentPage - 1) * EVENTS_PER_PAGE,
    currentPage * EVENTS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalEventPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
    <Header />
    <div className="eventpage">
      <div className="event">
        <div className="event-banner">
          <span className="event-letter event-letter-1">S</span>
          <span className="event-letter event-letter-2">Ự</span>
          <span className="event-letter event-letter-3"></span>
          <span className="event-letter event-letter-4">K</span>
          <span className="event-letter event-letter-5">I</span>
          <span className="event-letter event-letter-6">Ệ</span>
          <span className="event-letter event-letter-7">N</span>
        </div>
        <p className="text2">Các sự kiện nghiên cứu đang diễn ra tại FPT SoftWare</p>
        <div className="eventsplit">
          <Row>
            <Col className="eventleft">
              <div className="event-heading">
                <h2 className="event-title">Sự kiện đang diễn ra</h2>
              </div>
              {paginatedData.map((item) => (
                <div key={item.id} className="event-card">
                  <img src={item.image} alt="Pictures" className="event-image" />
                  <div className="event-details">
                    <div className="event-date-author">
                      <i className="bi bi-calendar2-month">
                        <span className="event-date">{item.time}</span>
                      </i>
                      <i className="bi bi-person">
                        <span className="event-author">{item.author}</span>
                      </i>
                      <span>Comments</span>
                    </div>
                    <div className="event-name">{item.name}</div>
                    <div className="event-article">{item.article}</div>
                    <div className="event-button">
                      <Link
                        to={`/candidateevent/detailevent/${item.id}`}
                        className="btn btn-outline-success"
                        target="_blank"
                      >
                        Tìm hiểu thêm
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {totalEventPage > 1 && (
                <Row className="event-pagination">
                  <Col>
                    <Button
                      variant="outline-success"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="rounded-circle"
                    >
                      <span>&lt;</span>
                    </Button>
                    <span className="align-self-center">
                      {currentPage}/{totalEventPage} trang
                    </span>
                    <Button
                      variant="outline-success"
                      onClick={handleNextPage}
                      disabled={currentPage === totalEventPage}
                      className="rounded-circle"
                    >
                      <span>&gt;</span>
                    </Button>
                  </Col>
                </Row>
              )}
            </Col>
            <Col className="event-right">
              <div className="search">
                <div className="search-input">
                  <input type="text" placeholder="Search theo tên của Event" />
                  <i className="bi bi-search search-icon"></i>
                </div>
              </div>
              <div className="recentpost">
                <h4>Recentpost</h4>
                {eventdata
                  .slice(-3)
                  .reverse()
                  .map((item) => (
                    <div className="post" key={item.id}>
                      <div className="post-avatar">
                        <img src={item.image} alt="Avatar" />
                      </div>
                      <div className="post-content">
                        <div className="post-info">
                          <span className="post-name">{item.name}</span>
                          <div className="post-date">{item.time}</div>
                          <div className="post-author">{item.author}</div>
                        </div>
                      </div>
                    </div>
                  ))
                  .slice(0, 3)}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default CandidateEvent;
