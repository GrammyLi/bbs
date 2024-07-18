import APIService, { ApiResponse } from "./api"; // 确保路径正确
import { Reply } from "./type/reply";

class ReplyService extends APIService {
  constructor() {
    super();
  }

  getReplys(topic_id: number): Promise<ApiResponse<Reply[]>> {
    return this.get("/reply/all", { topic_id });
  }

  addReply(data: {
    content: string;
    topic_id: number;
  }): Promise<ApiResponse<Reply>> {
    return this.post("/reply/add", { ...data });
  }
}

export default new ReplyService();
