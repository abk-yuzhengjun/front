<template>
  <div class="back_ground_app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item,idx) in appInfo.app_data"
        :key="idx"
        :label="translate(item.class,idx)"
        :value="item.class">
      <div v-if="appInfo.app_data[idx].class === 'orderNormalGoods'">
        <orderNormalGoods :goods="appInfo.app_data[idx]"></orderNormalGoods>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'orderPhoneDeposit'">
        <orderPhoneDeposit :charge="appInfo.app_data[idx]"></orderPhoneDeposit>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'deliveryAddress'">
        <deliveryAdress :dvAdress="appInfo.app_data[idx]"></deliveryAdress>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'orderHotel'">
        <orderHotel :htOrder="appInfo.app_data[idx]"></orderHotel>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'orderTrafficTicket'">
        <orderTrafficTicket :tkOrder="appInfo.app_data[idx]"></orderTrafficTicket>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'orderAttractionTicket'">
        <orderAttractionTicket :tvOrder="appInfo.app_data[idx]"></orderAttractionTicket>
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
      <div v-else-if="appInfo.app_data[idx].class === 'senderAddress'">
        <senderAddress :sdAdress="appInfo.app_data[idx]"></senderAddress>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'fansInfo'">
        <fansInfo :fInfo="appInfo.app_data[idx]"></fansInfo>
      </div>
      <div v-else-if="appInfo.app_data[idx].class === 'traveller'">
        <traveller :travellerData="appInfo.app_data[idx]"></traveller>
      </div>
        <div v-else-if="appInfo.app_data[idx].class === 'traveller'">
          <traveller :travellerData="appInfo.app_data[idx]"></traveller>
        </div>
        <div v-else-if="appInfo.app_data[idx].class === 'invoiceTitle'">
          <invoiceTitle :invoiceData="appInfo.app_data[idx]"></invoiceTitle>
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
  import senderAddress from "./table/senderAdress";
  import attentionInfo from "./table/attentionInfo";
  import attentionBarInfo from "./table/barAttInfo";
  import orderPhoneDeposit from "./table/callCharge";
  import orderHotel from "./table/hotelOrder";
  import orderAttractionTicket from "./table/travelOrder";
  import deliveryAdress from "./table/deliveryAdress";
  import userInfo from "./table/userInfo";
  import orderTrafficTicket from "./table/ticketOrder";
  import traveller from  "./table/traveller"
  import invoiceTitle from "./table/invoiceTitle";
    export default {
        name: "app_show",
        props: ["appInfo"],
        components: {orderNormalGoods,fansInfo,senderAddress,attentionInfo,attentionBarInfo,orderPhoneDeposit,
            orderHotel,orderAttractionTicket,deliveryAdress,userInfo,orderTrafficTicket,traveller,invoiceTitle},
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
                // console.log(english,idx);
              if(english === 'orderNormalGoods') {
                  return '普通订单'
              }
              else if(english === 'orderPhoneDeposit') {
                  return '话费充值'
              }
              if(english === 'deliveryAddress') {
                  return '收货地址'
              }
              if(english === 'orderHotel') {
                  return '酒店订单'
              }
              if(english === 'orderTrafficTicket') {
                  return '购票订单'
              }
              if(english === 'orderAttractionTicket') {
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
              if(english === 'senderAddress') {
                  return '寄件人信息'
              }
              if(english === 'traveller') {
                  return '常用游客'
              }
              if(english === 'invoiceTitle') {
                  return '发票抬头'
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
