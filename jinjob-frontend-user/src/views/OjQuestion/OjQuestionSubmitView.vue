<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs
          default-active-key="question"
          :active-key="activeKey"
          @tab-click="changeActiveKey(value)"
        >
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
              <MdViewer :value="question.content || ''" />
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 2 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}ms
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <a-descriptions :column="{ xs: 0, md: 0, lg: 1 }">
                <a-descriptions-item></a-descriptions-item>
                <a-card
                  v-for="item in judgeCaseExample"
                  :style="{ marginBottom: '20px' }"
                  title="测试用例"
                  :key="item.input"
                >
                  输入： {{ item.input }}<br />
                  输出： {{ item.output }}<br />
                </a-card>
              </a-descriptions>
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane
            key="result"
            title="结果"
            :disabled="judgeResult == undefiend"
            style="height: 100%"
          >
            <a-result
              status="warning"
              title="判题失败，请检查网络是否正常"
              v-if="judging == 'fail'"
            >
            </a-result>
            <a-result v-if="judging == 'waiting'" :status="null">
              <template #icon>
                <a-spin tip="判题姬工作中……" loading="true" :size="42" />
              </template>
            </a-result>
            <a-card
              v-if="judgeResult && judging == 'completed'"
              :title="question.title"
            >
              <a-descriptions
                title="判题信息"
                :column="{ xs: 1, md: 2, lg: 2 }"
              >
                <a-descriptions-item label="输出状态码">
                  {{ judgeStatus }}
                </a-descriptions-item>
                <a-descriptions-item label="通过状态">
                  <t-tag
                    :theme="judgeResult.status == 2 ? 'primary' : 'danger'"
                    >{{ judgeResult.status == 2 ? "通过" : "不通过" }}</t-tag
                  >
                </a-descriptions-item>
              </a-descriptions>
              <a-descriptions :column="{ xs: 1, md: 2, lg: 2 }">
                <a-descriptions-item label="时间">
                  {{ judgeResult.time ?? "--/--" }}ms
                </a-descriptions-item>
                <!--                <a-descriptions-item label="内存">-->
                <!--                  {{ judgeResult.memory ?? "&#45;&#45;/&#45;&#45;" }}-->
                <!--                </a-descriptions-item>-->
              </a-descriptions>
              <a-descriptions
                title="返回信息"
                :column="{ xs: 1, md: 2, lg: 1 }"
              >
                <a-descriptions-item>
                  <a-card :style="{ marginBottom: '20px', minHeight: '300px' }">
                    {{ judgeResult.message }}<br />
                  </a-card>
                </a-descriptions-item>
              </a-descriptions>
            </a-card>
          </a-tab-pane>
          <!--          <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane>-->
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
            </a-select>
          </a-form-item>
          <a-button type="primary" style="min-width: 200px" @click="doSubmit">
            提交代码
          </a-button>
        </a-form>
        <CodeEditor
          v-if="form.code"
          :value="form.code"
          :language="form.language"
          readOnly="false"
          theme="vs-dark"
          :handle-change="changeCode"
          style="height: 500px"
        />
        <a-divider size="0" />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import {
  JudgeCase,
  JudgeInfo,
  OjQuestionControllerService,
  OjQuestionSubmitAddRequest,
  OjQuestionVO,
} from "../../../generatedCode/questionService";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

let question = ref<OjQuestionVO>();
let judgeCaseExample = ref<Array<JudgeCase>>([]);
//默认初始值是question，默认选中question
const activeKey = ref<string>("question");
let judgeResult = ref<JudgeInfo>();
let judgeStatus = ref<number>();
const judging = ref("fail");
let form = ref<OjQuestionSubmitAddRequest>({
  language: "java",
  code: "",
});

const loadData = async () => {
  const res = await OjQuestionControllerService.getQuestionVoByIdUsingGet(
    props.id as any
  );
  console.log(res);
  if (res.code === 0) {
    question.value = res.data;
    if (!res?.data?.judgeCase) {
      judgeCaseExample.value = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      judgeCaseExample.value = JSON.parse(res?.data?.judgeCase as any);
    }
    form.value.code = question.value?.submitMethod;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }
  judgeResult.value = {};
  changeActiveKey("result");
  judging.value = "waiting";
  await OjQuestionControllerService.doQuestionSubmitUsingPost({
    ...form.value,
    questionId: question.value.id,
  }).then((res) => {
    if (res.code === 0) {
      message.success("提交成功");
      judgeStatus.value = res.data.status;
      judgeResult.value = JSON.parse(res.data.judgeInfo);
      judging.value = "completed";
    } else {
      judging.value = "fail";
      message.error("提交失败," + res.message);
    }
  });
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
const changeCode = (value: string | undefined) => {
  if (value == undefined) {
    form.value.code = "";
    return "";
  }
  form.value.code = value;
};
const changeActiveKey = (value: string) => {
  activeKey.value = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
