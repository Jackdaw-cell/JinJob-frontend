<template>
  <div id="questionsView">
    <a-layout>
      <a-layout-sider>
        <t-menu theme="light" width="200px" height="550px" :onChange="onChange">
          <t-menu-item
            v-for="i in treeData"
            :value="i"
            :key="i.key"
            :onClick="onClick"
            >{{ i.title }}</t-menu-item
          >
        </t-menu>
      </a-layout-sider>
      <a-layout-content>
        <div v-if="questionList.length <= 0">
          <header>
            <h1>欢迎来到{{ siteName }}面试题网站</h1>
          </header>
          <main>
            <t-list stripe size="large">
              <t-list-item>
                <t-list-item-meta
                  title="准备好迎接新的职业挑战了吗？按照这个简单的指南，充分利用Jin-Job面试题网站："
                />
              </t-list-item>
              <t-list-item>
                <t-list-item-meta
                  title="浏览我们的分类："
                  description="浏览涵盖互联网行业各个方面的多样化分类。从编程语言到系统设计，我们应有尽有。"
                />
              </t-list-item>
              <t-list-item>
                <t-list-item-meta
                  title="选择您的技能水平："
                  description="无论您是初学者还是经验丰富的专业人士，选择适当的技能水平以获取与您专业知识相关的问题。"
                />
              </t-list-item>
              <t-list-item>
                <t-list-item-meta
                  title="多维度练习："
                  description="单击任何问题以查看详细信息。使用我们内置的功能进行练习回答，了解解决方案，并跟踪您的进度。"
                />
              </t-list-item>
              <t-list-item>
                <t-list-item-meta
                  title="收藏您喜欢的问题："
                  description="找到一道特别具有挑战性或您想以后复习的问题？将其添加到个人收藏夹以便快速访问。"
                />
              </t-list-item>
              <t-list-item>
                <t-list-item-meta
                  title="保持更新："
                  description="我们定期更新问题库以跟上行业趋势。经常回来，了解最新的面试话题。"
                />
              </t-list-item>
            </t-list>
          </main>
        </div>
        <t-list
          v-if="questionList.length > 0"
          :async-loading="asyncLoading"
          split
          @load-more="fetchData"
        >
          <t-list-item
            v-for="i in questionList"
            :key="i"
            @click="questionShowPage(i.questionId)"
          >
            <t-list-item-meta
              :title="i.title"
              :description="'提问面试官:' + i.createUserName"
            />
            <template #action>
              难度
              <t-rate
                :default-value="i.difficultyLevel"
                size="16"
                disabled
              ></t-rate>
            </template>
          </t-list-item>
        </t-list>
      </a-layout-content>
      <a-layout-sider>
        <t-space style="padding: 1rem">
          <t-statistic
            v-if="currentCategoryName"
            title="你现在正在学习"
            :value="currentCategoryName"
            color="blue"
          >
            <template #extra>
              <t-space direction="vertical">
                <t-space align="center">
                  <t-button
                    variant="outline"
                    theme="primary"
                    @click="questionSubmitPage()"
                    >可进行模拟面试</t-button
                  >
                </t-space>
              </t-space>
              <ul>
                <li>
                  针对
                  <t-space color="blue">
                    <strong style="color: #0052d9">{{
                      currentCategoryName
                    }}</strong></t-space
                  >进行模拟面试
                </li>
                <li>全力命中面试官的关键词</li>
                <li>提高面试过程中细节的记忆</li>
              </ul>
            </template>
          </t-statistic>
        </t-space>
        <t-swiper
          style="text-align: center"
          class="tdesign-demo-block--swiper"
          :current="currentImage"
          autoplay
          loop
        >
          <t-swiper-item v-for="item in carouselList" :key="item">
            <a :href="item.outerLink">
              <a-image
                :preview="1 == 0"
                alt="some-error.png"
                :src="`/api/admin/file/getImage/${item.imgPath}`"
              />
            </a>
          </t-swiper-item>
        </t-swiper>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watchEffect } from "vue";

import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import {
  AppCarousel,
  IndexControllerService,
  OjQuestion,
  OjQuestionQueryRequest,
  QuestionControllerService,
  QuestionInfo,
} from "../../../generatedCode/questionService";

class category {
  "categoryId": number | undefined;
  "categoryName": string | undefined;
  "sort": number | undefined;
  "iconPath": string | undefined;
  "bgColor": string | undefined;
  "type": number | undefined;
  "title": string | undefined;
  "key": number | undefined;
}
const carouselList = ref<Array<AppCarousel> | undefined>([]);
const treeData = ref<Array<category | undefined>>([]);
const currentCategoryName = ref("");
const currentCategoryId = ref(-1);
const current = ref(1);
const pageSize = ref(10);
const bottom = ref(false);
const data = reactive([]);
let questionList = ref<Array<QuestionInfo | undefined>>([]);
const searchParams = ref<OjQuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 8,
  current: 1,
});
const currentImage = ref(0);
const loadData = async () => {
  await loadCarouselData();
  const res = await IndexControllerService.loadAllCategoryUsingGet(0);
  if (res.code === 0) {
    res.data?.forEach((item) => {
      const categoryItem = new category();
      categoryItem.type = item.type;
      categoryItem.categoryName = item.categoryName;
      categoryItem.categoryId = item.categoryId;
      categoryItem.iconPath = item.iconPath;
      categoryItem.sort = item.sort;
      categoryItem.title = item.categoryName;
      categoryItem.key = item.categoryId;
      categoryItem.bgColor = item.bgColor;
      treeData.value.push(categoryItem);
    });
  } else {
    message.error("加载失败，" + res.message);
  }
};
const loadCarouselData = async () => {
  let carouselListResult = await IndexControllerService.loadCarouselUsingGet();
  if (carouselListResult.code === 0) {
    carouselList.value = carouselListResult?.data;
  }
};
const fetchData = () => {
  if (current.value <= 10) {
    window.setTimeout(async () => {
      const index = questionList.value.length;
      current.value += 1;
      const res = await QuestionControllerService.loadQuestionUsingPost(
        currentCategoryId.value,
        current.value,
        pageSize.value
      );
      res.data.list.forEach((item: QuestionInfo) => {
        questionList.value.push(item);
      });
    }, 2000);
  } else {
    bottom.value = true;
  }
};

const onClick = async (e: any) => {
  questionList.value = [];
  currentCategoryName.value = e.value.categoryName;
  currentCategoryId.value = e.value.categoryId;
  const res = await QuestionControllerService.loadQuestionUsingPost(
    currentCategoryId.value,
    current.value,
    pageSize.value
  );
  if (res.code == 0) {
    res.data.list.forEach((item: QuestionInfo) => {
      questionList.value.push(item);
    });
  }
};
/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
// watchEffect(() => {
//   loadData();
// });
const questionShowPage = async (questionId: number) => {
  router.push({
    path: `/questionShow/${questionId}`,
  });
};
const questionSubmitPage = async () => {
  router.push({
    path: `/examQuestionSubmit/${currentCategoryId.value}`,
  });
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();
const toQuestionPage = (question: OjQuestion) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
