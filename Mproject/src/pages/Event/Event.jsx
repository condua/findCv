import React from "react"
import { connect } from "react-redux"
import { mapDispatchToProps, mapStateToProps } from "../../components/rdSidebar"
import { Link } from "react-router-dom"
import {
    EditOutlined,
    StopOutlined,
    EnterOutlined,
    UserOutlined,
} from "@ant-design/icons"
import events from "./../../data/event"
import DataCard from "../../components/DataCard"

const Event = ({ collapsed }) => {
    return (
        <div className="">
            <div className="flex w-full absolute right-[1px] mt-[-70px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 font-serif text-xl text">Sự Kiện</div>
            </div>
            <div className={`flex flex-col h-full w-full`}>
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
                            <span className="px-5 py-2.5 text-slate-950 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0 group-hover:text-white">
                                + Add Event
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-y-8 gap-x-12">
                    {events.map((event) => (
                        <div className="transition-all ease-out hover:scale-105 w-full flex flex-col bg-white shadow-xl rounded-md">
                            <Link className="mb-2" to={`${event.id}`}>
                                <div className="justify-center cursor-pointer">
                                    <img
                                        alt="banner"
                                        className="w-full h-[200px] object-cover rounded-t-md"
                                        src={event.image}
                                    ></img>
                                </div>
                            </Link>
                            <div className="h-full flex flex-col justify-between">
                                <div className="flex flex-col mx-4">
                                    <div className="font-medium text-slate-400 flex justify-between pt-4">
                                        <div>{event.time}</div>
                                        <div className="flex gap-1 items-center justify-center">
                                            <UserOutlined />
                                            <div>{event.author}</div>
                                        </div>
                                    </div>
                                    <div className=" pt-2 font-mono font-semibold text-2xl">
                                        {event.name}
                                    </div>
                                    <div className=" pt-2 font-sans text-md">
                                        {event.article}
                                    </div>
                                </div>

                                <div className="flex justify-self-end text-black font-semibold m-3 justify-around divide-slate-400 divide-black/50 ">
                                    <Link
                                        to={`edit/${event.id}`}
                                        className="flex flex-1 items-center justify-center mt-3 cursor-pointer"
                                    >
                                        <EditOutlined className=" text-xl" />
                                    </Link>
                                    <EnterOutlined className="flex flex-1 items-center justify-center mt-5 cursor-pointer text-xl" />
                                    <StopOutlined className="flex flex-1 items-center justify-center mt-5 cursor-pointer text-xl" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)
