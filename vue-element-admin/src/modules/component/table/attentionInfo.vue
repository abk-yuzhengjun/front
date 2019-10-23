<template>
  <el-table
    height="300"

    :data="attInfo.data">
    <el-table-column
      prop="attention_nickname"
      label="关注人"
      width="400">
    </el-table-column>
    <el-table-column
      prop="attention_intro"
      label="介绍"
      width="400">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "attentionInfo",
        props: ["attInfo"],
        data(){
            return{
                form:{
                    "attention_nickname":"",
                    "attention_intro":"",

                }
            }
        }
    }
</script>

<style scoped>

</style>
