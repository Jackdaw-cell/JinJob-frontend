<template></template>

<script setup lang="ts">
import { defineProps, ref, withDefaults } from "vue";
import { NotifyPlugin } from "tdesign-vue-next";
import { AppExamAnswer } from "../../generatedCode/questionService/models/AppExamAnswer";
import { QuestionInfo } from "../../generatedCode/questionService";
interface Props {
  value: Array<QuestionInfo>;
}
/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => [],
});
const commentsData = ref([
  {
    id: "A",
    avatar: "https://tdesign.gtimg.com/site/avatar.jpg",
    author: "评论作者名A",
    datetime: "今天16:38",
    content: "评论作者名A写的评论内容。",
  },
  {
    id: "B",
    avatar: "https://tdesign.gtimg.com/site/avatar.jpg",
    author: "评论作者名B",
    datetime: "今天16:38",
    content: "评论作者名B写的评论内容。",
  },
  {
    id: "C",
    avatar: "https://tdesign.gtimg.com/site/avatar.jpg",
    author: "评论作者名C",
    datetime: "今天16:38",
    content: "评论作者名C写的评论内容。",
  },
]);

const replyData = ref("");

const submitReply = () => {
  commentsData.value.push({
    id: "C",
    avatar: "https://tdesign.gtimg.com/site/avatar.jpg",
    author: "评论作者名C",
    datetime: "今天16:38",
    content: "评论作者名C写的评论内容。",
  });
  NotifyPlugin.info({
    title: "回复内容",
    content: replyData.value,
    duration: 3000,
  });
};
</script>
