import React, { useState, useEffect } from "react";
import { Link, Outlet } from "umi";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "./index.less";
import Navbar from "@/components/Navbar";
import FooterComponent from "@/components/GFooter";

const Layout: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <div className="navs">
        <Navbar />
        <Outlet />
        <FooterComponent />
      </div>
    </ConfigProvider>
  );
};

export default Layout;
