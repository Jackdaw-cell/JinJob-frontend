<template>
  <div>
    <Dialog
      :show="dialogConfig.show"
      :title="dialogConfig.title"
      :buttons="dialogConfig.buttons"
      width="90%"
      @close="dialogConfig.show = false"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="80px"
        @submit.prevent
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <!--input输入-->
            <el-form-item label="标题" prop="title">
              <el-input
                clearable
                placeholder="请输入标题"
                v-model="formData.title"
                maxLength="150"
              ></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="categoryId">
              <CategorySelect
                v-model="formData.categoryId"
                :type="1"
              ></CategorySelect>
            </el-form-item>
            <el-form-item label="难度" prop="difficultyLevel">
              <el-rate v-model="formData.difficultyLevel" />
            </el-form-item>
            <el-form-item label="问题类型" prop="questionType">
              <!-- 单选 -->
              <el-radio-group
                v-model="formData.questionType"
                :disabled="formData.questionId != null"
                @change="resetAnswer"
              >
                <el-radio :label="item.key" v-for="item in questionTypeList">{{
                  item.value
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!--input输入-->
            <el-form-item label="答案选项" v-if="formData.questionType != 0">
              <div
                class="question-item"
                v-for="(item, index) in formData.questionItemList"
              >
                <div class="letter">{{ LETTER[index] }}、</div>
                <div class="title">
                  <el-form-item
                    label-width="0px"
                    :key="index"
                    :prop="'questionItemList.' + index + '.title'"
                    :rules="{
                      required: true,
                      message: '答案选项不能为空',
                    }"
                  >
                    <el-input
                      clearable
                      placeholder="请输入答案"
                      v-model="item.title"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="op">
                  <span
                    class="iconfont icon-add"
                    v-if="index == 0"
                    @click="addQuestionItem"
                  ></span>
                  <span
                    class="iconfont icon-reduce"
                    v-if="index > 0"
                    @click="reduceQuestionItem(index)"
                  ></span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="答案" prop="questionAnswer">
              <!--判断题-->
              <template v-if="currentQuestionType == 0">
                <el-radio-group v-model="formData.questionAnswer">
                  <el-radio label="1">正确</el-radio>
                  <el-radio label="0">错误</el-radio>
                </el-radio-group>
              </template>
              <!--单选答案-->
              <template v-if="currentQuestionType == 1">
                <el-radio-group v-model="formData.questionAnswer">
                  <el-radio
                    :label="index + ''"
                    v-for="(item, index) in formData.questionItemList"
                  >
                    {{ LETTER[index] }}</el-radio
                  >
                </el-radio-group>
              </template>
              <!--多选答案-->
              <template v-if="currentQuestionType == 2">
                <el-checkbox-group v-model="formData.questionAnswer">
                  <el-checkbox
                    :label="index + ''"
                    v-for="(item, index) in formData.questionItemList"
                  >
                    {{ LETTER[index] }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="问题描述" prop="question">
              <Suneditor v-model="formData.question" :height="200"></Suneditor>
            </el-form-item>
            <el-form-item label="答案分析" prop="answerAnalysis">
              <Suneditor
                v-model="formData.answerAnalysis"
                :height="200"
              ></Suneditor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </Dialog>
  </div>
</template>
<script setup>
import { LETTER, QUESTION_TYPE } from "@/utils/Constants.js";
import { ref, reactive, getCurrentInstance, nextTick, computed } from "vue";
const { proxy } = getCurrentInstance();

const api = {
  saveExamQuestion: "/examQuestion/saveExamQuestion",
  loadQuestionItem: "/examQuestion/loadQuestionItem",
};

const dialogConfig = ref({
  show: false,
  title: "编辑问题",
  buttons: [
    {
      type: "primary",
      text: "确定",
      click: (e) => {
        submitForm();
      },
    },
  ],
});

const formData = ref({});
const formDataRef = ref();
const rules = {
  title: [{ required: true, message: "请输入标题" }],
  difficultyLevel: [{ required: true, message: "请输选择难度" }],
  categoryId: [{ required: true, message: "请选择分类" }],
  questionType: [{ required: true, message: "请选择问题类型" }],
  questionAnswer: [{ required: true, message: "请选择答案" }],
  answerAnalysis: [{ required: true, message: "请输入的答案解析" }],
};

const questionTypeList = computed(() => {
  let questionTypeList = [];
  for (let key in QUESTION_TYPE) {
    questionTypeList.push({
      key: Number.parseInt(key),
      value: QUESTION_TYPE[key],
    });
  }
  return questionTypeList;
});

const showEditQuestion = (data) => {
  dialogConfig.value.show = true;
  nextTick(() => {
    formDataRef.value.resetFields();
    const params = Object.assign(
      {},
      data || { questionItemList: [{ title: "", sort: 1 }] }
    );
    //处理多选
    if (params && params.questionType == 2) {
      params.questionAnswer = params.questionAnswer.split(",");
    }
    formData.value = params;

    //设置当前问题类型
    currentQuestionType.value = params.questionType;
    if (data) {
      loadQuestionItem(data.questionId);
    }
  });
};
const loadQuestionItem = async (questionId) => {
  let result = await proxy.Request({
    url: api.loadQuestionItem,
    params: {
      questionId: questionId,
    },
  });
  if (!result) {
    return;
  }
  formData.value.questionItemList = result.data;
};
defineExpose({
  showEditQuestion,
});

//重置答案
const currentQuestionType = ref(0);
const resetAnswer = (e) => {
  if (e == 2) {
    formData.value.questionAnswer = [];
  } else {
    formData.value.questionAnswer = undefined;
  }
  currentQuestionType.value = e;
};

const addQuestionItem = () => {
  if (formData.value.questionItemList.length >= 26) {
    proxy.Message.success("最多可以添加26个选项");
    return;
  }
  formData.value.questionItemList.push({
    title: "",
    sort: formData.value.questionItemList.length + 1,
  });
};

const reduceQuestionItem = (index) => {
  formData.value.questionItemList.splice(index, 1);
};

const emit = defineEmits(["reload"]);
const submitForm = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let params = {};
    Object.assign(params, formData.value);
    if (isRepeat(params.questionItemList)) {
      proxy.Message.warning("选项重复");
      return;
    }
    //选择题
    if (params.questionType == 2) {
      params.questionAnswer = params.questionAnswer.sort().join(",");
    }
    if (params.questionType != 0) {
      params.questionItemListJson = JSON.stringify(params.questionItemList);
    }
    delete params.questionItemList;
    let result = await proxy.Request({
      url: api.saveExamQuestion,
      dateType: "json",
      params,
    });
    if (!result) {
      return;
    }
    dialogConfig.value.show = false;
    proxy.Message.success("保存成功");
    emit("reload");
  });
};

const isRepeat = (arr) => {
  var tempMap = {};
  for (var i in arr) {
    if (tempMap[arr[i].title]) return true;
    tempMap[arr[i].title] = true;
  }
  return false;
};
</script>
<style lang="scss" scoped>
.question-item {
  width: 100%;
  display: flex;
  .letter {
    width: 20px;
  }
  .title {
    flex: 1;
    .el-form-item {
      margin-bottom: 18px;
    }
  }
  .op {
    width: 100px;
    overflow: hidden;
    .iconfont {
      margin: 0px 10px;
      cursor: pointer;
    }
  }
}
</style>
