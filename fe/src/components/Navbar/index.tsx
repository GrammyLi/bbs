import React, { useState } from "react";
import { Link, useLocation } from "umi";
import { history } from "umi";

import { Tabs, Button, Avatar, Dropdown, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import "./index.less";

const Navbar: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  const location = useLocation();

  const [selectedKey, setSelectedKey] = useState<string>(
    location.pathname.split("/")[1] || "home"
  ); // 获取当前路径的第一级路径，如果没有则默认为 home

  const handleTabChange = (key: string) => {
    setSelectedKey(key);

    history.push(`/${key === "home" ? "" : key}`);
  };

  const menu = (
    <Menu>
      <Menu.Item key="settings">
        <Link to="/settings">个人设置</Link>
      </Menu.Item>
      <Menu.Item key="messages">
        <Link to="/messages">我的消息</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar">
      <Tabs
        activeKey={selectedKey}
        onChange={handleTabChange}
        tabBarExtraContent={
          user?.id ? (
            <Dropdown overlay={menu}>
              <div className="navbar__avatar-container">
                <Avatar>{user?.name?.[0]}</Avatar>
                <span className="navbar__username">{user?.name}</span>
              </div>
            </Dropdown>
          ) : (
            <div className="navbar__auth-buttons">
              <Button type="link">
                <Link to="/login">登录</Link>
              </Button>
              <div className="navbar__divider"></div>
              <Button type="link">
                <Link to="/register">注册</Link>
              </Button>
            </div>
          )
        }
      >
        <Tabs.TabPane tab={"首页"} key="home" />
        <Tabs.TabPane tab={"发布话题"} key="addTopic" />
      </Tabs>
    </div>
  );
};

export default Navbar;
