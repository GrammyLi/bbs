import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import boardService from "@/services/board";
import topicService from "@/services/topic";
import { Board } from "@/services/type/board";
import BoardsSelect from "@/components/BoardsSelect";

import "./index.less";

const { TextArea } = Input;

const CreateTopic: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [form] = Form.useForm();
  const mdParser = new MarkdownIt();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const res = await boardService.getBoards();
      if (res.code === 200) {
        setBoards(res.data);
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("获取板块数据失败");
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    if (selectedBoard === -1) {
      message.error("请选择一个板块");
      return;
    }
    try {
      const res = await topicService.addTopic({
        ...values,
        board_id: selectedBoard,
      });
      if (res.code === 200) {
        message.success("发帖成功");
        form.resetFields();
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("发帖失败");
    }
  };

  return (
    <div className="create-topic">
      <Form form={form} onFinish={onFinish}>
        <Form.Item>
          <BoardsSelect
            boards={boards}
            selectedBoard={selectedBoard}
            onChange={setSelectedBoard}
          />
        </Form.Item>
        <Form.Item
          name="title"
          rules={[
            { required: true, message: "请输入标题" },
            { min: 2, max: 10, message: "标题长度应在2到10个字符之间" },
          ]}
        >
          <Input placeholder="标题" />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: "请输入内容" }]}
        >
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={({ text }) => form.setFieldsValue({ content: text })}
            placeholder="请输入内容"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            发帖
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTopic;
