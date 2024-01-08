<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="5" :xs="24">
        <t-form
          ref="form"
          :colon="false"
          :labelAlign="'top'"
          @reset="onReset"
          @submit="onSubmitExamPage"
        >
          <t-form-item>
            <t-card :cover="cover" :style="{ width: '400px' }">
              <template #footer>
                <t-row :align="'middle'" justify="center" style="gap: 24px">
                  <t-col
                    flex="auto"
                    style="display: inline-flex; justify-content: center"
                  >
                    <t-button variant="text" theme="primary" type="submit">
                      开始考试
                    </t-button>
                  </t-col>
                </t-row>
              </template>
            </t-card>
          </t-form-item>
          <t-divider align="left" theme="vertical">您需要学习什么？</t-divider>
          <t-form-item name="categoryList">
            <t-space align="center">
              <t-checkbox-group
                v-model="categoryList"
                :options="options"
                multiple
                @change="onChange1"
              />
            </t-space>
          </t-form-item>
          <t-space style="color: orange; font-size: 90%">
            <CatIcon /> 考试将从你想学的专题题库里面随机出题~
          </t-space>
        </t-form>
      </a-col>
      <a-col :md="18" :xs="24">
        <a-list
          class="list-demo-action-layout"
          :bordered="false"
          :data="examDataSource"
          :pagination-props="paginationProps"
          hoverable="true"
        >
          <template #item="{ item }">
            <a-list-item
              class="list-demo-item"
              action-layout="vertical"
              @click="examShowPage(item.examId)"
            >
              <template #actions>
                <span
                  ><Tag :severity="item.status == 1 ? 'success' : 'warning'">{{
                    item.status == 1 ? "已完成" : "未完成"
                  }}</Tag>
                </span>
                <span>考试日期: {{ item.endTime }}</span>
              </template>
              <template #extra>
                判题雷达：
                <div className="image-area">
                  <Tag
                    v-for="(answer, index) in item.answerList"
                    :key="index"
                    :severity="answer == 1 ? 'success' : 'danger'"
                    style="margin-right: 2px"
                  ></Tag>
                </div>
              </template>
              <a-list-item-meta
                :title="item.title"
                :description="item.description"
              >
                <template #avatar>
                  <a-avatar
                    shape="square"
                    :style="
                      item.score < 15
                        ? 'background-color: #ff0000'
                        : 'background-color: #2682ff'
                    "
                  >
                    {{ item.score }}<t-space style="font-size: 40%">分</t-space>
                  </a-avatar>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
        <t-pagination
          :total="totalCount"
          showPageSize
          v-model="currentPageNo"
          v-model:pageSize="currentPageSize"
          @page-size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const checked = ref(false);
const date = ref(new Date());
import { useRouter } from "vue-router";
import { CatIcon } from "tdesign-icons-vue-next";
import {
  AppExamControllerService,
  Category,
  IndexControllerService,
} from "../../../generatedCode/questionService";
import message from "@arco-design/web-vue/es/message";
const names = ["Socrates", "Balzac", "Plato"];
const cover = "https://tdesign.gtimg.com/site/source/card-demo.png";
const form = ref(null);
const router = useRouter();
const currentPageNo = ref(1);
const currentPageSize = ref(5);
const totalCount = ref(0);
import Tag from "primevue/tag";
import { useStore } from "vuex";
class exam {
  "title": string | undefined;
  "description": string | undefined;
  "examId": number | undefined;
  "userId": string | undefined;
  "nickName": string | undefined;
  createTime: string | undefined;
  startTime: string | undefined;
  "endTime": string | undefined;
  "status": number | undefined;
  "score": number | undefined;
  "answerList": Array<number> | undefined;
  "remark": string | undefined;
}
const onSubmitExamPage = () => {
  router.push({
    path: `/examSubmit`,
  });
};
const examShowPage = (examId: number) => {
  router.push({
    path: `/examShow/${examId}`,
  });
};
const categoryList = ref([]);
const options = ref<Array<{ label: string; value: number }>>([]);

const examDataSource = ref<Array<exam>>([]);

const loadData = async () => {
  loadcAllCategoryList();
  categoryList.value = store.state.exam?.tags || [];
  await loadExamItem(currentPageNo.value, currentPageSize.value);
};
const loadcAllCategoryList = async () => {
  //加载所有分类
  let categoryListRes = await IndexControllerService.loadAllCategoryUsingGet(0);
  if (categoryListRes.code == 0 && categoryListRes.data) {
    categoryListRes.data.forEach((item) => {
      if (item.categoryName && item.categoryId) {
        return options.value.push({
          label: item.categoryName,
          value: item.categoryId,
        });
      }
    });
  }
};
const loadExamItem = async (
  pageNo: number | undefined,
  pageSize: number | undefined
) => {
  //加载所有考试记录
  examDataSource.value = [];
  const res = await AppExamControllerService.loadExamUsingGet(
    1,
    pageNo,
    pageSize
  );
  if (res.code === 0) {
    if (res.data?.totalCount) {
      totalCount.value = res.data?.totalCount;
    }
    res.data?.list?.forEach((item) => {
      const examItem = new exam();
      examItem.examId = item.examId;
      examItem.nickName = item.nickName;
      examItem.startTime = item.startTime;
      examItem.endTime = item.endTime;
      examItem.status = item.status;
      examItem.score = item.score;
      examItem.title = "每日小测";
      examItem.description = "每日考试将作为签到凭证";
      examItem.answerList = item.answerList?.split("").map(function (bit) {
        return parseInt(bit, 10);
      });
      examItem.remark = item.remark;
      examDataSource.value.push(examItem);
    });
  } else {
    message.error("加载失败，" + res.message);
  }
};
const onPageSizeChange = async (pageSize: number) => {
  currentPageSize.value = pageSize;
  await loadExamItem(currentPageNo.value, pageSize);
};

const onCurrentChange = async (pageNo: number, pageInfo: any) => {
  currentPageNo.value = pageNo;
  await loadExamItem(pageNo, currentPageSize.value);
};
const store = useStore();
const onChange1 = async (val: any) => {
  await store.dispatch("exam/updateTags", val);
};
onMounted(() => {
  loadData();
});
</script>

<style>
.parent {
  display: flex;
  flex-direction: column; /* 父元素变为纵向排列 */
  align-items: flex-start; /* 子元素沿主轴左对齐 */
  justify-content: flex-start; /* 子元素沿交叉轴上对齐 */
}
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}
</style>
