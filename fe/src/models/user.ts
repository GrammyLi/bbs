// https://umijs.org/docs/max/dva
import userService from "@/services/user"; // 确保路径正确

export default {
  state: {
    user: {},
  },

  effects: {
    *profile({ payload }: any, { call, put }: any) {
      const { data } = yield call(userService.profile, payload);
      yield put({ type: "queryUserSuccess", payload: data });
    },
  },

  reducers: {
    queryUserSuccess(state: any, { payload }: any) {
      return {
        ...state,
        user: payload,
      };
    },
  },
};
