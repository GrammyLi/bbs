import APIService, { ApiResponse } from "./api"; // 确保路径正确
import { Topic } from "./type/topic";

class ToppicService extends APIService {
  constructor() {
    super();
  }

  getTopics(board_id: number): Promise<
    ApiResponse<{
      topics: Topic[];
      total: number;
    }>
  > {
    return this.get("/topic/all", { board_id });
  }

  addTopic(data: {
    title: string;
    content: string;
    board_id: number;
  }): Promise<ApiResponse<Topic>> {
    return this.post("/topic/add", { ...data });
  }

  getTopicDetail(topic_id: number): Promise<ApiResponse<Topic>> {
    return this.get("/topic/detail", { topic_id });
  }
}

export default new ToppicService();
