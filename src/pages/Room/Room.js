import React from 'react';
import { useState, useEffect } from 'react';
import "./room.scss"
import { Link, useParams } from 'react-router-dom';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../../constants/common';
import { Spin } from 'antd';

const Room = () => {
  const accessToken = useSelector(state => state.auth.accessToken)
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/interview`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTableData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='Room-home'>
      <h4>Các cuộc phỏng vấn gần đây</h4>
      <div className='container-company'>
        <Link to={`/room/create`}>
          <button id='addRoom' >Thêm phòng họp</button>
        </Link>
        {
          loading ? <Spin /> :
            tableData.map((item) => (
              <div className='company-item' key={item.id}>
                <div className='company-item-top'>
                  {/* <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png' /> */}
                  <h3>{item.roomName}</h3>
                  <p>{item.roomSkill}</p>
                  <button className='status'>{item.status}</button>
                </div>
                <div className='company-item-mid'>
                  <p>{item.roomDescription}</p>
                </div>
                <div className='company-item-bot'>
                  <button className='date'>
                    <h4>{item.startDate}</h4>
                    <p>Ngày bắt đầu</p>
                  </button>
                  <button className='salary'>
                    <h4>{item.endDate}</h4>
                    <p>Ngày kết thúc</p>
                  </button>
                  <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '50vh' }} className='adjustButton'>
                    <Link to={`/room/${item.id}/detail`} ><Button shape="circle" className='DetailButton' icon={<EyeOutlined />}>
                    </Button></Link>

                    <Link to={`/room/${item.id}/edit`}>  <Button style={{ marginLeft: '20px' }} shape="circle" className='EditButton' icon={<EditOutlined />}>
                    </Button></Link>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Room;