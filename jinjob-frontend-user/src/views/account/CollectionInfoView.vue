<template>
  <div style="min-height: 40rem; padding: 2rem">
    <t-list :split="true">
      <template #header>
        <t-head-menu v-model="menu1Value" theme="light" @change="changeHandler">
          <t-menu-item :value="0"> 文章 </t-menu-item>
          <t-menu-item :value="1"> 面试题 </t-menu-item>
        </t-head-menu>
      </template>
      <div v-if="menu1Value == 0">
        <a-empty v-if="shareList.length <= 0" />
        <t-list-item v-for="item in shareList" :key="item">
          <template #content>
            <span>
              <t-image
                :src="`/api/admin/file/getImage/${item.coverPath}`"
                :style="{ width: '120px' }"
              ></t-image>
            </span>
            <div>
              <h3>{{ item.title }}</h3>
              <div>
                <UserVisibleIcon />{{ item.readCount }} <HeartIcon />{{
                  item.collectCount
                }}
              </div>
            </div>
          </template>
          <template #action>
            <span>
              <t-link
                theme="primary"
                hover="color"
                style="margin-left: 16px"
                @click="articleShowPage(item.shareId)"
                >查看</t-link
              >
              <t-link
                theme="primary"
                hover="color"
                style="margin-left: 16px"
                @click="cancelCollect(item.shareId, menu1Value)"
                >取消收藏</t-link
              >
            </span>
          </template>
        </t-list-item>
      </div>
      <div v-if="menu1Value == 1">
        <a-empty v-if="questionList.length <= 0" />
        <t-list-item v-for="item in questionList" :key="item">
          <template #content>
            <h3>{{ item.title }}</h3>
          </template>
          <template #action>
            <t-rate
              :default-value="item.difficultyLevel"
              size="16"
              disabled
            ></t-rate>
            <span>
              <t-link
                theme="primary"
                hover="color"
                style="margin-left: 16px"
                @click="questionShowPage(item.questionId)"
                >查看</t-link
              >
              <t-link
                theme="primary"
                hover="color"
                style="margin-left: 16px"
                @click="cancelCollect(item.questionId, menu1Value)"
                >取消收藏</t-link
              >
            </span>
          </template>
        </t-list-item>
      </div>
      <template #footer>
        <!--        <t-pagination-->
        <!--          :total="total"-->
        <!--          :showPageNumber="false"-->
        <!--          :showPageSize="false"-->
        <!--          showPreviousAndNextBtn-->
        <!--          :totalContent="false"-->
        <!--          showFirstAndLastPageBtn-->
        <!--          v-model="current"-->
        <!--          v-model:pageSize="pageSize"-->
        <!--          @current-change="onCurrentChange"-->
        <!--        />-->
      </template>
    </t-list>
  </div>
</template>

<script setup lang="ts">
import { HeartIcon, UserVisibleIcon } from "tdesign-icons-vue-next";
import { MessageInfoOptions, MessagePlugin } from "tdesign-vue-next";
import { MyControllerService } from "../../../generatedCode/userService/services/MyControllerService";
import { onMounted, reactive, ref } from "vue";
import { UserAccountSaveRequest } from "../../../generatedCode/userService";
import {
  AppUserCollectControllerService,
  QuestionInfo,
  ShareInfo,
} from "../../../generatedCode/questionService";
import { useRouter } from "vue-router";
const shareList = ref<Array<ShareInfo> | undefined>([]);
let questionList = ref<Array<QuestionInfo> | undefined>([]);
const menu1Value = ref(0);
const router = useRouter();
const changeHandler = (active: any) => {
  loadList();
};
const current = ref(0);
const pageSize = ref(10);
const total = ref(0);
let formData = reactive<UserAccountSaveRequest>({
  userId: "",
  nickName: "",
  sex: 0,
  email: "",
  avatar: "",
  tags: "",
  description: "",
  background: "",
});
const tags = ref([]);
const onCurrentChange = (index: any, pageInfo: any) => {
  MessagePlugin.success(`转到第${index}页`);
  console.log(pageInfo);
};
const onReset = () => {
  MessagePlugin.success("重置成功");
};
const loadList = async () => {
  //0文章、1八股文、2考试题目
  const res = await MyControllerService.loadCollectUsingGet(menu1Value.value);
  if (res.code == 0) {
    if (menu1Value.value == 0) {
      shareList.value = res.data?.list;
    } else if (menu1Value.value == 1) {
      questionList.value = res.data?.list;
    }
  }
};
const articleShowPage = (shareId: number) => {
  router.push({
    path: `/articleShow/${shareId}`,
  });
};
const questionShowPage = async (questionId: number) => {
  router.push({
    path: `/questionShow/${questionId}`,
  });
};
const cancelCollect = async (objectId: any, menu1Value: any) => {
  var res = await AppUserCollectControllerService.cancelCollectUsingPost({
    collectType: menu1Value,
    objectId,
  });
  if (res.code == 0) {
    await MessagePlugin.success("取消收藏成功");
    loadList();
  }
};
const loadData = async () => {
  loadList();
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style scoped>
.input {
  max-width: 70%;
}
</style>
