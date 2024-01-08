<template>
  <div class="examSubmitView">
    <t-form
      ref="form"
      :data="formData"
      :colon="false"
      :labelAlign="'top'"
      @reset="onReset"
      @submit="onSubmit"
    >
      <a-row :gutter="[24, 24]" justify="center" v-if="!examStart">
        <a-col :md="15" :xs="24">
          <t-divider><h1>考试</h1></t-divider>

          <p>欢迎参加本次笔试，为了让您更好地完成考试，请遵守以下提示：</p>
          <ol>
            <li>请准时到达考场，避免迟到影响考试。</li>
            <li>
              请勿携带手机、电子设备等通讯工具辅助答题，以免影响考试公平性。
            </li>
            <li>
              请认真核对个人信息，如姓名、邮箱等是否一致，确保答题精准性。
            </li>
            <li>
              请认真阅读考试说明和注意事项，并遵守考试纪律，如违反考场规定将取消考试资格。
            </li>
            <li>请在规定时间内完成考试，注意掌握时间，保证答题质量和效率。</li>
          </ol>
          <p>祝您考试成功！</p>
          <t-button block :onClick="createExam">确定</t-button>
        </a-col>
      </a-row>
      <t-loading :loading="loading" text="加载中..." fullscreen />
      <a-row :gutter="[24, 24]" justify="center" v-if="examStart">
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
            showSlideBtn="never"
          >
            <t-swiper-item v-for="(item, index) of questionList" :key="item">
              <Listbox
                v-if="submitFormData.appExamQuestionList.length > 0"
                v-model="
                  submitFormData.appExamQuestionList[index].userAnswerList
                "
                :options="item.questionItemList"
                optionLabel="label"
                :multiple="1 == 1"
                metaKeySelection
                class="w-full md:w-50rem"
                listStyle="padding:1rem"
              >
                <template #header>
                  <a-row
                    :gutter="[24, 24]"
                    v-if="examStart"
                    style="margin-top: 0.5rem; margin-left: 0.5rem"
                  >
                    <a-col :md="17" :xs="24">
                      <div>
                        <span>{{ index + 1 }}、</span>
                        {{ item.title }}
                      </div>
                      <div v-html="item.question"></div>
                    </a-col>
                  </a-row>
                </template>
                <template #footer>
                  <a-row
                    :gutter="[24, 24]"
                    v-if="examStart"
                    style="margin-top: 0.5rem; margin-left: 0.5rem"
                  >
                    <a-col :md="17" :xs="24">
                      <h4 style="color: darkred; font-size: 80%">
                        长按CTRL并且左键点击实现多选/取消选择
                      </h4>
                    </a-col>
                  </a-row>
                </template>
              </Listbox>
            </t-swiper-item>
          </t-swiper>
        </a-col>
        <t-col :span="1">
          <Button
            label="提交"
            text
            @click="submitPaper"
            v-if="current == questionList.length - 1"
          />
          <Button
            v-else
            label="下一题"
            text
            @click="
              current =
                current + 2 > questionList.length
                  ? questionList.length - 1
                  : current + 1
            "
          />
          <h4 style="color: skyblue; font-size: 80%">
            距离考试结束还有
            <div>{{ minutesLeft }}分{{ secondsLeft }}秒</div>
          </h4>
        </t-col>
      </a-row>
    </t-form>
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
    <template>
      <Toast />
      <ConfirmDialog></ConfirmDialog>
      <div class="card flex flex-wrap gap-2 justify-content-center">
        <Button @click="confirm1()" icon="pi pi-check" label="Confirm"></Button>
      </div>
    </template>
    <template>
      <div class="card flex justify-content-center">
        <Dialog
          closable="false"
          v-model:visible="judgeVisible"
          modal
          header="Header"
          :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        >
          <p>统计分数中.....</p>
        </Dialog>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  AppExamControllerService,
  AppExamVO,
  ExamQuestionVO,
  IndexControllerService,
} from "../../../generatedCode/questionService";
import { MessageInfoOptions, MessagePlugin } from "tdesign-vue-next";

import Button from "primevue/button";

