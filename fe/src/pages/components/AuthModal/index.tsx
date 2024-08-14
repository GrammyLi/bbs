import React from "react";
import { Modal, Form, Input, Button, Tabs, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.less";
import userService from "@/services/user"; // 确保路径正确

const { TabPane } = Tabs;

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    // message.success("操作成功");
    await userService
      .login({
        username: values.username,
        password: values.password,
      })
      .then((res: any) => {
        localStorage.token = res?.token || "";
      });
    // await userService.fetchProtectedResource(); // 获取受保护资源

    onClose();
  };

  return (
    <Modal title="登录/注册" visible={visible} onCancel={onClose} footer={null}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="登录" key="1">
          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="auth-modal__button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="注册" key="2">
          <Form form={form} name="register" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码!" }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="auth-modal__button"
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;
