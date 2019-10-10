<template>
  <el-table
    :data="barInfo.data">
    <el-table-column
      prop="bar_name"
      label="名称"
      width="600">
    </el-table-column>
    <el-table-column
      prop="experience_value"
      label="经验值"
      width="480">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "barAttInfo",
        props: ["barInfo"],
        data(){
            return{
                form:{
                    "bar_name":"",
                    "experience_value":"",
                }
            }
        }
    }
</script>

<style scoped>

</style>
