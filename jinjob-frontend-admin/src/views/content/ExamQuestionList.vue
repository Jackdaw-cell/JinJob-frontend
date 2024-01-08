<template>
  <div>
    <div class="top-panel">
      <el-card>
        <el-form :model="searchForm" label-width="70px" label-position="right">
          <el-row :gutter="5">
            <el-col :span="4">
              <el-form-item label="标题" label-width="40px">
                <el-input
                  class="password-input"
                  v-model="searchForm.titleFuzzy"
                  clearable
                  placeholder="支持模糊搜索"
                  @keyup.enter="loadDataList"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="分类">
                <CategorySelect
                  :type="1"
                  v-model="searchForm.categoryId"
                  @change="loadDataList"
                ></CategorySelect>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <!-- 下拉框 -->
              <el-form-item
                label="难度"
                label-width="50px"
                prop=""
                :style="{ width: '100%' }"
              >
                <el-select
                  clearable
                  placeholder="请选择难度"
                  v-model="searchForm.difficultyLevel"
                  @change="loadDataList"
                >
                  <el-option :value="1" label="一星"></el-option>
                  <el-option :value="2" label="二星"></el-option>
                  <el-option :value="3" label="三星"></el-option>
                  <el-option :value="4" label="四星"></el-option>
                  <el-option :value="5" label="五星"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <!-- 下拉框 -->
              <el-form-item label="问题类型" :style="{ width: '100%' }">
                <el-select
                  clearable
                  placeholder="请问题类型"
                  v-model="searchForm.questionType"
                  @change="loadDataList"
                >
                  <el-option :value="0" label="判断题"></el-option>
                  <el-option :value="1" label="单选题"></el-option>
                  <el-option :value="2" label="多选题"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5" :style="{ 'margin-top': '5px' }">
            <el-col :span="4">
              <!-- 下拉框 -->
              <el-form-item label="状态" label-width="40px">
                <el-select
                  :style="{ width: '100%' }"
                  clearable
                  placeholder="请选择状态"
                  v-model="searchForm.status"
                  @change="loadDataList"
                >
                  <el-option :value="0" label="待发布"></el-option>
                  <el-option :value="1" label="已发布"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="创建人" prop="" :style="{ width: '100%' }">
                <el-input
                  class="password-input"
                  v-model="searchForm.createUserNameFuzzy"
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
<!--                <el-button-->
<!--                  type="primary"-->
<!--                  @click="importDataHandler"-->
<!--                  v-has="proxy.PermissionCode.examQuestion.import"-->
<!--                  >批量导入</el-button-->
<!--                >-->
                <el-button
                  type="primary"
                  :disabled="selectRowList.length == 0"
                  @click="postExamQuestionBatch"
                  v-has="proxy.PermissionCode.examQuestion.post"
                  >批量发布</el-button
                >
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
        <template #slotDifficultyLevel="{ index, row }">
          <el-rate v-model="row.difficultyLevel" :disabled="true" />
        </template>
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
              v-if="
                row.status == 0 &&
                (row.createUserId == userInfo.userId || userInfo.superAdmin)
              "
              v-has="proxy.PermissionCode.examQuestion.del"
              >删除</a
            >
            <a
              href="javascript:void(0)"
              @click="postExamQuestion(row)"
              v-if="row.status == 0"
              v-has="proxy.PermissionCode.examQuestion.post"
              >发布</a
            >
            <a
              href="javascript:void(0)"
              @click="cancelPostExamQuestion(row)"
              v-if="row.status == 1"
              v-has="proxy.PermissionCode.examQuestion.post"
              >取消发布</a
            >
          </div>
        </template>
        <template #slotStatus="{ index, row }">
          <Badge showType="orange" text="待发布" v-if="row.status == 0"></Badge>
          <Badge showType="green" text="已发布" v-if="row.status == 1"></Badge>
        </template>
        <template #slotQuestionType="{ index, row }">
          {{ QUESTION_TYPE[row.questionType] }}
        </template>
      </Table>
    </el-card>
    <ExamQuestionEdit
      ref="examQuestionEditRef"
      @reload="loadDataList"
    ></ExamQuestionEdit>

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
import ExamQuestionEdit from "./ExamQuestionEdit.vue";
import { getCurrentInstance, nextTick, ref } from "vue";

const { proxy } = getCurrentInstance();

const api = {
  loadDataList: "/examQuestion/loadDataList",
  delExamQuestion: "/examQuestion/delExamQuestion",
  delExamQuestionBatch: "/examQuestion/delExamQuestionBatch",
  postExamQuestion: "/examQuestion/postExamQuestion",
  cancelPostExamQuestion: "/examQuestion/cancelPostExamQuestion",
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
    prop: "questionId",
    width: 80,
  },
  {
    label: "标题",
    prop: "title",
    scopedSlots: "slotTitle",
  },
  {
    label: "分类",
    prop: "categoryName",
    width: 150,
  },
  {
    label: "难度",
    prop: "difficultyLevel",
    scopedSlots: "slotDifficultyLevel",
    width: 130,
  },
  {
    label: "问题类型",
    prop: "questionType",
    scopedSlots: "slotQuestionType",
    width: 100,
  },
  {
    label: "创建人",
    prop: "createUserName",
    width: 130,
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 180,
  },
  {
    label: "发布状态",
    prop: "status",
    scopedSlots: "slotStatus",
    width: 90,
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
    return item.questionId;
  });
};

//复选事件
const selectedHandler = (row, index) => {
  return row.status == 0;
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
    delExamQuestionDone({ questionId: data.questionId }, api.delExamQuestion);
  });
};

const delExamQuestionBatch = () => {
  proxy.Confirm(`确定要删除这${selectRowList.value.length}条记录吗？`, () => {
    delExamQuestionDone(
      { questionIds: selectRowList.value.join(",") },
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

//发布
const postExamQuestion = (data) => {
  proxy.Confirm(`确定要发布【${data.title}】吗？`, () => {
    postExamQuestionDone(data.questionId);
  });
};

const postExamQuestionBatch = () => {
  proxy.Confirm(`确定要发布这${selectRowList.value.length}条记录吗？`, () => {
    postExamQuestionDone(selectRowList.value.join(","));
  });
};

const postExamQuestionDone = async (questionIds) => {
  let result = await proxy.Request({
    url: api.postExamQuestion,
    params: {
      questionIds,
    },
  });
  if (!result) {
    return;
  }
  proxy.Message.success("发布成功");
  loadDataList();
};

//取消发布
const cancelPostExamQuestion = (data) => {
  proxy.Confirm(`确定要取消发布【${data.title}】吗？`, async () => {
    let result = await proxy.Request({
      url: api.cancelPostExamQuestion,
      params: {
        questionIds: data.questionId,
      },
    });
    if (!result) {
      return;
    }
    proxy.Message.success("取消发布成功");
    loadDataList();
  });
};

const importDataRef = ref();
const importDataHandler = () => {
  importDataRef.value.showImport();
};

const showDetailRef = ref();
const showDetail = (row) => {
  showDetailRef.value.show(row.questionId, searchForm.value);
};
</script>
<style lang="scss" scoped>
.check-span-item {
  float: left;
  margin-right: 10px;
  line-height: 20px;
}
</style>
