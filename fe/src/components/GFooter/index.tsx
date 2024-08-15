import React from "react";
import { Layout, Space, Typography, Menu } from "antd";
import {
  WechatOutlined,
  MailOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import "./index.less";

const { Link: AntLink } = Typography;

const socialLinks = [
  { icon: <WechatOutlined />, label: "微信", link: "" },
  {
    icon: <MailOutlined />,
    label: "邮箱",
    link: "mailto:grammyli@outlook.com",
  },
  {
    icon: <GithubOutlined />,
    label: "github",
    link: "https://github.com/GrammyLi",
  },
];

const FooterComponent: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__links">
          <Space direction="horizontal">
            {socialLinks.map((item, index) => (
              <AntLink key={index} href={item.link} target="_blank">
                <Space>
                  {item.icon}
                  {item.label}
                </Space>
              </AntLink>
            ))}
          </Space>
        </div>
        <div className="footer__copyright">
          <p>© Made with ❤️ by Grammy Li.</p>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
