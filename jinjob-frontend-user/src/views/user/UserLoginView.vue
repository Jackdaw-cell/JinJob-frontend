<template>
  <div id="userLoginView">
    <!--    <h2 style="margin-bottom: 16px">用户登录</h2>-->
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.email" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="password" tooltip="密码不少于 8 位" label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item field="checkCode" tooltip="请输入验证码" label="验证码">
        <a-input v-model="form.checkCode" placeholder="请输入验证码" />
        <a-image
          v-if="checkCodeChange"
          width="200"
          :src="`/api/user/account/checkCode?type=1&&timestamp=${timestamp}`"
          @click="
            () => {
              timestamp = Date.now();
            }
          "
          :preview="false"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  LoginControllerService,
  UserAccountLoginRequest,
} from "../../../generatedCode/userService";

let timestamp = ref(1);
let checkCodeChange = ref(true);

/**
 * 表单信息
 */
const form = reactive({
  email: "",
  password: "",
  checkCode: "",
} as UserAccountLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  checkCodeChange.value = false;
  const res = await LoginControllerService.loginUsingPost(form);
  // 登录成功，跳转到主页
  if (res.code === 0) {
    localStorage.setItem("token", res.data);
    await store.dispatch("user/getLoginUser");
    timestamp.value = Date.now();
    checkCodeChange.value = true;
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登陆失败，" + res.message);
    timestamp.value = Date.now();
    checkCodeChange.value = true;
  }
};
</script>
