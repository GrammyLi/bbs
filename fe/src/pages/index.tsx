import React, { useState, useEffect } from "react";

import Boards from "@/components/Boards";
import Topics from "@/components/Topics";
import AuthModal from "@/components/AuthModal";
import ActionButtons from "@/components/ActionButtons";
import HotTopics from "@/components/HotTopics";

import "./index.less";
const IndexPage: React.FC = () => {
  const [boardId, setBoardId] = useState<number>(-1);
  // const [isAddBoardVisible, setIsAddBoardVisible] = useState(false);
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
