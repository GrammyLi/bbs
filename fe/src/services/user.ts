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

  profile(): Promise<ApiResponse<any>> {
    return this.get("/profile", {});
  }

  update(data: { username: string; email: string }): Promise<ApiResponse<any>> {
    return this.post("/update", data);
  }
}

export default new UserService();
