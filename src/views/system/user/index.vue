<template>
	<div class="app-container">
		<el-row :gutter="20">
			<!--部门数据-->
			<el-col :span="4" :xs="24">
				<div class="head-container search-dept-input">
					<el-input v-model="deptName" placeholder="请输入部门名称" clearable prefix-icon="Search" />
				</div>
				<div class="head-container">
					<el-tree :data="deptOptions" :props="{ label: 'label', children: 'children' }"
						:expand-on-click-node="false" :filter-node-method="filterNode" ref="deptTreeRef" node-key="id"
						highlight-current default-expand-all @node-click="handleNodeClick" />
				</div>
			</el-col>
			<!--用户数据-->
			<el-col :span="20" :xs="24">
				<el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
					<el-form-item label="用户名称" prop="userName">
						<el-input v-model="queryParams.userName" placeholder="请输入用户名称" clearable style="width: 240px"
							@keyup.enter="handleQuery" />
					</el-form-item>
					<el-form-item label="手机号码" prop="phonenumber">
						<el-input v-model="queryParams.phonenumber" placeholder="请输入手机号码" clearable style="width: 240px"
							@keyup.enter="handleQuery" />
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-select v-model="queryParams.status" placeholder="用户状态" clearable style="width: 240px">
							<el-option v-for="v in dict" :key="v.value" :label="v.label" :value="v.value" />
						</el-select>
					</el-form-item>
					<el-form-item label="创建时间" style="width: 308px">
						<el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange"
							range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
						<el-button icon="Refresh" @click="resetQuery">重置</el-button>
					</el-form-item>
				</el-form>

				<el-row :gutter="10" class="mb8">
					<el-col :span="1.5">
						<el-button type="primary" plain icon="Plus" @click="handleAdd"
							v-hasPermi="['system:user:add']">新增</el-button>
					</el-col>
					<el-col :span="1.5">
						<el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate"
							v-hasPermi="['system:user:edit']">修改</el-button>
					</el-col>
					<el-col :span="1.5">
						<el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete"
							v-hasPermi="['system:user:remove']">删除</el-button>
					</el-col>
					<el-col :span="1.5">
						<el-button type="info" plain icon="Upload" @click="handleImport"
							v-hasPermi="['system:user:import']">导入</el-button>
					</el-col>
					<el-col :span="1.5">
						<el-button type="warning" plain icon="Download" @click="handleExport"
							v-hasPermi="['system:user:export']">导出</el-button>
					</el-col>
				</el-row>
				<el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="50" align="center" />
					<el-table-column label="用户编号" align="center" key="userId" prop="userId" />
					<el-table-column label="用户名称" align="center" key="userName" prop="userName"
						:show-overflow-tooltip="true" />
					<el-table-column label="用户昵称" align="center" key="nickName" prop="nickName"
						:show-overflow-tooltip="true" />
					<el-table-column label="部门" align="center" key="deptName" prop="dept.deptName"
						:show-overflow-tooltip="true" />
					<el-table-column label="手机号码" align="center" key="phonenumber" prop="phonenumber" width="120" />
					<el-table-column label="状态" align="center" key="status">
						<template #default="scope">
							<el-switch v-model="scope.row.status" active-value="0" inactive-value="1"
								@change="handleStatusChange(scope.row)"></el-switch>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" align="center" prop="createTime" width="160">
						<template #default="scope">
							<span>{{ scope.row.createTime}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
						<template #default="scope">
							<el-tooltip content="修改" placement="top" v-if="scope.row.userId !== 1">
								<el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
									v-hasPermi="['system:user:edit']"></el-button>
							</el-tooltip>
							<el-tooltip content="删除" placement="top" v-if="scope.row.userId !== 1">
								<el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
									v-hasPermi="['system:user:remove']"></el-button>
							</el-tooltip>
							<el-tooltip content="重置密码" placement="top" v-if="scope.row.userId !== 1">
								<el-button link type="primary" icon="Key" @click="handleResetPwd(scope.row)"
									v-hasPermi="['system:user:resetPwd']"></el-button>
							</el-tooltip>
							<el-tooltip content="分配角色" placement="top" v-if="scope.row.userId !== 1">
								<el-button link type="primary" icon="CircleCheck" @click="handleAuthRole(scope.row)"
									v-hasPermi="['system:user:edit']"></el-button>
							</el-tooltip>
						</template>
					</el-table-column>
				</el-table>
				<pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
					v-model:limit="queryParams.pageSize" @pagination="getList" />
			</el-col>
		</el-row>
	</div>
</template>

<script setup name="User">
	import {
		getToken
	} from "@/utils/auth";
	import {
		deptTreeSelect
	} from "@/api/system/user";
	// 引入路由 跳转用
	const router = useRouter();
	// 获取上下文
	const {
		proxy
	} = getCurrentInstance();
	const dict = reactive([{
			value: 1,
			label: '正常'
		},
		{
			value: 2,
			label: '停用'
		}
	])
	console.log('初始化');
	// 表格的数据 用户列表
	const userList = ref([]);
	const loading = ref(true);
	const ids = ref([]);
	const single = ref(true);
	const multiple = ref(true); //删除按钮禁用
	const total = ref(0);
	const title = ref("");
	const dateRange = ref([]); // 创建时间
	const deptName = ref(""); //搜索的部门的名称
	const deptOptions = ref(undefined); // 部门树形图
	/*** 用户导入参数 */
	const upload = reactive({
		// 是否显示弹出层（用户导入）
		open: false,
		// 弹出层标题（用户导入）
		title: "",
		// 是否禁用上传
		isUploading: false,
		// 是否更新已经存在的用户数据
		updateSupport: 0,
		// 设置上传的请求头部
		headers: {
			Authorization: "Bearer " + getToken()
		},
		// 上传的地址
		url: import.meta.env.VITE_APP_BASE_API + "/system/user/importData",
	});

	const data = reactive({
		form: {},
		queryParams: {
			pageNum: 1,
			pageSize: 10,
			userName: undefined,
			phonenumber: undefined,
			status: undefined,
			deptId: undefined,
		},
	});

	const {
		queryParams,
		form,
	} = toRefs(data);

	/** 通过条件过滤节点  */
	const filterNode = (value, data) => {
		if (!value) return true;
		return data.label.indexOf(value) !== -1;
	};
	/** 根据名称筛选部门树 */
	watch(deptName, (val) => {
		proxy.$refs["deptTreeRef"].filter(val);
	});
	/** 查询部门下拉树结构 */
	function getDeptTree() {
		deptOptions.value = [{
			id: 1,
			label: "远景动力",
			children: [{
					id: 10,
					label: "江阴",
					children: [{
							id: 101,
							label: '部门一'
						},
						{
							id: 102,
							label: '部门二'
						},
						{
							id: 103,
							label: '部门三'
						},
						{
							id: 104,
							label: '部门四'
						},
						{
							id: 105,
							label: '部门五'
						},
					]
				},
				{
					id: 11,
					label: "十堰",
					children: [{
							id: 111,
							label: '部门一'
						},
						{
							id: 112,
							label: '部门二'
						},
						{
							id: 113,
							label: '部门三'
						},
						{
							id: 114,
							label: '部门四'
						},
					]
				},
				{
					id: 12,
					label: "鄂尔多斯",
					children: [{
							id: 121,
							label: '部门一'
						},
						{
							id: 122,
							label: '部门二'
						},
						{
							id: 123,
							label: '部门三'
						},
					]
				},
				{
					id: 13,
					label: "上海",
					children: [{
							id: 131,
							label: '部门一'
						},
						{
							id: 132,
							label: '部门二'
						},
					]
				},
			],
		}, ];
	}
	/** 查询用户列表 */
	function getList() {
		//   loading.value = true;
		userList.value = [{
				userId: 1,
				userName: '张三',
				nickName: 'zs',
				deptName: '研发部',
				phonenumber: '18912345678',
				status: '1',
				createTime: '2023-02-03 11:11:26',
			},
			{
				userId: 2,
				userName: '王五',
				nickName: 'ww',
				deptName: '人事部',
				phonenumber: '13587654321',
				status: '0',
				createTime: '2023-04-10 18:41:56',
			}
		]
		loading.value = false;
	}
	/** 节点单击事件 */
	function handleNodeClick(data) {
		queryParams.value.deptId = data.id;
		handleQuery();
	}
	/** 搜索按钮操作 */
	function handleQuery() {
		queryParams.value.pageNum = 1;
		getList();
	}
	/** 重置按钮操作 */
	function resetQuery() {
		dateRange.value = [];
		proxy.resetForm("queryRef");
		queryParams.value.deptId = undefined;
		proxy.$refs.deptTreeRef.setCurrentKey(null);
		handleQuery();
	}
	/** 删除按钮操作 */
	function handleDelete(row) {
		proxy.$modal
			.confirm('是否确认删除用户为"' + row.userName + '"的数据项？')
			.then(function() {
				console.log("删除成功");
				//  getList();
			});
	}
	/** 导出按钮操作 */
	function handleExport() {
		//文件导出
		//   proxy.download("system/user/export", {
		//     ...queryParams.value,
		//   },`user_${new Date().getTime()}.xlsx`);
	}
	/** 用户状态修改  */
	function handleStatusChange(row) {
		let text = row.status === "0" ? "启用" : "停用";
		proxy.$modal
			.confirm('确认要"' + text + '""' + row.userName + '"用户吗?')
			.then(function() {
				row.status = row.status === "0" ? "0" : "1";
				proxy.$modal.msgSuccess(text + "成功");
			}).catch(() => {
				row.status = row.status === "0" ? "1" : "0";
			});
	}
	/** 更多操作 */
	function handleCommand(command, row) {
		switch (command) {
			case "handleResetPwd":
				handleResetPwd(row);
				break;
			case "handleAuthRole":
				handleAuthRole(row);
				break;
			default:
				break;
		}
	}
	/** 跳转角色分配 */
	function handleAuthRole(row) {
		const userId = row.userId;
		//   router.push("/system/user-auth/role/" + userId);
	}
	/** 重置密码按钮操作 */
	function handleResetPwd(row) {
		proxy
			.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				closeOnClickModal: false,
				inputPattern: /^.{5,20}$/,
				inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
			})
			.then(({
				value
			}) => {
				proxy.$modal.msgSuccess("修改成功，新密码是：" + value);
			})
			.catch(() => {});
	}
	/** 选择表格的条数  */
	function handleSelectionChange(selection) {
		console.log(selection);
		ids.value = selection.map((item) => item.roleId);
		single.value = selection.length != 1;
		multiple.value = !selection.length;
	}
	/** 导入按钮操作 */
	function handleImport() {
		upload.title = "用户导入";
		upload.open = true;
	}
	/** 下载模板操作 */
	function importTemplate() {}
	/**文件上传中处理 */
	const handleFileUploadProgress = (event, file, fileList) => {

	};
	/** 文件上传成功处理 */
	const handleFileSuccess = (response, file, fileList) => {
		upload.open = false;
		upload.isUploading = false;
		proxy.$refs["uploadRef"].handleRemove(file);
		proxy.$alert(
			"<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
			response.msg +
			"</div>",
			"导入结果", {
				dangerouslyUseHTMLString: true
			}
		);
		getList();
	};
	/** 提交上传文件 */
	function submitFileForm() {
		proxy.$refs["uploadRef"].submit();
	}
	/** 重置操作表单 */
	function reset() {
		form.value = {
			userId: undefined,
			deptId: undefined,
			userName: undefined,
			nickName: undefined,
			password: undefined,
			phonenumber: undefined,
			email: undefined,
			sex: undefined,
			status: "0",
			remark: undefined,
			postIds: [],
			roleIds: [],
		};
		proxy.resetForm("userRef");
	}
	/** 取消按钮 */
	function cancel() {
		open.value = false;
		reset();
	}
	/** 新增按钮操作 */
	function handleAdd() {
		reset();
		console.log("新增提交按钮");
	}
	/** 修改按钮操作 */
	function handleUpdate(row) {
		reset();
		console.log("打开修改弹框");
	}

	getDeptTree();
	getList();
</script>
<style lang="scss">
	.app-container {
		.search-dept-input {
			margin-bottom: 10px;
		}
	}
</style>