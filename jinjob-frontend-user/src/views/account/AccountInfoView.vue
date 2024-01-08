<template>
  <div v-if="userInfo" :class="userInfo.background">
    <t-row justify="center">
      <t-col :span="2">
        <div class="menu-demo">
          <a-menu
            :selected-keys="selectedKeys"
            @menu-item-click="doMenuClick"
            :default-selected-keys="defaultSelectedKey"
            id="accountInfoMenu"
          >
            <a-menu-item key="/accountInfo/account" @click="doUserInfoPage">
              个人信息
            </a-menu-item>
            <a-menu-item
              key="/accountInfo/collection"
              @click="doCollectionPage"
            >
              收藏夹
            </a-menu-item>
            <a-menu-item
              key="/accountInfo/appExamAnswer"
              @click="doExamAnswerPage"
            >
              模拟面试回答纪录
            </a-menu-item>
          </a-menu>
        </div>
      </t-col>
      <t-col :span="7" id="accountInfoItem">
        <router-view />
      </t-col>
    </t-row>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { MyControllerService } from "../../../generatedCode/userService/services/MyControllerService";
const store = useStore();
const { params } = useRoute();
const router = useRouter();
const userInfo = ref();
const loadData = async () => {
  console.log();
};
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
// 默认主页
const selectedKeys = ref(["/accountInfo/account"]);
const doUserInfoPage = () => {
  router.push({
    path: "/accountInfo/account",
  });
};
const doCollectionPage = () => {
  router.push({
    path: "/accountInfo/collection",
  });
};
const doExamAnswerPage = () => {
  router.push({
    path: "/accountInfo/appExamAnswer",
  });
};
// 路由跳转后，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
/**
 * 页面加载时，请求数据
 */
onMounted(async () => {
  const res = await MyControllerService.getUserInfoUsingGet();
  if (res.code == 0) {
    userInfo.value = res.data;
  }
  loadData();
});
</script>

<style scoped>
.wave-haikei {
  background: url("src/wave-haikei.svg") 0% 0% / cover;
}
.steps-haikei {
  background: url("src/stacked-steps-haikei.svg") 0% 0% / cover;
}
.peaks-haikei {
  background: url("src/stacked-peaks-haikei.svg") 0% 0% / cover;
}
#accountInfoMenu {
  min-height: 40rem;
}
#accountInfoItem {
  background-color: white;
  min-height: 40rem;
}
</style>
