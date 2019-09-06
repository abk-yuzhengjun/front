<template>

  <div style="width:100%;display: flex;align-items: center;justify-content: center">
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="所属案件：" class="grid-case-ascription">
        <el-select v-model="form.case_id" class="grid-case-ascription-options"
                   v-bind:disabled="pluginControl.case_name">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.case_name"
            :value="item.case_id">
            <span style="float: left">{{ item.case_name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.case_id }}</span>
          </el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="任务名称：" class="grid-case-ascription">
        <el-input v-model="form.task_name" class="grid-case-ascription-options" placeholder="请输入案件名称"
                  v-bind:disabled="pluginControl.task_name">
          {{form.task_name}}
        </el-input>
      </el-form-item>
      <el-form-item label="设备列表：" class="grid-case-ascription">
        <el-select v-model="form.dev_list" multiple placeholder="请选择" class="grid-device-manage" value="">
          <el-option
            v-for="item in dev_list"
            :key="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任务类型：" class="grid-case-ascription">
        <el-radio-group v-model="form.task_type" @change="modeChose">
          <el-radio :label="1">取号</el-radio>
          <el-radio :label="2">取证</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="取证列表：" class="grid-evidence-list" v-show=caseShow>
        <div v-for="(v,i) in form.evidence_content">
          <el-input v-model="form.evidence_content[i].phone" class="grid-evidence-list-1" placeholder="电话号码">
          </el-input>
          <el-input v-model="form.evidence_content[i].imsi" class="grid-evidence-list-1" placeholder="IMSI">
          </el-input>
          <el-select v-model="form.evidence_content[i].app_list" multiple placeholder="请选择" class="grid-list-2">
            <el-option
              v-for="item in option_app"
              :key="item"
              :value="item"
            />
          </el-select>
          <el-button @click.prevent="removeEvidentList(v)">删除</el-button>
        </div>
        <el-button type="primary" class="grid-add-list" @click="AddEvidentList">添加</el-button>
      </el-form-item>

      <div v-show=numShow>
        <el-form-item label="取号范围：" class="grid-num-1">
          <el-radio-group v-model="form.number_content.capture_mode" @change="modeChose">
            <el-radio :label="1">黑名单</el-radio>
            <el-radio :label="2">全部</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="取号方式：" class="grid-num-2">
          <el-radio-group v-model="form.number_content.capture_type">
            <el-radio :label="1">网络优先</el-radio>
            <el-radio :label="2">仅空口</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="运营商：" class="grid-operators">
          <el-select v-model="form.number_content.capture_operation" multiple placeholder="请选择" value="">
            <el-option
              v-for="item in options_operator"
              :key="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="黑名单：" class="grid-black-list-lable" v-show=pluginControl.blackList>
          <div v-for="(v,i) in form.number_content.imsi_black_list" class="grid-black-list">
            <el-input v-model="form.number_content.imsi_black_list[i]" class="grid-black-list-imsi" placeholder="IMSI">
            </el-input>
            <el-button @click.prevent="removeblackList(v)">删除</el-button>
          </div>
          <el-button type="primary" class="grid-black-list-add" @click="AddblackList">添加</el-button>
        </el-form-item>
      </div>


      <el-form-item>
        <el-button type="primary" class="grid-task-submit" @click="onSubmit"> 提交</el-button>
        <!--        <el-button v-show = >取消</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  const axios = require('axios')
  const host = 'http://localhost:5000'
  export default {
    name: 'TaskCreator',
    props: ["type"],
    data() {
      return {

        pluginControl: {
          task_name: '',
          case_name: '',
          blackList: ''
        },
        dialogVisible: false,
        caseShow: true,
        numShow: false,
        clickfalse: false,
        dev_list: '',
        form: {
          user_id: '',
          case_name: '',
          case_id:'',
          task_id: 1,
          task_name: '',
          task_detail:'',
          create_ts: '',
          task_type: '',
          dev_list: [],
          number_content: {
            capture_mode: '',
            imsi_black_list: [
              ''
            ],
            capture_operation: '',
            capture_type: ''
          },
          evidence_content: [
            {
              phone: '',
              imsi: '',
              app_list: '',
            }
          ]
        },
        options: [
          ''
        ],
        options_more: [],
        options_operator: [
          '全部',
          '中国移动',
          '中国联通',
          '中国电信',
        ],
        option_app: [
          '全部',
          '支付宝',
          '微信',
          '微博',
          '抖音',
          '淘宝',
        ],
        value1: '',
        value2: [],
        value3: [],
        value4: [],
        value5: []
      }
    },
    // computed: {
    //     rowDatas() {
    //         return this.$store.getters.rowDatas
    //     }
    // },
    methods: {
      handleClose() {
        window.opener = null;
        window.open("about:blank", "_top").close()
        // this.$confirm('确认关闭？')
        //     .then(_ => {
        //         done();
        //     })
        //     .catch(_ => {});
      },
      onSubmit() {
        this.$confirm('确认提交此任务？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitData()
          this.$message({
            type: 'success',
            message: '成功!'
          });

          // this.$router.push({path: '/caseManager/case-info/', query: {case_name: this.form.case_name}})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      submitData() {
        console.log('submit task!')
        console.log(this.form)
        axios.post(host + '/caseManage/creatTask/submitTask', this.form)
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
          .finally(function () {
            console.log('get request finally')
          })
      },

      modeChose() {
        console.log('task_type', this.form.task_type)
        if (2 == this.form.task_type) {
          this.caseShow = true,
            this.numShow = false
        } else {
          this.caseShow = false,
            this.numShow = true
        }
        this.blackList()

      },
      AddblackList() {
        this.form.number_content.imsi_black_list.push('')
      },
      removeblackList(item) {
        var index = this.form.number_content.imsi_black_list.indexOf(item)
        if (index !== -1) {
          this.form.number_content.imsi_black_list.splice(index, 1)
        }
      },
      AddEvidentList() {
        this.form.evidence_content.push({
          phone: '',
          imsi: '',
          app_list: []
        })
      },
      removeEvidentList(item) {
        var index = this.form.evidence_content.indexOf(item)
        if (index !== -1) {
          this.form.evidence_content.splice(index, 1)
        }
      },
      blackList() {
        // console.log("v-show capture_typr",this.form.number_content.capture_mode)
        if (this.form.task_type == 1 && this.form.number_content.capture_mode == 1) {

          this.pluginControl.blackList = true
        } else {
          this.pluginControl.blackList = false
        }
        // console.log("v-show blackList",this.pluginControl.blackList)
      },
      dialogshow() {

        if (this.type == 1) {
          this.form = this.$store.state.caseInfo.RowData;

          this.pluginControl.task_name = true
          this.pluginControl.case_name = true

          console.log("type 1 :", this.form)
        } else {
          this.pluginControl.task_name = false
          this.pluginControl.case_name = false

        }
        console.log("form", this.form)
        // console.log("this.pluginControl.task_name",this.pluginControl.task_name)
        this.modeChose()
      }

    },
    beforeUpdate: function () {
      if (this.type == 1) {
        this.form = this.$store.state.caseInfo.RowData;
        // console.log("update")
      }
    },
    beforeMount: function () {
      console.log("this.options")
      const host = 'http://localhost:5000'
      console.log('query case!')

      this.form.user_id = this.$store.getters.name

      axios.post(host + '/caseManage/queryallcase', this.form)
        .then(response => {
            this.options = response.data;
            console.log("option", this.options);
            this.dialogshow();
          }
        )
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
          console.log('get request finally')
        });

      axios.post(host + '/caseManage/querydevinfo', this.form)
        .then(response => {
            this.dev_list = response.data;
            console.log(this.dev_list );
          }
        )
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
          console.log('get request finally')
        })
    }
  }

