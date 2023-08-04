import React, { useState, useEffect, useRef } from 'react';
import './ReasonBlacklist.scss';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

function InterviewMeeting() {
    const { id } = useParams();

    //get
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

    //post
    const [description, setDescription] = useState('');
    const textareaRef = useRef();
    const addToBlacklist = async () => {
        try {
            const apiUrl = 'https://qltd01.cfapps.us10-001.hana.ondemand.com/blacklist';
            const data = {
                userId: parseInt(id),
                description: description,
            };

            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            const response = await axios.post(apiUrl, data, { headers });
            console.log('Blacklist added:', response.data);
        } catch (error) {
            console.error('Error adding to blacklist:', error);
        }
    };

    const handleAddToBlacklist = async () => {
        addToBlacklist();
    };



    //execute data get
    if (!getUser.data) {
        return <div>Loading...</div>;
    }

    const user = getUser.data;
    console.log('user', user);

    const avt = user ? user.avt : '';
    const name = user ? user.name : '';
    const skills = user ? user.skill : '';
    const experience = user ? user.experience : '';
    const status = user ? user.status : '';
    const position = localStorage.getItem('pos');

    let stringposition;
    if (position === 'Intern ReactJS') {
        stringposition = 'InternReactJS';
    } else if (position === 'Fresher ReactJS') {
        stringposition = 'FresherReactJS';
    } else if (position === 'Junior ReactJS') {
        stringposition = 'JuniorReactJS';
    } else if (position === 'Intern Java') {
        stringposition = 'InternJava';
    } else if (position === 'Fresher Java') {
        stringposition = 'FresherJava';
    } else {
        stringposition = 'JuniorJava';
    }

    const altavatar = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg';



    return (
        <div className="ReasonBlacklist-container" >
            <div className="ReasonBlacklist-content">
                <div className="ReasonBlacklist-candidate-info">
                    <div className="ReasonBlacklist-common-info">
                        <div className="ReasonBlacklist-common-info-title">
                            Thông tin ứng viên
                        </div>
                        <div className="ReasonBlacklist-common-info-content">
                            <div className="ReasonBlacklist-avt">
                                <img src={avt ? avt : altavatar} alt="avt" />
                            </div>
                            <div className="ReasonBlacklist-name">
                                {name}
                            </div>
                            <div className="ReasonBlacklist-position">
                                {position}
                            </div>
                            <div className="ReasonBlacklist-skill-experience">
                                <div className="ReasonBlacklist-skill">
                                    <div className="ReasonBlacklist-skill-title">
                                        Kỹ năng
                                    </div>
                                    <div className="ReasonBlacklist-skill-content">
                                        {skills}
                                    </div>
                                </div>
                                <div className="ReasonBlacklist-experience">
                                    <div className="ReasonBlacklist-experience-title">
                                        Kinh nghiệm
                                    </div>
                                    <div className="ReasonBlacklist-experience-content">
                                        {experience}
                                    </div>

                                </div>
                            </div>
                            <div className={`ReasonBlacklist-status ${status === "ACCEPT" ? "ReasonBlacklist-accept" : ""} 
                                ${status === "INPROCESS" ? "ReasonBlacklist-process" : ""} 
                                ${status === "BLACKLIST" ? "ReasonBlacklist-blacklist" : ""}  
                            `}>
                                {status}
                            </div>

                        </div>
                    </div>
                    <div className="ReasonBlacklist-cv">
                        <div className="ReasonBlacklist-cv-title">
                            CV ứng viên
                        </div>
                        <div className="ReasonBlacklist-cv-content">
                            <img src="https://static.cuongquach.com/resources/images/2018/07/mau-cv-dep-9.jpg" alt="avt" />
                        </div>
                    </div>
                </div>
                <div className="ReasonBlacklist-form">
                    <h2>Lý do cho vào danh sách đen</h2>
                    <div className="ReasonBlacklist-caution">
                        Hãy cẩn thận khi đưa ứng viên vào danh sách đen
                    </div>
                    <div className="ReasonBlacklist-reason">
                        <div className="ReasonBlacklist-reson-title">
                            Lý do
                        </div>
                        <textarea
                            type='text'
                            className="ReasonBlacklist-form-reason"
                            ref={textareaRef}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="ReasonBlacklist-button">
                        <Link to={`/manage-candidate/${stringposition}`} className="ReasonBlacklist-link">
                            <button className="ReasonBlacklist-cancel">
                                Hủy
                            </button>
                        </Link>
                        <Link to={`/manage-candidate/${stringposition}`} className="ReasonBlacklist-link">
                            <button className="ReasonBlacklist-add" onClick={handleAddToBlacklist}>
                                Thêm vào danh sách đen
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default InterviewMeeting;
