import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import store from "./store";
import "@/plugins/axios";
import "@/access";
import "bytemd/dist/index.css";
// 引入组件库的少量全局样式变量
import "tdesign-vue-next/es/style/index.css";
// import { Calendar as TCalender } from "tdesign-vue-next";
import TDesign from "tdesign-vue-next";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-blue/theme.css";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";

//md编辑器
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Prism from "prismjs";
//MD预览器
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// highlightjs
import hljs from "highlight.js";

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
createApp(App)
  .use(ArcoVue)
  .use(TDesign)
  .use(VMdPreview)
  .use(VueMarkdownEditor)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService)
  .use(store)
  .use(router)
  .mount("#app");
