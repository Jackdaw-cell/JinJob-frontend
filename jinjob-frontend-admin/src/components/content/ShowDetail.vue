<template>
  <Window :show="windowShow" @close="closeWindow">
    <div class="show-detail">
      <div class="iconfont icon-pre" @click="nextAndPre(-1)"></div>
      <div class="content-info">
        <div class="header" >{{ articleTitle[props.showType] }}</div>
        <div class="content">
          <div class="title" v-if="props.showType != 3">{{ detailInfo.title }}</div>
          <template v-if="props.showType == 3">
<!--            <div class="html-content" v-html="detailInfo.content"></div>-->
            <v-md-preview :text="detailInfo.content"/>
          </template>
          <!--问答题 考题-->
          <template v-else>
            <div class="detail-info">
              <div class="dif">
                难度:<el-rate
                  v-model="detailInfo.difficultyLevel"
                  :disabled="true"
                />
              </div>
              <div>更新：{{ detailInfo.createTime }}</div>
            </div>
            <div class="part-title">问题描述:</div>
            <div
              class="html-content"
              v-html="detailInfo.question || '暂无问题描述'"
            ></div>
            <!--考题，题目选项-->
            <template v-if="props.showType == 2">
              <div class="part-title">
                题目类型：{{ QUESTION_TYPE[detailInfo.questionType] }}
              </div>
              <template v-if="detailInfo.questionType != 0">
                <div class="part-title">题目选项：</div>
                <div class="question-item-list">
                  <div
                    class="quesiton-item"
                    v-for="(item, index) in detailInfo.questionItemList"
                  >
                    {{ LETTER[index] }}、{{ item.title }}
                  </div>
                </div>
              </template>

              <div class="part-title">
                答案：
                <template v-if="detailInfo.questionType == 0">{{
                  detailInfo.questionAnswer == "0" ? "错误" : "正确"
                }}</template>
                <template v-else>
                  <span
                    v-for="item in detailInfo.questionAnswer.split(',')"
                    :style="{ 'margin-right': '5px' }"
                    >{{ LETTER[Number.parseInt(item)] }}</span
                  >
                </template>
              </div>
            </template>
            <div class="part-title">答案解析:</div>
            <div class="html-content" v-html="detailInfo.answerAnalysis"></div>
          </template>
        </div>
      </div>
      <div class="iconfont icon-next" @click="nextAndPre(1)"></div>
    </div>
  </Window>
</template>

<script setup>
import { LETTER, QUESTION_TYPE } from "@/utils/Constants.js";
import {
  ref,
  reactive,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
} from "vue";
const { proxy } = getCurrentInstance();
const props = defineProps({
  showType: {
    type: Number, //1:问题  2:考题  3:分享
    default: 1,
  },
});

const articleTitle = ref({
  1: "问题详情",
  2: "考题详情",
  3: "文章详情",
});

const windowShow = ref(false);
const closeWindow = () => {
  windowShow.value = false;
  window.removeEventListener("keyup", keyHandler, false);
};

const currentId = ref();
const nextType = ref(null);
const searchParams = ref();

const show = (id, params) => {
  searchParams.value = params;
  windowShow.value = true;
  nextType.value = null;
  currentId.value = id;
  getDetail();
  window.addEventListener("keyup", keyHandler, false);
};
defineExpose({ show });

const api = {
  showType1: "questionInfo/showQuestionDetailNext",
  showType2: "examQuestion/showExamQuestionDetailNext",
  showType3: "shareInfo/showShareDetailNext",
};

const detailInfo = ref({});
const getDetail = async () => {
  const params = Object.assign({}, searchParams.value);
  params.nextType = nextType.value;
  params.currentId = currentId.value;

  let result = await proxy.Request({
    url: api["showType" + props.showType],
    params: params,
  });
  if (!result) {
    return;
  }
  let resultData = result.data;
  detailInfo.value = resultData;
  if (props.showType == 3) {
    currentId.value = resultData.shareId;
  } else {
    currentId.value = resultData.questionId;
  }
};

const nextAndPre = (type) => {
  nextType.value = type;
  getDetail();
};

const keyHandler = (event) => {
  const e = event || window.event || arguments.callee.caller.arguments[0];
  let key = e.keyCode;
  if (key == 39) {
    nextAndPre(1);
  } else if (key == 37) {
    nextAndPre(-1);
  }
};
</script>

<style lang="scss" scoped>
.show-detail {
  height: calc(100vh);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  .content-info {
    background-color: #fff;
    background-position-x: -4px;
    border-radius: 1rem;
    padding: 52px 16px 35px 19px;
    .header {
      background: #dad9d9;
      font-size: 18px;
      line-height: 30px;
      text-align: center;
      border-radius: 5px 5px 0px 0px;
    }
    .content {
      height: 730px;
      overflow: auto;
      padding: 10px;
      .title {
        font-weight: bold;
        font-size: 15px;
      }
      .detail-info {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #878787;
        justify-content: space-between;
        .dif {
          display: flex;
          align-items: center;
        }
      }
      .part-title {
        margin-top: 10px;
        font-weight: bold;
        border-left: 3px solid #02baf8;
        padding-left: 5px;
      }
      .html-content {
        margin-top: 10px;

        :deep code {
          word-break: break-all;
          word-wrap: break-word;
          white-space: pre-wrap;
        }

        :deep img {
          max-width: 100%;
        }
      }
      .question-item-list {
        margin-top: 10px;
        padding-left: 10px;
        .quesiton-item {
          margin-top: 5px;
        }
      }
    }
  }

  .iconfont {
    font-size: 50px;
    color: #97def6;
    cursor: pointer;
  }
  .icon-pre {
    margin-right: 20px;
  }
  .icon-next {
    margin-left: 20px;
  }
}
</style>
