<template>
  <el-table
    :data="goods.data" >
    <el-table-column
      prop="goods_name"
      label="商品名" width="150">
    </el-table-column>
    <el-table-column
      prop="order_number"
      label="订单编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="delivery_name"
      label="收货人"
      width="120">
    </el-table-column>
    <el-table-column
      prop="delivery_phone"
      label="号码" width="150">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="订单价格"
      width="80">
    </el-table-column>
    <el-table-column
      prop="delivery_address"
      label="收货地址"
      width="200">
    </el-table-column>
    <el-table-column
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
                tableData:[{
                    "order_number": "1",
                    "order_content": "2",
                    "goods_name": "3",
                    "goods_price": "4",
                    "delivery_address": "5",
                    "delivery_name": "6",
                    "delivery_phone": "7"
                }]
            }
        },
        created() {
            console.log("goods",this.goods)
        },
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
