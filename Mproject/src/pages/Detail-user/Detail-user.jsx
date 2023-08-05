import React, { useState } from 'react';
import { Timeline } from 'antd';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Detail-user.scss'
import background from '../../assets/background.webp';
import users from '../user'

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
    const history = [
        {
            datetime: '2015-09-01',
            content: 'Create a services site',
        },
        {
            datetime: '2015-09-02',
            content: 'Solve initial network problems 1, problems 1, problems 1, problems 1',
        },
        {
            datetime: '2015-09-03',
            content: 'Solve initial network problems 1 ',
        },
        {
            datetime: '2015-09-04',
            content: 'Solve initial network problems 1',
        },
        {
            datetime: '2015-09-05',
            content: 'Solve initial network problems 1',
        },
        {
            datetime: '2015-09-01',
            content: 'Create a services site',
        },
        {
            datetime: '2015-09-02',
            content: 'Solve initial network problems 1',
        },
        {
            datetime: '2015-09-03',
            content: 'Solve initial network problems 1',
        },
        {
            datetime: '2015-09-04',
            content: 'Solve initial network problems 1',
        },
        {
            datetime: '2015-09-05',
            content: 'Solve initial network problems 1',
        },
        // Thêm các mục khác vào đây
    ];

    const { id } = useParams();
    console.log({ id });

    const user = users.find((item) => item.id === id);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avt, setAvt] = useState(user.avt);
    const [permission, setPermission] = useState(user.permission);
    const [username, setUsername] = useState(user.username);

    const getNextColor = getRandomColor();

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedData = [...users];

        // Update the candidate in the copied array
        const updatedCandidate = {
            ...user,
            name: name,
            email: email,
            avt: avt
        };

        // Find the index of the candidate in the copied array
        const candidateIndex = updatedData.findIndex(item => item.id === parseInt(id));

        // Replace the old candidate with the updated candidate
        updatedData[candidateIndex] = updatedCandidate;

        // Update the data in localStorage
        localStorage.setItem('data', JSON.stringify(updatedData));
    }


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
                            <img src={avt} alt="avt" />
                        </div>
                    </div>

                    <div className="Detail-user-detail-infor">
                        <div className='Detail-user-info-container'>
                            <h2>Thông tin cơ bản</h2>
                            <form onSubmit={handleSubmit} className='Detail-user-form-edit'>
                                <div className='Detail-user-info-item' style={{ marginTop: '15px' }}>
                                    <p>Họ và tên</p>
                                    <input type='text' value={name} />
                                </div>
                                <div className='Detail-user-info-item'>
                                    <p>Tài khoản</p>
                                    <input type='text' value={username} />
                                </div>
                                <div className='Detail-user-info-item'>
                                    <p>Email</p>
                                    <input type='text' value={email} />
                                </div>
                                <div className='Detail-user-info-item'>
                                    <p>Số điện thoại</p>
                                    <input type='text' value={name} />
                                </div>
                                <div className='Detail-user-info-item'>
                                    <p>Địa chỉ</p>
                                    <textarea type='text' value={name} />
                                </div>

                                <div className="Detail-user-button">
                                    <Link to="/manage-user" className="Detail-user-link">
                                        <button className='Detail-user-button-close'>
                                            Hủy
                                        </button>
                                    </Link>
                                    <Link to="/manage-user" className="Detail-user-link">
                                        <button className='Detail-user-button-save'>
                                            Lưu thay đổi
                                        </button>
                                    </Link>

                                </div>
                            </form>


                        </div>
                    </div>
                </div>
                <div className="Detail-user-activity">
                    <div className="Detail-user-title-activity">Nhật ký hoạt động</div>
                    <div className="Detail-user-timeline">
                        <Timeline
                            items={history.map((item) => ({
                                color: getNextColor(),
                                children: (
                                    <>
                                        <p>{item.datetime}</p>                                        <p>{item.content}</p>
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