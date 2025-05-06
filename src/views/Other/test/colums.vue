<template>
    <div class="Test-Page">
      <nav>
        <el-button circle icon="Edit" @click="handleClick" />
        <right-toolbar v-model:showSearch="extend" :columns="Columns"></right-toolbar>
      </nav>
      <el-table :data="tableData" ref="tableRef" border center class="Table-Blod" style="width: 100%" height="100%">
        <el-table-column type="selection" width="55" fixed align="center" />
        <el-table-column align="center" v-for="(v, i) in filterColumns" :key="i" :prop="v.prop" :label="v.label"
          :min-width="v.width"></el-table-column>
      </el-table>
      <SetColumns ref="setColumn" @update:columns="UpdateColumns"></SetColumns>
    </div>
  </template>
  
  <script setup>
  import SetColumns from "@/components/Columns/index"
  const extend = ref(false)
  const tableData = ref([
    {
      name: 'zhangsan',
      age: 28,
      sex: 1,
      address: '江苏省无锡市xxxxxx街道',
      phone: '13512345678',
      email: '1111111@sina.cn',
      remark: '这是备注'
    }
  ])
  const Columns = ref([
    {
      prop: 'name',
      label: '姓名',
      width: 120,
      visible:true,
    },
    {
      prop: 'age',
      label: '年龄',
      width: 120,
      visible:true,
    },
    {
      prop: 'sex',
      label: '性别',
      width: 120,
      visible:true,
    },
    {
      prop: 'address',
      label: '地址',
      width: 180,
      visible:true,
    },
    {
      prop: 'phone',
      label: '电话',
      width: 120,
      visible:true,
    },
    {
      prop: 'email',
      label: '邮箱',
      width: 120,
      visible:true,
    },
    {
      prop: 'remark',
      label: '备注',
      width: 120,
      visible:true,
    }
  ])
  const filterColumns=computed(()=>{
    return Columns.value.filter(v=>v.visible);
  })
  const setColumn = ref(null)
  function handleClick() {
    setColumn.value.openDialog(JSON.parse(JSON.stringify(Columns.value)))
  }
  const tableRef=ref(null)
  function UpdateColumns(data){
    Columns.value=data;
    tableRef.value?.doLayout()
  }
  </script>
  <style lang="scss" scoped>
  .Test-Page {
    nav {
      display: flex;
      justify-content: flex-end;
      margin: 15px 10px;
    }
  }
  </style>