import { onMounted, ref, watchEffect } from "vue";
import message from "@arco-design/web-vue/es/message";
import {
  MapGridIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "tdesign-icons-vue-next";
import ConfirmDialog from "primevue/confirmdialog";
import Listbox from "primevue/listbox";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const categoryIds = ref<Array<number | undefined> | undefined>([]);
const examStart = ref(false);
const loading = ref(false);
const current = ref(0);
let questionList = ref<Array<ExamQuestionVO> | undefined>([]);
//考试时间
let startTime = ref<Date>();
const duration = ref(30); // 30分钟
let secondsLeft = ref(0);
let minutesLeft = ref(0);
const visible = ref(false);
let userId = ref("");
let examId = ref(-1);
class category {
  "categoryId": number | undefined;
  "categoryName": string | undefined;
  "sort": number | undefined;
  "iconPath": string | undefined;
  "bgColor": string | undefined;
  "type": number | undefined;
  "label": string | undefined;
  "value": number | undefined;
}
class examQuestionAnswerList {
  "examId": number;
  "userId": string;
  "questionId": number;
  "userAnswer": string;
  "userAnswerList": Array<string>;
}

class questionItem {
  answerAnalysis?: string | undefined;
  answerResult?: number | undefined;
  difficultyLevel?: number | undefined;
  examId?: number | undefined;
  haveCollect?: boolean | undefined;
  question?: string | undefined;
  questionAnswer?: string | undefined;
  questionId?: number | undefined;
  questionItemList?:
    | {
        itemId?: number | undefined;
        questionId?: number | undefined;
        sort?: number | undefined;
        title?: string | undefined;
        label?: string | undefined;
        value?: number | undefined;
      }[]
    | undefined;
  questionType?: number | undefined;
  title?: string | undefined;
  userAnswer?: string | undefined;
  userAnswerList?: Array<any> | undefined;
}

const confirm = useConfirm();
const toast = useToast();

const judgeVisible = ref(false);
const doSubmitExam = async () => {
  submitFormData.value.examId = examId.value;
  submitFormData.value.remark = "";
  let answerResult = "";
  submitFormData.value.appExamQuestionList.forEach((item) => {
    answerResult = "";
    if (item.userAnswerList != undefined && item.userAnswerList.length > 0) {
      item.userAnswerList.forEach((answer) => {
        answerResult = answerResult + answer.value.toString();
      });
    }
    answerResult = answerResult
      .split("")
      .map(Number)
      .sort((a, b) => a - b)
      .join("");
    item.userAnswer = answerResult;
  });
  return await AppExamControllerService.postExamUsingPost(submitFormData.value);
};
const submit = () => {
  confirm.require({
    message: "提交完成将统计分数",
    header: "你确定要提交?",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      let result = await doSubmitExam();
      // 延迟1秒钟执行回调函数
      judgeVisible.value = true;
      console.log(result);
      if (result.code == 0 && result.message == "ok") {
        judgeVisible.value = false;
        router.push({
          path: `/exam`,
        });
      } else {
        judgeVisible.value = false;
        toast.add({
          severity: "error",
          summary: "Rejected",
          detail: "判题失败,请检查网络",
          life: 3000,
        });
      }
    },
    reject: () => {
      toast.add({
        severity: "info",
        summary: "Rejected",
        detail: "请继续答题",
        life: 3000,
      });
    },
  });
};
const answerCard = ref<Array<Array<number>>>([]);
//是否选中的样式
const optionCheckedStyle = ref<Array<Array<number>>>([]);
const store = useStore();
const formData = ref<{ categoryIds: string[] }>({
  categoryIds: [],
});
const submitFormData = ref<{
  examId: number;
  remark: string;
  appExamQuestionList: Array<examQuestionAnswerList>;
}>({
  examId: -1,
  remark: "",
  appExamQuestionList: [],
});
const handleClick = () => {
  visible.value = true;
};
const answerCardShow = (j: number) => {
  current.value = j - 1;
  visible.value = false;
};

