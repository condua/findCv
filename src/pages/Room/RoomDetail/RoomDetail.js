import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./RoomDetail.scss"
import data from '../data.json';
import { Button, DatePicker } from 'antd';
import { EditOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons';


const RoomDetail = () => {
    const history = useNavigate();
    let { id } = useParams();
    const [info, setInfo] = useState(data.find((item) =>
        item.RoomId === parseInt(id)
    ))
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


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
        <div className='RoomDetail-home'>
            <div className='top-main'>
                <h1>Hello Devs</h1>
            </div>
            <div className='container-company'>
                <Link to={`/room/${info.RoomId}/candidate`}>
                    <button className='AddButton'>Thêm ứng viên vào phòng họp</button>
                </Link>
                <div className='company-item' key={info.id}>
                    <div className='company-item-top'>
                        <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png' />
                        <h3>{info.RoomName}</h3>
                        <p>{info.RoomType}</p>
                        <button className='status'>{info.Status}</button>
                    </div>
                    <div className='company-item-mid'>
                        <p>{info.RoomDescription}</p>
                    </div>
                    <div className='company-item-bot'>
                        <button className='date'>
                            <h4>{info.StartDate}</h4>
                            <p>Ngày bắt đầu</p>
                        </button>
                        <button className='salary'>
                            <h4>{info.EndDate}</h4>
                            <p>Ngày kết thúc</p>
                        </button>

                    </div>
                </div>

                <div className='info-container'>
                    <h2>Thông tin cơ bản</h2>
                    <div className='form-edit'>
                        <div className='info-item'>
                            <span>Tên phòng họp</span>
                            <input className='info' value={info.RoomName} />
                        </div>
                        <div className='info-item'>
                            <span>Kĩ năng</span>
                            <input className='info' value={info.RoomName} />
                        </div>
                        <div className='info-item'>
                            <span>Mô tả phòng họp</span>
                            <input className='info' value={info.RoomName} />
                        </div>
                        <div className='info-item'>
                            <span>Thời gian</span>

                            <DatePicker.RangePicker
                                style={{
                                    width: '80%',
                                    marginTop: '0px',
                                    height: '60%',
                                    borderRadius: '6px',
                                    backgroundColor: 'gainsboro',
                                    border: 'none',
                                    boxSizing: 'border-box',
                                }}
                                value={[startDate, endDate]}
                                onChange={handleDatePickerChange}
                                allowClear={false}
                                suffixIcon={<CalendarOutlined style={{ color: '#8c8c8c' }} />}
                            />
                        </div>
                        <div className='info-item'>
                            <span>Link phòng họp</span>
                            <input className='info' value={info.RoomName} />
                        </div>

                    </div>
                    <Link to={'/Room'}>
                        <button className='BackButton'>Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;
