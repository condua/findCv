import { Input, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getQuestionByIDRequest } from "../../../redux/action/questionActions"
import axios from "axios"
import { async } from "q"

const EditQuestion = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleCancelButton = async () => {
        navigate("/questions", { replace: true })
    }

    const handleSaveButton = async () => {
        console.log("Data Form Question", formQuestion)

        try {
            await axios.put(
                "https://qltd01.cfapps.us10-001.hana.ondemand.com/question", formQuestion,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            await axios.get("https://qltd01.cfapps.us10-001.hana.ondemand.com/question",
                { headers: { Authorization: `Bearer ${accessToken}` } }
            )
            navigate("/questions");
        } catch (error) {
            console.error("Error:", error);
        }


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

    const { question_id: questionID } = useParams()
    // console.log(questionID)

    // API
    // Gọi API với input là questionID("T1") và output object có dữ liệu như file dataEditQuestion
    const accessToken = useSelector((state) => state.auth.accessToken)

    // const [questionContent, setQuestionContent] = useState(null)
    // const [answerContent, setAnswerContent] = useState(null)
    // const [selectedSkills, setSelectedSkills] = useState([])
    // const [selectedPositions, setSelectedPositions] = useState([])
    // const [creatorName, setCreatorName] = useState(null)
    // const [fieldEnum, setFieldEnum] = useState(null)

    const [formQuestion, setFormQuestion] = useState({
        question: null,
        answer: null,
        skillIds: [],
        positionIds: [],
        creatorName: null,
        fieldEnum: null
    })

    const handleChangeForm = (name, value) => {
        setFormQuestion({
            ...formQuestion,
            [name]: value
        });
    };

    useEffect(() => {
        const fetchDataQuestionByID = async () => {
            try {
                const response = await axios.get(
                    `https://qltd01.cfapps.us10-001.hana.ondemand.com/question/${questionID}`,
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );
                // console.error('Data', response.data.data);
                setFormQuestion(response.data.data)
                // setQuestionContent(response.data.data.question || {});
                // setAnswerContent(response.data.data.answer || {});
                // setSelectedSkills(response.data.data.skillIds || {});
                // setSelectedPositions(response.data.data.positionIds || {});
                // setCreatorName(response.data.data.creatorName || {});
                // setFieldEnum(response.data.data.fieldEnum || {});

            } catch (error) {
                console.error('Error fetching interview details:', error);
            }
        };

        fetchDataQuestionByID();
    }, [questionID, accessToken]);



    const handleChangeSkill = (value) => {
        console.log(`Selected skills: ${value}`);
        handleChangeForm("skillIds", value);

    };

    const handleChangePosition = (value) => {
        console.log(`Selected positions: ${value}`);
        handleChangeForm("positionIds", value);
    };

    return (
        <div className="flex mt-7">
            <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 text-xl text">Chỉnh sửa câu hỏi</div>
                <button onClick={() => handleCancelButton()} className=" text-sky-700 mx-10" style={{ paddingLeft: 900, fontWeight: 500, fontSize: 19 }}>Back</button>
            </div>
            <div className="flex w-full bg-white flex-col" style={{ borderRadius: 10 }}>
                <div style={{ fontSize: 22, fontWeight: 500, paddingLeft: '7%', paddingTop: '1.5%' }}>Form chỉnh sửa câu hỏi</div>
                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '0%' }}>
                    <label>Họ và tên người thêm câu hỏi</label>
                    <label style={{ paddingLeft: 310 }}>Vị trí tuyển dụng</label>
                </div>
                <div>
                    <Input
                        style={{ width: 420, height: 38, marginLeft: '7%', backgroundColor: '#f6f6f6', marginTop: '0%' }}
                        placeholder="Tên của bạn..."
                        value={formQuestion.creatorName}
                        readOnly
                    />

                    <Select
                        mode="multiple"
                        size={"large"}
                        placeholder="Chọn vị trí tuyển dụng..."
                        style={{ width: 480, marginLeft: 110 }}
                        onChange={handleChangePosition}
                        options={optionPosition}
                        value={formQuestion.positionIds}
                    // defaultValue={['a10', 'c12']}
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
                        onChange={handleChangeSkill}
                        options={optionSkill}
                        value={formQuestion.skillIds}
                    // defaultValue={['a10', 'c12']}
                    />
                    <Input
                        size={"large"}
                        style={{ width: 480, marginLeft: 111 }}
                        value={formQuestion.fieldEnum == "TechSkill" ? "Câu hỏi về Chuyên môn" :
                            formQuestion.fieldEnum == "Language" ? "Câu hỏi về Tiếng Anh" :
                                formQuestion.fieldEnum == "SoftSkill" ? "Câu hỏi về Kỹ năng mềm" : null}
                        readOnly
                    />
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '0.5%' }}>
                    <label>Nội dung câu hỏi</label>
                </div>
                <div style={{ marginLeft: '7%', height: 50 }}>
                    <TextArea style={{ resize: 'none', width: 1010, backgroundColor: '#f6f6f6' }}
                        value={formQuestion.question}
                        onChange={(e) => handleChangeForm("question", e.target.value)}
                    />
                </div>

                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '0.5%' }}>
                    <label>Nội dung câu trả lời</label>
                </div>
                <div style={{ marginLeft: '7%', height: 70 }}>
                    <TextArea style={{ resize: 'none', width: 1010, backgroundColor: '#f6f6f6' }}
                        value={formQuestion.answer}
                        onChange={(e) => handleChangeForm("answer", e.target.value)}
                    />
                </div>

                <div style={{ paddingLeft: '37%', paddingBottom: '2%' }}>
                    <button onClick={handleSaveButton} style={{ backgroundColor: '#8be8ff', padding: '5px 10px', borderRadius: 5, fontWeight: 500 }}>Lưu thay đổi</button>
                    <button
                        style={{ marginLeft: 50, backgroundColor: 'rgb(216 211 211)', padding: '5px 10px', borderRadius: 5, fontWeight: 500 }}
                        onClick={handleCancelButton}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditQuestion