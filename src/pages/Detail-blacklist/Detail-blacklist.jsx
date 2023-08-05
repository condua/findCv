import React, { useState, useEffect } from 'react';
import './Detail-blacklist.scss';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { parseISO, format } from 'date-fns';

function DetailBlacklist() {
    const { id } = useParams();
    const userApi = `https://qltd01.cfapps.us10-001.hana.ondemand.com/blacklist/${id}`
    const [getUser, setGetUser] = useState({
        status: "OK",
        message: "Success !",
        data: [

        ]
    });
    useEffect(() => {
        fetchUser();
    }, []);

    const accessToken = useSelector(state => state.auth.accessToken)

    const fetchUser = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await axios.get(userApi, { headers });
            setGetUser(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const blacklist = getUser.data;
    console.log('blacklist1', blacklist);
    const avt = blacklist[0] ? blacklist[0].avatar : '';
    const name = blacklist[0] ? blacklist[0].fullName : '';
    const skills = blacklist[0] ? blacklist[0].skill : '';
    const experience = blacklist[0] ? blacklist[0].experience : '';
    const status = blacklist[0] ? blacklist[0].status : '';
    const reasonBlacklist = blacklist[0] ? blacklist[0].reasonBlacklist : '';
    const DateBlacklist = blacklist[0] ? parseISO(blacklist[0].DateBlacklist) : new Date();
    const userId = blacklist[0] ? blacklist[0].userId : '';


    const [description, setDescription] = useState('');

    useEffect(() => {
        if (blacklist.length > 0) {
            setDescription(blacklist[0].reasonBlacklist);
        }
    }, [blacklist]);


    const userApi1 = `https://qltd01.cfapps.us10-001.hana.ondemand.com/blacklist`
    const handleSaveChanges = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const data = {
                blacklistId: id,
                description: description,
            };
            const response = await axios.put(userApi1, data, { headers });
            console.log('Save changes response:', response.data);
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };



    const handleRemoveFromBlacklist = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await axios.post(`https://qltd01.cfapps.us10-001.hana.ondemand.com/blacklist/remove/${userId}`, {}, { headers });
            console.log('Remove from Blacklist response:', response.data);
        } catch (error) {
            console.error('Error removing from Blacklist:', error);
        }
    };


    const altavatar = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg';


    return (
        <div className="DetailBlacklist-container" >
            <div className="DetailBlacklist-content">
                <div className="DetailBlacklist-candidate-info">
                    <div className="DetailBlacklist-common-info">
                        <div className="DetailBlacklist-common-info-title">
                            Thông tin ứng viên
                        </div>
                        <div className="DetailBlacklist-common-info-content">
                            <div className="DetailBlacklist-avt">
                                <img src={avt ? avt : altavatar} alt="avt" />
                            </div>
                            <div className="DetailBlacklist-name">
                                {name}
                            </div>
                            <div className="DetailBlacklist-skill-experience">
                                <div className="DetailBlacklist-skill">
                                    <div className="DetailBlacklist-skill-title">
                                        Kỹ năng
                                    </div>
                                    <div className="DetailBlacklist-skill-content">
                                        {skills}
                                    </div>
                                </div>
                                <div className="DetailBlacklist-experience">
                                    <div className="DetailBlacklist-experience-title">
                                        Kinh nghiệm
                                    </div>
                                    <div className="DetailBlacklist-experience-content">
                                        {experience !== null ? `${experience} năm` : null}
                                    </div>

                                </div>
                            </div>
                            <div className={`DetailBlacklist-status ${status === "ACCEPT" ? "DetailBlacklist-accept" : ""} 
                                ${status === "INPROCESS" ? "DetailBlacklist-process" : ""} 
                                ${status === "BLACKLIST" ? "DetailBlacklist-blacklist" : ""}  
                            `}>
                                {status}
                            </div>

                        </div>
                    </div>
                    <div className="DetailBlacklist-cv">
                        <div className="DetailBlacklist-cv-title">
                            CV ứng viên
                        </div>
                        <div className="DetailBlacklist-cv-content">
                            <img src="https://static.cuongquach.com/resources/images/2018/07/mau-cv-dep-9.jpg" alt="avt" />
                        </div>
                    </div>
                </div>
                <div className="DetailBlacklist-form">
                    <div className="DetailBlacklist-caution">
                        {format(DateBlacklist, "yyyy-MM-dd HH:mm:ss")}
                    </div>
                    <h2>Lý do cho vào danh sách đen</h2>
                    <div className="DetailBlacklist-reason">
                        <textarea
                            type='text'
                            className="DetailBlacklist-form-reason"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="DetailBlacklist-button">
                        <Link to="/blacklist" className="DetailBlacklist-link">
                            <button className="DetailBlacklist-cancel">
                                Trở về
                            </button>
                        </Link>
                        <Link to="/blacklist" className="DetailBlacklist-link">
                            <button className="DetailBlacklist-save" onClick={handleSaveChanges}>
                                Lưu thay đổi
                            </button>
                        </Link>
                        <Link to="/blacklist" className="DetailBlacklist-link">
                            <button className="DetailBlacklist-remove" onClick={handleRemoveFromBlacklist}>
                                Đưa ra khỏi Blacklist
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DetailBlacklist;
