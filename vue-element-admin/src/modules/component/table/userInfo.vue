<template>
  <el-table
    height="300"
    :data="usrInfo.data">
    <el-table-column
      v-if = "show.user_name"
      prop="user_name"
      label="用户名"
      width="100">
    </el-table-column>
    <el-table-column
      v-if = "show.user_nickname"
      prop="user_nickname"
      label="用户昵称"
      width="100">
    </el-table-column>
    <el-table-column
      v-if = "show.user_sex"
      prop="user_sex"
      label="性别"
      width="100">
    </el-table-column>
    <el-table-column
      v-if = "show.user_birthday"
      prop="user_birthday"
      label="生日"
      width="100">
    </el-table-column>
    <el-table-column
      v-if = "show.user_zodiac"
      prop="user_zodiac"
      label="星座"
      width="100">
    </el-table-column>
    <el-table-column
      v-if = "show.user_location"
      prop="user_location"
      label="当前位置"
      width="100">
    </el-table-column>
    <el-table-column
      v-if = "show.user_hometown"
      prop="user_hometown"
      label="家乡"
      width="100">
    </el-table-column>
    <el-table-column
      v-if = "show.use_time"
      prop="use_time"
      label="注册时长"
      width="180">
    </el-table-column>
    <el-table-column
      v-if = "show.signature"
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
                show: {
                    "user_name": "",
                    "user_nickname": "",
                    "user_sex": "",
                    "user_birthday": "",
                    "user_zodiac": "",
                    "user_location": "",
                    "user_hometown": "",
                    "use_time": "",
                    "signature": ""
                }
            }
        },
        methods:{
            existence_identification(){
                for(var key in this.usrInfo['data'][0])
                {
                    this.show[key]=true;
                }
                 console.log("usr show",this.show)
            }
        },
        watch: {
            '$route': 'existence_identification'
        },
        created() {
            // console.log("usrInfo:",this.usrInfo)
            this.existence_identification();
        }
    }
</script>

<style scoped>

</style>
