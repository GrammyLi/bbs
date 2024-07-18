import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";

export interface ApiResponse<T> {
  code: number;
  msg: string;
  data: T;
}

const handleError = (err: any) => {
  let msg = err.message || err.msg || "";
  message.error(`请求失败，请重新刷新页面尝试：${msg}`);
};

const handleResponse = (res: AxiosResponse, resolve: (res: any) => void) => {
  const response: any = res;
  console.log("response", response);
  if (response.code === 200) {
    resolve(response);
  } else {
    handleError(response);
  }
};

class APIService {
  protected $http: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.$http = axios.create(
      config || {
        baseURL: "http://127.0.0.1:3000",
        timeout: 10000,
      }
    );

    this.$http.interceptors.request.use(
      (config: any) => {
        const _token = localStorage.getItem("token");
        const headers = _token
          ? {
              Authorization: `Bearer ${_token}`,
            }
          : {};

        return {
          ...config,
          headers: {
            ...config.headers,
            ...headers,
          },
        };
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    this.$http.interceptors.response.use(
      (response) => {
        if (response.status !== 200) {
          message.error(response.data.msg || "请求失败");
          return Promise.reject(new Error(response.data.msg || "请求失败"));
        }
        return response.data;
      },
      (error) => {
        message.error(error.response?.data?.msg || "请求失败");
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, params?: object): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
      this.$http
        .get(url, { params })
        .then((res) => handleResponse(res, resolve))
        .catch(handleError);
    });
  }

  post<T>(url: string, data?: object): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
      this.$http
        .post(url, data)
        .then((res) => handleResponse(res, resolve))
        .catch(handleError);
    });
  }
}

export default APIService;
