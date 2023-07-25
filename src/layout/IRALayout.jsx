import React from "react"
import { connect } from "react-redux"
import { mapDispatchToProps, mapStateToProps } from "../components/rdSidebar"
import {
    VideoCameraOutlined,
    HomeOutlined,
    FireOutlined,
    FileSearchOutlined,
} from "@ant-design/icons"
import { Layout, theme } from "antd"
import { useNavigate } from "react-router-dom"
import IRAContent from "../components/IRALayout/IRAContent"
import IRAHeader from "../components/IRALayout/IRAHeader"
import IRASidebar from "../components/IRALayout/IRASidebar"
import IRAHero from "../components/IRALayout/IRAHero"
import IRABanner from "../components/IRALayout/IRABanner"


const token = localStorage.getItem("token")



const items = [
    { key: "/home", icon: <HomeOutlined />, label: "Home" },
    { type: "divider" },
    { key: "/event", icon: <FireOutlined />, label: "Event" },
    { key: "/interviewmain", icon: <VideoCameraOutlined />, label: "Interview" },
    { key: "/recruitment", icon: <FileSearchOutlined />, label: "Recruitment" },
    // { key: "/login", icon: <FileSearchOutlined />, label: "Login" },
    // { key: "/register", icon: <FileSearchOutlined />, label: "Register" },
    // { key: "/resetpassword", icon: <FileSearchOutlined />, label: "Reset Password" },
    { key: "/interviewercalendar", icon: <FileSearchOutlined />, label: "InterviewerCalendar" },
    // { key: "/addmorequestions", icon: <FileSearchOutlined />, label: "Add More Questions" },
    { key: "/dashboard", icon: <FileSearchOutlined />, label: "Dashboard" },
    { key: "/manage-user", icon: <FileSearchOutlined />, label: "Manage User" },
    { key: "/blacklist", icon: <FileSearchOutlined />, label: "Blacklist" },
    { key: "/result", icon: <FileSearchOutlined />, label: "Result" },
    { key: "/questions", icon: <FileSearchOutlined />, label: "Question" },
    // { key: "/manage-candidate", icon: <FileSearchOutlined />, label: "Manage Candidate" },
]
const IRALayout = ({ collapsed, SetCollapsed, children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const navigate = useNavigate()

    let href = window.location.href.substring(window.location.origin.length + 1)

    return (
        <Layout className="bg-[#E9ECEF]">
            <IRASidebar
                collapsed={collapsed}
                SetCollapsed={SetCollapsed}
                items={items}
                href={href}
                navigate={navigate}
            />
            <Layout
                className={
                    "bg-[#E9ECEF] transition-all " +
                    (collapsed ? " ml-24" : "ml-[250px]")
                }
            >
                <IRAHeader colorBgContainer={colorBgContainer} />
                <IRAHero />
                <IRAContent>{children}</IRAContent>
            </Layout>
        </Layout>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(IRALayout)

