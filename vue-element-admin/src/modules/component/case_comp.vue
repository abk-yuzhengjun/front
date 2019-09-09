<template>
  <div style="width:100%;display: flex;align-items: center;justify-content: center">
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="创建案件  " class="grid-creat-case" v-show="caseShow">
      </el-form-item>
      <el-form-item label="案件名称" class="grid-case-name">
        <el-input v-model="form.case_name" class="grid-content">{{form.case_name}}</el-input>
      </el-form-item>
      <el-form-item label="案件描述 " class="grid-case-describe">
        <el-input v-model="form.case_detail" class="grid-case-input">{{form.case_info}}</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="grid-case-creat-button" :loading="submitLoading">提交</el-button>

      </el-form-item>
    </el-form>
  </div>

</template>

<script>
const axios = require('axios')
const host = 'http://localhost:5000'

export default {
    name: 'case_comp',
    props:{"compData":Object},
    data() {
        return {
            caseShow:true,
            submitLoading:false,
            form: {
                type:'',//创建案件0 编辑案件1
                case_id:'',
                case_name:'',
                case_detail: '',
                user_id:'',
                create_ts: '',
                update_ts:''

            },
            case_info:{
                case:{
                    case_id:'',
                    case_name:'',
                },
                user_id:'',
            }

        }
    },

    methods: {
        onSubmit() {
            this.submitLoading = true
            this.submitData()
        },
        submitData() {

            this.form.user_id = this.$store.getters.name
            console.log('id', this.form.user_id)
            console.log('submitcase',this.form)
            axios.post(host + '/caseManage/creatCase', this.form)
                .then(response=> {
                    // handle success
                    this.submitLoading = false
                    this.case_info.case.case_id=response.data.content.caseid
                    this.case_info.user_id = this.form.user_id
                    this.case_info.case.case_name = this.form.case_name
                    this.$router.push({ path: '/caseManager/case-info/', query: {info: this.case_info}})

                    console.log("caseid",response.data.content.caseid)
                })
                .catch(function(error) {
                    // handle error
                    console.log(error)
                })
                .finally(function() {
                    console.log('get request finally')
                })
        }
    },
    created() {
        console.log("compData",this.compData)
        this.form = this.compData
        if(1 === this.form.type) {
            this.caseShow = false

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
