<template>
  <div style="min-height: 40rem; padding: 2rem">
    <t-list :split="true">
      <template #header> </template>
      <div v-if="menu1Value == 0">
        <a-empty v-if="examAnswerList.length <= 0" />
        <t-list-item v-for="item in examAnswerList" :key="item">
          <template #content>
            <div>
              <h3>模拟面试</h3>
              <div>
                <t-tag v-if="categoryOptions">{{
                  categoryValue(item.categoryId)
                }}</t-tag>
                <t-space style="margin: 0 1rem">
                  {{ item.score || 0 }}分
                </t-space>
                <t-space style="margin: 0 1rem">
                  于{{ DateFomat(new Date(item.updateTime)) }}作答
                </t-space>
              </div>
            </div>
          </template>
          <template #action>
            <span>
              <t-link
                theme="primary"
                hover="color"
                style="margin-left: 16px"
                @click="examAnswerShowPage(item.id)"
                >查看</t-link
              >
            </span>
          </template>
        </t-list-item>
      </div>
      <template #footer>
        <t-pagination
          :total="total"
          :showPageNumber="false"
          :showPageSize="false"
          showPreviousAndNextBtn
          :totalContent="false"
          showFirstAndLastPageBtn
          v-model="current"
          v-model:pageSize="pageSize"
          @current-change="onCurrentChange"
        />
      </template>
    </t-list>
    <t-dialog
      v-model:visible="examAnswerVisible"
      body="对话框内容"
      :close-btn="false"
      :on-close="close5"
      :cancel-btn="null"
      @confirm="onClickConfirm"
      width="80%"
    >
      <template #header>
        <div>
          <span style="vertical-align: middle">模拟面试</span>
        </div>
      </template>
      <template #body>
        <a-scrollbar style="height: 600px; overflow: auto; padding: 4rem">
          <t-list :split="true" stripe>
            <t-list-item v-for="(item, index) in commentsData" :key="index">
              <template #content>
                <t-comment>
                  <template #content>
                    <t-tag v-if="item.chatOption == 0" theme="primary"
                      >问</t-tag
                    >
                    <t-tag v-if="item.chatOption == 1" theme="primary"
                      >答</t-tag
                    >
                    <t-space style="margin: 0 5px">{{ item.author }}</t-space>
                    <a-scrollbar style="max-height: 200px; overflow: auto">
                      <p v-if="item.userContent" v-html="item.userContent"></p>
                      <p v-html="item.content"></p>
                    </a-scrollbar>
                  </template>
                </t-comment>
              </template>
            </t-list-item>
          </t-list>
        </a-scrollbar>
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessageInfoOptions, MessagePlugin } from "tdesign-vue-next";
import { onMounted, reactive, ref } from "vue";
import {
  AppUserCollectControllerService,
  Category,
  IndexControllerService,
  QuestionControllerService,
  QuestionInfo,
  ShareInfo,
} from "../../../generatedCode/questionService";
import { useRouter } from "vue-router";
import { AppExamAnswer } from "../../../generatedCode/questionService/models/AppExamAnswer";
const examAnswerList = ref<Array<AppExamAnswer> | undefined>([]);
const menu1Value = ref(0);
const router = useRouter();
const current = ref(0);
const pageSize = ref(5);
const total = ref(0);
const tags = ref([]);
const categoryList = ref<Category[]>([]);
const categoryOptions = ref<Array<{ label: string; value: number }>>([]);
const onCurrentChange = (index: any, pageInfo: any) => {
  loadExamAnswerList(index, pageSize.value);
};
const onReset = () => {
  MessagePlugin.success("重置成功");
};
const categoryValue = (categoryId: number) => {
  let categoryName;
  categoryOptions.value.forEach((item) => {
    if (item.value == categoryId) {
      categoryName = item.label;
    }
  });
  return categoryName;
};
const loadCategoryList = async () => {
  const categoryRes = await IndexControllerService.loadAllCategoryUsingGet(0);
  if (categoryRes.code == 0 && categoryRes.data) {
    categoryList.value = categoryRes.data;
    categoryList.value.forEach((item) => {
      if (item.categoryName && item.categoryId) {
        return categoryOptions.value.push({
          label: item.categoryName,
          value: item.categoryId,
        });
      }
    });
  }
};
const loadExamAnswerList = async (
  current: number | undefined,
  pageSize: number | undefined
) => {
  const res = await QuestionControllerService.loadAppExamAnswer(
    current,
    pageSize
  );
  if (res.code == 0) {
    examAnswerList.value = res.data?.list;
    total.value = res.data?.totalCount;
  }
};
const loadData = async () => {
  loadCategoryList();
  loadExamAnswerList(current.value, pageSize.value);
};
let examAnswerVisible = ref(false);
let examAnswerId = ref("");
const appExamAnswer = ref<AppExamAnswer>();
const commentsData = ref<
  Array<{
    id: number | undefined;
    authorType: number;
    chatOption: number;
    content: string | undefined;
    userContent: string | undefined;
  }>
>([]);
const examAnswerShowPage = async (id: string) => {
  examAnswerId.value = id;
  const res = await QuestionControllerService.getAppExamAnswerDetail(
    examAnswerId.value
  );
  if (res.code == 0) {
    examAnswerVisible.value = true;
    appExamAnswer.value = res.data;
    if (
      appExamAnswer.value &&
      appExamAnswer.value?.appExamAnswerQuestionInfoList.length > 0
    ) {
      appExamAnswer.value?.appExamAnswerQuestionInfoList.forEach(
        async (item) => {
          if (item) {
            const questionRes =
              await QuestionControllerService.getQuestionDetailUsingPost(
                item.questionId
              );
            if (questionRes.code == 0) {
              commentsData.value.push({
                id: item.questionId,
                authorType: 1,
                chatOption: 0,
                content: questionRes?.data.question,
                userContent: "",
              });
              commentsData.value.push({
                id: item.questionId,
                authorType: 1,
                chatOption: 1,
                content: "<h4>参考回答</h4>" + item?.answer,
                userContent:
                  "<h4>个人作答</h4>" +
                  (item.userAnswer ||
                    "<h5 style='color: darkred'>你未作答</h5>"),
              });
            }
          }
        }
      );
    }
  }
};
const onClickConfirm = (context: { e: any }) => {
  const { e } = context;
  examAnswerVisible.value = false;
  e.stopPropagation();
};
const DateFomat = (inputDate: Date) => {
  // 提取日期、时间等信息
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0"); // 月份从0开始，需要加1
  const day = inputDate.getDate().toString().padStart(2, "0");
  const hours = inputDate.getHours().toString().padStart(2, "0");
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");
  const seconds = inputDate.getSeconds().toString().padStart(2, "0");

  // 构造新的日期字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const close5 = () => {
  examAnswerVisible.value = false;
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
