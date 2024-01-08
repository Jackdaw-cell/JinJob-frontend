<template>
  <div id="questionsSubmitView">
    <t-row justify="space-around">
      <t-col :span="9">
        <t-card style="min-height: 30rem; margin: 2rem 2rem">
          <t-row>
            <t-col flex="auto" :span="24">
              <Inplace class="container">
                <template #display>
                  <t-row justify="space-around">
                    <t-col flex="auto">
                      <t-card
                        :title="title"
                        :subtitle="subtitle"
                        :cover="cover"
                      >
                        <template #header>
                          <t-divider align="center" dashed>
                            <h1>模拟面试</h1>
                          </t-divider>
                        </template>
                        <ul>
                          <li>你将开始进行机器连问环节</li>
                          <li>你需要回答机器提出的面试题</li>
                          <li>尽可能使回答命中机器标准答案</li>
                          <li>祝你好运~</li>
                        </ul>
                        <template #footer>
                          <t-row
                            :align="'middle'"
                            justify="center"
                            style="gap: 24px"
                          >
                            <t-col
                              flex="auto"
                              style="
                                display: inline-flex;
                                justify-content: center;
                              "
                            >
                              <t-button
                                style="width: 20rem"
                                variant="outline"
                                theme="default"
                                @click="startExam"
                                >开始</t-button
                              >
                            </t-col>
                          </t-row>
                        </template>
                      </t-card>
                    </t-col>
                  </t-row>
                </template>
                <template #content>
                  <t-watermark
                    :watermark-content="{ text: 'JinJob面试通出品' }"
                    :y="400"
                    :x="400"
                    :width="400"
                  >
                    <div>
                      <a-scrollbar style="height: 600px; overflow: auto">
                        <t-list :split="true" stripe>
                          <t-list-item
                            v-for="(item, index) in commentsData"
                            :key="index"
                          >
                            <template #content>
                              <t-comment :datetime="item.datetime">
                                <template #avatar>
                                  <a-avatar>
                                    <img
                                      v-if="item.avatar"
                                      alt="avatar"
                                      :src="item.avatar"
                                    />
                                    <DogeIcon v-else-if="!item.avatar" />
                                  </a-avatar>
                                </template>
                                <template #author>
                                  <t-tag
                                    v-if="item.authorType == 1"
                                    theme="primary"
                                    >面试官</t-tag
                                  >
                                  <t-tag v-if="item.authorType == 2"
                                    >系统</t-tag
                                  >
                                  <t-space style="margin: 0 5px">{{
                                    item.author
                                  }}</t-space>
                                  <t-space style="margin: 0 0 0 1rem">
                                    <h5
                                      v-if="item.chatOption == 0"
                                      style="color: #f8a000"
                                    >
                                      提问于
                                    </h5>
                                    <h5
                                      v-else-if="item.chatOption == 1"
                                      style="color: #0052d9"
                                    >
                                      回答于
                                    </h5>
                                    <h5
                                      v-else-if="item.chatOption == 2"
                                      style="color: #0052d9"
                                    >
                                      解释于
                                    </h5>
                                  </t-space>
                                </template>
                                <template #content>
                                  <p v-html="item.content"></p>
                                </template>
                              </t-comment>
                            </template>
                          </t-list-item>
                        </t-list>
                      </a-scrollbar>
                      <div style="padding: 1rem">
                        <t-comment>
                          <template #content>
                            <t-row>
                              <t-col flex="auto">
                                <t-textarea
                                  v-model="replyData"
                                  :disabled="answerAble"
                                  placeholder="请输入内容"
                                  style="width: 100%"
                                >
                                </t-textarea>
                              </t-col>
                              <t-col flex="none">
                                <t-button
                                  class="form-submit"
                                  @click="submitReply"
                                  :disabled="answerAble"
                                  >回复</t-button
                                >
                              </t-col>
                            </t-row>
                          </template>
                        </t-comment>
                      </div>
                    </div>
                  </t-watermark>
                </template>
              </Inplace>
            </t-col>
          </t-row>
        </t-card>
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
import { MessagePlugin, NotifyPlugin } from "tdesign-vue-next";
import CommentList from "@/components/CommentList.vue";
import { AppExamAnswer } from "../../../generatedCode/questionService/models/AppExamAnswer";
import { useStore } from "vuex";
const { params } = useRoute();
const categoryId = ref(0);
let otherQuestionList = ref<Array<QuestionInfo | undefined>>([]);
const appExamAnswer = ref<AppExamAnswer>();
import { useToast } from "primevue/usetoast";
import { DogeIcon } from "tdesign-icons-vue-next";
const toast = useToast();
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
categoryId.value = parseInt(params.categoryId as string);
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
  console.log();
};
const startExam = async () => {
  const res = await QuestionControllerService.createAppExamAnswer(
    categoryId.value,
    1,
    5
  );
  if (res.code == 0) {
    appExamAnswer.value = res.data;
    if (
      appExamAnswer.value &&
      appExamAnswer.value?.appExamAnswerQuestionInfoList.length > 0
    ) {
      if (appExamAnswer.value?.appExamAnswerQuestionInfoList[0]) {
        commentsData.value.push({
          id: appExamAnswer.value?.appExamAnswerQuestionInfoList[0].questionId,
          avatar: "https://tdesign.gtimg.com/site/avatar.jpg",
          author:
            appExamAnswer.value?.appExamAnswerQuestionInfoList[0]
              .createUserName,
          authorType: 1,
          chatOption: 0,
          datetime: DateFomat(new Date()),
          content:
            appExamAnswer.value?.appExamAnswerQuestionInfoList[0].question,
        });
      }
    }
  }
};
const commentsData = ref<
  Array<{
    id: number | undefined;
    avatar: string;
    author: string | undefined;
    authorType: number;
    chatOption: number;
    datetime: string | undefined;
    content: string | undefined;
  }>
