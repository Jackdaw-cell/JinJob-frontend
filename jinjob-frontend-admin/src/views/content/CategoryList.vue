<template>
  <div>
    <div class="top-panel">
      <el-card>
        <el-button
          type="primary"
          @click="editCategory('add')"
          v-has="proxy.PermissionCode.category.edit"
          >新增分类</el-button
        >
      </el-card>
    </div>
    <el-card class="table-data-card">
      <Table
        ref="dataTabelRef"
        :columns="columns"
        :dataSource="tableData"
        :fetch="loadDataList"
        :initFetch="true"
        :options="tableOptions"
        :showPagination="false"
      >
        <!--封面-->
        <template #iconPathSlot="{ index, row }">
          <Cover
            :width="200"
            :height="200"
            :cover="row.iconPath"
            :bgColor="row.bgColor"
            :title="row.categoryName"
          ></Cover>
        </template>
        <!--问题分类-->
        <template #typeSlot="{ index, row }">
          <span v-if="row.type == 0">问题分类</span>
          <span v-if="row.type == 1">考题分类</span>
          <span v-if="row.type == 2">问题/考题分类</span>
        </template>
        <!--操作-->
        <template #opSlot="{ index, row }">
          <div class="row-op-panel">
            <a
              href="javascript:void(0)"
              @click="editCategory('edit', row)"
              v-has="proxy.PermissionCode.category.edit"
              >修改</a
            >
            <a
              href="javascript:void(0)"
              @click="delCategory(row)"
              v-has="proxy.PermissionCode.category.del"
              >删除</a
            >
            <a
              v-has="proxy.PermissionCode.category.edit"
              href="javascript:void(0)"
              :class="[index == 0 ? 'not-allow' : 'a-link']"
              @click="changeSort(index, 'up')"
              >上移</a
            >
            <a
              v-has="proxy.PermissionCode.category.edit"
              href="javascript:void(0)"
              :class="[
                index == tableData.list.length - 1 ? 'not-allow' : 'a-link',
              ]"
              @click="changeSort(index, 'down')"
              >下移</a
            >
          </div>
        </template>
      </Table>
    </el-card>

    <Dialog
      :show="dialogConfig.show"
      :title="dialogConfig.title"
      :buttons="dialogConfig.buttons"
      width="500px"
      @close="dialogConfig.show = false"
    >
      <el-form
        :model="formData"
        :rules="rules"
        ref="formDataRef"
        label-width="80px"
        @submit.prevent
      >
        <!--input输入-->
        <el-form-item label="分类名称" prop="categoryName">
          <el-input
            clearable
            placeholder="请输入分类名称"
            v-model.trim="formData.categoryName"
          ></el-input>
        </el-form-item>
        <!--input输入-->
        <el-form-item label="封面类型" prop="coverType">
          <el-radio-group v-model="formData.coverType">
            <el-radio :label="0">背景颜色</el-radio>
            <el-radio :label="1">图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--input输入-->
        <el-form-item
          label="背景颜色"
          prop="bcColor"
          v-if="formData.coverType == 0"
        >
          <el-color-picker v-model="formData.bgColor" />
        </el-form-item>
        <!--input输入-->
        <el-form-item
          label="图片封面"
          prop="iconPath"
          v-if="formData.coverType == 1"
        >
          <CoverUpload v-model="formData.iconPath" :type="0"></CoverUpload>
        </el-form-item>
        <!-- 单选 -->
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="formData.type">
            <el-radio :label="0">问题分类</el-radio>
            <el-radio :label="1">考题分类</el-radio>
            <el-radio :label="2">问题/考题分类</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const api = {
  loadCategory: "/category/loadAllCategory",
  saveCategory: "/category/saveCategory",
  delCategory: "/category/delCategory",
  changeSort: "/category/changeSort",
};

const columns = [
  {
    label: "封面",
    prop: "iconPath",
    scopedSlots: "iconPathSlot",
    width: 250,
  },
  {
    label: "分类名称",
    prop: "categoryName",
  },
  {
    label: "类型",
    prop: "type",
    scopedSlots: "typeSlot",
  },
  {
    label: "操作",
    prop: "type",
    scopedSlots: "opSlot",
    width: 200,
  },
];
const tableData = ref({});
const tableOptions = {};
const loadDataList = async () => {
  let params = {
    pageNo: tableData.value.pageNo,
    pageSize: tableData.value.pageSize,
  };
  let result = await proxy.Request({
    url: api.loadCategory,
    params,
  });
  if (!result) {
    return;
  }
  tableData.value.list = result.data;
};

const dialogConfig = ref({
  show: false,
  title: "编辑分类",
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
  categoryName: [{ required: true, message: "请输入分类名称" }],
  type: [{ required: true, message: "请选择类型" }],
  coverType: [{ required: true, message: "封面类型" }],
  iconPath: [{ required: true, message: "请上传封面" }],
  bgColor: [{ required: true, message: "请选择背景颜色" }],
};

const editCategory = (type, data) => {
  dialogConfig.value.show = true;
  nextTick(() => {
    formDataRef.value.resetFields();
    if (type == "add") {
      dialogConfig.value.title = "新增分类";
      formData.value = {};
    } else {
      dialogConfig.value.title = "修改分类";
      if (data.bgColor != null && data.bgColor != "") {
        data.coverType = 0;
      } else if (data.iconPath != null && data.iconPath != "") {
        data.coverType = 1;
      }
      formData.value = Object.assign({}, data);
    }
  });
};

const submitForm = () => {
  formDataRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    let params = {};
    Object.assign(params, formData.value);

    if (params.coverType == 0) {
      params.iconPath = "";
    } else if (params.coverType == 1) {
      params.bgColor = "";
    }
    let result = await proxy.Request({
      url: api.saveCategory,
      params,
    });
    if (!result) {
      return;
    }
    proxy.Message.success("保存成功");
    dialogConfig.value.show = false;
    loadDataList();
  });
};

//删除
const delCategory = (row) => {
  proxy.Confirm(`确定要删除【${row.categoryName}】吗？`, async () => {
    let result = await proxy.Request({
      url: api.delCategory,
      params: {
        categoryId: row.categoryId,
      },
    });
    if (!result) {
      return;
    }
    proxy.Message.success("删除成功");
    loadDataList();
  });
};

//修改排序
const changeSort = async (index, type) => {
  let dataList = tableData.value.list;
  if (
    (type === "down" && index === dataList.length - 1) ||
    (type === "up" && index === 0)
  ) {
    return;
  }
  let temp = dataList[index];
  let number = type == "down" ? 1 : -1;
  dataList.splice(index, 1);
  dataList.splice(index + number, 0, temp);

  let categoryIds = [];
  dataList.forEach((element) => {
    categoryIds.push(element.categoryId);
  });

  let result = await proxy.Request({
    url: api.changeSort,
    params: {
      categoryIds: categoryIds.join(","),
    },
  });

  if (!result) {
    return;
  }
  proxy.Message.success("重新排序成功");
  loadDataList();
};
</script>

<style lang="scss" scoped>
</style>
