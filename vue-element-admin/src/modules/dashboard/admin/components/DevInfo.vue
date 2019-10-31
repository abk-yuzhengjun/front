<template>
  <el-row :gutter="40" class="panel-group">


    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <!--        <div class="card-panel-icon-wrapper icon-people">-->
        <!--          <svg-icon icon-class="peoples" class-name="card-panel-icon" />-->
        <!--        </div>-->

        <div class="card-panel-description">
        <el-row :gutter="8" >
          <el-col :span="20">
            <div class="card-panel-text">
              GSM001
            </div>
          </el-col>
          <el-col :span="4"><i class="el-icon-info"></i></el-col>


        </el-row>
        <el-row :gutter="8">
          <span class="card-panel-num">正常</span>
        </el-row>
        </div>
        <el-row :gutter="8" class="card-pannel-task">
          <el-col :span="16" style=" color: rgba(0, 0, 0, 0.45);
          font-size: 14px;">执行任务
          </el-col>
          <el-col :span="8">测试-任务1</el-col>

        </el-row>


      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <!--        <div class="card-panel-icon-wrapper icon-people">-->
        <!--          <svg-icon icon-class="peoples" class-name="card-panel-icon" />-->
        <!--        </div>-->

        <div class="card-panel-description">
          <el-row :gutter="8" >
            <el-col :span="20">
              <div class="card-panel-text">
                GSM001
              </div>
            </el-col>
            <el-col :span="4"><i class="el-icon-info"></i></el-col>


          </el-row>
          <el-row :gutter="8">
            <span class="card-panel-num">正常</span>
          </el-row>
        </div>
        <el-row :gutter="8" class="card-pannel-task">
          <el-col :span="16" style=" color: rgba(0, 0, 0, 0.45);
          font-size: 14px;">执行任务
          </el-col>
          <el-col :span="8">测试-任务1</el-col>

        </el-row>


      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <!--        <div class="card-panel-icon-wrapper icon-people">-->
        <!--          <svg-icon icon-class="peoples" class-name="card-panel-icon" />-->
        <!--        </div>-->

        <div class="card-panel-description">
          <el-row :gutter="8" >
            <el-col :span="20">
              <div class="card-panel-text">
                GSM001
              </div>
            </el-col>
            <el-col :span="4"><i class="el-icon-info"></i></el-col>


          </el-row>
          <el-row :gutter="8">
            <span class="card-panel-num">正常</span>
          </el-row>
        </div>
        <el-row :gutter="8" class="card-pannel-task">
          <el-col :span="16" style=" color: rgba(0, 0, 0, 0.45);
          font-size: 14px;">执行任务
          </el-col>
          <el-col :span="8">测试-任务1</el-col>

        </el-row>


      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <!--        <div class="card-panel-icon-wrapper icon-people">-->
        <!--          <svg-icon icon-class="peoples" class-name="card-panel-icon" />-->
        <!--        </div>-->

        <div class="card-panel-description">
          <el-row :gutter="8" >
            <el-col :span="20">
              <div class="card-panel-text">
                GSM001
              </div>
            </el-col>
            <el-col :span="4"><i class="el-icon-info"></i></el-col>


          </el-row>
          <el-row :gutter="8">
            <span class="card-panel-num">正常</span>
          </el-row>
        </div>
        <el-row :gutter="8" class="card-pannel-task">
          <el-col :span="16" style=" color: rgba(0, 0, 0, 0.45);
          font-size: 14px;">执行任务
          </el-col>
          <el-col :span="8">测试-任务1</el-col>

        </el-row>


      </div>
    </el-col>

  </el-row>
</template>

<script>

  import axios from 'axios'
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: "DevInfo",
    components: {
    },
    created:function () {
      const host = this.$store.getters.host
      axios.post(host+'/dashboard/devinfo')
        .then(function (response) {

          console.log(response);
        })
        .catch(function (error) {

          console.log(error);
        });

    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;
    height: 20%;
    /*bottom: 8px;*/

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 100%;
      cursor: pointer;
      font-size: 12px;
      /*position: relative;*/
      display: flex;
      flex-direction: column;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);


      .card-panel-description {
        /*margin: 14px 0 14px 14px;*/
        padding: 14px;
        border-bottom: 1px solid #e6ebf5;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          margin-left: 20px;
          font-size: 18px;
        }
      }

      .card-pannel-task {
        padding: 14px 0 0 14px;
        font-size: 14px;
      }
    }
  }


  @media (max-width: 550px) {
    .card-panel-description {
      display: none;
    }


  }
</style>
