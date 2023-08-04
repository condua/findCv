import { Avatar, Button, Card } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';

const InterviewDashboard = ({ dataInterviewDashboard }) => {

    const dataChart = [
        { value: dataInterviewDashboard.totalInterview[1] }, // In Process
        { value: dataInterviewDashboard.totalInterview[2] }, // Completed
        { value: dataInterviewDashboard.totalInterview[3] }, // Yet to start
    ];

    const COLORS = ["#0088FE", "#00C49F", "#cecece"];

    const navigate = useNavigate()

    const handleClickAllCandidates = () => {
        navigate('')         // Chuyển hướng đến trang quản lý Candidates
    }


    return (
        <div className='w-full flex justify-around gap-10 '>
            <div className='flex bg-white w-1/3 h-[280px] rounded-xl flex-col'>
                <div className='flex' style={{ paddingTop: '8%', paddingLeft: '10%', fontWeight: 500, fontSize: 22 }}>{dataInterviewDashboard.totalInterview[0]} Cuộc phỏng vấn</div>
                <div className='flex'>
                    <div className='flex w-1/2 flex-col'>
                        <div className='flex gap-3 h-[40px] flex-row' style={{ paddingTop: '20%', paddingLeft: '20%' }}>
                            In Process
                            <Card style={{ backgroundColor: '#0088FE', height: 20, width: 20, marginLeft: 2 }} />
                            <label style={{}}>{dataInterviewDashboard.totalInterview[1]}</label>
                        </div>
                        <div className='flex gap-3 h-[40px]' style={{ paddingTop: '20%', paddingLeft: '20%' }}>
                            Completed
                            <Card style={{ backgroundColor: '#00C49F', height: 20, width: 20 }} />
                            <label style={{}}>{dataInterviewDashboard.totalInterview[2]}</label>
                        </div>
                        <div className='flex gap-3 h-[40px]' style={{ paddingTop: '20%', paddingLeft: '20%' }}>
                            Yet to start
                            <Card style={{ backgroundColor: '#cecece', height: 20, width: 20, marginLeft: 1 }} />
                            <label style={{}}>{dataInterviewDashboard.totalInterview[3]}</label>
                        </div>
                    </div>
                    <div className='flex w-1/2'>
                        <PieChart width={180} height={200}>
                            <Pie
                                data={dataChart}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {dataChart.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
                </div>

            </div>

            <div className='flex bg-white w-1/3 h-[280px] rounded-xl'>
                <div className='flex w-full flex-col'>
                    <div className='flex' style={{ paddingTop: '8%', paddingLeft: '10%', fontWeight: 500, fontSize: 22 }}>{dataInterviewDashboard.candidateQuotas} Chỉ tiêu ứng viên</div>
                    <div className='flex'>
                        <div style={{ paddingTop: '5%', paddingLeft: '10%', fontWeight: 400, fontSize: 19 }}>Chỉ tiêu ứng viên tăng</div>
                        <div style={{ paddingTop: '5%', paddingLeft: '15%', fontWeight: 400, fontSize: 19 }}>{dataInterviewDashboard.increasedTargets} người</div>
                    </div>
                </div>
            </div>

            <div className='flex bg-white w-1/3 h-[280px] rounded-xl'>
                <div className='flex w-full flex-col'>
                    <div className='flex' style={{ paddingTop: '8%', paddingLeft: '10%', fontWeight: 500, fontSize: 22 }}>{dataInterviewDashboard.Applied} Đã ứng tuyển</div>
                    <div className='flex' style={{ paddingTop: '3%', paddingLeft: '10%', fontWeight: 400, fontSize: 19 }}>Các ứng viên gần đây</div>
                    <div className='flex' style={{ paddingTop: '5%', paddingLeft: '10%' }}>
                        <Avatar.Group
                            maxCount={7}
                            size="large"
                            maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', fontWeight: 500 }}
                        >
                            <Avatar src={dataInterviewDashboard.recentCandidate[0]}/>
                            <Avatar src={dataInterviewDashboard.recentCandidate[1]}/>
                            <Avatar src={dataInterviewDashboard.recentCandidate[2]}/>
                            <Avatar src={dataInterviewDashboard.recentCandidate[3]}/>
                            <Avatar src={dataInterviewDashboard.recentCandidate[4]}/>
                            <Avatar src={dataInterviewDashboard.recentCandidate[5]}/>
                            <Avatar src={dataInterviewDashboard.recentCandidate[6]}/>

                        </Avatar.Group>
                    </div>
                    <div className="flex" style={{ paddingTop: '5%', paddingLeft: '10%' }} >
                        <Button
                            onClick={handleClickAllCandidates}
                            style={{ backgroundColor: '#0097e9', color: 'white', fontWeight: 500 }}
                        >
                            Danh sách ứng viên
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default InterviewDashboard