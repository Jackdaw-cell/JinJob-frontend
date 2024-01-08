<template>
  <div id="questionsView">
    <t-row justify="space-around">
      <t-col :span="9">
        <h2>面试官：{{ question.title }}</h2>
        <t-comment
          avatar="https://tdesign.gtimg.com/site/avatar.jpg"
          :author="question.createUserName"
          :datetime="question.createTime"
          content="JinJob面试官"
        />
        <t-card style="min-height: 30rem; margin: 2rem 2rem">
          <t-row justify="space-around">
            <t-col>
              <Inplace class="container">
                <template #display>
                  <t-button variant="outline" theme="default"
                    >揭晓答案</t-button
                  >
                </template>
                <template #content>
                  <t-watermark
                    :watermark-content="{ text: 'JinJob面试通出品' }"
                    :y="400"
                    :x="400"
                    :width="400"
                    :height="400"
                  >
                    <p class="m-0" v-html="question.answerAnalysis"></p>
                  </t-watermark>
                </template>
              </Inplace>
              <!--              <Inplace class="container">-->
              <!--                <template #display>-->
              <!--                  <t-button variant="outline" theme="default"-->
              <!--                    >揭晓答案</t-button-->
              <!--                  >-->
              <!--                </template>-->
              <!--                <template #content>-->
              <!--                  <t-watermark-->
              <!--                    :watermark-content="{ text: 'JinJob面试通出品' }"-->
              <!--                    :y="400"-->
              <!--                    :x="400"-->
              <!--                    :width="400"-->
              <!--                    :height="400"-->
              <!--                  >-->
              <!--                    <p class="m-0" v-html="question.answerAnalysis"></p>-->
              <!--                  </t-watermark>-->
              <!--                </template>-->
              <!--              </Inplace>-->
            </t-col>
          </t-row>
        </t-card>
        <t-row justify="space-around">
          <t-col :span="1">
            <UserVisibleIcon size="2em" />{{ question.readCount }}
          </t-col>
          <t-col>
            <t-button
              type="submit"
              shape="round"
              variant="dashed"
              @click="addCollect(question.questionId)"
            >
              <HeartIcon size="1.4em" />
              <t-space>{{ question.collectCount }}</t-space>
            </t-button>
            <t-space>添加到错题本,方便日后复习</t-space>
          </t-col>
        </t-row>
      </t-col>
      <t-col :span="3">
        <a-scrollbar style="max-height: 40rem; overflow: auto">
          <t-list :split="true" size="small">
            <template #header> 可能还会问 </template>
            <t-list-item v-for="item in otherQuestionList" :key="item">
              {{ item.title }}
              <t-rate
                :default-value="item.difficultyLevel"
                size="16"
                disabled
              ></t-rate>
            </t-list-item>
          </t-list>
        </a-scrollbar>
      </t-col>
    </t-row>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Inplace from "primevue/inplace";
import {
  AppExamControllerService,
  AppUserCollectControllerService,
  QuestionControllerService,
  QuestionInfo,
} from "../../../generatedCode/questionService";
import { onMounted, ref } from "vue";
import { HeartIcon, UserVisibleIcon } from "tdesign-icons-vue-next";
import { MessagePlugin } from "tdesign-vue-next";
const { params } = useRoute();
const questionId = ref(0);
let otherQuestionList = ref<Array<QuestionInfo | undefined>>([]);
const question = ref<QuestionInfo | undefined>({
  questionId: -1,
  title: "",
  categoryId: -1,
  categoryName: "",
  difficultyLevel: -1,
  question: undefined,
  answerAnalysis: "",
  createTime: "",
  status: -1,
  createUserId: "",
  createUserName: "",
  readCount: -1,
  collectCount: -1,
  postUserType: undefined,
  haveCollect: false,
  collectId: undefined,
});
questionId.value = parseInt(params.questionId as string);
const addCollect = async (objectId: string) => {
  var res = await AppUserCollectControllerService.addCollectUsingPost({
    collectType: 1,
    objectId,
  });
  if (res.code == 0) {
    await MessagePlugin.success("收藏成功");
  }
};
const loadOtherQuestion = async () => {
  if (question.value) {
    const res = await QuestionControllerService.loadQuestionUsingPost(
      question.value.categoryId,
      1,
      5
    );
    if (res.code == 0) {
      res.data.list.forEach((item: QuestionInfo) => {
        otherQuestionList.value.push(item);
      });
    }
  }
};
const loadData = async () => {
  const res = await QuestionControllerService.getQuestionDetailUsingPost(
    questionId.value
  );
  if (res.code == 0) {
    question.value = res.data;
  }
  await loadOtherQuestion();
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
