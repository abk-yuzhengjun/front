<template>
  <div class="account_active_card">
    <div class="account_active_card_header">
      <span>Active</span>
    </div>
      <el-timeline class="account_active_body">

        <el-timeline-item v-for="(item, index) of timeline"  :key="index" :timestamp="item.timestamp">
          <el-card>
            <h4>{{ item.title }}</h4>
            <p>{{ item.content }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        timeline: [
          {
            timestamp: '2019/4/20',
            title: 'Update Github template',
            content: 'PanJiaChen committed 2019/4/20 20:46'
          },
          {
            timestamp: '2019/4/21',
            title: 'Update Github template',
            content: 'PanJiaChen committed 2019/4/21 20:46'
          },
          {
            timestamp: '2019/4/22',
            title: 'Build Template',
            content: 'PanJiaChen committed 2019/4/22 20:46'
          },
          {
            timestamp: '2019/4/23',
            title: 'Release New Version',
            content: 'PanJiaChen committed 2019/4/23 20:46'
          },
          {
            timestamp: '2019/4/23',
            title: 'Release New Version',
            content: 'PanJiaChen committed 2019/4/23 20:49'
          }
        ]
      }
    }


  }
</script>

<style scoped>
  .account_active_card {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    background-color: #FFFFFF;
    color: #303133;
    padding: 8px 0px 0px 8px;
    transition: 0.3s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    flex-shrink:2;
    display: flex;
    flex-direction: column;
  }



  .account_active_card_header {
    padding: 14px 20px;
    border-bottom: 1px solid #e6ebf5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .account_active_body{
    padding: 8px;
    height: 100%;

    overflow-y: scroll;
  }
  .account_active_body::-webkit-scrollbar { /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }

  .account_active_body::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 5px rgba(168, 168, 168, 0.2);
    background: rgba(168, 168, 168, 1);
  }

  .account_active_body::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(241, 241, 241, 0.2);
    border-radius: 6px;
    background: rgba(241, 241, 241, 1);
  }
</style>
