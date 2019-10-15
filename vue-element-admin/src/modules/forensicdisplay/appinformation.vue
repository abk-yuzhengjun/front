<template>
  <div class="back_ground">
  <div class ="task_info">
    <el-form style="width:100%;margin:20px">
      <el-row >
        <el-col >
          <svg-icon  :icon-class=postData.app_name
                    style="width: 40px;height: 40px;margin-right: 16px ;margin-bottom:10px"/>
          <el-form-item label="">
            {{postData.app_name}}
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
          <el-form-item label="最新消息:">
            {{detail}}
<!--            <svg-icon  icon-class="greenido"-->
<!--                       style="width: 30px;height: 30px;"/>-->
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="">
            正在取证
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label="">
          {{this.cnt}}
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
          cnt:0,
          detail:'取证进行中~！',
          postData:{
              task_id:'',
              phone:'',
              app_name:''
          },

          form: {

          },

          activeName: 'second',
          appShow:''
      }

    },
    sockets: {
        appInfoUpdate(data) {                                 //监听appInfoUpdate事件，方法是后台定义和提供的
            // console.log("postData:",this.postData.task_id,this.postData.app_name);
             console.log("from:",this.form);
            if (data.task_id === this.postData.task_id){
                  for(var i= 0;i < this.form.app_data.length;i++){
                      if(this.form.app_data[i].class === data.class){
                          this.form.app_data[i].data.push(data.data)
                          console.log("update app :",this.form);
                          this.detail = '获取到新的'+ this.translate(data.class)+'信息';
                          this.cnt += 1;
                          this.message_tip(this.detail)
                          return ;
                      }

                }

                // for(item in appInfo.app_data){
                //     if (item.class ===data.class){
                //
                //     }
                // }
            }

        }

    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);

        },
        message_tip(message){
            this.$notify({
                title: '您有一条新的消息！',
                message: message,
                position: 'top-right'
            });
        },
        calc_cnt(){
            for(var i= 0;i < this.form.app_data.length;i++){
                this.cnt += this.form.app_data[i].data.length;

            }
            console.log("info cnt:",this.cnt)
        },
        translate(english) {
            // console.log(english,idx);
            if(english === 'orderNormalGoods') {
                return '普通订单'
            }
            else if(english === 'orderPhoneDeposit') {
                return '话费充值'
            }
            if(english === 'deliveryAddress') {
                return '收货地址'
            }
            if(english === 'orderHotel') {
                return '酒店订单'
            }
            if(english === 'orderTrafficTicket') {
                return '购票订单'
            }
            if(english === 'orderAttractionTicket') {
                return '旅行订单'
            }
            if(english === 'userInfo') {
                return '用户信息'
            }
            if(english === 'fansInfo') {
                return '粉丝信息'
            }
            if(english === 'attentionInfo') {
                return '关注信息'
            }
            if(english === 'attentionBarInfo') {
                return '贴吧信息'
            }
            if(english === 'senderAddress') {
                return '寄件人信息'
            }
            if(english === 'traveller') {
                return '常用游客'
            }
            if(english === 'invoiceTitle') {
                return '发票信息'
            }

        },

        getAppInfo() {
            const host = 'http://localhost:5000'
            // console.log("query",this.$route.query)
            this.postData.task_id = this.$route.query.task_id
            this.postData.phone = this.$route.query.phone
            this.postData.app_name = this.$route.query.appName


             console.log("app info Data",this.postData)

            axios.post(host + '/forensic/getAppInfo', this.postData)
                .then(response=>{
                    this.form = response.data
                    this.calc_cnt()
                        console.log("get app info axios:",response)
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
