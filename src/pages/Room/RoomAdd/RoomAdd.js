import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RoomAdd.scss';
import { DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { API_URL } from '../../../constants/common';

import axios from 'axios';

const RoomAdd = () => {
    const accessToken = useSelector(state => state.auth.accessToken);

    const history = useNavigate();
    const [roomName, setRoomName] = useState('');
    const [roomSkill, setRoomSkill] = useState('');
    const [jobPostId, setjobPostId] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [linkMeet, setlinkMeet] = useState('');

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDatePickerChange = (dates) => {
        if (dates) {
            setStartDate(dates[0]);
            setEndDate(dates[1]);
        } else {
            setStartDate(null);
            setEndDate(null);
        }
    };

    // const handleSaveChanges = async () => {
    //     const newRoom = {
    // roomName: roomName,
    // roomSkill: roomSkill,
    // roomDescription: roomDescription,
    // startDate: startDate ? startDate.format('YYYY-MM-DD') : null,
    // endDate: endDate ? endDate.format('YYYY-MM-DD') : null,
    // status: 'Đang mở',
    //     };

    //     try {
    //         const response = await axios.post(
    //             `${API_URL}/interview/create-interview`,
    //             newRoom,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         );

    //         history('/Room');
    //     } catch (error) {
    //         console.error('Error adding room:', error);
    //     }
    // };
    const handleaddRoom = async () => {
        const roomurl = 'https://qltd01.cfapps.us10-001.hana.ondemand.com/interview/create-interview';
        try {
            const payload = {
                jobPostId: 2,
                roomName: roomName,
                roomSkill: roomSkill,
                roomDescription: roomDescription,
                startDate: startDate ? startDate.format('DD-MM-YYYY') : null,
                endDate: endDate ? endDate.format('DD-MM-YYYY') : null,
                status: 'Đang mở',
                linkmeet: linkMeet
            };
            const response = await axios.post(roomurl, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            console.log(' Response:', response.data);
        } catch (error) {
            console.error('Event Error:', error);
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
                            <input type="text" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                        </div>
                        <div className='info-item'>
                            <span>Kĩ năng</span>
                            <input type="text" value={roomSkill} onChange={(e) => setRoomSkill(e.target.value)} />
                        </div>
                        <div className='info-item'>
                            <span>Mô tả phòng họp</span>
                            <input type="text" value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} />
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
                                format="DD-MM-YYYY"
                                suffixIcon={<CalendarOutlined style={{ color: '#8c8c8c' }} />}
                            />
                        </div>
                        <div className='info-item'>
                            <span>Link phòng họp</span>
                            <input type="text" value={linkMeet} onChange={(e) => setlinkMeet(e.target.value)} />
                        </div>
                    </div>
                    <div className='buttons'>
                        <Link to={'/Room'}>
                            <button className='BackButton' onClick={handleaddRoom}>
                                Lưu thay đổi
                            </button>
                            <button className='BackButton'>Quay lại</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomAdd;
