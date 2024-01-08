<template>
  <div>
    <div class="top-panel">
      <el-card>
        <el-form :model="searchForm"  label-position="right">
          <el-row :gutter="5">
            <el-col :span="5">
              <el-form-item label="考试ID">
                <el-input
                  class="password-input"
                  v-model="searchForm.examId"
                  clearable
                  @keyup.enter.native="loadDataList"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户ID">
                <el-input
                  class="password-input"
                  v-model="searchForm.userId"
                  clearable
                  @keyup.enter.native="loadDataList"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <!-- 下拉框 -->
              <el-form-item label="状态" prop="" :style="{ width: '100%' }">
                <el-select
                    clearable
                    v-model="searchForm.status"
                    @keyup.enter.native="loadDataList"
                >
                  <el-option :value="1" label="已完成"></el-option>
                  <el-option :value="0" label="未完成"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" :style="{ paddingLeft: '10px' }">
              <el-button type="success" @click="loadDataList()"
                >查询
              </el-button>
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
      >slotAnswerList
        <template #slotAnswerList="{ index, row }">
          {{ row.answerList }}
        </template>
        <template #slotStatus="{ index, row }">
          <span style="color: red" v-if="row.status == 0">未完成</span>
          <span style="color: green" v-else>完成</span>
        </template>
      </Table>
    </el-card>
  </div>
</template>
<script setup>
import { getCurrentInstance, nextTick, ref } from "vue";

const { proxy } = getCurrentInstance();

const api = {
  loadDataList: "/appExam/loadExamDataList",
};

const tableData = ref({
  pageNo: 1,
  pageSize:30,
});
const tableOptions = {};
const columns = [
  {
    label: "ID",
    prop: "examId",
  },
  {
    label: "用户ID",
    prop: "userId",
  },
  {
    label: "昵称",
    prop: "nickName",
    scopedSlots: "slotNickName",
  },
  {
    label: "创建时间",
    prop: "createTime",
  },
  {
    label: "考试时间",
    prop: "startTime",
  },
  {
    label: "提交时间",
    prop: "endTime",
  },
  {
    label: "分数",
    prop: "score",
    width: 280,
  },
  {
    label: "回答结果",
    prop: "answerList",
    width: 280,
    scopedSlots: "slotAnswerList",
  },
  {
    label: "状态",
    prop: "status",
    width: 100,
    scopedSlots: "slotStatus",
  },
];

const searchForm = ref({});
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

</script>
<style lang="scss" scoped>
</style>
