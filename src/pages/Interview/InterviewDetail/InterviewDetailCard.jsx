import { Avatar, Button } from "antd"
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



const InterviewDetailCard = ({ dataInterviewDetail }) => {

    const navigate = useNavigate()
    const params = useParams()

    const EVENTS_PER_PAGE = 9;
    const [currentPage, setCurrentPage] = useState(1);
    // const [showResults, setShowResults] = useState(true);
    const totalEventPage = Math.ceil(dataInterviewDetail.length / EVENTS_PER_PAGE);
    const paginatedData = dataInterviewDetail.slice(
        (currentPage - 1) * EVENTS_PER_PAGE,
        currentPage * EVENTS_PER_PAGE
    );

    console.log("dataInterviewDetail",dataInterviewDetail)

    const handleButtonStatus = (interviewDetailId, roomId) => {

        return (
            navigate(`/interview/detail/${roomId}/${interviewDetailId}`)
        )
    }

    return (
        <div>
            <div className='grid grid-cols-3 gap-10 ' style={{ paddingTop: 25 }}>
                {paginatedData && Array.isArray(paginatedData) && paginatedData.map((item) => (

                    < div div className='bg-white rounded-xl' >
                        <Avatar
                            src={item.avatar}
                            style={{ width: 70, height: 70, position: 'relative', left: '42%', top: '7%' }}
                        />
                        <div style={{ fontWeight: 500, fontSize: 21, paddingTop: '6%', paddingLeft: '1%', textAlign: 'center' }}>{item.name}</div>
                        {/* <div style={{ fontWeight: 300, fontSize: 18, paddingLeft: '1%', textAlign: 'center' }}>{item.position}</div> */}

                        <div className="flex w-full justify-center mx-10">
                            <div className="flex flex-col w-full justify-self-center">
                                <label style={{ fontSize: 17, fontWeight: 500 }}>Kỹ năng</label>
                                <label style={{ fontSize: 16, fontWeight: 200 }}>{item.skills}</label>

                            </div>
                            {/* <div> */}
                            <div className='flex flex-col w-full'>
                                <label style={{ fontSize: 17, fontWeight: 500 }}>Kinh nghiệm</label>
                                <label style={{ fontSize: 16, fontWeight: 200 }}>{item.experience}</label>
                            </div>
                        </div>

                        <div className='flex w-full my-4 mx-10'>
                            <label style={{ fontSize: 17, fontWeight: 500 }}>Thời gian:</label>
                            <label style={{ fontSize: 17, fontWeight: 400, paddingLeft: 2 }}>{item.date}({item.time})</label>
                        </div>

                        <div className="flex justify-center mb-3" style={{ textAlign: 'center' }}>
                            <Button
                                onClick={() => handleButtonStatus(item.itemId, params.id)}
                                style={{
                                    height: 26,
                                    // marginLeft: '41%',
                                    backgroundColor: item.status === 'Đã chấm' ? '#b7f1b7' : '#ffa9a9',
                                    color: item.status === 'Đã chấm' ? 'green' : 'red',
                                    fontWeight: 500,
                                    padding: '1px 10px',
                                    textAlign: 'center'
                                }}
                            >
                                {item.status}
                            </Button>
                        </div>
                    </div >

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

export default InterviewDetailCard