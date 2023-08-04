
import InterviewDetailCard from './InterviewDetailCard'
import InterviewDetailDashboard from './InterviewDetailDashboard'
// import dataInterviewDetail from '../../../data/InterviewDetail.json'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getInterviewRequest } from "../../../redux/action/interviewActions";

import { useState } from 'react'
import { useEffect } from 'react'



function InterviewDetail() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const handleCancelClick = () => {
    navigate("/interviewmain", { replace: true })
  }

  // Sử dụng khi có api gọi data
  const interviewDataRedux = useSelector((state) => state.interview.interviewData || []);


  const [data, setData] = useState(interviewDataRedux.data);
  const accessToken = useSelector((state) => state.auth.accessToken);
  
  useEffect(() => {
    dispatch(getInterviewRequest(accessToken));
  }, [dispatch, accessToken]);
  
  const interviewData = useSelector((state) => state.interview.interviewData || []);
  useEffect(() => {
    if (interviewData) {
      setData(interviewData.data);
    }
  }, [interviewData]);


  // data.pop() // Vì phần tử trả về từ data đang null nên xóa
  // console.log("dataInterview", data)

  const dataInterview = data.map((item) => {
    const [startDay, startMonth, startYear] = item.startDate.split("-").map(Number);
    const [endDay, endMonth, endYear] = item.endDate.split("-").map(Number);

    const startDateTemp = new Date(startYear, startMonth - 1, startDay);
    const endDateTemp = new Date(endYear, endMonth - 1, endDay);
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    if (currentDate < startDateTemp) {
      return { ...item, status: "Yet to start" };
    } else if (currentDate > endDateTemp) {
      return { ...item, status: "Completed" };
    } else {
      return { ...item, status: "In Process" };
    }
  });
  const dataInterviewDetail = dataInterview.filter((item) => item.id == params.id);

  // console.log("dataInterviewCard", dataInterviewDetail[0].listCandidate)

  return (

    <div className="flex mt-7">
      <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
        <div className="ml-10 text-xl text">Phòng phỏng vấn</div>
        <button onClick={handleCancelClick} className=" text-sky-700 mx-10" style={{ paddingLeft: 900, fontWeight: 500, fontSize: 19 }}>Back</button>
      </div>
      <div className="flex w-full flex-col">

        <InterviewDetailDashboard dataDashboardDetail={dataInterviewDetail[0]} />
        <div style={{ paddingTop: 25, fontWeight: 500, fontSize: 22 }}>Targets</div>
        <InterviewDetailCard dataInterviewDetail={dataInterviewDetail[0].listCandidate} />
      </div>

    </div>
  )
}
export default InterviewDetail