import React, { useRef, useState } from 'react';
// import './index.css';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { FiTrash2, FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


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
            dataIndex: 'key',
            key: 'key',
            width: '5%',
        },
        {
            title: 'Vị trí',
            dataIndex: 'position',
            key: 'position',
            width: '12%',
            ...getColumnSearchProps('position'),
        },
        {
            title: 'Kỹ năng',
            dataIndex: 'skill',
            key: 'skill',
            width: '13%',
            ...getColumnSearchProps('skill'),
        },
        {
            title: 'Nội dung câu hỏi',
            dataIndex: 'questionContent',
            key: 'questionContent',
            width: '25%',
            ...getColumnSearchProps('questionContent'),
        },
        {
            title: 'Nội dung câu trả lời',
            dataIndex: 'answerContent',
            key: 'answerContent',
            width: '33%',
        },
        {
            title: 'Hoạt động',
            dataIndex: 'action',
            key: 'action',
            width: '10%',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<FiEdit />} onClick={() => handleEdit(record.key)}
                        style={{ backgroundColor: '#27acff', fontSize: 18 }}
                    >
                        {/* Edit */}
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this question?"
                        onConfirm={() => handleDelete(record.key)}
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

    const navigate = useNavigate()

    const handleEdit = (key) => {
        navigate(`/questions/editquestion/${key}`)
        // Add the logic to handle the edit action.
        // You can open a modal or navigate to an edit page based on the 'key'.
        console.log('Edit action triggered for key:', key);
    };

    const handleDelete = (key) => {
        // Add the logic to handle the delete action.
        // Perform the actual deletion from the data source.
        console.log('Delete action triggered for key:', key);
    };

    return <Table columns={columns} dataSource={dataQuestion} pagination={false} />;
};

export default TableQuestion;
