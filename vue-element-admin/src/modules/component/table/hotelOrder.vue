<template>
  <el-table
    height="300"

    :data="htOrder.data">
    <el-table-column
      prop="hotel_name"
      label="酒店名"
    width="300px">
    </el-table-column>
    <el-table-column
      prop="order_price"
      label="价格"
      width="150px">
    </el-table-column>
    <el-table-column
      prop="check_in_time"
      label="入住时间"
      :formatter="formatTime"
      width="280px">
    </el-table-column>
    <el-table-column
      prop="check_out_time"
      label="退房时间"
      :formatter="formatTime"
      width="270px">
    </el-table-column>
    <el-table-column
      prop="order_state"
      label="订单状态"
      width="80px">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "orderHotel",
        props: ["htOrder"],
        data(){
            return {
                tableData:[{
                    "hotel_name": "",
                    "check_in_time": "",
                    "check_out_time": "",
                    "order_state": "",
                    "order_price": ""
                }]
            }
        },
        methods:{
            formatTime(row, column) {
                const date = new Date(row[column.property])
                return date.getFullYear() + '年' +
                    date.getMonth() + '月' +
                    date.getDate() + '日 ' +
                    date.getHours() + ':' +
                    date.getMinutes()+':' +
                    date.getSeconds()
            }
        }
    }
</script>

<style scoped>

</style>
