import React from "react";
import { Link, useLocation } from "umi";
import { Tabs, Button, Avatar, Dropdown, Menu } from "antd";
import "./index.less";

const Navbar: React.FC<{
  isLoggedIn: boolean;
  userAvatar?: string;
  userName?: string;
}> = ({ isLoggedIn, userAvatar, userName }) => {
  const location = useLocation();
  const selectedKey = location.pathname.split("/")[1] || "home"; // 获取当前路径的第一级路径，如果没有则默认为 home

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
        tabBarExtraContent={
          isLoggedIn ? (
            <Dropdown overlay={menu}>
              <div className="navbar__avatar-container">
                <Avatar src={userAvatar} />
                <span className="navbar__username">{userName}</span>
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
        <Tabs.TabPane tab={<Link to="/">首页</Link>} key="home" />
        <Tabs.TabPane
          tab={<Link to="/addTopic">发布话题</Link>}
          key="addTopic"
        />
      </Tabs>
      
    </div>
  );
};

export default Navbar;
