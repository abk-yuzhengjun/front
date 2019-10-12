<template>
    <div style="width: 100%; padding-left: 15%; padding-top: 6%">

    <el-form :rules="myrules" ref="account" :model="account">
      <el-form-item label="账号" prop = "name">
        <el-input  v-model="account.name" style="width: 50%" placeholder="请输入用户名" clearable />
      </el-form-item>

      <el-form-item  label="密码" prop = "pwd">
        <el-input v-model="account.pwd" style="width: 50%" type="password" placeholder="请输入密码"clearable/>
      </el-form-item>
      <el-form-item  label="角色">
       {{account.role}}
      </el-form-item>

      <el-form-item style="width: 50%">
        <el-button  type="primary" @click="submit" >创建用户</el-button>

      </el-form-item>

    </el-form>
    </div>

</template>

<script>
  export default {
    data() {

      const validatePassword = (rule, value, callback) => {
        if(value === '')
        {
          callback(new Error('请输入密码'))
        }
        else if (value.length < 6)
        {

          callback(new Error('密码长度至少6位'))
        }
        else
        {

          callback()

        }
      }
      const validateName = (rule, value, callback) => {
        if (value === '')
        {
          callback(new Error('请输入账号'))
        }
        else
        {
          callback()
        }

      }
      return {
        account:
          {
            name:'',
            pwd:'',
            role:'',
            icon:''
          },
        myrules: {
          name: [{ required: true, trigger:"blur", validator: validateName }],
          pwd: [{ required: true, trigger: "blur", validator: validatePassword }]
        },

      }
    },
    methods: {
      submit() {
        if(this.account.name==='' || this.account.pwd==='' || this.account.pwd.length < 6)
        {
          this.$message({
            message: '输入不合法',
            type: 'fail',
            duration: 5 * 1000
          })

        }
        else
        {
          this.$store.dispatch('user/userAdd', this.account)
            .then((result) => {
              if(result["result"] == 0)
              {
                this.$message({
                  message: '添加用户失败',
                  type: 'fail',
                  duration: 5 * 1000
                })

              }
              else
              {
                const tip = '添加用户成功'
                this.$message({
                  message: tip,
                  type: 'success',
                  duration: 5 * 1000
                })
                this.$router.push({name: 'account'})
              }
            })
            .catch(() => {

            })

        }


      }
    },
    watch:{
      $route(){
        this.account.role = this.$route.query.label == "超级管理员" ? "superAdmin":"admin"
      }
    },
    created() {

      this.account.role= this.$route.query.label == "超级管理员" ? "superAdmin":"admin"
    }


  }
</script>

<style scoped>
  .iconClass {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    margin-right: 5px;
  }

</style>
