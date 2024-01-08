<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="16" :xs="24">
        <a-list
          style="min-height: 600px"
          class="list-demo-action-layout"
          :bordered="false"
          :data="shareList"
          :pagination-props="paginationProps"
        >
          <template #item="{ item }">
            <a-list-item
              class="list-demo-item"
              action-layout="vertical"
              @click="articleShowPage(item.shareId)"
            >
              <template #actions>
                <span style="font-size: 80%"
                  ><icon-star />发布于{{ item.createTime }}</span
                >
              </template>
              <template #extra>
                <a-image
                  v-if="item.coverPath"
                  width="150"
                  fit="fill"
                  alt="some-error.png"
                  :src="`/api/admin/file/getImage/${item.coverPath}`"
                />
              </template>
              <a-list-item-meta
                :title="item.title"
                :description="item.description"
              >
                <template #avatar>
                  <a-avatar shape="square">
                    {{ item.createUserName }}
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
      <a-col :md="6" :xs="6">
        <t-card title="考试分析" header-bordered hover-shadow v-if="loginUser">
          <t-space>
            <t-statistic title="编程题通过数" :value="examInfo.ojAcSum || 0" />
            <t-statistic
              title="面试题总体分数[30分制]"
              :value="examInfo.examAcScore || 0"
            />
          </t-space>
        </t-card>
        <a-page-header
          :show-back="false"
          :style="{ background: 'var(--color-bg-2)' }"
          title="打卡记录"
          subtitle="每日考试即可完成打卡~"
        >
        </a-page-header>
        <t-calendar theme="card" :controllerConfig="false">
          <template #cell="data">
            <div class="outerWarper">
              <div class="number" v-if="data.belongTo == 0">
                <t-tag
                  v-if="checkinInfo && todayDay >= displayNum(data)"
                  :theme="
                    checkinInfo.charAt(displayNum(data) - 1) == '1'
                      ? 'primary'
                      : 'warning'
                  "
                  >{{ displayNum(data) }}</t-tag
                >
                <t-tag v-else>{{ displayNum(data) }}</t-tag>
              </div>
            </div>
          </template>
        </t-calendar>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import {
  AppCarousel,
  AppExamControllerService,
  IndexControllerService,
  MyControllerService,
  ShareControllerService,
  ShareInfo,
} from "../../../generatedCode/questionService";
import store from "@/store";
import { useRouter } from "vue-router";
import Carousel from "primevue/carousel";
let loginUser = ref(store.state.user.loginUser);
const shareList = ref<Array<ShareInfo> | undefined>([]);
const carouselList = ref<Array<AppCarousel> | undefined>([]);
const examInfo = ref<{
  userId: string;
  ojAcSum: number;
  examAcSum: number;
  examAcScore: number;
}>({
  userId: "",
  ojAcSum: 0,
  examAcSum: 0,
  examAcScore: 0,
});
const checkinInfo = ref("");
const current = ref(0);
const router = useRouter();
//分页
const currentPageNo = ref(1);
const currentPageSize = ref(5);
const totalCount = ref(0);
const onPageSizeChange = async (pageSize: number) => {
  currentPageSize.value = pageSize;
  await loadShareData(currentPageNo.value, pageSize);
};

const onCurrentChange = async (pageNo: number, pageInfo: any) => {
  currentPageNo.value = pageNo;
  await loadShareData(pageNo, currentPageSize.value);
};
const loadData = async () => {
  checkinInfo.value = (
    await MyControllerService.getCheckinInfoUsingGet()
  )?.data;
  await loadShareData(currentPageNo.value, currentPageSize.value);
  await loadCarouselData();
  await loadExamInfoData();
};

const loadShareData = async (
  currentPageNo: number | undefined,
  currentPageSize: number | undefined
) => {
  let shareListResult = await ShareControllerService.loadShareListUsingGet(
    currentPageNo,
    currentPageSize
  );
  if (shareListResult.code === 0) {
    if (shareListResult.data?.totalCount) {
      totalCount.value = shareListResult.data?.totalCount;
    }
    shareList.value = shareListResult?.data?.list;
  }
};
const loadCarouselData = async () => {
  let carouselListResult = await IndexControllerService.loadCarouselUsingGet();
  if (carouselListResult.code === 0) {
    carouselList.value = carouselListResult?.data;
  }
};
const loadExamInfoData = async () => {
  let ExamInfoResult = await MyControllerService.getExamInfoUsingGet();
  if (ExamInfoResult.code === 0) {
    examInfo.value = ExamInfoResult?.data;
  }
};

const isShow = (data: {
  mode: string;
  formattedDate: string | number | Date | dayjs.Dayjs | null | undefined;
}) => {
  return data.mode === "month"
    ? dayjs(data.formattedDate).date() === 15
    : dayjs(data.formattedDate).month() === 7;
};
const todayDay = ref(new Date().getDate());
const dateIndex = ref(0);
const displayNum = (cellData: {
  mode: string;
  date: { getDate: () => any; getMonth: () => number };
}) => {
  if (cellData.mode === "month") {
    return cellData.date.getDate();
  }
  return cellData.date.getMonth() + 1;
};
const articleShowPage = (shareId: number) => {
  router.push({
    path: `/articleShow/${shareId}`,
  });
};
onMounted(() => {
  loadData();
});
</script>

<style>
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
