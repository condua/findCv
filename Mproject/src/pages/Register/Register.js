import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../redux/action/action.js';

const Register = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(username, password));
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
