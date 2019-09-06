<template>
  <div style="width:100%;display: flex;align-items: center;justify-content: center">
  <el-form ref="form" :model="form" label-width="90px">
    <el-form-item label="创建案件  " class="grid-creat-case">
    </el-form-item>
    <el-form-item label="案件名称" class="grid-case-name">
      <el-input v-model="form.case_name" class="grid-content">{{form.case_name}}</el-input>
    </el-form-item>
    <el-form-item label="案件描述 " class="grid-case-describe">
      <el-input v-model="form.case_detail" class="grid-case-input">{{form.case_info}}</el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" class="grid-case-creat-button">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
    </div>

</template>

<script>
const axios = require('axios')
const host = 'http://localhost:5000'

export default {
  name: 'CaseCreator',

  data() {
    return {
      form: {
        user_id: '',
        case_id: 1,
        case_name: '',
        case_detail: '',
        create_ts: '',
        update_ts: '',
        task_list: []
      }

    }
  },

  methods: {
      onSubmit() {
          this.$confirm('确认创建此案件？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.submitData()
              this.$message({
                  type: 'success',
                  message: '创建成功!'
              });
              // this.$router.push({ path: '/caseManager/case-info/', query:{case_name:this.form.case_name}})
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消'
              });
          });
      },
    submitData() {

      this.form.user_id = this.$store.getters.name
      console.log('id', this.form.user_id)
      console.log('submit')
      axios.post(host + '/caseManage/creatCase', this.form)
        .then(function(response) {
          // handle success
          console.log(response)
        })
        .catch(function(error) {
          // handle error
          console.log(error)
        })
        .finally(function() {
          console.log('get request finally')
        })
    }
  }
}
</script>

<style scoped>
  .grid-case-name {
    width: 100%;
    /*margin-left: 180px;*/

  }

  .grid-creat-case >>> .el-form-item__label{
    /*margin-left: 150px;*/
    margin-top:150px;
    font-size: 18px;
    width:90px;

  }
  .grid-case-describe {
    /*margin-left: 180px;*/
    width: 100%;
  }
  .grid-case-input >>> .el-input__inner{
    width: 400px;
    font-size: 14px;
    height: 100px;
  }
  .grid-case-creat-button {
    padding: 10px;
    /*margin-left: 250px;*/
    margin-top: 50px;
  }
</style>
