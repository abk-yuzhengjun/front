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
        created() {
            console.log("charge",this.charge)
        }
    }
</script>

<style scoped>

</style>
