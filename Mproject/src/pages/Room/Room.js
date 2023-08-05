import React from 'react';
import { useState, useEffect } from 'react';
import "./room.scss"
import data from "./data.json"
import { Link, useParams } from 'react-router-dom';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';



const Room = () => {
    const [tableData, setTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState([]);
    useEffect(() => {
        setTableData(data);
    }, []);

    return (
        <div className='Room-home'>
            <h4>Các cuộc phỏng vấn gần đây</h4>
            <div className='container-company'>
                <Link to={`/room/create`}>
                    <button id='addRoom' >Thêm phòng họp</button>
                </Link>
                {tableData.map((item) => (

                    <div className='company-item' key={item.id}>
                        <div className='company-item-top'>
                            <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png' />
                            <h3>{item.RoomName}</h3>
                            <p>{item.RoomSkill}</p>
                            <button className='status'>{item.Status}</button>
                        </div>
                        <div className='company-item-mid'>
                            <p>{item.RoomDescription}</p>
                        </div>
                        <div className='company-item-bot'>
                            <button className='date'>
                                <h4>{item.StartDate}</h4>
                                <p>Ngày bắt đầu</p>
                            </button>
                            <button className='salary'>
                                <h4>{item.EndDate}</h4>
                                <p>Ngày kết thúc</p>
                            </button>
                            <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '50vh' }} className='adjustButton'>

                                <Link to={`/room/${item.RoomId}/detail`} ><Button shape="circle" className='DetailButton' icon={<EyeOutlined />}>
                                </Button></Link>

                                <Link to={`/room/${item.RoomId}/edit`}>  <Button style={{ marginLeft: '20px' }} shape="circle" className='EditButton' icon={<EditOutlined />}>
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