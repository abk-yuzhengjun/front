<template>
  <div class="dashboard-editor-container">
<!--    <github-corner class="github-corner" />-->
    <Statistic></Statistic>

    <div class="middle-container">
      <case-info></case-info>
      <DynamicInfo></DynamicInfo>
    </div>



    <dev-info></dev-info>

  </div>
</template>

<script>


import Statistic from './components/statistic'
import CaseInfo from './components/CaseInfo'
import DynamicInfo from './components/DynamicInfo'
import DevInfo from './components/DevInfo'



export default {
  name: 'DashboardAdmin',
  components: {
    Statistic,
    CaseInfo,
    DynamicInfo,
    DevInfo
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 8px;
  height: 100%;
  width: 100%;
  background-color: rgb(240, 242, 245);
  /*position: relative;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

}

.middle-container{
    height: 70%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    /*align-items: stretch;*/
    margin-top: 8px;
    flex-grow:3;
  overflow: hidden;
}


</style>
