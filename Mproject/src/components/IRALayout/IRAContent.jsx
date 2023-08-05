import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const IRAContent = ({ colorBgContainer, children }) => {
  return (
    <Content
      style={{
        margin: "5px 32px 20px 16px",
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        position: "relative"
      }}
    >
      {children}
    </Content>
  );
};

export default IRAContent;
