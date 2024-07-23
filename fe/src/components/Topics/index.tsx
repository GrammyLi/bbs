import React, { useEffect, useState } from "react";
import { List, Avatar, Spin, message, Badge } from "antd";
import topicService from "@/services/topic"; // 确保路径正确
import { Topic } from "@/services/type/topic";
import "./index.less";
import { history } from "umi";

const Topics: React.FC<{ boardId: number }> = ({ boardId }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    fetchTopics();
  }, [boardId]);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await topicService.getTopics(boardId);
      if (res.code === 200) {
        setTopics(res.data.topics);
        setTotal(res.data.total);
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("获取话题数据失败");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const delta = now - timestamp;

    if (delta < 60) {
      return `${delta} 秒前`;
    } else if (delta < 3600) {
      return `${Math.floor(delta / 60)} 分钟前`;
    } else if (delta < 86400) {
      return `${Math.floor(delta / 3600)} 小时前`;
    } else if (delta < 2592000) {
      return `${Math.floor(delta / 86400)} 天前`;
    } else if (delta < 31104000) {
      return `${Math.floor(delta / 2592000)} 个月前`;
    } else {
      return `${Math.floor(delta / 31104000)} 年前`;
    }
  };

  return (
    <div className="topics-container">
      <div className="topics-header">共 {total} 个帖子</div>
      <Spin spinning={loading}>
        <List
          dataSource={topics}
          renderItem={(topic) => (
            <List.Item
              className="topic-item"
              onClick={() => {
                history.push("/topic/" + topic.id);
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    {topic.username[0]}
                  </Avatar>
                }
                title={<a href={`#/topic/${topic.id}`}>{topic.title}</a>}
                description={
                  <>
                    <div className="content-single-line">{topic.content}</div>
                    <div className="topic-info">
                      <span> 名称: {topic.username}</span>
                      <span>发布于 {formatTime(topic.created_time)}</span>
                    </div>
                  </>
                }
              />
              <div className="topic-extra">
                <Badge
                  count={topic.views || 1}
                  overflowCount={99}
                  color="blue"
                />
              </div>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
};

export default Topics;
