import React from 'react';
import { List } from 'antd';
import { Board } from '@/services/type/board';
import BoardItem from '../BoardItem';

interface BoardListProps {
    boards: Board[];
}

const BoardList: React.FC<BoardListProps> = ({ boards }) => {
    return (
        <List
            dataSource={boards}
            renderItem={board => (
                <List.Item>
                    <BoardItem board={board} />
                </List.Item>
            )}
        />
    );
};

export default BoardList;
