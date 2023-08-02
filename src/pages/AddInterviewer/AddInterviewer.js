import React, { useEffect, useState } from 'react';
import './AddInterviewer.scss';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, Pagination, Spin, Checkbox } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../../constants/common';

const AddInterviewer = () => {
  const accessToken = useSelector(state => state.auth.accessToken)

  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInterviewers, setSelectedInterviewers] = useState([]);
  const itemsPerPage = 9;
  let { id } = useParams();
  const idAsLong = parseFloat(id);
  const [selectinterviewerEmail, setselectinterviewerEmail] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/interview/interviewers`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTableData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async () => {
    const url = 'https://qltd01.cfapps.us10-001.hana.ondemand.com/interview/interviewerAssign';
    try {
      const payload = {
        interviewerEmail: selectinterviewerEmail,
        roomId: idAsLong

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

  // calculate total pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentTableData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (e, item) => {
    const { checked } = e.target;
    if (checked) {
      if (selectedInterviewers.length < 3) {
        setSelectedInterviewers([...selectedInterviewers, item]);
      }
    } else {
      setSelectedInterviewers(
        selectedInterviewers.filter(
          (interviewer) => interviewer.id !== item.id
        )
      );
    }
    setselectinterviewerEmail(item.email);
  };

  const handleAdd = () => {
    setselectinterviewerEmail(selectinterviewerEmail);
    navigate(`/room/${id}/interviewerAssign/candidateAssign`, {
      state: { interviewers: selectedInterviewers },
    });
  };

  return (
    <div className='AddInterviewer-Home'>
      <div className='wrapper'>
        {loading ? (
          <Spin />
        ) : (
          currentTableData.map((item) => (
            <div className='block' key={item.id}>
              <div>
                <img className='image' src={item.image} alt='Interviewer' />
                <p style={{ fontSize: 20, fontWeight: 'bold' }}>
                  {item.usernameReal}
                </p>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color:
                      item.status === 'Busy'
                        ? 'red'
                        : item.status === 'Free'
                          ? 'blue'
                          : 'black',
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
                <Checkbox
                  id='checkbox'
                  checked={selectedInterviewers.some(
                    (interviewer) => interviewer.id === item.id
                  )}
                  disabled={item.status === 'Busy'}
                  onChange={(e) => handleCheckboxChange(e, item)}
                >
                  Select
                </Checkbox>
              </div>
            </div>
          ))
        )}
      </div>
      <Button
        style={{ backgroundColor: 'blue' }}
        type='primary'
        onClick={() => {
          handleAdd();
          handleSubmit();
        }}
        disabled={selectedInterviewers.length === 0}
      >
        Add
      </Button>
      <div className='pagination' style={{ marginTop: '20px', justifyContent: 'center' }}>
        <Pagination
          current={currentPage}
          total={tableData.length}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
        />

      </div>
    </div>
  );
};

export default AddInterviewer;
