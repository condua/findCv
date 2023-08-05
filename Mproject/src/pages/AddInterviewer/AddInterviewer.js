import React, { useEffect, useState } from 'react';
import data from './data.json';
import './AddInterviewer.scss';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Typography, Space, Card, Button, Pagination, DatePicker } from 'antd';

const AddInterviewer = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInterviewerName, setSelectedInterviewerName] = useState('');
  const [selectedCandidateName, setSelectedCandidateName] = useState('');
  const itemsPerPage = 6;
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [Des, setDes] = useState('');

  useEffect(() => {
    setTableData(data);
  }, []);

  // calculate total pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentTableData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const generateTimeOptions = () => {
    const startTime = 7;
    const endTime = 18;
    const timeIntervals = 30;

    const timeOptions = [];

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += timeIntervals) {
        const startShift = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endShift = `${(hour + Math.floor((minute + timeIntervals) / 60)).toString().padStart(2, '0')}:${(
          (minute + timeIntervals) % 60
        ).toString().padStart(2, '0')}`;
        const shiftOption = `${startShift} to ${endShift}`;
        timeOptions.push(
          <option key={shiftOption} value={shiftOption}>
            {shiftOption}
          </option>
        );
      }
    }

    return timeOptions;
  };

  const location = useLocation();
  const state = location.state || {};
  const candidateName = state.candidateName || '';
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
  };


  const handleDesChange = (event) => {
    setDes(event.target.value);
  };

  const handleAddButton = (item) => {
    setSelectedInterviewerName(item.name);
    setSelectedCandidateName(candidateName);
  };

  return (
    <div className='AddInterviewer-Home'>
      <h1>Assign phòng cho người phòng vấn</h1>
      {/* New row with two squares arranged horizontally */}
      <div className='row'>
        <div className='square'>
          <h6>Date</h6>
          <DatePicker
            style={{
              width: '100%',
              marginTop: '0px',
              height: '70%',
              borderRadius: '6px',
              backgroundColor: '#e9ecef',
              border: 'none',
              boxSizing: 'border-box',
            }}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className='square'>
          <h6>Name candidate:{selectedCandidateName} </h6>
          <h6>Name interviewer: {selectedInterviewerName}</h6>
        </div>
      </div>
      <div className='row'>
        <div className='square'>
          <h6>Time</h6>
          <select
            className='info'
            value={selectedTime}
            onChange={handleTimeChange}
            style={{
              width: '100%',
              marginTop: '0px',
              height: '70%',
              borderRadius: '6px',
              backgroundColor: '#e9ecef',
              border: 'none',
              boxSizing: 'border-box',
            }}
          >
            <option value=''>-- Chọn thời gian --</option>
            {generateTimeOptions()}
          </select>

        </div>
        <div className='square'>
          <h6>Date and time</h6>
          <div className='DateAndTime'>
            <DatePicker
              style={{
                width: '50%',
                marginTop: '0px',
                height: '100%',
                borderRadius: '6px',
                backgroundColor: '#e9ecef',
                border: 'none',
                boxSizing: 'border-box',
              }}
              disabled='true'
              value={selectedDate}
              onChange={handleDateChange}
            />
            <select
              style={{
                width: '50%',
                marginTop: '0px',
                height: '100%',
                borderRadius: '6px',
                backgroundColor: '#e9ecef',
                border: 'none',
                boxSizing: 'border-box',
              }}
              disabled='true'
              className='info'
              value={selectedTime}
              onChange={handleTimeChange}

            >
              <option value=''>-- Chọn thời gian --</option>
              {generateTimeOptions()}
            </select>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='square'>
          <h6>Description</h6>
          <input
            type='text'
            className='info'
            value={Des}
            onChange={handleDesChange}
            style={{
              width: '100%',
              marginTop: '0px',
              height: '70%',
              borderRadius: '6px',
              backgroundColor: '#e9ecef',
              border: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div className='square'>
          <h6>Description</h6>
          <input
            type='text'
            disabled='true'

            className='info'
            value={Des}
            onChange={handleDesChange}
            style={{
              width: '100%',
              marginTop: '0px',
              height: '70%',
              borderRadius: '6px',
              backgroundColor: '#e9ecef',
              border: 'none',
              boxSizing: 'border-box',
            }}
          />        </div>
      </div>
      <div className='ButtonContainer'>
        <Button id='save-button'>Lưu</Button>
      </div>
      <div className='wrapper'>
        {currentTableData.map((item) => (
          <div className='block' key={item.id}>
            <div>
              <img className='image' src={item.image} />
              <p style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</p>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: item.status === 'Busy' ? 'red' : item.status === 'Free' ? 'blue' : 'black',
                }}
              >
                {item.status}
              </p>
              <div className='Room'>
                <div className='subRoom'>
                  <p style={{ marginBottom: '0px' }}> Quản lý cuộc họp </p>
                  <p> {item.room} cuộc họp </p>
                </div>
                <div className='subRoom'>
                  <p style={{ marginBottom: '0px' }}>Đã phỏng vấn </p>
                  <p> {item.hasInterview} ứng viên</p>
                </div>
              </div>
              <Link>
                <Button id='button' type='primary' disabled={item.status === 'Busy'} onClick={() => handleAddButton(item)}>
                  Add
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className='pagination' style={{ marginTop: '20px', justifyContent: 'center' }}>
          <Pagination current={currentPage} total={tableData.length} pageSize={itemsPerPage} onChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default AddInterviewer;
