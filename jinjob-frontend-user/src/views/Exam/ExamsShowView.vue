<template>
  <div>
    <t-loading :loading="loading" text="加载中..." fullscreen />
    <a-row :gutter="[24, 24]" justify="center">
      <t-col :span="1">
        <Button
          label="上一题"
          text
          @click="current = current - 2 < 0 ? 0 : current - 1"
          v-if="current > 0"
        />
      </t-col>
      <a-col :md="18" :xs="24">
        <t-swiper
          class="tdesign-demo-block--swiper"
          :current="current"
          :navigation="{ showSlideBtn: 'never' }"
          :autoplay="false"
          :loop="false"
          trigger="click"
          :type="swiperType"
          height="800"
        >
          <t-swiper-item
            v-for="(item, index) of examQuestionList"
            :key="index"
            @click="swiperItemClick"
          >
            <Listbox
              v-model="item.userAnswer"
              :options="item.questionItemList"
              optionLabel="label"
              optionValue="value"
              disabled
              metaKeySelection
              class="w-full md:w-50rem"
              listStyle="padding:1rem;"
            >
              <template #header>
                <a-row
                  :gutter="[24, 24]"
                  style="margin-top: 0.5rem; margin-left: 0.5rem"
                >
                  <a-col :md="19" :xs="24">
                    <div>
                      <span>{{ index + 1 }}、</span>
                      {{ item.title }}
                    </div>
                    <div v-html="item.question"></div>
                  </a-col>
                </a-row>
              </template>
              <template #footer>
                <Divider align="left" type="solid">
                  <b>解析</b>
                </Divider>
                <p class="m-0">你的答案：</p>
                <p
                  class="m-0 analysis-item"
                  v-for="userAnswerItem in item.userAnswerList"
                  :key="userAnswerItem"
                  :style="
                    item.userAnswer == item.questionAnswer
                      ? 'color: rgb(119, 148, 231);'
                      : 'color: red;'
                  "
                >
                  {{ item.questionItemList[userAnswerItem].label }};
                </p>
                <p class="m-0">正确答案：</p>
                <p
                  class="m-0 analysis-item"
                  v-for="answerItem in item.questionAnswerList"
                  :key="answerItem"
                  style="color: rgb(119, 148, 231)"
                >
                  {{ item.questionItemList[answerItem].label }};
                </p>
                <p class="m-0">解释：</p>
                <p class="m-0 analysis-item">
                  {{ item.answerAnalysis }}
                </p>
              </template>
            </Listbox>
          </t-swiper-item>
        </t-swiper>
      </a-col>
      <t-col :span="1">
        <Button
          label="下一题"
          text
          @click="
            current = current + 2 > examQuestionList.length ? 0 : current + 1
          "
        />
      </t-col>
    </a-row>
    <t-drawer
      :closeBtn="false"
      :footer="false"
      header
      v-model:visible="visible"
    >
      <t-row v-for="(i, idx) in answerCard" :key="idx">
        <t-col v-for="(j, jdx) in i" :key="jdx">
          <t-button variant="dashed" @click="answerCardShow(j)" theme="primary">
            <template #icon
              ><span v-if="j < 10">0</span>{{ j }}</template
            ></t-button
          >
        </t-col>
      </t-row>
    </t-drawer>
  </div>
</template>

<script setup lang="ts">
import {
  AppExamControllerService,
  AppExamVO,
  ExamQuestionVO,
} from "../../../generatedCode/questionService";

import Button from "primevue/button";
import { defineProps, onMounted, ref, withDefaults } from "vue";
import message from "@arco-design/web-vue/es/message";
import Listbox from "primevue/listbox";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
import Divider from "primevue/divider";

class questionItem {
  answerAnalysis?: string | undefined;
  answerResult?: number | undefined;
  difficultyLevel?: number | undefined;
  examId?: number | undefined;
  haveCollect?: boolean | undefined;
  question?: string | undefined;
  questionAnswer?: string | undefined;
  questionAnswerList?: Array<any> | undefined;
  questionId?: number | undefined;
  examQuestionList?:
    | {
        itemId?: number | undefined;
        questionId?: number | undefined;
        sort?: number | undefined;
        title?: string | undefined;
        label?: string | undefined;
        value?: string | undefined;
      }[]
    | undefined;
  questionType?: number | undefined;
  title?: string | undefined;
  userAnswer?: string | undefined;
  userAnswerList?: Array<any> | undefined;
}
const examId = ref(0);
const { params } = useRoute();
examId.value = parseInt(params.examid as string);
const swiperType = ref("card");
const answerCard = ref<Array<Array<number>>>([]);
const loading = ref(false);
const current = ref(0);
let examQuestionList = ref<Array<questionItem> | undefined>([]);
const visible = ref(false);
let userId = ref("");

const answerCardShow = (j: number) => {
  current.value = j - 1;
  visible.value = false;
};
const swiperItemClick = () => {
  if (swiperType.value == "card") {
    swiperType.value = "default";
  } else {
    swiperType.value = "card";
  }
};
const loadData = async () => {
  //获取考试题目
  const examQuestion = await AppExamControllerService.getExamQuestionUsingGet(
    examId.value as number
  );
  const appExam: questionItem | undefined = examQuestion.data;
  //对考试的所有30个题目进行配置
  appExam?.examQuestionList?.forEach((examQuestionItem: questionItem) => {
    let index = 0;
    //样式静态化配置
    let optionStatic = new Array<number>();
    //每题的选项静态化配置
    examQuestionItem.questionItemList?.forEach((questionAnswerItem) => {
      questionAnswerItem.label =
        numberToUpperCaseLetter(index) + "、" + questionAnswerItem.title;
      questionAnswerItem.value = index.toString();
      index++;
      optionStatic.push(0);
    });
    examQuestionItem.questionAnswerList =
      examQuestionItem.questionAnswer?.split(",");
    examQuestionItem.userAnswerList = examQuestionItem.userAnswer?.split("");
  });
  examQuestionList.value = appExam?.examQuestionList;
};
const numberToUpperCaseLetter = (num: number) => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const numStr = num.toString();
  let result = "";
  for (let i = 0; i < numStr.length; i++) {
    const digit = Number(numStr[i]);
    if (digit >= 0 && digit <= 9) {
      result += letters[digit];
    }
  }
  return result;
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style scoped>
.parent {
  display: flex;
  flex-direction: column; /* 父元素变为纵向排列 */
  align-items: flex-start; /* 子元素沿主轴左对齐 */
  justify-content: flex-start; /* 子元素沿交叉轴上对齐 */
  top: 10px;
}

/* 为父元素添加间隔 */
.parent::before {
  content: "";
  position: absolute;
  top: 10px; /* 设置顶部间隔为 10px */
  left: 0;
  right: 0;
  bottom: 0;
}
.analysis-item {
  margin-right: 1rem;
  margin-left: 1rem;
}
</style>
