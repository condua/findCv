import React,{useEffect} from "react"
import { Layout, Dropdown, Space, Avatar } from "antd"
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchUsernames } from '../../redux/action/getUserAction';

import { logout } from '../../redux/action/authActions';

import ava from "../../assets/ava.jpg"

const { Header } = Layout

const loggedInUser = JSON.parse(localStorage.getItem('loginUser'));



const IRAHeader = ({ colorBgContainer }) => {
    const auth = useSelector(state => state.auth.data)
    const avatar = useSelector(state => state.userinfo.data.avatar)
    const name = useSelector(state => state.userinfo.data.fullName)
    const accessToken = useSelector(state => state.auth.accessToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(name)
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
        // window.location.reload();

    }
    const handleUser = () => {
        
        navigate('/userinfo')
        // window.location.reload();

    }
    useEffect(() => {
        dispatch(fetchUsernames(accessToken))
      }, []);
    const items = [
        {
            key: "1",
            icon: <UserOutlined />,
            label: (
                // <Link to="/userinfo">
                    <div onClick={handleUser}>
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
                        <p style={{marginRight:'10px'}}> {name}</p>
                        <a onClick={(e) => e.preventDefault()}>
                            <Avatar src={avatar} className="mr-3 mb-1 "></Avatar>
                            
                            <Space>
                                
                                {/* {avatar} */}
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
