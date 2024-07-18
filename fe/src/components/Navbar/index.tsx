import React from "react";
import { Link, useLocation } from "umi";
import { Menu } from "antd";
import "./index.less";

const Navbar: React.FC<{}> = () => {
  const location = useLocation();
  const selectedKey = location.pathname.split("/")[1] || "home"; // 获取当前路径的第一级路径，如果没有则默认为 home

  return (
    <div className={`navbar`}>
      <Menu mode="horizontal" selectedKeys={[selectedKey]}>
        <Menu.Item key="home">
          <Link to="/">首页</Link>
        </Menu.Item>
        <Menu.Item key="addTopic">
          <Link to="/addTopic">addTopic</Link>
        </Menu.Item>
        
      </Menu>
    </div>
  );
};

export default Navbar;
