<template>
  <div class="box-card">
    <span class=" text ">早安，剑通，愿你加班每一天！</span>

    <div class="inner_contain">
      <div class="inner_inner_contain">
        <span>总案件</span>
        <span class="number">100</span>
      </div>
      <div class="el-divider--vertical"></div>
      <div class="inner_inner_contain">
        <span>当前任务</span>
        <span class="number">20/100</span>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: "Statistic"
  }
</script>

<style scoped>

  .el-divider--vertical {
    display: inline-block;
    width: 1px;
    height: 100%;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
    background-color: #DCDFE6;
    position: relative;
  }



  .text {
    font-size: 16px;

  }
.number{
  font-size: 18px;
  font-weight: bold;
}
  .inner_contain {
    display: flex;
    /*margin: 8px;*/
    box-sizing: border-box;
    height: 100%;
  }

  .inner_inner_contain {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 20px;
    height: 100%;
    box-sizing: border-box;
  }

  .box-card {
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    background-color: #FFFFFF;
    overflow: hidden;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;

  }
</style>
