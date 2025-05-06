<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action="#"
      :auto-upload="false"
      multiple
      accept="xls,xlsx"
      :limit="1"
      ref="FileUpload"
      name="file"
      :on-change="uploadChange"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">可以拖拽到这里 <em>或者点击我</em></div>
    </el-upload>
    <el-table
      :data="tableData"
      class="hight-table Table-Blod"
      border
      v-if="tableData.length"
    >
      <el-table-column
        v-for="(value, key) in tableData[0]"
        :key="key"
        :prop="key"
        :label="key"
        align="center"
        show-overflow-tooltip
        min-width="120"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import * as XLSL from "xlsx";
const tableData = ref([]);
function uploadChange(file) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file.raw);

  reader.onload = () => {
    let workbook = XLSL.read(reader.result, { type: "array" });
    let sheetNames = workbook.SheetNames[0];
    let jsonData = XLSL.utils.sheet_to_json(workbook.Sheets[sheetNames]);
    tableData.value = jsonData;
    console.log(jsonData);
  };
}
</script>
<style lang="scss" scoped>
.upload-demo {
  width: 220px;
  margin: 50px auto;
}
</style>
