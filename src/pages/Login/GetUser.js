import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchUsernames } from '../../redux/action/getUserAction';

const GetUser = () => {
  const [data, setData] = useState([]);
  const apiUrl = 'https://qltd01.cfapps.us10-001.hana.ondemand.com/event';
  const userApi ='https://qltd01.cfapps.us10-001.hana.ondemand.com/user'
  const [getUser, setGetUser] = useState({
    status: "OK",
    message: "Success !",
    data: []
  });
  const [sortBy, setSortBy] = useState('name'); // Default sort by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order ascending
  const accessToken = useSelector(state => state.auth.accessToken);
  const pdfUrl = "https://www.newline.co/fullstack-react/assets/media/sGEMe/MNzue/30-days-of-react-ebook-fullstackio.pdf"
  const fileName = 'sample.pdf';
  const  dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsernames(accessToken))
    fetchUser();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUser = async() => {
    try{
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await axios.get(userApi, { headers });
      setGetUser(response.data);
      console.log(response);
      console.log(accessToken);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const sortUsers = (users, sortBy, sortOrder) => {
    return users.slice().sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  };

  const handleSort = (key) => {
    if (key === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const downloadPdf = async () => {
    try {
      const response = await axios.get(pdfUrl, {
        responseType: 'blob', // Set the response type to blob (binary data)
      });

      // Create a Blob object from the binary data
      const blob = new Blob([response.data], { type: 'application/pdf' });

      // Create a URL for the Blob object
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);

      // Simulate a click on the link to trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up the URL object to free up resources
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };
  return (
    <div>
      <h1>Data List</h1>
      <table>
        <thead style={{ paddingLeft: '30px' }}>
          <tr>
            <th onClick={() => handleSort('id')}>Id</th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('email')}>Email</th>
            <th onClick={() => handleSort('permission')}>Role</th>
            <th onClick={() => handleSort('date')}>Date</th>
            <th onClick={() => handleSort('username')}>UserName</th>
          </tr>
        </thead>
        <tbody>
          {sortUsers(getUser.data, sortBy, sortOrder).map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.permission}</td>
              <td>{formatDate(user.dateRegister)}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={downloadPdf}>
        Download PDF
      </button>
    </div>
  );
};

export default GetUser;
