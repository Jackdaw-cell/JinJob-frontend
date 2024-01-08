<template>
  <div>
    <div class="top-panel">
      <el-card>
        <el-form :model="searchForm" label-width="70px" label-position="right">
          <el-row>
            <el-col :span="5">
              <el-form-item label="发布日期" label-width="70px">
                <el-date-picker
                  v-model="searchFormData.createTimeRange"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="YYYY-MM-DD"
                  @change="loadDataList"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4" :style="{ paddingLeft: '10px' }">
              <el-button type="success" @click="loadDataList()"
                >查询
              </el-button>
              <el-button
                v-has="proxy.PermissionCode.app.app_update_edit"
                type="primary"
                @click="showEdit()"
                >发布版本
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
      >
        <template #slotUpdateDesc="{ index, row }">
          <div v-for="(item, num) in row.updateDescArray">
            {{ num + 1 }}、{{ item }}
          </div>
        </template>

        <template #slotUpdateType="{ index, row }">
          <div v-if="row.updateType == 0">全部更新</div>
          <div v-if="row.updateType == 1">局部热更新</div>
        </template>

        <template #slotStatus="{ index, row }">
          <Badge
            showType="#f56c6c"
            text="未发布"
            v-if="row.status == 0"
          ></Badge>
          <Badge
            showType="#f7ba2a"
            text="灰度发布"
            v-if="row.status == 1"
          ></Badge>
          <Badge
            showType="#529b2e"
            text="全网发布"
            v-if="row.status == 2"
          ></Badge>
        </template>
        <template #slotOperation="{ index, row }">
          <div class="row-op-panel">
            <a
              v-has="proxy.PermissionCode.app.app_update_edit"
              href="javascript:void(0)"
              @click="showEdit(row)"
              >修改</a
            >
            <a
              v-has="proxy.PermissionCode.app.app_update_post"
              href="javascript:void(0)"
              @click="updatePost(row)"
              >发布</a
            >
            <a
              v-has="proxy.PermissionCode.app.app_update_edit"
              href="javascript:void(0)"
              @click="del(row)"
              >删除</a
            >
          </div>
        </template>
      </Table>
    </el-card>
    <UpdateEdit ref="updateEditRef" @reload="loadDataList"></UpdateEdit>

    <UpdatePost ref="updatePostRef" @reload="loadDataList"></UpdatePost>
  </div>
</template>
<script setup>
import UpdateEdit from "./UpdateEdit.vue";
import UpdatePost from "./UpdatePost.vue";
import { getCurrentInstance, nextTick, ref } from "vue";

const { proxy } = getCurrentInstance();

const api = {
  loadDataList: "/app/loadDataList",
  delUpdate: "/app/delUpdate",
};

const searchFormData = ref({});

const tableData = ref({});
const tableOptions = {};
const columns = [
  {
    label: "版本",
    prop: "version",
  },
  {
    label: "更新内容",
    prop: "updateDesc",
    scopedSlots: "slotUpdateDesc",
  },
  {
    label: "发布时间",
    prop: "createTime",
  },
  {
    label: "更新类型",
    prop: "updateType",
    scopedSlots: "slotUpdateType",
  },
  {
    label: "状态",
    prop: "status",
    scopedSlots: "slotStatus",
  },
  {
    label: "操作",
    prop: "operation",
    scopedSlots: "slotOperation",
  },
];

const searchForm = ref({});

const loadDataList = async () => {
  let params = {
    pageNo: tableData.value.pageNo,
    pageSize: tableData.value.pageSize,
  };
  if (searchFormData.value.createTimeRange) {
    params.createTimeStart = searchFormData.value.createTimeRange[0];
    params.createTimeEnd = searchFormData.value.createTimeRange[1];
  }
  delete params.createTimeRange;
  Object.assign(params, searchForm.value);
  let result = await proxy.Request({
    url: api.loadDataList,
    params: params,
  });
  if (!result) {
    return;
  }
  tableData.value = result.data;
};

const updateEditRef = ref();
const showEdit = (data) => {
  updateEditRef.value.showEdit(data);
};

//删除用户
const del = (data) => {
  proxy.Confirm(`确定要删除【${data.version}】吗？`, async () => {
    let result = await proxy.Request({
      url: api.delUpdate,
      params: {
        id: data.id,
      },
    });
    if (!result) {
      return;
    }
    proxy.Message.success("删除成功");
    loadDataList();
  });
};

//发布更新
const updatePostRef = ref();
const updatePost = (data) => {
  updatePostRef.value.showEdit(data);
};
</script>
<style lang="scss" scoped>
</style>
