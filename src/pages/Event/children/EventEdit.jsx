import {  Form,  DatePicker, Input, Image } from "antd"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import RichEditor from "../../../components/RichEditor"
import { useForm } from "antd/es/form/Form"
import { useDispatch, useSelector } from "react-redux"
import { getEventsRequest, updateEventRequest } from "../../../redux/action/eventActions"
import moment from "moment/moment"

const { TextArea } = Input

const EventEdit = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form] = useForm()
    const richEditor = useRef(null)
    const dispatch = useDispatch()
    const handleCancelClick = () => {
        navigate("/event", { replace: true })
    }



    useEffect(() => {
        dispatch(getEventsRequest())
    }, [dispatch])


    const event = useSelector((state) => state.events.events.find((event) => event.id === parseInt(id)));


    const handleSave = useCallback(async () => {
        const content = await richEditor.current.save()
        const data = await form.validateFields()
        data.content = JSON.stringify(content)
        await dispatch(updateEventRequest(event.id, data));
        await dispatch(getEventsRequest())
        console.log(data)
    }, [form, event.id, dispatch])

    const [image, setImage] = useState(event.image)

    return (
        <div>
            <div className="flex w-full justify-between absolute right-[1px] mt-[-98px] bg-white h-16 rounded-xl items-center">
                <div className="mx-10 font-serif text-xl text">
                    Chỉnh sửa Sự Kiện
                </div>
                <button
                    onClick={handleCancelClick}
                    className="text-sky-700 mx-10"
                >
                    Back
                </button>
            </div>
            <div className="flex flex-col justify-center mt-7">
                <div className="flex justify-center">
                    <div className="justify-center flex flex-col w-4/5">
                        <Form form={form}>
                        <div className="flex relative justify-center">
                                <Image
                                    alt="banner "
                                    width="100%"
                                    height="450px"
                                    className="object-cover"
                                    src={image ? image : "error"}
                                    fallback="https://kmarket.ro/assets/images/no-image.svg"
                                />
                                <Form.Item
                                    name="image"
                                    className="absolute w-2/5 bottom-3"
                                >
                                    <Input
                                        placeholder="Image Adress goes here..."
                                        className="font-sans text-gray-500"
                                        onChange={(event) =>
                                            setImage(event.target.value)
                                        }
                                        defaultValue={image}
                                    />
                                </Form.Item>
                            </div>
                           

                            <div className="flex flex-col p-10 bg-white ">
                                <Form.Item name="time">
                                    <DatePicker bordered={false} defaultValue={moment(event.time)} format="YYYY-MM-DD"  />
                                </Form.Item>

                                <Form.Item name="title" className="w-full">
                                    <TextArea
                                        size="large"
                                        placeholder="Title goes here..."
                                        bordered={false}
                                        className=" text-3xl font-semibold"
                                        defaultValue={event.title}
                                        autoSize
                                    />
                                </Form.Item>
                                <Form.Item name="article" className="">
                                    <TextArea
                                        placeholder="Article goes here..."
                                        autoSize
                                        bordered={false}
                                        defaultValue={event.article}
                                    />
                                </Form.Item>

                                <Form.Item name="content">
                                    <div className="flex ">
                                        <div className="w-full p-0">
                                            <RichEditor
                                                editorCore={richEditor}
                                                value={JSON.parse(event.content)}
                                            />
                                        </div>
                                    </div>
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <div className="flex my-10 w-4/5 justify-end gap-10 mx-14">
                                    <button
                                        onClick={handleSave}
                                        className="hover:scale-110 w-28 shadow-xl relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                                    >
                                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                        <span className="relative">Update</span>
                                    </button>
                                    <button
                                        onClick={handleCancelClick}
                                        className="relative hover:scale-110 shadow-md rounded px-5 py-2.5 overflow-hidden group bg-white hover:bg-gradient-to-r  text-white hover:ring-2 hover:ring-offset-2 hover:ring-slate-400 transition-all ease-out duration-300"
                                    >
                                        <span className="relative text-black">
                                            Cancel
                                        </span>
                                    </button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventEdit
