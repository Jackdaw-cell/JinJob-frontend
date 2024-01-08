// initial state
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { LoginControllerService } from "../../generatedCode/userService";

export default {
  namespaced: true,
  state: {
    tags: [],
  },
  actions: {
    async updateTags({ commit, state }, payload) {
      state.tags = payload;
    },
  },
} as StoreOptions<any>;
