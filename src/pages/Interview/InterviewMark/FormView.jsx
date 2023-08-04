import { Form, Input, Button, Spin } from "antd";
import DynamicFormView from "./DynamicFormView";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const FormMark = ({ interviewDetailId, roomid }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const params = useParams()
    const detailId = params.mark_id
    const accessToken = useSelector((state) => state.auth.accessToken);

    const onFinish = (values) => {
        // console.log("Received values of form:", values);
    };

    const handleCancelButton = (id) => {
        navigate(`/interview/detail/${id}`)
    }

    // Call API để lấy data
    const [dataFormView, setDataFormView] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchDataFormView = async () => {
            try {
                const response = await axios.get(
                    `https://qltd01.cfapps.us10-001.hana.ondemand.com/interview-detail/${interviewDetailId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setDataFormView(response.data || {});
                setIsLoaded(true); // Set isLoaded to true after data is fetched
            } catch (error) {
                console.error('Error fetching interview details:', error);
            }
        };

        fetchDataFormView();
    }, [interviewDetailId, accessToken]);

    if (!isLoaded) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 70 }}>
                <Spin size="large" style={{ marginBottom: 10 }} />
                <p>Loading...</p>
            </div>
        );
    }

    const data = dataFormView.data

    // data.technicalQuestion = JSON.parse(data.technicalQuestion)
    // data.englishQuestion = JSON.parse(data.englishQuestion)
    // data.softskillQuestion = JSON.parse(data.softskillQuestion)

    // data.technicalQuestion = data.technicalQuestion.T
    // data.englishQuestion = data.englishQuestion.E
    // data.softskillQuestion = data.softskillQuestion.S

    // console.log("dataFormView", data)

    const englishQuestionString = data.englishQuestion  // BE trả về nhầm english với technical
    const englishQuestionObject = JSON.parse(englishQuestionString);
    // console.log(englishQuestionObject.E);
    const dataTechnical = englishQuestionObject.E

    const technicalQuestionString = data.technicalQuestion
    const technicalQuestionObject = JSON.parse(technicalQuestionString);
    // console.log(technicalQuestionObject.T);
    const dataEnglish = technicalQuestionObject.T

    const softskillQuestionString = data.softSkillQuestion
    const softskillQuestionObject = JSON.parse(softskillQuestionString);
    // console.log(softskillQuestionObject.S);
    const dataSoftskill = softskillQuestionObject.S



    // const dataViewTechnical = dataTest.listTechnical
    // const dataViewEnglish = dataTest.listEnglish
    // const dataViewSoftskill = dataTest.listSoftskill


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
                        initialValue={data.interviewer || ""}
                    >
                        <Input style={{ fontWeight: 500, fontSize: 17 }} readOnly />
                    </Form.Item>
                </div>
                <div style={{ fontWeight: 500, fontSize: 23, paddingLeft: '9%' }}>Câu hỏi phỏng vấn</div>

                <div style={{ paddingLeft: '9%', fontWeight: 500, fontSize: 18 }}>Câu hỏi về Kiến thức chuyên ngành</div>
                <DynamicFormView name={"listTechnical"} initialValue={dataTechnical} dataView={dataTechnical} />

                <div style={{ paddingLeft: '9%', fontWeight: 500, fontSize: 18 }}>Câu hỏi về Tiếng Anh</div>
                <DynamicFormView name={"listEnglish"} initialValue={dataEnglish} dataView={dataEnglish} />

                <div style={{ paddingLeft: '9%', fontWeight: 500, fontSize: 18 }}>Câu hỏi về Kỹ năng mềm</div>
                <DynamicFormView name={"listSoftskill"} initialValue={dataSoftskill} dataView={dataSoftskill} />


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
                            {data.averageScores.toFixed(2)}
                        </label>
                        {/* <button
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
                        </button> */}
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
                        ]}
                        initialValue={data.comment}
                    >
                        <TextArea
                            style={{ resize: 'none', width: 715, backgroundColor: '#f6f6f6', height: 100, fontSize: 17 }}
                            placeholder="Hãy cho nhận xét về ứng viên..."
                            spellCheck="false"
                            readOnly
                        />
                    </Form.Item>
                </div>

                <Form.Item name="interviewDetailId">
                    <div style={{ marginLeft: 320 }}>
                        <Button htmlType="text"
                            // onClick={() => handleSaveButton(detailId, roomid)}
                            style={{ backgroundColor: '#3482e9', color: "white", fontWeight: 500, padding: '3px 10px', marginRight: 20 }}
                            disabled>
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
