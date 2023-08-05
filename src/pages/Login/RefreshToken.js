import React,{useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const RefreshToken = () => {
  const token = useSelector((state) => state.auth.accessToken);
  console.log(useSelector((state) => state.auth))
  const [message, setMessage] = useState('');
    
  const handleRefreshToken = async () => {
    try {
      // Gửi yêu cầu POST tới API endpoint để làm mới token
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/auth/refresh-token',{headers})

      // Giải mã và lưu trữ token mới (nếu có) trong localStorage hoặc cookies
    //   const { token } = response.data;
      // localStorage.setItem('access_token', response.data);
      // console.log(response.config.data)
      const log = response.config.data
      
      const split = JSON.parse(log);

      // Access the 'Authorization' header and extract the token
      const tokenNew = split.headers.Authorization.split(' ')[1];      

      console.log(tokenNew)

      // console.log(response.config.data)
      setMessage('Token đã được làm mới thành công.');
    } catch (error) {
      setMessage('Làm mới token thất bại.');
      console.log(error)
    }
  };
  useEffect(() => {
    // Call handleRefreshToken initially when the component mounts
    handleRefreshToken();

    // Set up an interval to call handleRefreshToken every 2 seconds
    const interval = setInterval(handleRefreshToken, 5*60*1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [token]);
  return (
    <div>
      <button onClick={handleRefreshToken}>Làm mới token</button>
      <p>{message}</p>
    </div>
  );
};

export default RefreshToken;
