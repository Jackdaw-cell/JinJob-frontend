import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import { MessagePlugin } from "tdesign-vue-next";

router.beforeEach(async (to, from, next) => {
  let loginUser = store.state.user.loginUser;
  // 如果之前没登陆过，自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等用户登录成功之后，再执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }
  if (to.path == "/user/login" || to.path == "/user/register") {
    next();
  } else {
    if (!loginUser || loginUser.userRole == "notLogin" || !loginUser.userId) {
      MessagePlugin.error("请先登录");
      next("/user/login");
      return;
    }
    next();
  }
  next();
  // needAccess从to.meta取出路由的访问权限
  //    空 - NOT_LOGIN （无需登录）、
  //    USER - 登录用户才可访问
  //    ADMIN - 管理员才可访问
  // const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面必须要登陆
  // 如果没登陆，跳转到登录页面
  // if (loginUser.userName !== "未登录") {
  //   next();
  // } else {
  //   return { name: "/user/login" };
  // }
  // if (!loginUser || loginUser.userRole == "notLogin") {
  //   next("/user/login");
  //   return;
  // }
  // next();
});
