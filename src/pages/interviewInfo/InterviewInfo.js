import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./viewInfo.scss"
import data from '../RECer/data.json';


const InterviewInfo = () => {
  const history = useNavigate();
  let { id } = useParams();
  const [info, setInfo] = useState(data.find((item) =>
      item.id === parseInt(id)
  ))
  
  return (
    <div className='InterviewInfo-edit-container'>
      <div className='top-main'>  
          <h1>Hello Devs !</h1>
      </div>
    
      <div className='avatar-container'>
            <div className='Column'>
            <img className='avatar-edit' src={info.image} alt='hinhavt' />
            <h2>{info.name}</h2>
            <p>- Người phỏng vấn</p>
            </div>
            <div className='Room'>
                <div className='subRoom'>
                  <p style={{ marginBottom: '0px' }}> Quản lý cuộc họp </p>
                  <p> {info.room} cuộc họp </p>
                </div>
                <div className='hasInterview'>
                  <p style={{ marginBottom: '0px' }}>Đã phỏng vấn </p>
                  <p> {info.hasInterview} ứng viên</p>
                </div>
            </div>
      </div>

      <div className='info-container'>
        <h2>Thông tin cơ bản</h2>
        <div className='form-edit'>
          <div className='info-item' style={{marginTop:'15px'}}>
              <p>Họ và tên</p>
              <p className='info' >{info.name}</p>
          </div>
          <div className='info-item'>
              <p>Tài khoản</p>
              <p className='info'>{info.name}</p>
          </div>
          <div className='info-item'>
              <p>Email</p>
              <p className='info'>{info.email}</p>
          </div>
          <div className='info-item'>
              <p>Số điện thoại</p>
              <p className='info'>{info.phone}</p>
          </div>
          <div className='info-item'>
              <p>Địa chỉ</p>
              <p className='info'>{info.address}</p>
          </div>    
        </div>
        <Link to={'/interviewers'}>
          <button>Back</button>
          </Link>
      </div>
      
    </div>
  );
};

export default InterviewInfo;
