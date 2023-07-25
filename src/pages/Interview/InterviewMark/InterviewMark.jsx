
import InterviewDetailDashboard from '../InterviewDetail/InterviewDetailDashboard'
import DetailCard from './DetailCard'
import dataDashboardDetail from '../../../data/DashboardDetail.json'
import dataInterviewDetail from '../../../data/InterviewDetail.json'
import { useNavigate, useParams } from 'react-router-dom'
import FormInterview from './FormInterview'
import { useState } from 'react'
// import { Card } from 'antd'
// import { useState } from 'react'


const InterviewMark = () => {

    const pamas = useParams()
    
    const interID = pamas.id
    const inforID = pamas.mark_id
    // console.log(inforID)

    const navigate = useNavigate()
    const handleCancelClick = (interviewID) => {
        navigate(`/interview/detail/${interviewID}`)
    }

    return (
        <div className="flex mt-7">
            <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 text-xl text">Phỏng vấn</div>
                <button onClick={() => handleCancelClick(interID)} className=" text-sky-700 mx-10" style={{ paddingLeft: 900, fontWeight: 500, fontSize: 19 }}>Back</button>

            </div>
            <div className="flex w-full flex-col">
                <InterviewDetailDashboard dataDashboardDetail={dataDashboardDetail} />

                <div className="flex w-full flex-col-2 ">
                    <div className='flex w-1/3 flex-col'>

                        <div style={{ paddingTop: 10, fontWeight: 500, fontSize: 22 }}>Ứng viên</div>
                        <div className='flex' style={{ width: '300%' }}>
                            <DetailCard dataInterviewDetail={dataInterviewDetail} id={inforID} />
                        </div> 

                        <div style={{ paddingTop: 10, fontWeight: 500, fontSize: 22 }}>CV của ứng viên</div>
                        <div className='flex' style={{ width: '300%' }}>
                            <div className='flex' style={{ marginTop: 10, backgroundColor: 'white', width: '25%', height: 400, borderRadius: 5 }}>CV</div>
                        </div>
                    </div>

                    <div className='flex w-2/3 flex-col'>
                        <FormInterview id={inforID} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InterviewMark