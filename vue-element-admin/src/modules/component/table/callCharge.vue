<template>
  <el-table
    height="300"

    :data="charge.data">
    <el-table-column
      prop="order_number"
      label="订单编号"
    width="300px">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="号码"
      width="280px">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="充值金额"
      width="200px">
    </el-table-column>
    <el-table-column
      prop="order_times"
      label="充值时间"
      :formatter="formatTime"
      width="300px">
    </el-table-column>

  </el-table>
</template>

<script>
    export default {
        name: "recharge",
        props: ["charge"],
        data(){
            return{

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
        },
        created() {
            console.log("charge",this.charge)
        }
    }
</script>

<style scoped>

</style>
