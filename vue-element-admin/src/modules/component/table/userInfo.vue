<template>
  <el-table
    height="300"

    :data="usrInfo.data">
    <el-table-column
      prop="user_nickname"
      label="用户名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="user_sex"
      label="性别"
      width="150">
    </el-table-column>
    <el-table-column
      prop="use_age"
      label="注册时长"
      width="150">
    </el-table-column>
    <el-table-column
      prop="user_birthday"
      label="生日"
      width="150">
    </el-table-column>
    <el-table-column
      prop="user_zodiac"
      label="星座"
      width="150">
    </el-table-column>
    <el-table-column
      prop="user_hometown"
      label="家乡"
      width="150">
    </el-table-column>
    <el-table-column
      prop="signature"
      label="个性签名"
      width="180">
    </el-table-column>

  </el-table>
</template>

<script>
    export default {
        name: "userInfo",
        props: ["usrInfo"],
        data(){
            return {
                "user_nickname":"",
                "use_age":"",
                "user_birthday":"",
                "user_zodiac":"",
                "user_location":"",
                "user_hometown":"",
                "signature":"",
                "user_sex":"",
            }
        }
    }
</script>

<style scoped>

</style>
