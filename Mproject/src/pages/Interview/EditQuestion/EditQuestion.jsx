import { Input, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const EditQuestion = () => {

    const navigate = useNavigate()
    const handleCancelClick = () => {
        navigate('/questions')
    }

    // const handleChangeSkill = (value) => {
    //     console.log(`Selected: ${value}`);
    // };

    const optionSkill = [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'React', label: 'React' },
        { value: 'NodeJS', label: 'NodeJS' },
        { value: 'HTML,CSS', label: 'HTML,CSS' },
        { value: 'Java', label: 'Java' },
    ];

    // const handleChangePosition = (value) => {
    //     console.log(`Selected: ${value}`);
    // };

    const optionPosition = [
        { value: 'Backend', label: 'Backend' },
        { value: 'Frontend', label: 'Frontend' },
        { value: 'Data', label: 'Data' },
        { value: 'Machine Learning', label: 'Machine Learning' },
        { value: 'AI', label: 'AI' },
    ];

    const handleChangeCategory = (value) => {
        console.log(`Selected: ${value}`);
    };

    const optionCategory = [
        { value: 'Câu hỏi về chuyên môn', label: 'Câu hỏi về chuyên môn' },
        { value: 'Câu hỏi về Tiếng Anh', label: 'Câu hỏi về Tiếng Anh' },
        { value: 'Câu hỏi về Kỹ năng mềm', label: 'Câu hỏi về Kỹ năng mềm' },
    ];

    const questionID = useParams()
    // console.log(questionID)

    // API
    // Gọi API với input là questionID("T1") và output object có dữ liệu như file dataEditQuestion
    const dataEditQuestion = {
        key: "T1",
        nameCreator: "Nguyễn Quốc Thắng",
        position: ["Backend", "Frontend"],
        skill: ["React", "JavaScript"],
        questionContent: "HTML là gì?",
        answerContent: "HTML là một ngôn ngữ đánh dấu được thiết kế ra để tạo nên các trang web trên World Wide Web",
    };


    const [questionContent, setQuestionContent] = useState(dataEditQuestion.questionContent)
    const [answerContent, setAnswerContent] = useState(dataEditQuestion.answerContent)
    const [selectedSkills, setSelectedSkills] = useState(dataEditQuestion.skill)
    const [selectedPositions, setSelectedPositions] = useState(dataEditQuestion.position)

    const handleChangeSkill = (value) => {
        console.log(`Selected skills: ${value}`);
        setSelectedSkills(value);
    };

    const handleChangePosition = (value) => {
        console.log(`Selected positions: ${value}`);
        setSelectedPositions(value);
    };

    return (
        <div className="flex mt-7">
            <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 text-xl text">Chỉnh sửa câu hỏi</div>
                <button onClick={() => handleCancelClick()} className=" text-sky-700 mx-10" style={{ paddingLeft: 900, fontWeight: 500, fontSize: 19 }}>Back</button>
            </div>
            <div className="flex w-full bg-white flex-col" style={{ borderRadius: 10 }}>
                <div style={{ fontSize: 22, fontWeight: 500, paddingLeft: '7%', paddingTop: '3%' }}>Form chỉnh sửa câu hỏi</div>
                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '1%' }}>
                    <label>Họ và tên người thêm câu hỏi</label>
                    <label style={{ paddingLeft: 310 }}>Vị trí tuyển dụng</label>
                </div>
                <div>
                    <Input
                        style={{ width: 420, height: 38, marginLeft: '7%', backgroundColor: '#f6f6f6', marginTop: '0.5%' }}
                        placeholder="Tên của bạn..."
                        value={dataEditQuestion.nameCreator}
                        readOnly
                    />

                    <Select
                        mode="multiple"
                        size={"large"}
                        placeholder="Chọn vị trí tuyển dụng..."
                        style={{ width: 480, marginLeft: 110 }}
                        onChange={handleChangePosition}
                        options={optionPosition}
                        value={selectedPositions}
                    // defaultValue={['a10', 'c12']}
                    />
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '1%' }}>
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
                        value={selectedSkills}
                    // defaultValue={['a10', 'c12']}
                    />
                    <Input
                        size={"large"}
                        style={{ width: 480, marginLeft: 111 }}
                        value={dataEditQuestion.key.startsWith("T") ? "Câu hỏi về Chuyên môn" :
                            dataEditQuestion.key.startsWith("E") ? "Câu hỏi về Tiếng Anh" : "Câu hỏi về Kỹ năng mềm"}
                        readOnly
                    // defaultValue={['a10', 'c12']}
                    />
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '1%' }}>
                    <label>Nội dung câu hỏi</label>
                </div>
                <div style={{ marginLeft: '7%', height: 50 }}>
                    <TextArea style={{ resize: 'none', width: 1010, backgroundColor: '#f6f6f6' }}
                        value={questionContent}
                        onChange={(e) => setQuestionContent(e.target.value)}
                    />
                </div>

                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '1%' }}>
                    <label>Nội dung câu trả lời</label>
                </div>
                <div style={{ marginLeft: '7%', height: 90 }}>
                    <TextArea style={{ resize: 'none', width: 1010, backgroundColor: '#f6f6f6' }}
                        value={answerContent}
                        onChange={(e) => setAnswerContent(e.target.value)}
                    />
                </div>

                <div style={{ paddingLeft: '37%', paddingBottom: '3%' }}>
                    <button style={{ backgroundColor: '#8be8ff', padding: '5px 10px', borderRadius: 5, fontWeight: 500 }}>Lưu thay đổi</button>
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

export default EditQuestion