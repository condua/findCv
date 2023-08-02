// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom";
import dataInterview from "../../../data/Interview.json"
import dataInterviewDashboard from "../../../data/DashboardInterview.json"
import InterviewDashboard from "./InterviewDashboard";
import InterviewCard from "./InterviewCard";


function InterviewMain() {
    return (
        <div className="flex mt-7">
            <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 text-xl text">Danh sách phòng phỏng vấn</div>
            </div>
            <div className="flex w-full flex-col">
                <InterviewDashboard dataInterviewDashboard={dataInterviewDashboard}/>
                <div style={{ paddingTop: 25, fontWeight: 500, fontSize: 22 }}>Các buổi phỏng vấn và phòng phỏng vấn</div>
                <InterviewCard dataInterview={dataInterview} />
            </div>

        </div>


    )
}

export default InterviewMain







