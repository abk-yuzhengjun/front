<template>
  <div style="width:100%;display: flex;align-items: center;justify-content: center">
    <el-form ref="form" :model="form" label-width="200px">
      <el-form-item label="所属案件：" class="grid-case-ascription">
        <el-select v-model="case_info.case.case_name" class="grid-case-ascription-options"
                   v-bind:disabled="pluginControl.case_name">
          <el-option
            v-for="(item,index) in form.case_list"
            :key="index"
            :label="item.case_name"
            :value="item.case_name" >
            <span style="float: left">{{ item.case_name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.case_id }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务名称：" class="grid-case-ascription">
        <el-input v-model="form.task_info.task_name" class="grid-case-ascription-options" placeholder="请输入任务名称"
                  v-bind:disabled="pluginControl.task_name">
          {{form.task_info.task_name}}
        </el-input>
      </el-form-item>
      <el-form-item label="任务详情：" class="grid-case-ascription">
        <el-input v-model="form.task_info.task_detail" class="grid-case-detail" placeholder="请输入任务详情">
          {{form.task_info.task_detail}}
        </el-input>
      </el-form-item>
      <el-form-item label="设备列表：" class="grid-case-ascription">
        <el-select v-model="form.task_info.dev_list" multiple placeholder="请选择" class="grid-device-manage" >
          <el-option
            v-for="item in form.dev_list"
            :key="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="任务类型：" class="grid-case-ascription">
        <el-radio-group v-model="form.task_info.task_type" @change="modeChose">
          <el-radio :label="1">取号</el-radio>
          <el-radio :label="2">取证</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="取证列表：" class="grid-evidence-list" v-show=pluginControl.caseShow>
        <div v-for="(v,i) in form.task_info.evidence_content">
          <el-input v-model="form.task_info.evidence_content[i].phone" class="grid-evidence-list-1" placeholder="电话号码">
          </el-input>
          <el-input v-model="form.task_info.evidence_content[i].imsi" class="grid-evidence-list-1" placeholder="IMSI">
          </el-input>
          <el-select v-model="form.task_info.evidence_content[i].app_list" multiple placeholder="请选择" class="grid-list-2">
            <el-option
              v-for="(item,index) in form.app_list"
              :key="index"
              :value="item"/>
          </el-select>
          <el-button type="danger" @click.prevent="removeEvidentList(v)" icon="el-icon-minus" round></el-button>
        </div>
        <el-button type="success" class="grid-add-list" @click="AddEvidentList" icon="el-icon-plus" round></el-button>
      </el-form-item>

      <div v-show=pluginControl.numShow>
        <el-form-item label="运营商  ：" class="grid-operators">
          <el-select v-model="form.task_info.number_content.capture_operation" multiple placeholder="请选择" value="">
            <el-option
              v-for="item in form.oper_list"
              :key="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="取号范围：" class="grid-num-1">
          <el-radio-group v-model="form.task_info.number_content.capture_mode" @change="modeChose">
            <el-radio :label="2">黑名单</el-radio>
            <el-radio :label="1">全部</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="取号方式：" class="grid-num-2">
          <el-radio-group v-model="form.task_info.number_content.capture_type">
            <el-radio :label="1">网络优先</el-radio>
            <el-radio :label="2">仅空口</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="黑名单：" class="grid-black-list-lable" v-show=pluginControl.blackList>
          <div v-for="(v,i) in form.task_info.number_content.imsi_black_list" class="grid-black-list">
            <el-input v-model="form.task_info.number_content.imsi_black_list[i]" class="grid-black-list-imsi" placeholder="IMSI">
            </el-input>
            <el-button type="danger" @click.prevent="removeblackList(v)" icon="el-icon-minus" round></el-button>
          </div>
          <el-button type="success" class="grid-black-list-add" @click="AddblackList" icon="el-icon-plus" round></el-button>
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
    import caseInfo from "../casemanager/caseInfo";

    const axios = require('axios')
    export default {
        name: 'task_comp',
        props: ["taskData"],
        data() {
            return {
                devTest:{
                    label:{devlist:[]}
                },

                // devlist:[],
                pluginControl: {
                    task_name: '',
                    case_name: '',
                    blackList: '',
                    numShow:'',
                    caseShow:'',
                },
                case_info:{
                    case:{case_id:'',case_name:''},
                    user_id:''
                },
                form:{
                    type: '',//创建任务页面0 案件中新增任务1 编辑已有任务2
                    dev_list:[],
                    case_list:[],
                    oper_list:[],
                    app_list:[],
                    task_info:{
                        case_name:'',
                        user_id:'',
                        case_id:'',
                        task_id: '',
                        task_name: '',
                        task_detail:'',
                        create_ts: '',
                        update_ts: '',
                        start_ts:'',
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
                                update_ts:'',
                                app_list: '',
                            }
                        ]
                    }
                }
            }
        },

        methods: {
            taskJump(){
                // console.log("case_id：",this.form.task_info.case_id)
                // console.log("task_id：",this.form.task_info.task_id)
                if(2 === this.form.task_info.task_type) {

                    this.$router.push(
                        {
                            name: 'evidenceinformation',  //取证任务
                            query: {
                                caseId: this.form.task_info.case_id,
                                taskId: this.form.task_info.task_id
                            }
                        }
                    )
                }
                else {
                    this.$router.push(
                        {
                            name: 'phoneinformation',  //取号任务
                            query: {
                                caseId: this.form.task_info.case_id,
                                taskId: this.form.task_info.task_id
                            }
                        }
                    )
                }
            },
            nameTranslate(name){
                if(name === '淘宝'){
                    return 'Taobao'
                }
                if(name === '同程旅游'){
                    return 'Tongchenglvyou'
                }
                if(name === '百度贴吧'){
                    return 'Baidutieba'
                }
                if(name === '菜鸟裹裹'){
                    return 'Cainiaoguoguo'
                }
                if(name === '哈啰出行'){
                    return 'Haluochuxing'
                }
                if(name === '美团'){
                    return 'Meituan'
                }
                if(name === '美团外卖'){
                    return 'Meituanwaimai'
                }
                if(name === '芒果电单车'){
                    return 'Mango'
                }
                if(name === '摩拜单车'){
                    return 'Mobike'
                }
                if(name === '新浪微博'){
                    return 'Sinaweibo'
                }
                if(name === '携程旅行'){
                    return 'Xiechenglvxing'
                }
                if(name === '去哪儿'){
                    return 'Qunar'
                }
                if(name === '拼多多'){
                    return 'Pinduoduo'
                }



            },
            nameRetranslate(name){
                if(name === 'Taobao'){
                    return '淘宝'
                }
                if(name === 'Tongchenglvyou'){
                    return '同程旅游'
                }
                if(name === 'Baidutieba'){
                    return '百度贴吧'
                }
                if(name === 'Cainiaoguoguo'){
                    return '菜鸟裹裹'
                }
                if(name === 'Haluochuxing'){
                    return '哈啰出行'
                }
                if(name === 'Meituan'){
                    return '美团'
                }
                if(name === 'Meituanwaimai'){
                    return '美团外卖'
                }
                if(name === 'Mango'){
                    return '芒果电单车'
                }
                if(name === 'Mobike'){
                    return '摩拜单车'
                }
                if(name === 'Sinaweibo'){
                    return '新浪微博'
                }
                if(name === 'Xiechenglvxing'){
                    return '携程旅行'
                }
                if(name === 'Qunar'){
                    return '去哪儿'
                }
                if(name === 'Pinduoduo'){
                    return '拼多多'
                }



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

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            list_from_list(){
                for(var i = 0;i <this.form.task_info.evidence_content.length;i++){

                    for(var j = 0;j < this.form.task_info.evidence_content[i].app_list.length;j++){

                        var obj ;
                        obj = this.nameRetranslate(this.form.task_info.evidence_content[i].app_list[j].app_name);
                        this.form.task_info.evidence_content[i].app_list[j] =obj

                    }
                }
                console.log("list_from_list:",this.form.task_info)
            },
            get_app_list(){

                for(var i = 0;i <this.form.task_info.evidence_content.length;i++){

                    for(var j = 0;j < this.form.task_info.evidence_content[i].app_list.length;j++){

                        var obj = {'app_name':'', 'app_status':'ready','update_ts':''};
                        obj['app_name'] = this.nameTranslate(this.form.task_info.evidence_content[i].app_list[j]);
                        this.form.task_info.evidence_content[i].app_list[j] =obj

                    }
                }
            },
            get_case_id(case_name){
               for(var i = 0;i <this.form.case_list.length;i++){
                   if(case_name === this.form.case_list[i].case_name){
                       this.form.task_info.case_id =this.form.case_list[i].case_id;
                   }
                }

            },
            submitData() {
                const host = this.$store.getters.host
                this.form.task_info.case_name = this.case_info.case.case_name
                this.form.task_info.user_id = this.$store.getters.name
                this.form.task_info.type = this.form.type
                this.get_case_id(this.form.task_info.case_name)
                this.get_app_list()
                console.log("submit task",this.form.task_info)

                axios.post(host + '/caseManage/creatTask/submitTask', this.form.task_info)
                    .then(response=> {
                        this.form.task_info.task_id = response.data.task_id
                        this.$emit('closeTaskDialog')
                        this.taskJump()
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

                if (2 === this.form.task_info.task_type) {
                    this.pluginControl.caseShow = true
                    this.pluginControl.numShow = false
                } else {
                    this.pluginControl.caseShow = false
                    this.pluginControl.numShow = true
                }
                this.blackList()


            },
            AddblackList() {
                this.form.task_info.number_content.imsi_black_list.push('')
            },
            removeblackList(item) {
                var index = this.form.task_info.number_content.imsi_black_list.indexOf(item)
                if (index !== -1) {
                    this.form.task_info.number_content.imsi_black_list.splice(index, 1)
                }
            },
            AddEvidentList() {
                this.form.task_info.evidence_content.push({
                    phone: '',
                    imsi: '',
                    app_list: []
                })
            },
            removeEvidentList(item) {
                var index = this.form.task_info.evidence_content.indexOf(item)
                if (index !== -1) {
                    this.form.task_info.evidence_content.splice(index, 1)
                }
            },
            blackList() {

                if(1=== this.form.task_info.task_type  && 2 === this.form.task_info.number_content.capture_mode ) {

                    this.pluginControl.blackList = true
                }
                else {
                    this.pluginControl.blackList = false
                }
                // console.log("v-show blackList",this.pluginControl.blackList)
            },
            dialogshow() {

                if(0 === this.form.type){
                    this.pluginControl.task_name = false;
                    this.pluginControl.case_name = false
                }
                else if(1 === this.form.type){
                    this.pluginControl.task_name = false;
                    this.pluginControl.case_name = true;
                    this.case_info.case.case_id =this.form.task_info.case_id;
                    this.case_info.case.case_name =this.form.task_info.case_name;
                    this.form.task_info.number_content.imsi_black_list =[''];
                    this.form.task_info.dev_list=[];
                    this.list_from_list();
                    // console.log('dialogshow   ------------------------1')
                }
                else if(2 === this.form.type){
                    this.pluginControl.task_name = false;
                    this.pluginControl.case_name = true;
                    this.case_info.case.case_id =this.form.task_info.case_id;
                    this.case_info.case.case_name =this.form.task_info.case_name;
                    this.list_from_list();
                }
                // console.log("form", this.form)
                // console.log("this.pluginControl.task_name",this.pluginControl.task_name)

            }

        },

        created: function () {

            this.form = this.taskData
            console.log("taskData:",this.form)
            if(0 === this.form.type)
            {
                this.form.task_info.task_type = 2
            }
            this.dialogshow()
            this.modeChose()

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
  .grid-case-detail {
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
    /*margin-top: 50px;*/
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
    margin-left: 80px;
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
