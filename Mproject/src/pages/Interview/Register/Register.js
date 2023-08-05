import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Register.scss"
const Register = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [inputType,setInputType] = useState('password')
    const [checkType,setCheckType] = useState(false)
    const [male,setMale] = useState(false)
    const [female,setFemale] = useState(false)
    const [other,setOther] = useState(false)

    const handleType = () => {
      if (checkType === true) {
        setInputType("password");
      }
      if (checkType === false) {
        setInputType("text");
      }
      setCheckType(!checkType);
    }

    const handleDayChange = (event) => {
      setDay(event.target.value);
    };
  
    const handleMonthChange = (event) => {
      setMonth(event.target.value);
      // Reset the selected day if it is invalid for the selected month
      if (day !== '' && event.target.value !== '') {
        const selectedDay = parseInt(day, 10);
        const selectedMonth = parseInt(event.target.value, 10);
        const selectedYear = year !== '' ? parseInt(year, 10) : new Date().getFullYear();
        const lastDayOfMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        if (selectedDay > lastDayOfMonth) {
          setDay('');
        }
      }
    };
  
    const handleYearChange = (event) => {
      setYear(event.target.value);
    };
  
    const renderDayOptions = () => {
      const options = [];
      for (let i = 1; i <= 31; i++) {
        options.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      return options;
    };
  
    const renderMonthOptions = () => {
      const months = [
        { value: 1, name: 'January' },
        { value: 2, name: 'February' },
        { value: 3, name: 'March' },
        { value: 4, name: 'April' },
        { value: 5, name: 'May' },
        { value: 6, name: 'June' },
        { value: 7, name: 'July' },
        { value: 8, name: 'August' },
        { value: 9, name: 'September' },
        { value: 10, name: 'October' },
        { value: 11, name: 'November' },
        { value: 12, name: 'December' }
      ];
      return months.map((month) => (
        <option key={month.value} value={month.value}>
          {month.name}
        </option>
      ));
    };
  
    const renderYearOptions = () => {
      const currentYear = new Date().getFullYear();
        const options = [];
      for (let year = currentYear; year >= currentYear - 100; year--) {
        options.push(
          <option key={year} value={year}>
            {year}
          </option>
        );
      }
      return options;
    };
    const handleGender = () =>{

    }
    return (
        
        <div className='register'>
            <div id='container-register'>
                <form className='form-register'>
                  <div className='top-main'>
                    <h3>Đăng nhập bằng Google</h3>
                  </div>
                  <div className='middle-main'>
                    <div className='straight-line'>

                    </div>
                    <p>Hoặc</p>
                    <div className='straight-line'>

                    </div>
                  </div>
                  <div style={{width:'100%',alignItems:'center',height:'20px',display:'flex',justifyContent:'center',marginBottom:'20px'}}>
                    Đăng kí bằng địa chỉ email hoặc số điện thoại
                  </div>

                  <div className='bottom-main'>
                    Họ và tên của bạn
                    <input type='text' placeholder='Nhập họ và tên của bạn'/>
                    Email
                    <input type='text' placeholder='Nhập họ và tên của bạn'/>
                    <div style={{width:'100%',position:'relative'}}>
                      Mật khẩu <span style={{position:'absolute',right:'0px',color:'blue',cursor:'pointer'}} onClick={handleType}>Hiện mật khẩu</span>
                    </div>
                    <input type={inputType} placeholder='Nhập họ và tên của bạn'/>
                    Use 8 or more characters with a mix of letters, numbers & symbols
                    <br/>
                    <div className='gender'>
                      <p>Giới tính của bạn là ?</p>

                      <input type='radio' id='tick' name='genders'/> <span>Nam</span>
                      <input type='radio' id='tick' name='genders'/> <span>Nữ</span>
                      <input type='radio' id='tick' name='genders'/> <span>Khác</span>
                      <br/>

                      
                    </div>
                    

                    <div className='birthday'>
                      <p>Ngày tháng năm sinh của bạn là ?</p>
                      <div className='container-select'>
                        <select value={day} onChange={handleDayChange}>
                            <option value="">Day</option>
                            {renderDayOptions()}
                        </select>
                        <select value={month} onChange={handleMonthChange}>
                            <option value="">Month</option>
                            {renderMonthOptions()}
                        </select>
                        <select value={year} onChange={handleYearChange} style={{marginRight:'0px'}}>
                            <option value="">Year</option>
                            {renderYearOptions()}
                        </select>
                      </div>
                    </div>
                    
                    <div style={{width:'100%',height:'20%',backgroundColor:'white',display:'flex',justifyContent:'center',alignItems:'center'}}>
                      <button className='login-button'>
                        <h2><Link to='/login' style={{color:'white',textDecoration:'none'}}>Đăng Nhập</Link></h2>
                      </button>
                      <button className='register-button'>
                        <h2>Đăng Kí</h2>
                      </button>
                    </div>
                  </div>

                  
                </form>
            </div>
        </div>
    );
};

export default Register;