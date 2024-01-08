<template>
  <div>
    <div class="top-panel">
      <el-card>
        <el-form :model="searchForm" label-width="70px" label-position="right">
          <el-row :gutter="5">
            <el-col :span="4">
              <el-form-item label="ID" label-width="40px">
                <el-input
                  class="password-input"
                  v-model="searchForm.id"
                  clearable
                  placeholder="支持模糊搜索"
                  @keyup.enter="loadDataList"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="标题" label-width="40px">
                <el-input
                    class="password-input"
                    v-model="searchForm.title"
                    clearable
                    placeholder="支持模糊搜索"
                    @keyup.enter="loadDataList"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :style="{ paddingLeft: '10px' }">
              <el-button-group>
                <el-button type="success" @click="loadDataList()"
                >查询
                </el-button>
                <el-button
                    type="primary"
                    @click="showEdit()"
                    v-has="proxy.PermissionCode.examQuestion.edit"
                >新增问题
                </el-button>
                <el-button
                    type="danger"
                    :disabled="selectRowList.length == 0"
                    @click="delExamQuestionBatch"
                    v-has="proxy.PermissionCode.examQuestion.del_batch"
                >批量删除</el-button
                >
              </el-button-group>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <el-card class="table-data-card">
      <Table
        :columns="columns"
        :fetch="loadDataList"
        :dataSource="tableData"
        :options="tableOptions"
        :extHeight="tableOptions.extHeight"
        @rowSelected="rowSelected"
        :selected="selectedHandler"
      >
        <template #slotTitle="{ index, row }">
          <a
            href="javascript:void(0)"
            class="a-link"
            @click="showDetail(row)"
            >{{ row.title }}</a
          >
        </template>
        <template #slotTags="{ index, row }">
          <el-tag size="mini" v-for="tag in JSON.parse(row.tags)">{{ tag }}</el-tag>
        </template>
        <template #slotAnswer="{ index, row }"></template>
        <template #slotOperation="{ index, row }">
          <div class="row-op-panel">
            <a
              href="javascript:void(0)"
              @click="showEdit(row)"
              v-if="
                (row.status == 0 && row.createUserId == userInfo.userId) ||
                userInfo.superAdmin
              "
              v-has="proxy.PermissionCode.examQuestion.edit"
              >修改</a
            >
            <a
              href="javascript:void(0)"
              @click="delExamQuestion(row)"
              v-has="proxy.PermissionCode.examQuestion.del"
              >删除</a
            >
          </div>
        </template>
      </Table>
    </el-card>
    <OjQuestionEdit
      ref="examQuestionEditRef"
      @reload="loadDataList"
    ></OjQuestionEdit>

    <ImportData
      ref="importDataRef"
      @callback="loadDataList"
      :type="1"
    ></ImportData>
    <ShowDetail ref="showDetailRef" :showType="2"></ShowDetail>
  </div>
</template>
<script setup>
import { QUESTION_TYPE } from "@/utils/Constants.js";
import ShowDetail from "@/components/content/ShowDetail.vue";
import ImportData from "@/components/content/ImportData.vue";
import { getCurrentInstance, nextTick, ref } from "vue";
import OjQuestionEdit from "@/views/content/OjQuestionEdit.vue";

const { proxy } = getCurrentInstance();

const api = {
  loadDataList: "/ojQuestionInfo/loadDataList",
  delExamQuestion: "/ojQuestionInfo/delOjQuestionInfo",
  delExamQuestionBatch: "/ojQuestionInfo/delOjQuestionInfoBatch",
};

//用户信息
const userInfo = ref(JSON.parse(sessionStorage.getItem("userInfo")) || {});

const tableData = ref({});
const tableOptions = {
  extHeight: 105,
  selectType: "checkbox",
};
const columns = [
  {
    label: "ID",
    prop: "id",
    width: 200
  },
  {
    label: "标题",
    prop: "title",
    scopedSlots: "slotTitle",
  },
  {
    label: "类型",
    prop: "tags",
    width: 150,
    scopedSlots: "slotTags"
  },
  {
    label: "输入/输出",
    prop: "descript",
  },
  {
    label: "内容",
    prop: "content",
  },
  {
    label: "创建人",
    prop: "createId",
    width: 130,
  },
  {
    label: "更新时间",
    prop: "updateTime",
    width: 300,
  },
  {
    label: "操作",
    width: 130,
    scopedSlots: "slotOperation",
  },
];
const searchForm = ref({});

//批量选择
const selectRowList = ref([]);
const rowSelected = (rows) => {
  selectRowList.value = rows.map((item) => {
    return item.id;
  });
};

//复选事件
const selectedHandler = (row, index) => {
  return row.id;
};

const loadDataList = async () => {
  let params = {
    pageNo: tableData.value.pageNo,
    pageSize: tableData.value.pageSize,
  };
  Object.assign(params, searchForm.value);
  let result = await proxy.Request({
    url: api.loadDataList,
    params: params,
  });
  if (!result) {
    return;
  }
  Object.assign(tableData.value, result.data);
};

const examQuestionEditRef = ref();
const showEdit = (data) => {
  examQuestionEditRef.value.showEditQuestion(data);
};

//删除
const delExamQuestion = (data) => {
  proxy.Confirm(`确定要删除【${data.title}】吗？`, () => {
    delExamQuestionDone({ id: data.id }, api.delExamQuestion);
  });
};

const delExamQuestionBatch = () => {
  proxy.Confirm(`确定要删除这${selectRowList.value.length}条记录吗？`, () => {
    delExamQuestionDone(
      { ids: selectRowList.value.join(",") },
      api.delExamQuestionBatch
    );
  });
};

const delExamQuestionDone = async (params, url) => {
  let result = await proxy.Request({
    url: url,
    params: params,
  });
  if (!result) {
    return;
  }
  proxy.Message.success("删除成功");
  loadDataList();
};

const showDetailRef = ref();
const showDetail = (row) => {
  showDetailRef.value.show(row.id, searchForm.value);
};
</script>
<style lang="scss" scoped>
.check-span-item {
  float: left;
  margin-right: 10px;
  line-height: 20px;
}
</style>
