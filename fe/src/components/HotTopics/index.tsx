import React, { useEffect, useState } from "react";
import { List, Spin, message, Button } from "antd";
import topicService from "@/services/topic"; // 确保路径正确

import "./index.less";
import { Topic } from "@/services/type/topic";

const HotTopics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const res = await topicService.getTopics(-1);
      if (res.code === 200) {
        setTopics(res.data.topics);
        // setTotal(res.data.total);
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("获取话题数据失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hot-topics-container">
      <div className="hot-topics-header">
        热门话题推荐
        <div className="hot-topics-actions">
          <Button type="link">刷新</Button>
          <Button type="link">查看全部</Button>
        </div>
      </div>
      <Spin spinning={loading}>
        <List
          itemLayout="vertical"
          dataSource={topics}
          renderItem={(topic) => (
            <List.Item className="hot-topics-item">
              <div className="hot-topics-title">{topic.title}</div>
              <div className="hot-topics-description">{topic.content}</div>
            </List.Item>
          )}
        />
      </Spin>
    </div>
  );
};

export default HotTopics;
