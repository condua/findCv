import React, { useState } from "react"
import DynamicFormItem from "./DynamicFormItem"
import { Form, Input, Breadcrumb, Select, Image, Upload, Button } from "antd"
import { useNavigate } from "react-router-dom"
import { useForm } from "antd/es/form/Form"
import { UploadOutlined } from "@ant-design/icons"
import {  useSelector } from "react-redux"
import { useCallback } from "react"
import axios from "axios"

const RecruitAdd = () => {
    const navigate = useNavigate()

    const handleCancelClick = () => {
        navigate("/recruitment", { replace: true })
    }
    const [form] = useForm()

    const techOptions = [
        { label: "ReactJS", value: "ReactJS" },
        { label: "NodeJS", value: "NodeJS" },
        { label: "Spring Boot", value: "Spring Boot" },
    ]

    const positionOptions = [
        { label: "Fresher", value: "Fresher" },
        { label: "Junior", value: "Junior" },
        { label: "Senior", value: "Senior" },
    ]

    const cityOptions = [
        { label: "TP. Hồ Chí Minh", value: "TP. Hồ Chí Minh" },
        { label: "Hà Nội", value: "Hà Nội" },
        { label: "Nha Trang", value: "Nha Trang" },
    ]

    const [inputImageURL, setInputImageURL] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const accessToken = useSelector((state) => state.auth.accessToken)

    const handleSave = useCallback(async () => {
        try {
            const data = await form.validateFields()

            data.detailJob = data.detailJob.join("\n")
            data.requirements = data.requirements.join("\n")
            data.interest = data.interest.join("\n")
            data.language = data.language.join("\n")

            console.log(data)
            const formData = new FormData()
            formData.append("file", imageFile)

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
                "https://qltd01.cfapps.us10-001.hana.ondemand.com/job-posting",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )

            navigate("/recruitment", { replace: true })
        } catch (error) {
            console.error("Form validation failed:", error)
        }
    }, [accessToken, form, imageFile, navigate])

    return (
        <div className="">
            <div className="flex w-full absolute right-[1px] mt-[-85px] bg-white h-16 rounded-xl items-center justify-between">
                <div className="ml-10 font-serif text-xl text">
                    Thêm Bài Tuyển Dụng
                </div>
                <button
                    onClick={handleCancelClick}
                    className=" text-sky-700 mx-10"
                >
                    Back
                </button>
            </div>
            <Breadcrumb
                className="my-4"
                items={[
                    {
                        title: (
                            <div
                                onClick={handleCancelClick}
                                className=" cursor-pointer"
                            >
                                Recruitment
                            </div>
                        ),
                    },

                    {
                        title: "Add a Recruitment",
                    },
                ]}
            />
            <Form form={form} layout="vertical">
                <div className="bg-white px-24 py-16 flex flex-col rounded-3xl w-4/5 mx-auto">
                    <div className="text-zinc-900 text-3xl font-serif mb-11">
                        Thông tin tuyển dụng
                    </div>
                    <div className="flex flex-col mx-72 justify-between ">
                        <Image
                            alt="logo"
                            className="object-cover "
                            width={150}
                            height={150}
                            src={inputImageURL ? inputImageURL : "error"}
                            fallback="https://kmarket.ro/assets/images/no-image.svg"
                        />
                        <Upload
                            maxCount={1}
                            type="image"
                            className=" mb-10 mt-3 w-full"
                            beforeUpload={(file) => {
                                if (
                                    file.type !== "image/png" &&
                                    file.type !== "image/jpeg"
                                )
                                    return Upload.LIST_IGNORE
                                const fileReader = new FileReader()
                                fileReader.readAsDataURL(file)
                                fileReader.onload = () => {
                                    setInputImageURL(fileReader.result)
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
                    </div>
                    <Form.Item label="Name" name="name" required>
                        <Input className="w-full" size="large" />
                    </Form.Item>
                    <div className="flex w-full justify-start gap-14">
                        <Form.Item
                            label="Tech"
                            name="language"
                            className="w-3/5 items-center"
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Please select"
                                options={techOptions}
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Position"
                            name="position"
                            className="w-2/5"
                        >
                            <Select
                                placeholder="Please select"
                                options={positionOptions}
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    <div className="flex w-full justify-start gap-14">
                        <Form.Item
                            label="Experience"
                            className="w-1/3"
                            name="experience"
                        >
                            <Input className="w-full" size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Salary"
                            name="salary"
                            className="w-1/3"
                        >
                            <Input className="w-full" size="large" />
                        </Form.Item>
                        <Form.Item
                            label="Enrollment"
                            className="w-1/3"
                            name="workingForm"
                        >
                            <Input className="w-full" size="large" />
                        </Form.Item>
                    </div>

                    <div className="flex w-full justify-start gap-14">
                        <Form.Item
                            label="City"
                            name="location"
                            className=" w-1/5"
                        >
                            <Select
                                placeholder="Please select"
                                options={cityOptions}
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Location"
                            className="w-4/5"
                            name="detailLocation"
                        >
                            <Input className="w-full" size="large" />
                        </Form.Item>
                    </div>

                    <div className="flex w-full justify-start gap-14">
                        <Form.Item
                            label="Quantity"
                            className=" w-2/6"
                            name="number"
                        >
                            <Input className="w-full" size="large" />
                        </Form.Item>
                        <Form.Item label="Sex" className=" w-2/6" name="sex">
                            <Select
                                placeholder="Please select"
                                options={[
                                    { label: "Male", value: "Male" },
                                    { label: "Female", value: "Female" },
                                    {
                                        label: "Not required",
                                        value: "Not required",
                                    },
                                ]}
                                size="large"
                            />
                        </Form.Item>
                    </div>

                    <DynamicFormItem name="detailJob" label="Job Details" />
                    <DynamicFormItem name="requirements" label="Requirements" />
                    <DynamicFormItem name="interest" label="Interests" />
                </div>
                <Form.Item className="">
                    <div className="flex my-10 w-full justify-center gap-10 ml-56">
                        <button
                            onClick={handleSave}
                            className="hover:scale-110 w-28 shadow-xl relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
                        >
                            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                            <span className="relative">Add</span>
                        </button>
                        <button
                            onClick={handleCancelClick}
                            className="relative hover:scale-110 shadow-md rounded px-5 py-2.5 overflow-hidden group bg-white hover:bg-gradient-to-r  text-white hover:ring-2 hover:ring-offset-2 hover:ring-slate-400 transition-all ease-out duration-300"
                        >
                            <span className="relative text-black">Cancel</span>
                        </button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RecruitAdd
