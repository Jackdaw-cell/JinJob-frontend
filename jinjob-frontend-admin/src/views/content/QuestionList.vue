<template>
  <div>
    <div class="top-panel">
      <el-card>
        <el-form :model="searchForm" label-width="70px" label-position="right">
          <el-row>
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
            <el-col :span="3">
              <el-form-item label="分类" label-width="50px">
                <CategorySelect
                  :type="0"
                  v-model="searchForm.categoryId"
                  @change="loadDataList"
                ></CategorySelect>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <!-- 下拉框 -->
              <el-form-item label="难度" prop="" :style="{ width: '100%' }">
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
            <el-col :span="3">
              <!-- 下拉框 -->
              <el-form-item label="状态" prop="" :style="{ width: '100%' }">
                <el-select
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
            <el-col :span="3">
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
                  v-has="proxy.PermissionCode.question.edit"
                  type="primary"
                  @click="showEdit()"
                  >新增问题
                </el-button>
<!--                <el-button-->
<!--                  type="primary"-->
<!--                  @click="importDataHandler"-->
<!--                  v-has="proxy.PermissionCode.question.import"-->
<!--                  >批量导入</el-button-->
<!--                >-->
                <el-button
                  type="primary"
                  :disabled="selectRowList.length == 0"
                  @click="postQuestionBatch"
                  v-has="proxy.PermissionCode.question.post"
                  >批量发布</el-button
                >
                <el-button
                  type="danger"
                  :disabled="selectRowList.length == 0"
                  @click="delQuestionBatch"
                  v-has="proxy.PermissionCode.question.del_batch"
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
        <template #slotStatus="{ index, row }">
          <Badge showType="orange" text="待发布" v-if="row.status == 0"></Badge>
          <Badge showType="green" text="已发布" v-if="row.status == 1"></Badge>
        </template>
        <template #slotOperation="{ index, row }">
          <div class="row-op-panel">
            <a
              href="javascript:void(0)"
              @click="showEdit(row)"
              v-has="proxy.PermissionCode.question.edit"
              v-if="
                (row.status == 0 && row.createUserId == userInfo.userId) ||
                userInfo.superAdmin
              "
              >修改</a
            >
            <a
              href="javascript:void(0)"
              @click="delQuestion(row)"
              v-if="
                row.status == 0 &&
                (row.createUserId == userInfo.userId || userInfo.superAdmin)
              "
              v-has="proxy.PermissionCode.question.del"
              >删除</a
            >
            <a
              href="javascript:void(0)"
              @click="postQuestion(row)"
              v-if="row.status == 0"
              v-has="proxy.PermissionCode.question.post"
              >发布</a
            >
            <a
              href="javascript:void(0)"
              @click="cancelPostQuestion(row)"
              v-has="proxy.PermissionCode.question.post"
              v-if="row.status == 1"
              >取消发布</a
            >
          </div>
        </template>
      </Table>
    </el-card>
    <QuestionEdit ref="questionEditRef" @reload="loadDataList"></QuestionEdit>

    <ImportData
      ref="importDataRef"
      @callback="loadDataList"
      :type="0"
    ></ImportData>

    <ShowDetail ref="showDetailRef" :showType="1"></ShowDetail>
  </div>
</template>
<script setup>
import ShowDetail from "@/components/content/ShowDetail.vue";
import ImportData from "@/components/content/ImportData.vue";
import QuestionEdit from "./QuestionEdit.vue";
import { getCurrentInstance, nextTick, ref } from "vue";
const { proxy } = getCurrentInstance();

const api = {
  loadDataList: "/questionInfo/loadDataList",
  delQuestion: "/questionInfo/delQuestion",
  delQuestionBatch: "/questionInfo/delQuestionBatch",
  postQuestion: "/questionInfo/postQuestion",
  cancelPostQuestion: "/questionInfo/cancelPostQuestion",
};
//用户信息
const userInfo = ref(JSON.parse(sessionStorage.getItem("userInfo")) || {});

const tableData = ref({});
const tableOptions = {
  selectType: "checkbox",
};
const columns = [
  {
    label: "ID",
    prop: "questionId",
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
    width: 130,
    scopedSlots: "slotDifficultyLevel",
  },
  {
    label: "创建人",
    prop: "createUserName",
    width: 150,
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

const questionEditRef = ref();
const showEdit = (data) => {
  questionEditRef.value.showEditQuestion(data);
};

//删除
const delQuestion = (data) => {
  proxy.Confirm(`确定要删除【${data.title}】吗？`, () => {
    delQuestionDone({ questionId: data.questionId }, api.delQuestion);
  });
};

const delQuestionBatch = () => {
  proxy.Confirm(`确定要删除这${selectRowList.value.length}条记录吗？`, () => {
    delQuestionDone(
      { questionIds: selectRowList.value.join(",") },
      api.delQuestionBatch
    );
  });
};

const delQuestionDone = async (params, url) => {
  let result = await proxy.Request({
    url: url,
    params,
  });
  if (!result) {
    return;
  }
  proxy.Message.success("删除成功");
  loadDataList();
};

//发布
const postQuestion = (data) => {
  proxy.Confirm(`确定要发布【${data.title}】吗？`, () => {
    postQuestionDone(data.questionId);
  });
};

const postQuestionBatch = () => {
  proxy.Confirm(`确定要发布这${selectRowList.value.length}条记录吗？`, () => {
    postQuestionDone(selectRowList.value.join(","));
  });
};

const postQuestionDone = async (questionIds) => {
  let result = await proxy.Request({
    url: api.postQuestion,
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
const cancelPostQuestion = (data) => {
  proxy.Confirm(`确定要取消发布【${data.title}】吗？`, async () => {
    let result = await proxy.Request({
      url: api.cancelPostQuestion,
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
