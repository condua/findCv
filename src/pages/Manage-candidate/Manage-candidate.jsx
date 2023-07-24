import React, { useState } from 'react';
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




function ManageCandidate() {
    const { id } = useParams();

    const ROWS_PER_PAGE = 11;
    const [initialSearchValue, setInitialSearchValue] = useState('');
    const [currentPageCandidate, setCurrentPageCandidate] = useState(1);
    const candidateUsers = user.filter(item => item.permission === "Candidate" && item.status !== "Blacklist" && item.position === id);

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
                    Language: {id}
                </div>


                <div className="Manage-candidate-pagination">
                    <button
                        className="Manage-candidate-button-prev"
                        disabled={currentPageCandidate === 1}
                        onClick={() => handlePageChangeCandidate(currentPageCandidate - 1)}
                    >
                        <FontAwesomeIcon icon={faBackward} />
                    </button>

                    <div className="page-position">{currentPageCandidate} / {totalPagesCandidate}</div>

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
                    <div className="Manage-candidate-position">Duyệt</div>
                    <div className="Manage-candidate-details-candidate">Blacklist</div>
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
                                <div className="Manage-candidate-table-user">
                                    <div className="Manage-candidate-name-content-candidate">
                                        <div className="avt">
                                            <div className="Manage-candidate-circle">
                                                <img src={item.avt} alt="avt" />
                                            </div>
                                        </div>

                                        <div className="Manage-candidate-name-email">
                                            <div className="Manage-candidate-name-detail">{item.name}</div>
                                            <div className="Manage-candidate-email-detail">{item.email}</div>
                                        </div>
                                    </div>
                                    <div className="Manage-candidate-score-content-candidate">{item.score}</div>
                                    <div className="Manage-candidate-date-register-content-candidate">{item.date}</div>
                                    <div className="Manage-candidate-status-content">
                                        <div className={`Manage-candidate-frame-status ${item.status === "Accept" ? "Manage-candidate-accept" : ""} 
                                ${item.status === "In process" ? "Manage-candidate-process" : ""} 
                                `}>{item.status}</div>
                                    </div>
                                    <div className={`Manage-candidate-position-content`}>
                                        <button className={`Manage-candidate-button-accept ${item.status === "Accept" ? "disable-accept" : ""}`}>
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                    </div>
                                    <div className="Manage-candidate-details-content-candidate" >
                                        <Link className={`Manage-candidate-color-button-add`}
                                            to={`/reason-blacklist/${item.id}`}>
                                            <button className={`Manage-candidate-button-edit-candidate`}>
                                                <StopOutlined />
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
export default ManageCandidate;