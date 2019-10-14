<template>
  <el-table
    :data="tkOrder.data">
    <el-table-column
      prop="traffic_ticket_name"
      label="票名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="departure_time"
      label="出发时间"
      width="250">
    </el-table-column>
    <el-table-column
      prop="arrival_time"
      label="到达时间"
      width="250">
    </el-table-column>
    <el-table-column
      prop="order_state"
      label="订单状态"
      width="250">
    </el-table-column>
    <el-table-column
      prop="order_price"
      label="订单价格"
      width="130">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "orderTrafficTicket",
        props: ["tkOrder"],
        data(){
            return {
                "traffic_ticket_name":"",
                "departure_time":"",
                "arrival_time":"",
                "order_state":"",
                "order_price":""
            }
        }
    }
</script>

<style scoped>

</style>
