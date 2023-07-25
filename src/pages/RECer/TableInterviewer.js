import React, { useEffect, useState } from 'react';
import data from './data.json';
import './style.scss'
import { Link } from 'react-router-dom';
import { Typography, Space, Card, Button, Pagination } from "antd"

const TableInterviewer = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPerson, setCurrentPerson] = useState();
  const [viewInfo, setViewInfo] = useState(false);

  const itemsPerPage = 9;

  const handleNameClick = (person) => {
    // setViewInfo(true)
    // setCurrentPerson(person)
    // console.log(person);
  };

  useEffect(() => {
    setTableData(data);
  }, []);

  // calculate total pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentTableData = tableData
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className='TableInterviewer-home'>
      <h1>Quản lý người phỏng vấn</h1>
      <div className='wrapper'>
        {currentTableData.map((item) => (
          <div className='block' key={item.id}>
            <div>
              <img className='image' src={item.image} />
              <p style={{ fontSize: 20, fontWeight: 'bold' }} >{item.name}</p>
              <p style={{ fontSize: 20, fontWeight: 'bold' }}>{item.email}</p>
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
              <Link to={'/interviewers/' + item.id}>
                <button style={{ cursor: 'pointer' }} id='button' >Xem thông tin</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className='pagination' style={{ marginTop: '20px', justifyContent: 'center' }}>
          <Pagination
            current={currentPage}
            total={tableData.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
      {/* {viewInfo && currentPerson && (
        <div className='miniSide'>
          <div className='close-button'>
            <button className='cancel-button' onClick={() => { setViewInfo(false) }}>X</button>
          </div>
          <img className='ava' src={currentPerson.image} />
          <h3>{currentPerson.name}</h3>
          <p>{currentPerson.email}</p>
        </div>
      )

      } */}

    </div>
  )
}

export default TableInterviewer;
