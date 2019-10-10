<template>
  <div class="back_ground_app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,idx) in appInfo.app_data"
        :key="idx"
        :label="translate(item.class,idx)"
        :value="item.class">
      <div v-if="appInfo.app_data[idx].class === 'goodsOrder'">
        <goodsOrder :goods="appInfo.app_data[idx]"></goodsOrder>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'telbilOrder'">
        <callCharge :charge="appInfo.app_data[idx]"></callCharge>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'deliveryAdress'">
        <deliveryAdress :dvAdress="appInfo.app_data[idx]"></deliveryAdress>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'hotelOrder'">
        <hotelOrder :htOrder="appInfo.app_data[idx]"></hotelOrder>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'ticketOrder'">
        <ticketOrder :tkOrder="appInfo.app_data[idx]"></ticketOrder>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'travelOrder'">
        <travelOrder :tvOrder="appInfo.app_data[idx]"></travelOrder>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'userInfo'">
        <userInfo :usrInfo="appInfo.app_data[idx]"></userInfo>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'attentionInfo'">
        <attentionInfo :attInfo="appInfo.app_data[idx]"></attentionInfo>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'barAttInfo'">
        <barAttInfo :barInfo="appInfo.app_data[idx]"></barAttInfo>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'senderAdress'">
        <senderAdress :sdAdress="appInfo.app_data[idx]"></senderAdress>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'fansInfo'">
        <fansInfo :fInfo="appInfo.app_data[idx]"></fansInfo>
      </div>
      <div v-else>
        no info
      </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import goodsOrder from "./table/goodsOrder";
  import fansInfo from "./table/fansInfo";
  import senderAdress from "./table/senderAdress";
  import attentionInfo from "./table/attentionInfo";
  import barAttInfo from "./table/barAttInfo";
  import callCharge from "./table/callCharge";
  import hotelOrder from "./table/hotelOrder";
  import travelOrder from "./table/travelOrder";
  import deliveryAdress from "./table/deliveryAdress";
  import userInfo from "./table/userInfo";
  import ticketOrder from "./table/ticketOrder";
    export default {
        name: "app_show",
        props: ["appInfo"],
        components: {goodsOrder,fansInfo,senderAdress,attentionInfo,barAttInfo,callCharge,
            hotelOrder,travelOrder,deliveryAdress,userInfo,ticketOrder},
        data() {
            return {
                activeName: 'order',
                idx:0,
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            translate(english,idx) {
                console.log(english,idx);
              if(english === 'goodsOrder') {
                  return '普通订单'
              }
              else if(english === 'telbilOrder') {
                  return '话费充值'
              }
              if(english === 'deliveryAdress') {
                  return '收货地址'
              }
              if(english === 'hotelOrder') {
                  return '酒店订单'
              }
              if(english === 'ticketOrder') {
                  return '购票订单'
              }
              if(english === 'travelOrder') {
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
              if(english === 'barAttInfo') {
                  return '贴吧信息'
              }
              if(english === 'senderAdress') {
                  return '寄件人信息'
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
