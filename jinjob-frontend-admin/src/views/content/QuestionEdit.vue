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
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="分类" prop="categoryId">
              <CategorySelect
                v-model="formData.categoryId"
                :type="0"
              ></CategorySelect>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!--input输入-->
            <el-form-item label="难度" prop="difficultyLevel">
              <el-rate v-model="formData.difficultyLevel" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="问题" prop="content">
              <Suneditor v-model="formData.question"></Suneditor> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="答案分析" prop="answerAnalysis">
              <Suneditor
                v-model="formData.answerAnalysis"
              ></Suneditor> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </Dialog>
  </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const api = {
  saveQuestion: "/questionInfo/saveQuestionInfo",
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
  categoryId: [{ required: true, message: "请选择分类" }],
  difficultyLevel: [{ required: true, message: "请输选择难度" }],
  answerAnalysis: [{ required: true, message: "请输入答案解析" }],
};

const showEditQuestion = (data) => {
  dialogConfig.value.show = true;
  nextTick(() => {
    formDataRef.value.resetFields();
    formData.value = Object.assign({}, data || {});
  });
};

defineExpose({
  showEditQuestion,
});

const emit = defineEmits(["reload"]);
const submitForm = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let params = {};
    Object.assign(params, formData.value);
    let result = await proxy.Request({
      url: api.saveQuestion,
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
</script>
<style lang="scss" scoped>
</style>
