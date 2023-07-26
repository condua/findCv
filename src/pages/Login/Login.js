import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginRequest } from "../../redux/action/authActions"
import { logout } from "../../redux/action/authActions"
import { useNavigate } from "react-router-dom"
import { Outlet, useLocation } from "react-router-dom"
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import google from "../../assets/google.jpg"
import "./Login.scss"

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [type, setType] = useState("password")
    const [show, setShow] = useState(false)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const response = useSelector((state) => state.auth)
    console.log(response)

    const [eye, setEye] = useState(<AiOutlineEye />)
    const handleToggle = () => {
        if (show === true) {
            setType("password")
            setEye(<AiOutlineEye />)
        }
        if (show === false) {
            setType("text")
            setEye(<AiOutlineEyeInvisible />)
        }
        setShow(!show)
    }

    const handleResponse = useCallback(() => {
        // Check if the response object exists and if its 'data' property exists
        if (response && response.data) {
            const { role } = response.data
            if (role === "CANDIDATE") {
                navigate("/")
            } else if (role === "INTERVIEWER") {
                navigate("/interviewer")
            } else if (role === "RECRUITER") {
                navigate("/recruitment")
            } else if (role === "ADMIN") {
                navigate("/admin")
            }
        }
    }, [response, navigate])

    useEffect(() => {
        handleResponse()
    }, [handleResponse])

    const handleLogin = () => {
        dispatch(loginRequest(email, password))
    }

    // const handleLogout = () => {
    //   dispatch(logout());
    // };
    // if(response)
    // {
    //   return navigate('/login')
    // }
    {
        /* 
        <> <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button> </>
       */
    }
    return (
        <div className="login">
            <dive className="form-login">
                <div className="text-login">
                    <h3
                        style={{
                            marginTop: "10px",
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        Đăng nhập
                    </h3>

                    <p style={{ fontSize: "16px", marginTop: "10px" }}>
                        Bạn chưa có tài khoản ?{" "}
                        <span
                            style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                color: "blue",
                            }}
                        >
                            <a href="./register" id="a-register">
                                Đăng kí ngay
                            </a>
                        </span>
                    </p>
                </div>
                <div className="google">
                    <img className="google-icon" src={google} />
                    <p>Đăng nhập bằng google</p>
                </div>
                <div className="mid">
                    <div className="line-border"></div>
                    <h3>Hoặc</h3>
                    <div className="line-border"></div>
                </div>
                <div className="input-text">
                    <p style={{ fontWeight: "bold" }}>Email</p>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                    />
                    <p style={{ fontWeight: "bold" }}>Mật khẩu</p>
                    <p
                        style={{
                            cursor: "pointer",
                            color: "blue",
                            position: "absolute",
                            right: "15px",
                            top: "130px",
                            marginTop: "22px",
                            fontWeight: "bold",
                        }}
                        onClick={handleToggle}
                    >
                        {eye}
                    </p>
                    <input
                        type={type}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ paddingRight: "40px" }}
                    />
                    <span
                        style={{ fontWeight: "bold", textDecoration: "none" }}
                    >
                        <a href="/reset" id="a-resetpassword">
                            Quên mật khẩu ?
                        </a>
                    </span>
                </div>
                <button className="login-button" onClick={handleLogin}>
                    <h2 style={{ fontSize: "25px" }}>Đăng nhập</h2>
                </button>
            </dive>
        </div>
    )
}

export default Login
