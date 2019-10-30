<template>
  <el-table
    height="300"
    :data="fInfo.data">
    <el-table-column
      prop="fans_nickname"
      label="粉丝名"
      width="300">
    </el-table-column>
    <el-table-column
      prop="fans_state"
      label="状态"
      width="300">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "fansInfo",
        props: ["fInfo"],
        data(){
            return{
                form:{
                    "fans_nickname":"",
                    "fans_state":"",

                }
            }
        }
    }
</script>

<style scoped>

</style>
