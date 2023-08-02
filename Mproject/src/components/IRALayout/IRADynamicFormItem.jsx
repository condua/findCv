import React from "react"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
}

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
}

const IRADynamicFormItem = ({ name, label, initialValue }) => {
    return (
        <div>
            <Form.List
                name={name}
                rules={[
                    {
                        validator: async (_, names) => {
                            if (!names || names.length < 1) {
                                return Promise.reject(
                                    new Error(
                                        `At least 1 ` + `${label}`.toLowerCase()
                                    )
                                )
                            }
                        },
                    },
                ]}
                initialValue={initialValue ?? [""]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <div className="flex">
                        <div className="w-2/3">
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0
                                        ? formItemLayout
                                        : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? label : ""}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={["onChange", "onBlur"]}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message:
                                                    "Please input " +
                                                    `${label}`.toLowerCase() +
                                                    "'s name or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input className="w-11/12 mx-2" />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                        </div>
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                            >
                                Add field
                            </Button>
                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </div>
                )}
            </Form.List>
        </div>
    )
}

export default IRADynamicFormItem
