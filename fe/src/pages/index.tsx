import React, { useState, useEffect } from "react";
import { Button, Modal, Menu, Dropdown, Avatar, List, Card, Tag } from "antd";
// import { DownOutlined } from "@ant-design/icons";
import "./index.less";
// import { Board } from "@/services/type/board";
// import { User } from "@/services/type/user";
// import UserProfile from "@/components/UserProfile";
// import BoardList from "@/components/BoardList";
// import TopicList from "@/components/TopicList";
import { Topic } from "@/services/type/topic";
import TopMenu from "@/components/TopMenu";
import Navbar from "@/components/Navbar";
// import AuthModal from "@/components/AuthModal";
// import AddBoardModal from "@/components/AddBoardModal";
// import boardService from "@/services/board"; // 确保路径正确
import Boards from "@/components/Boards";
import Topics from "@/components/Topics";
import AuthModal from "@/components/AuthModal";
import CreateTopic from "./CreateTopic";
import "./index.less";
import ActionButtons from "@/components/ActionButtons";
import HotTopics from "@/components/HotTopics";
const IndexPage: React.FC = () => {
  const [boardId, setBoardId] = useState<number>(-1);
  // const [isAddBoardVisible, setIsAddBoardVisible] = useState(false);

  const [topics, setTopics] = useState<Topic[]>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  // const showAddBoardModal = () => {
  //   setIsAddBoardVisible(true);
  // };

  // const handleAddBoardCancel = () => {
  //   setIsAddBoardVisible(false);
  // };

  const handleAddBoardSubmit = (title: string) => {
    console.log("板块标题:", title);
    // 处理提交逻辑
    // addBoard(title).then((res) => {
    //   console.log("res", res);
    //   getBoards();
    // });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="main-page">
  
      <div className="main-page__content">
        <div className="main-page__content--left">
          <Boards value={boardId} onChange={(value) => setBoardId(value)} />
          <Topics boardId={boardId} />

          {/* <TopicList topics={topics} /> */}
        </div>
        <div className="main-page__content--right">
          <ActionButtons />

          <HotTopics />
        </div>
      </div>
      <AuthModal visible={isModalVisible} onClose={handleCancel} />
      {/* <AddBoardModal
        visible={isAddBoardVisible}
        onClose={handleAddBoardCancel}
        onSubmit={handleAddBoarƒdSubmit}
      /> */}
    </div>
  );
};

export default IndexPage;
