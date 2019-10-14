<template>
  <div style="margin-left: 15px;margin-right: 10px">
    <el-tabs value="accountmsg">
      <el-tab-pane label="个人信息" name="accountmsg" class="el_account_tab">
        <div >
        <el-row :gutter="20">
          <el-col :span="6" :xs="24">
            <el-card >
              <div slot="header">
                <span>About me</span>
              </div>
              <div style="align: center">
                  <div style="text-align: center">
                    <el-avatar :size="100" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                  </div>
                  <div style="text-align: center">
                    <h2>{{userName}}</h2>
                  </div>
                  <div style="text-align: center">
                    <span>{{role}}</span>
                  </div>
                  <el-divider></el-divider>
                  <div style="text-align: center; font-size: 8px">
                    <span>账号创建于: 2019-09-01-20:12:11</span>
                  </div>
                  <el-divider></el-divider>
                  <div style="text-align: center; font-size: 8px">
                    <span>最近登录于: 2019-09-09-20:12:11</span>
                  </div>
              </div>
            </el-card>
          </el-col>

          <el-col :span="18" :xs="24">
            <div style="height: 600px">
                <timeLine></timeLine>
            </div>
          </el-col>

        </el-row>
        </div>
      </el-tab-pane>

      <el-tab-pane label="个人设置" name="accountSetting">
          <el-form :rules="accountRules" ref="account" :model="account" autocomplete="on" style="padding-left: 5%; padding-top: 5%">
              <el-form-item style="width: 50%">
                    <span class="el_account_icon" >
                      <svg-icon icon-class="user" />
                    </span>
                    <el-input v-model="account.name" readonly disabled/>
              </el-form-item>

              <el-form-item  style="width: 50%" prop = "passWord">
                  <span class="el_account_icon">
                    <svg-icon icon-class="password" />
                  </span>
                    <el-input ref="password1" type="password" v-model="account.passWord" placeholder="请输入密码"clearable/>
              </el-form-item>

              <el-form-item style="width: 50%" prop = "passwordAgain">
                  <span class="el_account_icon">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input ref="password2" type="password" v-model="account.passwordAgain" placeholder="请再次输入密码" clearable/>
              </el-form-item>
            <el-form-item>
            <!--<el-upload-->
              <!--class="avatar-uploader"-->
              <!--action="#"-->
              <!--accept="image/png,image/gif,image/jpg,image/jpeg"-->
              <!--:show-file-list="false"-->
              <!--:on-success="handleAvatarSuccess"-->
              <!--&gt;-->
              <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
              <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--</el-upload>-->
            </el-form-item>

              <el-form-item style="width: 50%">
                  <el-button ref="submit1" type="primary" @click="submit" v-bind:disabled="submitFlag">确认</el-button>
                  <!--<el-button type="primary" @click="submit" >确认</el-button>-->
              </el-form-item>

          </el-form>
      </el-tab-pane>

      <el-tab-pane label="账户管理" name="accountManage" v-if="visi">
        <accountManage></accountManage>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
  import timeLine from './accountActive'
  import accountManage from './accountManage'

  export default {
    components: { timeLine,accountManage },

    data() {
      const validatePassword = (rule, value, callback) => {
        if(value === '')
        {
          this.p1=true

          callback(new Error('请输入密码'))
        }
        else if (value.length < 6)
        {
          this.p1=true
          callback(new Error('密码长度至少6位'))
        }
        else
        {
          this.p1=false
          callback()

        }
        this.submitFlag = (this.p1==false && this.p2==false) ? false : true

      }
      const validatePasswordCheck = (rule, value, callback) => {
        if (value === '')
        {
          this.p2=true
          callback(new Error('请再次输入密码'))
        }
        else if (value !== this.account.passWord)
        {
          this.p2=true
          callback(new Error('两次输入密码不一致!'))
        }
        else
        {
          this.p2=false
          callback()
        }
        this.submitFlag = (this.p1==false && this.p2==false) ? false : true

      }

      return {
        visi:false,
        p1:true,
        p2:true,
        submitFlag:true,
        account:{
          name: "",
          passWord: '',
          passwordAgain: ''
        },
        accountRules: {
          //or trigger:change
          passWord: [{ required: true, trigger:"blur", validator: validatePassword }],
          passwordAgain: [{ required: true, trigger: "blur", validator: validatePasswordCheck }]
        },
        imageUrl: ''
      }
    },
    computed: {
      userName:function () {
        return this.$store.getters.name;
      },
      role:function () {
        return this.$store.getters.roles;
      }
    },

    created(){
      this.account.name = this.userName

      this.visi = this.$store.getters.roles.includes("superAdmin")?true:false
//      console.log("user role=", this.$store.getters.roles)
//      console.log("user visi=", this.visi)
    },

    methods: {
      submit() {
//        console.log("submit userName=", this.account.name)
//        console.log("submit userPwd=", this.account.passWord)
//        console.log("submit passwordAgain=", this.account.passwordAgain)
        if(this.account.passWord === this.account.passwordAgain)
        {
          if(this.account.passWord.length < 6)
          {
            this.$message({
              message: 'The password can not be less than 6 digits',
              type: 'fail',
              duration: 3 * 1000})
          }
          else
          {
//            console.log("this account=", this.account)
            this.$store.dispatch('user/userEdit', this.account)
              .then((result) => {
                if(result["result"] == 0)
                {
                  this.$message({
                    message: '修改密码失败',
                    type: 'fail',
                    duration: 5 * 1000
                  })

                }
                else
                {
                  const tip = result["userName"] + ' 修改密码成功'
                  this.$message({
                    message: tip,
                    type: 'success',
                    duration: 5 * 1000
                  })
                }
              })
              .catch(() => {
//                this.loading = false
              })

          }

        }
        else
        {
          this.$message({
          message: '两次输入密码不一致，请重新输入',
          type: 'fail',
          duration: 5 * 1000
        })
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    }
  }

</script>

<style lang="scss" scoped>

  .el_account_tab{
    width: auto;
    margin: auto;

  }

  .el_account_icon {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    margin-right: 5px;
  }
  .el_show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    /*background-color: yellow;*/
  }
</style>

