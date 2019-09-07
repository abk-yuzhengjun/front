<template>
<task_comp :taskData ='form'></task_comp>
</template>

<script>
import task_comp from "../component/task_comp";
export default {
  name: 'TaskCreator',
  components: {task_comp},
  data() {
    return {
        // form:{
        //     type:2,//创建任务页面0 案件中新增任务1 编辑已有任务2
        //     dev_list:[
        //         'aux',
        //         'spring',
        //         'thinkpad'
        //     ],
        //     case_list:[
        //         {case_name:'catch_20190901',case_id:'9854564613'},
        //         {case_name:'catch_20190902',case_id:'1111111111'},
        //         {case_name:'catch_20190903',case_id:'5242524255'},
        //
        //     ],
        //     oper_list:[
        //         '移动',
        //         '联通',
        //         '电信'],
        //     task_info:{
        //         user_id: '',
        //         case_name: 'catch_20190901',
        //         case_id:'9854564613',
        //         task_id: '',
        //         task_name: 'hula',
        //         task_detail:'',
        //         create_ts: '',
        //         task_type: 2,
        //         dev_list: ['aux'],
        //         number_content: {
        //             capture_mode: 1,
        //             imsi_black_list: [
        //                 '460037510902431',
        //                 '460037512222221',
        //                 '460044444444441'
        //             ],
        //             capture_operation: ['移动'],
        //             capture_type: 1
        //         },
        //         evidence_content: [
        //             {
        //                 phone: '15321232123',
        //                 imsi: '49090909090909',
        //                 app_list: [
        //                     '支付宝',
        //                     '微信'],
        //             },
        //             {
        //                 phone: '16515616165',
        //                 imsi: '84988494489494',
        //                 app_list: [
        //                     '支付宝',
        //                     '抖音'],
        //             },
        //             {
        //                 phone: '15321232123',
        //                 imsi: '1111111111111',
        //                 app_list: [
        //                     '微信',
        //                     '抖音'],
        //             }
        //         ]
        //     }
        // },
        form:{
            type:0,//创建任务页面0 案件中新增任务1 编辑已有任务2
            dev_list:[

            ],
            case_list:[
            ],
            oper_list:[
              ],
            task_info:{
                user_id: '',
                case_name: '',
                case_id:'',
                task_id: '',
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
                    capture_operation: [],
                    capture_type: ''
                },
                evidence_content: [
                    {
                        phone:'',
                        imsi: '',
                        app_list: [
                           ],
                    }

                ]
            }
        }

    }

  },

  methods: {

      getUsrInfo(){
          const axios = require('axios')
          const host = 'http://localhost:5000'
          var data={user_id:''}
          data.user_id = this.$store.getters.name

          axios.post(host + '/login/usrInfoGet', data)
              .then(response=>{
                  console.log("resoinse",response.data)
                  this.form.dev_list = response.data.res.dev_list
                  this.form.app_list = response.data.res.app_list
                  this.form.oper_list = response.data.res.oper_list
                  this.form.case_list = response.data.res.case_list
                  console.log("dev_list",this.form.dev_list)
                  console.log("app_list",this.form.app_list)
                  console.log("oper_list",this.form.oper_list)
                  console.log("case_list",this.form.case_list)
              })
              .catch(function(error) {
                  // handle error
                  console.log(error)
              })
              .finally(function() {
                  console.log('get request finally')
              })

      },
  },
    created() {
      console.log("createTask on create..............")
        this.getUsrInfo()
    }
}

</script>

<style scoped>

</style>
