import React, { useEffect, useState } from "react";
import { Spin, message, Avatar } from "antd";
import topicService from "@/services/topic"; // 确保路径正确
import { Topic } from "@/services/type/topic";

import ReactMarkdown from "react-markdown";
import "./index.less";
import { useParams } from "umi";
import Comments from "../Comments";

const TopicDetail = () => {
  const { id: topicId } = useParams<{
    id: string;
  }>();
  const [topicDetail, settopicDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("topicId", topicId);
  useEffect(() => {
    topicId && fetchtopicDetail(Number(topicId));
  }, [topicId]);

  const fetchtopicDetail = async (id: number) => {
    setLoading(true);
    try {
      const res = await topicService.getTopicDetail(id);
      if (res.code === 200) {
        settopicDetail(res.data);
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("获取职位详情失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      {topicDetail && (
        <div className="topic-detail-container">
          <div className="topic-header">
            <div className="topic-title">{topicDetail.title}</div>
            <div className="topic-subtitle">{topicDetail.subtitle}</div>
            <div className="topic-meta">
              <Avatar src={topicDetail.user_avatar} />
              <span className="topic-author">{topicDetail.user_name}</span>
              <span className="topic-views">{topicDetail.views} 阅读</span>
              <span className="topic-comments">
                {topicDetail.comments} 评论
              </span>
              <span className="topic-time">{topicDetail.created_time}</span>
            </div>
          </div>
          <ReactMarkdown className="topic-content">
            {topicDetail.content}
          </ReactMarkdown>
        </div>
      )}
      {topicId && <Comments topicId={Number(topicId)} />}
    </Spin>
  );
};

export default TopicDetail;
