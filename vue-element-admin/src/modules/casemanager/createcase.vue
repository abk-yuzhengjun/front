<template>
  <case_somp :compData ='form' v-if="form"></case_somp>
</template>

<script>
import case_somp from "../component/case_comp";

export default {
  name: 'CaseCreator',
  components: {case_somp},
  data() {
    return {
        form: {
            type:0,//创建案件0 编辑案件1
            case_name:'',
            case_detail: '',
            user_id:'',
            create_ts: '',
            update_ts:''
        }
    }
  },

  methods: {


  },
    created() {
        this.form.user_id = this.$store.getters.name

    }

}
</script>

<style scoped>

</style>
