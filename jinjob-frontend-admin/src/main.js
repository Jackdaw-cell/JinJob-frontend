import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import '@/assets/base.scss'
import 'element-plus/dist/index.css'
import '@/assets/icon/iconfont.css'
import VueCookies from 'vue-cookies'
//导入工具类
import Request from '@/utils/Request';
import Utils from './utils/Utils'
//校验
import Verify from './utils/Verify'
import Message from './utils/Message'
import Confirm from './utils/Confirm'

import Window from '@/components/Window.vue'
import Table from '@/components/Table.vue'
import Dialog from '@/components/Dialog.vue'
import NoData from '@/components/NoData.vue'
import CoverUpload from '@/components/CoverUpload.vue'
import Cover from '@/components/Cover.vue'
import Suneditor from '@/components/Suneditor.vue'
import Badge from '@/components/Badge.vue'
import CategorySelect from '@/components/content/CategorySelect.vue'
import PermissionCode from './utils/PermissionCode'
import md5 from "js-md5";
//MD编辑器
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
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

const app = createApp(App)

app.use(router);
app.use(VueMarkdownEditor);
app.use(VMdPreview)
app.use(ElementPlus);

app.component("Window", Window);
app.component("Table", Table);
app.component("Dialog", Dialog);
app.component("NoData", NoData);
app.component("CoverUpload", CoverUpload);
app.component("Cover", Cover);
app.component("Suneditor", Suneditor);
app.component("Badge", Badge);
app.component("CategorySelect", CategorySelect);

app.config.globalProperties.Request = Request;
app.config.globalProperties.Verify = Verify;
app.config.globalProperties.Utils = Utils;
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Confirm = Confirm;
app.config.globalProperties.PermissionCode = PermissionCode;
app.config.globalProperties.globalInfo = {
    avatarUrl: "/api/file/getAvatar/",
    adminImageUrl: "/api/admin/file/getImage/",
    imageUrl: "/api/file/getImage/"
}

//自定义指令
app.directive('has', {
    mounted: (el, binding, vnode) => {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
        let permissionCodeList = userInfo.permissionCodeList
        permissionCodeList = permissionCodeList == undefined ? [] : permissionCodeList
        if (!permissionCodeList.includes(binding.value)) {
            el.parentNode.removeChild(el)
        }
    },
})
app.mount('#app')
