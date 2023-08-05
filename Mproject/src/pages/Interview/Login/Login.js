// import React, { useState } from "react";
// import "./Login.scss";
// import data from "./data.json";
// import { useNavigate, Navigate } from "react-router-dom";
// import Register from "../Register/Register";
// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loginError, setLoginError] = useState(false);
//   const [show, setShow] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [register, setRegister] = useState(false);
//   const [type, setType] = useState("password");
//   const navigate = useNavigate();

//   const handleToggle = () => {
//     if (show === true) {
//       setType("password");
//     }
//     if (show === false) {
//       setType("text");
//     }
//     setShow(!show);
//   };

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleLogin = (event) => {
//     event.preventDefault();

//     const user = data.users.find(
//       (user) => user.username === username && user.password === password
//     );

//     if (user) {
//       // Perform successful login action (e.g., redirect to dashboard)
//       console.log("Login successful!");
//       localStorage.clear();

//       //storage token field with value is true
//       localStorage.setItem("token", true);

//       console.log(localStorage.getItem("token"));

//       localStorage.setItem("loginUser", JSON.stringify(user));

//       console.log(localStorage.getItem("loginUser"));
//       alert("Đăng nhập thành công");
//       setIsLoggedIn(true);

//       navigate("/home");
//       window.location.reload();

//     } else {
//       localStorage.setItem("token", false);

//       setLoginError(true);
//       alert("Sai tài khoản hoặc mật khẩu");
//     }
//   };
//   if (localStorage.getItem("token") === "true") {
//     return <Navigate to="/home" />;
//   }
//   return (
//     <div className="login">
//       <form className="form-login" onSubmit={handleLogin}>
//         <div className="text">
//           <h2 style={{ marginTop: "10px" }}>Đăng nhập</h2>
//           <p style={{ fontSize: "16px", marginTop: "10px" }}>
//             Bạn chưa có tài khoản ?{" "}
//             <span
//               style={{
//                 textDecoration: "underline",
//                 cursor: "pointer",
//                 color: "blue",
//               }}
//             >
//               <a href="./register">Đăng kí</a>
//             </span>
//           </p>
//         </div>
//         <div className="google">
//           <p>Đăng nhập bằng google</p>
//         </div>
//         <div className="mid">
//           <div className="line-border"></div>
//           <h3>Hoặc</h3>
//           <div className="line-border"></div>
//         </div>
//         <div className="input-text">
//           <p>Tài khoản Email hoặc số điện thoại</p>
//           <input type="text" value={username} onChange={handleUsernameChange} />
//           <p>Mật khẩu</p>
//           <p
//             style={{
//               cursor: "pointer",
//               color: "blue",
//               position: "absolute",
//               right: "0px",
//               top: "75px",
//               marginTop: "20px",
//             }}
//             onClick={handleToggle}
//           >
//             Hiện mật khẩu
//           </p>
//           <input type={type} value={password} onChange={handlePasswordChange} />
//           <span><a href="./reset">Quên mật khẩu</a></span>
//         </div>
//         <button className="login-button" type="submit">
//           <h2 style={{ color: "white" }}>Đăng nhập</h2>
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
