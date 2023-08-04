import InterviewDashboard from "./InterviewDashboard";
import InterviewCard from "./InterviewCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getInterviewRequest } from "../../../redux/action/interviewActions";
import dataInterviewDashboard from "../../../data/DashboardInterview.json"
import { Spin } from "antd";


function InterviewMain() {

  // Sử dụng khi có api gọi data

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    dispatch(getInterviewRequest(accessToken));
  }, [dispatch, accessToken]);

  const interviewData = useSelector((state) => state.interview.interviewData || []);

  useEffect(() => {
    if (interviewData) {
      setData(interviewData.data);
    }
  }, [interviewData.data]);

  if (!data) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
        <Spin size="large" style={{ marginBottom: 10 }} />
        <p>Loading...</p>
      </div>)
  }
  // Convert Date để set Status
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

  // console.log("dataInterviewforTest:", dataInterviewforTest);  dataInterview

  return (
    <div className="flex mt-7">
      <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
        <div className="ml-10 text-xl text">Danh sách phòng phỏng vấn</div>
      </div>
      <div className="flex w-full flex-col">
        <InterviewDashboard dataInterviewDashboard={dataInterviewDashboard} />
        <div style={{ paddingTop: 25, fontWeight: 500, fontSize: 22 }}>Các buổi phỏng vấn và phòng phỏng vấn</div>
        <InterviewCard dataInterview={dataInterview} />
        {/* <InterviewCard dataInterview={dataInterview} /> */}
        {/* <InterviewCard dataInterview={data} /> */}
      </div>

    </div>


  )
}

export default InterviewMain







