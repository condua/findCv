import { Avatar } from "antd"
import { useState } from "react";
// import { useNavigate } from "react-router-dom"


const InterviewDetailDashboard = ({ dataDashboardDetail }) => {


    return (
        <div className='bg-white w-full rounded-xl flex-col'>
            <div className="flex flex-row justify-between mx-40 mt-10 mb-0 w-3/4 ">
                <div className="flex " style={{ fontWeight: 500, fontSize: 30 }}>{dataDashboardDetail.roomName}</div>
                <div className="flex w-1/1.5">
                    <button
                        type="button" disabled
                        style={{
                            backgroundColor:
                                dataDashboardDetail.status === 'In Process' ? '#0088FE'
                                    : dataDashboardDetail.status === 'Completed' ? '#00C49F' : '#cecece',
                            color:
                                dataDashboardDetail.status === 'In Process' ? '#ffffff'
                                    : dataDashboardDetail.status === 'Completed' ? '#ffffff' : 'black',
                            borderRadius: 5,
                            fontWeight: 500,
                            fontSize: 19,
                            padding: '5px 10px',
                            width: 140,
                        }}
                    >
                        {dataDashboardDetail.status}
                    </button>
                </div>
            </div>

            <div className="mx-40" style={{ fontSize: 20, fontWeight: 300 }}>{dataDashboardDetail.roomSkill}</div>

            <div className='flex mx-40 mt-2 ' style={{ fontSize: 18 }}>
                <div>
                    <span style={{ fontWeight: 400, paddingRight: 5 }}>Ngày bắt đầu:</span>
                    <span style={{ fontWeight: 300 }}>{dataDashboardDetail.startDate}</span>
                </div>

                <div style={{ paddingLeft: 223 }}>
                    <span style={{ fontWeight: 400, paddingRight: 5 }}>Ngày kết thúc:</span>
                    <span style={{ fontWeight: 300 }}>{dataDashboardDetail.endDate}</span>
                </div>
            </div>

            <div className="flex mt-4">
                <div>
                    <div className="mx-40" style={{ fontWeight: 400, fontSize: 18 }}>
                        <span>Số người phỏng vấn:</span>
                        <span style={{ fontWeight: 300, paddingLeft: 5 }}>{dataDashboardDetail.listInterviewer.length} người</span>
                    </div>

                    <div className="mx-40 mt-2" style={{}}>
                        <Avatar.Group
                            maxCount={7}
                            size="large"
                            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', fontWeight: 500 }}
                        >
                            {dataDashboardDetail.listInterviewer.map((participant, index) => (
                                <Avatar
                                    className="hover:relative hover:z-10"
                                    key={index}
                                    src={participant.avatar}
                                    style={{
                                        transition: 'transform 0.2s', // Thêm hiệu ứng transition
                                        margin: 0,

                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'scale(2.5)'; // Phóng to avatar khi hover vào
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)'; // Khôi phục kích thước ban đầu khi rê chuột ra khỏi avatar
                                    }}
                                />
                            ))}
                        </Avatar.Group>
                    </div>
                </div>

                <div className="mx-10">
                    <div style={{ fontWeight: 400, fontSize: 18 }}>
                        <span>Số ứng viên phỏng vấn:</span>
                        <span style={{ fontWeight: 300, paddingLeft: 5 }}>{dataDashboardDetail.listCandidate.length} người</span>
                    </div>

                    <div className=" mt-2 ">
                        <Avatar.Group
                            maxCount={7}
                            size="large"
                            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', fontWeight: 500 }}
                        >
                            {dataDashboardDetail.listCandidate.map((participant, index) => (
                                <Avatar key={index} src={participant.avatar} />
                            ))}
                        </Avatar.Group>
                    </div>
                </div>
            </div>

            <div className="mx-40 mt-2 mb-10" style={{ fontSize: 18 }}>
                <span style={{ fontWeight: 500, paddingRight: 30 }}>
                    Meeting link:
                </span>
                <a href={dataDashboardDetail.link} target="_blank" rel="noreferrer">
                    {dataDashboardDetail.link}
                </a>
            </div>
        </div >

    )

}

export default InterviewDetailDashboard