import { Avatar, Button, Modal } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"



const InterviewCard = ({ dataInterview }) => {

    const navigate = useNavigate()
    const auth = useSelector(state => state.auth.data)

    const handleButton = (roomID, listInterviewer, emailInterview) => {

        const listEmailsPermission = listInterviewer.map((interviewer) => interviewer.email)

        const isInterviewerExist = listEmailsPermission?.includes(emailInterview);
        if (isInterviewerExist) {
            navigate(`/interview/detail/${roomID}`);
        } else {
            Modal.error({
                title: "Không được phép",
                content: "Bạn không được phép truy cập vào phòng này!",
                okButtonProps: {
                    style: {
                        color: "black",
                        border: "1px solid black",
                    },
                },
            });
        }
    }

    const emailInterview = auth.email



    const EVENTS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(1);
    // const [showResults, setShowResults] = useState(true);
    const totalEventPage = Math.ceil(dataInterview.length / EVENTS_PER_PAGE);
    const paginatedData = dataInterview.slice(
        (currentPage - 1) * EVENTS_PER_PAGE,
        currentPage * EVENTS_PER_PAGE
    );

    return (
        <div>
            <div className='grid grid-cols-3 gap-10 ' style={{ paddingTop: 25 }}>
                {paginatedData && Array.isArray(paginatedData) && paginatedData.map((item) => (
                    // Một box thông tin về cuộc phỏng vấn
                    <div className='bg-white h-[280px] rounded-xl '>
                        <div style={{ fontSize: 22, fontWeight: 500, paddingTop: '8%', paddingLeft: '10%' }}>{item.roomName}</div>
                        <div style={{ fontSize: 15, fontWeight: 200, paddingTop: '1%', paddingLeft: '10%' }}>{item.roomSkill}</div>
                        <label
                            style={{
                                backgroundColor:
                                    item.status === 'In Process' ? '#0088FE'
                                        : item.status === 'Completed' ? '#00C49F' : '#cecece',
                                color:
                                    item.status === 'In Process' ? '#ffffff'
                                        : item.status === 'Completed' ? '#ffffff' : 'black',
                                borderRadius: 5,
                                fontWeight: 500,
                                padding: '4px 10px',
                                position: 'relative',
                                left: 250,
                                top: -65
                            }}
                        >
                            {item.status}
                        </label>
                        <div style={{ fontWeight: 500, paddingLeft: '10%' }}>
                            <label style={{ paddingRight: '25%' }}>Ngày bắt đầu</label>
                            <label>Số ứng viên tham gia</label>
                        </div>
                        <div style={{ paddingLeft: '10%' }}>
                            <label>{item.startDate}</label>
                            <label style={{ paddingLeft: '29%' }}>{item.listCandidate.length} người</label>
                        </div>

                        <div>
                            <Avatar.Group
                                maxCount={5}
                                size="large"
                                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', fontWeight: 500 }}
                                style={{ paddingLeft: '23%', paddingTop: '5%' }}
                            >
                                {item.listCandidate && item.listCandidate.map((avatar) => (
                                    <Avatar key={avatar.email} src={avatar.avatar} />
                                ))}
                            </Avatar.Group>
                        </div>

                        <div style={{ paddingTop: '3%', paddingLeft: '34%' }}>
                            <Button
                                onClick={() => handleButton(item.id, item.listInterviewer, emailInterview)}
                                style={{ backgroundColor: "rgb(255 196 101)", fontWeight: 500 }}
                            >
                                Xem thông tin
                            </Button>
                        </div>
                    </div>

                ))}
            </div>

            <div>
                {totalEventPage > 1 && (
                    <div className="d-flex justify-content-center mt-3" style={{ marginBottom: 20, marginTop: 30, textAlign: 'center' }}>
                        <Button
                            variant="outline-success"
                            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                            disabled={currentPage === 1}
                            className="me-2 rounded-circle btn btn-md"
                        >
                            <span>&lt;</span>
                        </Button>
                        <span className="align-self-center">
                            {currentPage}/{totalEventPage} trang
                        </span>
                        <Button
                            variant="outline-success"
                            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                            disabled={currentPage === totalEventPage}
                            className="ms-2 rounded-circle btn btn-md"
                        >
                            <span>&gt;</span>
                        </Button>
                    </div>
                )}
            </div>

        </div>
    )
}

export default InterviewCard