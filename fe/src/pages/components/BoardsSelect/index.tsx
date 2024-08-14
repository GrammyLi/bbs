import React from "react";
import { Tag } from "antd";
import { Board } from "@/services/type/board";
import "./index.less";

interface BoardsSelectProps {
  boards: Board[];
  selectedBoard: number;
  onChange: (boardId: number) => void;
}

const BoardsSelect: React.FC<BoardsSelectProps> = ({
  boards,
  selectedBoard,
  onChange,
}) => {
  return (
    <div className="boards-select">
      {boards.map((board) => (
        <Tag
          key={board.id}
          className={`boards-select__item ${
            selectedBoard === board.id ? "selected" : ""
          }`}
          color={selectedBoard === board.id ? "blue" : ""}
          onClick={() => onChange(board.id)}
        >
          {board.title}
        </Tag>
      ))}
    </div>
  );
};

export default BoardsSelect;
