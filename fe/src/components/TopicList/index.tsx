import React from "react";
import { List } from "antd";
import { Topic } from "@/services/type/topic";
import TopicItem from "../TopicItem";

interface TopicListProps {
  topics: Topic[];
}

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
  return (
    <List
      dataSource={topics}
      renderItem={(topic) => (
        <List.Item>
          <TopicItem topic={topic} />
        </List.Item>
      )}
    />
  );
};

export default TopicList;
