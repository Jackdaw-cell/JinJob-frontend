// initial state
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { LoginControllerService } from "../../generatedCode/userService";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userId: "",
      avatar: "",
      nickName: "",
      ojAcSum: 0,
      examAcSum: 0,
      examAcScore: 0,
      tags: [],
      description: "",
      background: "",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
      // TODO:获取token存储到浏览器，之后登陆后请求带token
      // const res = await UserControllerService.getLoginUserUsingGet();
      const token = localStorage.getItem("token");
      if (token != undefined) {
        const res = await LoginControllerService.getLoginUserUsingGet(token);
        if (res.code === 0) {
          commit("updateUser", res.data);
        }
        return state.loginUser;
      }
      commit("updateUser", {
        ...state.loginUser,
        userRole: ACCESS_ENUM.NOT_LOGIN,
      });
    },
    async initLoginUser({ commit, state }, payload) {
      commit("updateUser", {
        ...state.loginUser,
        userRole: ACCESS_ENUM.NOT_LOGIN,
      });
    },
    async updateTags({ commit, state }, payload) {
      state.loginUser.tags = payload;
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
