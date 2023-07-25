import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../redux/action/authActions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const response = useSelector(state => state.auth);

  
  const handleResponse = useCallback(() => {
    // Check if the response object exists and if its 'data' property exists
  
    if (response && response.data) {
      const { role } = response.data;
    
      if (role === "CANDIDATE") {
        navigate("/");
      }
      else if (role === "INTERVIEWER") {
        navigate("/home");
      }
      else if (role === "RECRUITER") {
        navigate("/home");
      }
      else if (role === "ADMIN") {
        navigate("/home");
      }
      
    }
  }, [response, navigate]);

  useEffect(() => {
    handleResponse();
  }, [handleResponse]);

  const handleLogin = () => {
    dispatch(loginRequest(email, password));
  };

  return (
    <div>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
