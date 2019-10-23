<template>
  <el-table
    height="300"
    :data="goods.data" >
    <el-table-column
      v-if = "show.goods_name"
      prop="goods_name"
      label="商品名"
      width="150">
    </el-table-column>
    <el-table-column
      v-if = "show.order_number"
      prop="order_number"
      label="订单编号"
      width="180">
    </el-table-column>
    <el-table-column
      v-if = "show.goods_price"
      prop="goods_price"
      label="订单价格"
      width="80">
    </el-table-column>
    <el-table-column
      v-if = "show.name"
      prop="name"
      label="收货人"
      width="120" >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="号码"
      width="150"
      v-if = "show.phone">
    </el-table-column>
    <el-table-column
      v-if = "show.address"
      prop="address"
      label="收货地址"
      width="200">
    </el-table-column>
    <el-table-column
      v-if = "show.order_times"
      prop= "order_times"
      label="下单时间"
      width="150">
    </el-table-column>
    <el-table-column
      v-if = "show.order_state"
      prop="order_state"
      label="订单状态"
      width="180">
    </el-table-column>
    <el-table-column
      v-if = "show.order_content"
      prop="order_content"
      label="订单详情"
      width="200">
    </el-table-column>

  </el-table>
</template>

<script>
    export default {
        name: "orderNormalGoods",
        props: ["goods"],
        data(){
            return {
                show:{
                    "order_state":false,
                    "order_times":false,
                    "order_number":false,
                    "order_content":false,
                    "goods_name":false,
                    "goods_price":false,
                    "address":false,
                    "name":false,
                    "phone":false

                }
            }

        },
        methods:{
            existence_identification(){
                for(var key in this.goods['data'][0])
                {
                    // console.log("key",key)
                     this.show[key]=true;
                     // console.log("ext :",key,this.show[key])
                }

            }
        },
        created() {
            this.existence_identification();
        }

    }
</script>

<style scoped>
  .style_table{
    /*display: flex;*/

  }
  .style_order_numer{
    width:50px
  }
  .style_goods_name{
    width:50px
  }
  .style_delivery_phone{
    width:100px
  }
</style>
