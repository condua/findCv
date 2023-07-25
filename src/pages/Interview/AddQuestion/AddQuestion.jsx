import { Input, Select } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useNavigate } from "react-router-dom"


const AddQuestion = () => {

    const navigate = useNavigate()
    const handleCancelClick = () => {
        navigate('/questions')
    }

    const handleChangeSkill = (value) => {
        console.log(`Selected: ${value}`);
    };

    const optionSkill = [
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'React', label: 'React' },
        { value: 'NodeJS', label: 'NodeJS' },
        { value: 'HTML,CSS', label: 'HTML,CSS' },
        { value: 'Java', label: 'Java' },
    ];

    const handleChangePosition = (value) => {
        console.log(`Selected: ${value}`);
    };

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



    return (
        <div className="flex mt-7">
            <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 text-xl text">Thêm câu hỏi</div>
                <button onClick={() => handleCancelClick()} className=" text-sky-700 mx-10" style={{ paddingLeft: 900, fontWeight: 500, fontSize: 19 }}>Back</button>
            </div>
            <div className="flex w-full bg-white flex-col" style={{ borderRadius: 10 }}>
                <div style={{ fontSize: 22, fontWeight: 500, paddingLeft: '7%', paddingTop: '3%' }}>Form gửi câu hỏi</div>
                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '1%' }}>
                    <label>Họ và tên người thêm câu hỏi</label>
                    <label style={{ paddingLeft: 310 }}>Vị trí tuyển dụng</label>
                </div>
                <div>
                    <Input
                        style={{ width: 420, height: 38, marginLeft: '7%', backgroundColor: '#f6f6f6', marginTop: '0.5%' }}
                        placeholder="Tên của bạn..."
                    />
                    <Select
                        mode="multiple"
                        size={"large"}
                        placeholder="Chọn vị trí tuyển dụng..."
                        style={{ width: 480, marginLeft: 110 }}
                        onChange={handleChangePosition}
                        options={optionPosition}
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
                    // defaultValue={['a10', 'c12']}
                    />
                    <Select
                        mode="single"
                        size={"large"}
                        placeholder="Chọn loại câu hỏi..."
                        style={{ width: 480, marginLeft: 111 }}
                        onChange={handleChangeCategory}
                        options={optionCategory}
                    // defaultValue={['a10', 'c12']}
                    />
                </div>
                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '1%' }}>
                    <label>Nội dung câu hỏi</label>
                </div>
                <div style={{ marginLeft: '7%', height: 50 }}>
                    <TextArea style={{ resize: 'none', width: 1010, backgroundColor: '#f6f6f6' }} />
                </div>

                <div style={{ fontSize: 17, fontWeight: 400, paddingLeft: '7%', paddingTop: '1%' }}>
                    <label>Nội dung câu trả lời</label>
                </div>
                <div style={{ marginLeft: '7%', height: 90 }}>
                    <TextArea style={{ resize: 'none', width: 1010, backgroundColor: '#f6f6f6' }} />
                </div>

                <div style={{ paddingLeft: '37%', paddingBottom: '3%' }}>
                    <button style={{ backgroundColor: '#8be8ff', padding: '5px 10px', borderRadius: 5, fontWeight: 500 }}>Thêm câu hỏi</button>
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