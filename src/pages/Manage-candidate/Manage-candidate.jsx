import React, { useState, useEffect } from 'react';
import './Manage-candidate.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import user from '../user'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
    StopOutlined,
} from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';

const HistoryPopup = ({ historyData, onClose }) => {
    return (
        <div className="popup-container">
            <div className="popup-content">
                <h2>History Blacklist</h2>
                {historyData ? (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Ứng viên chưa từng vào blacklist</p>
                )}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};


const ConfirmationPopup = ({ onConfirm, onCancel }) => {
    return (
        <div className="popup-container-confirm">
            <div className="popup-content-confirm">
                <h2>Xác nhận</h2>
                <p>Bạn có chắc chắn muốn đưa ứng viên này vào blacklist hay không?</p>
                <button className="popup-yes" onClick={onConfirm}>Yes</button>
                <button className="popup-no" onClick={onCancel}>No</button>
            </div>
        </div>
    );
};



function ManageCandidate() {
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

    console.log('usersssssss', userss);

    const [historyData, setHistoryData] = useState(null);

    const [isHistoryPopupVisible, setIsHistoryPopupVisible] = useState(false);

    const handleOpenHistoryPopup = () => {
        setIsHistoryPopupVisible(true);
    };

    const handleCloseHistoryPopup = () => {
        setIsHistoryPopupVisible(false);
    };

    const { id } = useParams();
    let position;

    if (id === 'InternReactJS') {
        position = 'Intern ReactJS';
    } else if (id === 'FresherReactJS') {
        position = 'Fresher ReactJS';
    } else if (id === 'JuniorReactJS') {
        position = 'Junior ReactJS';
    } else if (id === 'InternJava') {
        position = 'Intern Java';
    } else if (id === 'FresherJava') {
        position = 'Fresher Java';
    } else {
        position = 'Junior Java';
    }

    useEffect(() => {
        localStorage.setItem('pos', position);
    }, [position]);


    const ROWS_PER_PAGE = 11;
    const [initialSearchValue, setInitialSearchValue] = useState('');
    const [currentPageCandidate, setCurrentPageCandidate] = useState(1);
    const candidateUsers = userss.filter(item =>
        item.permission === "CANDIDATE" &&
        item.status !== "BLACKLIST" &&
        item.listJobPosting.some(job => job.position === position)
    );


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
    console.log('length', totalRowsCandidate);
    const totalPagesCandidate = Math.ceil(totalRowsCandidate / ROWS_PER_PAGE);

    const startRowCandidate = (currentPageCandidate - 1) * ROWS_PER_PAGE;
    const endRowCandidate = Math.min(startRowCandidate + ROWS_PER_PAGE, totalRowsCandidate);
    const currentRowsCandidate = filteredCandidateUsers.slice(startRowCandidate, endRowCandidate);

    console.log('candidate current', currentRowsCandidate);

    //Search
    const [searchValue, setSearchValue] = useState('');
    const handleSearchInputChange = (e) => {
        const searchValue = e.target.value;
        setSearchValue(searchValue);
        setInitialSearchValue(searchValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] = useState(false);
    const [candidateToAcceptId, setCandidateToAcceptId] = useState(null);

    const handleAcceptCandidate = (id, status) => {
        if (status === "INPROCESS") {
            setIsConfirmationPopupVisible(true);
            // Save the candidate ID to be accepted in the state
            setCandidateToAcceptId(id);
        }
    };

    const handleConfirmAcceptCandidate = async () => {
        try {
            // Call the accept API here using candidateToAcceptId
            const url = `https://qltd01.cfapps.us10-001.hana.ondemand.com/user/accept/${candidateToAcceptId}`;
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await axios.post(url, {}, { headers });
            console.log("Accept API response:", response.data);
            // Close the confirmation pop-up after successful accept
            setIsConfirmationPopupVisible(false);
            window.location.reload();
        } catch (error) {
            console.error('Error accepting candidate:', error);
            // Close the confirmation pop-up on error (optional)
            setIsConfirmationPopupVisible(false);
        }
    };

    const handleCancelAcceptCandidate = () => {
        // Close the confirmation pop-up when canceled
        setIsConfirmationPopupVisible(false);
    };



    const handleViewHistory = async (id) => {
        try {
            const url = `https://qltd01.cfapps.us10-001.hana.ondemand.com/blacklist/history/${id}`;
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await axios.get(url, { headers });
            console.log("View History API response:", response.data);
            setHistoryData(response.data); // Set the API response data to the state
        } catch (error) {
            console.error('Error fetching history data:', error);
        }
        console.log('history', historyData);
    };


    const altavatar = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg';
    return (
        <div className="Manage-candidate-container" >
            <div className="Manage-candidate-search-container">
                <form className="Manage-candidate-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type name/email ..."
                        name="search"
                        className="Manage-candidate-form-search"
                        value={searchValue}
                        onChange={handleSearchInputChange}
                    />
                </form>
            </div>

            <div className="Manage-candidate-candidate-list">
                <div className="Manage-candidate-header-position">
                    Position: {position}
                </div>


                <div className="Manage-candidate-pagination">
                    <button
                        className="Manage-candidate-button-prev"
                        disabled={currentPageCandidate === 1}
                        onClick={() => handlePageChangeCandidate(currentPageCandidate - 1)}
                    >
                        <FontAwesomeIcon icon={faBackward} />
                    </button>

                    <div className="page-position">
                        {totalPagesCandidate === 0 ? "0 / 0" : `${currentPageCandidate} / ${totalPagesCandidate}`}
                    </div>

                    <button
                        className="Manage-candidate-button-next"
                        disabled={currentPageCandidate === totalPagesCandidate}
                        onClick={() => handlePageChangeCandidate(currentPageCandidate + 1)}
                    >
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>



                <div className="Manage-candidate-title">
                    <div className="Manage-candidate-name-candidate">Họ và tên/Email</div>
                    <div className="Manage-candidate-score-candidate">Điểm số</div>
                    <div className="Manage-candidate-date-register-candidate">Ngày phỏng vấn</div>
                    <div className="Manage-candidate-status">Trạng thái ứng tuyển</div>
                    <div className="Manage-candidate-accept-title">Duyệt</div>
                    <div className="Manage-candidate-details-candidate">Blacklist</div>
                    <div className="Manage-candidate-history">Lịch sử Blacklist</div>
                </div>

                {currentRowsCandidate.filter((item) => {
                    const name = item.name ? item.name.toLowerCase() : '';
                    const email = item.email ? item.email.toLowerCase() : '';
                    const searchValue = initialSearchValue.toLowerCase();

                    return name.includes(searchValue) || email.includes(searchValue);
                })
                    .map((item) => (
                        <div key={item.id}>
                            <div className="Manage-candidate-table-user">
                                <div className="Manage-candidate-name-content-candidate">
                                    <div className="avt">
                                        <div className="Manage-candidate-circle">
                                            <img src={item.avt ? item.avt : altavatar} alt="avt" />
                                        </div>
                                    </div>

                                    <div className="Manage-candidate-name-email">
                                        <div className="Manage-candidate-name-detail">{item.name}</div>
                                        <div className="Manage-candidate-email-detail">{item.email}</div>
                                    </div>
                                </div>
                                <div className="Manage-candidate-score-content-candidate">
                                    <div className="Manage-candidate-column">
                                        {item.listInterview.map((interview, index) => {
                                            if (interview.position === position) {
                                                return <div key={index}>{interview.averageScore}</div>;
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                                <div className="Manage-candidate-date-register-content-candidate">
                                    <div className="Manage-candidate-column">
                                        {item.listInterview.map((interview, index) => {
                                            if (interview.position === position) {
                                                return <div key={index}>{interview.dateInterview}</div>;
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                                <div className="Manage-candidate-status-content">
                                    <div className={`Manage-candidate-frame-status ${item.status === "ACCEPT" ? "Manage-candidate-accept" : ""} 
                                ${item.status === "INPROCESS" ? "Manage-candidate-process" : ""} 
                                `}>{item.status}</div>
                                </div>
                                <div className={`Manage-candidate-accept-content`}>
                                    <button
                                        className={`Manage-candidate-button-accept ${item.status === "ACCEPT" ? "disable-accept" : "enable-accept"
                                            }`}
                                        onClick={() => handleAcceptCandidate(item.id, item.status)}
                                        disabled={item.status !== "INPROCESS"}
                                    >
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                </div>
                                <div className="Manage-candidate-details-content-candidate" >
                                    <Link className={`Manage-candidate-color-button-add`}
                                        to={`/reason-blacklist/${item.id}`}>
                                        <button className={`Manage-candidate-button-blacklist`}>
                                            <StopOutlined />
                                        </button>
                                    </Link>
                                </div>
                                <div className="Manage-candidate-history-content">
                                    <button
                                        className="Manage-candidate-button-history"
                                        onClick={() => {
                                            handleViewHistory(item.id);
                                            handleOpenHistoryPopup();
                                        }}
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

            </div>
            {isHistoryPopupVisible && (
                <HistoryPopup historyData={historyData ? historyData.data : ''} onClose={handleCloseHistoryPopup} />
            )}

            {isConfirmationPopupVisible && (
                <ConfirmationPopup
                    onConfirm={handleConfirmAcceptCandidate}
                    onCancel={handleCancelAcceptCandidate}
                />
            )}
        </div>
    );
}
export default ManageCandidate;