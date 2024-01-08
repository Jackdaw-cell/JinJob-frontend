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
                  <el-option :value="0" label="未完成"></el-option>
                  <el-option :value="1" label="执行失败"></el-option>
                  <el-option :value="2" label="通过"></el-option>
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
      >slotCode
        <template #slotNickName="{ index, row }">
          <span>{{ row.nickName }}</span>
          <span v-if="row.sex == 0">(女)</span>
          <span v-if="row.sex == 1">(男)</span>
        </template>
        <template #slotStatus="{ index, row }">
          <span style="color: red" v-if="row.status == 0">未完成</span>
          <span style="color: green" v-else-if="row.status == 1">执行失败</span>
          <span style="color: green" v-if="row.status == 2">通过</span>
        </template>
      </Table>
    </el-card>
  </div>
</template>
<script setup>
import { getCurrentInstance, nextTick, ref } from "vue";

const { proxy } = getCurrentInstance();

const api = {
  loadDataList: "/appExam/loadOjSubmitDataList",
};

const tableData = ref({
  pageNo: 1,
  pageSize: 30,
});
const tableOptions = {};
const columns = [
  {
    label: "ID",
    prop: "id",
  },
  {
    label: "用户ID",
    prop: "userId",
  },
  {
    label: "提交代码",
    prop: "code",
  },
  {
    label: "创建时间",
    prop: "createTime",
    width: 280,
  },
  {
    label: "修改时间",
    prop: "updateTime",
    width: 280,
  },
  {
    label: "提交结果",
    prop: "judgeInfo",
    width: 280,
  },
  {
    label: "编程语言",
    prop: "language",
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
