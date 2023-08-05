import React from "react"
import { Link } from "react-router-dom"
import DataCard from "../../components/DataCard"

import {
    EnvironmentTwoTone,
    EditOutlined,
    EnterOutlined,
    StopOutlined,
} from "@ant-design/icons"

const Result = () => {
    return (
        <div>
            {" "}
            <div className="flex w-full absolute right-[1px] mt-[-70px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 font-serif text-xl text">Recruitment</div>
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
                </div>
                <div className="grid grid-cols-2 gap-y-8 gap-x-4 ">
                    <Link to={`/manage-candidate/ReactJS`}>
                        <div className="flex w-full h-36 bg-white rounded-xl shadow-xl hover:scale-105 transition-all ease-in-out duration-200">
                            <div className="flex justify-center w-2/5">
                                <div className="justify-center p-8 items-center bg-center bg-contain cursor-pointer">
                                    <img
                                        alt="cava"
                                        className="w-full h-full object-cover"
                                        src="https://logowik.com/content/uploads/images/react7473.logowik.com.webp"
                                    ></img>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <div className="flex flex-col w-full p-3">
                                    <div className="flex text-lg font-sans cursor-pointer w-fit font-medium ">
                                        Nhân viên kinh doanh
                                    </div>
                                    <div className="flex text-sm my-1 ">
                                        Position: Intern
                                    </div>
                                    <div className="flex  text-sm">
                                        Language: ReactJS
                                    </div>
                                    <div className="flex my-3 text-sm text-lime-600 font-mono font-medium">
                                        <EnvironmentTwoTone
                                            twoToneColor="#52c41a"
                                            className="mx-1"
                                        />{" "}
                                        Hồ Chí Minh
                                    </div>
                                </div>
                                <div className="flex w-5/12 my-5 font-mono font-bold text-lime-700">
                                    3tr-5tr
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={`/manage-candidate/VueJS`}>
                        <div className="flex w-full h-36 bg-white rounded-xl shadow-xl hover:scale-105 transition-all ease-in-out duration-200">
                            <div className="flex justify-center w-2/5">
                                <div className="justify-center p-8 items-center bg-center bg-contain cursor-pointer">
                                    <img
                                        alt="cava"
                                        className="w-full h-full object-cover"
                                        src="https://logowik.com/content/uploads/images/react7473.logowik.com.webp"
                                    ></img>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <div className="flex flex-col w-full p-3">
                                    <div className="flex text-lg font-sans cursor-pointer w-fit font-medium ">
                                        Nhân viên kinh doanh
                                    </div>
                                    <div className="flex text-sm my-1 ">
                                        Position: Intern
                                    </div>
                                    <div className="flex  text-sm">
                                        Language: VueJS
                                    </div>
                                    <div className="flex my-3 text-sm text-lime-600 font-mono font-medium">
                                        <EnvironmentTwoTone
                                            twoToneColor="#52c41a"
                                            className="mx-1"
                                        />{" "}
                                        Hồ Chí Minh
                                    </div>
                                </div>
                                <div className="flex w-5/12 my-5 font-mono font-bold text-lime-700">
                                    3tr-5tr
                                </div>
                            </div>
                        </div>
                    </Link>


                    <Link to={`/manage-candidate/Java`}>
                        <div className="flex w-full h-36 bg-white rounded-xl shadow-xl hover:scale-105 transition-all ease-in-out duration-200">
                            <div className="flex justify-center w-2/5">
                                <div className="justify-center p-8 items-center bg-center bg-contain cursor-pointer">
                                    <img
                                        alt="cava"
                                        className="w-full h-full object-cover"
                                        src="https://logowik.com/content/uploads/images/react7473.logowik.com.webp"
                                    ></img>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <div className="flex flex-col w-full p-3">
                                    <div className="flex text-lg font-sans cursor-pointer w-fit font-medium ">
                                        Nhân viên kinh doanh
                                    </div>
                                    <div className="flex text-sm my-1 ">
                                        Position: Intern
                                    </div>
                                    <div className="flex  text-sm">
                                        Language: Java
                                    </div>
                                    <div className="flex my-3 text-sm text-lime-600 font-mono font-medium">
                                        <EnvironmentTwoTone
                                            twoToneColor="#52c41a"
                                            className="mx-1"
                                        />{" "}
                                        Hồ Chí Minh
                                    </div>
                                </div>
                                <div className="flex w-5/12 my-5 font-mono font-bold text-lime-700">
                                    3tr-5tr
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Result
