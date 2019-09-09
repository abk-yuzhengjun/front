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
          console.log("store:",this.$store.state)
          this.form.dev_list = this.$store.state.baseInfo.dev_list
          this.form.app_list = this.$store.state.baseInfo.app_list
          this.form.oper_list = this.$store.state.baseInfo.oper_list
          this.form.case_list = this.$store.state.baseInfo.case_list
      },
  },
    created() {
      // console.log("createTask on create..............")
        this.getUsrInfo()
    }
}

</script>

<style scoped>

</style>
