<template>
  <div class="ca-card">
    <div class="ca-card__header">
      <span>动态</span>
    </div>

    <el-timeline class="ca-card__body">
      <el-timeline-item   v-for="(activity, index) in dynamicInfos"
                          :key="index"
                          :icon="activity.icon"
                          :type="activity.type"
                          :color="activity.color"
                          :size="activity.size"
                          :timestamp="activity.timestamp">
        <el-card>
          <h4>{{activity.content}}</h4>
          <p>{{activity.timestamp}}</p>
        </el-card>
      </el-timeline-item>

    </el-timeline>

  </div>
</template>

<script>
  import axios from 'axios'
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'

    export default {
        name: "DynamicInfo",
      data() {
        return {
          dynamicInfos: [{
            content: '支持使用图标',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more'
          }, {
            content: '支持自定义颜色',
            timestamp: '2018-04-03 20:46',
            color: '#0bbd87',
            type: 'success   ',
          }, {
            content: '支持自定义尺寸',
            timestamp: '2018-04-03 20:46',
            size: 'large',
            type: 'warning  ',
          }, {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46',
            type: 'danger ',
          },
            {
              content: '支持参数配置',
              timestamp: '2018-04-12 20:46',
              size: 'large',
              type: 'info',

            },],

        }
      },
      created:function () {
        const host = this.$store.getters.host
        axios.post(host+'/dashboard/dynamic')
          .then(function (response) {

            console.log(response);
          })
          .catch(function (error) {

            console.log(error);
          });

      },
    }

</script>

<style scoped>

  .ca-card {
    height: 100%;
    width: 33.3%;
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



  .ca-card__header {
    padding: 18px 20px;
    border-bottom: 1px solid #e6ebf5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .ca-card__body{
    padding: 8px;
    height: 100%;
    overflow-y: scroll;
  }
  .ca-card__body::-webkit-scrollbar { /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }

  .ca-card__body::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 5px rgba(168, 168, 168, 0.2);
    background: rgba(168, 168, 168, 1);
  }

  .ca-card__body::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(241, 241, 241, 0.2);
    border-radius: 6px;
    background: rgba(241, 241, 241, 1);
  }
</style>
