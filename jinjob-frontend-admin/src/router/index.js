import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "登录",
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/Layout.vue'),
      children: [{
        path: "/home",
        name: "首页",
        component: () => import('../views/home/Home.vue'),
      }, {
        path: "/content/category",
        name: "分类管理",
        component: () => import('../views/content/CategoryList.vue'),
      }, {
        path: "/content/question",
        name: "问题管理",
        component: () => import('../views/content/QuestionList.vue'),
      }, {
        path: "/content/exam",
        name: "考试题库",
        component: () => import('../views/content/ExamQuestionList.vue'),
      }, {
        path: "/content/share",
        name: "面试分享",
        component: () => import('../views/content/ShareInfoList.vue'),
      },{
        path: "/content/ojQuestion",
        name: "编程题题库",
        component: () => import('../views/content/OjQuestionList.vue'),
      },{
        path: "/content/ojQuestionEdit",
        name: "编程题新增/修改",
        component: () => import('../views/content/OjQuestionEdit.vue'),
      },
      //   {
      //   path: "/app/userDevice",
      //   name: "用户设备",
      //   component: () => import('../views/app/UserDevice.vue'),
      // },
        {
        path: "/app/user",
        name: "用户管理",
        component: () => import('../views/app/UserList.vue'),
      },
        {
          path: "/app/exam",
          name: "考试管理",
          component: () => import('../views/app/ExamList.vue'),
        },
        {
          path: "/app/ojSubmit",
          name: "编程提交管理",
          component: () => import('../views/app/OjSubmitList.vue'),
        },
      //   {
      //   path: "/app/updateList",
      //   name: "App发布",
      //   component: () => import('../views/app/UpdateList.vue'),
      // },
        {
        path: "/app/carouselList",
        name: "轮播图",
        component: () => import('../views/app/CarouselList.vue'),
      }, {
        path: "/app/feedbackList",
        name: "问题反馈",
        component: () => import('../views/app/FeedbackList.vue'),
      }, {
        path: "/setting/menu",
        name: "菜单管理",
        component: () => import('../views/setting/MenuList.vue'),
      }, {
        path: "/setting/role",
        name: "角色管理",
        component: () => import('../views/setting/RoleList.vue'),
      }, {
        path: "/setting/user",
        name: "系统用户",
        component: () => import('../views/setting/UserList.vue'),
      }]
    },
  ]
})

router.beforeEach((to, from, next) => {
  const userInfo = sessionStorage.getItem("userInfo");
  if (!userInfo && to.path != "/login") {
    router.push("/login");
  }
  next();
})

export default router
