<template>
  <el-table
    height="300"
    :data="hitch.data">
    <el-table-column
      v-if = show.start_address
      prop="start_address"
      label="起点"
      width="200px">
    </el-table-column>
    <el-table-column
      v-if = show.end_address
      prop="end_address"
      label="终点"
      width="200px">
    </el-table-column>
    <el-table-column
      v-if = show.carpooling_time
      prop="carpooling_time"
      label="拼车时间"
      :formatter="formatTime"
      width="200px">
    </el-table-column>
    <el-table-column
      v-if = show.carpooling_state
      prop="carpooling_state"
      label="拼车状态"
      width="150px">
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
        name: "orderHitch",
        props: ["hitch"],
        data(){
            return {
                show:{
                    "carpooling_time":"",
                    "carpooling_state":"",
                    "order_state":"",
                    "start_address":"",
                    "end_address":"",
                }
            }
        },
        methods:{
            existence_identification(){
                for(var key in this.hitch['data'][0]) {
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
