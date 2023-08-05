import React from "react"
import { ConfigProvider, Layout, Menu } from "antd"
import fpt1 from "../../assets/fpt1.png"
import { mapDispatchToProps, mapStateToProps } from "../rdSidebar"
import { connect } from "react-redux"

const { Sider } = Layout

const IRASidebar = ({
    collapsed,
    SetCollapsed,
    items,
    href,
    navigate,
    selectedLabel,
    SetSelectedLabel,
}) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#3A57E8",
                    colorBgTextHover: "#9ea9dd",
                },
            }}
        >
            <Sider
                style={{
                    overflow: "auto",
                    height: "100vh",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    background: "white",
                }}
                width={240}
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
    

                {!collapsed ? (
                    <div
                        className="flex justify-center cursor-pointer transition-all duration-75 "
                        onClick={() => {
                            SetCollapsed(!collapsed)
                        }}
                    >
                        <img alt="logo" className=" h-24 p-4" src={fpt1}></img>
                    </div>
                ) : (
                    <div
                        className="flex justify-center items-center cursor-pointer transition-all"
                        onClick={() => {
                            SetCollapsed(!collapsed)
                        }}
                    >
                        <img alt="logo" className="h-full p-4" src={fpt1}></img>
                    </div>
                )}

                <Menu
                    className=" bg-white text-black hover:text-black!important"
                    theme="dark"
                    mode="inline"
                    onClick={(item) => {
                        navigate(item.key)
                    }}
                    defaultSelectedKeys={["/" + href]}
                    selectedKeys={["/" + href]}
                    items={items}
                />
            </Sider>
        </ConfigProvider>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(IRASidebar)
