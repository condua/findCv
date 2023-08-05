import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./RoomAdd.scss"
import data from '../data.json';
import { Button, DatePicker } from 'antd';
import { EditOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons';


const RoomAdd = () => {
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
        <div className='RoomAdd-home'>
            <div className='container-company'>
                <div className='info-container'>
                    <h2>Thông tin cơ bản</h2>
                    <div className='form-edit'>
                        <div className='info-item'>
                            <span>Tên phòng họp</span>
                            <input />
                        </div>
                        <div className='info-item'>
                            <span>Kĩ năng</span>
                            <input />
                        </div>
                        <div className='info-item'>
                            <span>Mô tả phòng họp</span>
                            <input />
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
                            <input />
                        </div>

                    </div>
                    <Link to={'/Room'}>
                        <button className='BackButton'>Lưu thay đổi</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoomAdd;
