import React, { useEffect, useState, useRef } from "react"
import data from "../data.json"
import "./Table.scss"
import { BsCameraVideo } from "react-icons/bs"
import { MdOutlineCalendarMonth } from "react-icons/md"
import { BsChatDots } from "react-icons/bs"
import { Link } from "react-router-dom"
import { TbPlayerTrackNextFilled } from "react-icons/tb"
import { useSelector } from "react-redux"
import avatar from "../../../assets/No_image_available.png"
import { Spin } from "antd"

const Table = () => {
    const [tableData, setTableData] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState("asc")
    const [selectedPerson, setSelectedPerson] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const sidebarRef = useRef(null)
    const containerRef = useRef(null)
    const [isToggled, setIsToggled] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const accessToken = useSelector(state => state.auth.accessToken)

    const [userId, setUserId] = useState(null)
    const [cv_pdf, setCv_pdf] = useState("")

    const getAllUser = useSelector((state) => {
        const userData = state.getuser.usernames.data.data
        const candidateUsers = userData.filter(
            (user) => user.permission === "CANDIDATE"
        )
        return candidateUsers
    })
    // console.log(getAllUser)

    const formatDate = (inputDate) => {
        const date = new Date(inputDate)
        const day = date.getDate().toString().padStart(2, "0")
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear().toString()
        return `${day}-${month}-${year}`
    }

    const itemsPerPage = 5
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1)
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }
    const [searchType, setSearchType] = useState("name")

    // ... (existing code)

    const handleSearch = (event) => {
        const value = event.target.value
        setSearchQuery(value)
        setCurrentPage(1) // Reset currentPage to 1 when a new search is performed
    }

    // Update the useEffect to filter the data based on the search query and the selected search type
    useEffect(
        (e) => {
            const filteredData = getAllUser.filter((item) => {
                // Check if the search query matches either the name or the username
                return (
                    item.name?.includes(searchQuery) ||
                    item.email?.includes(searchQuery)
                )
            })

            // Update the paginated data with the filtered data
            const totalPages = Math.ceil(filteredData.length / itemsPerPage)
            // Make sure the currentPage is within a valid range
            const validPage = Math.max(1, Math.min(currentPage, totalPages))

            // Calculate the starting index and ending index for the current page
            const startIndex = (validPage - 1) * itemsPerPage
            const endIndex = startIndex + itemsPerPage

            setTableData(filteredData.slice(startIndex, endIndex))
            setCurrentPage(validPage)
        },
        [searchQuery, currentPage]
    )

    const handleNameClick = (person) => {
        setSelectedPerson(person)
        setIsSidebarOpen(true)
        setIsToggled(true)

        const Id = person.id;

        // Replace 'your_api_endpoint' with the actual URL of your API endpoint
        const apiEndpoint = `https://qltd01.cfapps.us10-001.hana.ondemand.com/user/${Id}`;

        // Replace 'your_token_here' with the actual token from your storage (e.g., localStorage)

        // Fetch the user data using the API
        setCv_pdf("")

        fetch(apiEndpoint, {
            method: "GET",
            headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
            // Handle the retrieved user data here
            setCv_pdf(data.data.cv_pdf)
            console.log("User data:", cv_pdf);
            // You can update the state with the user data or perform any other actions with it.
            })
            .catch((error) => {
            // Handle errors if the API call fails
            console.error("Error fetching user data:", error);
            });
    }

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false)
    }

    useEffect(() => {
        const handleClickOutsideSidebar = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                !containerRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutsideSidebar)

        return () => {
            document.removeEventListener("click", handleClickOutsideSidebar)
        }
    }, [])

    const handleClickInfo = () => {
        setIsToggled(true)
    }
    const handleClickCV = () => {
        setIsToggled(false)
    }
    const getStatusColor = (status) => {
        switch (status) {
            case "INPROCESS":
                return {
                    padding: "6px, 12px, 6px, 12px",
                    textAlign: "center",
                    color: "#00A3FF",
                    backgroundColor: "#F1FAFF",
                    border: "none",
                    padding: "8px 6px",
                    borderRadius: "30px",
                    fontWeight: "bolder",
                }
            case "In Transit":
                return {
                    padding: "6px, 12px, 6px, 12px",
                    textAlign: "center",
                    color: "#F1BC00",
                    backgroundColor: "#FFF8DD",
                    border: "none",
                    padding: "8px 6px",
                    borderRadius: "30px",
                    fontWeight: "bolder",
                }
            case "ACCEPT":
                return {
                    padding: "6px, 12px, 6px, 12px",
                    textAlign: "center",
                    color: "#50CD89",
                    backgroundColor: "#E8FFF3",
                    border: "none",
                    padding: "8px 6px",
                    borderRadius: "30px",
                    fontWeight: "bolder",
                }
            default:
                return {
                    padding: "6px, 12px, 6px, 12px",
                    textAlign: "center",
                    color: "red",
                    backgroundColor: "#FFF5F8",
                    border: "none",
                    padding: "8px 6px",
                    borderRadius: "30px",
                    fontWeight: "bolder",
                }
        }
    }
    return (
        <div
            className="manage-candidate"
            style={{
                width: "100%",
                height: "auto",
                backgroundColor: "#e9ecef",
                paddingBottom: "92px",
                paddingTop: "1px",
            }}
            id="table-manage"
        >
            <div className="flex w-full absolute right-[1px] mt-[-70px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 font-serif text-xl text">
                    Quản lý ứng viên
                </div>
            </div>
            <div className="outer-wrapper">
                <div className="table-wrapper">
                    <input
                        className="searchItem"
                        style={{ width: "200px" }}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by name or email"
                    />
                    <div
                        className="form-candidate-user"
                        style={{
                            width: "100%",
                            height: "500px",
                            marginTop: "20px",
                        }}
                    >
                        <table id="candidates" ref={containerRef}>
                            <thead>
                                <tr
                                    style={{
                                        position: "sticky",
                                        position: "-webkit-sticky",
                                        backgroundColor: "blue",
                                    }}
                                >
                                    <th>Avatar</th>
                                    <th style={{ width: "30%" }}>Name</th>
                                    <th>Ngày khởi tạo</th>
                                    <th>Vị trí ứng tuyển</th>
                                    <th>Trạng thái</th>
                                    <th>Xem chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((item) => (
                                    <tr
                                        key={item.id}
                                        onClick={() => handleNameClick(item)}
                                        style={{ cursor: "pointer"}}
                                    >
                                        <td style={{ paddingRight: "5px" }}>
                                            {item.avt ? (
                                                <img
                                                    src={item.avt}
                                                    className="avatar-img"
                                                    alt="User Avatar"
                                                />
                                            ) : (
                                                <img
                                                    src={avatar}
                                                    className="avatar-img"
                                                    alt="Default Avatar"
                                                />
                                            )}
                                        </td>
                                        <td
                                            onClick={() =>
                                                handleNameClick(item)
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            <p style={{ marginBottom: "10px" }}>
                                                {item.name}
                                            </p>
                                            <p>{item.email}</p>
                                        </td>
                                        <td>{formatDate(item.dateRegister)}</td>
                                        <td>
                                            <div  className="scrollable-cell">
                                                {item.listJobPosting.map(
                                                    (position,index) => (
                                                        <p key={index}>
                                                            {position.position}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                style={getStatusColor(
                                                    item.status
                                                )}
                                            >
                                                {item.status}
                                            </div>
                                        </td>
                                        <td style={{ alignItems: "center" }}>
                                            <Link
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                                to={`./${item.id}`}
                                            >
                                                <button className="edit-button">
                                                    <p>Chi tiết</p>
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination */}
                <div
                    className="pagination"
                    style={{ margin: "auto", marginBottom: "20px" }}
                >
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        style={{ marginRight: "10px" }}
                    >
                        Previous{" "}
                    </button>
                    <span>{`Page ${currentPage} / ${Math.ceil(
                        getAllUser.length / itemsPerPage
                    )}`}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={
                            currentPage ===
                            Math.ceil(getAllUser.length / itemsPerPage)
                        }
                        style={{ marginLeft: "10px" }}
                    >
                        Next
                    </button>
                </div>

                {isSidebarOpen && selectedPerson && (
                    <div className="container-table">
                        <div className="container-main" ref={sidebarRef}>
                            <div className="containerAvatar">
                                {selectedPerson.avt ? (
                                    <img
                                        src={selectedPerson.avt}
                                        className="avatar"
                                        alt={selectedPerson.avt}
                                    />
                                ) : (
                                    <img src={avatar} className="avatar" />
                                )}

                                <div className="name">
                                    <h2>{selectedPerson.name}</h2>

                                    <p style={{marginLeft:'10px',marginRight:'5px'}}>
                                        Ứng tuyển: {" "}
                                        {selectedPerson.listJobPosting.map(
                                            (item, index) => (
                                                <span 
                                                    key={index} 
                                                    style={{
                                                        marginRight: "5px",
                                                    }}
                                                >
                                                    {item.position} 
                                                    {index !== selectedPerson.listJobPosting.length - 1 && ","}
                                                </span>
                                            )
                                        )}
                                    </p>
                                    <p style={{ marginTop: "10px" }}>
                                        {" "}
                                        Ngày khởi tạo:{" "}
                                        {formatDate(
                                            selectedPerson.dateRegister
                                        )}
                                    </p>
                                    <span
                                        style={{
                                            marginTop: "10px",
                                            display: "flex",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <BsCameraVideo />
                                        <MdOutlineCalendarMonth
                                            style={{ marginLeft: "10px" }}
                                        />
                                        <BsChatDots
                                            style={{ marginLeft: "10px" }}
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="containerInformation">
                                <div className="button">
                                    <button
                                        className="button-info"
                                        onClick={handleClickInfo}
                                    >
                                        Thông tin cá nhân
                                    </button>
                                    <button
                                        className="button-cv"
                                        onClick={handleClickCV}
                                    >
                                        Thông tin CV
                                    </button>
                                    <button
                                        className="close-button"
                                        onClick={handleCloseSidebar}
                                    >
                                        x
                                    </button>
                                </div>
                                {isToggled === true ? (
                                    <div className="information">
                                        <div className="itemInfo">
                                            <h3>
                                                Họ và tên: {selectedPerson.name}
                                            </h3>
                                        </div>
                                        <div className="itemInfo">
                                            <h3>
                                                Username: {selectedPerson.username}
                                            </h3>
                                        </div>
                                        <div className="itemInfo">
                                            <h3>
                                                Email: {selectedPerson.email}
                                            </h3>
                                        </div>
                                        <div className="itemInfo">
                                            <h3>
                                                Số điện thoại: {selectedPerson.phone}
                                            </h3>
                                        </div>
                                        <div
                                            className="itemInfo"
                                            style={{ height: "25%" }}
                                        >
                                            <h3
                                                style={{ marginBottom: "30px" }}
                                            >
                                                Địa chỉ: {selectedPerson.address}
                                            </h3>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="information">
                                        <div className="itemInfo">
                                            <h3>
                                                Họ và tên: {selectedPerson.name}
                                            </h3>
                                        </div>
                                        <div className="itemInfo">
                                            <h3>Học vấn: </h3>
                                        </div>
                                        <div className="itemInfo">
                                            <h3>Kinh nghiệm làm việc: {selectedPerson.experience} </h3>
                                        </div>
                                        <div className="itemInfo">
                                            <h3>Số điện thoại: {selectedPerson.phone}</h3>
                                        </div>
                                        <div
                                            className="itemInfo"
                                            style={{ height: "25%" }}
                                        >
                                            <h3
                                                style={{ marginBottom: "30px" }}
                                            >
                                            Tệp CV: {" "}
                                            {
                                              cv_pdf === "" ? ( <Spin />) 
                                              : cv_pdf
                                              ? <a href={cv_pdf} style={{color:'blue'}} target="blank"> CV</a>
                                              : <span>Không có</span>
                                            }
                                            </h3>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Add more information as needed */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Table
