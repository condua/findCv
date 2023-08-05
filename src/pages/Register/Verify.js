// src/components/EmailAuthentication.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/fpt1.png"
import protect from "../../assets/protect.png"
import { Button, message,Modal } from 'antd';

import "./Verify.scss"
const Verify = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');


  
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API POST để gửi email và nhận OTP
      const response = await axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/auth/send-otp', { email });
      setShowOtpInput(true);
      if(response.data.status !== "200 OK")
      {
        message.info({
          content: 'Email không tồn tại',
          icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
          style: {
            color: 'red',
          },
        });
        return

      }
    } catch (error) {
      console.error('Lỗi khi gửi email:', error);
      
      message.info({
        content: 'Email không tồn tại',
        icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
        style: {
          color: 'red',
        },
      });
      
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API POST để xác thực OTP
      const response = await axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/auth/verify', { email, otp });
      // alert('Xác thực thành công!');
      if(response.data.status !== "200 OK")
      {
        message.error({
          content: 'Mã OTP không chính xác',
          
        });
        return
      }
      message.success({
        content: 'Tài khoản đã xác thực thành công',
        onClose: () => {
          // Xử lý khi message được đóng (người dùng nhấp vào nút "OK")
          navigate('/login'); // Chuyển hướng sang trang đăng nhập
        },
      });
    } catch (error) {
      console.error('OTP không hợp lệ:', error);
      message.info({
        content: 'Mã OTP không chính xác',
        icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
        style: {
          color: 'red',
        },
      });
    }
  };

  return (
    <div className='verify-form '>
      <div className='form-verify-container'>
        <img className='logo-fpt' src={protect}/>
        {!showOtpInput ? (
          <form onSubmit={handleEmailSubmit} className='form-verify'>
            <h3>Nhập Email của bạn vào đây</h3>
            <input
              type="text"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className='send-button' style={{width:'100%',marginTop:'50px'}}><p>Gửi</p></button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className='form-verify'>
            <h3>Nhập mã OTP của bạn vào đây</h3>
            <input
              type="text"
              placeholder="Nhập OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit" className='send-button' style={{width:'100%',marginTop:'30px'}}><p>Xác thực</p></button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Verify;
