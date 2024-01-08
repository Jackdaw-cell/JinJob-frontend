<template>
  <div id="View">
    <t-row>
      <t-col :span="9">
        <div class="custom-heading">{{ shareInfo.title }}</div>
        <t-comment
          avatar="https://tdesign.gtimg.com/site/avatar.jpg"
          :author="shareInfo.createUserName"
          :datetime="shareInfo.createTime"
          content="阿里面试官"
        />
        <div style="min-height: 400px">
          <t-row justify="space-around">
            <t-col>
              <t-watermark
                :watermark-content="{ text: 'JinJob面试通出品' }"
                :y="400"
                :x="400"
                :width="400"
                :height="400"
              >
                <!--                <p class="m-0" v-html="shareInfo.content"></p>-->
                <v-md-preview :text="shareInfo.content" ref="preview" />
              </t-watermark>
            </t-col>
          </t-row>
        </div>
        <t-row justify="space-around">
          <t-col :span="1">
            <UserVisibleIcon size="2em" />{{ shareInfo.readCount }}
          </t-col>
          <t-col>
            <t-button
              type="submit"
              shape="round"
              variant="dashed"
              @click="addCollect(shareInfo.shareId)"
            >
              <HeartIcon size="1.4em" />
              <t-space>{{ shareInfo.collectCount }}</t-space>
            </t-button>
          </t-col>
        </t-row>
      </t-col>
      <t-col :span="3">
        <a-scrollbar
          style="
            max-height: 40rem;
            overflow: auto;
            position: fixed;
            width: 100%;
          "
        >
          <t-list size="small">
            <t-list-item
              v-for="anchor in titles"
              :key="anchor"
              :style="{
                padding: `0px 0 0px ${anchor.indent * 11}px`,
                color: '#3491fa',
              }"
              @click="handleAnchorClick(anchor)"
            >
              {{ anchor.title }}
            </t-list-item>
          </t-list>
        </a-scrollbar>
      </t-col>
    </t-row>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Inplace from "primevue/inplace";
import {
  AppExamControllerService,
  AppUserCollectControllerService,
  QuestionControllerService,
  QuestionInfo,
  ShareControllerService,
  ShareInfo,
} from "../../../generatedCode/questionService";
import { onMounted, ref } from "vue";
import { HeartIcon, UserVisibleIcon } from "tdesign-icons-vue-next";
import { MessagePlugin } from "tdesign-vue-next";
const { params } = useRoute();
let titles = ref<
  Array<{ title: any; lineIndex: any; indent: number } | Element>
>([]);
const preview = ref(null);
const shareId = ref(0);
const shareInfo = ref<ShareInfo | undefined>({
  shareId: 0,
  title: "",
  coverType: 1,
  coverPath: "",
  content: "",
  createTime: "",
  status: 1,
  createUserId: "",
  createUserName: "",
  readCount: 0,
  collectCount: 0,
  postUserType: 0,
  haveCollect: false,
  collectId: 0,
});
shareId.value = parseInt(params.shareId as string);
const loadData = async () => {
  const res = await ShareControllerService.getShareDetailNextUsingGet(
    shareId.value
  );
  if (res.code == 0 && res.data && res.data.content) {
    shareInfo.value = res.data;
    shareInfo.value.content = res.data.content.replace(
      /(^|[^#])#(?!#)/g,
      "$1\n#"
    );
  }
};
//添加收藏
const addCollect = async (objectId: string) => {
  var res = await AppUserCollectControllerService.addCollectUsingPost({
    collectType: 0,
    objectId,
  });
  if (res.code == 0) {
    await MessagePlugin.success("收藏成功");
  }
};
//锚点加载
const anchorsLoad = () => {
  const anchors = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
  titles.value = Array.from(anchors).filter(
    (title: any) => !!title.innerText.trim()
  );
  if (!titles.value.length) {
    titles.value = [];
    return;
  }
  const hTags = Array.from(
    new Set(titles.value.map((title: any) => title.tagName))
  ).sort();

  titles.value = titles.value.map((el: any) => ({
    title: el.innerText,
    lineIndex: el.getAttribute("data-v-md-line"),
    indent: hTags.indexOf(el.tagName),
  }));
  console.log(titles);
};
//触发锚点跳转
const handleAnchorClick = (anchor: { lineIndex: any }) => {
  const { lineIndex } = anchor;

  const heading = document.querySelector(`[data-v-md-line="${lineIndex}"]`);

  console.log(preview.value);
  if (heading && preview.value) {
    // 注意：如果你使用的是编辑组件的预览模式,则这里的方法名改为 previewScrollToTarget
    preview.value.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 60,
    });
  }
};
/**
 * 页面加载时，请求数据
 */
onMounted(async () => {
  await loadData();
  await anchorsLoad();
});
</script>

<style scoped>
#View {
  max-width: 80rem;
  margin: 0 auto;
}
.custom-heading {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
.anchor-container {
  position: fixed;
  display: grid;
  grid-template-columns: 1fr; /* 1 column */
}

.anchor-item {
  padding: 10px 10px;
  border-left: 4px solid #007bff;
}

.anchor-item a {
  color: #007bff;
  margin: 1rem;
  text-decoration: none;
}
.wrapper {
  position: relative;

  ul {
    height: 200px;
    overflow-y: auto;

    li {
      line-height: 30px;
    }
  }
}
</style>
