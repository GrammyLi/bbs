// src/pages/Setting.tsx
import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import userService from "@/services/user"; // 确保路径正确

const Setting: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await userService.profile();
        if (res.code === 200) {
          form.setFieldsValue(res.data);
        } else {
          message.error("获取用户信息失败");
        }
      } catch (error) {
        message.error("获取用户信息失败");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await userService.update(values);
      if (res.code === 200) {
        message.success("用户信息更新成功");
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("更新用户信息失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setting-page">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ username: "", email: "" }}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: "请输入邮箱!" },
            { type: "email", message: "请输入有效的邮箱!" },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            更新信息
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Setting;
