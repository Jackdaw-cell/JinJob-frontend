<template>
  <div>
    <Dialog
        v-if="formData"
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
          @submit.prevent
          label-width="10rem"
      >
        <el-row :gutter="10">
          <el-col :span="24">
            <!--input输入-->
            <el-form-item label="标题" prop="title" >
              <el-input
                  placeholder="请输入标题"
                  v-model="formData.title"
                  maxLength="150"
                  style="width: 20rem"
              ></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tags">
              <el-tag
                  v-for="tag in formData.tags"
                  :key="tag"
                  closable
                  @close="handleClose(tag)"
                  size="medium"
                  :type="tag.type">
                {{tag}}
              </el-tag>
              <el-input
                  class="input-new-tag"
                  v-if="newTagVisible"
                  v-model="newTagValue"
                  ref="saveTagInput"
                  size="small"
                  style="width: 5rem"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>
            <el-form-item label="时间限制" prop="timeLimit">
              <el-input-number v-model="formData.timeLimit" label="请输入时间限制"></el-input-number>
            </el-form-item>
            <el-form-item label="内存限制" prop="memoryLimit">
              <el-input-number v-model="formData.memoryLimit" label="请输入内存限制"></el-input-number>
            </el-form-item>
            <el-form-item label="堆栈限制" prop="stackLimit">
              <el-input-number v-model="formData.stackLimit" label="请输入堆栈限制"></el-input-number>
            </el-form-item>

              <el-form-item label="题目内容" prop="content">
                <Suneditor v-model="formData.content" style="width: 30rem;" :height="200"></Suneditor>
              </el-form-item>
              <el-form-item label="输入/输出解释" prop="descript">
                <Suneditor v-model="formData.descript" style="width: 30rem;" :height="200"></Suneditor>
              </el-form-item>
            <el-form-item label="执行用例">
              <div style="min-height: 30vh;max-height: 80vh;overflow:auto" >
                <el-alert
                    :closable="false"
                    title="判题模块以参数模式传入（即以Java程序启动参数方式传入）,接收类型为String[]"
                    type="success">
                </el-alert>
                <el-col>
                  <el-form-item>
                    <el-form-item :label="`输入用例-多整型参数示例`">
                      <el-input
                          disabled
                          placeholder="1 2 3 4"
                          size="large"
                          style="margin:5px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item :label="`输出用例-多整型参数示例`">
                      <el-input
                          disabled
                          placeholder="1 2 3 4"
                          size="large"
                          style="margin:5px"
                      ></el-input>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item>
                    <el-form-item :label="`输入用例-多字符串参数示例`">
                      <el-input
                          disabled
                          placeholder="a b c d"
                          size="large"
                          style="margin:5px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item :label="`输出用例-多字符串参数示例`">
                      <el-input
                          disabled
                          placeholder="a b c d"
                          size="large"
                          style="margin:5px"
                      ></el-input>
                    </el-form-item>
                  </el-form-item>
                  <el-form-item v-for="(judgeCaseItem, index) of formData.judgeCase"
                                :key="index">
                    <el-form-item
                        :label="`输入用例-${index+1}`"
                        :key="index">
                      <el-input
                          placeholder="请输入测试输入用例"
                          v-model="judgeCaseItem.input"
                          maxLength="450"
                          size="large"
                          style="margin:5px"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                        :label="`输出用例-${index+1}`"
                        :key="index">
                      <el-input
                          placeholder="请输入测试输出用例"
                          v-model="judgeCaseItem.output"
                          maxLength="450"
                          size="large"
                          style="margin:5px"
                      ></el-input>
                    </el-form-item>
                    <el-button type="text" @click="handleDelete(index)"
                    >删除
                    </el-button>
                  </el-form-item>
                  <el-button type="primary" @click="handleAdd" style="margin: 1rem">新增测试用例</el-button>
                </el-col>
              </div>
            </el-form-item>
            <el-form-item label="Main主类以及方法模板" prop="mainMethod">
              <codemirror v-model:value="formData.mainMethod" :options="codeMirrorOptions" style="width: 30rem;height: 55vh"/>
                <el-form-item label="示例模板(可导入的包范围仅限于JDK8官方自带工具包)" label-width="10rem">
                  <codemirror v-model:value="MainCodeTemplate" :options="codeMirrorOptions" style="width: 30rem;height: 55vh"/>
                </el-form-item>
            </el-form-item>
            <el-form-item label="用户提交方法模板" prop="submitMethod">
              <codemirror v-model:value="formData.submitMethod" :options="codeMirrorOptions" style="width: 30rem;height: 55vh"/>
              <el-form-item label="示例模板(可导入的包范围仅限于JDK8官方自带工具包)" label-width="10rem">
                <codemirror v-model:value="SubmitCodeTemplate" :options="codeMirrorOptions" style="width: 30rem;height: 55vh"/>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </Dialog>
  </div>
</template>
<script setup>
import {LETTER, QUESTION_TYPE} from "@/utils/Constants.js";
import {ref, reactive, getCurrentInstance, nextTick, computed} from "vue";
import MainCodeTemplate from "@/constant/MainCodeTemplate"
import SubmitCodeTemplate from "@/constant/SubmitCodeTemplate"
import axios from 'axios';
const {proxy} = getCurrentInstance();
import CodeEditor from "@/components/CodeEditor.vue";

import Codemirror from 'codemirror-editor-vue3';
// 编辑器代码格式
import 'codemirror/mode/javascript/javascript.js';
// 自动刷新
import 'codemirror/addon/display/autorefresh';
// 主题
import 'codemirror/theme/dracula.css';

