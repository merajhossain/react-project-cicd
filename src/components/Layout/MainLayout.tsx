import React from "react";
import { Layout } from "antd";
import Header from "./Header";

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="site-layout">
      <Header />

      <Content className="content-wrapper">
        <div className="content-container">
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
