import React from "react";
import { Link, useLocation } from "umi";
import { Tabs, Button, Avatar, Dropdown, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import "./index.less";

const Navbar: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  console.log("user", user);
  const dispatch = useDispatch();

  const updateUser = () => {
    dispatch(setUser({ name: "John Doe", age: 30 }));
  };
  const { isLogin, userInfo } = {
    isLogin: true,
    userInfo: {
      username: "grammyli",
    },
  };
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
          isLogin ? (
            <Dropdown overlay={menu}>
              <div className="navbar__avatar-container">
                <Avatar>{userInfo?.username?.[0]}</Avatar>
                <span className="navbar__username">{userInfo?.username}</span>
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
