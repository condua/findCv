import React, { useState, useEffect } from 'react';
import { Timeline } from 'antd';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Detail-user.scss'
import { useSelector } from 'react-redux';
import axios from 'axios';

function getRandomColor() {
    const colors = ['green', 'red', 'gray', 'blue', 'purple'];
    let currentIndex = 0;

    return () => {
        const color = colors[currentIndex];
        currentIndex = (currentIndex + 1) % colors.length;
        return color;
    };
}

function DetailUser() {
    const [updatedUser, setUpdatedUser] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const { id } = useParams();
    const userApi = `https://qltd01.cfapps.us10-001.hana.ondemand.com/user/${id}`;
    const [getUser, setGetUser] = useState({
        status: "OK",
        message: "Success!",
        data: []
    });

    useEffect(() => {
        fetchUser();
    }, [id]);

    const accessToken = useSelector(state => state.auth.accessToken);

    const fetchUser = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await axios.get(userApi, { headers });
            setGetUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (getUser.data) {
            setUpdatedUser(getUser.data);
        }
    }, [getUser]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedUser({
            ...updatedUser,
            [name]: value
        });
    };

    const updateUser = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const requestData = {
                fullName: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
            };
            const response = await axios.put(userApi, requestData, { headers });
            console.log('Response from PUT API:', response.data);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleShowSuccessPopup = () => {
        setShowSuccessPopup(true);
        setTimeout(() => {
            setShowSuccessPopup(false);
        }, 2000);
    };

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        await updateUser();
        handleShowSuccessPopup();
    };


    if (!getUser.data) {
        return <div>Loading...</div>;
    }

    const user = getUser.data;
    console.log('user', user);

    const name = user ? user.name : '';
    const email = user ? user.email : '';
    const avt = user ? user.avt : '';
    const permission = user ? user.permission : '';
    const username = user ? user.username : '';
    const phone = user ? user.phone : '';
    const address = user ? user.address : '';

    const getNextColor = getRandomColor();

    const history = [
        {
            datetime: '2023-07-01',
            content: 'Create a services site',
        },
        {
            datetime: '2023-07-02',
            content: 'Solve initial network problems 1, problems 1, problems 1, problems 1',
        },
        {
            datetime: '2023-07-03',
            content: 'Solve initial network problems 1 ',
        },
        {
            datetime: '2023-07-04',
            content: 'Solve initial network problems 1',
        },
        {
            datetime: '2023-07-05',
            content: 'Solve initial network problems 1',
        },
        {
            datetime: '2023-07-05',
            content: 'Create a services site',
        },
        {
            datetime: '2023-07-05',
            content: 'Solve initial network problems 1',
        },
        {
            datetime: '2023-07-06',
            content: 'Solve initial network problems 1',
        },
        {
            datetime: '2023-07-07',
            content: 'Solve initial network problems 1',
        },
        {
            datetime: '2023-07-08',
            content: 'Solve initial network problems 1',
        },
    ];

    const altavatar = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg';


    return (
        <div className="Detail-user-container" >
            <div className="Detail-user-content">
                <div className="Detail-user-infor">
                    <div className="Detail-user-user">
                        <div className="general-infor">
                            <div className="Detail-user-name">{name}</div>
                            <div className="Detail-user-position">Vai trò: {permission} </div>
                            <div className="Detail-user-username">Username: {username}</div>
                        </div>
                        <div className="Detail-user-avt">
                            <img src={avt ? avt : altavatar} alt="avt" />
                        </div>
                    </div>

                    <div className="Detail-user-detail-infor">
                        <div className='Detail-user-info-container'>
                            <h2>Thông tin cơ bản</h2>
                            <form className='Detail-user-form-edit'>
                                <div className='Detail-user-info-item' style={{ marginTop: '15px' }}>
                                    <p>Họ và tên</p>
                                    <input
                                        type='text'
                                        name='name'
                                        value={updatedUser.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='Detail-user-info-item'>
                                    <p>Email</p>
                                    <input
                                        type='text'
                                        name='email'
                                        value={updatedUser.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='Detail-user-info-item'>
                                    <p>Số điện thoại</p>
                                    <input
                                        type='text'
                                        name='phone'
                                        value={updatedUser.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='Detail-user-info-item'>
                                    <p>Địa chỉ</p>
                                    <textarea
                                        name='address'
                                        value={updatedUser.address}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="Detail-user-button">
                                    <Link to="/manage-user" className="Detail-user-link">
                                        <button className='Detail-user-button-close'>
                                            Hủy
                                        </button>
                                    </Link>
                                    <button className='Detail-user-button-save' onClick={handleSaveChanges}>
                                        Lưu thay đổi
                                    </button>

                                </div>
                            </form>


                        </div>
                    </div>
                </div>

                {showSuccessPopup && (
                    <div className="success-popup">
                        Lưu thông tin thành công
                    </div>
                )}

                <div className="Detail-user-activity">
                    <div className="Detail-user-title-activity">Nhật ký hoạt động</div>
                    <div className="Detail-user-timeline">
                        <Timeline
                            items={history.map((item) => ({
                                color: getNextColor(),
                                children: (
                                    <>
                                        <p>{item.datetime}</p>
                                        <p>{item.content}</p>
                                    </>
                                ),
                            }))}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}
export default DetailUser;