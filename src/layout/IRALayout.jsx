import React,{useEffect,useState} from "react"
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
import { useSelector } from "react-redux"

const token = localStorage.getItem("token")



const items_admin = [
    { key: "/interviewer", icon: <HomeOutlined />, label: "Home" },
    { type: "divider" },
    { key: "/event", icon: <FireOutlined />, label: "Event" },
    { key: "/managecandidate", icon: <VideoCameraOutlined />, label: "Candidates Management" },

    { key: "/interviewmain", icon: <VideoCameraOutlined />, label: "Interview" },

    { key: "/recruitment", icon: <FileSearchOutlined />, label: "Recruitment" },
    { key: "/room", icon: <FileSearchOutlined />, label: "Room" },

    { key: "/interviewercalendar", icon: <FileSearchOutlined />, label: "InterviewerCalendar" },
    { key: "/dashboard", icon: <FileSearchOutlined />, label: "Dashboard" },
    { key: "/manage-user", icon: <FileSearchOutlined />, label: "Manage User" },
    { key: "/blacklist", icon: <FileSearchOutlined />, label: "Blacklist" },
    { key: "/result", icon: <FileSearchOutlined />, label: "Result" },
    { key: "/questions", icon: <FileSearchOutlined />, label: "Question" },
]

const items_interviwer = [
    { key: "/interviewer", icon: <HomeOutlined />, label: "Home" },
    { type: "divider" },
    // { key: "/event", icon: <FireOutlined />, label: "Event" },
    { key: "/managecandidate", icon: <VideoCameraOutlined />, label: "Candidates Management" },

    { key: "/interviewmain", icon: <VideoCameraOutlined />, label: "Interview" },

    { key: "/event", icon: <FileSearchOutlined />, label: "Event" },

]

const items_recruiter = [
    { key: "/recruitment", icon: <HomeOutlined />, label: "Home" },
    { type: "divider" },
    
    // { key: "/dashboard", icon: <FileSearchOutlined />, label: "Dashboard" },
    { key: "/room", icon: <FileSearchOutlined />, label: "Room" },
    { key: "/blacklist", icon: <FileSearchOutlined />, label: "Blacklist" },
    { key: "/result", icon: <FileSearchOutlined />, label: "Result" },
    { key: "/questions", icon: <FileSearchOutlined />, label: "Question" },
]

const IRALayout = ({ collapsed, SetCollapsed, children }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken()

    const navigate = useNavigate()
    const role = useSelector(state => state.auth.data.role)
    
    console.log(role)
    let href = window.location.href.substring(window.location.origin.length + 1)
    
    const [items, setItems] = useState(() => {
        if (role === 'INTERVIEWER') return items_interviwer
        else if (role === 'RECRUITER') return items_recruiter
        else return items_admin
      })
    
      // Update items whenever the role changes
      useEffect(() => {
        if (role === 'INTERVIEWER') setItems(items_interviwer)
        else if (role === 'RECRUITER') setItems(items_recruiter)
        else setItems(items_admin)
      }, [role])
        // if(role === 'INTERVIWER')
        // {
        //     setItems(items_interviwer)
        // }
        // else if(role === 'RECRUITER')
        // {
        //     setItems(items_recruiter)
        // }
        // else if(role === 'ADMIN'){
        //     setItems(items_admin)
        // }
   
    console.log(items_interviwer)
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

