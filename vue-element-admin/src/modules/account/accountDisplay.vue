<template>
  <div style="padding-left: 15%; padding-top: 6%">
    <el-form >
      <el-form-item label="账号">
        {{accountDisplay.name}}
      </el-form-item>

      <el-form-item  label="密码">
        {{accountDisplay.pwd}}
      </el-form-item>
      <el-form-item  label="角色">
        {{accountDisplay.role}}
      </el-form-item>

      <el-form-item style="width: 50%">
        <el-button  type="primary" @click="submit" >删除</el-button>

      </el-form-item>

    </el-form>

  </div>


</template>

<script>

  export default {

    data() {
      return {
          accountDisplay:
            {
              name:'',
              pwd:'',
              role:'',
              icon:''
            }
      }
    },
    watch:{
      $route(){
//        console.log("route watch: ",this.$route.query.data.userName)
        this.accountDisplay.name = this.$route.query.data.userName
        this.accountDisplay.pwd = this.$route.query.data.userPwd
        this.accountDisplay.role = this.$route.query.data.role
        this.accountDisplay.icon = this.$route.query.data.icon
      }
    },
    mounted() {
      this.accountDisplay.name = this.$route.query.data.userName
      this.accountDisplay.pwd = this.$route.query.data.userPwd
      this.accountDisplay.role = this.$route.query.data.role
      this.accountDisplay.icon = this.$route.query.data.icon

    },
    methods: {
      submit() {
        this.$store.dispatch('user/userDel', this.accountDisplay.name)
          .then((result) => {
            if(result["result"] == 0)
            {
              this.$message({
                message: '删除用户失败',
                type: 'fail',
                duration: 5 * 1000
              })

            }
            else
            {
              const tip = '删除用户成功'
              this.$message({
                message: tip,
                type: 'success',
                duration: 5 * 1000
              })
              this.accountDisplay.name = ''
              this.accountDisplay.pwd = ''
              this.accountDisplay.role = ''
              this.accountDisplay.icon = ''
////
//
//              this.$router.go(0)
              this.$router.push({name: 'account'})
            }
          })
          .catch(() => {

          })
      }
    },
  }
</script>

<style scoped>

</style>
