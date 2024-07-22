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

  profile(user_id: number): Promise<ApiResponse<any>> {
    return this.get("/profile", {
      user_id,
    });
  }
}

export default new UserService();
