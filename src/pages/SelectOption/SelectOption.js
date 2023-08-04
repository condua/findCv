import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import './SelectOption.scss';

function SelectOption() {
  return (
    <div className="selectoption">
      <Col style={{ marginTop: "20px" }}>
        <Row className="link-row">
          <NavLink to="/personal-info" className="item" activeClassName="active">
            <i className="bi bi-person"></i>
            Information
          </NavLink>
        </Row>
        <Row className="link-row">
          <NavLink to="/personal-info" className="item" activeClassName="active">
            <i className="bi bi-calendar"></i>
            Calendar
          </NavLink>
        </Row>
        <Row className="link-row">
          <NavLink to="/submitjob" className="item" activeClassName="active">
            <i className="bi bi-gear"></i>
            Apply Job
          </NavLink>
        </Row>
      </Col>
    </div>
  );
}

export default SelectOption;
