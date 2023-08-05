import { UploadOutlined, LoadingOutlined } from "@ant-design/icons"
import { Form, DatePicker, Input, Image, Upload, Button, Result, message } from "antd"
import React, { useCallback, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import RichEditor from "../../../components/RichEditor"
import { useForm } from "antd/es/form/Form"
import { useSelector } from "react-redux"

import axios from "axios"

const { TextArea } = Input

const EventAdd = () => {
    const navigate = useNavigate()
    const richEditor = useRef(null)
    const [form] = useForm()

    const handleCancelClick = () => {
        if (confirmLoading) {
            return
        }
        navigate("/event", { replace: true })
    }

    const [confirmLoading, setConfirmLoading] = useState(false)
    const [inputImageURL, setInputImageURL] = useState("")
    const [imageFile, setImageFile] = useState(null)
    
    const accessToken = useSelector((state) => state.auth.accessToken)

    const [showResult, setShowResult] = useState(false)

    const handleSave = useCallback(async () => {
        try {
            setConfirmLoading(true)
            if (!imageFile) {
                message.error("You must add a banner image first");
                setConfirmLoading(false);
                return;
            }
            const content = await richEditor.current.save()
            const data = await form.validateFields()
            data.content = JSON.stringify(content)

            const formData = new FormData()
            formData.append("file", imageFile)
            console.log(data.content)

            const imageResponse = await axios.post(
                "https://qltd01.cfapps.us10-001.hana.ondemand.com/file/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            data.image = imageResponse.data.data

            await axios.post(
                "https://qltd01.cfapps.us10-001.hana.ondemand.com/event",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )

            setShowResult(true)

            setTimeout(() => {
                setShowResult(false)
                navigate("/event", { replace: true })
            }, 1500)
        } catch (error) {
            setConfirmLoading(false)
            console.error("Error while saving:", error)
        }
    }, [form, imageFile, accessToken, navigate])


    return (
        <div>
            <div className="flex w-full justify-between absolute right-[1px] mt-[-98px] bg-white h-16 rounded-xl items-center">
                <div className="mx-10 font-serif text-xl text">
                    Thêm Sự Kiện
                </div>
                <button
                    onClick={handleCancelClick}
                    className=" text-sky-700 mx-10"
                >
                    Back
                </button>
            </div>
            <div className="flex flex-col justify-center mt-7">
                <div className="flex justify-center">
                    <div className="justify-center flex flex-col w-4/5">
                        {showResult ? (
                            <Result
                                className=" pb-40"
                                status="success"
                                title="Event is Successfully Added"
                                subTitle="You can check out the newly created event in the Event page"
                            />
                        ) : (
                            <Form form={form}>
                                <div className="flex relative justify-center">
                                    <Image
                                        alt="banner "
                                        width="100%"
                                        height="450px"
                                        className="object-cover"
                                        src={
                                            inputImageURL
                                                ? inputImageURL
                                                : "error"
                                        }
                                        fallback="https://kmarket.ro/assets/images/no-image.svg"
                                    />
                                </div>

                                <div className="flex flex-col p-10 bg-white ">
                                
                                        <Upload
                                            maxCount={1}
                                            type="image"
                                            className=" mb-10 w-1/4"
                                            beforeUpload={(file) => {
                                                if (
                                                    file.type !== "image/png" &&
                                                    file.type !== "image/jpeg"
                                                )
                                                    return Upload.LIST_IGNORE
                                                const fileReader =
                                                    new FileReader()
                                                fileReader.readAsDataURL(file)
                                                fileReader.onload = () => {
                                                    setInputImageURL(
                                                        fileReader.result
                                                    )
                                                }
                                                setImageFile(file)
                                                return false
                                            }}
                                            onRemove={() => {
                                                setInputImageURL("error")
                                            }}
                                        >
                                            <Button icon={<UploadOutlined />}>
                                                Click to Upload
                                            </Button>
                                        </Upload>
                                    <Form.Item name="time" rules={[
                                            {
                                                required: true,
                                                message:
                                                    "You must pick a date to hold the event first",
                                            },
                                        ]}>
                                        <DatePicker bordered={false} />
                                    </Form.Item>

                                    <Form.Item name="title" className=" w-3/5" rules={[
                                            {
                                                required: true,
                                                message:
                                                    "You must choose a title for the event first",
                                            },
                                        ]}>
                                        <TextArea
                                            placeholder="Title goes here..."
                                            bordered={false}
                                            className=" text-3xl font-semibold"
                                            autoSize
                                        />
                                    </Form.Item>
                                    <Form.Item name="article" rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please write an article for the event",
                                            },
                                        ]}>
                                        <TextArea
                                            placeholder="Article goes here..."
                                            autoSize
                                            bordered={false}
                                        />
                                    </Form.Item>

                                    <Form.Item name="content" >
                                        <div className="flex ">
                                            <div className=" w-full p-0">
                                                <RichEditor
                                                    editorCore={richEditor}
                                                />
                                            </div>
                                        </div>
                                    </Form.Item>
                                </div>
                                <Form.Item>
                                    <div className="flex my-10 w-4/5 justify-end gap-10 mx-14">
                                        <button
                                            onClick={handleSave}
                                            className={`hover:scale-110 w-28 shadow-xl relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 ${
                                                confirmLoading
                                                    ? "opacity-80 cursor-not-allowed"
                                                    : ""
                                            }`}
                                            disabled={confirmLoading}
                                        >
                                            {confirmLoading ? (
                                                <>
                                                    <LoadingOutlined className="text-xl font-semibold" />
                                                </>
                                            ) : (
                                                <>
                                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                                    <span className="relative">
                                                        Add
                                                    </span>
                                                </>
                                            )}
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventAdd
