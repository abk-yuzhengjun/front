<template>
  <el-table
    height="300"

    :data="tvOrder.data">
    <el-table-column
      v-if = "show.travel_name"
      prop="travel_name"
      label="名称"
      width="250px">
    </el-table-column>
    <el-table-column
      v-if = "show.order_price"
      prop="order_price"
      label="价格"
      width="200px">
    </el-table-column>
    <el-table-column
      v-if = "show.order_count"
      prop="order_count"
      label="票数"
      width="200px">
    </el-table-column>
    <el-table-column
      v-if = "show.travel_date"
      prop="travel_date"
      label="日期"
      :formatter="formatTime"
      width="300px">
    </el-table-column>
    <el-table-column
      v-if = "show.order_state"
      prop="order_state"
      label="订单状态"
      width="130px">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "orderTravel",
        props: ["tvOrder"],
        data(){
            return {
                show: {
                    "travel_name": "",
                    "travel_date": "",
                    "order_count": "",
                    "order_state": "",
                    "order_price": ""
                }
            }
        },
        methods:{
            existence_identification(){
                for(var key in this.tvOrder['data'][0])
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
