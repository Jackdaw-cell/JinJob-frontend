import { RouteRecordRaw } from "vue-router";
import HomeView from "@/views/ExampleView.vue";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import AddQuestionView from "@/views/OjQuestion/AddQuestionView.vue";
import ManageQuestionView from "@/views/OjQuestion/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsListView.vue";
import QuestionSubmitView from "@/views/OjQuestion/OjQuestionSubmiterListView.vue";
import ViewQuestionView from "@/views/OjQuestion/OjQuestionSubmitView.vue";
import UpdateQuestionView from "@/views/question/UpdateQuestionView.vue";
import WrongView from "@/views/WrongView.vue";
import OjQuestionsView from "@/views/OjQuestion/OjQuestionListView.vue";
import IndexView from "@/views/Index/IndexView.vue";
import ExamView from "@/views/Exam/ExamView.vue";
import ExamsSubmitView from "@/views/Exam/ExamsSubmitView.vue";
import ExamsShowView from "@/views/Exam/ExamsShowView.vue";
import QuestionsShowView from "@/views/question/QuestionsShowView.vue";
import ArticleShowView from "@/views/Index/ArticleShowView.vue";
import AccountInfoView from "@/views/account/AccountInfoView.vue";
import UserInfoView from "@/views/account/UserInfoView.vue";
import CollectionInfoView from "@/views/account/CollectionInfoView.vue";
import ArticleAddView from "@/views/Index/ArticleAddView.vue";
import QuestionsSubmitView from "@/views/question/QuestionsSubmitView.vue";
import AppExamAnswerView from "@/views/account/AppExamAnswerView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/addShare",
    name: "新增文章",
    component: ArticleAddView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/",
    name: "主页",
    component: IndexView,
  },
  {
    path: "/articleShow/:shareId",
    name: "文章详情",
    component: ArticleShowView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/ojQuestions",
    name: "模拟机试",
    component: OjQuestionsView,
  },
  {
    path: "/ojQuestion",
    name: "机试提交榜",
    component: QuestionSubmitView,
  },
  {
    path: "/view/ojQuestion/:id",
    name: "在线编程",
    component: ViewQuestionView,
    props: true,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/questions",
    name: "八股文界面",
    component: QuestionsView,
  },
  {
    path: "/examQuestionSubmit/:categoryId",
    name: "模拟连场面试界面",
    component: QuestionsSubmitView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/questionSubmit/:categoryId",
    name: "模拟面试界面",
    component: QuestionsSubmitView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/questionShow/:questionId",
    name: "八股文详情",
    component: QuestionsShowView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/exam",
    name: "笔试真题",
    component: ExamView,
  },
  {
    path: "/examSubmit",
    name: "考试界面",
    component: ExamsSubmitView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/accountInfo",
    name: "个人",
    component: AccountInfoView,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/accountInfo/account",
        name: "个人信息",
        component: UserInfoView,
      },
      {
        path: "/accountInfo/collection",
        name: "收藏夹",
        component: CollectionInfoView,
      },
      {
        path: "/accountInfo/appExamAnswer",
        name: "模拟面试纪录",
        component: AppExamAnswerView,
      },
    ],
  },
  {
    path: "/examShow/:examid",
    name: "考试分析",
    component: ExamsShowView,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/add/question",
  //   name: "创建题目",
  //   component: AddQuestionView,
  //   meta: {
  //     // access: ACCESS_ENUM.USER,
  //   },
  // },
  // {
  //   path: "/update/question",
  //   name: "更新题目",
  //   component: UpdateQuestionView,
  //   meta: {
  //     // access: ACCESS_ENUM.USER,
  //     hideInMenu: true,
  //   },
  // },
  // {
  //   path: "/manage/question/",
  //   name: "管理题目",
  //   component: ManageQuestionView,
  //   meta: {
  //     // access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/",
  //   name: "主页",
  //   component: QuestionsView,
  // },
  // {
  //   path: "/hide",
  //   name: "隐藏页面",
  //   component: HomeView,
  //   meta: {
  //     hideInMenu: true,
  //   },
  // },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/wrong",
    name: "服務器故障",
    component: WrongView,
    meta: {
      hideInMenu: true,
    },
  },
  // {
  //   path: "/admin",
  //   name: "管理员可见",
  //   component: AdminView,
  //   meta: {
  //     access: ACCESS_ENUM.ADMIN,
  //   },
  // },
  // {
  //   path: "/about",
  //   name: "关于我的",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];
