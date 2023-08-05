import React, { useState } from 'react';
import axios from 'axios';
import "./ResetPassword.scss"
import reset from "../../assets/reset.png"
import { useNavigate } from 'react-router-dom';

import { message } from 'antd';

const ResetPassword = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [userId,setUserId] = useState('')

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/recover/send-otp', { email });
      const responseData = response.data;
      console.log(responseData.message); // Hiển thị "Success !" nếu thành công
      if(String(responseData.status) !== "200 OK")
      {
        message.info({
            content: 'Email không tồn tại trong hệ thống',
            icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
            style: {
              color: 'red',
            },
          });
          return
      }
      setStep(2); // Chuyển sang bước 2 sau khi gửi email thành công
      
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
      const response = await axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/recover/verify', { email, otp });
      const responseData = response.data;
      console.log(responseData.message); // Hiển thị "Success !" nếu thành công
      console.log(responseData.data.userId); // Hiển thị userId từ phản hồi
      if(String(responseData.status) !== "200 OK")
      {
        message.info({
            content: 'Mã OTP không đúng',
            icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
            style: {
              color: 'red',
            },
          });
          return
      }
      setUserId(responseData.data.userId)
      setOtp(responseData.data.otp)
      setStep(3); // Chuyển sang bước 3 sau khi gửi OTP thành công
    } catch (error) {
      console.error('Lỗi khi gửi OTP:', error);
      message.info({
        content: 'Mã OTP không chính xác',
        icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
        style: {
          color: 'red',
        },
      });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://qltd01.cfapps.us10-001.hana.ondemand.com/recover/password?u=${userId}&o=${otp}`, { password, confirmPassword });
      const responseData = response.data;
      console.log(responseData.message); // Hiển thị "Success !" nếu thành công
      if(String(responseData.status) !== "200 OK")
      {
        message.info({
            content: 'Password không chính xác',
            icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
            style: {
              color: 'red',
            },
          });
          return
      }
      message.success({
        content: 'Mật khẩu đã được thay đổi thành công',
        onClose: () => {
          // Xử lý khi message được đóng (người dùng nhấp vào nút "OK")
          navigate('/login'); // Chuyển hướng sang trang đăng nhập
        },
      });
    } catch (error) {
      console.error('Lỗi khi gửi PUT API:', error);
      message.info({
        content: 'Password không chính xác',
        icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
        style: {
          color: 'red',
        },
      });
    }
  };

  return (
    <div className='reset-form '>
      <div className='form-reset-container'>
        {/* <h1>ResetPassword</h1> */}
        <img className='logo-fpt' src={reset}/>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className='form-reset'>
                <h3>Reset Password</h3>
                <input
                type="text"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className='send-button' style={{width:'100%',marginTop:'50px'}}><p>Gửi</p></button>
          </form>
        )}
        {step === 2 && (
            <form onSubmit={handleOtpSubmit} className='form-reset'>
                <h3>Reset Password</h3>
                <input
                type="text"
                placeholder="Nhập mã OTP của bạn"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                />
                <button type="submit" className='send-button' style={{width:'100%',marginTop:'50px'}}><p>Gửi</p></button>
          </form>
        )}
        {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className='form-reset'>
                <h3>Reset Password</h3>
                <input
                style={{marginTop:'-20px'}}
                type="password"
                placeholder="Nhập mật khẩu mới"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <input
                style={{marginTop:'20px'}}
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" className='send-button' style={{width:'100%',marginTop:'20px'}}><p>Xác nhận</p></button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
