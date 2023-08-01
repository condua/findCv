import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import CV from '../Cv/index'
import './CVSelect.scss';

function CVSelect() {
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
          to="/cvhandler"
          className={`item ${isProfileHovered ? 'text-success' : ''}`}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <i className="bi bi-person"></i>
          Thông tin ứng tuyển
        </NavLink>
      </Row>
      <Row>
        <NavLink
          to="/cv"
          className={`item ${isProfileHovered ? 'text-success' : ''}`}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          <i className="bi bi-gear"></i>
          Tạo CV
        </NavLink>
      </Row>
    </Col>
  );
}

export default CVSelect;
