import React from "react";
import { Avatar, Card } from "antd";
import { User } from "@/services/type/user";

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card>
      <Card.Meta
        avatar={<Avatar src={user.image} />}
        title={user.username}
        description={user.signature}
      />
    </Card>
  );
};

export default UserProfile;
