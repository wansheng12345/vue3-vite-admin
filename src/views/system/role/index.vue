<template>
	<div class="app-container">
		<el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
			<el-form-item label="角色名称" prop="roleName">
				<el-input v-model="queryParams.roleName" placeholder="请输入角色名称" clearable style="width: 240px"
					@keyup.enter="handleQuery" />
			</el-form-item>
			<el-form-item label="权限字符" prop="roleKey">
				<el-input v-model="queryParams.roleKey" placeholder="请输入权限字符" clearable style="width: 240px"
					@keyup.enter="handleQuery" />
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-select v-model="queryParams.status" placeholder="角色状态" clearable style="width: 240px">
					<el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label"
						:value="dict.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="创建时间" style="width: 308px">
				<el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
					start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
				<el-button icon="Refresh" @click="resetQuery">重置</el-button>
			</el-form-item>
		</el-form>
		<el-row :gutter="10" class="mb8">
			<el-col :span="1.5">
				<el-button type="primary" plain icon="Plus" @click="handleAdd"
					v-hasPermi="['system:role:add']">新增</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate"
					v-hasPermi="['system:role:edit']">修改</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete"
					v-hasPermi="['system:role:remove']">删除</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="warning" plain icon="Download" @click="handleExport"
					v-hasPermi="['system:role:export']">导出</el-button>
			</el-col>
		</el-row>
		<!-- 表格数据 -->
		<el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center" />
			<el-table-column label="角色编号" prop="roleId" width="120" />
			<el-table-column label="角色名称" prop="roleName" :show-overflow-tooltip="true" width="150" />
			<el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" />
			<el-table-column label="显示顺序" prop="roleSort" width="100" />
			<el-table-column label="状态" align="center" width="100">
				<template #default="scope">
					<el-switch v-model="scope.row.status" active-value="0" inactive-value="1"
						@change="handleStatusChange(scope.row)"></el-switch>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" align="center" prop="createTime">
				<template #default="scope">
					<span>{{ scope.row.createTime }}</span>
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template #default="scope">
					<el-tooltip content="修改" placement="top">
						<el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
							v-hasPermi="['system:role:edit']"></el-button>
					</el-tooltip>
					<el-tooltip content="删除" placement="top">
						<el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)"
							v-hasPermi="['system:role:remove']"></el-button>
					</el-tooltip>
					<el-tooltip content="数据权限" placement="top">
						<el-button link type="primary" icon="CircleCheck" @click="handleDataScope(scope.row)"
							v-hasPermi="['system:role:edit']"></el-button>
					</el-tooltip>
					<el-tooltip content="分配用户" placement="top">
						<el-button link type="primary" icon="User" @click="handleAuthUser(scope.row)"
							v-hasPermi="['system:role:edit']"></el-button>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>
		<pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
			v-model:limit="queryParams.pageSize" @pagination="getList" />

		<!-- 添加或修改角色配置对话框 -->
		<el-dialog :title="title" v-model="open" width="500px" append-to-body>
			<el-form ref="roleRef" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="form.roleName" placeholder="请输入角色名称" />
				</el-form-item>
				<el-form-item prop="roleKey">
					<template #label>
						<span>
							<el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
								<el-icon><question-filled /></el-icon>
							</el-tooltip>
							权限字符
						</span>
					</template>
					<el-input v-model="form.roleKey" placeholder="请输入权限字符" />
				</el-form-item>
				<el-form-item label="角色顺序" prop="roleSort">
					<el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
				</el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="form.status">
						<el-radio v-for="dict in sys_normal_disable" :key="dict.value"
							:label="dict.value">{{ dict.label }}</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="菜单权限">
					<el-checkbox v-model="menuExpand"
						@change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>
					<el-checkbox v-model="menuNodeAll"
						@change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>
					<el-checkbox v-model="form.menuCheckStrictly"
						@change="handleCheckedTreeConnect($event, 'menu')">父子联动</el-checkbox>
					<el-tree class="tree-border" :data="menuOptions" show-checkbox ref="menuRef" node-key="id"
						:default-expanded-keys="[1, 2]" :default-checked-keys="[100, 201, 202]"
						:check-strictly="!form.menuCheckStrictly" empty-text="加载中，请稍候"
						:props="{ label: 'label', children: 'children' }"></el-tree>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button type="primary" @click="submitForm">确 定</el-button>
					<el-button @click="cancel">取 消</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script setup name="Role">
	import {
		addRole,
		changeRoleStatus,
		delRole,
		getRole,
		listRole,
		updateRole,
		deptTreeSelect,
	} from "@/api/system/role";
	import {
		roleMenuTreeselect,
		treeselect as menuTreeselect
	} from "@/api/system/menu";

	const router = useRouter();
	const {
		proxy
	} = getCurrentInstance();
	// const { sys_normal_disable } = proxy.useDict("sys_normal_disable");
	const sys_normal_disable = [{
			value: 1,
			label: "正常",
		},
		{
			value: 2,
			label: "停用",
		},
	];

	const roleList = ref([]);
	const open = ref(false);
	const loading = ref(true);
	const ids = ref([]);
	const single = ref(true);
	const multiple = ref(true); //删除按钮禁用
	const total = ref(0); //总数
	const title = ref("");
	const dateRange = ref([]);
	const menuOptions = ref([]); //菜单的树形下拉
	const menuExpand = ref(false); //展开 or 折叠
	const menuNodeAll = ref(false); // 全选 or 全部选
	const deptOptions = ref([]);
	const openDataScope = ref(false);
	const menuRef = ref(null);
	const deptRef = ref(null);
	const MenuList = ref([{
			id: 1,
			label: "权限管理",
			children: [{
					id: 100,
					label: "用户管理",
					children: [{
							id: 1001,
							label: "用户查询",
						},
						{
							id: 1002,
							label: "用户新增",
						},
						{
							id: 1003,
							label: "用户修改",
						},
						{
							id: 1004,
							label: "用户导出",
						},
						{
							id: 1005,
							label: "用户导入",
						},
						{
							id: 1006,
							label: "重置密码",
						},
					],
				},
				{
					id: 101,
					label: "角色管理",
					children: [{
							id: 1007,
							label: "角色查询",
						},
						{
							id: 1008,
							label: "角色新增",
						},
						{
							id: 1009,
							label: "角色修改",
						},
						{
							id: 1010,
							label: "角色删除",
						},
						{
							id: 1011,
							label: "角色导出",
						},
					],
				},
				{
					id: 102,
					label: "菜单管理",
					children: [{
							id: 1012,
							label: "菜单查询",
						},
						{
							id: 1013,
							label: "菜单新增",
						},
						{
							id: 1014,
							label: "菜单修改",
						},
						{
							id: 1015,
							label: "菜单删除",
						},
					],
				},
				{
					id: 103,
					label: "部门管理",
					children: [{
							id: 1012,
							label: "部门查询",
						},
						{
							id: 1013,
							label: "部门新增",
						},
						{
							id: 1014,
							label: "部门修改",
						},
						{
							id: 1015,
							label: "部门删除",
						},
					],
				},
			],
		},
		{
			id: 2,
			label: "设备健康度管理",
			children: [{
					id: 201,
					label: "高频故障闭环",
					children: [{
							id: 2001,
							label: "高频故障闭环查询",
						},
						{
							id: 2002,
							label: "高频故障闭环新增",
						},
						{
							id: 2003,
							label: "高频故障闭环修改",
						},
						{
							id: 2004,
							label: "高频故障闭环删除",
						},
					],
				},
				{
					id: 202,
					label: "故障工单",
					children: [{
							id: 2005,
							label: "故障工单查询",
						},
						{
							id: 2006,
							label: "故障工单新增",
						},
						{
							id: 2007,
							label: "故障工单修改",
						},
						{
							id: 2008,
							label: "故障工单删除",
						},
					],
				},
			],
		},
	]);
	const data = reactive({
		form: {},
		queryParams: {
			pageNum: 1,
			pageSize: 10,
			roleName: undefined,
			roleKey: undefined,
			status: undefined,
		},
		rules: {
			roleName: [{
				required: true,
				message: "角色名称不能为空",
				trigger: "blur"
			}],
			roleKey: [{
				required: true,
				message: "权限字符不能为空",
				trigger: "blur"
			}],
			roleSort: [{
				required: true,
				message: "角色顺序不能为空",
				trigger: "blur"
			}],
		},
	});

	const {
		queryParams,
		form,
		rules
	} = toRefs(data);

	/** 查询角色列表 */
	function getList() {
		loading.value = true;
		roleList.value = [{
			roleId: 1,
			roleName: "超级管理员",
			roleKey: "admin",
			roleSort: 1,
			status: "0",
			createTime: "2023-02-03 11:11:33",
		}, ];
		total.value = roleList.value.length;
		loading.value = false;
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
		handleQuery();
	}
	/** 删除按钮操作 */
	function handleDelete(row) {
		const roleIds = row.roleId || ids.value;
		proxy.$modal
			.confirm('是否确认删除角色编号为"' + roleIds + '"的数据项?')
			.then(function() {
				getList();
				proxy.$modal.msgSuccess("删除成功");
			});
	}
	/** 导出按钮操作 */
	function handleExport() {}
	/** 多选框选中数据 */
	function handleSelectionChange(selection) {
		ids.value = selection.map((item) => item.roleId);
		single.value = selection.length != 1;
		multiple.value = !selection.length;
	}
	/** 角色状态修改 */
	function handleStatusChange(row) {
		let text = row.status === "0" ? "启用" : "停用";
		proxy.$modal
			.confirm('确认要"' + text + '""' + row.roleName + '"角色吗?')
			.then(function() {
				proxy.$modal.msgSuccess(text + "成功");
			})
			.catch(function() {
				row.status = row.status === "0" ? "1" : "0";
			});
	}
	/** 分配用户 */
	function handleAuthUser(row) {
		router.push("/system/role-auth/user/" + row.roleId);
	}
	/** 查询菜单树结构 */
	function getMenuTreeselect() {
		menuOptions.value = MenuList.value;
	}
	/** 所有部门节点数据 */
	function getDeptAllCheckedKeys() {
		// 目前被选中的部门节点
		let checkedKeys = deptRef.value.getCheckedKeys();
		// 半选中的部门节点
		let halfCheckedKeys = deptRef.value.getHalfCheckedKeys();
		checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
		return checkedKeys;
	}
	/** 重置新增的表单以及其他数据  */
	function reset() {
		if (menuRef.value != undefined) {
			menuRef.value.setCheckedKeys([]);
		}
		menuExpand.value = false;
		menuNodeAll.value = false;
		form.value = {
			roleId: undefined,
			roleName: undefined,
			roleKey: undefined,
			roleSort: 0,
			status: "0",
			menuIds: [],
			deptIds: [],
			menuCheckStrictly: true,
			deptCheckStrictly: true,
			remark: undefined,
		};
		proxy.resetForm("roleRef");
	}
	/** 添加角色 */
	function handleAdd() {
		reset();
		getMenuTreeselect();
		open.value = true;
		title.value = "添加角色";
	}
	/** 修改角色 */
	function handleUpdate(row) {
		reset();
		const roleId = row.roleId || ids.value;
		open.value = true;
		const roleMenu = getRoleMenuTreeselect(roleId);
		title.value = "修改角色";
		// form.value = response.data;
		// form.value.roleSort = Number(form.value.roleSort);
		//let checkedKeys = res.checkedKeys;
		//  menuRef.value.setChecked(v, true, false);
	}
	/** 根据角色ID查询菜单树结构 */
	function getRoleMenuTreeselect(roleId) {
		menuOptions.value = MenuList.value;
	}
	/** 根据角色ID查询部门树结构 */
	function getDeptTree(roleId) {
		// return deptTreeSelect(roleId).then((response) => {
		//   deptOptions.value = response.depts;
		//   return response;
		// });
		deptOptions.value = MenuList.value;
	}
	/** 树权限（展开/折叠）*/
	function handleCheckedTreeExpand(value, type) {
		if (type == "menu") {
			let treeList = menuOptions.value;
			for (let i = 0; i < treeList.length; i++) {
				menuRef.value.store.nodesMap[treeList[i].id].expanded = value;
			}
		} else if (type == "dept") {
			let treeList = deptOptions.value;
			for (let i = 0; i < treeList.length; i++) {
				deptRef.value.store.nodesMap[treeList[i].id].expanded = value;
			}
		}
	}
	/** 树权限（全选/全不选） */
	function handleCheckedTreeNodeAll(value, type) {
		if (type == "menu") {
			menuRef.value.setCheckedNodes(value ? menuOptions.value : []);
		} else if (type == "dept") {
			deptRef.value.setCheckedNodes(value ? deptOptions.value : []);
		}
	}
	/** 树权限（父子联动） */
	function handleCheckedTreeConnect(value, type) {
		if (type == "menu") {
			form.value.menuCheckStrictly = value ? true : false;
		} else if (type == "dept") {
			form.value.deptCheckStrictly = value ? true : false;
		}
	}
	/** 所有菜单节点数据 */
	function getMenuAllCheckedKeys() {
		// 目前被选中的菜单节点
		let checkedKeys = menuRef.value.getCheckedKeys();
		// 半选中的菜单节点
		let halfCheckedKeys = menuRef.value.getHalfCheckedKeys();
		checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
		return checkedKeys;
	}
	/** 提交按钮 */
	function submitForm() {
		proxy.$refs["roleRef"].validate((valid) => {
			if (valid) {
				if (form.value.roleId != undefined) {
					form.value.menuIds = getMenuAllCheckedKeys();
					proxy.$modal.msgSuccess("修改成功");
					open.value = false;
					getList();
				} else {
					form.value.menuIds = getMenuAllCheckedKeys();
					proxy.$modal.msgSuccess("新增成功");
					open.value = false;
					getList();
				}
			}
		});
	}
	/** 取消按钮 */
	function cancel() {
		open.value = false;
		reset();
	}
	/** 选择角色权限范围触发 */
	function dataScopeSelectChange(value) {
		if (value !== "2") {
			deptRef.value.setCheckedKeys([]);
		}
	}
	/** 分配数据权限操作 */
	function handleDataScope(row) {
		reset();
		const deptTreeSelect = getDeptTree(row.roleId);
		getRole(row.roleId).then((response) => {
			form.value = response.data;
			openDataScope.value = true;
			nextTick(() => {
				deptTreeSelect.then((res) => {
					nextTick(() => {
						if (deptRef.value) {
							deptRef.value.setCheckedKeys(res.checkedKeys);
						}
					});
				});
			});
			title.value = "分配数据权限";
		});
	}
	getList();
</script>