const codeMirrorOptions = {
  autorefresh: true, // 是否自动刷新
  smartIndent: true, // 自动缩进
  tabSize: 4, // 缩进单元格为 4 个空格
  mode: 'javascript', //编辑器的编程语言，比如：'javascript'
  theme: 'dracula', // 主题，使用主体需要引入相应的 css 文件
  line: true, // 是否显示行数
  viewportMargin: Infinity, // 高度自适应
  highlightDifferences: true,
  autofocus: false,
  indentUnit: 2,
  // readOnly: true, // 只读
  showCursorWhenSelecting: true,
  firstLineNumber: 1,
  matchBrackets: true,//括号匹配
}
const api = {
  saveExamQuestion: "/api/admin/ojQuestionInfo/saveOjQuestionInfo",
  loadQuestionItem: "/ojQuestionInfo/loadOjQuestionItem",
};
const formData = ref({
  id: "",
  title: "",
  content: "",
  tags: [],
  answer: "",
  judgeCase: [{
    input: "",
    output: "",
  }],
  judgeConfig: "",
  timeLimit: 0,
  memoryLimit: 0,
  stackLimit: 0,
  mainMethod: "",
  submitMethod: "",
  descript: ""
});
const rules = {
  title: [{required: true, message: "请输入标题"}],
  content: [{required: true, message: "请输入内容"}],
  answer: [{required: true, message: "请选择输入/输出解释"}],
  judgeCase: [{required: true, message: "请输入判题用例"}],
  judgeConfig: [{required: true, message: "请输入判题限定"}],
  mainMethod: [{required: true, message: "请输入主类以及主方法模板"}],
  submitMethod: [{required: true, message: "请输入用户执行方法模板"}],
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
let newTagVisible = ref(false)
let newTagValue = ref('')
const handleClose = (tag) => {
  formData.value.tags.splice(formData.value.tags.indexOf(tag), 1);
}
const showInput = () => {
  newTagVisible.value = true;
}
const handleInputConfirm = () => {
  let inputValue = newTagValue.value;
  console.log(formData.value)
  if (inputValue) {
    formData.value.tags.push(inputValue);
  }
  newTagVisible.value = false;
  newTagValue.value = '';
}

const mainMethod = ref("");
const submitMethod = ref("");
const formDataRef = ref();


const showEditQuestion = (data) => {
  let tempData;
  if (data){
    tempData = {
      id: data.id || "",
      title: data.title|| "",
      content: data.content,
      tags: JSON.parse(data.tags)|| [],
      answer: data.answer|| "",
      judgeCase: JSON.parse(data.judgeCase),
      judgeConfig: JSON.parse(data.judgeConfig) || "",
      timeLimit: JSON.parse(data.judgeConfig).timeLimit || 0,
      memoryLimit: JSON.parse(data.judgeConfig).memoryLimit || 0,
      stackLimit: JSON.parse(data.judgeConfig).stackLimit || 0,
      mainMethod: data.mainMethod|| "",
      submitMethod: data.submitMethod|| "",
      descript: data.descript || "",
    }
  }

  dialogConfig.value.show = true;
  nextTick(() => {
    formDataRef.value.resetFields();
    //直接从列表取数据
    const params = {}
    Object.assign(params,
        tempData || {
          id: "",
          title: "",
          content: "",
          tags: [],
          answer: "",
          judgeCase: [],
          judgeConfig: "",
          timeLimit: 0,
          memoryLimit: 0,
          stackLimit: 0,
          mainMethod: "",
          submitMethod: "",
          descript: ""
        }
    );
    formData.value = params;
    // if (data) {
    //   loadQuestionItem(data.id);
    // }
  });
};
// 加载问题详情
const loadQuestionItem = async (id) => {
  let result = await proxy.Request({
    url: api.loadQuestionItem,
    params: {
      id: id,
    },
  });
  if (!result) {
    return;
  }
  let data = result.data;
  formData.value = {
    id: data.id || "",
    title: data.title|| "",
    content: data.content,
    tags: JSON.parse(data.tags)|| [],
    answer: data.answer|| "",
    judgeCase: JSON.parse(data.judgeCase),
    judgeConfig:data.judgeConfig || "",
    timeLimit: JSON.parse(data.judgeConfig).timeLimit || 0,
    memoryLimit: JSON.parse(data.judgeConfig).memoryLimit || 0,
    stackLimit: JSON.parse(data.judgeConfig).stackLimit || 0,
    mainMethod: data.mainMethod || "",
    submitMethod: data.submitMethod || "",
    descript: data.descript || "",
  }
};
//向外暴露方法
defineExpose({
  showEditQuestion,
});

const emit = defineEmits(["reload"]);
// 提交表单
const submitForm = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let body = {};
    if (mainMethod.value){
      formData.value.mainMethod = mainMethod.value;
    }
    if (submitMethod.value){
      formData.value.submitMethod = submitMethod.value;
    }
    let judgeConfig = {
      timeLimit:"",
      memoryLimit:"",
      stackLimit:"",
    };
    if (formData.value.timeLimit){
      judgeConfig.timeLimit = formData.value.timeLimit;
    }
    if (formData.value.memoryLimit){
      judgeConfig.memoryLimit = formData.value.memoryLimit;
    }
    if (formData.value.stackLimit){
      judgeConfig.stackLimit = formData.value.stackLimit;
    }
    formData.value.judgeConfig = judgeConfig;
    Object.assign(body, formData.value);
    let result = await axios({
      method: 'post',
      url: api.saveExamQuestion,
      data: body, // 将请求体转换为JSON字符串
    })
    console.log(result)
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

/**
 * 新增判题用例
 */
const handleAdd = () => {
  formData.value.judgeCase.push({
    input: "",
    output: "",
  });
};

/**
 * 删除判题用例
 */
const handleDelete = (index) => {
  formData.value.judgeCase.splice(index, 1);
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
