import { Form, Input, Button } from "antd";
import DynamicFormMark from "./DynamicFormMark";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";


const FormMark = ({ dataForm, roomid }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const params = useParams()
    const detailId = params.mark_id

    const onFinish = (values) => {
        // console.log("Received values of form:", values);
    };

    const accessToken = useSelector((state) => state.auth.accessToken);


    const handleCancelButton = (id) => {
        navigate(`/interview/detail/${id}`)
    }

    const handleSaveButton = async (detailId, id) => {
        form.setFieldsValue({
            interviewDetailId: detailId
        });

        const dataJson = form.getFieldsValue();
        dataJson.technicalQuestion = { T: dataJson.technicalQuestion }
        dataJson.englishQuestion = { E: dataJson.englishQuestion }
        dataJson.softSkillQuestion = { S: dataJson.softSkillQuestion }

        const TechnicalString = JSON.stringify(dataJson.technicalQuestion);
        const EnglishString = JSON.stringify(dataJson.englishQuestion);
        const SoftskillString = JSON.stringify(dataJson.softSkillQuestion);

        dataJson.technicalQuestion = TechnicalString
        dataJson.englishQuestion = EnglishString
        dataJson.softSkillQuestion = SoftskillString

        // dataJson.technicalQuestion = dataJson.technicalQuestion.join("\n")
        // dataJson.englishQuestion = dataJson.englishQuestion.join("\n")
        // dataJson.softSkillQuestion = dataJson.softSkillQuestion.join("\n")

        console.log("dataJson", dataJson);

        await axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/interview-detail/mark', dataJson,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        )

        // await axios.post('https://qltd01.cfapps.us10-001.hana.ondemand.com/interview-detail/mark', dataJson,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${accessToken}`,
        //         },
        //     }
        // )

        navigate(`/interview/detail/${id}`)

    }


    const data = [
        { key: 1, value: "question1" },
        { key: 2, value: "question2" },
        { key: 3, value: "question3" },
        { key: 4, value: "question4" }
    ]

    const [averageMark, setAverageMark] = useState(null)
    const handleScore = () => {
        const dataJson = form.getFieldsValue();

        const arrayTechnicalScores = dataJson.technicalQuestion.map((item) => item.score);
        const arrayEnglishScores = dataJson.englishQuestion.map((item) => item.score);
        const arraySoftskillScores = dataJson.softSkillQuestion.map((item) => item.score);

        // Tính điểm của các câu hỏi về Technical
        const length1 = arrayTechnicalScores.length;
        const pointQuestion1 = (5 / length1) / 10
        const multipliedScores1 = arrayTechnicalScores.map(score => score * pointQuestion1);
        const totalScore1 = multipliedScores1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        // // Tính điểm của các câu hỏi về English
        const length2 = arrayEnglishScores.length;
        const pointQuestion2 = (3 / length2) / 10
        const multipliedScores2 = arrayEnglishScores.map(score => score * pointQuestion2);
        const totalScore2 = multipliedScores2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        // // Tính điểm của các câu hỏi về Softskill
        const length3 = arraySoftskillScores.length;
        const pointQuestion3 = (2 / length3) / 10
        const multipliedScores3 = arraySoftskillScores.map(score => score * pointQuestion3);
        const totalScore3 = multipliedScores3.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        const result = (totalScore1 + totalScore2 + totalScore3).toFixed(2)
        setAverageMark(result)

        form.setFieldsValue({
            averageMark: result
        });
    }

    return (
        <div style={{ marginTop: 55, backgroundColor: 'white', borderRadius: 5, marginLeft: -50, paddingBottom: 40 }}>
            <div style={{ fontSize: 23, fontWeight: 500, paddingTop: '6%', paddingLeft: '8%' }}>
                Chấm điểm và nhận xét ứng viên
            </div>

            <div style={{ fontSize: 19, fontWeight: 400, paddingLeft: '8%' }}>
                Hãy tạo ra sự công bằng bằng cách chấm điểm và nhận xét một cách công tâm
            </div>


            <Form
                form={form}
                name="dynamic_form_complex"
                onFinish={onFinish}
                style={{
                    maxWidth: 735,
                }}
                autoComplete="off"
            >
                <div style={{ paddingLeft: '9%', paddingTop: 20 }}>
                    <Form.Item
                        name="interviewerName"
                        label={<div style={{ fontSize: 18, fontWeight: 500 }}>Họ và tên Người chấm điểm</div>}
                        rules={[
                            {
                                required: true,
                                message: "Missing Name",
                            },
                        ]}
                    >
                        <Input style={{ fontWeight: 500, fontSize: 17 }} placeholder="Nhập họ và tên của bạn..." />
                    </Form.Item>
                </div>
                <div style={{ fontWeight: 500, fontSize: 23, paddingLeft: '9%' }}>Câu hỏi phỏng vấn</div>

                <div style={{ paddingLeft: '9%', fontWeight: 500, fontSize: 18 }}>Câu hỏi về Kiến thức chuyên ngành</div>
                <DynamicFormMark name={"englishQuestion"} initialValue={["", "", "", "", ""]} data={data} atLeastQuestion={5} />

                <div style={{ paddingLeft: '9%', fontWeight: 500, fontSize: 18 }}>Câu hỏi về Tiếng Anh</div>
                <DynamicFormMark name={"technicalQuestion"} initialValue={["", "", ""]} data={data} atLeastQuestion={3} />

                <div style={{ paddingLeft: '9%', fontWeight: 500, fontSize: 18 }}>Câu hỏi về Kỹ năng mềm</div>
                <DynamicFormMark name={"softSkillQuestion"} initialValue={["", ""]} data={data} atLeastQuestion={2} />


                <Form.Item name="averageMark">
                    <div>
                        <label style={{ fontWeight: 500, fontSize: 20, paddingLeft: '9%' }}>Tổng điểm của ứng viên</label>
                        <label
                            style={{
                                color: 'black',
                                backgroundColor: 'rgb(231 231 231)',
                                borderRadius: 5,
                                fontSize: 20,
                                fontWeight: 500,
                                marginLeft: 30,
                                padding: '5px 70px',
                            }}>
                            {averageMark}
                        </label>
                        <button
                            style={{
                                fontSize: 15,
                                backgroundColor: '#38c838',
                                color: 'white',
                                fontWeight: 500,
                                marginLeft: 50,
                                padding: '8px 30px',
                                borderRadius: 5,
                            }}
                            onClick={handleScore}
                        >
                            TÍNH ĐIỂM
                        </button>
                    </div>
                </Form.Item>
                <div style={{ paddingTop: 15, paddingLeft: '9%' }}>
                    <label style={{ fontWeight: 400, fontSize: 18 }}>Nhận xét của người tuyển dụng</label>
                    <Form.Item name="comment"
                        rules={[
                            {
                                required: true,
                                message: "Please comment on the candidate ",
                            },
                        ]}>
                        <TextArea
                            style={{ resize: 'none', width: 715, backgroundColor: '#f6f6f6', height: 100, fontSize: 17 }}
                            placeholder="Hãy cho nhận xét về ứng viên..."
                            // onChange={(e) => handleTextAreaChange('comment', e.target.value)}
                            spellCheck="false"
                        />
                    </Form.Item>
                </div>

                <Form.Item name="interviewDetailId">
                    <div style={{ marginLeft: 320 }}>
                        <Button htmlType="submit"
                            onClick={() => handleSaveButton(detailId, roomid)}
                            style={{ backgroundColor: '#3482e9', color: "white", fontWeight: 500, padding: '3px 10px', marginRight: 20 }}>
                            Lưu kết quả
                        </Button>
                        <Button
                            onClick={() => handleCancelButton(roomid)}
                            style={{ backgroundColor: 'rgb(195 195 195)', color: "black", fontWeight: 500, padding: '3px 10px' }}>
                            Trở về
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormMark;
