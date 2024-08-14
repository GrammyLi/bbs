import React, { useEffect, useState } from "react";
import { Tag, Spin, message } from "antd";
import boardService from "@/services/board"; // 确保路径正确
import { Board } from "@/services/type/board";
import "./index.less";

interface BoardsProps {
  value?: number;
  onChange?: (value: number) => void;
}

const Boards: React.FC<BoardsProps> = ({ value = -1, onChange }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTag, setSelectedTag] = useState<number>(value);

  useEffect(() => {
    fetchBoards();
  }, []);

  useEffect(() => {
    setSelectedTag(value);
  }, [value]);

  const fetchBoards = async () => {
    try {
      const res = await boardService.getBoards();
      if (res.code === 200) {
        setBoards([
          { id: -1, title: "全部", created_time: 0, updated_time: 0 },
          ...res.data,
        ]); // 添加默认的 "全部" 标签
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("获取板块数据失败");
    } finally {
      setLoading(false);
    }
  };

  const handleTagChange = (id: number) => {
    setSelectedTag(id);

    onChange && onChange(id);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="boards">
      <div className="boards__list">
        {boards.map((board) => (
          <Tag
            key={board.id}
            className={`boards__item`}
            color={selectedTag === board.id ? "blue" : ""}
            onClick={() => handleTagChange(board.id)}
          >
            {board.title}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default Boards;
