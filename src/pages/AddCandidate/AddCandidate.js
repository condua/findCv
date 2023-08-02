import React, { useEffect, useState, useRef } from 'react';
import './AddCandidate.scss';
import { BsCameraVideo } from "react-icons/bs"
import { MdOutlineCalendarMonth } from "react-icons/md"
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { BsChatDots } from "react-icons/bs"
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../../constants/common';
import { Typography, Space, Card, Button, Pagination, DatePicker } from 'antd';


const AddCandidate = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedPerson, setSelectedPerson] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [selectedCandidateName, setSelectedCandidateName] = useState('');
  const [selectedCandidateID, setSelectedCandidateID] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [Des, setDes] = useState('');
  const [selectedInterviewers, setSelectedInterviewers] = useState([]);
  const containerRef = useRef(null);
  const [isToggled, setIsToggled] = useState(true);
  let { id } = useParams();
  const idAsLong = parseFloat(id);
  const navigate = useNavigate();
  const accessToken = useSelector(state => state.auth.accessToken)


  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/interview/candidates/2`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTableData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async () => {
    const url = 'https://qltd01.cfapps.us10-001.hana.ondemand.com/interview/candidateAssign';
    try {
      const payload = {
        candidateId: selectedCandidateID,
        date: selectedDate ? selectedDate.format('DD-MM-YYYY') : null,
        time: selectedTime,
        interviewId: idAsLong
      };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log(' Response:', response.data);
    } catch (error) {
      console.error('Event Error:', error);
    }
  };

  useEffect(() => {
    setSelectedInterviewers(state.interviewers)
  }, [])

  // useEffect(() => {
  //   const filteredData = data.filter(
  //     item =>
  //       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       item.email.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setTableData(filteredData);
  // }, [searchQuery]);
  // "candidateId": 0,
  // "interviewId": 0,
  // "date": "string",
  // "time": "string",
  // "description": "string"

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
  const interviewerName = state.interviewerName || '';
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    console.log(state);
  }, [state])

  const handleSortByName = () => {
    const sortedData = [...tableData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setTableData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortById = () => {
    const sortedData = [...tableData].sort((a, b) => {
      if (sortOrder.id === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setTableData(sortedData);
    setSortOrder(prevState => ({ ...prevState, id: sortOrder.id === 'asc' ? 'desc' : 'asc' }));
  };

  const handleSortByEmail = () => {
    const sortedData = [...tableData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.email.localeCompare(b.email);
      } else {
        return b.email.localeCompare(a.email);
      }
    });
    setTableData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleNameClick = (person) => {
    setSelectedPerson(person);
    setIsSidebarOpen(true);
    setIsToggled(true)
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };


  useEffect(() => {
    const handleClickOutsideSidebar = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !containerRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutsideSidebar);

    return () => {
      document.removeEventListener('click', handleClickOutsideSidebar);
    };
  }, []);

  const handleClickInfo = () => {
    setIsToggled(true);
  };
  const handleClickCV = () => {
    setIsToggled(false);
  };

  const getStatusColor = (status) => {

    switch (status) {
      case 'Đã chấm':
        return {
          padding: '6px, 12px, 6px, 12px',
          textAlign: 'center',
          color: '#00A3FF',
          backgroundColor: '#F1FAFF',
          border: 'none',
          padding: '8px 6px',
          borderRadius: '30px',
          fontWeight: 'bolder'
        };
      case 'Đang chấm':
        return {
          padding: '6px, 12px, 6px, 12px',
          textAlign: 'center',
          color: '#F1BC00',
          backgroundColor: '#FFF8DD',
          border: 'none',
          padding: '8px 6px',
          borderRadius: '30px',
          fontWeight: 'bolder'
        };
      case 'Chấp nhận':
        return {
          padding: '6px, 12px, 6px, 12px',
          textAlign: 'center',
          color: '#50CD89',
          backgroundColor: '#E8FFF3',
          border: 'none',
          padding: '8px 6px',
          borderRadius: '30px',
          fontWeight: 'bolder'
        };
      default:
        return {
          padding: '6px, 12px, 6px, 12px',
          textAlign: 'center',
          color: 'red',
          backgroundColor: '#FFF5F8',
          border: 'none',
          padding: '8px 6px',
          borderRadius: '30px',
          fontWeight: 'bolder'
        };
    }
  };
  const handleAddButton = (item) => {
    setSelectedCandidateName(item.fullName);
    setSelectedCandidateID(item.userId);
  };

  return (
    <div className='AddCandidate-Home'>
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
            format="DD-MM-YYYY"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className='square'>
          <h6>Name candidate:{selectedCandidateName} </h6>
          <h6>Name interviewer: {selectedInterviewers?.map((interviewer) => {

            return (<Link to={`/user/${interviewer.id}`}>
              <span className='interviewer-name'>{interviewer.usernameReal}</span>
            </Link>)
          })}</h6>
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
              format="DD-MM-YYYY"
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

{/* 
      <div className='ButtonContainer'>
        <Button onClick={handleSubmit} id='save-button'>Lưu</Button>
      </div> */}
      <div style={{ width: '100%', height: 'auto', backgroundColor: '#e9ecef', paddingBottom: '92px', paddingTop: '1px' }}>
        <div className="outer-wrapper"  >
          <div className="table-wrapper">
            <div className='container-search'>
              <input
                className='searchItem'
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name or email"

              />
              <span className="search-icon"></span>
            </div>

            <div style={{ width: '100%', height: '100%', marginTop: '20px' }}>
              <table id="candidates" ref={containerRef} >
                <thead>
                  <tr style={{ position: 'sticky', position: '-webkit-sticky', backgroundColor: 'blue' }}>
                    {/* <th onClick={handleSortById}>ID
                {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th> */}
                    <th style={{ borderLeft: '1px dashed ' }}>Avatar</th>
                    <th onClick={handleSortByName}>
                      Name
                      {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                    </th>
                    {/* <th onClick={handleSortByEmail}>
                Email
                {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th> */}
                    <th>Kinh nghiệm</th>
                    <th>Vị trí ứng tuyển</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(item => (
                    <tr key={item.id} onClick={() => handleNameClick(item)} style={{ cursor: 'pointer' }}>
                      {/* <td>{item.id}</td> */}
                      <td style={{ paddingRight: '5px' }}>
                        <img className='avatar-img' src={item.avatar} />


                      </td>
                      <td onClick={() => handleNameClick(item)} style={{ cursor: 'pointer' }}>
                        <p style={{ marginBottom: '10px' }}>{item.fullName}</p>
                        <p>{item.email}</p>
                      </td>
                      <td>{item.experience}</td>
                      <td>{item.skill}</td>
                      <td>
                        <div style={getStatusColor(item.interviewStatus)}>
                          {item.interviewStatus}
                        </div>
                      </td>
                      <td style={{ alignItems: 'center' }}><Link
                        style={{ textDecoration: 'none' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddButton(item);
                        }}
                      ><button className='edit-button'>Thêm</button></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isSidebarOpen && selectedPerson && (
            <div className='container'>
              <div className="container-main" ref={sidebarRef}>
                <div className='containerAvatar'>

                  <img src={selectedPerson.image} className='avatar' />

                  <div className='name'>
                    <h2>{selectedPerson.name}</h2>

                    <p>Ứng tuyển: Java dev</p>
                    <p style={{ marginTop: '10px' }}> Ngày ứng tuyển: 23/06/2023</p>
                    <span style={{ marginTop: '10px', cursor: 'pointer' }}>
                      <BsCameraVideo />
                      <MdOutlineCalendarMonth style={{ marginLeft: '10px' }} />
                      <BsChatDots style={{ marginLeft: '10px' }} />
                    </span>

                  </div>
                </div>
                <div className='containerInformation'>
                  <div className='button'>
                    <button className='button-info' onClick={handleClickInfo}>Thông tin cá nhân</button>
                    <button className='button-cv' onClick={handleClickCV}>Thông tin CV</button>
                    <button className="close-button" onClick={handleCloseSidebar}>
                      x
                    </button>
                  </div>
                  {isToggled === true
                    ?
                    <div className='information'>
                      <div className='itemInfo'>
                        <h3>Họ và tên: {selectedPerson.name} </h3>
                      </div>
                      <div className='itemInfo'>
                        <h3>Tài khoản: </h3>
                      </div>
                      <div className='itemInfo'>
                        <h3>Email: {selectedPerson.email}</h3>
                      </div>
                      <div className='itemInfo'>
                        <h3>Số điện thoại:</h3>
                      </div>
                      <div className='itemInfo'>
                        <h3>Quốc gia:</h3>
                      </div>
                    </div>

                    :

                    <div className='information'>
                      <div className='itemInfo'>
                        <h3>Họ và tên: {selectedPerson.name} </h3>
                      </div>
                      <div className='itemInfo'>
                        <h3>Học vấn: </h3>
                      </div>
                      <div className='itemInfo'>
                        <h3>Kinh nghiệm làm việc: </h3>
                      </div>
                      <div className='itemInfo'>
                        <h3>Số điện thoại:</h3>
                      </div>
                      <div className='itemInfo'>
                        <h3>Dự án:</h3>
                      </div>
                    </div>
                  }

                </div>

                {/* Add more information as needed */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCandidate;
