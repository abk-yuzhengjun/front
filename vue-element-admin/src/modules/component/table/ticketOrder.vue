<template>
  <el-table
    height="300"

    :data="tkOrder.data">
    <el-table-column
      v-if="show.traffic_ticket_name"
      prop="traffic_ticket_name"
      label="票名"
      width="200">
    </el-table-column>
    <el-table-column
      v-if="show.take_a_train"
      prop="take_a_train"
      label="班次"
      width="130">
    </el-table-column>
    <el-table-column
      v-if="show.departure_time"
      prop="departure_time"
      label="出发时间"
      :formatter="formatTime"
      width="250">
    </el-table-column>
    <el-table-column
      v-if="show.arrival_time"
      prop="arrival_time"
      label="到达时间"
      :formatter="formatTime"
      width="250">
    </el-table-column>
    <el-table-column
      v-if="show.order_state"
      prop="order_state"
      label="订单状态"
      width="250">
    </el-table-column>
    <el-table-column
      v-if="show.order_price"
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
                show: {
                    "traffic_ticket_name": "",
                    "departure_time": "",
                    "arrival_time": "",
                    "take_a_train": "",
                    "order_state": "",
                    "order_price": ""
                }
            }
        },
        methods:{
            existence_identification(){
                for(var key in this.tkOrder['data'][0])
                {
                    this.show[key]=true;
                }
            },
            formatTime(row, column) {
                const date = new Date(row[column.property])
                return date.getFullYear() + '年' +
                    date.getMonth() + '月' +
                    date.getDate() + '日 ' +
                    date.getHours() + ':' +
                    date.getMinutes()+':' +
                    date.getSeconds()
            }
        },
        created() {
            this.existence_identification();
        }
    }
</script>

<style scoped>

</style>
