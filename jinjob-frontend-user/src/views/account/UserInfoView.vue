<template>
  <div style="min-height: 40rem; padding: 2rem">
    <t-form
      ref="form"
      :data="formData"
      reset-type="initial"
      :disabled="formDisabled"
      colon
      @reset="onReset"
      @submit="onSubmit"
    >
      <t-form-item label="头像" name="avatar">
        <t-upload
          v-model="avatar"
          :action="api.uploadImage"
          theme="image"
          tips="请选择单张图片文件上传"
          accept="image/*"
        ></t-upload>
      </t-form-item>
      <t-form-item label="邮箱" name="name">
        <t-input v-model="formData.email" class="input"></t-input>
      </t-form-item>
      <t-form-item label="姓名" name="name">
        <t-input v-model="formData.nickName" class="input"></t-input>
      </t-form-item>
      <t-form-item label="性别" name="college">
        <t-select
          v-model="formData.sex"
          :options="COLLEGE_OPTIONS"
          clearable
          class="input"
        ></t-select>
      </t-form-item>
      <t-form-item label="个人背景" name="college">
        <t-select
          v-model="formData.background"
          :options="BACKGROUND_OPTIONS"
          clearable
          class="input"
        ></t-select>
      </t-form-item>
      <t-form-item label="个人简介" name="description">
        <t-textarea
          v-model="formData.description"
          placeholder="简单描述自己的经历"
          clearable
          class="input"
        />
      </t-form-item>
      <t-form-item label="标签" name="tags">
        <t-tagInput
          excessTagsDisplayType="break-line"
          v-model="tags"
          class="input"
        />
      </t-form-item>
      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit" v-if="!formDisabled"
            >提交</t-button
          >
          <t-button
            v-if="formDisabled"
            theme="primary"
            variant="base"
            :disabled="false"
            @click="
              () => {
                formDisabled = !formDisabled;
              }
            "
            >修改信息</t-button
          >
        </t-space>
      </t-form-item>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { MessageInfoOptions, MessagePlugin } from "tdesign-vue-next";
import { MyControllerService } from "../../../generatedCode/userService/services/MyControllerService";
import { onMounted, reactive, ref } from "vue";
import { UserAccountSaveRequest } from "../../../generatedCode/userService";
import { useStore } from "vuex";

const formDisabled = ref(false);
const api = ref({
  uploadImage: "/api/admin/file/uploadFile",
});
let formData = reactive<UserAccountSaveRequest>({
  userId: "",
  nickName: "",
  sex: 0,
  email: "",
  avatar: "",
  tags: "",
  description: "",
  background: "",
});
const store = useStore();
const tags = ref([]);
const avatar = ref<
  Array<{
    url: string;
    raw?: any;
    size?: number;
    type?: string;
    percent?: number;
    status?: string;
    uploadTime?: string;
    response?: {
      status: string;
      code: number;
      message: string;
      data: string;
    };
  }>
>([]);
const COLLEGE_OPTIONS = [
  { label: "男生", value: 1 },
  { label: "女生", value: 2 },
];
const BACKGROUND_OPTIONS = [
  { label: "海黑蓝", value: "wave-haikei" },
  { label: "重叠红", value: "steps-haikei" },
  { label: "山峦绿", value: "peaks-haikei" },
];

const onReset = () => {
  MessagePlugin.success("重置成功");
};

const onSubmit = async (params: {
  validateResult: boolean;
  firstError: string | MessageInfoOptions;
}) => {
  formData.tags = JSON.stringify(tags.value);
  if (
    avatar.value.length > 0 &&
    avatar.value[0].response &&
    avatar.value[0].response.code == 200 &&
    avatar.value[0].response.data
  ) {
    formData.avatar = JSON.stringify(
      `/api/admin/file/getImage/${avatar.value[0].response.data}`
    );
  }
  if (params.validateResult === true) {
    const res = await MyControllerService.updateUserInfoUsingPost(formData);
    console.log(res);
    if (res.code == 0) {
      localStorage.setItem("token", "");
      await store.dispatch("user/getLoginUser");
      localStorage.setItem("token", res.data);
      MessagePlugin.success("提交成功");
    }
  } else {
    console.log("Errors: ", params.validateResult);
    MessagePlugin.warning(params.firstError);
  }
};
const loadData = async () => {
  const res = await MyControllerService.getUserInfoUsingGet();
  if (res.code == 0) {
    formData = res.data;
    if (formData.tags) {
      tags.value = JSON.parse(formData.tags);
    }
    if (formData.avatar) {
      avatar.value.push({ url: JSON.parse(formData.avatar) });
    }
    formDisabled.value = true;
  }
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
