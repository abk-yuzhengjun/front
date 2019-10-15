<template>
  <el-table
    :data="sdAdress.data">
    <el-table-column
      prop="sender_name"
      label="寄件人姓名"
      width="330">
    </el-table-column>
    <el-table-column
      prop="sender_phone"
      label="寄件人号码"
      width="350">
    </el-table-column>
    <el-table-column
      prop="sender_address"
      label="寄件人地址"
      width="400">
    </el-table-column>

  </el-table>
</template>

<script>
    export default {
        name: "senderAddress",
        props: ["sdAdress"],
        data(){
            return {
                tableData:[{
                    "sender_address":"",
                    "sender_name":"",
                    "sender_phone":""
                }

                ]
            }
        }
    }
</script>

<style scoped>

</style>
