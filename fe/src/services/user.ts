import APIService, { ApiResponse } from "./api"; // 确保路径正确

class UserService extends APIService {
  constructor() {
    super();
  }

  login(data: {
    username: string;
    password: string;
  }): Promise<ApiResponse<any>> {
    return this.post("/login", data);
  }

  fetchProtectedResource(): Promise<ApiResponse<any>> {
    return this.get("/protected");
  }
}

export default new UserService();
