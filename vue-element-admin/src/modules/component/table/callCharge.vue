<template>
  <el-table
    :data="charge.data">
    <el-table-column
      prop="order_number"
      label="订单编号"
    width="300px">
    </el-table-column>
    <el-table-column
      prop="deposit_phone_number"
      label="号码"
      width="280px">
    </el-table-column>
    <el-table-column
      prop="deposit_price"
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
        name: "orderPhoneDeposit",
        props: ["charge"],
        data(){
            return{
                form:{
                    "deposit_phone_number":"",
                    "deposit_price":"",
                    "order_times":"",
                    "order_number":""
                }
            }
        },
        created() {
            console.log("callCharge",this.charge)
        }
    }
</script>

<style scoped>

</style>
