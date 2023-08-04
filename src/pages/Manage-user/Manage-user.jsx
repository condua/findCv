import React, { useState, useEffect } from 'react';
import './Manage-user.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { format } from 'date-fns';


const ToggleButton = ({ accountStatus, onClick }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleToggle = () => {
        if (accountStatus === 'ACTIVE' || accountStatus === 'BANNED') {
            setShowConfirmation(true);
        } else {
            onClick();
        }
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    const handleConfirm = () => {
        onClick(accountStatus); // Pass the current status to handleBanUser
        setShowConfirmation(false);
    };

    let buttonClass = 'Manage-user-enable-button';

    if (accountStatus === 'ACTIVE') {
        buttonClass += ' active-button-color';
    } else if (accountStatus === 'UNAUTHENTICATED') {
        buttonClass += ' unauthen-button-color';
    } else {
        buttonClass += ' banned-button-color';
    }

    return (
        <>
            <button className={buttonClass} onClick={handleToggle}>
                {accountStatus}
            </button>

            {showConfirmation && (
                <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to {accountStatus === 'ACTIVE' ? 'ban' : 'activate'} this user?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseConfirmation}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleConfirm}>
                            {accountStatus === 'ACTIVE' ? 'Ban User' : 'Activate User'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};





const ManageUser = () => {
    const userApi = 'https://qltd01.cfapps.us10-001.hana.ondemand.com/user'
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

    const userss = getUser.data;
    console.log('12345', userss);
    const altavatar = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg';

    const [users, setUsers] = useState(userss);

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

    //filter user
    const recerUsers = userss.filter(item => item.permission === "RECRUITER");
    const interviewerUsers = userss.filter(item => item.permission === "INTERVIEWER");
    const candidateUsers = userss.filter(item => item.permission === "CANDIDATE");

    //RECer
    const handlePageChangeRECer = (pageNumber) => {
        setCurrentPageRECer(pageNumber);
    };

    const filteredRECerUsers = recerUsers.filter((item) => {
        const name = item.name ? item.name.toLowerCase() : '';
        const email = item.email ? item.email.toLowerCase() : '';
        const searchValue = initialSearchValue.toLowerCase();

        return name.includes(searchValue) || email.includes(searchValue);
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
        const name = item.name ? item.name.toLowerCase() : '';
        const email = item.email ? item.email.toLowerCase() : '';
        const searchValue = initialSearchValue.toLowerCase();

        return name.includes(searchValue) || email.includes(searchValue);
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
        const name = item.name ? item.name.toLowerCase() : '';
        const email = item.email ? item.email.toLowerCase() : '';
        const searchValue = initialSearchValue.toLowerCase();

        return name.includes(searchValue) || email.includes(searchValue);
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

    const handleBanUser = async (id, currentStatus) => {
        try {
            let newStatus = '';
            if (currentStatus === 'ACTIVE') {
                newStatus = 'BANNED';
            } else if (currentStatus === 'BANNED') {
                newStatus = 'ACTIVE';
            } else {
                return; // Do nothing if status is UNAUTHENTICATED
            }

            const url = `https://qltd01.cfapps.us10-001.hana.ondemand.com/user/ban/${id}`;
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            const body = {
                accountStatus: newStatus,
            };

            const response = await axios.post(url, body, { headers });
            // You can handle the response here, for example, showing a success message
            console.log('User status updated successfully:', response.data);

            // After updating the user status, you can fetch the updated user list
            fetchUser();
        } catch (error) {
            console.error('Error updating user status:', error);
        }
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

                    <div className="page-position">
                        {totalPagesRECer === 0 ? "0 / 0" : `${currentPageRECer} / ${totalPagesRECer}`}
                    </div>

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
                    <div className="Manage-user-enable-user">Trạng thái tài khoản</div>
                    <div className="Manage-user-details-user">Chi tiết</div>
                </div>

                {currentRowsRECer.filter((item) => {
                    const name = item.name ? item.name.toLowerCase() : '';
                    const email = item.email ? item.email.toLowerCase() : '';
                    const searchValue = initialSearchValue.toLowerCase();

                    return name.includes(searchValue) || email.includes(searchValue);
                })
                    .map((item) => (
                        <div key={item.id}>
                            <div className="Manage-user-table-user">
                                <div className="Manage-user-name-content-user">
                                    <Link className="link-to-detail-user" to={`/detail-user/${item.id}`}>
                                        <div className="avt">
                                            <div className="Manage-user-circle">
                                                <img src={item.avt ? item.avt : altavatar} alt="avt" />
                                            </div>
                                        </div>
                                    </Link>
                                    <Link className="link-to-detail-user" to={`/detail-user/${item.id}`}>
                                        <div className="Manage-user-name-email">
                                            <div className="Manage-user-name-detail">{item.name}</div>
                                            <div className="Manage-user-email-detail">{item.email}</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="Manage-user-permission-content-user">{item.permission}</div>
                                <div className="Manage-user-date-register-content-user">
                                    {format(new Date(item.dateRegister), "yyyy-MM-dd HH:mm:ss")}
                                </div>
                                <div className="Manage-user-enable-user-content">
                                    <ToggleButton accountStatus={item.accountStatus} onClick={() => handleBanUser(item.id, item.accountStatus)} />
                                </div>
                                <div className="Manage-user-details-content-user">
                                    <button className="Manage-user-button-edit"><Link className="Manage-user-color-button-edit" to={`/detail-user/${item.id}`}>Edit</Link></button>
                                </div>
                            </div>
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

                    <div className="page-position">
                        {totalPagesInterviewer === 0 ? "0 / 0" : `${currentPageInterviewer} / ${totalPagesInterviewer}`}
                    </div>

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
                    <div className="Manage-user-enable-user">Trạng thái tài khoản</div>
                    <div className="Manage-user-details-user">Chi tiết</div>
                </div>

                {currentRowsInterviewer.filter((item) => {
                    const name = item.name ? item.name.toLowerCase() : '';
                    const email = item.email ? item.email.toLowerCase() : '';
                    const searchValue = initialSearchValue.toLowerCase();

                    return name.includes(searchValue) || email.includes(searchValue);
                })
                    .map((item) => (
                        <div key={item.id}>

                            <div className="Manage-user-table-user">
                                <div className="Manage-user-name-content-user">
                                    <Link className="link-to-detail-user" to={`/detail-user/${item.id}`}>
                                        <div className="avt">
                                            <div className="Manage-user-circle">
                                                <img src={item.avt ? item.avt : altavatar} alt="avt" />
                                            </div>
                                        </div>
                                    </Link>
                                    <Link className="link-to-detail-user" to={`/detail-user/${item.id}`}>
                                        <div className="Manage-user-name-email">
                                            <div className="Manage-user-name-detail">{item.name}</div>
                                            <div className="Manage-user-email-detail">{item.email}</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="Manage-user-permission-content-user">{item.permission}</div>
                                <div className="Manage-user-date-register-content-user">
                                    {format(new Date(item.dateRegister), "yyyy-MM-dd HH:mm:ss")}
                                </div>
                                <div className="Manage-user-enable-user-content">
                                    <ToggleButton accountStatus={item.accountStatus} onClick={() => handleBanUser(item.id, item.accountStatus)} />
                                </div>
                                <div className="Manage-user-details-content-user">
                                    <button className="Manage-user-button-edit"><Link className="Manage-user-color-button-edit" to={`/detail-user/${item.id}`}>Edit</Link></button>
                                </div>
                            </div>

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

                    <div className="page-position">
                        {totalPagesCandidate === 0 ? "0 / 0" : `${currentPageCandidate} / ${totalPagesCandidate}`}
                    </div>

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
                    <div className="Manage-user-enable-user">Trạng thái tài khoản</div>
                    <div className="Manage-user-details-candidate">Chi tiết</div>
                </div>

                {currentRowsCandidate.filter((item) => {
                    const name = item.name ? item.name.toLowerCase() : '';
                    const email = item.email ? item.email.toLowerCase() : '';
                    const searchValue = initialSearchValue.toLowerCase();

                    return name.includes(searchValue) || email.includes(searchValue);
                })
                    .map((item) => (
                        <div key={item.id}>

                            <div className="Manage-user-table-user">
                                <div className="Manage-user-name-content-candidate-user">
                                    <Link className="link-to-detail-user" to={`/detail-user/${item.id}`}>
                                        <div className="avt">
                                            <div className="Manage-user-circle">
                                                <img src={item.avt ? item.avt : altavatar} alt="avt" />
                                            </div>
                                        </div>
                                    </Link>
                                    <Link className="link-to-detail-user" to={`/detail-user/${item.id}`}>
                                        <div className="Manage-user-name-email">
                                            <div className="Manage-user-name-detail">{item.name}</div>
                                            <div className="Manage-user-email-detail">{item.email}</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="Manage-user-permission-content-candidate-user">{item.permission}</div>
                                <div className="Manage-user-date-register-content-candidate-user">
                                    {format(new Date(item.dateRegister), "yyyy-MM-dd HH:mm:ss")}
                                </div>
                                <div className="Manage-user-position-content-user">
                                    <div className="Manage-user-position-column">
                                        {item.listJobPosting.map((position, index) => (
                                            <div key={index}>{position.position}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="Manage-user-enable-user-content">
                                    <ToggleButton accountStatus={item.accountStatus} onClick={() => handleBanUser(item.id, item.accountStatus)} />
                                </div>
                                <div className="Manage-user-details-content-candidate">
                                    <Link to={`/detail-user/${item.id}`}>
                                        <button className="Manage-user-button-edit">
                                            Edit
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}

            </div>
        </div>
    );

};

export default ManageUser;


