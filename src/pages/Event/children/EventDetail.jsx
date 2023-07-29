import { List, Breadcrumb } from "antd"
import React from "react"
import events from "../../../data/event"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getEventsRequest } from "../../../redux/action/eventActions"

const EventDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const handleCancelClick = () => {
        navigate("/event", { replace: true })
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getEventsRequest())
    }, [dispatch])

    const events = useSelector((state) => state.events.events)
    console.log(events)

    return (
        <div>
            <div className="flex w-full justify-between absolute right-[1px] mt-[-78px] bg-white h-16 rounded-xl items-center">
                <div className="mx-10 font-sans text-xl text">
                    Chi Tiết Sự Kiện
                </div>
                <button
                    onClick={handleCancelClick}
                    className=" text-sky-700 mx-10"
                >
                    Back
                </button>
            </div>
            <Breadcrumb
                className=" mt-2"
                items={[
                    {
                        title: (
                            <div
                                onClick={handleCancelClick}
                                className=" cursor-pointer"
                            >
                                Event
                            </div>
                        ),
                    },

                    {
                        title: "Event Detail",
                    },
                ]}
            />
            <div className="flex p-2 rounded-md ">
                {events.map((event) => {
                    if (event.id === parseInt(id)) {
                        const parsedContent = JSON.parse(event.content);
                        return (
                            <div className="shadow-2xl">
                                <div className="flex">
                                    <img
                                        alt="banner"
                                        className="w-full h-420 object-cover"
                                        src={event.image}
                                    ></img>
                                </div>
                                <div className="bg-white flex flex-col px-16 pb-7">
                                    <div className="flex font-mono font-extrabold text-5xl my-7 ">
                                        {event.name}
                                    </div>
                                    <div className="flex font-sans font-light text-xl mb-7 ">
                                        {event.article}
                                    </div>
                                    <div className="flex justify-between font-serif text-lg">
                                        <div className="flex">{event.time}</div>
                                        <div className="m-auto">
                                            {event.author}
                                        </div>
                                    </div>
                                    <div>
                                        {parsedContent.blocks.map((block) => {
                                            if (block.type === "header") {
                                                return (
                                                    <div
                                                        className="my-5 font-bold text-3xl text-black"
                                                        key={block.id}
                                                    >
                                                        {block.data.text}
                                                    </div>
                                                )
                                            } else if (
                                                block.type === "paragraph"
                                            ) {
                                                return (
                                                    <div
                                                        className="my-3 font-normal text-md text-black"
                                                        key={block.id}
                                                    >
                                                        {block.data.text}
                                                    </div>
                                                )
                                            } else if (block.type === "list") {
                                                return (
                                                    <List
                                                        key={block.id}
                                                        dataSource={
                                                            block.data.items
                                                        }
                                                        renderItem={(item) => (
                                                            <List.Item>
                                                                {item}
                                                            </List.Item>
                                                        )}
                                                    />
                                                )
                                            } else if (
                                                block.type === "simpleImage"
                                            ) {
                                                return (
                                                    <img
                                                        alt="SimpleImage"
                                                        className="rounded-2xl border-[1px] w-full border-slate-300 justify-self-center "
                                                        src={block.data.url}
                                                    ></img>
                                                )
                                            }
                                            return null
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    } else return null
                })}
            </div>
        </div>
    )
}

export default EventDetail
