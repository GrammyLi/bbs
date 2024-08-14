import React from "react";
import { Provider } from "react-redux";
import store from "@/store";

export const rootContainer = (root: React.ReactNode) => {
  return <Provider store={store}>{root}</Provider>;
};

// 加入redux
// https://blog.csdn.net/2301_77305454/article/details/132348368?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522172363761716800225530704%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=172363761716800225530704&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-2-132348368-null-null.142^v100^pc_search_result_base5&utm_term=umi%20%20%E4%BD%BF%E7%94%A8%20redux%20&spm=1018.2226.3001.4187
