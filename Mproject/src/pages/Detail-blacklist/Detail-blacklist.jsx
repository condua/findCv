import React, { useState } from 'react';
import './Detail-blacklist.scss';
import users from '../user'
import background from '../../assets/background.webp';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function DetailBlacklist() {
    const { id } = useParams();
    console.log({ id });

    const user = users.find((item) => item.id === id);
    const [avt, setAvt] = useState(user.avt);
    const [name, setName] = useState(user.name);
    const [position, setPosition] = useState(user.position);
    const [skills, setSkills] = useState(user.skills);
    const [experience, setExperience] = useState(user.experience);
    const [status, setStatus] = useState(user.status);


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
                                <img src={avt} alt="avt" />
                            </div>
                            <div className="DetailBlacklist-name">
                                {name}
                            </div>
                            <div className="DetailBlacklist-position">
                                {position}
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
                                        {experience} năm
                                    </div>

                                </div>
                            </div>
                            <div className={`DetailBlacklist-status ${status === "Accept" ? "DetailBlacklist-accept" : ""} 
                                ${status === "In process" ? "DetailBlacklist-process" : ""} 
                                ${status === "Blacklist" ? "DetailBlacklist-blacklist" : ""}  
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
                    <h2>Lý do cho vào danh sách đen</h2>
                    <div className="DetailBlacklist-caution">
                        Thời gian thêm: 7:00 01/01/2023
                    </div>
                    <div className="DetailBlacklist-name-admin">
                        <div className="DetailBlacklist-name-admin-title">
                            Họ và tên Admin
                        </div>
                        <input type='text' className="DetailBlacklist-form-name-admin" />
                    </div>
                    <div className="DetailBlacklist-email">
                        <div className="DetailBlacklist-email-title">
                            Email Admin
                        </div>
                        <input type='text' className="DetailBlacklist-form-email" />
                    </div>
                    <div className="DetailBlacklist-reason">
                        <div className="DetailBlacklist-reason-title">
                            Lý do
                        </div>
                        <textarea type='text' className="DetailBlacklist-form-reason" />
                    </div>
                    <div className="DetailBlacklist-button">
                        <Link to="/blacklist" className="DetailBlacklist-link">
                            <button className="DetailBlacklist-cancel">
                                Trở về
                            </button>
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    );
}
export default DetailBlacklist;
