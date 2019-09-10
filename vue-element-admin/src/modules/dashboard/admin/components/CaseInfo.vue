<template>
  <div class="ca-contain">
    <div class="ca-contain__header">
      <span style="font-size: 16px;font-weight: 400">正在进行任务</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="routeTAllcase">全部</el-button>
    </div>

  <!-- //BUG 太多，隐藏表头和高度一起设置时，将会出现未定义错误，暂时规避，待官方修复-->
    <el-table
      :data="caseInfo"
      :show-header=true
      height="100%"
      width="100%">
      <el-table-column label="任务简介" min-width="28%">
        <template slot-scope="scope">
<!--          <el-tag effect="plain">-->
<!--            {{case_type_trans(scope.row.taskType)}}-->
<!--          </el-tag>-->

          <svg-icon v-if="scope.row.taskType===1" icon-class="number_task" style="line-height: 48px"/>

          <i v-else class="el-icon-s-data"></i>
<!--          <el-avatar shape="square" size="large " src="../../../../icons/svg/number_task.svg"></el-avatar>-->
          <el-link :underline="false"
                   style="font-size: 16px;font-family: 'Microsoft YaHei';font-weight: 500;line-height: 40px" @click="routeTcase(scope.row.caseId)">
            {{scope.row.caseName}} -
          </el-link>
          <el-link :underline="false"
                   style="font-size: 16px;color: #2d2f33;font-family: 'Microsoft YaHei';font-weight: 500;line-height: 40px">
            {{scope.row.taskName}}
          </el-link>
          <div style="color: #7d7d7f;font-size: 13px;line-height: 18px">{{scope.row.task_detail}}</div>
        </template>
      </el-table-column>

      <el-table-column label="进度" align="right" min-width="20%">
        <template slot-scope="scope">
          <div class="progress-item">
            <el-progress   :percentage=scope.row.task_progress
                         v-if="scope.row.task_show.length ===0"></el-progress>
            <el-progress   :percentage=scope.row.task_progress
                         :status=scope.row.task_show v-else></el-progress>
          </div>
        </template>
      </el-table-column>


      <el-table-column
        label="日期"
        align="right" min-width="18%">
        <template slot-scope="scope">
          <!--          <i class="el-icon-time"></i>-->
          <span style="letter-spacing: 0.1em;">{{ timeAllFormat(scope.row.task_timestamp) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="right" min-width="10%">
        <template slot-scope="scope">
          <el-button type="text" @click="routeTtask(scope.row)" style="margin-right: 20px">更多</el-button>
        </template>
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState} from 'vuex'
  import {mapGetters} from 'vuex'

  const host = 'http://localhost:5000';
  export default {
    name: 'CaseInfo',
    data() {
      return {
        caseInfo: []

      }
    },
    computed: {
      normalizedSize: function () {
        return this.size.trim().toLowerCase()
      }
    },
    created: function () {
      axios.post(host + '/dashboard/caseinfo', {user_id: this.$store.state.user.name})
        .then((response) => {
          this.refreshCaseInfo(response.data);

        })
        .catch(function (error) {

          console.log(error);
        });

    },
    methods: {
      refreshCaseInfo: function (data) {
        let index = 0;
        let cacheCaseInfo = [];
        let task_staus_dict = new Map([["ready", 10], ["running", 25], ["complete", 100], ["failed", 50], ["canceled", 0]]);
        let task_show_dict = new Map([["ready", ''], ["running", ''], ["complete", 'success'], ["failed", 'exception'], ["canceled", 'warning']]);
        for (index in data) {
          for (let subIndex in data[index].task_list) {
            let caseItem = {};
            caseItem.caseId = data[index].case_id;
            caseItem.caseName = data[index].case_name;
            caseItem.caseDetail = data[index].caseDetail;
            caseItem.taskId = data[index].task_list[subIndex].task_id;
            caseItem.taskType = data[index].task_list[subIndex].task_type;

            caseItem.taskName = data[index].task_list[subIndex].task_name;
            caseItem.task_detail = data[index].task_list[subIndex].task_detail;
            caseItem.task_status = data[index].task_list[subIndex].task_status;
            caseItem.task_progress = task_staus_dict.get(caseItem.task_status);
            caseItem.task_show = task_show_dict.get(caseItem.task_status);
            caseItem.task_timestamp = data[index].task_list[subIndex].update_ts;
            cacheCaseInfo.push(caseItem);
          }
        }
        this.caseInfo = cacheCaseInfo;
        console.log(this.caseInfo)
      },
      progress_status: function (task_progress, status) {
        console.log(task_progress)
        console.log(status)
        return {textInside: true, strokeWidth: "18", percentage: task_progress}
        // if (status.length ===0)
        // {
        //   console.log("status is empty,not bind this attribute")
        //   return {textInside:true}
        // }
        // return {status:status}
      },
      case_type_trans:function(type){
        if(1===type)
        {
          return '取号'
        }
        return '取证'
      },
      timeAllFormat: function (timeStamp) {

        let tarData = new Date(timeStamp * 1000);
        let year = tarData.getFullYear();
        let month = tarData.getMonth() + 1;
        let day = new Date(timeStamp * 1000).getDate();
        let hh = tarData.getHours();
        let mm = tarData.getMinutes();
        let ss = tarData.getSeconds();
        let hour = hh < 10 ? "0" + hh : hh;
        let min = mm < 10 ? "0" + mm : mm;
        let sec = ss < 10 ? "0" + ss : ss;

        return year + '-' + month + '-' + day + '  ' + hour + ':' + min + ':' + sec;
      },

      routeTAllcase: function () {
        this.$router.push(
          {
            name: 'casedisplay'
          }
        )

      },
      routeTtask: function (data) {

        if (2 === data.taskType) {
          this.$router.push(
            {
              name: 'evidenceinformation',  //取证任务
              query: {
                caseId: data.caseId,
                taskId: data.taskId
              }
            }
          )
        } else {
          this.$router.push(
            {
              name: 'phoneinformation',   //取号任务
              query: {
                caseId: data.caseId,
                taskId: data.taskId
              }
            }
          )
        }

      },
      routeTcase: function (caseId) {
        this.$router.push(
          {
            name: 'evidencedisplay',
            query: {
              caseId: caseId
            }
          })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

    }
  }
</script>


<style scoped>
  .ca-contain {
    width: 66.6%;
    /*width:calc(100% - ${scrollbarWidth});*/
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    background-color: #FFFFFF;
    padding: 8px 0px 0px 8px;
    color: #303133;
    transition: 0.3s;
    flex-shrink: 1;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    overflow: hidden
  }


  .ca-contain__header {
    padding: 18px 20px;
    border-bottom: 1px solid #e6ebf5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .ca-card__body {
    padding: 8px;
  }

  /*>>> .el-table__body-wrapper{*/
  /*  overflow-y: auto;*/
  /*  height: 100%;*/
  /*}*/


  >>>.el-table__header-wrapper{
    display: none;
  }

  >>> .el-table__body-wrapper::-webkit-scrollbar { /*滚动条整体样式*/
    width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 6px;
  }

  >>> .el-table__body-wrapper::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 6px;
    -webkit-box-shadow: inset 0 0 5px rgba(168, 168, 168, 0.2);
    background: rgba(168, 168, 168, 1);
  }

  >>> .el-table__body-wrapper::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(241, 241, 241, 0.2);
    border-radius: 6px;
    background: rgba(241, 241, 241, 1);
  }
</style>


