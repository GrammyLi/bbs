import React, { useEffect, useState } from "react";
import { List, Avatar, Spin, message, Button, Input } from "antd";
import ReplyService from "@/services/reply"; // 确保路径正确

import ReactMarkdown from "react-markdown";
import "./index.less";
import { Reply } from "@/services/type/reply";
const { TextArea } = Input;

const Comments: React.FC<{ topicId: number }> = ({ topicId }) => {
  const [comments, setComments] = useState<Reply[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    topicId && fetchComments(topicId);
  }, [topicId]);

  const fetchComments = async (topicId: number) => {
    setLoading(true);
    try {
      const res = await ReplyService.getReplys(topicId);
      console.log("res ReplyService", res);
      if (res.code === 200) {
        setComments(res.data);
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("获取评论数据失败");
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

  const handleAddComment = async () => {
    if (!newComment) {
      message.warning("请输入评论内容");
      return;
    }

    setLoading(true);
    try {
      const res = await ReplyService.addReply({
        topic_id: topicId,
        content: newComment,
      });
      if (res.code === 200) {
        message.success("评论添加成功");
        setNewComment("");
        fetchComments(topicId); // 重新获取评论
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error("添加评论失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comments-container">
      <div className="comments-header">
        精选评论
        <div className="comments-actions">
          <Button type="link">按热度</Button>
          <Button type="link">按时间</Button>
        </div>
      </div>
      <Spin spinning={loading}>
        <List
          itemLayout="vertical"
          dataSource={comments}
          renderItem={(comment) => (
            <List.Item className="comment-item">
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={
                      comment?.user_avatar || "https://via.placeholder.com/50"
                    }
                  />
                }
                title={
                  <span className="comment-author">{comment?.user_name}</span>
                }
                description={
                  <span className="comment-time">
                    {formatTime(comment.created_time)}
                  </span>
                }
              />
              <ReactMarkdown className="comment-content">
                {comment.content}
              </ReactMarkdown>
            </List.Item>
          )}
        />
        <div className="add-comment">
          <TextArea
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="请输入评论内容"
          />
          <Button
            type="primary"
            onClick={handleAddComment}
            className="add-comment-button"
          >
            添加评论
          </Button>
        </div>
      </Spin>
    </div>
  );
};

export default Comments;
