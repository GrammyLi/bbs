import React from "react";
import { Menu, Dropdown, Avatar, Input, Badge, Row, Col } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import "./index.less";

const { Search } = Input;

const TopMenu: React.FC = () => {
  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href="#">个人设置</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="#">我的消息</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="#">我的简历</a>
      </Menu.Item>
      <Menu.Item key="4">
        <a href="#">职位状态查看</a>
      </Menu.Item>
      <Menu.Item key="5">
        <a href="#">退出</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="top-menu">
      <Row justify="space-between" align="middle" className="top-menu__row">
        <Col>
          <Menu mode="horizontal" className="top-menu__left">
            <Menu.Item key="home">
              <a href="/">社区</a>
            </Menu.Item>
            <Menu.Item key="groups">
              <a href="/groups">群组</a>
            </Menu.Item>
            <Menu.Item key="cities">
              <a href="/cities">城市</a>
            </Menu.Item>
            <Menu.Item key="resource">
              <a href="https://talent.eleduck.com">人才库</a>
            </Menu.Item>
            <Menu.SubMenu key="camp" title={<a href="/english">训练营</a>} />
          </Menu>
        </Col>
        <Col>
          <Menu mode="horizontal" className="top-menu__right">
            <Menu.Item key="search" className="top-menu__search">
              <Search
                placeholder="请输入关键字"
                enterButton={<SearchOutlined />}
              />
            </Menu.Item>
            <Menu.SubMenu
              key="user"
              title={
                <span className="top-menu__user">
                  <Badge count={1}>
                    <Avatar src="https://duckfiles.oss-cn-qingdao.aliyuncs.com/eleduck/avatar/defaults/6.jpg!48" />
                  </Badge>
                  <span className="top-menu__username" title="159****2230">
                    159****2230
                  </span>
                  <DownOutlined />
                </span>
              }
            >
              {userMenu}
            </Menu.SubMenu>
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default TopMenu;
