import axios from 'axios'
import {
	ElNotification,
	ElMessage,
	ElLoading
} from 'element-plus'
import {
	getToken,
	getRefreshToken,
} from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import {
	tansParams,
	blobValidate
} from '@/utils/ruoyi'
import cache from '@/plugins/cache'
import {
	saveAs
} from 'file-saver'
import useUserStore from '@/store/modules/user'
// import i18n from '@/i18n/index';
let downloadLoadingInstance;
// 是否显示重新登录
// 创建axios实例
const service = axios.create({
	// axios中请求配置有baseURL选项，表示请求URL公共部分
	baseURL: import.meta.env.VITE_APP_BASE_API,
	// 超时
	timeout: 6 * 60 * 1000,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
})


// request拦截器
service.interceptors.request.use(config => {
	// 是否需要设置 token
	const isToken = (config.headers || {}).isToken === false
	// 是否需要防止数据重复提交
	const isRepeatSubmit = (config.headers || {}).repeatSubmit === undefined;
	if (getToken() && !isToken) {
		config.headers['Accept-Language'] = 'zh-CN'; // 读取仓库语言，传给后端
		config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
		config.headers['X-Authorization'] = 'Bearer ' + getRefreshToken()
	}
	// get请求映射params参数
	if (config.method === 'get' && config.params) {
		let url = config.url + '?' + tansParams(config.params);
		url = url.slice(0, -1);
		config.params = {};
		config.url = url;
	}
	if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
		const requestObj = {
			url: config.url,
			data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
			time: new Date().getTime()
		}
		const sessionObj = cache.session.getJSON('sessionObj')
		if (!sessionObj) {
			cache.session.setJSON('sessionObj', requestObj)
		} else {
			const {
				url: s_url,
				data: s_data,
				time: s_time
			} = sessionObj;
			const interval = 300; // 间隔时间(ms)，小于此时间视为重复提交
			if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
				const msg = '数据正在处理，请勿频繁操作';
				return Promise.reject(new Error(msg))
			} else {
				cache.session.setJSON('sessionObj', requestObj)
			}
		}
	}
	return config
}, error => {
	Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
		res.data.headers = res.headers;
		// 未设置状态码则默认成功状态
		const code = res.data.code || 200;
		// 获取错误信息
		const msg = errorCode[code] || res.data.message || errorCode['default']
		// 二进制数据则直接返回
		if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
			return res.data
		}
		if (code === 401) {
			// 调用退出登录接口 清空token 
			useUserStore().logOut().then(() => {
				window.location.href = '/';
			})
			return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
		} else if (code === 500) {
			ElMessage({
				message: msg,
				type: 'error'
			})
			return Promise.reject(new Error(msg))
		} else if (code === 601) {
			ElMessage({
				message: msg,
				type: 'warning'
			})
			return Promise.reject(new Error(msg))
		} else if (code === 400) {
			ElNotification({
				title: msg,
				type: 'info',
			})
			return Promise.reject(new Error(msg))
		} else if (code !== 200) {
			ElNotification({
				title: msg,
				type: 'error',
			})
			return Promise.reject('error')
		} else {
			return Promise.resolve(res.data)
		}
	},
	error => {
		if (!error) return
		let {
			message
		} = error;
		if (message == "Network Error") {
			message = "后端接口连接异常";
		} else if (message.includes("timeout")) {
			message = "系统接口请求超时";
		}
		ElMessage({
			message: message,
			duration: 5 * 1000
		})
		return Promise.reject(error)
	}
)

// 通用下载方法
export function download(url, params, filename, method = 'post', header, ) {
	downloadLoadingInstance = ElLoading.service({
		text: "111",
		background: "rgba(0, 0, 0, 0.7)",
	})
	return service[method](url, params, {
		responseType: 'blob',
	}).then(async (data) => {
		const isBlob = blobValidate(data);
		if (isBlob) {
			const blob = new Blob([data], {
				type: 'application/json;charset=utf-8'
			})
			saveAs(blob, filename)
		} else {
			const resText = await data.text();
			const rspObj = JSON.parse(resText);
			const errMsg = rspObj.msg || rspObj.message || errorCode['default']
			ElMessage.error(errMsg);
		}
		downloadLoadingInstance.close();
	}).catch((r) => {
		console.error(r)
		ElMessage.error(r)
		downloadLoadingInstance.close();
	})
}

export default service