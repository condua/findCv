import React, { useState, useEffect } from 'react';
import './Manage-user.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import user from '../user'
import { Switch, Space } from 'antd';



const ManageUser = () => {
    useEffect(() => {
        setDefaultActiveTab();
    }, []);
    const openTab = (evt, TabName) => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(TabName).style.display = "block";
        evt.currentTarget.className += " active";
    };

    const setDefaultActiveTab = () => {
        const recerTabButton = document.querySelector(".Manage-user-recer-tab");
        recerTabButton.click();
    };

    const [currentPageRECer, setCurrentPageRECer] = useState(1);
    const [currentPageInterviewer, setCurrentPageInterviewer] = useState(1);
    const [currentPageCandidate, setCurrentPageCandidate] = useState(1);
    const [initialSearchValue, setInitialSearchValue] = useState('');
    const ROWS_PER_PAGE = 10;


    const recerUsers = user.filter(item => item.permission === "RECer");
    const interviewerUsers = user.filter(item => item.permission === "Interviewer");
    const candidateUsers = user.filter(item => item.permission === "Candidate");

    //RECer
    const handlePageChangeRECer = (pageNumber) => {
        setCurrentPageRECer(pageNumber);
    };

    const filteredRECerUsers = recerUsers.filter((item) => {
        return (
            item.name.toLowerCase().includes(initialSearchValue.toLowerCase()) ||
            item.email.toLowerCase().includes(initialSearchValue.toLowerCase())
        );
    });

    const totalRowsRECer = filteredRECerUsers.length;
    const totalPagesRECer = Math.ceil(totalRowsRECer / ROWS_PER_PAGE);

    const startRowRECer = (currentPageRECer - 1) * ROWS_PER_PAGE;
    const endRowRECer = Math.min(startRowRECer + ROWS_PER_PAGE, totalRowsRECer);
    const currentRowsRECer = filteredRECerUsers.slice(startRowRECer, endRowRECer);


    //Interviewer
    const handlePageChangeInterviewer = (pageNumber) => {
        setCurrentPageInterviewer(pageNumber);
    };

    const filteredInterviewerUsers = interviewerUsers.filter((item) => {
        return (
            item.name.toLowerCase().includes(initialSearchValue.toLowerCase()) ||
            item.email.toLowerCase().includes(initialSearchValue.toLowerCase())
        );
    });

    const totalRowsInterviewer = filteredInterviewerUsers.length;
    const totalPagesInterviewer = Math.ceil(totalRowsInterviewer / ROWS_PER_PAGE);

    const startRowInterviewer = (currentPageInterviewer - 1) * ROWS_PER_PAGE;
    const endRowInterviewer = Math.min(startRowInterviewer + ROWS_PER_PAGE, totalRowsInterviewer);
    const currentRowsInterviewer = filteredInterviewerUsers.slice(startRowInterviewer, endRowInterviewer);


    //Candidate
    const handlePageChangeCandidate = (pageNumber) => {
        setCurrentPageCandidate(pageNumber);
    };

    const filteredCandidateUsers = candidateUsers.filter((item) => {
        return (
            item.name.toLowerCase().includes(initialSearchValue.toLowerCase()) ||
            item.email.toLowerCase().includes(initialSearchValue.toLowerCase())
        );
    });

    const totalRowsCandidate = filteredCandidateUsers.length;
    const totalPagesCandidate = Math.ceil(totalRowsCandidate / ROWS_PER_PAGE);

    const startRowCandidate = (currentPageCandidate - 1) * ROWS_PER_PAGE;
    const endRowCandidate = Math.min(startRowCandidate + ROWS_PER_PAGE, totalRowsCandidate);
    const currentRowsCandidate = filteredCandidateUsers.slice(startRowCandidate, endRowCandidate);


    //Search
    const [searchValue, setSearchValue] = useState('');
    const handleSearchInputChange = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);
        setInitialSearchValue(searchValue);
        setCurrentPageRECer(1);
        setCurrentPageInterviewer(1);
        setCurrentPageCandidate(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    return (
        <div className="Manage-user-container" >
            <div className="Manage-user-search-container">
                <form className="Manage-user-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type name/email ..."
                        name="search"
                        className="Manage-user-form-search"
                        value={searchValue}
                        onChange={handleSearchInputChange}
                    />
                </form>
            </div>

            <div className="Manage-user-tab">
                <button className="tablinks Manage-user-recer-tab" onClick={(e) => openTab(e, 'RECer')}>Tài khoản RECer</button>
                <button className="tablinks Manage-user-interviewer-tab" onClick={(e) => openTab(e, 'Interviewer')}>Tài khoản Interviewer</button>
                <button className="tablinks Manage-user-candidate-tab" onClick={(e) => openTab(e, 'Candidate')}>Tài khoản Candidate</button>
            </div>

            <div id="RECer" className="tabcontent">
                <div className="Manage-user-pagination">
                    <button
                        className="Manage-user-button-prev"
                        disabled={currentPageRECer === 1}
                        onClick={() => handlePageChangeRECer(currentPageRECer - 1)}
                    >
                        <FontAwesomeIcon icon={faBackward} />
                    </button>

                    <div className="page-position">{currentPageRECer} / {totalPagesRECer}</div>

                    <button
                        className="Manage-user-button-next"
                        disabled={currentPageRECer === totalPagesRECer}
                        onClick={() => handlePageChangeRECer(currentPageRECer + 1)}
                    >
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>
                <div className="Manage-user-title">
                    <div className="Manage-user-name-user">Họ và tên/Email</div>
                    <div className="Manage-user-permission-user">Quyền hạn tài khoản</div>
                    <div className="Manage-user-date-register-user">Ngày đăng ký tài khoản</div>
                    <div className="Manage-user-enable-user">Trạng thái</div>
                    <div className="Manage-user-details-user">Chi tiết</div>
                </div>

                {currentRowsRECer.filter((item) => {
                    return (
                        item.name.toLowerCase().includes(initialSearchValue.toLowerCase()) ||
                        item.email.toLowerCase().includes(initialSearchValue.toLowerCase())
                    );
                })
                    .map((item) => (
                        <div key={item.id}>
                            {item.permission === "RECer" && ( // Kiểm tra điều kiện permission bằng "RECer"
                                <div className="Manage-user-table-user">
                                    <div className="Manage-user-name-content-user">
                                        <div className="avt">
                                            <div className="Manage-user-circle">
                                                <img src={item.avt} alt="avt" />
                                            </div>
                                        </div>

                                        <div className="Manage-user-name-email">
                                            <div className="Manage-user-name-detail">{item.name}</div>
                                            <div className="Manage-user-email-detail">{item.email}</div>
                                        </div>
                                    </div>
                                    <div className="Manage-user-permission-content-user">{item.permission}</div>
                                    <div className="Manage-user-date-register-content-user">{item.date}</div>
                                    <div className="Manage-user-enable-user-content">
                                        <Space direction="vertical">
                                            <Switch checkedChildren="Enable" unCheckedChildren="Disable" defaultChecked />
                                        </Space>
                                    </div>
                                    <div className="Manage-user-details-content-user">
                                        <button className="Manage-user-button-edit"><Link className="Manage-user-color-button-edit" to={`/detail-user/${item.id}`}>Edit</Link></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

            </div>


            <div id="Interviewer" className="tabcontent">
                <div className="Manage-user-pagination">
                    <button
                        className="Manage-user-button-prev"
                        disabled={currentPageInterviewer === 1}
                        onClick={() => handlePageChangeInterviewer(currentPageInterviewer - 1)}
                    >
                        <FontAwesomeIcon icon={faBackward} />
                    </button>

                    <div className="page-position">{currentPageInterviewer} / {totalPagesInterviewer}</div>

                    <button
                        className="Manage-user-button-next"
                        disabled={currentPageInterviewer === totalPagesInterviewer}
                        onClick={() => handlePageChangeInterviewer(currentPageInterviewer + 1)}
                    >
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>
                <div className="Manage-user-title">
                    <div className="Manage-user-name-user">Họ và tên/Email</div>
                    <div className="Manage-user-permission-user">Quyền hạn tài khoản</div>
                    <div className="Manage-user-date-register-user">Ngày đăng ký tài khoản</div>
                    <div className="Manage-user-enable-user">Trạng thái</div>
                    <div className="Manage-user-details-user">Chi tiết</div>
                </div>

                {currentRowsInterviewer.filter((item) => {
                    return (
                        item.name.toLowerCase().includes(initialSearchValue.toLowerCase()) ||
                        item.email.toLowerCase().includes(initialSearchValue.toLowerCase())
                    );
                })
                    .map((item) => (
                        <div key={item.id}>
                            {item.permission === "Interviewer" && ( // Kiểm tra điều kiện permission bằng "Interviewer"
                                <div className="Manage-user-table-user">
                                    <div className="Manage-user-name-content-user">
                                        <div className="avt">
                                            <div className="Manage-user-circle">
                                                <img src={item.avt} alt="avt" />
                                            </div>
                                        </div>

                                        <div className="Manage-user-name-email">
                                            <div className="Manage-user-name-detail">{item.name}</div>
                                            <div className="Manage-user-email-detail">{item.email}</div>
                                        </div>
                                    </div>
                                    <div className="Manage-user-permission-content-user">{item.permission}</div>
                                    <div className="Manage-user-date-register-content-user">{item.date}</div>
                                    <div className="Manage-user-enable-user-content">
                                        <Space direction="vertical">
                                            <Switch checkedChildren="Enable" unCheckedChildren="Disable" defaultChecked className="custom-switch" />
                                        </Space>
                                    </div>
                                    <div className="Manage-user-details-content-user">
                                        <button className="Manage-user-button-edit"><Link className="Manage-user-color-button-edit" to={`/detail-user/${item.id}`}>Edit</Link></button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

            </div>

            <div id="Candidate" className="tabcontent">
                <div className="Manage-user-pagination">
                    <button
                        className="Manage-user-button-prev"
                        disabled={currentPageCandidate === 1}
                        onClick={() => handlePageChangeCandidate(currentPageCandidate - 1)}
                    >
                        <FontAwesomeIcon icon={faBackward} />
                    </button>

                    <div className="page-position">{currentPageCandidate} / {totalPagesCandidate}</div>

                    <button
                        className="Manage-user-button-next"
                        disabled={currentPageCandidate === totalPagesCandidate}
                        onClick={() => handlePageChangeCandidate(currentPageCandidate + 1)}
                    >
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>

                <div className="Manage-user-title">
                    <div className="Manage-user-name-candidate-user">Họ và tên/Email</div>
                    <div className="Manage-user-permission-candidate-user">Quyền hạn tài khoản</div>
                    <div className="Manage-user-date-register-candidate-user">Ngày đăng ký tài khoản</div>
                    <div className="Manage-user-position-user">Vị trí ứng tuyển</div>
                    <div className="Manage-user-status-user">Trạng thái ứng tuyển</div>
                    <div className="Manage-user-enable-user">Trạng thái tài khoản</div>
                    <div className="Manage-user-details-candidate">Chi tiết</div>
                </div>

                {currentRowsCandidate.filter((item) => {
                    return (
                        item.name.toLowerCase().includes(initialSearchValue.toLowerCase()) ||
                        item.email.toLowerCase().includes(initialSearchValue.toLowerCase())
                    );
                })
                    .map((item) => (
                        <div key={item.id}>
                            {item.permission === "Candidate" && ( // Kiểm tra điều kiện permission bằng "Candidate"
                                <div className="Manage-user-table-user">
                                    <div className="Manage-user-name-content-candidate-user">
                                        <div className="avt">
                                            <div className="Manage-user-circle">
                                                <img src={item.avt} alt="avt" />
                                            </div>
                                        </div>

                                        <div className="Manage-user-name-email">
                                            <div className="Manage-user-name-detail">{item.name}</div>
                                            <div className="Manage-user-email-detail">{item.email}</div>
                                        </div>
                                    </div>
                                    <div className="Manage-user-permission-content-candidate-user">{item.permission}</div>
                                    <div className="Manage-user-date-register-content-candidate-user">{item.date}</div>
                                    <div className="Manage-user-position-content-user">{item.position}</div>
                                    <div className="Manage-user-status-content-user">
                                        <div className={`Manage-user-frame-status ${item.status === "Accept" ? "Manage-user-accept" : ""} 
                                ${item.status === "In process" ? "Manage-user-process" : ""} 
                                ${item.status === "Blacklist" ? "Manage-user-blacklist" : ""} 
                                `}>{item.status}</div>
                                    </div>
                                    <div className="Manage-user-enable-user-content">
                                        <Space direction="vertical">
                                            <Switch checkedChildren="Enable" unCheckedChildren="Disable" defaultChecked className="custom-switch" />
                                        </Space>
                                    </div>
                                    <div className="Manage-user-details-content-candidate">
                                        <Link  to={`/detail-user/${item.id}`}>
                                            <button className="Manage-user-button-edit">
                                                Edit
                                            </button>
                                        </Link>

                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

            </div>
        </div>
    );

};

export default ManageUser;


