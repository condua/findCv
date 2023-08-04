import React, { useEffect, useState } from 'react';
import { Button, Spin, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableQuestion from './TableQuestion';
import { useDispatch, useSelector } from 'react-redux';
// import { getQuestionRequest } from '../../../redux/action/questionActions';
import questionDatajson from "../../../data/ListQuestion/QuestionData.json"
import axios from 'axios';

const Questions = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const items = [
        {
            label: 'Technical',
            key: '1',
        },
        {
            label: 'English',
            key: '2',
        },
        {
            label: 'SoftSkill',
            key: '3',
        },
    ];
    const optionPosition = [
        { value: 1, label: 'Back-end' },
        { value: 2, label: 'Front-end' },
        { value: 3, label: 'Full-stack' },
        { value: 4, label: 'DevOps' },
        { value: 5, label: 'Mobile App' },
        { value: 6, label: 'UI/UX Designer' },
        { value: 7, label: 'QA/Tester' },
    ];
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

    const accessToken = useSelector((state) => state.auth.accessToken);

    // const [data, setData] = useState([])
    const dataQuestionRedux = useSelector((state) => state.question.questionData)

    const [dataQuestion, setDataQuestion] = useState(dataQuestionRedux);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const fetchDataQuestion = async () => {
            try {
                const response = await axios.get(
                    `https://qltd01.cfapps.us10-001.hana.ondemand.com/question`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                setDataQuestion(response.data || {});
                setIsLoaded(true); // Set isLoaded to true after data is fetched
            } catch (error) {
                console.error('Error fetching interview details:', error);
            }
        };

        fetchDataQuestion();
    }, [accessToken]);

    if (!isLoaded) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                <Spin size="large" style={{ marginBottom: 10 }} />
                <p>Loading...</p>
            </div>
        );
    }


    const questionData = dataQuestion.data
    console.log("questionData", questionData)
    // console.log("dataQuestion", questionData[0].questions)

    // useEffect(() => {
    //     // Call the API to get the question data

    //     // console.log("aaaa", accessToken)
    //     dispatch(getQuestionRequest(accessToken));
    // }, [dispatch, accessToken]);

    // const { data: questionData } = useSelector((state) => state.question.questionData || []);

    // console.log("dataTest", questionData)
    // setData(questionData)

    // useEffect(() => {
    //         console.log("a")
    //         setData(questionData);
    //         console.log("b")
    // }, [questionData]);

    // console.log("data", data)
    // console.log("accessToken", accessToken)


    const dataSoftskill = questionData[0].questions || [];
    const dataTechnical = questionData[1].questions || [];
    const dataEnglish = questionData[2].questions || [];


    // const dataTechnical = questionsTechnical
    // const dataEnglish = questionEnglish
    // const dataSoftskill = questionSoftskill
    // const dataTechnical = questionDatajson.questionTechnical
    // const dataEnglish = questionDatajson.questionEnglish
    // const dataSoftskill = questionDatajson.questionSoftskill


    const dataQuestionTechnical_Converted = dataTechnical.map((item) => {
        const arrayOfPositionLabels = item.positionIds
            .map((position) => optionPosition.find((opt) => opt.value === position)?.label || '');
        const positionsLabelString = arrayOfPositionLabels.join(', ');

        const arrayOfSkillLabels = item.skillIds
            .map((skill) => optionSkill.find((opt) => opt.value === skill)?.label || '');
        const skillsLabelString = arrayOfSkillLabels.join(', ');
        return { ...item, positions: positionsLabelString, skills: skillsLabelString };
    });

    const dataQuestionEnglish_Converted = dataEnglish.map((item) => {
        const arrayOfPositionLabels = item.positionIds
            .map((position) => optionPosition.find((opt) => opt.value === position)?.label || '');
        const positionsLabelString = arrayOfPositionLabels.join(', ');

        const arrayOfSkillLabels = item.skillIds
            .map((skill) => optionSkill.find((opt) => opt.value === skill)?.label || '');
        const skillsLabelString = arrayOfSkillLabels.join(', ');
        return { ...item, positions: positionsLabelString, skills: skillsLabelString };
    });

    const dataQuestionSoftskill_Converted = dataSoftskill.map((item) => {
        const arrayOfPositionLabels = item.positionIds
            .map((position) => optionPosition.find((opt) => opt.value === position)?.label || '');
        const positionsLabelString = arrayOfPositionLabels.join(', ');

        const arrayOfSkillLabels = item.skillIds
            .map((skill) => optionSkill.find((opt) => opt.value === skill)?.label || '');
        const skillsLabelString = arrayOfSkillLabels.join(', ');
        return { ...item, positions: positionsLabelString, skills: skillsLabelString };
    });




    const handleAddQuestion = () => {
        navigate('/questions/addquestion');
    };

    return (
        <div className="flex w-full mt-7 bg-white flex-col" style={{ borderRadius: 10 }}>
            <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 text-xl text">Bộ câu hỏi</div>
            </div>
            <Tabs
                tabBarStyle={{ backgroundColor: '#e3e3e3', borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
                tabBarGutter={-1}
                style={{ fontWeight: 500, minHeight: 450 }}
                type="card"
                items={items.map((item) => ({
                    label: item.label,
                    key: item.key,
                    children: (
                        <div>
                            <div style={{ fontSize: 25, fontWeight: 500, paddingLeft: '5%' }}>
                                Bộ câu hỏi vẫn còn hạn chế nên bạn hãy đóng góp thêm câu hỏi nhé!
                            </div>
                            <div style={{ fontSize: 19, fontWeight: 200, paddingLeft: '5%', paddingTop: '1%' }}>
                                Bộ câu hỏi có thể gợi ý câu trả lời để bạn có thể dễ dàng đánh giá ứng viên hơn
                                <Button
                                    onClick={handleAddQuestion}
                                    style={{ backgroundColor: '#14b6e9', marginLeft: 210, color: 'white', fontWeight: 500 }}
                                >
                                    Thêm câu hỏi
                                </Button>
                            </div>
                            <div style={{ paddingTop: '2%', paddingLeft: '5%', width: '95%' }}>
                                {item.key === '1' ? (
                                    // <TableQuestion dataQuestion={QuestionTechnical} />
                                    <TableQuestion dataQuestion={dataQuestionTechnical_Converted} />
                                ) : item.key === '2' ? (
                                    // <TableQuestion dataQuestion={QuestionEnglish} />
                                    <TableQuestion dataQuestion={dataQuestionEnglish_Converted} />
                                ) : (
                                    // <TableQuestion dataQuestion={QuestionSoftskill} />
                                    <TableQuestion dataQuestion={dataQuestionSoftskill_Converted} />
                                )}
                            </div>
                        </div>
                    ),
                }))}
            />
        </div>
    );
};

export default Questions;
