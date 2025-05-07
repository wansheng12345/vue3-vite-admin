import auth from '@/plugins/auth'
import router, {
	constantRoutes,
	dynamicRoutes
} from '@/router'
// import { getRouters } from '@/api/login'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore(
	'permission', {
		state: () => ({
			routes: [],
			addRoutes: [],
			defaultRoutes: [],
			topbarRouters: [],
			sidebarRouters: []
		}),
		actions: {
			setRoutes(routes) {
				this.addRoutes = routes
				this.routes = constantRoutes.concat(routes)
			},
			setDefaultRoutes(routes) {
				this.defaultRoutes = constantRoutes.concat(routes)
			},
			setTopbarRoutes(routes) {
				this.topbarRouters = routes
			},
			setSidebarRouters(routes) {
				console.log(routes);
				this.sidebarRouters = routes
			},
			changeRoutes(routes) {
				console.log(111, routes);
				// let sidebarRoutes = filterAsyncRouter(routes)
				this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
			},
			generateRoutes(roles) {
				return new Promise(resolve => {
					// 向后端请求路由数据
					let res = {
						code: 200,
						data: [{
								alwaysShow: true,
								children: [{
										component: "system/user/index",
										hidden: false,
										meta: {
											title: "用户管理",
											enTitle: 'User',
											icon: "user",
											noCache: false,
											link: null
										},
										name: "User",
										path: "user"
									},
									{
										component: "system/role/index",
										hidden: false,
										meta: {
											title: "角色管理",
											enTitle: 'Role',
											icon: "peoples",
											noCache: false,
											link: null
										},
										name: "Role",
										path: "role"
									},
									{
										component: "system/menu/index",
										hidden: false,
										meta: {
											title: "菜单管理",
											enTitle: 'Menu',
											icon: "tree-table",
											noCache: false,
											link: null
										},
										name: "Menu",
										path: "menu"
									}, {
										component: "system/dept/index",
										hidden: false,
										meta: {
											title: "部门管理",
											enTitle: 'Dept',
											icon: "tree",
											noCache: false,
											link: null
										},
										name: "Dept",
										path: "dept"
									},
									{
										alwaysShow: true,
										children: [{
												component: 'system/log/operlog',
												hidden: false,
												name: 'Operlog',
												path: 'operlog',
												meta: {
													title: '操作日志',
													enTitle: 'Operlog',
													icon: 'form',
													noCache: false,
													link: null,
												},
											},
											{
												component: 'system/log/logininfor',
												hidden: false,
												name: 'Logininfor',
												path: 'logininfor',
												meta: {
													title: '登录日志',
													enTitle: 'Logininfor',
													icon: 'logininfor',
													noCache: false,
													link: null,
												}
											}
										],
										component: "system/log/index",
										hidden: false,
										meta: {
											icon: 'log',
											link: null,
											noCache: false,
											// breadcrumb: false,
											title: "日志管理",
											enTitle: 'Log',
										},
										name: 'Log',
										path: "log",
										redirect: 'noRedirect'
									}
								],
								component: "Layout",
								hidden: false,
								meta: {
									icon: 'system',
									link: null,
									noCache: false,
									title: "权限管理",
									enTitle: 'System',
								},
								name: 'System',
								path: "/System",
								redirect: 'noRedirect'
							},
							{
								alwaysShow: true,
								component: "Layout",
								hidden: false,
								children: [{
										component: "Element/map/index",
										hidden: false,
										meta: {
											title: "地图",
											enTitle: 'map',
											icon: "job",
											noCache: false,
											link: null
										},
										name: "map",
										path: "map"
									},
									{
										component: "Element/vr/index",
										hidden: false,
										meta: {
											title: "VR",
											enTitle: 'VR',
											icon: "druid",
											noCache: false,
											link: null
										},
										name: "vr",
										path: "vr"
									},
									{
										component: "Element/flow/index",
										hidden: false,
										meta: {
											title: "flow",
											enTitle: 'flow',
											icon: "druid",
											noCache: false,
											link: null
										},
										name: "flow",
										path: "flow"
									},
									{
										component: "Element/Quill/index",
										hidden: false,
										meta: {
											title: "Quill",
											enTitle: 'Quill',
											icon: "druid",
											noCache: false,
											link: null
										},
										name: "Quill",
										path: "Quill"
									},
									{
										component: "Element/drag/index",
										hidden: false,
										meta: {
											title: "拖拽",
											enTitle: 'Drag',
											icon: "druid",
											noCache: false,
											link: null
										},
										name: "Drag",
										path: "Drag"
									},
									{
										component: "Element/Test/index",
										hidden: false,
										meta: {
											title: "测试",
											enTitle: 'Drag',
											icon: "druid",
											noCache: false,
											link: null
										},
										name: "Test",
										path: "Test"
									},
									{
										component: 'Element/IntersectionObserver/index',
										hidden: false,
										meta: {
											title: '图片懒加载',
											enTitle: 'Observer',
											icon: 'druid',
											noCache: false,
											link: null,
										},
										name: '图片懒加载',
										path: 'Observer'
									}
								],
								meta: {
									icon: 'monitor',
									link: null,
									noCache: false,
									title: "组件工具",
									enTitle: 'Element',
								},
								name: 'Element',
								path: "/Element",
								redirect: 'noRedirect'
							}
						],
						msg: '操作成功'
					}
					// getRouters().then(res => {
					const sdata = JSON.parse(JSON.stringify(res.data))
					const rdata = JSON.parse(JSON.stringify(res.data))
					const defaultData = JSON.parse(JSON.stringify(res.data))
					const sidebarRoutes = filterAsyncRouter(sdata)
					const rewriteRoutes = filterAsyncRouter(rdata, false, true)
					const defaultRoutes = filterAsyncRouter(defaultData)
					const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
					asyncRoutes.forEach(route => {
						router.addRoute(route)
					})
					this.setRoutes(rewriteRoutes)
					this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
					this.setDefaultRoutes(sidebarRoutes)
					this.setTopbarRoutes(defaultRoutes)
					resolve(rewriteRoutes)
					// })
				})
			}
		}
	})

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
	return asyncRouterMap.filter(route => {
		if (type && route.children) {
			route.children = filterChildren(route.children)
		}
		if (route.component) {
			// Layout ParentView 组件特殊处理
			if (route.component === 'Layout') {
				route.component = Layout
			} else if (route.component === 'ParentView') {
				route.component = ParentView
			} else if (route.component === 'InnerLink') {
				route.component = InnerLink
			} else {
				route.component = loadView(route.component)
			}
		}
		if (route.children != null && route.children && route.children.length) {
			route.children = filterAsyncRouter(route.children, route, type)
		} else {
			delete route['children']
			delete route['redirect']
		}
		return true
	})
}

function filterChildren(childrenMap, lastRouter = false) {
	var children = []
	childrenMap.forEach((el, index) => {
		if (el.children && el.children.length) {
			if (el.component === 'ParentView' && !lastRouter) {
				el.children.forEach(c => {
					c.path = el.path + '/' + c.path
					if (c.children && c.children.length) {
						children = children.concat(filterChildren(c.children, c))
						return
					}
					children.push(c)
				})
				return
			}
		}
		if (lastRouter) {
			el.path = lastRouter.path + '/' + el.path
		}
		children = children.concat(el)
	})
	return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
	const res = []
	routes.forEach(route => {
		if (route.permissions) {
			if (auth.hasPermiOr(route.permissions)) {
				res.push(route)
			}
		} else if (route.roles) {
			if (auth.hasRoleOr(route.roles)) {
				res.push(route)
			}
		}
	})
	return res
}

export const loadView = (view) => {
	let res;
	for (const path in modules) {
		const dir = path.split('views/')[1].split('.vue')[0];
		if (dir === view) {
			res = () => modules[path]();
		}
	}
	return res;
}

export default usePermissionStore