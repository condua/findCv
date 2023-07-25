import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import './SelectOption.scss';

function SelectOption() {
  const [isProfileHovered, setProfileHovered] = useState(false);

  const handleProfileMouseEnter = () => {
    setProfileHovered(true);
  };

  const handleProfileMouseLeave = () => {
    setProfileHovered(false);
  };

  return (
    <Col>
      <Row>
        <NavLink
          to="/personal-info"
          className={`item ${isProfileHovered ? 'text-success' : ''}`}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <i className="bi bi-person"></i>
          Thông tin cá nhân
        </NavLink>
      </Row>
      <Row>
        <NavLink
          to="/personal-info"
          className={`item ${isProfileHovered ? 'text-success' : ''}`}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <i className="bi bi-gear"></i>
          Phỏng vấn
        </NavLink>
      </Row>
      <Row>
        <NavLink
          to="/submitjob"
          className={`item ${isProfileHovered ? 'text-success' : ''}`}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <i className="bi bi-box-arrow-down"></i>
          Việc làm đã nộp
        </NavLink>
      </Row>
      <Row>
        <NavLink
          to="/logout"
          className={`item ${isProfileHovered ? 'text-success' : ''}`}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <i className="bi bi-box-arrow-left"></i>
          Đăng xuất
        </NavLink>
      </Row>
    </Col>
  );
}

export default SelectOption;
