import { Breadcrumb } from "antd"
import React from "react"
import { EnvironmentTwoTone } from "@ant-design/icons"
import {
    BiMaleFemale,
    BiSolidBriefcase,
    BiSolidDollarCircle,
    BiSolidGroup,
    BiSolidMedal,
    BiSolidStar,
} from "react-icons/bi"
import {  useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const RecruitDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const job = useSelector((state) =>
        state.jobs.jobs.find((job) => job.id === parseInt(id))
    )
    const handleBackClick = () => {
        navigate("/recruitment", { replace: true })
    }

    return (
        <div className="">
            <div className="flex w-full justify-between absolute right-[1px] mt-[-78px] bg-white h-16 rounded-xl items-center">
                <div className="mx-10 font-sans text-xl text">
                    Chi Tiết Tuyển Dụng
                </div>
                <button onClick={handleBackClick} className=" text-sky-700 mx-10">Back</button>
            </div>
            <Breadcrumb
                className=" mt-2"
                items={[
                    {
                        title: (
                            <div onClick={handleBackClick} className=" cursor-pointer">Recruitment</div>
                        ),
                    },

                    {
                        title: "Recruitment Detail",
                    },
                ]}
            />

            <div className="flex my-8 w-full h-40 bg-white rounded-xl  hover:-translate-y-2 hover:shadow-2xl transition-all ease-in-out duration-200">
                <div className="flex justify-center w-2/5">
                    <div className="justify-center p-8 items-center bg-contain cursor-pointer">
                        <img
                            alt="cava"
                            className="w-full h-full object-cover"
                            src={job.image}
                        ></img>
                    </div>
                </div>
                <div className="flex w-full">
                    <div className="flex flex-col w-full p-3">
                        <div className="flex text-lg font-sans cursor-pointer w-fit font-medium ">
                            {job.name}
                        </div>
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
                        <span className=" text-lime-600 text-sm font-light">
                            {job.detailLocation}
                        </span>
                    </div>
                    <div className="flex w-5/12 my-5 font-mono font-bold text-lime-700">
                        {job.salary}
                    </div>
                </div>
            </div>

            <div className="flex h-full w-full gap-4">
                <div className="flex flex-col w-4/6 items-center">
                    <div className="flex flex-col w-full rounded-xl shadow-md bg-white justify-self-center">
                        <div className="flex w-full rounded-t-xl text-3xl text-white mb-4 bg-gradient-to-r from-emerald-500 from-10% via-sky-500 via-30% to-indigo-500 to-90%">
                            <span className="p-3 font-serif ml-2 font-extrabold">
                                Thông tin chung
                            </span>
                        </div>
                        <div className="flex w-full px-20 mb-4">
                            <div className="grid grid-cols-2 gap-x-24 gap-y-4 w-full mx-10">
                                <div className="flex ">
                                    <BiSolidDollarCircle className=" text-4xl text-green-700" />
                                    <div className="flex flex-col mx-2">
                                        <span className=" font-semibold">
                                            Mức lương
                                        </span>
                                        <span>vdvsdv</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <BiSolidBriefcase className=" text-4xl text-green-700" />
                                    <div className="flex flex-col mx-2">
                                        <span className=" font-semibold">
                                            Hình thức làm việc
                                        </span>
                                        <span>vdvsdv</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <BiMaleFemale className=" text-4xl text-green-700" />
                                    <div className="flex flex-col mx-2">
                                        <span className=" font-semibold">
                                            Giới tính
                                        </span>
                                        <span>vdvsdv</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <BiSolidStar className=" text-4xl text-green-700" />
                                    <div className="flex flex-col mx-2">
                                        <span className=" font-semibold">
                                            Kinh nghiệm
                                        </span>
                                        <span>vdvsdv</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <BiSolidGroup className=" text-4xl text-green-700" />
                                    <div className="flex flex-col mx-2">
                                        <span className=" font-semibold">
                                            Số lượng
                                        </span>
                                        <span>vdvsdv</span>
                                    </div>
                                </div>

                                <div className="flex">
                                    <BiSolidMedal className=" text-4xl text-green-700" />
                                    <div className="flex flex-col mx-2">
                                        <span className=" font-semibold">
                                            Cấp bậc
                                        </span>
                                        <span>vdvsdv</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-white w-full h-full mt-10 p-16 rounded-xl shadow-sm">
                        <div className="mb-7">
                            <div className=" text-2xl font-semibold mb-4">
                                <span className=" border-[6px] border-green-500"></span>
                                <span className="mx-2 font-sans">
                                    Mô tả công việc
                                </span>
                            </div>
                            <div>
                                {job.detailJob
                                    .split("\n")
                                    .map((description) => (
                                        <div className=" text-[17px]">
                                            {" "}
                                            - {description}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="mb-7">
                            <div className=" text-2xl font-semibold mb-4">
                                <span className=" border-[6px] border-green-500"></span>
                                <span className="mx-2 font-sans">
                                    Yêu cầu ứng viên
                                </span>
                            </div>
                            <div>
                                {job.requirements
                                    .split("\n")
                                    .map((description) => (
                                        <div className=" text-[17px]">
                                            {" "}
                                            - {description}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="mb-7">
                            <div className=" text-2xl font-semibold mb-4">
                                <span className=" border-[6px] border-green-500"></span>
                                <span className="mx-2 font-sans">
                                    Quyền lợi
                                </span>
                            </div>
                            <div>
                                {job.interest.split("\n").map((description) => (
                                    <div className=" text-[17px]">
                                        {" "}
                                        - {description}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex rounded-xl  w-2/6 h-full bg-white">
                    {" "}
                    <div className="flex w-full rounded-t-xl text-2xl text-white mb-4 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
                        <span className="p-3 font-serif ml-2 font-extrabold">
                            Danh sách ứng viên
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecruitDetail
