<template>
  <div class="back_ground_app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,idx) in appInfo.app_data"
        :key="idx"
        :label="translate(item.class,idx,item.data[0].class)"
        :value="item.class">
      <div v-if="appInfo.app_data[idx].class === 'orderNormalGoods'">
        <orderNormalGoods :goods="appInfo.app_data[idx]"></orderNormalGoods>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'recharge'">
        <recharge :charge="appInfo.app_data[idx]"></recharge>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'address'">
        <cs_address :dvAdress="appInfo.app_data[idx]"></cs_address>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'orderHotel'">
        <orderHotel :htOrder="appInfo.app_data[idx]"></orderHotel>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'orderTrafficTicket'">
        <orderTrafficTicket :tkOrder="appInfo.app_data[idx]"></orderTrafficTicket>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'orderTravel'">
        <orderTravel :tvOrder="appInfo.app_data[idx]"></orderTravel>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'userInfo'">
        <userInfo :usrInfo="appInfo.app_data[idx]"></userInfo>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'attentionInfo'">
        <attentionInfo :attInfo="appInfo.app_data[idx]"></attentionInfo>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'attentionBarInfo'">
        <attentionBarInfo :barInfo="appInfo.app_data[idx]"></attentionBarInfo>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'fansInfo'">
        <fansInfo :fInfo="appInfo.app_data[idx]"></fansInfo>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'topContacts'">
        <topContacts :contact="appInfo.app_data[idx]"></topContacts>
      </div>
        <div v-else-if="appInfo.app_data[idx].class === 'invoiceTitle'">
          <invoiceTitle :invoiceData="appInfo.app_data[idx]"></invoiceTitle>
        </div>
        <div v-else-if="appInfo.app_data[idx].class === 'orderBike'">
          <orderBike :bike="appInfo.app_data[idx]"></orderBike>
        </div>
        <div v-else-if="appInfo.app_data[idx].class === 'orderHitch'">
          <orderHitch :hitch="appInfo.app_data[idx]"></orderHitch>
        </div>
        <div v-else-if="appInfo.app_data[idx].class === 'orderKtv'">
          <orderKTV :ktv="appInfo.app_data[idx]"></orderKTV>
        </div>
        <div v-else-if="appInfo.app_data[idx].class === 'orderMovie'">
          <orderMovie :movie="appInfo.app_data[idx]"></orderMovie>
        </div>

      <div v-else>
        no info
      </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import orderNormalGoods from "./table/goodsOrder";
  import fansInfo from "./table/fansInfo";
  import attentionInfo from "./table/attentionInfo";
  import attentionBarInfo from "./table/barAttInfo";
  import recharge from "./table/callCharge";
  import orderHotel from "./table/hotelOrder";
  import orderTravel from "./table/travelOrder";
  import cs_address from "./table/address";
  import userInfo from "./table/userInfo";
  import orderTrafficTicket from "./table/ticketOrder";
  import topContacts from  "./table/topContacts"
  import invoiceTitle from "./table/invoiceTitle";
  import orderBike from "./table/orderBike";
  import orderHitch from "./table/orderHitch";
  import orderKTV from "./table/orderKTV";
  import orderMovie from "./table/orderMovie";
    export default {
        name: "app_show",
        props: ["appInfo"],
        components: {orderNormalGoods,fansInfo,attentionInfo,attentionBarInfo,recharge,orderBike,orderKTV,orderHitch,orderMovie,
            orderHotel,orderTravel,cs_address,userInfo,orderTrafficTicket,topContacts,invoiceTitle},
        data() {
            return {
                activeName: 'order',
                idx:0,
            };
        },
        watch: {
            '$route': 'init'
        },
        methods: {
            init(){

            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            translate(english,idx,subClass) {
                // console.log(english,idx);
              if(english === 'orderNormalGoods') {
                  return '普通订单'
              }
              if(english === 'address' ) {
                  if(subClass === 1){
                      return '寄件地址'
                  }
                  else if(subClass === 2) {
                      return '收件地址'
                  }
                  else if(subClass === 3) {
                      return '地址信息'
                  }
              }
              if(english === 'orderHotel') {
                  return '酒店订单'
              }
              if(english === 'orderTrafficTicket') {
                  return '购票订单'
              }
              if(english === 'orderTravel') {
                  return '旅行订单'
              }
              if(english === 'userInfo') {
                  return '用户信息'
              }
              if(english === 'fansInfo') {
                  return '粉丝信息'
              }
              if(english === 'attentionInfo') {
                  return '关注信息'
              }
              if(english === 'attentionBarInfo') {
                  return '贴吧信息'
              }
              if(english === 'topContacts') {
                  return '常用游客'
              }
              if(english === 'invoiceTitle') {
                  return '发票抬头'
              }
              if(english === 'recharge') {
                  return '话费订单'
              }
              if(english === 'orderBike') {
                  return '骑行订单'
              }
              if(english === 'orderHitch') {
                  return '顺风车订单'
              }
              if(english === 'orderMovie') {
                  return '电影订单'
              }
              if(english === 'orderKtv') {
                  return 'KTV订单'
              }
            }
        },
        created() {
            console.log("app Info :",this.appInfo);
        }
    }
</script>

<style scoped>
    .back_ground_app{
      display: flex;
      width: 500px;
      margin:20px
    }
</style>
