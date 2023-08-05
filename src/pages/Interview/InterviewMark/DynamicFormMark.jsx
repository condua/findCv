import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, Space } from 'antd';



const DynamicFormMark = ({ name, initialValue, data, atLeastQuestion }) => {





    return (
        <Form.List name={name}
            initialValue={initialValue}
        >
            {(fields, { add, remove }) => (
                <>
                    {fields.map((field) => (
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
                                        }]}>
                                        <Select style={{ width: 595 }}
                                            placeholder="Chọn câu hỏi...">
                                            {data.map((item) => (
                                                <Select.Option key={item.key} value={item.value}>
                                                    {item.value}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                )}
                            </Form.Item>
                            <Form.Item
                                {...field}
                                name={[field.name, "score"]}
                                rules={[{
                                    required: true,
                                    message: "Missing",
                                }]}>
                                <InputNumber style={{ width: 60, height: 33 }} min={1} max={10}/>
                            </Form.Item>

                            {fields.length > atLeastQuestion ? (
                                <MinusCircleOutlined
                                    className="dynamic-delete-button mx-2"
                                    onClick={() => remove(field.name)}
                                />
                            ) : null}
                        </Space>
                    ))}

                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={add}
                            block
                            icon={<PlusOutlined />}
                            style={{ width: 140, marginLeft: '9%' }}
                        >
                            Add question
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    )

};

export default DynamicFormMark;