const loadData = async () => {
  const res = await IndexControllerService.loadAllCategoryUsingGet(0);
  if (res.code === 0) {
    //加载分类
    //如果已选分类则加载已选分类
    //否则加载全部分类
    categoryIds.value =
      store.state.exam?.tags ||
      res?.data?.map((category) => category.categoryId);
    console.log(categoryIds.value);
    console.log(store.state.exam?.tags);
  } else {
    message.error("加载失败，" + res.message);
  }
};
//一维数组转为二维数组
const convertToTwoDimensionalArray = (
  array: Array<number | undefined>
): Array<Array<number>> => {
  const len = array.length;
  const rows = Math.ceil(len / 10);
  const result = new Array(rows);
  let index = 0;

  for (let i = 0; i < rows; i++) {
    result[i] = new Array(10);

    for (let j = 0; j < 10; j++) {
      if (index < len) {
        result[i][j] = array[index];
        index++;
      } else {
        break;
      }
    }
  }

  return result;
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
const createExam = async () => {
  loading.value = true;
  //创建考试
  await AppExamControllerService.createExamUsingGet({
    categoryIds: categoryIds.value,
  }).then(async (res) => {
    if (
      res.code === 0 &&
      res.data?.examId != undefined &&
      res.data?.userId != undefined
    ) {
      examId.value = res.data.examId;
      userId.value = res.data.userId;
      //获取考试题目
      const examQuestion =
        await AppExamControllerService.getExamQuestionUsingGet(
          res.data?.examId
        );
      const appExam: AppExamVO | undefined = examQuestion.data;
      if (appExam != undefined) {
        if (appExam.startTime != null || appExam.startTime != undefined) {
          startTime.value = new Date(Date.parse(appExam?.startTime));
        } else if (appExam.startTime == null) {
          //开始考试
          await AppExamControllerService.startExamUsingGet(appExam.examId).then(
            (res) => {
              if (res.code == 0 && res.data != undefined) {
                startTime.value = new Date(Date.parse(res.data));
                if (startTime.value) {
                  startTimer(startTime.value, duration.value);
                }
              }
            }
          );
        }
      }
      let questionIndex = 0;
      let answerCardList = ref<Array<number | undefined>>([]);
      //对考试的所有30个题目进行配置
      appExam?.examQuestionList?.forEach((examQuestionItem: questionItem) => {
        let index = 0;
        //样式静态化配置
        let optionStatic = new Array<number>();
        //每题的选项静态化配置
        examQuestionItem.questionItemList?.forEach((questionAnswerItem) => {
          questionAnswerItem.label =
            numberToUpperCaseLetter(index) + "、" + questionAnswerItem.title;
          questionAnswerItem.value = index;
          index++;
          optionStatic.push(0);
        });
        optionCheckedStyle.value.push(optionStatic);
        questionIndex++;
        //答卷初始化
        initPaper(examQuestionItem);
        answerCardList.value?.push(questionIndex);
      });
      if (answerCardList.value) {
        answerCard.value = convertToTwoDimensionalArray(answerCardList.value);
      }
    } else {
      message.error("加载失败，" + res.message);
    }
    examStart.value = true;
    loading.value = false;
  });
};
const initPaper = (examQuestionItem: questionItem) => {
  let questionAnswerList = new examQuestionAnswerList();
  questionAnswerList.examId = examId.value;
  questionAnswerList.userId = userId.value;
  if (examQuestionItem.questionId != undefined) {
    questionAnswerList.questionId = examQuestionItem.questionId;
  }
  questionAnswerList.userAnswer = "";
  //初始化空答案
  if (questionAnswerList != undefined) {
    submitFormData.value?.appExamQuestionList.push(questionAnswerList);
  }
  questionList?.value?.push(examQuestionItem);
};
const examTimeOut = async () => {
  let result = await doSubmitExam();
  // 延迟1秒钟执行回调函数
  judgeVisible.value = true;
  if (result.code == 0 && result.message == "ok") {
    judgeVisible.value = false;
    toast.add({
      severity: "success",
      summary: "Rejected",
      detail: "考试结束",
      life: 3000,
    });
  } else {
    judgeVisible.value = false;
    toast.add({
      severity: "error",
      summary: "Rejected",
      detail: "判题失败,请检查网络",
      life: 3000,
    });
  }
  await router.push({
    path: `/exam`,
  });
};
const startTimer = async (startTime: Date, duration: number) => {
  const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
  let timeLeft = endTime.getTime() - new Date().getTime();
  if (timeLeft <= 0) {
    // 考试时间已经结束
    examTimeOut();
    return { hasExamEnd: true, message: "考试时间已结束。" };
  } else {
    // 考试时间还未结束
    const timerInterval = setInterval(() => {
      timeLeft = endTime.getTime() - new Date().getTime();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        examTimeOut();
        console.log("考试时间已结束。");
        return { hasExamEnd: true, message: "考试时间已结束。" };
      } else {
        secondsLeft.value = Math.floor(timeLeft / 1000) % 60;
        minutesLeft.value = Math.floor(timeLeft / (1000 * 60));
      }
    }, 1000);
    return { hasExamEnd: false, message: "" };
  }
};
const submitPaper = async (params: {
  validateResult: boolean;
  firstError: string | MessageInfoOptions;
}) => {
  submit();
};
const answerChange = (value: number, index: number) => {
  let numArray = submitFormData.value.appExamQuestionList[index].userAnswer
    .split("")
    .map(Number);
  const i = numArray.indexOf(value);
  if (i !== -1) {
    numArray.splice(i, 1);
    optionCheckedStyle.value[index][value] = 0;
  } else {
    numArray.push(index);
    optionCheckedStyle.value[index][value] = 1;
    numArray.sort((a: number, b: number) => a - b);
  }
  submitFormData.value.appExamQuestionList[index].userAnswer =
    numArray.join("");
};
// 答题追加选项（拼接字符串操作）
const modifyNumberString = (str: string, num: any) => {
  let numArray = str.split("").map(Number);
  const index = numArray.indexOf(num);

  if (index !== -1) {
    numArray.splice(index, 1);
  } else {
    numArray.push(num);
    numArray.sort((a, b) => a - b);
  }
  return numArray.join("");
};

if (startTime.value) {
  startTimer(startTime.value, duration.value);
}

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style scoped>
.examSubmitView {
  padding: 3rem;
}
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
</style>
