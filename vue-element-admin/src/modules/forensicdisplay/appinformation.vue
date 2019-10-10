<template>
  <div class="back_ground">
  <div class ="task_info">
    <el-form style="width:100%;margin:20px">
      <el-row >
        <el-col >
          <el-form-item  :label="form.app_name" class="label_app_name">

          </el-form-item>
        </el-col>
        </el-row>

        <el-row :gutter="1">
          <el-col :span="6">
            <el-form-item label="创建人:">
              {{form.creactor}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item  label="手机号码:" class="label_task_name">
              {{form.phone}}
            </el-form-item>
          </el-col >

        </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item  label="开始时间:" class="label_task_name">
            {{form.start_time}}
          </el-form-item>
        </el-col >
        <el-col :span="14">
          <el-form-item  label="任务编号:"class="label_task_creat_time">
            {{form.task_id}}
          </el-form-item>
        </el-col >
        <el-col :span="2">
          <el-form-item  label="状态:">
          </el-form-item>
        </el-col >
        <el-col :span="2">
          <el-form-item  label="数量:">
          </el-form-item>
        </el-col >
        </el-row>

      <el-row>
        <el-col :span="6">
        <el-form-item label="结束时间:">
          {{form.update_time}}
        </el-form-item>
      </el-col>
        <el-col :span="14">
          <el-form-item label="任务详情:">
            {{form.task_detail}}
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="">
            正在取证
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="">
          56
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

  </div>
    <div class="app_info">
      <app_show :appInfo = "form"></app_show>
    </div>



</div>
</template>

<script>
  import app_show from "../component/app_show";
  const axios = require('axios')
export default {
  name: 'appinformation',
    components: {app_show},
    data() {
      return {
          postData:{
              task_id:'',
              phone:'',
              app_name:''
          },

          form: {
              // task_id:'5d1313121588852',
              // phone:'13886835964',
              // deleted:'0',
              // app_name:'Taobao',
              // imsi:'',
              // creactor:'Mr.Hu',
              // start_time:'2019-09-21 15:34:13',
              // update_time:'2019-09-23 15:34:13',
              // app_data:[
              //     {
              //         class:'goodsOrder',
              //         version:'1.0',
              //         data:[{
              //             "order_number":"1",
              //             "order_content":"2",
              //             "goods_name":"3",
              //             "goods_price":"4",
              //             "delivery_address":"5",
              //             "delivery_name":"6",
              //             "delivery_phone":"7"
              //         }]
              //     },
              //     {
              //         class:'deliveryAdress',
              //         version:'1.0',
              //         data:[{
              //             "delivery_address":"武汉",
              //             "delivery_name":"胖虎",
              //             "delivery_phone":"1312512123",
              //             "delivery_post":"22222222",
              //             "is_default":1
              //         }]
              //     }
              // ],
          },

          activeName: 'second',
          appShow:''
      }

    },
    sockets: {
        appInfoUpdate(data) {                                 //监听appInfoUpdate事件，方法是后台定义和提供的

            console.log("appinfo update data:",data);

        }

    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);

        },
        app_name_show(name){
            if(name === 'Taobao') {
                return '淘宝'
            }
            else if(name === 'Meituan'){
                return '美团'
            }
            else if(name === 'Meituan'){

            }
            else if(name === 'Meituan'){

            }
            else if(name === 'Meituan'){

            }
            else if(name === 'Meituan'){

            }
            else if(name === 'Meituan'){

            }
            else if(name === 'Meituan'){

            }


        },
        getAppInfo() {
            const host = 'http://localhost:5000'
            // console.log("query",this.$route.query)
            this.postData.task_id = this.$route.query.task_id
            this.postData.phone = this.$route.query.phone
            this.postData.app_name = this.$route.query.appName


            // console.log("postData",this.postData)

            axios.post(host + '/forensic/getAppInfo', this.postData)
                .then(response=>{
                    this.form = response.data
                        // console.log("get app info axios:",response)
                    }
                )
                .catch(function(error) {
                    console.log(error)
                })
                .finally(function() {
                    console.log('get request finally')
                })

        },

    },
    created(){
      // console.log("app information create")
        this.getAppInfo()
    }
}
</script>

<style scoped>
  .back_ground{
    background-color: #f2f2f2;
    width:100%;
    display: flex;
    align-items: center;
    flex-wrap:  wrap;
  }
  .task_info{
    width:100%;
    display: flex;
    height: 300px;
    margin-bottom:10px;
    background-color: white;

  }
  .app_info{
    width:100%;
    display: flex;
    background-color: white;

  }
  .label_app_name >>> .el-form-item__content{
    font-size: 24px;

  }

  .label_task_name{
    width: 300px;

  }
  .label_task_creat_time{
    width: 300px;

  }
</style>
