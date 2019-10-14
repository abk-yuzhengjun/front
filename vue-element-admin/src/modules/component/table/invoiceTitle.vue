<template>
  <el-table
    :data="invoiceData.data">
    <el-table-column
      prop="title"
      label="抬头"
      width="350px">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="250px">
    </el-table-column>
    <el-table-column
      prop="tax_num"
      label="识别号"
      width="580px">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "invoiceTitle",
        props: ["invoiceData"],
        data(){
            return {
                tableData:[{
                    "title":"",
                    "type":"",
                    "tax_num":"",
                }]
            }
        },

    }
</script>

<style scoped>

</style>
