import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import './CVSelect.scss';

function CVSelect() {
  return (
    <div className="cv-select">
      <Col style={{ marginTop: "20px" }}>
        <Row className="link-row">
          <NavLink to="/cvhandler" className="item" activeClassName="active">
            <i className="bi bi-person"></i>
            Resume Digital
          </NavLink>
        </Row>
        <Row className="link-row">
          <NavLink to="/cv" className="item" activeClassName="active">
            <i className="bi bi-gear"></i>
            Build CV
          </NavLink>
        </Row>
      </Col>
    </div>
  );
}

export default CVSelect;
