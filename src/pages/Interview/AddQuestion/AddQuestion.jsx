import { Button, Input, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { createQuestionRequest, getQuestionRequest } from "../../../redux/action/questionActions"
import axios from "axios"


const AddQuestion = () => {

    const navigate = useNavigate()
    const handleCancelClick = () => {
        navigate("/questions", { replace: true })

    }

    const optionSkill = [
        { value: 1, label: 'Node.js' },
        { value: 2, label: 'ASP.NET' },
        { value: 3, label: 'PHP' },
        { value: 4, label: 'Java' },
        { value: 5, label: 'Swift' },
        { value: 6, label: 'SQL/NoSQL' },
        { value: 7, label: 'HTML/CSS' },
        { value: 8, label: 'JavaScript' },
        { value: 9, label: 'Docker' },
        { value: 10, label: 'Kubernetes' },
        { value: 11, label: 'Git' },
        { value: 12, label: 'Adobe Photoshop' },
        { value: 13, label: 'Sketch' },
        { value: 14, label: 'Figma' },
        { value: 15, label: 'Selenium' },
        { value: 16, label: 'Cypress' },
    ]

    const optionPosition = [
        { value: 1, label: 'Back-end' },
        { value: 2, label: 'Front-end' },
        { value: 3, label: 'Full-stack' },
        { value: 4, label: 'DevOps' },
        { value: 5, label: 'Mobile App' },
        { value: 6, label: 'UI/UX Designer' },
        { value: 7, label: 'QA/Tester' },
    ];

    const optionCategory = [
        { value: 'TechSkill', label: 'Câu hỏi về Chuyên môn' },
        { value: 'Language', label: 'Câu hỏi về Tiếng Anh' },
        { value: 'SoftSkill', label: 'Câu hỏi về Kỹ năng mềm' },
    ];


    const [formData, setFormData] = useState({
        fullName: '',
        fieldEnum: '',
        question: '',
        answer: '',
        sid: [],
        pid: [],
    });

    // console.log("formData", formData)

    const handleChangeForm = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    // console.log("Form data", formData)

    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);


    // const handleSaveButton = async () => {
    //     console.log("formData", formData);
    //     try {
    //         await axios.post(
    //             "https://qltd01.cfapps.us10-001.hana.ondemand.com/question", formData,
    //             { headers: { Authorization: `Bearer ${accessToken}` } }
    //         );
    //         await axios.get("https://qltd01.cfapps.us10-001.hana.ondemand.com/question",
    //             { headers: { Authorization: `Bearer ${accessToken}` } }
    //         )
    //         navigate("/questions");
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };


    const handleSaveButton = async () => {
        await dispatch(createQuestionRequest(formData));
        await dispatch(getQuestionRequest(accessToken));
        navigate("/questions");
    };

    return (
        <div className="flex mt-7">
            <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 text-xl text">Thêm câu hỏi</div>
                <button onClick={() => handleCancelClick()} className=" text-sky-700 mx-10" style={{ paddingLeft: 900, fontWeight: 500, fontSize: 19 }}>Back</button>
            </div>
            <div className="flex w-full bg-white flex-col" style={{ borderRadius: 10 }}>
                <div style={{ fontSize: 22, fontWeight: 500, paddingLeft: '7%', paddingTop: '1.5%' }}>Form gửi câu hỏi</div>
                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '0%' }}>
                    <label>Họ và tên người thêm câu hỏi</label>
                    <label style={{ paddingLeft: 310 }}>Vị trí tuyển dụng</label>
                </div>
                <div>
                    <Input
                        onChange={(e) => handleChangeForm('fullName', e.target.value)}
                        style={{ width: 420, height: 38, marginLeft: '7%', backgroundColor: '#f6f6f6', marginTop: '0%' }}
                        placeholder="Tên của bạn..."
                    />
                    <Select
                        mode="multiple"
                        size={"large"}
                        placeholder="Chọn vị trí tuyển dụng..."
                        style={{ width: 480, marginLeft: 110 }}
                        // onChange={handleChangePosition}
                        onChange={(value) => handleChangeForm('pid', value)}

                        options={optionPosition}
                    />
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '0.5%' }}>
                    <label>Kỹ năng</label>
                    <label style={{ paddingLeft: 472 }}>Loại câu hỏi</label>
                </div>
                <div>
                    <Select
                        mode="multiple"
                        size={"large"}
                        placeholder="Chọn những vị trí để hỏi..."
                        style={{ width: 420, marginLeft: '7%' }}
                        onChange={(value) => handleChangeForm('sid', value)}
                        options={optionSkill}
                    />
                    <Select
                        mode="single"
                        size={"large"}
                        placeholder="Chọn loại câu hỏi..."
                        style={{ width: 480, marginLeft: 111 }}
                        onChange={(value) => handleChangeForm('fieldEnum', value)}
                        options={optionCategory}
                    />
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '0.5%' }}>
                    <label>Nội dung câu hỏi</label>
                </div>
                <div style={{ marginLeft: '7%', height: 50 }}>
                    <TextArea
                        onChange={(e) => handleChangeForm('question', e.target.value)}
                        style={{ resize: 'none', width: 1010, backgroundColor: '#f6f6f6' }}
                    />
                </div>

                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '0.5%' }}>
                    <label>Nội dung câu trả lời</label>
                </div>
                <div style={{ marginLeft: '7%', height: 70 }}>
                    <TextArea
                        onChange={(e) => handleChangeForm('answer', e.target.value)}
                        style={{ resize: 'none', width: 1010, backgroundColor: '#f6f6f6' }}
                    />
                </div>

                <div style={{ paddingLeft: '37%', paddingBottom: '2%' }}>
                    <Button
                        style={{ backgroundColor: '#8be8ff', padding: '5px 10px', borderRadius: 5, fontWeight: 500 }}
                        onClick={handleSaveButton}
                    >
                        Thêm câu hỏi
                    </Button>
                    <button
                        style={{ marginLeft: 50, backgroundColor: 'rgb(216 211 211)', padding: '5px 10px', borderRadius: 5, fontWeight: 500 }}
                        onClick={handleCancelClick}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddQuestion