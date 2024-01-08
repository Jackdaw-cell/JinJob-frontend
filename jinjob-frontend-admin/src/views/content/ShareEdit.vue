<template>
  <div>
    <Dialog
      :show="dialogConfig.show"
      :title="dialogConfig.title"
      :buttons="dialogConfig.buttons"
      width="80%"
      @close="dialogConfig.show = false"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="80px"
        @submit.prevent
      >
        <el-form-item label="标题" prop="title">
          <el-input
            clearable
            placeholder="请输入标题"
            v-model.trim="formData.title"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面类型" prop="coverType">
          <el-radio-group v-model="formData.coverType">
            <el-radio :label="0">无封面</el-radio>
            <el-radio :label="1">横幅</el-radio>
            <el-radio :label="2">图标</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="封面"
          prop="coverPath"
          v-if="formData.coverType && formData.coverType != 0"
        >
          <CoverUpload
            v-if="formData.coverType == 1"
            v-model="formData.coverPath"
            :width="330"
            :height="180"
            :type="2"
          ></CoverUpload>
          <CoverUpload
            v-if="formData.coverType == 2"
            v-model="formData.coverPath"
            :width="100"
            :height="100"
            :type="3"
          ></CoverUpload>
        </el-form-item>
        <el-form-item label="文章" prop="content">
<!--          <Suneditor v-model="formData.content"></Suneditor>-->
          <v-md-editor
              v-model="formData.content"
              height="60rem"
              left-toolbar="undo redo clear | h bold italic strikethrough quote
              | ul ol table hr | link image code emoji | save"
              @upload-image="handleUploadImage"
              :disabled-menus="[]"></v-md-editor>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const api = {
  saveShare: "/shareInfo/saveShareInfo",
  uploadFile: "/file/uploadFile",
  getImage: "/api/admin/file/getImage/",
};
const handleUploadImage = async (event, insertImage, files) => {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  let result =await proxy.Request({
        url: "/file/uploadFile",
        params: {
          file: files[0],
        },
      })
  if (result && result.code == 200 && result.data) {
    // 此处只做示例
    insertImage({
      url:
          `${api.getImage}${result.data}`,
      desc: '',
      width: "100%",
      height: "auto",
    });
  }
  return;
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
  coverType: [{ required: true, message: "请选择封面类型" }],
  coverPath: [{ required: true, message: "请选择封面" }],
  content: [{ required: true, message: "请输入内容" }],
};

const showEditShare = (data) => {
  dialogConfig.value.show = true;
  nextTick(() => {
    formDataRef.value.resetFields();
    formData.value = Object.assign({}, data || {});
  });
};

defineExpose({
  showEditShare,
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
      url: api.saveShare,
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