>([]);
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
const replyData = ref("");
const answerIndex = ref(0);
const store = useStore();
const loginUser = store.state.user?.loginUser;
const answerAble = ref(false);
const submitReply = async () => {
  answerAble.value = true;
  // eslint-disable-next-line no-undef
  let timerId: string | number | NodeJS.Timeout | undefined;
  const res = await QuestionControllerService.postAppExamAnswerQuestion(
    appExamAnswer.value?.appExamAnswerQuestionInfoList[answerIndex.value]
      .questionId,
    appExamAnswer.value?.id,
    replyData.value,
    1,
    1
  )
    .then(async (res) => {
      if (res.code == 0) {
        console.log(loginUser);
        commentsData.value.push({
          id: appExamAnswer.value?.appExamAnswerQuestionInfoList[
            answerIndex.value
          ].questionId,
          avatar: JSON.parse(loginUser.avatar)
            ? "http://localhost:8080/" + JSON.parse(loginUser.avatar)
            : "",
          author: "你",
          authorType: 0,
          chatOption: 1,
          datetime: DateFomat(new Date()),
          content: replyData.value,
        });
        commentsData.value.push({
          id: appExamAnswer.value?.appExamAnswerQuestionInfoList[
            answerIndex.value
          ].questionId,
          avatar: "https://tdesign.gtimg.com/site/avatar.jpg",
          author:
            appExamAnswer.value?.appExamAnswerQuestionInfoList[
              answerIndex.value
            ].createUserName,
          authorType: 1,
          chatOption: 2,
          datetime: DateFomat(new Date()),
          content: `${res.data.answer}<br>你的准确率为<strong style="color: #0052d9">${res.data.accuracy}</strong>`,
        });
        replyData.value = "";
        answerIndex.value++;
        await askQuestion();
        //判断是否为最后一个问题 是-继续提问 ，否-提交答卷
        if (
          appExamAnswer?.value?.appExamAnswerQuestionInfoList &&
          answerIndex.value <
            appExamAnswer?.value?.appExamAnswerQuestionInfoList?.length
        ) {
          commentsData.value.push({
            id: appExamAnswer.value?.appExamAnswerQuestionInfoList[
              answerIndex.value
            ].questionId,
            avatar: "https://tdesign.gtimg.com/site/avatar.jpg",
            author:
              appExamAnswer.value?.appExamAnswerQuestionInfoList[
                answerIndex.value
              ].createUserName,
            authorType: 1,
            chatOption: 0,
            datetime:
              appExamAnswer.value?.appExamAnswerQuestionInfoList[
                answerIndex.value
              ].createTime,
            content:
              appExamAnswer.value?.appExamAnswerQuestionInfoList[
                answerIndex.value
              ].question,
          });
        }
        if (
          appExamAnswer?.value?.appExamAnswerQuestionInfoList &&
          answerIndex.value >=
            appExamAnswer?.value?.appExamAnswerQuestionInfoList?.length
        ) {
          const examRes = await QuestionControllerService.postAppExamAnswer(
            appExamAnswer.value.id
          );
          if (examRes.code == 0) {
            answerAble.value = true;
            commentsData.value.push({
              id: 0,
              avatar: "https://tdesign.gtimg.com/site/avatar.jpg",
              author: "",
              authorType: 2,
              chatOption: 3,
              datetime: DateFomat(new Date()),
              content: `你本轮面试已结束，总体分数为 <strong style="color: #0052d9">${examRes.data.score}</strong>。平台标准答案仅供参考，一切作答以客观事实为准`,
            });
          }
          return;
        }
      }
      answerAble.value = false;
    })
    .finally(() => {
      console.log(answerIndex.value);
    });
};
const askQuestion = () => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style scoped>
#questionsSubmitView {
  margin: 0 auto;
}
.container {
  justify-content: center;
  align-items: center;
}
</style>
