
import InterviewDetailDashboard from '../InterviewDetail/InterviewDetailDashboard'
import DetailCard from './DetailCard'
// import dataDashboardDetail from '../../../data/DashboardDetail.json'
// import dataInterviewDetail from '../../../data/InterviewDetail.json'
import { useNavigate, useParams } from 'react-router-dom'
import FormMark from './FormMark'
import FormView from './FormView'
import { useState } from 'react'

import { useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'


const InterviewMark = () => {

    const pamas = useParams()

    const roomID = pamas.id        // roomID
    const interviewDetailId = pamas.mark_id   // interviewDetailId
    // console.log("pamas",interviewDetailId)

    const navigate = useNavigate()
    const handleCancelClick = (roomID) => {
        navigate(`/interview/detail/${roomID}`)
    }

    const dataInterviewMarkConvert = (item) => {
        const [startDay, startMonth, startYear] = item.startDate.split("-").map(Number);
        const [endDay, endMonth, endYear] = item.endDate.split("-").map(Number);

        const startDateTemp = new Date(startYear, startMonth - 1, startDay);
        const endDateTemp = new Date(endYear, endMonth - 1, endDay);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (currentDate < startDateTemp) {
            return { ...item, status: "Yet to start" };
        } else if (currentDate > endDateTemp) {
            return { ...item, status: "Completed" };
        } else {
            return { ...item, status: "In Process" };
        }
    };
    const interviewDataRedux = useSelector((state) => state.interview.interviewData || []);
    // console.log("data1213",interviewDataRedux.data)

    const interviewDataforID = interviewDataRedux.data.find(item => item.id == roomID);
    const dataInterviewMarkConverted = dataInterviewMarkConvert(interviewDataforID);

    // console.log("aaa", dataInterviewMarkConverted.listCandidate)

    // get Status của interviewCandidate
    const getStatus = (data, id) => {
        const candidate = data.find((item) => item.itemId == id);
        return candidate.status
    };
    const statusMark = getStatus(dataInterviewMarkConverted.listCandidate, interviewDetailId);
    // console.log("dataInterviewMarkConverted", dataInterviewMarkConverted.listCandidate)

    // get link CV Candidate
    // const getLinkCV = (data, id) => {
    //     const candidate = data.find((item) => item.itemId == id);
    //     return candidate.cv.url
    // };
    // const linkCV = getLinkCV(dataInterviewMarkConverted.listCandidate, interviewDetailId);
    // console.log("linkCV", linkCV)



    // Gọi api detail interview nếu đã chấm thì truyền dataView vào

    const [dataInterviewMarkbyID, setDataInterviewMarkbyID] = useState(
        {
            id: null,
            roomId: null,
            candidate: {
                itemId: null,
                candidateId: null,
                name: null,
                email: null,
                date: null,
                time: null,
                status: null,
                skill: null,
                experience: null
            },
            cv: {
                id: null,
                url: null,
                dateApply: null,
                state: null
            },
            description: null,
            averageScores: null,
            comment: null,
            englishQuestion: null,
            technicalQuestion: null,
            softSkillQuestion: null,
            interviewer: null
        }
    );
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        const fetchDataInterviewMarkbyID = async () => {
            try {
                const response = await axios.get(
                    `https://qltd01.cfapps.us10-001.hana.ondemand.com/interview-detail/${interviewDetailId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setDataInterviewMarkbyID(response.data || {})
            } catch (error) {
                console.error('Error fetching interview details:', error);
            }
        };

        fetchDataInterviewMarkbyID();
    }, [interviewDetailId, accessToken]);


    console.log("dataInterviewMarkbyID", dataInterviewMarkbyID.data)

    // Gọi api câu hỏi theo skill id của candidate để truyền vào FormMark


    // get link CV Candidate
    const [linkCV, setLinkCV] = useState(null)
    useEffect(() => {
        const getLinkCV = (data) => {
            return data?.cv?.url || null;
        };

        if (dataInterviewMarkbyID && dataInterviewMarkbyID.data) {
            const linkCVCandidate = getLinkCV(dataInterviewMarkbyID.data);
            setLinkCV(linkCVCandidate);
        }
    }, [dataInterviewMarkbyID]);



    return (
        <div className="flex mt-7">
            <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 text-xl text">Phỏng vấn</div>
                <button onClick={() => handleCancelClick(roomID)} className=" text-sky-700 mx-10" style={{ paddingLeft: 900, fontWeight: 500, fontSize: 19 }}>Back</button>

            </div>
            <div className="flex w-full flex-col">
                <InterviewDetailDashboard dataDashboardDetail={dataInterviewMarkConverted} />

                <div className="flex w-full flex-col-2 ">
                    <div className='flex w-1/3 flex-col'>

                        <div style={{ paddingTop: 10, fontWeight: 500, fontSize: 22 }}>Ứng viên</div>
                        <div className='flex' style={{ width: '300%' }}>
                            <DetailCard dataInterviewDetail={dataInterviewMarkConverted.listCandidate} id={interviewDetailId} />
                        </div>

                        <div style={{ paddingTop: 10, fontWeight: 500, fontSize: 22 }}>CV của ứng viên</div>
                        <div className='flex' style={{ width: '300%', fontSize: 16 }}>
                            Xem CV của ứng viên
                            <a href={linkCV} target="_blank" rel="noreferrer"
                                style={{ backgroundColor: 'rgb(27 234 108)', borderRadius: 5, marginLeft: 5, padding: '0px 5px' }}
                            >
                                Tại đây
                            </a>
                        </div>
                    </div>

                    <div className='flex w-2/3 flex-col'>
                        {statusMark === 'Đã chấm' ? (
                            <FormView interviewDetailId={interviewDetailId} roomid={roomID} />
                        ) : (
                            <FormMark  roomid={roomID} />
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default InterviewMark