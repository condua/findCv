import React from 'react';
import './LoginRequired.scss';

const LoginRequired = () => {
  return (
    <div className="login-required">
      <div className="login-required-content">
        <h2 className="login-required-title">Bạn cần đăng nhập để tiếp tục</h2>
        <p className="login-required-description">Vui lòng đăng nhập để truy cập vào nội dung này.</p>
        <img src="https://www.topcv.vn/v4/image/cv-manager/no-cv.png" alt="No CV" className="login-required-image" />
        <button className="login-required-button">Đăng nhập</button>
      </div>
    </div>
  );
};

export default LoginRequired;
