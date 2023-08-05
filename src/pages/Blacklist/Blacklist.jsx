import React, { useState, useEffect } from 'react';
import './Blacklist.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import user from '../user'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { format } from 'date-fns';

function BlackList() {
    const userApi = 'https://qltd01.cfapps.us10-001.hana.ondemand.com/blacklist'
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



    const ROWS_PER_PAGE = 10;
    const [initialSearchValue, setInitialSearchValue] = useState('');
    const [currentPageCandidate, setCurrentPageCandidate] = useState(1);
    console.log('getuser', getUser);
    const candidateUsers = getUser.data;

    console.log('blacklist data', candidateUsers);

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const altavatar = 'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg';


    return (
        <div className="Blacklist-container" >
            <div className="Blacklist-search-container-blacklist">
                <form className="Blacklist-form-blacklist" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type name/email ..."
                        name="search"
                        className="Blacklist-form-search-blacklist"
                        value={searchValue}
                        onChange={handleSearchInputChange}
                    />
                </form>
            </div>

            <div className="Blacklist-candidate-list">
                <div className="Blacklist-pagination">
                    <button
                        className="Blacklist-button-prev"
                        disabled={currentPageCandidate === 1}
                        onClick={() => handlePageChangeCandidate(currentPageCandidate - 1)}
                    >
                        <FontAwesomeIcon icon={faBackward} />
                    </button>

                    <div className="page-position">
                        {totalPagesCandidate === 0 ? "0 / 0" : `${currentPageCandidate} / ${totalPagesCandidate}`}
                    </div>

                    <button
                        className="Blacklist-button-next"
                        disabled={currentPageCandidate === totalPagesCandidate}
                        onClick={() => handlePageChangeCandidate(currentPageCandidate + 1)}
                    >
                        <FontAwesomeIcon icon={faForward} />
                    </button>
                </div>

                <div className="Blacklist-title">
                    <div className="Blacklist-name-candidate">Họ và tên/Email</div>
                    <div className="Blacklist-permission-candidate">Quyền hạn tài khoản</div>
                    <div className="Blacklist-date-register-candidate">Ngày thêm vào Blacklist</div>
                    <div className="Blacklist-position">Vị trí ứng tuyển</div>
                    <div className="Blacklist-status">Trạng thái ứng tuyển</div>
                    <div className="Blacklist-details-candidate">Chi tiết</div>
                </div>

                {currentRowsCandidate.filter((item) => {
                    const name = item.fullName ? item.fullName.toLowerCase() : '';
                    const email = item.email ? item.email.toLowerCase() : '';
                    const searchValue = initialSearchValue.toLowerCase();

                    return name.includes(searchValue) || email.includes(searchValue);
                })
                    .map((item) => (
                        <div key={item.userId}>
                            <div className="Blacklist-table-user">
                                <div className="Blacklist-name-content-candidate">
                                    <div className="avt">
                                        <div className="Blacklist-circle">
                                            <img src={item.avatar ? item.avatar : altavatar} alt="avt" />
                                        </div>
                                    </div>

                                    <div className="Blacklist-name-email">
                                        <div className="Blacklist-name-detail">{item.fullName}</div>
                                        <div className="Blacklist-email-detail">{item.email}</div>
                                    </div>
                                </div>
                                <div className="Blacklist-permission-content-candidate">
                                    CANDIDATE
                                </div>
                                <div className="Blacklist-date-register-content-candidate">
                                    {format(new Date(item.DateBlacklist), "yyyy-MM-dd HH:mm:ss")}
                                </div>
                                <div className="Blacklist-position-content">
                                    <div className="Blacklist-position-column">
                                        {item.ListJobPosting.map((position, index) => (
                                            <div key={index}>{position.position}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="Blacklist-status-content">
                                    <div className={`Blacklist-frame-status ${item.status === "ACCEPT" ? "Blacklist-accept" : ""} 
                                ${item.status === "INPROCESS" ? "Blacklist-process" : ""} 
                                ${item.status === "BLACKLIST" ? "Blacklist-blacklist" : ""} 
                                `}>{item.status}</div>
                                </div>
                                <div className="Blacklist-details-content-candidate" >
                                    <Link to={`/detail-blacklist/${item.blackListId}`}>
                                        <button className="Blacklist-button-view">
                                            View
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}

            </div>
        </div>
    );
}

export default BlackList;