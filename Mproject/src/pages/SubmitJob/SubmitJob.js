import React, { useState } from 'react';
import './SubmitJob.scss';
import Header from './../Header/Header';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import SelectOption from './../SelectOption/SelectOption';
import { Link } from 'react-router-dom';
import jobList from '../../data/jobList.json';
import Footer from "./../Footer/Footer";

function SubmitJob() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const sortOptions = [
    { label: 'Most Recent', value: 'mostRecent' },
    { label: 'Oldest', value: 'oldest' },
  ];

  const convertToSortableDate = (dateString) => {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('-');
    const [time, period] = timePart.split(' ');
    const [hours, minutes] = time.split(':');
    let convertedDate = new Date(year, month - 1, day, hours, minutes);
    
    if (period === 'PM') {
      convertedDate.setHours(convertedDate.getHours() + 12);
    }

    return convertedDate;
  };

  const sortedJobs = jobList.sort((a, b) => {
    const timeA = convertToSortableDate(a.appliedTime).getTime();
    const timeB = convertToSortableDate(b.appliedTime).getTime();
    if (sortOrder === 'mostRecent') {
      return timeB - timeA;
    } else if (sortOrder === 'oldest') {
      return timeA - timeB;
    }
    return 0;
  });

  const filteredJobs = sortedJobs.filter((job) => {
    const jobPosition = job.position.toLowerCase();
    const jobDate = job.appliedAt.toLowerCase();
    return (
      jobPosition.includes(searchTerm.toLowerCase()) &&
      jobDate.includes(filterDate.toLowerCase())
    );
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (e) => {
    setFilterDate(e.target.value);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <>
    <Header />
    <div className = "submittedjob">
      <Container>
        <Row>
          <Col xs={4} style={{ backgroundColor: '#e9eaec' }}>
            <SelectOption />
          </Col>
          <Col style={{ backgroundColor: '#e9eaec', marginLeft: '20px' }}>
            <div className="job-list-container">
              <div className="filters">
                <input
                  type="text"
                  placeholder="Search by job title"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <select value={filterDate} onChange={handleFilter}>
                  <option value="">All Dates</option>
                  <option value="today">Today</option>
                  <option value="this week">This Week</option>
                  <option value="this month">This Month</option>
                </select>
                <div className="sort">
                  <select value={sortOrder} onChange={handleSortOrder}>
                    <option value="">Sort By</option>
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <ul className="job-list">
                {filteredJobs.map((job) => (
                  <li key={job.id}>
                    <div className="job-item">
                      <div className="logo">
                        <img src={job.logoUrl} alt={job.position} />
                      </div>
                      <div className="job-details">
                        <div className="name-and-salary">
                          <Link to={`/body/detailjob/${job.id}`}>
                            <h3>{job.position}</h3>
                          </Link>
                          <p className="salary">{job.salary}</p>
                        </div>
                        <p>{job.company}</p>
                        <p>
                          CV đã ứng tuyển:{" "}
                          <a href={job.cvUrl} target="_blank" rel="noreferrer">
                            CV tải lên
                          </a>
                        </p>
                        <div className="status">
                          <p>{job.status}</p>
                          <p>Vào lúc: {job.appliedTime}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <Footer/>
    </>
  );
}

export default SubmitJob;
