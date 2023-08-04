import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';
import { index } from 'd3-array';



const DynamicFormView = ({ name, initialValue, dataView }) => {

    return (
        <Form.List name={name} initialValue={initialValue} >
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field, index) => (
                        <Space key={field.key} align="baseline">
                            <Form.Item
                                shouldUpdate={(prevValues, curValues) =>
                                    prevValues.questions !== curValues.questions ||
                                    prevValues.scores !== curValues.scores}
                                style={{ paddingLeft: '10%', width: 665, height: 20 }}
                            >
                                {() => (
                                    <Form.Item
                                        {...field}
                                        name={[field.name, "question"]}
                                        rules={[{
                                            required: true,
                                            message: "Missing question",
                                        }]}
                                        initialValue={dataView[index].question}
                                    >
                                        <Input style={{ width: 595 }} placeholder="Chọn câu hỏi..." readOnly />
                                    </Form.Item>
                                )}
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, "score"]}
                                rules={[{
                                    required: true,
                                    message: "Missing",
                                }]}
                                initialValue={dataView[index].score}
                            >
                                <InputNumber style={{ width: 60, height: 33 }} readOnly />
                            </Form.Item>

                            {false && (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button mx-2"
                                    onClick={() => remove(field.name)}
                                />
                            )}
                        </Space>
                    ))}

                    <Form.Item>
                        {
                            false && <Button
                                type="dashed"
                                onClick={add}
                                block
                                icon={<PlusOutlined />}
                                style={{ width: 140, marginLeft: '9%' }}
                            >
                                Add question
                            </Button>
                        }
                    </Form.Item>
                </>
            )}
        </Form.List>
    )

};

export default DynamicFormView;