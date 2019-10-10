<template>
  <el-table
    :data="dvAdress.data">
    <el-table-column
      prop="delivery_name"
      label="收货人"
      width="300">
    </el-table-column>
    <el-table-column
      prop="delivery_address"
      label="收货地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="delivery_phone"
      label="号码"
      width="280">
    </el-table-column>
    <el-table-column
      prop="delivery_post"
      label="邮编"
      width="200">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "deliveryAdress",
        props: ["dvAdress"],
        data(){
            return{
                form:{
                    "delivery_address":"",
                    "delivery_name":"",
                    "delivery_phone":"",
                    "delivery_post":"",
                    "is_default":1
                }
            }
        },
        created(){
          console.log("dvAdress",this.dvAdress)
        }
    }
</script>

<style scoped>

</style>
