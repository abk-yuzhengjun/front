<template>
  <el-table
    :data="tvOrder.data">
    <el-table-column
      prop="attraction_ticket_name"
      label="景点门票名称"
      width="250px">
    </el-table-column>
    <el-table-column
      prop="order_price"
      label="价格"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="ticket_count"
      label="票数"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="travel_date"
      label="日期"
      width="300px">
    </el-table-column>
    <el-table-column
      prop="order_state"
      label="订单状态"
      width="130px">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "travelOrder",
        props: ["tvOrder"],
        data(){
            return {
                "attraction_ticket_name":"",
                "travel_date":"",
                "ticket_count":"",
                "order_state":"",
                "order_price":""
            }
        }
    }
</script>

<style scoped>

</style>
