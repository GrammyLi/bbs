import React from 'react';
import { Card } from 'antd';
import { Board } from '@/services/type/board';

interface BoardItemProps {
    board: Board;
}

const BoardItem: React.FC<BoardItemProps> = ({ board }) => {
    return (
        <Card title={board.title}>
            <p>{board.content}</p>
        </Card>
    );
};

export default BoardItem;