</script>

<style scoped>
  .grid-case-ascription {
    margin-top: 30px;
    font-size: 12px;
    /*margin-left: 160px;*/

  }

  .grid-evidence-list {
    /*margin-top: 100px;*/
    font-size: 12px;
    /*margin-left: 160px;*/
  }

  .grid-case-ascription-options {
    width: 500px;
  }

  .grid-device-manage {
    width: 500px;
  }

  .grid-list-2 {
    /*margin-top: 30px;*/
    width: 200px;
    margin-bottom: 10px;
  }

  .grid-evidence-list-1 {
    /*margin-top: 100px;*/
    width: 160px;
    margin-bottom: 10px;
  }

  .grid-task-submit {
    margin-top: 100px;
    justify-content: center
    /*margin-left: 300px;*/
  }

  .grid-operators {
    width: 500px;
    /*margin-left: 160px;*/
  }

  .grid-num-1 {
    /*margin-left: 160px;*/
    width: 500px;
    margin-top: 50px;
  }

  .grid-num-2 {
    /*margin-left: 160px;*/
    width: 500px;
    margin-top: 5px;
  }

  .grid-add-list {
    /*margin-left: 220px;*/
  }

  .grid-black-list {
    margin-top: 5px;
    width: 350px;
  }

  .grid-black-list-add {
    /*margin-left: 100px;*/
    margin-top: 20px;
  }

  .grid-black-list-imsi {
    /*margin-top: 100px;*/
    width: 220px;
  }

  .grid-black-list-lable {
    /*margin-left: 160px;*/
    width: 100px;
  }
</style>
