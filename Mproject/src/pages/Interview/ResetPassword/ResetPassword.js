import React from 'react';
import "./ResetPassword.scss"
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const navigate = useNavigate()
    return (
        <div className='ResetPassword'>
            <div className='container-reset'>
                <div className='form-reset'>
                    <div className='top-main'>
                        <h2>Quên mật khẩu</h2>
                        <p>Bạn chưa có tài khoản <span style={{color:'blue',textDecoration:'underline', cursor:'pointer'}} onClick={()=>{navigate('./register')}}>Đăng kí ?</span></p>
                    </div>
                    <div className='mid-main'>
                        <p>Hãy nhập mật khẩu mới của bạn</p>
                    </div>
                    <div className='bottom-main'>
                        <form>
                            <p>Nhập mật khẩu</p>
                            <input type='password'/>
                            <p>Nhập lại mật khẩu</p>
                            <input type='password'/>
                            <div style={{width:'100%',alignItems:'center',display:'flex',justifyContent:'center',height:'20%'}}>
                                <button className='reset-button'><h2>Đổi mật khẩu</h2></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;