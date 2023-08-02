import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./RoomEdit.scss"
import data from '../data.json';
import { Button, DatePicker, Spin } from 'antd';
import { EditOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API_URL } from '../../../constants/common';
import { useSelector } from 'react-redux';

const RoomEdit = () => {
  const accessToken = useSelector(state => state.auth.accessToken)

  const history = useNavigate();
  let { id } = useParams();
  const [info, setInfo] = useState()
  const [selectedTime, setSelectedTime] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setInfo(response.data.data.find((item) => {
        return item.id == id;
      }));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleDatePickerChange = (dates) => {
    if (dates) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  return (
    <div className='RoomEdit-home'>
      <div className='top-main'>
        <h1>Hello Devs</h1>
      </div>
      {
        loading ? <Spin /> : <div className='container-company'>
          <Link to={`/room/${info?.id}/interviewerAssign`}>
            <button className='AddButton'>Thêm ứng viên vào phòng họp</button>
          </Link>
          <div className='company-item' key={info?.id}>
            <div className='company-item-top'>
              {/* <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png' /> */}
              <h3>{info?.roomName}</h3>
              <p>{info?.roomSkill}</p>
              <button className='status'>{info?.status}</button>
            </div>
            <div className='company-item-mid'>
              <p>{info?.roomDescription}</p>
            </div>
            <div className='company-item-bot'>
              <button className='date'>
                <h4>{info?.startDate}</h4>
                <p>Ngày bắt đầu</p>
              </button>
              <button className='salary'>
                <h4>{info?.endDate}</h4>
                <p>Ngày kết thúc</p>
              </button>

            </div>
          </div>

          <div className='info-container'>
            <h2>Thông tin cơ bản</h2>
            <div className='form-edit'>
              <div className='info-item'>
                <span>Tên phòng họp</span>
                <input className='info' value={info?.roomName} />
              </div>
              <div className='info-item'>
                <span>Kĩ năng</span>
                <input className='info' value={info?.roomName} />
              </div>
              <div className='info-item'>
                <span>Mô tả phòng họp</span>
                <input className='info' value={info?.roomName} />
              </div>
              <div className='info-item'>
                <span>Thời gian bắt đầu</span>
                <input
                  style={{
                    width: '80%',
                    marginTop: '0px',
                    height: '60%',
                    borderRadius: '6px',
                    backgroundColor: 'gainsboro',
                    border: 'none',
                    boxSizing: 'border-box',
                  }}
                  className='info'
                  value={info?.startDate}
                  readOnly
                />
              </div>
              <div className='info-item'>
                <span>Thời gian kết thúc</span>
                <input
                  style={{
                    width: '80%',
                    marginTop: '0px',
                    height: '60%',
                    borderRadius: '6px',
                    backgroundColor: 'gainsboro',
                    border: 'none',
                    boxSizing: 'border-box',
                  }}
                  className='info'
                  value={info?.endDate}
                  readOnly
                />

              </div>
              <div className='info-item'>
                <span>Link phòng họp</span>
                <input className='info' value={info?.roomName} />
              </div>

            </div>
            <Link to={'/Room'}>
              <button className='BackButton'>Back</button>
            </Link>
          </div>
        </div>
      }



    </div>
  );
};

export default RoomEdit;
