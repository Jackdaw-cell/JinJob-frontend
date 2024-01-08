<template>
  <Dialog
    :title="dialogConfig.title"
    :buttons="dialogConfig.buttons"
    :show="dialogConfig.show"
    @close="dialogConfig.show = false"
    :width="'500px'"
  >
    <el-form
      ref="formDataRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
      @submit.prevent
    >
      <el-form-item label="轮播图" prop="imgPath">
        <CoverUpload
          v-model="formData.imgPath"
          :width="330"
          :height="180"
          :type="1"
        ></CoverUpload>
      </el-form-item>
      <el-form-item label="类型" prop="objectType">
        <el-radio-group v-model="formData.objectType">
          <el-radio :label="0">分享</el-radio>
          <el-radio :label="1">问题</el-radio>
          <el-radio :label="2">考题</el-radio>
          <el-radio :label="3">外部连接</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="链接地址"
        prop="outerLink"
        v-if="formData.objectType == 3"
      >
        <el-input
          :maxLength="200"
          v-model="formData.outerLink"
          placeholder="eg:https://github.com/Jackdaw-cell"
        />
      </el-form-item>
      <el-form-item label="文章ID" prop="objectId" v-else>
        <el-input
          :maxLength="10"
          v-model="formData.objectId"
          placeholder="请输入文章ID"
        />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const api = {
  saveCarousel: "/appCarousel/saveCarousel",
};

const dialogConfig = ref({
  show: false,
  title: "发布更新",
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
  imgPath: [{ required: true, message: "请选择图片" }],
  objecType: [{ required: true, message: "请选择类型" }],
  objectId: [{ required: true, message: "请选择内容ID" }],
  outerLink: [{ required: true, message: "请输入URL地址" }],
};

const emit = defineEmits(["reload"]);
const submitForm = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let params = {};
    Object.assign(params, formData.value);
    let result = await proxy.Request({
      url: api.saveCarousel,
      params,
    });
    if (!result) {
      return;
    }
    dialogConfig.value.show = false;
    emit("reload");
  });
};

const showEdit = (data) => {
  dialogConfig.value.show = true;
  nextTick(() => {
    formDataRef.value.resetFields();
    formData.value = Object.assign({}, data || {});
  });
};

defineExpose({
  showEdit,
});
</script>

<style lang="scss" scoped>
</style>
