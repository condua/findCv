import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginRequest } from "../../redux/action/authActions"
import { logout } from "../../redux/action/authActions"
import { useNavigate } from "react-router-dom"
import { Outlet, useLocation } from "react-router-dom"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import logo from "../../assets/fpt1.png"
import { registerRequest,registerInitial } from "../../redux/action/registerActions";
import "./Register.scss"
import axios from 'axios';
import { Button, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

const Register = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [type1, setType1] = useState("password")
    const [type2, setType2] = useState("password")

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)

    const [error,setError] = useState(useSelector((state) => state.register.error));
    
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // const messageRegister = useSelector(state => state.register.message)
    const [messageRegister,setMessageRegister] = useState("")
    // const response = useSelector((state) => state.auth)
    // console.log(response)

    const [eye1, setEye1] = useState(<AiOutlineEye />)
    const [eye2, setEye2] = useState(<AiOutlineEye />)

    const successMessage = useSelector(state=>state.register.message)

    const handleToggle1 = () => {
        if (show1 === true) {
            setType1("password")
            setEye1(<AiOutlineEye />)
        }
        if (show1 === false) {
            setType1("text")
            setEye1(<AiOutlineEyeInvisible />)
        }
        setShow1(!show1)
    }
    const handleToggle2 = () => {
      if (show2 === true) {
          setType2("password")
          setEye2(<AiOutlineEye />)
      }
      if (show2 === false) {
          setType2("text")
          setEye2(<AiOutlineEyeInvisible />)
      }
      setShow2(!show2)
  }
  const [confirmPassword, setConfirmPassword ] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
        // Hiển thị thông báo lỗi nếu có trường rỗng
        message.info({
          content: 'Vui lòng điền đầy đủ thông tin.',
          icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
          style: {
            color: 'red',
          },
        });
        return;
      }
    const isEmailValid = (email) => {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
    if (!isEmailValid(email)) {
        message.info({
          content: 'Định dạng email không hợp lệ!',
          icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
          style: {
            color: 'red',
          },
        });
        return;
      }
    // Additional validation for password matching
    if (password !== confirmPassword) {
    //   alert("Passwords do not match!");
        message.info({
            content: 'Mật khẩu không khớp với nhau',
            icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>,
            style: {
              color: 'red',
            },
        });
      return;
    }
    try {
        // Gọi API POST để xác thực OTP
        await axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/auth/register', { username, email, password });
        // alert('Xác thực thành công!');
        message.success({
          content: "Tài khoản đã đăng kí thành công",
          onClose: () => {
            navigate('/verify'); // Chuyển hướng sang trang verify
          },
        });
      } catch (error) {
        console.error('OTP không hợp lệ:', error);
        if(error.response.data.message === "Email already exists!")
        {
        message.error({
            content: 'Email đã tồn tại',

        });
        }
        if(error.response.data.message === "Username already exists!")
        {
        message.error({
            content: 'Username đã tồn tại',

        });
        }
      }
    // console.log(error)


    // dispatch(registerRequest(username, email, password));
    
    // console.log(dispatch(registerRequest(username, email, password)))
          
    // if(messageRegister === "Email already exists!")
    // {   
    //     message.error({
    //         content: 'Email đã tồn tại',

    //       });

    //     // navigate('/login')
    //     return;
    // }
    // if(messageRegister === "Username already exists!")
    // {
    //     message.info({
    //         content: 'Username đã tồn tại',
    //         icon: <span style={{ color: 'red', marginRight: '8px' }}>⛔</span>, // Icon là dấu chấm than màu đỏ
    //         style: {
    //           color:'red',
    //           // display: 'flex',
    //           // justifyContent: 'center',
    //           // alignItems: 'center',
    //           // minHeight: 'calc(100vh - 33.33vh)',
    //           // backgroundColor: 'rgba(255, 0, 0, 0.2)', // Màu nền màu đỏ, bạn có thể điều chỉnh giá trị rgba theo ý muốn
    //         },
    //       });
        
        
    // };
      
  };

    return (
        <div className="register-form">
            <div className="form-login">
                <img className="text-login" src={logo}/>
                <div className="input-text">
                  <p style={{ fontWeight: "bold" }}>Username</p>
                    <input
                        type="text"
                        placeholder="Your username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <p style={{ fontWeight: "bold" }}>Email</p>
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <p style={{ fontWeight: "bold" }}>Mật khẩu</p>
                    <p
                        style={{
                            cursor: "pointer",
                            color: "blue",
                            position: "absolute",
                            right: "15px",
                            top: "223px",
                            marginTop: "22px",
                            fontWeight: "bold",
                        }}
                        onClick={handleToggle1}
                    >
                        {eye1}
                    </p>

                    <input
                        type={type1}
                        placeholder="Your password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ paddingRight: "40px" }}
                    />
                    <p style={{ fontWeight: "bold" }}>Nhập lại mật khẩu</p>
                    <p
                        style={{
                            cursor: "pointer",
                            color: "blue",
                            position: "absolute",
                            right: "15px",
                            top: "314px",
                            marginTop: "22px",
                            fontWeight: "bold",
                        }}
                        onClick={handleToggle2}
                    >
                        {eye2}
                    </p>
                    <input
                        type={type2}
                        placeholder="Confirm your password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) =>setConfirmPassword(e.target.value)}
                        required
                        style={{ paddingRight: "40px" }}
                    />
                    {/* <span
                        style={{ fontWeight: "bold", textDecoration: "none" }}
                    >
                        <a href="/reset" id="a-resetpassword">
                            Quên mật khẩu ?
                        </a>
                    </span> */}
                </div>
                <button className="login-button" onClick={handleSubmit} >
                    <h2 style={{ fontSize: "25px" }}>Đăng ký</h2>
                </button>
                <p style={{marginTop:'20px',fontWeight:'300'}}>Have an already account ? <a id="a-register" href="/login" style={{color:'blue',fontWeight:'bolder'}}>Login Here</a></p>
            </div>
           
    
        </div>
    )
}

export default Register
