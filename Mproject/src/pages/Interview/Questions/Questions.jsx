import React from 'react';
import { Button, Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableQuestion from './TableQuestion';
import QuestionTechnical from '../../../data/ListQuestion/QuestionTechnical.json';
import QuestionEnglish from '../../../data/ListQuestion/QuestionEnglish.json';
import QuestionSoftskill from '../../../data/ListQuestion/QuestionSoftskill.json';

const Questions = () => {
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

    const navigate = useNavigate();

    const handleAddQuestion = () => {
        navigate('/questions/addquestion');
    }; 

    // const handleNameTab = (id) => {
    //     return id === '1' ? 'Technical' : id === '2' ? 'English' : 'SoftSkill';
    // };

    const onChange = (key) => {
        console.log(key);
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
                onChange={onChange}
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
                                    <TableQuestion dataQuestion={QuestionTechnical} />
                                ) : item.key === '2' ? (
                                    <TableQuestion dataQuestion={QuestionEnglish} />
                                ) : (
                                    <TableQuestion dataQuestion={QuestionSoftskill} />
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
