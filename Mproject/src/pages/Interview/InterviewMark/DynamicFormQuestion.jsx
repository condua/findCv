import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select } from 'antd';


const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const DynamicFormQuestion = ({ name, label, keydata, initialValue, data, detailid, atLeastQuestion }) => {

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };


    // const onChangeMark = (value) => {
    //     console.log('changed', value);
    // };
    const onChangeQuestion = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearchQuestion = (value) => {
        console.log('search:', value);
    };

    const [initialScores, setInitialScores] = useState(initialValue.map(() => '')); // State lưu trữ mảng điểm số ban đầu

    useEffect(() => {
        setInitialScores(initialValue);
    }, [initialValue]);

    const [questionScores, setQuestionScores] = useState(initialValue.map(() => '')); // State lưu trữ điểm số của các câu hỏi

    const handleBlur = (value, index) => {
        // Cập nhật điểm số tương ứng với câu hỏi khi người dùng nhập điểm
        const newScores = [...questionScores];
        newScores[index] = value;
        setQuestionScores(newScores);
        console.log("arrayScores", newScores)
    };



    const localStorageKey = `data${keydata}${detailid}`;

    useEffect(() => {
        // Lưu mảng điểm xuống localStorage khi có sự thay đổi
        localStorage.setItem(localStorageKey, JSON.stringify(questionScores));
    }, [questionScores, localStorageKey]);

    // const handleRemoveQuestion = (index) => {
    //     // Xóa điểm số của câu hỏi khi người dùng xóa câu hỏi
    //     const newScores = [...questionScores];
    //     newScores.splice(index, 1);
    //     setQuestionScores(newScores);
    //     setInitialScores(newScores);
    //     console.log("deleteScores", newScores)

    // };

    const handleAddQuestion = () => {
        // Thêm điểm số mới cho câu hỏi khi người dùng thêm câu hỏi
        const newScores = [...questionScores, ''];
        setQuestionScores(newScores);
        setInitialScores(newScores); // Cập nhật mảng điểm số ban đầu
        console.log("addScores", newScores)

    };

    return (
        <Form
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            style={{ marginLeft: -80 }}
        >
            <Form.List
                name="names"
                initialValue={initialScores ?? [""]}

            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item style={{}}>
                                <Form.Item
                                    {...field}
                                    validateTrigger={['onChange', 'onBlur']}
                                    noStyle
                                >
                                    <div style={{}}>
                                        <Select
                                            style={{ width: 630, height: 35, marginRight: 10, marginBottom: -5 }}
                                            showSearch
                                            placeholder="Select a question"
                                            optionFilterProp="children"
                                            onChange={onChangeQuestion}
                                            onSearch={onSearchQuestion}
                                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            options={data}
                                        >

                                        </Select>

                                        <InputNumber min={1} max={10}
                                            // onChange={onChangeMark}
                                            style={{ width: 60, backgroundColor: '#f6f6f6', marginRight: 10 }}
                                            onBlur={(e) => handleBlur(e.target.value, index)}
                                        // onBlur={(e) => handleBlur(e.target.value)}
                                        // value={initialScores[index]}
                                        />

                                        {/* {fields.length > atLeastQuestion ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => {
                                                    handleRemoveQuestion(index); // Call handleRemoveQuestion with the index of the question to be removed
                                                    remove(field.name);
                                                }}
                                            // onClick={() => remove(field.name)}
                                            />
                                        ) : null} */}
                                    </div>
                                </Form.Item>
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    handleAddQuestion(); // Call handleAddQuestion when adding a question
                                    add();
                                }}
                                // onClick={() => add()}
                                style={{ width: '20%' }}
                                icon={<PlusOutlined />}
                            >
                                Add Question
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form>
    );
};

export default DynamicFormQuestion;