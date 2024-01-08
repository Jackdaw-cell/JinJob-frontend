// Add a request interceptor
import axios from "axios";
import store from "@/store";
import message from "@arco-design/web-vue/es/message";
import router from "@/router";

axios.defaults.withCredentials = true;

//全局请求拦截器
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  async function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status == 200) {
      if (response.data.code == 40100) {
        await store.dispatch("user/initLoginUser");
      }
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
