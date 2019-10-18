<template>
  <el-table
    height="300"

    :data="travellerData.data">
    <el-table-column
      prop="name"
      label="姓名"
      width="300px">
    </el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      width="150px">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机号"
      width="300px">
    </el-table-column>
    <el-table-column
      prop="identity_card_number"
      label="身份证"
      width="380px">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "traveller",
        props: ["travellerData"],
        data(){
            return {
                tableData:[{

                }]
            }
        },

    }
</script>

<style scoped>

</style>
