import React, { useRef, useState } from 'react';
// import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { FiTrash2, FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestionRequest, getQuestionRequest } from "../../../redux/action/questionActions"
import axios from 'axios';


const TableQuestion = ({ dataQuestion }) => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const accessToken = useSelector((state) => state.auth.accessToken)

    // const handleDeleteQuestion = async (questionId) => {
    //     const ID = [questionId]
    //     console.log("Delete id question: ", ID)
    //     // console.log("accessToken: ", accessToken)
    //     await axios.delete(`https://qltd01.cfapps.us10-001.hana.ondemand.com/question`, ID,
    //         { headers: { Authorization: `Bearer ${accessToken}` } }
    //     )
    //     // await axios.get('https://qltd01.cfapps.us10-001.hana.ondemand.com/question',
    //     //     { headers: { Authorization: `Bearer ${accessToken}` } }
    //     // )
    //     // window.location.reload();   
    // }

    const handleDeleteQuestion = async (questionId) => {
        await dispatch(deleteQuestionRequest(questionId, accessToken));
        await dispatch(getQuestionRequest(accessToken));
        navigate("/questions");
    };

    const handleEdit = (questionId) => {
        navigate(`/questions/editquestion/${questionId}`)

        // console.log('Edit action triggered for id:', questionId);
    };



    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, backgroundColor: 'rgb(20, 182, 233)' }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt', // Use a custom key that doesn't exist in the 'dataQuestion' array
            key: 'stt',
            width: '5%',
            render: (_, __, index) => index + 1, // This will display the incrementing number starting from 1
        },
        {
            title: 'Vị trí',
            dataIndex: 'positions',
            key: 'positions',
            width: '12%',
            ...getColumnSearchProps('positions'),
        },
        {
            title: 'Kỹ năng',
            dataIndex: 'skills',
            key: 'skills',
            width: '13%',
            ...getColumnSearchProps('skills'),
        },
        {
            title: 'Nội dung câu hỏi',
            dataIndex: 'question',
            key: 'question',
            width: '25%',
            ...getColumnSearchProps('question'),
        },
        {
            title: 'Nội dung câu trả lời',
            dataIndex: 'answer',
            key: 'answer',
            width: '33%',
        },
        {
            title: 'Hoạt động',
            dataIndex: 'action',
            key: 'action',
            width: '10%',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<FiEdit />} onClick={() => handleEdit(record.id)}
                        style={{ backgroundColor: '#27acff', fontSize: 18 }}
                    >
                        {/* Edit */}
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this question?"
                        onConfirm={() => handleDeleteQuestion(record.id)}
                        okText={
                            <span style={{ color: 'black' }}>Yes</span> // Added a custom class here
                        }
                        cancelText="No"
                    >
                        <Button type="primary" danger icon={<FiTrash2 style={{ fontSize: 19 }} />}>
                            {/* Delete */}
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        }
    ];

    return <Table columns={columns} dataSource={dataQuestion} pagination={false} />;
};

export default TableQuestion;
