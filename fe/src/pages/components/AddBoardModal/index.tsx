import React from "react";
import { Modal, Form, Input, Button } from "antd";

interface AddBoardModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

const AddBoardModal: React.FC<AddBoardModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { title: string }) => {
    onSubmit(values.title);
    form.resetFields();
    onClose();
  };

  return (
    <Modal title="添加板块" visible={visible} onCancel={onClose} footer={null}>
      <Form form={form} name="add_board_form" onFinish={handleFinish}>
        <Form.Item
          name="title"
          rules={[
            { required: true, message: "请输入标题!" },
            { min: 2, message: "标题长度不能小于2个字符!" },
            { max: 10, message: "标题长度不能大于10个字符!" },
          ]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="add-board-modal__button"
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBoardModal;
