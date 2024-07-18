import React from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./index.less";

const ActionButtons: React.FC = () => {
  return (
    <div className="action-buttons">
      <Button type="primary" icon={<EditOutlined />} className="action-button">
        发布提问
      </Button>
      <Button type="primary" icon={<EditOutlined />} className="action-button">
        发布话题
      </Button>
    </div>
  );
};

export default ActionButtons;
