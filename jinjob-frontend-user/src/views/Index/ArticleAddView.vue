<template>
  <div id="questionsView">
    <t-row>
      <t-col :span="12">
        <t-form
          ref="form"
          :data="shareInfo"
          reset-type="initial"
          colon
          @submit="submitData"
        >
          <t-form-item label="标题" name="title">
            <t-input v-model="shareInfo.title" class="input"></t-input>
          </t-form-item>
          <t-form-item label="封面" name="coverPath">
            <t-upload
              v-model="coverPath"
              :action="api.uploadCoverPath"
              theme="image"
              tips="请选择单张图片文件上传"
              accept="image/*"
            ></t-upload>
          </t-form-item>
          <t-form-item label="文章内容" name="coverPath">
            <v-md-editor
              v-model="shareInfo.content"
              height="30rem"
              style="width: 50rem"
              left-toolbar="undo redo clear | h bold italic strikethrough quote
              | ul ol table hr | link image code emoji"
              @upload-image="handleUploadImage"
              :disabled-menus="[]"
            ></v-md-editor>
          </t-form-item>
          <t-form-item>
            <t-space size="large">
              <t-button theme="primary" type="submit">提交</t-button>
            </t-space>
          </t-form-item>
        </t-form>
      </t-col>
    </t-row>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import {
  FileControllerService,
  ShareControllerService,
  ShareInfo,
} from "../../../generatedCode/questionService";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
const { proxy } = getCurrentInstance();
const { params } = useRoute();
const coverPath = ref<
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
const shareInfo = reactive({
  layout: "inline",
  labelAlign: "right",
  title: "",
  coverType: 1,
  coverPath: "",
  content: "",
  createTime: "",
  status: 1,
  createUserId: "",
  createUserName: "",
  readCount: 0,
  collectCount: 0,
  postUserType: 1,
  haveCollect: false,
  collectId: 0,
});
const api = {
  uploadCoverPath: "/api/admin/file/uploadFile",
  uploadFile: "/file/uploadFile",
  getImage: "/api/admin/file/getImage/",
};
const loadData = async () => {
  if (shareInfo) {
    shareInfo.postUserType = 1;
    shareInfo.coverPath = "";
    shareInfo.title = "";
  }
};
const submitData = async () => {
  if (shareInfo) {
    if (
      coverPath.value.length > 0 &&
      coverPath.value[0].response &&
      coverPath.value[0].response.code == 200 &&
      coverPath.value[0].response.data
    ) {
      shareInfo.coverPath = coverPath.value[0].response.data;
    }
    const res = await ShareControllerService.saveShareInfoByPost(shareInfo);
    if (res.code == 0) {
      message.success("提交成功");
    } else {
      message.error("提交成功，" + res.message);
    }
  }
};
const handleUploadImage = async (
  event: any,
  insertImage: (arg0: {
    url: string;
    desc: string;
    width: string;
    height: string;
  }) => void,
  files: any[]
) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  let result = await proxy.Request({
    url: "/file/uploadFile",
    params: {
      file: files[0],
    },
  });
  if (result && result.code == 200 && result.data) {
    // 此处只做示例
    insertImage({
      url: `${api.getImage}${result.data}`,
      desc: "",
      width: "100%",
      height: "auto",
    });
  }
  return;
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
