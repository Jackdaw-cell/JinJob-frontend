<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img
              class="logo"
              src="../assets/logo_20240102_uugai.com-1704176520108.png"
            />
            <!--            <div class="title">JinJob</div>-->
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="10rem">
      <t-space>
        <a-tooltip content="快来发表你的面试经历/编程经验吧~">
          <t-button
            shape="circle"
            variant="dashed"
            v-if="store.state.user?.loginUser?.nickName"
            @click="addShare"
          >
            <SystemLogIcon />
          </t-button>
        </a-tooltip>
        <t-dropdown :options="options" @click="clickHandler">
          <t-button variant="text">
            {{ store.state.user?.loginUser?.nickName ?? "此处登录" }}
            <template #suffix><chevron-down-icon size="16" /></template>
          </t-button>
        </t-dropdown>
      </t-space>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
const router = useRouter();
const store = useStore();
import { ChevronDownIcon, SystemLogIcon } from "tdesign-icons-vue-next";
import { MessagePlugin } from "tdesign-vue-next";

const options = [
  {
    content: "详细信息",
    value: 1,
  },
  {
    content: "退出登录",
    value: 2,
  },
];

const clickHandler = (data: { content: any; value: number }) => {
  if (data.value == 2) {
    doOutLogin();
  }
  if (data.value == 1) {
    //详细信息
    doUserDetail();
  }
};
const doUserDetail = async () => {
  router.push({
    path: "/accountInfo/account",
  });
};
const doOutLogin = async () => {
  localStorage.setItem("token", "");
  await store.dispatch("user/getLoginUser");
  router.push({
    path: "/user/login",
  });
};
const addShare = async () => {
  router.push({
    path: "/addShare",
  });
};
// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "管理员",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #05b4f8;
  margin-left: 16px;
  font-size: 2rem;
}

.logo {
  height: 6rem;
}
</style>
