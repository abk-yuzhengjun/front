<template>
  <el-table
    height="300"

    :data="ktv.data">
    <el-table-column
      v-if = show.ktv_name
      prop="ktv_name"
      label="名称"
      width="300px">
    </el-table-column>
    <el-table-column
      v-if = show.sing_package
      prop="sing_package"
      label="套餐"
      width="200px">
    </el-table-column>
    <el-table-column
      v-if = show.sing_time
      prop="sing_time"
      label="时长"
      width="150px">
    </el-table-column>
    <el-table-column
      v-if = show.order_price
      prop="order_price"
      label="订单价格"
      width="180px">
    </el-table-column>
    <el-table-column
      v-if = show.order_state
      prop="order_state"
      label="订单状态"
      width="100px">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "orderKTV",
        props: ["ktv"],
        data(){
            return {
                show:{
                    "ktv_name":"",
                    "order_state":"",
                    "sing_time":"",
                    "sing_package":"",
                    "order_price":""
                }
            }
        },
        methods:{
            existence_identification(){
                for(var key in this.ktv['data'][0])
                {
                    this.show[key]=true;
                }
            }
        },
        watch: {
            '$route': 'existence_identification'
        },
        created() {
            this.existence_identification();
        }

    }
</script>

<style scoped>

</style>
