<template>
  <el-table
    height="300"

    :data="ktv.data">
    <el-table-column
      v-if = show.ktv_name
      prop="ktv_name"
      label="名称"
      width="200px">
    </el-table-column>
    <el-table-column
      v-if = show.sing_package
      prop="sing_package"
      label="套餐"
      width="200px">
    </el-table-column>
    <el-table-column
      v-if = show.sing_begin_time
      prop="sing_begin_time"
      label="开始时间"
      :formatter="formatTime"
      width="130px">
    </el-table-column>
    <el-table-column
      v-if = show.sing_end_time
      prop="sing_end_time"
      label="结束时间"
      :formatter="formatTime"
      width="130px">
    </el-table-column>
    <el-table-column
      v-if = show.sing_time
      prop="sing_time"
      label="时长"
      width="150px">
    </el-table-column>
    <el-table-column
      v-if = show.order_price
      prop="order_price"
      label="订单价格"
      width="180px">
    </el-table-column>
    <el-table-column
      v-if = show.order_state
      prop="order_state"
      label="订单状态"
      width="100px">
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "orderKTV",
        props: ["ktv"],
        data(){
            return {
                show:{
                    "ktv_name":"",
                    "order_state":"",
                    "sing_time":"",
                    "sing_package":"",
                    "order_price":"",
                    "sing_end_time":"",
                    "sing_begin_time":""
                }
            }
        },
        methods:{
            existence_identification(){
                for(var key in this.ktv['data'][0]) {
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
