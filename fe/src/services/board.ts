import APIService, { ApiResponse } from "./api"; // 确保路径正确
import { Board } from "./type/board";

class BoardService extends APIService {
  constructor() {
    super();
  }

  getBoards(): Promise<ApiResponse<Board[]>> {
    return this.get("/board/all");
  }

  addBoard(title: string): Promise<ApiResponse<Board>> {
    return this.post("/board/add", { title });
  }
}

export default new BoardService();
