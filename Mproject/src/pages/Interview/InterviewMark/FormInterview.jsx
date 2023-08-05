import { DatePicker, Input } from "antd"
// import SettingQuestion from "./SettingQuestion";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
// import listQuestionTechnical from "../../../data/ListQuestion/listQuestionTechnical.json"
// import listQuestionEnglish from "../../../data/ListQuestion/listQuestionEnglish.json"
// import listQuestionSoftskill from "../../../data/ListQuestion/listQuestionSortskill.json"
import QuestionTechnical from "../../../data/ListQuestion/QuestionTechnical.json"
import QuestionEnglish from "../../../data/ListQuestion/QuestionEnglish.json"
import QuestionSoftskill from "../../../data/ListQuestion/QuestionSoftskill.json"
import { useState } from "react";
import DynamicFormQuestion from "../../Interview/InterviewMark/DynamicFormQuestion"
import { color } from "framer-motion";


const FormInterview = ({ id }) => {

    const dateFormat = 'YYYY-MM-DD HH:mm';

    const navigate = useNavigate();

    const handleButtonDiscard = (interviewID) => {
        localStorage.removeItem(`data1${id}`)
        localStorage.removeItem(`data2${id}`)
        localStorage.removeItem(`data3${id}`)
        navigate(`/interview/detail/${interviewID}`)
    }

    const handleSaveChanges = (interviewID) => {

        localStorage.removeItem(`data1${id}`)
        localStorage.removeItem(`data2${id}`)
        localStorage.removeItem(`data3${id}`)
        navigate(`/interview/detail/${interviewID}`)
    }

    const getDataFromLocalStorage = (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    };

    // const dataStorageLast = localStorage.getItem(`dataScore${id}`)  //Lấy dữ liệu dưới LocalStorage
    // const scores = dataStorageLast ? JSON.parse(dataStorageLast) : [];
    // console.log(scores)

    //Tính điểm trung bình
    const [averageScore, setAverageScore] = useState(null)

    const handleTinhDiem = () => {

        // Tính điểm của các câu hỏi về Technical
        const keyData1 = `data1${id}`
        const dataScores1 = getDataFromLocalStorage(keyData1);
        const length1 = dataScores1.length;
        console.log("data1", dataScores1)
        const pointQuestion1 = (5 / length1) / 10
        // console.log("Điểm 1 câu Tech: ", pointQuestion1)
        // Sử dụng map() để nhân từng phần tử trong mảng với biến a
        const multipliedScores1 = dataScores1.map(score => score * pointQuestion1);
        // Sử dụng reduce() để tính tổng điểm
        const totalScore1 = multipliedScores1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        // console.log("Tổng điểm:", totalScore1);

        // Tính điểm của các câu hỏi về English
        const keyData2 = `data2${id}`
        const dataScores2 = getDataFromLocalStorage(keyData2);
        const length2 = dataScores2.length;
        console.log("data2", dataScores2)
        const pointQuestion2 = (3 / length2) / 10
        // console.log("Điểm 1 câu Eng: ", pointQuestion2)
        const multipliedScores2 = dataScores2.map(score => score * pointQuestion2);
        const totalScore2 = multipliedScores2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        // console.log("Tổng điểm:", totalScore2);

        // Tính điểm của các câu hỏi về Softskill
        const keyData3 = `data3${id}`
        const dataScores3 = getDataFromLocalStorage(keyData3);
        const length3 = dataScores3.length;
        console.log("data3", dataScores3)
        const pointQuestion3 = (2 / length3) / 10
        // console.log("Điểm 1 câu Soft: ", pointQuestion3)
        const multipliedScores3 = dataScores3.map(score => score * pointQuestion3);
        const totalScore3 = multipliedScores3.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        // console.log("Tổng điểm:", totalScore3);


        const result = (totalScore1 + totalScore2 + totalScore3).toFixed(2)
        console.log(result)
        setAverageScore(result)
    }

    // console.log("candidateID", id)
    // Lưu dữ liệu


    // Xử lý data câu hỏi từ file data gốc
    const dataTechnical = QuestionTechnical.map(item => ({
        key: item.key,
        value: item.questionContent,
        label: item.questionContent,
    }));

    const dataEnglish = QuestionEnglish.map(item => ({
        key: item.key,
        value: item.questionContent,
        label: item.questionContent,
    }));

    const dataSoftskill = QuestionSoftskill.map(item => ({
        key: item.key,
        value: item.questionContent,
        label: item.questionContent,
    }));


    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    };

    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    return (
        <div style={{ marginTop: 55, backgroundColor: 'white', borderRadius: 5, marginLeft: -50, paddingBottom: 40 }}>
            <div style={{ fontSize: 23, fontWeight: 500, paddingTop: '6%', paddingLeft: '8%' }}>
                Chấm điểm và nhận xét ứng viên
            </div>
            <div style={{ fontSize: 19, fontWeight: 400, paddingLeft: '8%' }}>
                Hãy tạo ra sự công bằng bằng cách chấm điểm và nhận xét một cách công tâm
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, paddingTop: '2%', paddingLeft: '8%' }}>
                <label>Họ và tên Người chấm điểm</label>
                <label style={{ paddingLeft: 220 }}>Ngày thực hiện</label>
            </div>
            <div style={{ fontWeight: 500, paddingLeft: '8%' }}>
                <Input style={{ width: 370, height: 40, backgroundColor: '#f6f6f6', marginRight: '7%' }}>
                    {/* Hiển thị lại nội dung đã lưu trong Database hoặc LocalStorage nếu có */}
                </Input>
                <DatePicker showTime format={dateFormat} onChange={onChange} onOk={onOk}  />

                {/* <DatePicker format={dateFormat} style={{ width: 200, height: 40, backgroundColor: '#f6f6f6' }} > */}
                {/* Hiển thị lại nội dung đã lưu trong Database hoặc LocalStorage nếu có */}
                {/* </DatePicker> */}
            </div>

            <div style={{ fontWeight: 500, fontSize: 25, paddingTop: '2%', paddingLeft: '8%' }}>Câu hỏi phỏng vấn</div>

            <div style={{ paddingLeft: '8%', fontWeight: 500, fontSize: 18 }}>Câu hỏi về Kiến thức chuyên ngành</div>
            <DynamicFormQuestion
                keydata={1}
                initialValue={["", "", "", "", ""]}
                data={dataTechnical}
                detailid={id}
            // atLeastQuestion='5'
            // name="detailJob"
            // label="Job Details"
            />

            <div style={{ fontWeight: 500, fontSize: 18, paddingLeft: '8%' }}>Câu hỏi về Tiếng Anh</div>
            <DynamicFormQuestion
                keydata={2}
                initialValue={["", "", ""]}
                data={dataEnglish}
                detailid={id}
            // atLeastQuestion='3'
            // name="detailJob"
            // label="Job Details"
            />

            <div style={{ fontWeight: 500, fontSize: 18, paddingLeft: '8%' }}>Câu hỏi về Kỹ năng mềm</div>
            <DynamicFormQuestion
                keydata={3}
                initialValue={["", ""]}
                data={dataSoftskill}
                detailid={id}
            // atLeastQuestion='2'
            // name="detailJob"
            // label="Job Details"
            />

            <div style={{ paddingTop: 15 }}>
                <label style={{ fontWeight: 500, fontSize: 20, paddingLeft: '8%' }}>Tổng điểm của ứng viên</label>
                <label
                    style={{
                        height: 45,
                        width: 700,
                        backgroundColor: '#f6f6f6',
                        borderRadius: 5,
                        fontSize: 18,
                        fontWeight: 500,
                        color: 'black',
                        marginLeft: 30,
                        padding: '10px 70px',
                    }}
                >
                    {averageScore}
                </label>
                <button
                    style={{ fontSize: 13, backgroundColor: '#38c838', color: 'white', fontWeight: 500, marginLeft: 80, padding: '10px 30px', borderRadius: 5 }}
                    onClick={handleTinhDiem}
                >
                    TÍNH ĐIỂM
                </button>

                <div style={{ paddingTop: 8 }}>
                    <label style={{ fontWeight: 400, fontSize: 18, paddingLeft: '8%' }}>Nhận xét của người tuyển dụng</label>
                    <div style={{ paddingLeft: '8%' }}>
                        <TextArea style={{ resize: 'none', width: 715, height: 100, backgroundColor: '#f6f6f6' }}>
                        </TextArea>
                    </div>
                </div>

                <div style={{ paddingTop: 20, paddingLeft: '70%' }}>
                    <button
                        onClick={() => handleButtonDiscard('1')}
                        style={{ backgroundColor: '#dedcdc', fontWeight: 500, marginRight: 20, padding: '3px 10px', borderRadius: 5 }}
                    >
                        Trở về
                    </button>
                    <button
                        style={{ backgroundColor: '#3482e9', color: "white", fontWeight: 500, padding: '3px 10px', borderRadius: 5 }}
                        onClick={() => handleSaveChanges('1')}
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div >
    )
}

export default FormInterview