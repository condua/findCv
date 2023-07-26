import React from "react"
import { Layout, Dropdown, Space, Avatar } from "antd"
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/action/authActions';

import ava from "../../assets/ava.jpg"

const { Header } = Layout

const loggedInUser = JSON.parse(localStorage.getItem('loginUser'));



const IRAHeader = ({ colorBgContainer }) => {
    const auth = useSelector(state => state.auth.data)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
        // window.location.reload();

    }
    const items = [
        {
            key: "1",
            icon: <UserOutlined />,
            label: (
                // <Link to="/userinfo">
                    <div >
                        User Info
                    </div>
                // </Link>
            ),
        },
        {
            key: "2",
            icon: <LogoutOutlined />,
            danger: true,
            label: (

                <div onClick={handleLogout}>
                    Log Out
                </div>

            ),
        },
    ]
    console.log(auth)
    return (
        <Header
            style={{ padding: 0, background: colorBgContainer }}
            className=" rounded-lg mr-4 mt-2 shadow-xl opacity-75 flex items-end"
        >
            <div className="flex items-end w-full justify-end mr-9">
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <div className="flex">
                        <a onClick={(e) => e.preventDefault()}>
                            <Avatar src='' className="mr-3 mb-1 "></Avatar>
                            <Space>
                                {/* Hello: {auth.userInfoEntity.fullName} */}
                                <DownOutlined />
                            </Space>
                        </a>
                    </div>
                </Dropdown>
            </div>
        </Header>
    )
}

export default IRAHeader
