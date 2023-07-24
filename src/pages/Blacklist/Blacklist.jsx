import React, { useState } from 'react';
import './Blacklist.scss';
import background from '../../assets/background.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import user from '../user'
import { Link } from 'react-router-dom';

function BlackList() {

    const ROWS_PER_PAGE = 10;
    const [initialSearchValue, setInitialSearchValue] = useState('');
    const [currentPageCandidate, setCurrentPageCandidate] = useState(1);
    const candidateUsers = user.filter(item => item.permission === "Candidate" && item.status === "Blacklist");

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    //Select
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');

    const handleSelect1 = (event) => {
        setSelectedOption1(event.target.value);
    };

    const handleSelect2 = (event) => {
        setSelectedOption2(event.target.value);
    };


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

                <select className="Blacklist-select-date" value={selectedOption1} onChange={handleSelect1}>
                    <option value="">Ngày đăng ký ứng tuyển</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>

                <select className="Blacklist-select-position" value={selectedOption2} onChange={handleSelect2}>
                    <option value="">Vị trí ứng tuyển</option>
                    <option value="optionA">Option A</option>
                    <option value="optionB">Option B</option>
                    <option value="optionC">Option C</option>
                </select>

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

                    <div className="page-position">{currentPageCandidate} / {totalPagesCandidate}</div>

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
                    return (
                        item.name.toLowerCase().includes(initialSearchValue.toLowerCase()) ||
                        item.email.toLowerCase().includes(initialSearchValue.toLowerCase())
                    );
                })
                    .map((item) => (
                        <div key={item.id}>
                            {item.permission === "Candidate" && ( // Kiểm tra điều kiện permission bằng "Candidate"
                                <div className="Blacklist-table-user">
                                    <div className="Blacklist-name-content-candidate">
                                        <div className="avt">
                                            <div className="Blacklist-circle">
                                                <img src={item.avt} alt="avt" />
                                            </div>
                                        </div>

                                        <div className="Blacklist-name-email">
                                            <div className="Blacklist-name-detail">{item.name}</div>
                                            <div className="Blacklist-email-detail">{item.email}</div>
                                        </div>
                                    </div>
                                    <div className="Blacklist-permission-content-candidate">{item.permission}</div>
                                    <div className="Blacklist-date-register-content-candidate">{item.date}</div>
                                    <div className="Blacklist-position-content">{item.position}</div>
                                    <div className="Blacklist-status-content">
                                        <div className={`Blacklist-frame-status ${item.status === "Accept" ? "Blacklist-accept" : ""} 
                                ${item.status === "In process" ? "Blacklist-process" : ""} 
                                ${item.status === "Blacklist" ? "Blacklist-blacklist" : ""} 
                                `}>{item.status}</div>
                                    </div>
                                    <div className="Blacklist-details-content-candidate" >
                                        <Link to={`/detail-blacklist/${item.id}`}>
                                            <button className="Blacklist-button-view">
                                                View
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
}

export default BlackList;