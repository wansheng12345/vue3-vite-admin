import {
	createApp
} from 'vue'
import Cookies from 'js-cookie'
import ElementPlus from 'element-plus'
import locale from "element-plus/es/locale/lang/zh-cn"; // 中文语言
import '@/assets/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import echarts from "@/components/echarts"
// 注册指令
import plugins from './plugins'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import elementIcons from '@/components/SvgIcon/svgicon'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import './permission'

// 分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'

// 文件上传组件
import FileUpload from "@/components/FileUpload"

const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.$echarts = echarts
app.component('Pagination', Pagination)
app.component('FileUpload', FileUpload)
app.component('RightToolbar', RightToolbar)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.use(ContextMenu)
app.component('svg-icon', SvgIcon)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
	locale: locale,
	// 支持 large、default、small
	size: Cookies.get('size') || 'default'
})

app.mount('#app')