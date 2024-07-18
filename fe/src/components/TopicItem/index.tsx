import React from 'react';
import { Card } from 'antd';
import { Topic } from '@/services/type/topic';

interface TopicItemProps {
    topic: Topic;
}

const TopicItem: React.FC<TopicItemProps> = ({ topic }) => {
    return (
        <Card title={topic.title}>
            <p>{topic.content}</p>
        </Card>
    );
};

export default TopicItem;
