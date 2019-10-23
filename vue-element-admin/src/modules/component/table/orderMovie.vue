<template>
  <el-table
    height="300"

    :data="movie.data">
    <el-table-column
      v-if = show.movie_theater
      prop="movie_theater"
      label="电影院"
      width="200px">
    </el-table-column>
    <el-table-column
      v-if = show.movie_name
      prop="movie_name"
      label="影片名称"
      width="250px">
    </el-table-column>
    <el-table-column
      v-if = show.movie_session
      prop="movie_session"
      label="场次"
      width="150px">
    </el-table-column>
    <el-table-column
      v-if = show.order_price
      prop="order_price"
      label="价格"
      width="150px">
    </el-table-column>
    <el-table-column
      v-if = show.order_count
      prop="order_count"
      label="数量"
      width="150px">
    </el-table-column>
    <el-table-column
      v-if = show.order_state
      prop="order_state"
      label="订单状态"
      width="150px">
    </el-table-column>

  </el-table>
</template>

<script>
    export default {
        name: "orderMovie",
        props: ["movie"],
        data(){
            return {
                show:{
                    "movie_name":"",
                    "order_state":"",
                    "movie_theater":"",
                    "movie_session":"",
                    "order_count":"",
                    "order_price":""
                }
            }
        },
        methods:{
            existence_identification(){
                for(var key in this.movie['data'][0])
                {
                    this.show[key]=true;
                }
            }
        },
        created() {
            this.existence_identification();
        }

    }
</script>

<style scoped>

</style>
