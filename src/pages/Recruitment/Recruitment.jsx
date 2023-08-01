import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import DataCard from "../../components/DataCard"

import {
    EnvironmentTwoTone,
    EditOutlined,
    VideoCameraOutlined,
    StopOutlined,
} from "@ant-design/icons"
import { deleteJobRequest, getJobsRequest } from "../../redux/action/jobActions"
import { useDispatch, useSelector } from "react-redux"

const Recruitment = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getJobsRequest())
    }, [dispatch])

    const jobs = useSelector((state) => state.jobs.jobs)
    console.log(jobs)

    const handleDeleteJob = (jobId) => {
        console.log(jobId)
        dispatch(deleteJobRequest(jobId))
        dispatch(getJobsRequest())
    }

    return (
        <div>
            {" "}
            <div className="flex w-full absolute right-[1px] mt-[-70px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 font-serif text-xl text">Tuyển dụng</div>
            </div>
            <div className="flex flex-col h-full w-full">
                <DataCard />
                <div className="flex justify-between my-8">
                    <div className="flex max-w-lg w-96 items-center justify-center">
                        <div className=" flex w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>

                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="Search something.."
                            />
                        </div>
                    </div>
                    <Link to="add">
                        <button className=" transition-all duration-200 hover:scale-110 inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 ">
                            <div className="flex px-5 py-2.5 text-slate-950 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0 group-hover:text-green-500 ">
                                + Add Recruitment
                            </div>
                        </button>
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-y-8 gap-x-4 ">
                    {jobs.map((job) =>
                        job.status ? (
                            <div className="flex w-full bg-white rounded-xl  hover:-translate-y-2 hover:shadow-2xl transition-all ease-in-out duration-200">
                                <div className="flex justify-center w-2/5">
                                    <Link to={`${job.id}`}>
                                        <div className="justify-center p-8 items-center bg-contain cursor-pointer">
                                            <img
                                                alt="cava"
                                                className="w-full h-full object-cover"
                                                src={job.image}
                                            ></img>
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex w-full">
                                    <div className="flex flex-col w-full p-3">
                                        <Link to={`${job.id}`}>
                                            <div className="flex text-lg font-sans cursor-pointer w-fit font-medium ">
                                                {job.name}
                                            </div>
                                        </Link>
                                        <div className="flex text-sm my-1 ">
                                            Position: {job.position}
                                        </div>
                                        <div className="flex overflow-auto  text-sm">
                                            {job.language}
                                        </div>
                                        <div className="flex mt-2 text-sm text-lime-600 font-mono font-medium">
                                            <EnvironmentTwoTone
                                                twoToneColor="#52c41a"
                                                className="mx-1"
                                            />{" "}
                                            {job.location}
                                        </div>
                                    </div>
                                    <div className="flex w-5/12 my-5 font-mono font-bold text-lime-700">
                                        {job.salary}
                                    </div>
                                </div>
                                <div className="flex flex-col w-2/12 ">
                                    <Link
                                        to={`edit/${job.id}`}
                                        className="flex justify-center text-xl h-1/3 transition-all duration-300 hover:scale-125"
                                    >
                                        <EditOutlined />
                                    </Link>
                                    <div className="flex justify-center text-xl h-1/3">
                                        <VideoCameraOutlined />
                                    </div>
                                    <div className="flex justify-center text-xl h-1/3 transition-all duration-300 hover:scale-125 hover:text-red-600 ">
                                        <StopOutlined
                                            onClick={() =>
                                                handleDeleteJob(job.id)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    )
}

export default Recruitment
