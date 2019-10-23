<template>
  <el-table
    height="300"

    :data="bike.data">
    <el-table-column
      v-if = show.order_start_time
      prop="order_start_time"
      label="开始时间"
      width="250px">
    </el-table-column>
    <el-table-column
      v-if = show.order_use_time
      prop="order_use_time"
      label="使用时长（小时）"
      width="150px">
    </el-table-column>
    <el-table-column
      v-if = show.order_price
      prop="order_price"
      label="消费金额"
      width="150px">
    </el-table-column>
    <el-table-column
      v-if = show.order_state
      prop="order_state"
      label="订单状态"
      width="200px">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "orderBike",
        props: ["bike"],
        data(){
            return {
                show:{
                    "order_start_time":"",
                    "order_use_time":"",
                    "order_price":"",
                    "order_state":""
                }
            }
        },
        methods:{
            existence_identification(){
                for(var key in this.bike['data'][0])
                {
                    this.show[key]=true;
                }
            }
        },
        created() {
            this.existence_identification();
        }

    }
</script>

<style scoped>

</style>
