
import InterviewDetailCard from './InterviewDetailCard'
import InterviewDetailDashboard from './InterviewDetailDashboard'
import dataInterviewDetail from '../../../data/InterviewDetail.json'
import dataDashboardDetail from '../../../data/DashboardDetail.json'
import { useNavigate } from 'react-router-dom'


function InterviewDetail() {
    const navigate = useNavigate()
    const handleCancelClick = () => {
        navigate("/interview", { replace: true })
    }
    return (

        <div className="flex mt-7">
            <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 text-xl text">Phòng phỏng vấn</div>
                <button onClick={handleCancelClick} className=" text-sky-700 mx-10" style={{paddingLeft: 900, fontWeight: 500, fontSize: 19}}>Back</button>
            </div>
            <div className="flex w-full flex-col">

                <InterviewDetailDashboard dataDashboardDetail={dataDashboardDetail} />
                <div style={{ paddingTop: 25, fontWeight: 500, fontSize: 22 }}>Targets</div>
                <InterviewDetailCard dataInterviewDetail={dataInterviewDetail} />
            </div>

        </div>
    )
}
export default InterviewDetail