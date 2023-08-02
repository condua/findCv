import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Unauthorized = () => {
    const role = useSelector(state => state.auth.data.role)
    const navigate = useNavigate()

    const handleNavigate =() =>{
        if(role === 'CANDIDATE')
        {
            navigate('/')
        }
        else if(role === 'INTERVIEWER')
        {
            navigate('/interviewer')
        }
        else if(role === 'RECRUITER')
        {
            navigate('/recruitment')
        }
        else if(role === 'ADMIN')
        {
            navigate('/interviewer')
        }
    }

    return (
        <div>
            404 error Page not found. Trang này không có sẵn. Quay lại trang chính với vai trò của bạn <button onClick={handleNavigate} style={{color:'blue'}}>Ngay bây giờ</button>
        </div>
    );
};

export default Unauthorized;